import { useState, useEffect } from "react";
import { AlertCircle, Bell } from "lucide-react";

// For demo, combining invoice and payment logic visually
const DUMMY_OUTSTANDING = [
  { id: "INV-102", company: "InnovateX", total: 30000, paid: 10000, balance: 20000, dueDate: "2024-11-29", status: "Pending" },
  { id: "INV-103", company: "GlobalSoft", total: 45000, paid: 0, balance: 45000, dueDate: "2024-10-04", status: "Overdue" },
];

export default function OutstandingPayments() {
  const [outstanding, setOutstanding] = useState([]);

  useEffect(() => {
    // In a real app, this calculates by matching invoices and payments
    const saved = localStorage.getItem("erp_outstanding");
    if (saved) {
      setOutstanding(JSON.parse(saved));
    } else {
      setOutstanding(DUMMY_OUTSTANDING);
      localStorage.setItem("erp_outstanding", JSON.stringify(DUMMY_OUTSTANDING));
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Outstanding Payments</h2>
          <p className="text-sm text-slate-500">Track pending balances and overdue client invoices.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Company (Inv ID)</th>
              <th className="px-6 py-4 font-semibold">Total Bill</th>
              <th className="px-6 py-4 font-semibold">Paid</th>
              <th className="px-6 py-4 font-semibold text-red-600">Balance Due</th>
              <th className="px-6 py-4 font-semibold">Due Date</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {outstanding.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{item.company}</p>
                  <p className="text-xs font-medium text-slate-500">{item.id}</p>
                </td>
                <td className="px-6 py-4">₹{item.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-emerald-600">₹{item.paid.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-red-500">₹{item.balance.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {item.status === "Overdue" && <AlertCircle size={14} className="text-red-500" />}
                    <span className={item.status === "Overdue" ? "font-bold text-red-500" : ""}>
                      {item.dueDate}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 transition hover:bg-orange-100">
                    <Bell size={14} /> Remind
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}