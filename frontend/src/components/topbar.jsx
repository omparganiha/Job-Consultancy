import { Menu, Bell, Search, UserCircle } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-64">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <UserCircle size={32} className="text-blue-600" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">John Doe</p>
            <p className="text-xs text-slate-500">Job Seeker</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;