import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const DUMMY_AGREEMENTS = [
  { id: 1, company: "TechCorp", model: "Percentage", fee: "8.33%", dueDays: 30, status: "Active" },
  { id: 2, company: "InnovateX", model: "Fixed", fee: "₹30,000", dueDays: 45, status: "Active" },
];

export default function Agreements() {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("erp_agreements");
    if (saved) {
      setAgreements(JSON.parse(saved));
    } else {
      setAgreements(DUMMY_AGREEMENTS);
      localStorage.setItem("erp_agreements", JSON.stringify(DUMMY_AGREEMENTS));
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Service Agreements</h2>
          <p className="text-sm text-slate-500">Manage company commercial terms and fee models.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
          <Plus size={16} /> New Agreement
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Fee Model</th>
              <th className="px-6 py-4 font-semibold">Fee / %</th>
              <th className="px-6 py-4 font-semibold">Due Days</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {agreements.map((agr) => (
              <tr key={agr.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{agr.company}</td>
                <td className="px-6 py-4">{agr.model}</td>
                <td className="px-6 py-4 font-medium">{agr.fee}</td>
                <td className="px-6 py-4">{agr.dueDays} Days</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {agr.status}
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