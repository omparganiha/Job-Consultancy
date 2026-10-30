import { useState, useEffect } from "react";
import { IndianRupee, FileText, CheckCircle, Clock } from "lucide-react";

export default function AccountsDashboard() {
  const [stats, setStats] = useState({ revenue: 0, pending: 0, expenses: 0, invoices: 0 });

  useEffect(() => {
    // Dummy Data Initializers
    const invoices = JSON.parse(localStorage.getItem("erp_invoices")) || [
      { id: "INV-101", company: "TechCorp", amount: 50000, status: "Paid" },
      { id: "INV-102", company: "InnovateX", amount: 30000, status: "Pending" },
    ];
    const expenses = JSON.parse(localStorage.getItem("erp_expenses")) || [
      { id: 1, category: "Marketing", amount: 15000 },
    ];

    // Calculations
    const totalRev = invoices.filter(i => i.status === "Paid").reduce((acc, curr) => acc + curr.amount, 0);
    const totalPend = invoices.filter(i => i.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
    const totalExp = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    setStats({ revenue: totalRev, pending: totalPend, expenses: totalExp, invoices: invoices.length });
  }, []);

  const cards = [
    { title: "Total Revenue", amount: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Pending Outstanding", amount: `₹${stats.pending.toLocaleString()}`, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Total Expenses", amount: `₹${stats.expenses.toLocaleString()}`, icon: FileText, color: "text-red-600", bg: "bg-red-50" },
    { title: "Invoices Generated", amount: stats.invoices, icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Accounts & Finance</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}>
                <Icon size={24} className={card.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <h3 className="text-xl font-bold text-slate-900">{card.amount}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}