import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
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
} from "lucide-react";

// Hardcoded users (baad me Django API se replace hoga)
const USERS = [
  {
    email: "seeker@joberp.com",
    password: "seeker123",
    role: "Job Seeker",
    name: "Rahul Sharma",
    redirect: "/dashboard/sdashboard",
  },
  {
    email: "provider@joberp.com",
    password: "provider123",
    role: "Job Provider",
    name: "TechCorp HR",
    redirect: "/dashboard/company",
  },
  {
    email: "admin@joberp.com",
    password: "admin123",
    role: "Admin",
    name: "Admin User",
    redirect: "/dashboard",
  },
];

function Login() {
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

    // Fake delay (real feel ke liye)
    setTimeout(() => {
      const user = USERS.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!user) {
        setError("Invalid email or password. Demo credentials try karo.");
        setLoading(false);
        return;
      }

      // Save session in localStorage
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          email: user.email,
          name: user.name,
          role: user.role,
          isLoggedIn: true,
        })
      );

      setLoading(false);
      navigate(user.redirect);
    }, 800);
  };

  // Quick fill demo credentials
  const fillDemo = (type) => {
    const demo = USERS.find((u) => u.role === type);
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
      setError("");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* LEFT — Branding Panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <Briefcase size={20} />
            </div>
            <span className="text-2xl font-extrabold">
              Job<span className="text-orange-500">ERP</span>
            </span>
          </Link>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Welcome back to your{" "}
            <span className="text-orange-500">career hub.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-400">
            Login to manage applications, post jobs, track interviews, and grow
            your professional network.
          </p>

          <div className="mt-10 space-y-4">
            <Feature
              icon={User}
              title="Job Seekers"
              desc="Track applications & interviews"
            />
            <Feature
              icon={Building2}
              title="Employers"
              desc="Post jobs & manage candidates"
            />
            <Feature
              icon={ShieldCheck}
              title="Admins"
              desc="Approve jobs & manage platform"
            />
          </div>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} JobERP Consultancy. All rights reserved.
        </p>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Briefcase size={18} />
            </div>
            <span className="text-xl font-extrabold text-slate-900">
              Job<span className="text-orange-500">ERP</span>
            </span>
          </Link>

          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={14} />
            SIGN IN
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Login to your account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Register free
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-600">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-orange-500 hover:text-orange-600"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              Demo Credentials — Click to autofill
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <DemoBtn
                label="Seeker"
                icon={User}
                onClick={() => fillDemo("Job Seeker")}
              />
              <DemoBtn
                label="Provider"
                icon={Building2}
                onClick={() => fillDemo("Job Provider")}
              />
              <DemoBtn
                label="Admin"
                icon={ShieldCheck}
                onClick={() => fillDemo("Admin")}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-orange-500">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function DemoBtn({ label, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

export default Login;