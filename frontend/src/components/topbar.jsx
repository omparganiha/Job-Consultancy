import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  ShieldCheck,
  Building2,
} from "lucide-react";

// Route path to Title mapping
const pageTitles = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/sdashboard": "Job Seeker Overview",
  "/dashboard/myprofile": "My Profile",
  "/dashboard/resume": "Resume Tools",
  "/dashboard/browsejobs": "Browse Jobs",
  "/dashboard/saved-jobs": "Saved Jobs",
  "/dashboard/applications": "Job Application",
  "/dashboard/myapplications": "My Applications",
  "/dashboard/interviews": "Scheduled Interviews",
  "/dashboard/company": "Company Profile",
  "/dashboard/add-company": "Add Company",
  "/dashboard/post-job": "Post a New Job",
  "/dashboard/my-jobs": "My Posted Jobs",
  "/dashboard/applicants": "Job Applicants",
  "/dashboard/users": "Manage Users",
  "/dashboard/approvals": "Pending Job Approvals",
  "/dashboard/all-jobs": "All Published Jobs",
  "/dashboard/categories": "Manage Categories",
  "/dashboard/locations": "Manage Locations",
  "/dashboard/support": "Support Tickets",
  "/dashboard/reviews": "Reviews",
  "/dashboard/admin-review": "Admin Review",
  "/dashboard/staff": "Staff Management",
  "/dashboard/add-staff": "Add Staff",
};

const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  // Current page Title auto detect
  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  // Demo user data (real app me AuthContext / localStorage se aayega)
  const user = {
    name: "John Doe",
    role: "Job Seeker", // "Job Seeker" | "Job Provider" | "Admin"
    email: "john@example.com",
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Left Section: Menu Toggle + Dynamic Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Dynamic Title */}
        <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
          {currentTitle}
        </h1>
      </div>

      {/* Right Section: Search + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Bar */}
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 w-60 lg:w-72">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search jobs, candidates..."
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification Icon */}
        <button
          onClick={() => navigate("/dashboard/support")}
          className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition"
          title="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-50 transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold">
              {user.name.charAt(0)}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {user.name}
              </p>
              <p className="text-[11px] font-medium text-orange-600 leading-tight">
                {user.role}
              </p>
            </div>

            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg z-50"
              onMouseLeave={() => setProfileOpen(false)}
            >
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-800">{user.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/dashboard/myprofile");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                <User size={16} />
                My Profile
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/dashboard");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                <Briefcase size={16} />
                Dashboard
              </button>

              <div className="my-1 border-t border-slate-100"></div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  // Logout logic
                  alert("Logged out!");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;