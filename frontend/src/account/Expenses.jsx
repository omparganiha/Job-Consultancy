import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const DUMMY_EXPENSES = [
  { id: "EXP-001", date: "2024-10-05", category: "Portal Subscription", amount: 15000, status: "Approved" },
  { id: "EXP-002", date: "2024-10-12", category: "Office Internet", amount: 2500, status: "Pending" },
];

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("erp_expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      setExpenses(DUMMY_EXPENSES);
      localStorage.setItem("erp_expenses", JSON.stringify(DUMMY_EXPENSES));
    }
  }, []);

  const getStatusColor = (status) => {
    return status === "Approved" 
      ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
      : "bg-orange-50 text-orange-600 border-orange-200";
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Expenses</h2>
          <p className="text-sm text-slate-500">Manage internal consultancy expenses and approvals.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
          <Plus size={16} /> Add Expense
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Expense ID</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{exp.id}</td>
                <td className="px-6 py-4">{exp.date}</td>
                <td className="px-6 py-4 font-medium text-slate-700">{exp.category}</td>
                <td className="px-6 py-4 font-bold text-slate-800">₹{exp.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(exp.status)}`}>
                    {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}