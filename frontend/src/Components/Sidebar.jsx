import { NavLink } from "react-router-dom";
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
  Star, // ✅ Reviews icon
} from "lucide-react";

const menuItems = [
  {
    section: "Main",
    items: [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
  },

    {
    section: "Company",
    items: [
      { name: "Services", path: "/services", icon: Briefcase },
      { name: "About Us", path: "/About", icon: Globe },
    ],
  },
  {
    section: "Job Seeker",
    items: [
      { name: "Overview", path: "/dashboard/sdashboard", icon: LayoutDashboard },
      { name: "My Profile", path: "/dashboard/myprofile", icon: User },
      { name: "Resume", path: "/dashboard/resume", icon: FileText },
      { name: "Browse Jobs", path: "/dashboard/browsejobs", icon: Briefcase },
      { name: "Saved Jobs", path: "/dashboard/saved-jobs", icon: Bookmark },
      { name: "Apply Form", path: "/dashboard/applications", icon: ClipboardList },
      { name: "My Applications", path: "/dashboard/myapplications", icon: ClipboardList },
      { name: "Interviews", path: "/dashboard/interviews", icon: Calendar },
      { name: "Reviews", path: "/dashboard/reviews", icon: Star }, // ✅ Reviews added
      { name: "Help&Support", path: "/dashboard/SeekerSupport", icon: ClipboardList },

    ],
  },
  {
    section: "Job Provider",
    items: [
      { name: "Company Profile", path: "/dashboard/company", icon: Building2 },
      { name: "Post a Job", path: "/dashboard/post-job", icon: PlusCircle },
      { name: "My Jobs", path: "/dashboard/my-jobs", icon: Briefcase },
      { name: "Applicants", path: "/dashboard/applicants", icon: Users },
            { name: "Reviews", path: "/dashboard/reviews", icon: Star },
      { name: "Help&Support", path: "/dashboard/ProviderSupport", icon: Users },

    ],
  },
  {
    section: "Admin",
    items: [
      { name: "Manage Users", path: "/dashboard/users", icon: Users },
      { name: "Pending Approvals", path: "/dashboard/approvals", icon: CheckCircle },
      { name: "All Jobs", path: "/dashboard/all-jobs", icon: Globe },
      { name: "Categories", path: "/dashboard/categories", icon: Tags },
      { name: "Locations", path: "/dashboard/locations", icon: MapPin },
      { name: "Support", path: "/dashboard/support", icon: MessageSquare },      { name: "Reviews", path: "/dashboard/reviews", icon: Star },
    ],
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-cream text-black z-40
        transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {isOpen ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
              <Briefcase size={18} className="text-black" />
            </div>
            <span className="font-bold text-black text-lg whitespace-nowrap">
              JobERP
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-orange-500 flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg hover:bg-slate-800 text-black hover:text-white transition-colors ${
            !isOpen ? "hidden" : ""
          }`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {!isOpen && (
        <div className="flex justify-center py-2 border-b border-slate-800">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4 px-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-4">
            {isOpen && (
              <p className="px-3 mb-2 text-xs font-semibold text-black uppercase tracking-wider">
                {section.section}
              </p>
            )}

            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/dashboard"}
                      title={!isOpen ? item.name : undefined}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20"
                            : "text-black-300 hover:bg-slate-800 hover:text-white"
                        }
                        ${!isOpen ? "justify-center px-0" : ""}`
                      }
                    >
                      <Icon size={20} className="flex-shrink-0" />
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

      <div className="border-t border-slate-800 p-3">
        <button
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl
            hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors
            ${!isOpen ? "justify-center px-0" : ""}`}
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;