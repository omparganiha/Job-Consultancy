import { useState, useEffect } from "react";
import { Plus, Download } from "lucide-react";

const DUMMY_INVOICES = [
  { id: "INV-101", company: "TechCorp", date: "2024-10-01", due: "2024-10-31", amount: 50000, status: "Paid" },
  { id: "INV-102", company: "InnovateX", date: "2024-10-15", due: "2024-11-29", amount: 30000, status: "Pending" },
  { id: "INV-103", company: "GlobalSoft", date: "2024-10-20", due: "2024-11-04", amount: 45000, status: "Draft" },
];

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("erp_invoices");
    if (saved) {
      setInvoices(JSON.parse(saved));
    } else {
      setInvoices(DUMMY_INVOICES);
      localStorage.setItem("erp_invoices", JSON.stringify(DUMMY_INVOICES));
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Pending": return "bg-orange-50 text-orange-600 border-orange-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Invoices</h2>
          <p className="text-sm text-slate-500">Track and manage client billing.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
          <Plus size={16} /> Create Invoice
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Invoice ID</th>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Issue Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{inv.id}</td>
                <td className="px-6 py-4">{inv.company}</td>
                <td className="px-6 py-4">{inv.date}</td>
                <td className="px-6 py-4 font-bold text-slate-800">₹{inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-orange-500" title="Download PDF">
                    <Download size={18} />
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