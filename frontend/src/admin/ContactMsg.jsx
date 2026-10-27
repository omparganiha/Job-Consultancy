
import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";

const statusStyles = {
  New: { bg: "#ffedd5", color: "#c2410c" },
  Pending: { bg: "#ffedd5", color: "#c2410c" },
  Replied: { bg: "#dcfce7", color: "#15803d" },
  Resolved: { bg: "#fee2e2", color: "#b91c1c" },
};

const avatarColors = [
  { bg: "#ffedd5", text: "#c2410c" },
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#f3e8ff", text: "#7e22ce" },
  { bg: "#fce7f3", text: "#be185d" },
];

const ContactMsg = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const savedMessages = JSON.parse(
        localStorage.getItem("contactMessages") || "[]"
      );

      setMessages(
        savedMessages.map((item) => ({
          ...item,
          status: item.status || "New",
        }))
      );
    } catch (error) {
      console.error("Error loading contact messages:", error);
      toast.error("Unable to load contact messages.");
    }
  };

  const saveMessages = (updatedMessages) => {
    try {
      localStorage.setItem(
        "contactMessages",
        JSON.stringify(updatedMessages)
      );

      setMessages(updatedMessages);
      return true;
    } catch (error) {
      console.error("Error saving contact messages:", error);
      toast.error("Unable to save changes.");
      return false;
    }
  };

  const filteredData = useMemo(() => {
    return messages.filter((item) => {
      const matchStatus =
        filter === "All" || item.status === filter;

      const searchText = search.toLowerCase();

      const matchSearch = [
        item.name,
        item.email,
        item.phone,
        item.userType,
        item.message,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchText)
      );

      return matchStatus && matchSearch;
    });
  }, [messages, filter, search]);

  const counts = useMemo(() => {
    return {
      All: messages.length,
      New: messages.filter((item) => item.status === "New").length,
      Pending: messages.filter((item) => item.status === "Pending").length,
    };
  }, [messages]);

  const updateStatus = (id, status) => {
    const updatedMessages = messages.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    if (!saveMessages(updatedMessages)) return;

    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }

    toast.success("Message status updated successfully!");
  };

  const deleteMessage = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold text-slate-800">
            Are you sure you want to delete this message?
          </p>

          <p className="text-sm text-slate-500 mt-1">
            This action cannot be undone.
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                const updatedMessages = messages.filter(
                  (item) => item.id !== id
                );

                const deleted = saveMessages(updatedMessages);

                if (deleted) {
                  setSelectedMessage((current) =>
                    current?.id === id ? null : current
                  );

                  closeToast();
                  toast.success("Message deleted successfully!");
                }
              }}
              className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm"
            >
              Delete
            </button>

            <button
              onClick={closeToast}
              className="px-3 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm"
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

  const tabs = [
    { key: "All", label: "All" },
    { key: "New", label: "New" },
    { key: "Pending", label: "Pending" },

  ];

  return (
    <div className="w-full">

      {/* Tabs and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <div className="flex items-center gap-5 border-b border-slate-200 overflow-x-auto">
          {tabs.map((tab) => {
            const active = filter === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                  active
                    ? "text-orange-500"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label} ({counts[tab.key]})

                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-orange-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-80 shrink-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by name, type, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 w-full text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  User
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Type
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Description
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-16 text-center text-slate-400 text-sm"
                  >
                    {search
                      ? "No matching messages found."
                      : "No messages found. Submit the Contact form to see messages here."}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  const avatar =
                    avatarColors[idx % avatarColors.length];

                  const status =
                    statusStyles[item.status] || statusStyles.New;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-orange-50/40 transition-colors"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                            style={{
                              background: avatar.bg,
                              color: avatar.text,
                            }}
                          >
                            {(item.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">
                              {item.name || "Unknown"}
                            </p>

                            <p className="text-xs text-slate-400 truncate">
                              {item.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* User Type */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600 whitespace-nowrap">
                          {item.userType || "Not specified"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-500 whitespace-nowrap">
                          {item.date || "—"}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-5 py-4 max-w-[250px]">
                        <button
                          onClick={() => setSelectedMessage(item)}
                          title="View full message"
                          className="text-sm text-slate-500 text-left line-clamp-2 hover:text-orange-600"
                        >
                          {item.message || "No message"}
                        </button>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{
                            background: status.bg,
                            color: status.color,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedMessage(item)}
                            title="View message"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors text-sm"
                          >
                            ↗
                          </button>

                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateStatus(item.id, e.target.value)
                            }
                            title="Update status"
                            className="h-8 max-w-[105px] rounded-lg border border-slate-200 bg-white px-1.5 text-xs text-slate-600 focus:outline-none focus:border-orange-400"
                          >
                            <option value="New">New</option>
                            <option value="Pending">Pending</option>
                            <option value="Replied">Replied</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => deleteMessage(item.id)}
                            title="Delete message"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 transition-colors text-sm"
                          >
                            ✕
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

      {/* Message Details Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Message Details
            </h3>

            <p className="text-sm text-slate-500 mb-5">
              Contact form submission
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Name
                </p>
                <p className="text-sm text-slate-800 mt-1">
                  {selectedMessage.name || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Email
                </p>
                <p className="text-sm text-slate-800 mt-1 break-all">
                  {selectedMessage.email || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Phone
                </p>
                <p className="text-sm text-slate-800 mt-1">
                  {selectedMessage.phone || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Message
                </p>
                <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap break-words">
                  {selectedMessage.message || "No message"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                  Update Status
                </p>

                <select
                  value={selectedMessage.status}
                  onChange={(e) =>
                    updateStatus(
                      selectedMessage.id,
                      e.target.value
                    )
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-orange-400"
                >
                  <option value="New">New</option>
                  <option value="Pending">Pending</option>
                  <option value="Replied">Replied</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3 mt-6">
              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="px-4 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Delete
              </button>

              <div className="flex gap-3">
                {selectedMessage.email && (
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Reply
                  </a>
                )}

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMsg;
