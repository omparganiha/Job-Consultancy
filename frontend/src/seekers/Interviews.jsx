import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Video,
  MapPin,
  Phone,
  Building2,
  ExternalLink,
  MoreVertical,
  CheckCircle,
  XCircle,
  Calendar,
  Sparkles
} from "lucide-react";

function Interviews() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const tabs = ["Upcoming", "Completed", "Canceled"];

  const interviewsData = [
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Senior Frontend Developer",
      date: "24 Oct 2023",
      time: "10:30 AM - 11:30 AM",
      type: "Video",
      link: "https://meet.google.com/abc-defg-hij",
      status: "Upcoming",
      interviewer: "Sarah Jenkins (HR)",
    },
    {
      id: 2,
      company: "InnovateTech",
      role: "React Native Engineer",
      date: "26 Oct 2023",
      time: "02:00 PM - 03:00 PM",
      type: "In-Person",
      location: "Tower B, Cyber City, Bangalore",
      status: "Upcoming",
      interviewer: "Michael Scott (Tech Lead)",
    },
    {
      id: 3,
      company: "StartupX",
      role: "UI Developer",
      date: "15 Oct 2023",
      time: "11:00 AM - 11:30 AM",
      type: "Phone",
      phoneNo: "+91 9876543210",
      status: "Completed",
      interviewer: "Priya Sharma",
    },
    {
      id: 4,
      company: "Designify",
      role: "Frontend Engineer",
      date: "10 Oct 2023",
      time: "04:00 PM - 05:00 PM",
      type: "Video",
      status: "Canceled",
      interviewer: "Alex Johnson",
    },
  ];

  // Tab filter logic
  const filteredInterviews = interviewsData.filter(
    (interview) => interview.status === activeTab
  );

  // Helper function to get the correct icon based on Interview Type
  const getTypeIcon = (type) => {
    switch (type) {
      case "Video":
        return <Video size={16} />;
      case "In-Person":
        return <MapPin size={16} />;
      case "Phone":
        return <Phone size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} />
            YOUR SCHEDULE
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            My <span className="text-orange-500">Interviews</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep track of your upcoming meetings and past interview records.
          </p>
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

      {/* Interview Cards Grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {filteredInterviews.map((interview) => (
          <div
            key={interview.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            {/* Card Header (Company & Role) */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                  <Building2 size={24} className="text-slate-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{interview.role}</h2>
                  <p className="text-sm font-medium text-orange-600">{interview.company}</p>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="shrink-0">
                {interview.status === "Upcoming" && (
                  <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    Upcoming
                  </span>
                )}
                {interview.status === "Completed" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle size={12} /> Completed
                  </span>
                )}
                {interview.status === "Canceled" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                    <XCircle size={12} /> Canceled
                  </span>
                )}
              </div>
            </div>

            {/* Date, Time & Details Box */}
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-medium text-slate-800">{interview.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Time</p>
                    <p className="text-sm font-medium text-slate-800">{interview.time}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 border-t border-slate-200 pt-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                  {getTypeIcon(interview.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {interview.type} Interview
                  </p>
                  {interview.type === "Video" && (
                    <a href={interview.link} target="_blank" rel="noreferrer" className="mt-0.5 truncate text-sm font-medium text-blue-600 hover:underline">
                      {interview.link}
                    </a>
                  )}
                  {interview.type === "In-Person" && (
                    <p className="mt-0.5 text-sm font-medium text-slate-800">{interview.location}</p>
                  )}
                  {interview.type === "Phone" && (
                    <p className="mt-0.5 text-sm font-medium text-slate-800">{interview.phoneNo}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-5 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Interviewer: <span className="font-semibold text-slate-700">{interview.interviewer}</span>
              </div>
              
              <div className="flex gap-2">
                {interview.status === "Upcoming" && interview.type === "Video" && (
                  <a
                    href={interview.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    Join <ExternalLink size={14} />
                  </a>
                )}
                
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInterviews.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <CalendarDays size={32} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800">No {activeTab.toLowerCase()} interviews</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            {activeTab === "Upcoming" 
              ? "You don't have any interviews scheduled at the moment. Keep applying to jobs!" 
              : `You don't have any ${activeTab.toLowerCase()} interviews yet.`}
          </p>
        </div>
      )}
    </main>
  );
}

export default Interviews;