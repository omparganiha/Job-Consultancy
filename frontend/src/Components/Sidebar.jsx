import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Bookmark,
  ClipboardList,
  Calendar,
  Building2,
  PlusCircle,
  Users,
  CheckCircle,
  BarChart3,
  MessageSquare,
  MapPin,
  Tags,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Star,
} from "lucide-react";

const menuItems = [
  {
    section: "Main",
    items: [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
  },
  // {
  //   section: "Job Seeker",
  //   items: [
  //     { name: "Overview", path: "/dashboard/sdashboard", icon: LayoutDashboard },
  //     { name: "My Profile", path: "/dashboard/myprofile", icon: User },
  //     { name: "Resume", path: "/dashboard/resume", icon: FileText },
  //     { name: "Browse Jobs", path: "/dashboard/browsejobs", icon: Briefcase },
  //     { name: "Saved Jobs", path: "/dashboard/saved-jobs", icon: Bookmark },
  //     { name: "Apply Form", path: "/dashboard/applications", icon: ClipboardList },
  //     { name: "My Applications", path: "/dashboard/myapplications", icon: ClipboardList },
  //     { name: "Interviews", path: "/dashboard/interviews", icon: Calendar },
  //     { name: "Reviews", path: "/dashboard/reviews", icon: Star }, // ✅ Reviews added
  //     { name: "Help&Support", path: "/dashboard/SeekerSupport", icon: ClipboardList },
  //   ],
  // },
  // {
  //   section: "Job Provider",
  //   items: [
  //     { name: "Company Profile", path: "/dashboard/company", icon: Building2 },
  //     { name: "Post a Job", path: "/dashboard/post-job", icon: PlusCircle },
  //     { name: "My Jobs", path: "/dashboard/my-jobs", icon: Briefcase },
  //     { name: "Applicants", path: "/dashboard/applicants", icon: Users },
  //     { name: "Reviewss", path: "/dashboard/reviewss", icon: Star },
  //     { name: "Help&Support", path: "/dashboard/ProviderSupport", icon: Users },
  //   ],
  // },
  {
    section: "Admin",
    items: [
      { name: "Manage Users", path: "/dashboard/users", icon: Users },
      { name: "Pending Approvals", path: "/dashboard/approvals", icon: CheckCircle },
      { name: "All Jobs", path: "/dashboard/all-jobs", icon: Globe },
      { name: "Categories", path: "/dashboard/categories", icon: Tags },
      { name: "Locations", path: "/dashboard/locations", icon: MapPin },
      { name: "Support", path: "/dashboard/support", icon: MessageSquare },
      { name: "Review", path: "/dashboard/admin-review", icon: Star },
      { name: "Contact Inquiries", path: "/dashboard/ContactMsg", icon: Star },


    ],
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate(); // <-- Added useNavigate for redirect

  // Logout Handler
  const handleLogout = () => {
    // Agar aapko local storage clear karna ho to yaha kar sakte hain
    // localStorage.removeItem("token");
    navigate("/"); // Landing page par redirect
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-slate-950 text-slate-300 z-40 border-r border-slate-800/60
        transition-all duration-300 ease-in-out flex flex-col shadow-2xl shadow-slate-900/50
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Decorative Dreamy Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-orange-500/5 blur-3xl pointer-events-none"></div>

      {/* Logo + Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/60 relative z-10">
        {isOpen ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
              <Briefcase size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-white text-lg tracking-wide whitespace-nowrap">
              Job<span className="text-orange-500">ERP</span>
            </span>
          </div>
        ) : (
          <div className="w-9 h-9 mx-auto rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Briefcase size={18} className="text-white" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300 ${
            !isOpen ? "hidden" : ""
          }`}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {!isOpen && (
        <div className="flex justify-center py-3 border-b border-slate-800/60 relative z-10">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-5 px-3 relative z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            {isOpen && (
              <p className="px-3 mb-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
                {section.section}
              </p>
            )}

            <ul className="space-y-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/dashboard"}
                      title={!isOpen ? item.name : undefined}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                        ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-500/25"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }
                        ${!isOpen ? "justify-center px-0" : ""}`
                      }
                    >
                      <Icon
                        size={20}
                        className={`flex-shrink-0 transition-transform duration-300 ${
                          !isOpen && "group-hover:scale-110"
                        }`}
                      />
                      {isOpen && (
                        <span className="text-sm font-medium whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="border-t border-slate-800/60 p-4 relative z-10 bg-slate-950">
        <button
          onClick={handleLogout} // <-- Connected Logout function here
          className={`flex items-center gap-3 px-3 py-3 w-full rounded-xl
            bg-slate-900 border border-slate-800 text-slate-400 hover:bg-red-500 hover:border-red-400 hover:text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300
            ${!isOpen ? "justify-center px-0" : ""}`}
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;