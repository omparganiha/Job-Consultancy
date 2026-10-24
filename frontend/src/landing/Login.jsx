import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Sparkles,
  User,
  Building2,
  ShieldCheck,
  X,
  Briefcase
} from "lucide-react";

// Hardcoded users
const USERS = [
  {
    email: "seeker@joberp.com",
    password: "seeker123",
    role: "Job Seeker",
    name: "Rahul Sharma",
  },
  {
    email: "provider@joberp.com",
    password: "provider123",
    role: "Job Provider",
    name: "TechCorp HR",
  },
  {
    email: "admin@joberp.com",
    password: "admin123",
    role: "Admin",
    name: "Admin User",
    redirect: "/dashboard", // Sirf admin dashboard jayega
  },
];

export default function LoginDrawer({ isOpen, onClose, onLoginSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email aur password dono bharo.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = USERS.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!user) {
        setError("Invalid credentials. Demo credentials try karo.");
        setLoading(false);
        return;
      }

      // Save session
      const userData = { email: user.email, name: user.name, role: user.role, isLoggedIn: true };
      localStorage.setItem("authUser", JSON.stringify(userData));

      setLoading(false);

      if (user.role === "Admin") {
        navigate(user.redirect); // Admin goes to dashboard
      } else {
        onLoginSuccess(userData); // Seeker/Provider stay on page & update Navbar
        onClose(); // Close drawer
      }
    }, 800);
  };

  const fillDemo = (type) => {
    const demo = USERS.find((u) => u.role === type);
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
      setError("");
    }
  };

  // If Drawer is closed, don't render content (but keep animation classes handled by wrapper)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Blurred Overlay (Click to close) */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-[fadeIn_0.3s_ease-out]" 
        onClick={onClose}
      ></div>

      {/* Right Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
              <Briefcase size={16} />
            </div>
            <span className="text-lg font-extrabold text-slate-900">Job<span className="text-orange-500">ERP</span></span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={14} /> WELCOME BACK
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Login to account</h2>
          <p className="mt-1 text-sm text-slate-500 mb-6">
            New here? <button className="font-bold text-orange-500 hover:text-orange-600">Register free</button>
          </p>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-orange-500 hover:text-orange-600">Forgot?</button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-60">
              {loading ? "Signing in..." : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          {/* Demo Auto-fill */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">Auto-fill Demo IDs</p>
            <div className="grid gap-2 grid-cols-3">
              <DemoBtn label="Seeker" icon={User} onClick={() => fillDemo("Job Seeker")} />
              <DemoBtn label="Provider" icon={Building2} onClick={() => fillDemo("Job Provider")} />
              <DemoBtn label="Admin" icon={ShieldCheck} onClick={() => fillDemo("Admin")} />
            </div>
          </div>
        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function DemoBtn({ label, icon: Icon, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white p-2 text-[10px] font-bold text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 shadow-sm">
      <Icon size={16} /> {label}
    </button>
  );
}