import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Briefcase, Menu, X, LogIn, ChevronRight } from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll event for premium dynamic glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu automatically when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
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
            Job<span className="text-orange-500">Khojo</span>
          </span>
        </Link>

        {/* Desktop Links (Premium Capsule Hover) */}
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

        {/* Desktop Login Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/30"
          >
            <LogIn size={16} className="transition-transform group-hover:-translate-x-1" />
            Login
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl bg-slate-50 p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu (Animated Slide Down) */}
      <div
        className={`absolute left-0 top-full w-full origin-top transform border-t border-slate-200/50 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "scale-y-100 opacity-100 shadow-xl" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.name}
              <ChevronRight size={16} className="opacity-50" />
            </NavLink>
          ))}
          
          <div className="my-2 border-t border-slate-100" />
          
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition active:scale-95"
          >
            <LogIn size={18} />
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;