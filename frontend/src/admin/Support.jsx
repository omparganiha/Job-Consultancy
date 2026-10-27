
import { useEffect, useMemo, useState } from "react";
import {
  MessageSquare,
  Clock,
  Send,
  Search,
  CheckCircle,
  Eye,
  X,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

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
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }

    localStorage.setItem(KEY, JSON.stringify(demoTickets));
    return demoTickets;
  } catch {
    return [];
  }
}

const statusStyles = {
  Open: { bg: "#fee2e2", color: "#b91c1c" },
  "In Progress": { bg: "#ffedd5", color: "#c2410c" },
  Resolved: { bg: "#dcfce7", color: "#15803d" },
};

const avatarColors = [
  { bg: "#ffedd5", text: "#c2410c" },
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#f3e8ff", text: "#7e22ce" },
  { bg: "#fce7f3", text: "#be185d" },
];

function Support() {
  const [tickets, setTickets] = useState(readTickets);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");

  const refreshTickets = () => {
    setTickets(readTickets());
  };

  useEffect(() => {
    window.addEventListener("storage", refreshTickets);
    window.addEventListener("supportTicketsUpdated", refreshTickets);

    return () => {
      window.removeEventListener("storage", refreshTickets);
      window.removeEventListener(
        "supportTicketsUpdated",
        refreshTickets
      );
    };
  }, []);

  const saveTickets = (updated) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(updated));
      setTickets(updated);

      window.dispatchEvent(new Event("supportTicketsUpdated"));

      if (selectedTicket) {
        const updatedSelected = updated.find(
          (ticket) => ticket.id === selectedTicket.id
        );

        setSelectedTicket(updatedSelected || null);
      }

      return true;
    } catch (error) {
      console.error("Unable to save tickets:", error);
      toast.error("Unable to save changes. Please try again.");
      return false;
    }
  };

  const sendReply = (ticketId) => {
    const text = replyText.trim();

    if (!text) {
      toast.error("Please enter a reply first.");
      return;
    }

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

    if (saveTickets(updated)) {
      setReplyText("");
      toast.success("Reply sent successfully!");
    }
  };

  const markResolved = (ticketId) => {
    const current = readTickets();
    const target = current.find((ticket) => ticket.id === ticketId);

    if (!target || target.status === "Resolved") return;

    const updated = current.map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, status: "Resolved" }
        : ticket
    );

    if (saveTickets(updated)) {
      toast.success("Ticket marked as resolved!");
    }
  };

  const updateTicketStatus = (ticketId, status) => {
    const current = readTickets();
    const target = current.find((ticket) => ticket.id === ticketId);

    if (!target || target.status === status) return;

    const updated = current.map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, status }
        : ticket
    );

    if (saveTickets(updated)) {
      toast.success("Ticket status updated successfully!");
    }
  };

  const deleteTicket = (ticketId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold text-slate-800">
            Delete this support ticket?
          </p>

          <p className="mt-1 text-sm text-slate-500">
            This action cannot be undone.
          </p>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                const updated = readTickets().filter(
                  (ticket) => ticket.id !== ticketId
                );

                if (saveTickets(updated)) {
                  setSelectedTicket((current) =>
                    current?.id === ticketId ? null : current
                  );

                  closeToast();
                  toast.success("Ticket deleted successfully!");
                }
              }}
              className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={closeToast}
              className="rounded-md bg-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: true,
      }
    );
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesRole =
        selectedRole === "all" || ticket.role === selectedRole;

      const searchText = [
        ticket.name,
        ticket.email,
        ticket.subject,
        ticket.message,
        ticket.role,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesRole &&
        searchText.includes(search.toLowerCase())
      );
    });
  }, [tickets, selectedRole, search]);

  const seekerCount = tickets.filter(
    (ticket) =>
      ticket.role === "student" || ticket.role === "seeker"
  ).length;

  const providerCount = tickets.filter(
    (ticket) => ticket.role === "provider"
  ).length;

  const tabs = [
    { key: "all", label: "All Tickets", count: tickets.length },
    { key: "student", label: "Seeker", count: seekerCount },
    { key: "provider", label: "Provider", count: providerCount },
  ];

  const getStatusStyle = (status) =>
    statusStyles[status] || statusStyles.Open;

  const getRoleLabel = (role) =>
    role === "student" || role === "seeker"
      ? "Seeker"
      : "Provider";

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
          Support <span className="text-orange-500">Tickets</span>
        </h1>

        <p className="mt-1 text-sm text-slate-500 md:text-base">
          View and manage support requests from seekers and providers.
        </p>
      </div>

      {/* Search and Role Filters */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => {
            const active = selectedRole === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedRole(tab.key)}
                className={`relative whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
                  active
                    ? "text-orange-500"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label} ({tab.count})

                {active && (
                  <span className="absolute right-0 -bottom-px left-0 h-0.5 rounded-full bg-orange-500" />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative w-full shrink-0 lg:w-80">
          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or issue..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-4 pl-9 text-sm placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Ticket Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "User",
                  "Role",
                  "Subject",
                  "Date",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-5 py-3.5 text-xs font-semibold tracking-wider text-slate-500 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-16 text-center text-sm text-slate-400"
                  >
                    <MessageSquare
                      size={28}
                      className="mx-auto mb-3 text-orange-400"
                    />
                    No support tickets found.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket, index) => {
                  const avatar =
                    avatarColors[index % avatarColors.length];

                  const statusStyle = getStatusStyle(ticket.status);

                  return (
                    <tr
                      key={ticket.id}
                      className="transition-colors hover:bg-orange-50/40"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                            style={{
                              background: avatar.bg,
                              color: avatar.text,
                            }}
                          >
                            {(ticket.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {ticket.name || "Unknown"}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {ticket.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm text-slate-600">
                          {getRoleLabel(ticket.role)}
                        </span>
                      </td>

                      {/* Subject */}
                      <td className="max-w-[240px] px-5 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setReplyText("");
                          }}
                          className="line-clamp-2 text-left text-sm text-slate-600 hover:text-orange-600"
                        >
                          {ticket.subject || "Support request"}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm text-slate-500">
                          {ticket.time || "—"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{
                            background: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        >
                          {ticket.status || "Open"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            title="View ticket"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setReplyText("");
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            title="Mark resolved"
                            disabled={ticket.status === "Resolved"}
                            onClick={() => markResolved(ticket.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <CheckCircle size={15} />
                          </button>

                          <button
                            type="button"
                            title="Delete ticket"
                            onClick={() => deleteTicket(ticket.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Ticket Modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Ticket Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Full message and conversation history
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    User
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedTicket.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Role
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {getRoleLabel(selectedTicket.role)}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm text-slate-700">
                    {selectedTicket.email}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Subject
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedTicket.subject}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-2 text-xs font-semibold text-slate-500">
                  User's Message
                </p>

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {selectedTicket.message}
                </p>

                <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={13} />
                  {selectedTicket.time || "Time not available"}
                </p>
              </div>

              {/* Reply History */}
              {(selectedTicket.replies || []).map((reply, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-orange-100 bg-orange-50 p-4"
                >
                  <p className="mb-2 text-xs font-bold text-orange-600">
                    Admin Reply · {reply.time}
                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {reply.text}
                  </p>
                </div>
              ))}

              {/* Reply Form */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Write a Reply
                </label>

                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply to this ticket..."
                  className="w-full resize-y rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ticket Status
                </label>

                <select
                  value={selectedTicket.status || "Open"}
                  onChange={(e) =>
                    updateTicketStatus(
                      selectedTicket.id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => deleteTicket(selectedTicket.id)}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100"
              >
                Delete
              </button>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={!replyText.trim()}
                  onClick={() => sendReply(selectedTicket.id)}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={14} />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
