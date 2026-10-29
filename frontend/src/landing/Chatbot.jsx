import { useEffect, useRef, useState } from "react";

const SUGGESTED_QUESTIONS = [
  { title: "Find a job", text: "How do I apply for a job?", icon: "briefcase" },
  { title: "Remote work", text: "Are there any remote jobs?", icon: "globe" },
  { title: "Get support", text: "How can I contact support?", icon: "support" },
];

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/chatbot/";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 10;
const REQUEST_TIMEOUT_MS = 30000;

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const makeWelcomeMessage = () => ({
  id: createId(),
  sender: "bot",
  text: "Hello! I'm your FindJob career assistant. I can help you explore job applications, improve your resume, prepare for interviews, and plan your next career move. What would you like help with today?",
  time: new Date(),
  isWelcome: true,
});

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    trash: <><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" /></>,
    support: <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></>,
    sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  };

  return <svg {...common}>{paths[name] || paths.chat}</svg>;
}

// Render a small, safe subset of Markdown so **bold** and *italic* text
// appear formatted instead of showing the asterisks in the chat.
function renderInlineMarkdown(text, keyPrefix) {
  const parts = String(text).split(/(\*\*[^*]+?\*\*|\*[^*]+?\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-bold-${index}`} className="font-bold text-inherit">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={`${keyPrefix}-italic-${index}`} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function MessageText({ text }) {
  const lines = String(text ?? "").split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={`space-${index}`} className="h-1" />;

        const bulletMatch = trimmed.match(/^(?:[-*•])\s+(.+)$/);
        if (bulletMatch) {
          return (
            <div key={`line-${index}`} className="flex items-start gap-2 pl-0.5">
              <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
              <span className="min-w-0 flex-1">{renderInlineMarkdown(bulletMatch[1], `line-${index}`)}</span>
            </div>
          );
        }

        return <p key={`line-${index}`}>{renderInlineMarkdown(line, `line-${index}`)}</p>;
      })}
    </div>
  );
}

const formatTime = (date) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date instanceof Date ? date : new Date(date));

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([makeWelcomeMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

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
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      inputRef.current?.focus();
    }
  }, [messages, isChatOpen, isLoading]);

  const processMessage = async (question) => {
    const text = question.trim();
    if (!text || isLoading || text.length > MAX_MESSAGE_LENGTH) return;

    const history = messages
      .filter((msg) => msg.sender === "user" || (msg.sender === "bot" && !msg.isError && !msg.isWelcome))
      .slice(-MAX_HISTORY)
      .map((msg) => ({ role: msg.sender === "user" ? "user" : "assistant", text: msg.text }));

    setMessages((previous) => [...previous, { id: createId(), sender: "user", text, time: new Date() }]);
    setInputValue("");
    setIsLoading(true);
    setConnectionError(false);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });
      const raw = await response.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(`The server returned an invalid response (HTTP ${response.status}). Check your Django terminal.`);
      }
      if (!response.ok) {
        console.error("FindJob API error:", { status: response.status, response: data });
        throw new Error(data.error || `The chatbot request failed (HTTP ${response.status}).`);
      }
      if (!data.reply || typeof data.reply !== "string") {
        throw new Error("The assistant returned an empty response. Please try again.");
      }
      if (isMountedRef.current) {
        setMessages((previous) => [...previous, { id: createId(), sender: "bot", text: data.reply, time: new Date() }]);
      }
    } catch (error) {
      console.error("FindJob chatbot error:", error);
      let errorText;
      if (error.name === "AbortError") {
        errorText = timedOut ? "The assistant took too long to respond. Please try again." : "The request was cancelled. Please try again.";
      } else if (error instanceof TypeError) {
        errorText = "Unable to connect to FindJob. Please check that Django is running and try again.";
      } else {
        errorText = error.message || "The assistant is temporarily unavailable. Please try again.";
      }
      if (isMountedRef.current) {
        setConnectionError(true);
        setMessages((previous) => [...previous, { id: createId(), sender: "bot", text: errorText, time: new Date(), isError: true }]);
      }
    } finally {
      clearTimeout(timeoutId);
      if (isMountedRef.current) setIsLoading(false);
      if (abortControllerRef.current === controller) abortControllerRef.current = null;
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    processMessage(inputValue);
  };

  const clearChat = () => {
    if (isLoading) return;
    setMessages([makeWelcomeMessage()]);
    setInputValue("");
    setConnectionError(false);
  };

  return (
    <>
      <section
        className={`fixed bottom-[6.25rem] right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] transition-all duration-300 origin-bottom-right ${
          isChatOpen ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "translate-y-3 scale-[0.97] opacity-0 pointer-events-none"
        }`}
        aria-label="FindJob AI assistant"
        aria-hidden={!isChatOpen}
      >
        <div className="flex h-[min(640px,calc(100dvh-7.5rem))] flex-col overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_24px_80px_-24px_rgba(30,41,59,0.42)] ring-1 ring-slate-900/5">
          {/* Branded header */}
          <header className="relative overflow-hidden border-b border-orange-400/20 bg-gradient-to-br from-[#25211f] via-[#33251f] to-[#9a3d13] px-4 py-4 text-white sm:px-5">
            <div className="pointer-events-none absolute -right-7 -top-10 h-32 w-32 rounded-full border-[22px] border-white/[0.06]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-950/25 ring-1 ring-white/20">
                  <Icon name="sparkles" className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[15px] font-bold tracking-tight">FindJob Assistant</h2>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-orange-100/90">
                    <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" /></span>
                    Your personal career guide
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" onClick={clearChat} disabled={isLoading} title="Start a new chat" aria-label="Start a new chat" className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
                  <Icon name="trash" className="h-[18px] w-[18px]" />
                </button>
                <button type="button" onClick={() => setIsChatOpen(false)} aria-label="Close assistant" className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Conversation */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-orange-50/60 via-white to-white px-4 py-5 sm:px-5" role="log" aria-live="polite" aria-relevant="additions text">
            {messages.map((msg, index) => (
              <div key={msg.id} className={`flex items-end gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender !== "user" && (
                  <div className={`mb-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/[0.03] ${msg.isError ? "bg-red-50 text-red-600" : "bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600"}`}>
                    <Icon name={msg.isError ? "support" : "sparkles"} className="h-4 w-4" />
                  </div>
                )}
                <div className={`flex max-w-[84%] flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`rounded-xl px-3.5 py-2.5 text-[13px] leading-6 whitespace-pre-wrap break-words sm:text-sm ${
                    msg.sender === "user"
                      ? "rounded-2xl rounded-br-md bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/15"
                      : msg.isError
                        ? "rounded-bl-md border border-red-200 bg-red-50 text-red-700"
                        : "rounded-2xl rounded-bl-md border border-slate-200/80 bg-white text-slate-700 shadow-sm"
                  }`}>
                    <MessageText text={msg.text} />
                  </div>
                  <span className="mt-1.5 px-1 text-[10px] font-medium text-slate-400">
                    {msg.sender === "user" ? "You" : msg.isError ? "Assistant notice" : "FindJob AI"} · {formatTime(msg.time || new Date())}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-2.5">
                <div className="mb-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600"><Icon name="sparkles" className="h-4 w-4" /></div>
                <div className="rounded-2xl rounded-bl-md border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:120ms]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:240ms]" /></span>
                    <span className="text-xs font-medium text-slate-500">Preparing your answer…</span>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="pt-1">
                <p className="mb-3 flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />Quick prompts<span className="h-px flex-1 bg-slate-200" /></p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED_QUESTIONS.map((item) => (
                    <button key={item.title} type="button" disabled={isLoading} onClick={() => processMessage(item.text)} className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 text-left shadow-[0_2px_8px_rgba(15,23,42,0.025)] transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white hover:shadow-md hover:shadow-orange-900/5 disabled:cursor-not-allowed disabled:opacity-50">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white"><Icon name={item.icon} className="h-[18px] w-[18px]" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800">{item.title}</span><span className="mt-0.5 block text-[11px] text-slate-500">{item.text}</span></span>
                      <Icon name="arrow" className="h-4 w-4 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <footer className="border-t border-slate-100 bg-white px-4 pb-3.5 pt-4 sm:px-5">
            {connectionError && <p className="mb-2 px-1 text-[11px] text-red-600">The assistant couldn't respond just now. You can send another message to try again.</p>}
            <form onSubmit={handleSendMessage}>
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-1.5 transition focus-within:border-orange-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100/80">
                <label className="sr-only" htmlFor="findjob-chat-message">Your message</label>
                <textarea
                  id="findjob-chat-message"
                  ref={inputRef}
                  rows={1}
                  value={inputValue}
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isLoading}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      if (inputValue.trim() && !isLoading) processMessage(inputValue);
                    }
                  }}
                  placeholder="Ask anything about your career…"
                  className="max-h-24 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-5 text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
                <button type="submit" disabled={isLoading || !inputValue.trim()} aria-label="Send message" className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">
                  <Icon name="send" className="h-[18px] w-[18px]" />
                </button>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-2 px-1">
                <p className="flex items-center gap-1.5 text-[10px] text-slate-400"><Icon name="shield" className="h-3.5 w-3.5" />Please don't share passwords or sensitive data.</p>
                <span className={`shrink-0 text-[10px] tabular-nums ${inputValue.length > 900 ? "text-orange-600" : "text-slate-400"}`}>{inputValue.length}/{MAX_MESSAGE_LENGTH}</span>
              </div>
            </form>
          </footer>
        </div>
      </section>

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setIsChatOpen((open) => !open)}
        aria-label={isChatOpen ? "Close FindJob assistant" : "Open FindJob assistant"}
        aria-expanded={isChatOpen}
        className={`fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-[20px] text-white shadow-[0_10px_30px_-8px_rgba(234,88,12,0.65)] ring-1 ring-white/25 transition duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200 sm:bottom-6 sm:right-6 ${isChatOpen ? "rotate-0 bg-[#292524] shadow-slate-900/30" : "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"}` }
      >
        <Icon name={isChatOpen ? "close" : "chat"} className="h-6 w-6" />
      </button>
    </>
  );
}
