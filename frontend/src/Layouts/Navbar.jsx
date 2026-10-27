import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Menu,
  X,
  LifeBuoy,
  LogIn,
  User,
  LogOut,
  LayoutDashboard,
  FileText,
  Bookmark,
  ClipboardList,
  Calendar,
  Star,
  Building2,
  PlusCircle,
  Users,
} from "lucide-react";

import LoginDrawer from "../landing/Login";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const dropdownRef = useRef(null);

  // ─── UPDATED: Removed '/dashboard' from Seeker paths ───
  const seekerMenu = [
    { name: "Overview", path: "/sdashboard", icon: LayoutDashboard },
    { name: "My Profile", path: "/myprofile", icon: User },
    { name: "Resume", path: "/resume", icon: FileText },
    { name: "Saved Jobs", path: "/saved-jobs", icon: Bookmark },
    { name: "Apply Form", path: "/applications", icon: ClipboardList },
    { name: "My Applications", path: "/myapplications", icon: ClipboardList },
    { name: "Interviews", path: "/interviews", icon: Calendar },
    { name: "Reviews", path: "/reviews", icon: Star },
    { name: "Help & Support", path: "/SeekerSupport", icon: LifeBuoy },
  ];

  // ─── UPDATED: Removed '/dashboard' from Provider paths ───
  const providerMenu = [
    { name: "Company Profile", path: "/company", icon: Building2 },
    { name: "Post a Job", path: "/post-job", icon: PlusCircle },
    { name: "My Jobs", path: "/my-jobs", icon: Briefcase },
    { name: "Applicants", path: "/applicants", icon: Users },
    { name: "Reviews", path: "/reviewss", icon: Star },
    { name: "Help & Support", path: "/ProviderSupport", icon: LifeBuoy },
  ];

  const getRoleKey = (role = "") => {
    const r = String(role).toLowerCase();
    if (r.includes("seeker")) return "seeker";
    if (r.includes("provider")) return "provider";
    if (r.includes("admin") || r.includes("staff")) return "admin";
    return "";
  };

  const roleMenu =
    getRoleKey(authUser?.role) === "seeker"
      ? seekerMenu
      : getRoleKey(authUser?.role) === "provider"
        ? providerMenu
        : [];

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        try {
          setAuthUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Invalid user data:", error);
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
      }
    };

    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

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
    setMobileOpen(false);
    setShowLogoutConfirm(false);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const handleHelpSupport = () => {
    setProfileDropdownOpen(false);
    setMobileOpen(false);
    navigate("/help-support");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const menuLinkClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-600";

  const mobileMenuLinkClass =
    "mb-2 flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
          ? "border-b border-slate-200/50 bg-white/80 py-2 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-white py-4"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105">
              <Briefcase size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Job<span className="text-orange-500">ERP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden items-center gap-4 lg:flex">
            {authUser && roleMenu.length > 0 ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-2 pr-4 transition-all hover:border-orange-200 hover:bg-orange-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-sm">
                    {authUser.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-bold leading-tight text-slate-800">
                      {authUser.name}
                    </span>
                    <span className="text-[10px] font-semibold capitalize text-orange-600">
                      {authUser.role}
                    </span>
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {authUser.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {authUser.email}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                        {authUser.role}
                      </p>
                    </div>

                    {/* Role-based menu */}
                    <div className="max-h-[60vh] space-y-1 overflow-y-auto p-2 [scrollbar-width:thin]">
                      {roleMenu.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setProfileDropdownOpen(false)}
                            className={menuLinkClass}
                          >
                            <Icon size={16} className="shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setShowLogoutConfirm(true);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                      >
                        <LogOut size={16} className="shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/30"
              >
                <LogIn
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-xl bg-slate-50 p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-full w-full origin-top transform border-t border-slate-200/50 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${mobileOpen
            ? "scale-y-100 opacity-100 shadow-xl"
            : "pointer-events-none scale-y-0 opacity-0"
            }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="my-2 border-t border-slate-100" />

            {authUser ? (
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                    {authUser.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {authUser.name}
                    </p>
                    <p className="text-xs font-bold capitalize text-orange-600">
                      {authUser.role}
                    </p>
                  </div>
                </div>

                {/* Role menus mobile */}
                <div className="max-h-[50vh] overflow-y-auto pr-1">
                  {roleMenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={mobileMenuLinkClass}
                      >
                        <Icon size={16} className="shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setIsLoginOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-md active:scale-95"
              >
                <LogIn size={18} />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      </header>

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

      <LoginDrawer
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          setAuthUser(user);
          window.dispatchEvent(new Event("auth-change"));
        }}
      />
    </>
  );
}

export default Navbar;