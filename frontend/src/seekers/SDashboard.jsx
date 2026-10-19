import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  Calendar,
  ChevronRight,
  Building2,
  MapPin,
  Clock,
  Sparkles
} from "lucide-react";

function SDashboard() {
  // Demo Stats
  const stats = [
    { title: "Jobs Applied", value: "12", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Saved Jobs", value: "24", icon: Bookmark, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Interviews", value: "3", icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Profile Views", value: "45", icon: LayoutDashboard, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Welcome back, <span className="text-orange-500">John Doe!</span> 👋
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here is what’s happening with your job applications today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Recent Applications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Applications</h2>
            <button className="text-sm font-semibold text-orange-500 hover:text-orange-600">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100">
                    <Building2 size={24} className="text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">Frontend Developer</h3>
                    <p className="text-sm text-slate-500">TechCorp Solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600 border border-amber-100">
                    Under Review
                  </span>
                  <span className="text-xs text-slate-400">Applied 2 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Jobs */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Sparkles size={18} className="text-orange-500" /> Recommended
            </h2>
          </div>

          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="group cursor-pointer rounded-xl border border-slate-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/30">
                <h3 className="font-bold group-hover:text-orange-600 transition">React.js Engineer</h3>
                <p className="mt-1 text-sm text-slate-500">InnovateTech • Full Time</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin size={12} /> Bangalore</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 1d ago</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default SDashboard;