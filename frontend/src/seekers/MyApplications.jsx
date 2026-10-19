import { useState } from "react";
import { 
  ClipboardList, 
  Search, 
  Building2, 
  Calendar, 
  MapPin, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

function MyApplications() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Applied", "Shortlisted", "Interview", "Rejected"];

  const applications = [
    {
      id: 1,
      role: "Senior React Developer",
      company: "Google India",
      location: "Bangalore (Hybrid)",
      appliedOn: "12 Oct 2023",
      status: "Shortlisted",
    },
    {
      id: 2,
      role: "Frontend Engineer",
      company: "TechCorp",
      location: "Remote",
      appliedOn: "10 Oct 2023",
      status: "Applied",
    },
    {
      id: 3,
      role: "UI/UX Designer",
      company: "Designify",
      location: "Mumbai",
      appliedOn: "05 Oct 2023",
      status: "Rejected",
    },
    {
      id: 4,
      role: "Fullstack Developer",
      company: "StartupX",
      location: "Delhi",
      appliedOn: "01 Oct 2023",
      status: "Interview",
    },
  ];

  // Status ke hisaab se color aur icon change karne ka function
  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100"><Clock size={12} /> Applied</span>;
      case "Shortlisted":
        return <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-100"><CheckCircle size={12} /> Shortlisted</span>;
      case "Interview":
        return <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 border border-orange-200"><Calendar size={12} /> Interview</span>;
      case "Rejected":
        return <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-100"><XCircle size={12} /> Rejected</span>;
      default:
        return null;
    }
  };

  const filteredApps = activeTab === "All" ? applications : applications.filter(app => app.status === activeTab);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <ClipboardList size={15} />
            TRACKING
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            My <span className="text-orange-500">Applications</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by role or company..." 
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-50"
          />
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-6 flex overflow-x-auto border-b border-slate-200 pb-[1px] scrollbar-hide">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition-colors ${
                activeTab === tab 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApps.map((app) => (
          <div key={app.id} className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
            
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                <Building2 size={24} className="text-slate-400" />
              </div>
              
              <div>
                <h2 className="text-lg font-bold">{app.role}</h2>
                <p className="mt-1 text-sm font-medium text-orange-600">{app.company}</p>
                
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {app.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> Applied: {app.appliedOn}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-3">
              {getStatusBadge(app.status)}
              
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <ClipboardList size={40} className="text-slate-300 mb-3" />
            <p className="text-slate-500">No applications found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyApplications;