
import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircle, Send, Search, Building2, BriefcaseBusiness,
  Users, UserRound, Clock, CheckCircle, HelpCircle, ArrowRight,
  Headphones,
} from "lucide-react";

const KEY = "supportTickets";

const helpTopics = [
  { title: "Company Profile", description: "Update company details", icon: Building2 },
  { title: "Job Posting", description: "Create or manage jobs", icon: BriefcaseBusiness },
  { title: "Applications", description: "Manage job applicants", icon: Users },
  { title: "Account Issues", description: "Login and account help", icon: UserRound },
];

function readTickets() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function ProviderSupport() {
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

  const myTickets = tickets.filter((t) => t.role === "provider");

  const sendMessage = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    const newTicket = {
      id: Date.now(),
      role: "provider",
      name: localStorage.getItem("providerName") || "Provider",
      email: localStorage.getItem("providerEmail") || "provider@mail.com",
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
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-orange-500">
              <Headphones size={18} /> PROVIDER ASSISTANCE
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">Help & Support</h1>
            <p className="mt-2 text-sm text-slate-500">
              Get help with company details, job postings and applications.
            </p>
          </div>
          <span className="w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
            ● Support available
          </span>
        </header>

        <div className="mb-7 rounded-2xl bg-orange-500 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm text-orange-100">WE ARE HERE TO HELP</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Let's grow your hiring together!
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-50">
            Tell us about your problem and our support team can help.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 text-lg font-bold">Quick Help</h3>
            <p className="mb-4 text-sm text-slate-500">Choose a topic.</p>
            <div className="space-y-3">
              {helpTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.title}
                    type="button"
                    onClick={() => {
                      setActiveTopic(topic.title);
                      setMessage(`I need help with ${topic.title}. `);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${
                      activeTopic === topic.title
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200 hover:bg-orange-50"
                    }`}
                  >
                    <span className="rounded-xl bg-orange-50 p-3 text-orange-500">
                      <Icon size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{topic.title}</span>
                      <span className="text-xs text-slate-500">{topic.description}</span>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-xl bg-orange-50 p-4">
              <p className="flex items-center gap-2 font-semibold">
                <HelpCircle size={18} className="text-orange-500" /> Need assistance?
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Send a message and check replies in your conversation.
              </p>
            </div>
          </section>

          <section className="flex min-h-[580px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-orange-50 p-3 text-orange-500">
                  <Headphones size={22} />
                </span>
                <div>
                  <h3 className="font-bold">Provider Support Team</h3>
                  <p className="text-xs text-slate-500">Your support tickets</p>
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

            <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/60 p-5">
              {visibleTickets.length === 0 && (
                <p className="py-12 text-center text-sm text-slate-500">
                  No support tickets yet. Send a message to create one.
                </p>
              )}

              {visibleTickets.map((ticket) => (
                <article key={ticket.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold">{ticket.subject}</h4>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {ticket.status}
                    </span>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-3 text-sm">
                    <p className="mb-1 text-xs font-semibold text-orange-600">You · {ticket.time}</p>
                    {ticket.message}
                  </div>

                  {(ticket.replies || []).map((reply, i) => (
                    <div key={i} className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-sm">
                      <p className="mb-1 text-xs font-semibold text-slate-500">
                        Admin · {reply.time}
                      </p>
                      {reply.text}
                    </div>
                  ))}
                  <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={13} /> {ticket.status === "Resolved" ? "Issue resolved" : "Waiting for support response"}
                  </p>
                </article>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex items-end gap-3 border-t bg-white p-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Describe your issue..."
                className="min-w-0 flex-1 resize-y rounded-xl border bg-slate-50 p-3 text-sm outline-none focus:border-orange-400"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
              >
                <Send size={17} /> Send
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProviderSupport;
