import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
} from "lucide-react";

const pageTitles = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/applicants": "Job Applicants",
  "/dashboard/users": "Manage Users",
  "/dashboard/approvals": "Pending Job Approvals",
  "/dashboard/all-jobs": "All Published Jobs",
  "/dashboard/categories": "Manage Job Categories",
  "/dashboard/locations": "Manage Job Locations",
  "/dashboard/reports": "Reports",
  "/dashboard/support": "Support",
  "/dashboard/admin-review": "Admin Review",
  "/dashboard/staff": "Staff Management",
  "/dashboard/add-staff": "Add Staff",
  "/dashboard/AddJob": "Add Job",
  "/dashboard/interviews": "Track Interviews",
  "/dashboard/ContactMsg": "Contact Messages",
};

const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState({ name: "Admin", role: "Admin", email: "" });
  const dropdownRef = useRef(null);

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setShowLogoutConfirm(false);
    setProfileOpen(false);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
            {currentTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden w-60 items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 md:flex lg:w-72">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs, candidates..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/support")}
            className="relative rounded-xl p-2 text-slate-600 transition hover:bg-slate-100"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <div className="relative border-l border-slate-200 pl-2" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-slate-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 font-bold text-orange-600">
                {(user.name || "A").charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold leading-tight text-slate-800">
                  {user.name}
                </p>
                <p className="text-[11px] font-medium leading-tight text-orange-600">
                  {user.role}
                </p>
              </div>

              <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <div className="mb-1 border-b border-slate-100 px-3 py-2">
                  <p className="text-xs font-bold text-slate-800">{user.name}</p>
                  <p className="truncate text-[11px] text-slate-400">{user.email}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/dashboard");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <Briefcase size={16} />
                  Dashboard
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirm Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Logout?</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;