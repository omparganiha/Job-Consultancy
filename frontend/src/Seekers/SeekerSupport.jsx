
import React, { useEffect, useRef, useState } from "react";
import {
  Headphones, MessageSquare, Send, Search, UserRound, Clock,
  Briefcase, FileText, CreditCard, ShieldCheck, ChevronRight,
  Sparkles, CircleHelp, CheckCheck, LifeBuoy,
} from "lucide-react";

const KEY = "supportTickets";

function readTickets() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

const topics = [
  { name: "Account & Profile", icon: UserRound },
  { name: "Job Applications", icon: Briefcase },
  { name: "Resume Issues", icon: FileText },
  { name: "Payment & Billing", icon: CreditCard },
];

function SeekerSupport() {
  const [tickets, setTickets] = useState(readTickets);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const refresh = () => setTickets(readTickets());
    window.addEventListener("storage", refresh);
    window.addEventListener("supportTicketsUpdated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("supportTicketsUpdated", refresh);
    };
  }, []);

  const myTickets = tickets.filter((t) => t.role === "student");

  const sendMessage = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    const newTicket = {
      id: Date.now(),
      role: "student",
      name: localStorage.getItem("studentName") || "Student",
      email: localStorage.getItem("studentEmail") || "student@mail.com",
      subject: activeTopic || text.slice(0, 45),
      message: text,
      status: "Open",
      time: new Date().toLocaleString(),
      replies: [],
    };

    const updated = [...readTickets(), newTicket];
    localStorage.setItem(KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("supportTicketsUpdated"));
    setTickets(updated);
    setMessage("");
    setActiveTopic("");
  };

  const visibleTickets = myTickets.filter((t) =>
    `${t.subject} ${t.message} ${(t.replies || []).map(r => r.text).join(" ")}`
      .toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleTickets.length]);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500">
            <LifeBuoy size={16} /> Student Assistance
          </div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Help & Support</h1>
          <p className="mt-2 text-sm text-slate-500">
            Have a question? We're here to help you move forward.
          </p>
        </div>
        <span className="w-fit rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm">
          ● Student Help Desk
        </span>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <Headphones size={27} />
            </div>
            <span className="text-xs font-bold uppercase text-orange-500">We're here for you</span>
            <h2 className="mt-3 text-xl font-extrabold">How can we help you today?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Choose a topic or describe your problem to create a support ticket.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold">Quick Help</h3>
            <p className="mb-4 mt-1 text-xs text-slate-500">Select a topic to get started.</p>
            <div className="space-y-2">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.name}
                    type="button"
                    onClick={() => {
                      setActiveTopic(topic.name);
                      setMessage(`I need help with ${topic.name}. `);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${
                      activeTopic === topic.name
                        ? "border-orange-200 bg-orange-50"
                        : "border-slate-100 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <span className="rounded-xl bg-orange-50 p-2.5 text-orange-500">
                      <Icon size={19} />
                    </span>
                    <span className="flex-1 text-sm font-medium">{topic.name}</span>
                    <ChevronRight size={17} className="text-slate-400" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} className="text-orange-500" />
              <div>
                <h3 className="text-sm font-bold">Your support matters</h3>
                <p className="mt-1 text-xs text-slate-500">Never share your password.</p>
              </div>
            </div>
          </section>
        </aside>

        <section className="flex min-h-[600px] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-orange-50 p-3 text-orange-500">
                <Headphones size={23} />
              </span>
              <div>
                <h2 className="font-bold">JobERP Support Team</h2>
                <p className="mt-1 text-xs text-slate-500">Your support tickets and replies</p>
              </div>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets..."
                className="w-full rounded-xl border bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-orange-400 sm:w-52"
              />
            </div>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/50 p-4 sm:p-6">
            {visibleTickets.length === 0 && (
              <div className="py-16 text-center">
                <MessageSquare size={32} className="mx-auto text-orange-400" />
                <p className="mt-3 font-semibold">No support tickets yet</p>
                <p className="mt-1 text-sm text-slate-500">Send a message below to contact Admin.</p>
              </div>
            )}

            {visibleTickets.map((ticket) => (
              <article key={ticket.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">{ticket.subject}</h3>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    {ticket.status}
                  </span>
                </div>
                <div className="rounded-xl bg-orange-50 p-3 text-sm">
                  <p className="mb-1 text-xs font-semibold text-orange-600">You · {ticket.time}</p>
                  {ticket.message}
                </div>

                {(ticket.replies || []).map((reply, index) => (
                  <div key={index} className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-sm">
                    <p className="mb-1 text-xs font-semibold text-slate-500">Admin · {reply.time}</p>
                    {reply.text}
                  </div>
                ))}
                <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                  {ticket.status === "Resolved" ? <CheckCheck size={14} /> : <Clock size={14} />}
                  {ticket.status}
                </p>
              </article>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
              <Sparkles size={15} className="text-orange-500" />
              Your message will create a support ticket for Admin.
            </div>
            <div className="flex items-center gap-2 rounded-xl border p-2 focus-within:border-orange-300">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-40"
              >
                Send <Send size={17} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default SeekerSupport;
