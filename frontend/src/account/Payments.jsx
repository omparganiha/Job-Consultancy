import { useState, useEffect } from "react";
import { Plus, CheckCircle2 } from "lucide-react";

const DUMMY_PAYMENTS = [
  { id: "PAY-001", invoiceId: "INV-101", company: "TechCorp", date: "2024-10-10", amount: 50000, method: "Bank Transfer" },
  { id: "PAY-002", invoiceId: "INV-102", company: "InnovateX", date: "2024-10-25", amount: 10000, method: "UPI" },
];

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("erp_payments");
    if (saved) {
      setPayments(JSON.parse(saved));
    } else {
      setPayments(DUMMY_PAYMENTS);
      localStorage.setItem("erp_payments", JSON.stringify(DUMMY_PAYMENTS));
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Received Payments</h2>
          <p className="text-sm text-slate-500">Log and track payments received against invoices.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
          <Plus size={16} /> Record Payment
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Receipt ID</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Company (Invoice)</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{pay.id}</td>
                <td className="px-6 py-4">{pay.date}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800">{pay.company}</span>
                  <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{pay.invoiceId}</span>
                </td>
                <td className="px-6 py-4 font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={14} /> ₹{pay.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {pay.method}
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