import { useState, useEffect } from "react";
import { 
  Calendar, Clock, Video, MapPin, Search, Filter, 
  MoreVertical, ExternalLink, Sparkles, User, Briefcase, 
  CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InterviewList = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  // ==================== LOAD DATA ====================
  useEffect(() => {
    const loadInterviews = () => {
      let savedInterviews = JSON.parse(localStorage.getItem("interviewList") || "[]");
      
      // Load mock data if empty for demonstration
      if (!savedInterviews || savedInterviews.length === 0) {
        savedInterviews = [
          {
            id: "INT-001",
            candidateName: "Rahul Sharma",
            candidateEmail: "rahul@example.com",
            jobTitle: "Senior Frontend Developer",
            company: "TechCorp Solutions",
            interviewDate: "2023-10-24",
            interviewTime: "10:30",
            duration: "60",
            interviewType: "Online",
            interviewRound: "Technical Round",
            interviewerName: "Sarah Jenkins (HR)",
            meetingLink: "https://meet.google.com/abc-defg-hij",
            status: "Scheduled"
          },
          {
            id: "INT-002",
            candidateName: "Priya Singh",
            candidateEmail: "priya@example.com",
            jobTitle: "React Native Engineer",
            company: "InnovateTech",
            interviewDate: "2023-10-26",
            interviewTime: "14:00",
            duration: "60",
            interviewType: "Offline (In-Person)",
            interviewRound: "Final Round",
            interviewerName: "Michael Scott (Tech Lead)",
            address: "Tower B, Cyber City, Bangalore",
            status: "Scheduled"
          },
          {
            id: "INT-003",
            candidateName: "Amit Kumar",
            candidateEmail: "amit@example.com",
            jobTitle: "UI/UX Designer",
            company: "DesignStudio",
            interviewDate: "2023-10-20",
            interviewTime: "11:00",
            duration: "45",
            interviewType: "Online",
            interviewRound: "Screening",
            interviewerName: "Pam Beesly",
            meetingLink: "https://zoom.us/j/123456789",
            status: "Completed"
          }
        ];
        localStorage.setItem("interviewList", JSON.stringify(savedInterviews));
      }
      
      // Sort by date/time (newest/upcoming first)
      savedInterviews.sort((a, b) => new Date(`${a.interviewDate}T${a.interviewTime}`) - new Date(`${b.interviewDate}T${b.interviewTime}`));
      setInterviews(savedInterviews);
    };

    loadInterviews();
  }, []);

  // ==================== FILTERING LOGIC ====================
  const filteredInterviews = interviews.filter((interview) => {
    // 1. Tab Filter
    const isUpcoming = ["Scheduled", "Rescheduled"].includes(interview.status);
    const isCompleted = interview.status === "Completed";
    const isCanceled = ["Cancelled", "No Show"].includes(interview.status);

    let matchesTab = false;
    if (activeTab === "Upcoming" && isUpcoming) matchesTab = true;
    if (activeTab === "Completed" && isCompleted) matchesTab = true;
    if (activeTab === "Canceled" && isCanceled) matchesTab = true;

    // 2. Search Filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (interview.candidateName || "").toLowerCase().includes(searchLower) ||
      (interview.jobTitle || "").toLowerCase().includes(searchLower) ||
      (interview.company || "").toLowerCase().includes(searchLower) ||
      (interview.interviewerName || "").toLowerCase().includes(searchLower);

    return matchesTab && matchesSearch;
  });

  // ==================== HELPER FORMATTERS ====================
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatTime = (timeString, durationMins) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const startObj = new Date();
    startObj.setHours(hours, minutes, 0);
    
    const endObj = new Date(startObj.getTime() + (durationMins || 30) * 60000);
    
    const formatOpts = { hour: 'numeric', minute: '2-digit', hour12: true };
    return `${startObj.toLocaleTimeString('en-US', formatOpts)} - ${endObj.toLocaleTimeString('en-US', formatOpts)}`;
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "Scheduled":
      case "Rescheduled":
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-200">{status}</span>;
      case "Completed":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">Completed</span>;
      case "Cancelled":
      case "No Show":
        return <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-200">{status}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">{status}</span>;
    }
  };

  const tabs = ["Upcoming", "Completed", "Canceled"];

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-8">
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <Sparkles size={14} /> YOUR SCHEDULE
        </p>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          My <span className="text-orange-500">Interviews</span>
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Keep track of your upcoming meetings and past interview records.
        </p>
      </div>

      {/* ==================== CONTROLS (TABS & SEARCH) ==================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === tab 
                  ? "text-orange-600" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search candidate, job..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/add-job', { state: { defaultTab: "interview" }})}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 border border-orange-600 rounded-xl text-sm font-bold text-white shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 whitespace-nowrap"
          >
            + Schedule New
          </button>
        </div>
      </div>

      {/* ==================== TABLE VIEW ==================== */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate & Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type & Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Interviewer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-slate-50/50 transition-colors group">
                    
                    {/* 1. Candidate & Job */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                          {interview.candidateName ? interview.candidateName.charAt(0).toUpperCase() : <User size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{interview.candidateName}</p>
                          <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{interview.jobTitle}</p>
                          <p className="text-[10px] font-medium text-slate-400">{interview.company}</p>
                        </div>
                      </div>
                    </td>

                    {/* 2. Schedule */}
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          <Calendar size={14} className="text-slate-400" />
                          {formatDate(interview.interviewDate)}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <Clock size={14} className="text-slate-400" />
                          {formatTime(interview.interviewTime, interview.duration)}
                        </div>
                      </div>
                    </td>

                    {/* 3. Type & Location */}
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        {interview.interviewType === "Online" ? (
                          <>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 w-fit px-2 py-1 rounded-md">
                              <Video size={12} className="text-blue-500" /> Video Interview
                            </div>
                            <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-blue-500 hover:underline block truncate max-w-[150px]">
                              {interview.meetingLink || "Link not provided"}
                            </a>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 w-fit px-2 py-1 rounded-md">
                              <MapPin size={12} className="text-orange-500" /> In-Person
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 truncate max-w-[150px]" title={interview.address}>
                              {interview.address || "Address not provided"}
                            </p>
                          </>
                        )}
                      </div>
                    </td>

                    {/* 4. Interviewer */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{interview.interviewerName}</span>
                        <span className="text-[11px] font-semibold text-slate-500">{interview.interviewRound}</span>
                      </div>
                    </td>

                    {/* 5. Status */}
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(interview.status)}
                    </td>

                    {/* 6. Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Action Primary Button (Join/View) */}
                        {interview.status === "Scheduled" || interview.status === "Rescheduled" ? (
                          interview.interviewType === "Online" && interview.meetingLink ? (
                            <a 
                              href={interview.meetingLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all active:scale-95"
                            >
                              Join <ExternalLink size={12} />
                            </a>
                          ) : (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all active:scale-95">
                              Details
                            </button>
                          )
                        ) : (
                           <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-lg transition-all active:scale-95">
                            View Record
                          </button>
                        )}

                        {/* Options Menu */}
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                        <AlertCircle size={28} className="text-slate-300" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-700">No {activeTab.toLowerCase()} interviews found</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1 max-w-sm">
                        You don't have any interviews matching the current filters or tab selection.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InterviewList;