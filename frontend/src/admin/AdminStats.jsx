import { BarChart3, Users, Briefcase, Building2, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";

function AdminStats() {
  const stats = [
    { title: "Total Users", value: "1,245", icon: Users, color: "blue" },
    { title: "Active Jobs", value: "87", icon: Briefcase, color: "orange" },
    { title: "Companies", value: "54", icon: Building2, color: "purple" },
    { title: "Placements", value: "28", icon: TrendingUp, color: "emerald" },
  ];

  const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    purple: "bg-purple-50 text-purple-500",
    emerald: "bg-emerald-50 text-emerald-500",
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Admin <span className="text-orange-500">Dashboard</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Platform overview and key metrics.</p>
      </header>

      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors[s.color]}`}>
                <Icon size={24}/>
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-slate-500">{s.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Jobs by Status</h2>
          <div className="space-y-3">
            <StatBar label="Approved" value={65} count="65" color="bg-emerald-500"/>
            <StatBar label="Pending" value={20} count="20" color="bg-amber-500"/>
            <StatBar label="Rejected" value={15} count="15" color="bg-red-500"/>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Recent Activity</h2>
          <div className="space-y-3">
            <Activity icon={CheckCircle} color="text-emerald-500" text="Job 'React Dev' approved" time="2m ago"/>
            <Activity icon={Users} color="text-blue-500" text="5 new candidates registered" time="1h ago"/>
            <Activity icon={Building2} color="text-purple-500" text="Company 'TechCorp' verified" time="3h ago"/>
            <Activity icon={XCircle} color="text-red-500" text="Job rejected (incomplete)" time="5h ago"/>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatBar({ label, value, count, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-slate-500">{count}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function Activity({ icon: Icon, color, text, time }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0">
      <Icon size={18} className={color}/>
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}

export default AdminStats;