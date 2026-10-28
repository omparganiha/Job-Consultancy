import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Calendar,
  Users,
  CheckCircle,
  MessageSquare,
  MapPin,
  Tags,
  Globe,
  Star,
} from "lucide-react";

const menuItems = [
  {
    section: "Main",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Staff", path: "/dashboard/staff", icon: Users },
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
      { name: "Support", path: "/dashboard/support", icon: MessageSquare },
      { name: "Review", path: "/dashboard/admin-review", icon: Star },
      { name: "Report", path: "/dashboard/reports", icon: FileText },
      { name: "Contact Inquiries", path: "/dashboard/ContactMsg", icon: Star },
      { name: "Add Job", path: "/dashboard/AddJob", icon: Briefcase }, 
      { name: "Interviews", path: "/dashboard/interviews", icon: Calendar },
    ],
  },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 flex h-screen flex-col bg-white text-slate-700
        border-r border-slate-200/80 shadow-[4px_0_24px_rgba(0,0,0,0.06)]
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Logo Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
        {isOpen ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
              <Briefcase size={18} />
            </div>
            <span className="whitespace-nowrap text-lg font-extrabold text-slate-900 tracking-wide">
              Job<span className="text-orange-500">ERP</span>
            </span>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
            <Briefcase size={18} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            {isOpen && (
              <p className="mb-2 px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
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
                        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200
                        ${
                          isActive
                            // ? "bg-orange-500 font-bold text-white shadow-md shadow-orange-500/25"
                             ? "bg-gradient-to-r from-orange-50 to-orange-50 text-orange-600 font-semibold shadow-sm"
                            : "font-semibold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                        }
                        ${!isOpen ? "justify-center px-0" : ""}`
                      }
                    >
                      <Icon
                        size={19}
                        className={`shrink-0 transition-transform duration-200 ${
                          !isOpen && "group-hover:scale-110"
                        }`}
                      />
                      {isOpen && (
                        <span className="whitespace-nowrap truncate">{item.name}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;