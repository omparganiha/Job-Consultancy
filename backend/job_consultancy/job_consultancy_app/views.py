import os
import logging
from pathlib import Path

from dotenv import load_dotenv

from google import genai
from google.genai import types

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle

logger = logging.getLogger(__name__)

# Load .env from the project root (parent of the app package).
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


class ChatbotAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        message = request.data.get("message", "")

        if not isinstance(message, str) or not message.strip():
            return Response({"error": "Please enter a message."}, status=400)

        if len(message) > 1000:
            return Response(
                {"error": "Your message must be under 1000 characters."},
                status=400,
            )

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return Response(
                {"error": "The chatbot is not configured yet."},
                status=503,
            )

        # ---- Build sanitized history ----
        history = request.data.get("history", [])
        if not isinstance(history, list):
            history = []
        history = history[-10:]

        contents = []
        for item in history:
            if not isinstance(item, dict):
                continue

            role = item.get("role")
            text = item.get("text")

            if role not in ("user", "assistant"):
                continue
            if not isinstance(text, str) or not text.strip():
                continue

            gem_role = "user" if role == "user" else "model"

            # Gemini rejects two consecutive turns with the same role.
            if contents and contents[-1].role == gem_role:
                # Merge into the previous turn instead of adding a new one.
                contents[-1].parts.append(types.Part.from_text(text=text[:1000]))
                continue

            contents.append(
                types.Content(
                    role=gem_role,
                    parts=[types.Part.from_text(text=text[:1000])],
                )
            )

        # Gemini requires the conversation to start with a user turn.
        if contents and contents[0].role != "user":
            contents = []

        # ---- Append the latest user message ----
        if contents and contents[-1].role == "user":
            contents[-1].parts.append(types.Part.from_text(text=message.strip()))
        else:
            contents.append(
                types.Content(
                    role="user",
                    parts=[types.Part.from_text(text=message.strip())],
                )
            )

        # ---- Call Gemini ----
        try:
            client = genai.Client(api_key=api_key)

            response = client.models.generate_content(
                model="gemini-3.8-flash",
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=(
                        "You are FindJob Assistant, a friendly career "
                        "assistant for a job consultancy website. "
                        "Help with job searching, resumes, ATS concepts, "
                        "interview preparation, applications, and career "
                        "development. Be clear, professional, and concise. "
                        "Never invent job openings, application statuses, "
                        "or company information. Explain that live FindJob "
                        "data must be checked in the website. Do not ask "
                        "for passwords, API keys, or sensitive personal data."
                    ),
                    max_output_tokens=500,
                ),
            )

            answer = response.text

            if not answer:
                return Response(
                    {"error": "No response was generated. Please try again."},
                    status=502,
                )

            return Response({"reply": answer})

        except Exception as e:
            logger.exception("Gemini chatbot call failed")

            # Gemini is temporarily overloaded
            if getattr(e, "status_code", None) == 503:
                return Response(
                    {
                        "error": (
                            "FindJob AI is busy right now. "
                            "Please try again in a minute."
                        )
                    },
                    status=503,
                )

            return Response(
                {
                    "error": (
                        "Sorry, the assistant is temporarily unavailable. "
                        "Please try again later."
                    )
                },
                status=502,
            )
