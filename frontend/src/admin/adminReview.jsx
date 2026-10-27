import React, { useState, useMemo } from "react";

// ─── Sample Data ───
const initialData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    type: "Seller Registration",
    date: "2025-01-10",
    description: "Electronics store registration request.",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    type: "Product Listing",
    date: "2025-01-12",
    description: "New product listing for handmade jewelry.",
    status: "Approved",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    type: "Withdrawal Request",
    date: "2025-01-14",
    description: "Withdrawal of ₹15,000 from wallet.",
    status: "Pending",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@example.com",
    type: "Seller Registration",
    date: "2025-01-15",
    description: "Grocery store registration request.",
    status: "Rejected",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    type: "Content Review",
    date: "2025-01-16",
    description: "Blog post submission for approval.",
    status: "Pending",
  },
];

// ─── Status Badge Styles (soft pills like Manage Users) ───
const statusStyles = {
  Pending: {
    bg: "#ffedd5",
    color: "#c2410c",
    label: "Pending",
  },
  Approved: {
    bg: "#dcfce7",
    color: "#15803d",
    label: "Approved",
  },
  Rejected: {
    bg: "#fee2e2",
    color: "#b91c1c",
    label: "Rejected",
  },
};

// Avatar soft colors
const avatarColors = [
  { bg: "#ffedd5", text: "#c2410c" },
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#f3e8ff", text: "#7e22ce" },
  { bg: "#fce7f3", text: "#be185d" },
];

const AdminReview = () => {
  const [reviews, setReviews] = useState(initialData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredData = useMemo(() => {
    return reviews.filter((item) => {
      const matchStatus = filter === "All" || item.status === filter;
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [reviews, filter, search]);

  const counts = useMemo(() => {
    return {
      All: reviews.length,
      Pending: reviews.filter((r) => r.status === "Pending").length,
      Approved: reviews.filter((r) => r.status === "Approved").length,
      Rejected: reviews.filter((r) => r.status === "Rejected").length,
    };
  }, [reviews]);

  const handleApprove = (id) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleRejectOpen = (id) => {
    setSelectedId(id);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      alert("⚠️ Rejection reason zaroor likhein!");
      return;
    }
    setReviews((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? { ...item, status: "Rejected", rejectReason }
          : item
      )
    );
    setShowRejectModal(false);
    setSelectedId(null);
  };

  const handleSetPending = (id) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Pending" } : item
      )
    );
  };

  const tabs = [
    { key: "All", label: "All" },
    { key: "Pending", label: "Approval Pending" },
    { key: "Approved", label: "Approved" },
    { key: "Rejected", label: "Rejected" },
  ];

  return (
    <div className="w-full">

      {/* ─── Tabs + Search ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        {/* Underline Tabs */}
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

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name, type, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 w-full sm:w-72 text-sm border border-slate-200 rounded-lg bg-white
                       focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                       placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ─── Table Card ─── */}
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
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  const av = avatarColors[idx % avatarColors.length];
                  const st = statusStyles[item.status];
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
                            style={{ background: av.bg, color: av.text }}
                          >
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {item.type}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-500">
                          {item.date}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-5 py-4 max-w-[220px]">
                        <span className="text-sm text-slate-500 line-clamp-2">
                          {item.description}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: st.bg, color: st.color }}
                        >
                          {st.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {item.status !== "Approved" && (
                            <button
                              onClick={() => handleApprove(item.id)}
                              title="Approve"
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                         text-emerald-600 bg-emerald-50 hover:bg-emerald-100
                                         transition-colors text-sm"
                            >
                              ✓
                            </button>
                          )}
                          {item.status !== "Rejected" && (
                            <button
                              onClick={() => handleRejectOpen(item.id)}
                              title="Reject"
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                         text-red-500 bg-red-50 hover:bg-red-100
                                         transition-colors text-sm"
                            >
                              ✕
                            </button>
                          )}
                          {item.status !== "Pending" && (
                            <button
                              onClick={() => handleSetPending(item.id)}
                              title="Set Pending"
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                         text-orange-500 bg-orange-50 hover:bg-orange-100
                                         transition-colors text-sm"
                            >
                              ⏳
                            </button>
                          )}
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

      {/* ─── Reject Modal ─── */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-[fadeIn_0.2s_ease]">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Reject Request
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Please provide a reason for rejection (required).
            </p>
            <textarea
              className="w-full border border-slate-200 rounded-xl p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                         min-h-[100px] resize-y placeholder:text-slate-400"
              placeholder="e.g. Documents are incomplete..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100
                           hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500
                           hover:bg-red-600 rounded-lg transition-colors"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReview;