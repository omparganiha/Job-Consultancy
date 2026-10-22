import { TrendingUp, DollarSign, Users, CheckCircle, Download } from "lucide-react";

function Placements() {
  const placements = [
    { id: 1, candidate: "Rahul Sharma", company: "TechCorp", role: "Frontend Dev", salary: "12 LPA", fee: "₹1,00,000", status: "Paid", date: "15 Oct 2023" },
    { id: 2, candidate: "Priya Verma", company: "InnovateX", role: "UI Designer", salary: "8 LPA", fee: "₹65,000", status: "Pending", date: "18 Oct 2023" },
    { id: 3, candidate: "Amit Kumar", company: "StartupX", role: "Backend Dev", salary: "15 LPA", fee: "₹1,25,000", status: "Paid", date: "20 Oct 2023" },
  ];

  const totalEarnings = "₹2,90,000";
  const pending = "₹65,000";

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Placements <span className="text-orange-500">& Revenue</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Track successful placements and consultancy fees.</p>
      </header>

      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        <StatCard icon={CheckCircle} color="emerald" title="Total Placements" value="28"/>
        <StatCard icon={DollarSign} color="orange" title="Total Earnings" value={totalEarnings}/>
        <StatCard icon={TrendingUp} color="red" title="Pending Fees" value={pending}/>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold">Placement Records</h2>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold hover:bg-slate-50">
            <Download size={14}/> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <tr className="text-left">
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Company</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Package</th>
                <th className="p-4 font-semibold">Fee</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {placements.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">{p.candidate}</td>
                  <td className="p-4 text-slate-600">{p.company}</td>
                  <td className="p-4 text-slate-600">{p.role}</td>
                  <td className="p-4 font-bold text-emerald-600">{p.salary}</td>
                  <td className="p-4 font-bold">{p.fee}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                      p.status === "Paid" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, color, title, value }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-500",
    orange: "bg-orange-50 text-orange-500",
    red: "bg-red-50 text-red-500",
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors[color]}`}>
        <Icon size={24}/>
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </div>
  );
}

export default Placements;