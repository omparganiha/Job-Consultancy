
import { useEffect, useState } from "react";
import { MessageSquare, Clock, Send, Search, CheckCircle } from "lucide-react";

const KEY = "supportTickets";

const demoTickets = [
  {
    id: 1,
    role: "student",
    name: "Rahul Sharma",
    email: "rahul@mail.com",
    subject: "Unable to upload resume",
    message: "Getting error while uploading PDF.",
    status: "Open",
    time: "2 hours ago",
    replies: [],
  },
  {
    id: 2,
    role: "provider",
    name: "TechCorp",
    email: "hr@techcorp.com",
    subject: "Payment issue",
    message: "Please verify my last payment transaction.",
    status: "In Progress",
    time: "1 day ago",
    replies: [],
  },
  {
    id: 3,
    role: "student",
    name: "Priya",
    email: "priya@mail.com",
    subject: "Account verification",
    message: "My account is not verified yet.",
    status: "Resolved",
    time: "3 days ago",
    replies: [],
  },
];

function readTickets() {
  try {
    const saved = localStorage.getItem(KEY);

    if (saved !== null) {
      return JSON.parse(saved);
    }

    localStorage.setItem(KEY, JSON.stringify(demoTickets));
    return demoTickets;
  } catch {
    return [];
  }
}

function Support() {
  const [tickets, setTickets] = useState(readTickets);
  const [search, setSearch] = useState("");
  const [replyText, setReplyText] = useState({});
  const [activeReply, setActiveReply] = useState(null);

  const refreshTickets = () => {
    setTickets(readTickets());
  };

  useEffect(() => {
    window.addEventListener("storage", refreshTickets);
    window.addEventListener("supportTicketsUpdated", refreshTickets);

    return () => {
      window.removeEventListener("storage", refreshTickets);
      window.removeEventListener("supportTicketsUpdated", refreshTickets);
    };
  }, []);

  const saveTickets = (updated) => {
    localStorage.setItem(KEY, JSON.stringify(updated));
    setTickets(updated);
    window.dispatchEvent(new Event("supportTicketsUpdated"));
  };

  const sendReply = (ticketId) => {
    const text = (replyText[ticketId] || "").trim();
    if (!text) return;

    const updated = readTickets().map((ticket) => {
      if (ticket.id !== ticketId) return ticket;

      return {
        ...ticket,
        status: "In Progress",
        replies: [
          ...(ticket.replies || []),
          {
            text,
            time: new Date().toLocaleString(),
          },
        ],
      };
    });

    saveTickets(updated);
    setReplyText((previous) => ({ ...previous, [ticketId]: "" }));
    setActiveReply(null);
  };

  const markResolved = (ticketId) => {
    const updated = readTickets().map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, status: "Resolved" }
        : ticket
    );

    saveTickets(updated);
  };

  const filteredTickets = tickets.filter((ticket) =>
    `${ticket.name} ${ticket.email} ${ticket.subject} ${ticket.message} ${ticket.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    if (status === "Open") {
      return "border-red-100 bg-red-50 text-red-700";
    }

    if (status === "In Progress") {
      return "border-amber-100 bg-amber-50 text-amber-700";
    }

    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            Support <span className="text-orange-500">Tickets</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Help students and providers resolve their issues quickly.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
          <MessageSquare size={18} className="text-orange-500" />
          Total tickets:
          <strong>{tickets.length}</strong>
        </div>
      </header>

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative w-full max-w-md">
          <Search size={17} className="absolute left-3 top-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or issue..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-orange-400"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTickets.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <MessageSquare size={32} className="mx-auto text-orange-400" />
            <p className="mt-3 font-semibold">No support tickets found</p>
            <p className="mt-1 text-sm text-slate-500">
              New Student and Provider tickets will appear here.
            </p>
          </div>
        )}

        {filteredTickets.map((ticket) => (
          <article
            key={ticket.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  {ticket.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold">{ticket.subject}</h3>
                  <p className="mt-1 break-words text-xs text-slate-500">
                    by {ticket.name} · {ticket.email}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold capitalize text-orange-600">
                    {ticket.role}
                  </span>
                </div>
              </div>

              <span
                className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${statusStyle(ticket.status)}`}
              >
                {ticket.status}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="mb-1 text-xs font-semibold text-slate-500">
                User's message
              </p>
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {ticket.message}
              </p>
              <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                <Clock size={13} /> {ticket.time}
              </p>
            </div>

            {(ticket.replies || []).map((reply, index) => (
              <div
                key={index}
                className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-4"
              >
                <p className="mb-1 text-xs font-bold text-orange-600">
                  Admin Reply · {reply.time}
                </p>
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {reply.text}
                </p>
              </div>
            ))}

            {activeReply === ticket.id && (
              <div className="mt-4">
                <textarea
                  value={replyText[ticket.id] || ""}
                  onChange={(e) =>
                    setReplyText((previous) => ({
                      ...previous,
                      [ticket.id]: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Type your reply to the user..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-400"
                />

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => sendReply(ticket.id)}
                    disabled={!(replyText[ticket.id] || "").trim()}
                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:opacity-50"
                  >
                    <Send size={14} /> Send Reply
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveReply(null)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  setActiveReply(activeReply === ticket.id ? null : ticket.id)
                }
                className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600"
              >
                <Send size={14} /> Reply
              </button>

              <button
                type="button"
                onClick={() => markResolved(ticket.id)}
                disabled={ticket.status === "Resolved"}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle size={14} />
                {ticket.status === "Resolved" ? "Resolved" : "Mark Resolved"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Support;
