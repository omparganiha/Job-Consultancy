import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, ClipboardList,
  Calendar, Bell, Settings, Building2, PlusCircle, Users, CheckCircle,
  XCircle, BarChart3, MessageSquare, MapPin, Tags, LogOut,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const menuItems = [
  {
    section: 'Main',
    items: [{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }],
  },
  {
    section: 'Job Seeker',
    items: [
      { name: 'Overview', path: '/dashboard/sdashboard', icon: LayoutDashboard },
      { name: 'My Profile', path: '/dashboard/myprofile', icon: User },
      { name: 'Resume', path: '/dashboard/resume', icon: FileText },
      { name: 'Browse Jobs', path: '/dashboard/jobs', icon: Briefcase },
      { name: 'Saved Jobs', path: '/dashboard/saved-jobs', icon: Bookmark },
      { name: 'Applications', path: '/dashboard/applications', icon: ClipboardList },
      { name: 'My Applications', path: '/dashboard/myapplications', icon: ClipboardList },
      { name: 'Interviews', path: '/dashboard/Interviews', icon: Calendar },
    ],
  },
  {
    section: 'Job Provider',
    items: [
      { name: 'Company Profile', path: '/dashboard/company', icon: Building2 },
      { name: 'Post a Job', path: '/dashboard/post-job', icon: PlusCircle },
      { name: 'My Jobs', path: '/dashboard/my-jobs', icon: Briefcase },
      { name: 'Applicants', path: '/dashboard/applicants', icon: Users },
    ],
  },
  {
    section: 'Admin',
    items: [
      { name: 'Manage Users', path: '/dashboard/users', icon: Users },
      { name: 'Pending Approvals', path: '/dashboard/approvals', icon: CheckCircle },
      { name: 'Rejected Jobs', path: '/dashboard/rejected', icon: XCircle },
      { name: 'Categories', path: '/dashboard/categories', icon: Tags },
      { name: 'Locations', path: '/dashboard/locations', icon: MapPin },
      { name: 'Reports', path: '/dashboard/reports', icon: BarChart3 },
      { name: 'Support', path: '/dashboard/support', icon: MessageSquare },
    ],
  },
  {
    section: 'Account',
    items: [
      { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
      { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ],
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-black text-slate-300 z-40
        transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg whitespace-nowrap">
              JobERP
            </span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-4">
            {isOpen && (
              <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
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
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                        ${isActive ? 'bg-orange-500 border border-orange-500 text-white' : 'hover:bg-slate-800 hover:text-white'}
                        ${!isOpen ? 'justify-center' : ''}`
                      }
                      title={!isOpen ? item.name : ''}
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

      {/* Logout */}
      <div className="border-t border-slate-800 p-3">
        <button
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg
            hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors
            ${!isOpen ? 'justify-center' : ''}`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;