
import { useState, useRef, useEffect } from "react";

const PREDICTED_QUESTIONS = [
  "How do I apply for a job?",
  "Are there any remote jobs?",
  "How can I contact support?",
];

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api/chatbot/";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 10;
const REQUEST_TIMEOUT_MS = 30000;

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const INITIAL_MESSAGE = {
  id: createId(),
  sender: "bot",
  text: "Hi there! 👋 I am the FindJob AI assistant. How can I help you today?",
};

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      inputRef.current?.focus();
    }
  }, [messages, isChatOpen, isLoading]);

  const processMessage = async (question) => {
    const text = question.trim();

    if (
      !text ||
      isLoading ||
      text.length > MAX_MESSAGE_LENGTH
    ) {
      return;
    }

    // Build history before adding the current message.
    // Exclude the initial greeting and failed-request messages.
    const history = messages
      .filter(
        (msg) =>
          msg.sender === "user" ||
          (msg.sender === "bot" &&
            msg.id !== INITIAL_MESSAGE.id &&
            !msg.isError)
      )
      .slice(-MAX_HISTORY)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        text: msg.text,
      }));

    setMessages((previous) => [
      ...previous,
      {
        id: createId(),
        sender: "user",
        text,
      },
    ]);

    setInputValue("");
    setIsLoading(true);

    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let timedOut = false;

    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
        signal: controller.signal,
      });

      const raw = await response.text();

      let data;

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          `The server returned an invalid response (HTTP ${response.status}). Check your Django terminal.`
        );
      }

      if (!response.ok) {
        // Detailed information stays in the browser console.
        console.error("FindJob API error:", {
          status: response.status,
          response: data,
        });

        throw new Error(
          data.error ||
            `The chatbot request failed (HTTP ${response.status}).`
        );
      }

      if (!data.reply || typeof data.reply !== "string") {
        throw new Error(
          "The assistant returned an empty response. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          id: createId(),
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("FindJob request aborted or timed out.");
      } else {
        console.error("FindJob chatbot error:", error);
      }

      let errorText;

      if (error.name === "AbortError") {
        errorText = timedOut
          ? "The assistant took too long to respond. Please try again."
          : "The request was cancelled. Please try again.";
      } else if (error instanceof TypeError) {
        errorText =
          "Unable to connect to FindJob. Please check that Django is running and try again.";
      } else {
        errorText =
          error.message ||
          "The assistant is temporarily unavailable. Please try again.";
      }

      if (isMountedRef.current) {
        setMessages((previous) => [
          ...previous,
          {
            id: createId(),
            sender: "bot",
            text: errorText,
            isError: true,
          },
        ]);
      }
    } finally {
      clearTimeout(timeoutId);

      if (isMountedRef.current) {
        setIsLoading(false);
      }

      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    processMessage(inputValue);
  };

  const clearChat = () => {
    if (isLoading) return;

    setMessages([{ ...INITIAL_MESSAGE, id: createId() }]);
    setInputValue("");
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 md:right-8
          w-[calc(100vw-2rem)] md:w-[400px] z-50
          transition-all duration-300 origin-bottom-right ${
            isChatOpen
              ? "scale-100 opacity-100 pointer-events-auto"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        aria-hidden={!isChatOpen}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl
            shadow-orange-500/20 border border-slate-200
            overflow-hidden flex flex-col
            h-[min(550px,calc(100dvh-120px))]"
        >
          {/* Header */}
          <div
            className="bg-gradient-to-r from-orange-500
              to-orange-600 p-4 flex items-center
              justify-between text-white"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 bg-white/20
                  rounded-full flex items-center justify-center
                  backdrop-blur-sm"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012 2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-base leading-tight">
                  FindJob Assistant
                </h3>
                <p className="text-xs text-orange-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  AI Career Support
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                disabled={isLoading}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="text-white/80 hover:text-white
                  hover:bg-white/10 p-2 rounded-full
                  transition-colors disabled:opacity-40"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chatbot"
                className="text-white/80 hover:text-white
                  hover:bg-white/10 p-2 rounded-full
                  transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5
                    rounded-2xl text-sm leading-relaxed
                    shadow-sm whitespace-pre-wrap break-words ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-white rounded-br-sm"
                        : msg.isError
                          ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
                          : "bg-white text-slate-700 border border-slate-100 rounded-bl-sm"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="bg-white border border-slate-100
                    rounded-2xl rounded-bl-sm px-4 py-3
                    text-sm text-slate-500 shadow-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:300ms]" />
                    </span>
                    FindJob AI is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                Suggested Questions
              </p>

              <div className="flex flex-wrap gap-2">
                {PREDICTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={isLoading}
                    onClick={() => processMessage(question)}
                    className="text-xs font-medium bg-white
                      text-orange-600 border border-orange-200
                      px-3 py-1.5 rounded-full
                      hover:bg-orange-50 hover:border-orange-300
                      transition-colors text-left shadow-sm
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={isLoading}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message"
                className="flex-1 min-w-0 bg-slate-100
                  border border-transparent rounded-full
                  px-4 py-2.5 text-sm outline-none
                  focus:bg-white focus:border-orange-300
                  focus:ring-2 focus:ring-orange-100
                  text-slate-700 placeholder-slate-400
                  transition-all disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="bg-orange-500 hover:bg-orange-600
                  text-white p-2.5 rounded-full shadow-md
                  shadow-orange-500/30 transition-transform
                  active:scale-90 disabled:opacity-50
                  disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              AI-powered career assistance · Avoid sharing sensitive data
            </p>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsChatOpen((open) => !open)}
        aria-label={
          isChatOpen ? "Close FindJob chatbot" : "Open FindJob chatbot"
        }
        aria-expanded={isChatOpen}
        className={`fixed bottom-6 right-4 md:right-8 z-50
          w-14 h-14 rounded-full flex items-center
          justify-center text-white shadow-lg
          shadow-orange-500/40 transition-all duration-300 ${
            isChatOpen
              ? "bg-slate-900 hover:bg-slate-800 rotate-90 scale-90"
              : "bg-orange-500 hover:bg-orange-600 hover:scale-105"
          }`}
      >
        {isChatOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012 2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
