import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Briefcase, Menu, X, LogIn, ChevronRight, User, LogOut } from "lucide-react";

// IMPORTANT: Apna path check karlena Login Drawer ke liye
import LoginDrawer from "../landing/Login"; 

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Auth State & Modals
  const [authUser, setAuthUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check login status on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      setAuthUser(JSON.parse(savedUser));
    }
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
    setProfileDropdownOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2"
            : "bg-white border-b border-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105">
              <Briefcase size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Job<span className="text-orange-500">ERP</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-orange-50 text-orange-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden items-center gap-4 lg:flex">
            {authUser ? (
              // LOGGED IN: Profile Dropdown
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 pl-2 pr-4 py-1.5 rounded-full transition-all"
                >
                  <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {authUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-bold text-slate-800 leading-none">{authUser.name}</span>
                    <span className="text-[10px] font-semibold text-orange-600">{authUser.role}</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{authUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{authUser.email}</p>
                    </div>
                    <div className="p-2">
                      <Link to="/myprofile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                        <User size={16} /> My Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // NOT LOGGED IN: Show Login Button (Triggers Drawer)
              <button
                onClick={() => setIsLoginOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/30"
              >
                <LogIn size={16} className="transition-transform group-hover:-translate-x-1" />
                Login
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          {/* Mobile toggle button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl bg-slate-50 p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu (Slide Down) */}
        <div
          className={`absolute left-0 top-full w-full origin-top transform border-t border-slate-200/50 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
            mobileOpen ? "scale-y-100 opacity-100 shadow-xl" : "scale-y-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${isActive ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50"}`}>
                {link.name}
              </NavLink>
            ))}
            
            <div className="my-2 border-t border-slate-100" />
            
            {authUser ? (
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">{authUser.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{authUser.name}</p>
                    <p className="text-xs text-orange-600 font-bold">{authUser.role}</p>
                  </div>
                </div>
                <Link to="/myprofile" className="flex items-center gap-2 w-full mb-2 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700">
                  <User size={16} /> My Profile
                </Link>
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 px-4 py-2.5 rounded-lg text-sm font-bold">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); setIsLoginOpen(true); }}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-md active:scale-95"
              >
                <LogIn size={18} /> Login / Register
              </button>
            )}
          </div>
        </div>
      </header>

      {/* LOGIN SLIDE-IN DRAWER */}
      <LoginDrawer 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(user) => setAuthUser(user)} // Auth state instantly updates Navbar
      />
    </>
  );
}

export default Navbar;