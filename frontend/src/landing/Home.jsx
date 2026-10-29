
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  ArrowRight,
  TrendingUp,
  MonitorPlay,
  HeartPulse,
  Calculator,
  Megaphone,
  BookOpen,
  Palette,
  Tag,
  Code,
  Truck,
  Car,
  Plane,
  Shield,
  Cpu,
  Database,
  Wifi,
  Globe,
  Music,
  Camera,
  Utensils,
  Home as HomeIcon,
  Wrench,
  ShoppingBag,
  Landmark,
  Scale,
  Layers,
  Sparkles,
  Tags,
  UserRound,
  FileText,
  CheckCircle2,
  Send,
  Target,
  Zap,
  MessageCircle,
  Bot,
  ChevronRight,
  X
} from "lucide-react";

import Chatbot from "./Chatbot";

const ICON_MAP = {
  MonitorPlay,
  Calculator,
  Megaphone,
  HeartPulse,
  BookOpen,
  Palette,
  Code,
  Briefcase,
  Building2,
  Users,
  Truck,
  Car,
  Plane,
  Shield,
  Cpu,
  Database,
  Wifi,
  Globe,
  Music,
  Camera,
  Utensils,
  Home: HomeIcon,
  Wrench,
  ShoppingBag,
  Landmark,
  Scale,
  Layers,
  Sparkles,
  Tags,
  Tag
};

const CATEGORY_STYLES = {
  "IT & Software": {
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  Healthcare: {
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  Finance: {
    color: "text-amber-700",
    bg: "bg-amber-50"
  },
  "Design & Art": {
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  Design: {
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  Marketing: {
    color: "text-pink-600",
    bg: "bg-pink-50"
  },
  Engineering: {
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  Education: {
    color: "text-stone-600",
    bg: "bg-stone-100"
  }
};

const DYNAMIC_COLORS = [
  { color: "text-orange-600", bg: "bg-orange-50" },
  { color: "text-amber-700", bg: "bg-amber-50" },
  { color: "text-rose-600", bg: "bg-rose-50" },
  { color: "text-purple-600", bg: "bg-purple-50" },
  { color: "text-stone-600", bg: "bg-stone-100" }
];

// Illustrative company logos, not claims of official partnerships.
const COMPANIES = [
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google",
    color: "#4285F4"
  },
  {
    name: "Microsoft",
    logo: "https://cdn.simpleicons.org/microsoft",
    color: "#5E5E5E"
  },
  {
    name: "Amazon",
    logo: "https://cdn.simpleicons.org/amazon",
    color: "#232F3E"
  },
  {
    name: "Adobe",
    logo: "https://cdn.simpleicons.org/adobe",
    color: "#EB1000"
  },
  {
    name: "Infosys",
    logo: "https://cdn.simpleicons.org/infosys",
    color: "#007CC3"
  },
  {
    name: "Tata Consultancy Services",
    logo: "https://cdn.simpleicons.org/tata",
    color: "#3366CC"
  }
];

const CAREERS = [
  {
    title: "Software Development",
    desc: "Build modern websites, applications and innovative digital products.",
    icon: Code,
    jobs: "Developers & Engineers",
    number: "01",
    tags: ["React", "Python", "Full Stack"]
  },
  {
    title: "Healthcare",
    desc: "Explore medical services, patient care and healthcare technology.",
    icon: HeartPulse,
    jobs: "Healthcare Professionals",
    number: "02",
    tags: ["Medical", "Clinical", "HealthTech"]
  },
  {
    title: "Finance & Accounting",
    desc: "Discover careers in banking, accounting and financial analysis.",
    icon: Calculator,
    jobs: "Finance Professionals",
    number: "03",
    tags: ["Banking", "Accounting", "Analysis"]
  },
  {
    title: "Digital Marketing",
    desc: "Grow brands through digital campaigns and creative strategies.",
    icon: Megaphone,
    jobs: "Marketing Specialists",
    number: "04",
    tags: ["SEO", "Social Media", "Content"]
  },
  {
    title: "Design & Creativity",
    desc: "Create engaging interfaces, visual designs and user experiences.",
    icon: Palette,
    jobs: "Designers & Creators",
    number: "05",
    tags: ["UI/UX", "Graphic Design", "Creative"]
  },
  {
    title: "Business & Management",
    desc: "Drive business growth through strategy, operations and leadership.",
    icon: Briefcase,
    jobs: "Business Professionals",
    number: "06",
    tags: ["Operations", "Strategy", "Management"]
  }
];

const FEATURED_JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    location: "Bangalore",
    type: "Full-Time",
    salary: "12L - 18L"
  },
  {
    id: 2,
    title: "UI/UX Product Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    salary: "8L - 12L"
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "GrowthX",
    location: "Mumbai",
    type: "Full-Time",
    salary: "10L - 15L"
  }
];

const SEEKER_STEPS = [
  {
    number: "01",
    title: "Create Your Account",
    desc: "Sign up and create your professional profile.",
    icon: UserRound
  },
  {
    number: "02",
    title: "Discover Opportunities",
    desc: "Find suitable jobs based on your skills and interests.",
    icon: Search
  },
  {
    number: "03",
    title: "Apply & Track",
    desc: "Apply for jobs and follow your application progress.",
    icon: Send
  }
];

const EMPLOYER_STEPS = [
  {
    number: "01",
    title: "Set Up Your Company",
    desc: "Create your company profile and add business details.",
    icon: Building2
  },
  {
    number: "02",
    title: "Publish Job Openings",
    desc: "Share job requirements and attract suitable candidates.",
    icon: FileText
  },
  {
    number: "03",
    title: "Find the Right Talent",
    desc: "Review applications and move forward with candidates.",
    icon: Target
  }
];

function Home() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [showWorkflow, setShowWorkflow] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserRole(user.role?.toLowerCase() || "");
      } catch {
        setUserRole("");
      }
    }

    const defaultCategories = [
      "IT & Software",
      "Finance",
      "Marketing",
      "Healthcare",
      "Education",
      "Design"
    ];

    const savedCats = localStorage.getItem("jobCategories");

    if (savedCats) {
      try {
        const parsedCats = JSON.parse(savedCats);

        setCategories(
          Array.isArray(parsedCats) ? parsedCats : defaultCategories
        );
      } catch {
        setCategories(defaultCategories);
      }
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.append("query", searchQuery.trim());
    }

    if (locationQuery.trim()) {
      params.append("location", locationQuery.trim());
    }

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden font-sans">
      <style>{`
        .joberp-letter {
          display: inline-block;
          opacity: 0;
          animation: joberp-letter-fly 1.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--letter-delay, 0s);
          will-change: transform, opacity;
        }

        .joberp-gradient-letter {
          background: linear-gradient(90deg, #f97316, #ea580c, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .joberp-letter:nth-child(4n + 1) {
          --fly-x: -70px;
          --fly-y: -45px;
          --fly-r: -20deg;
        }

        .joberp-letter:nth-child(4n + 2) {
          --fly-x: 65px;
          --fly-y: -55px;
          --fly-r: 18deg;
        }

        .joberp-letter:nth-child(4n + 3) {
          --fly-x: -50px;
          --fly-y: 50px;
          --fly-r: -14deg;
        }

        .joberp-letter:nth-child(4n) {
          --fly-x: 55px;
          --fly-y: 40px;
          --fly-r: 18deg;
        }

        @keyframes joberp-letter-fly {
          0% {
            opacity: 0;
            transform: translate3d(var(--fly-x), var(--fly-y), 0) rotate(var(--fly-r)) scale(.65);
            filter: blur(5px);
          }
          75% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0) scale(1.04);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0) scale(1);
            filter: blur(0);
          }
        }

        .joberp-glow {
          animation: joberp-glow-move 12s ease-in-out infinite alternate;
        }

        .joberp-glow-two {
          animation: joberp-glow-move-two 15s ease-in-out infinite alternate;
        }

        @keyframes joberp-glow-move {
          0% { transform: translate(-20px, -10px) scale(.95); }
          50% { transform: translate(35px, 30px) scale(1.1); }
          100% { transform: translate(-5px, 45px) scale(1); }
        }

        @keyframes joberp-glow-move-two {
          0% { transform: translate(20px, 20px) scale(1); }
          50% { transform: translate(-30px, -20px) scale(1.1); }
          100% { transform: translate(15px, -35px) scale(.95); }
        }

        .joberp-particle {
          animation: joberp-particle-float 7s ease-in-out infinite;
        }

        .joberp-particle:nth-child(2) { animation-delay: -2s; }
        .joberp-particle:nth-child(3) { animation-delay: -4s; }
        .joberp-particle:nth-child(4) { animation-delay: -1s; }
        .joberp-particle:nth-child(5) { animation-delay: -3s; }

        @keyframes joberp-particle-float {
          0%, 100% { transform: translate(0, 0); opacity: .35; }
          50% { transform: translate(12px, -20px); opacity: .8; }
        }

        .joberp-orbit {
          animation: joberp-orbit-spin 30s linear infinite;
          transform-origin: center;
        }

        .joberp-orbit-reverse {
          animation: joberp-orbit-spin 40s linear infinite reverse;
          transform-origin: center;
        }

        @keyframes joberp-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .joberp-hero-item {
          opacity: 0;
          animation: joberp-content-enter 1s ease-out forwards;
          animation-delay: var(--content-delay, 0s);
        }

        @keyframes joberp-content-enter {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .joberp-company-track {
          display: flex;
          width: max-content;
          animation: joberp-marquee 32s linear infinite;
        }

        .joberp-company-track:hover {
          animation-play-state: paused;
        }

        .joberp-company-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 16px;
          padding-right: 16px;
        }

        @keyframes joberp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .joberp-category-heading {
          animation: category-heading-enter .8s ease-out both;
        }

        .joberp-category-card {
          opacity: 0;
          animation: category-card-enter .65s cubic-bezier(.2, .7, .2, 1) forwards;
          animation-delay: var(--category-delay, 0ms);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .joberp-category-card:hover {
          transform: translateY(-6px);
          border-color: #fed7aa;
          box-shadow: 0 14px 30px rgba(249, 115, 22, .10);
        }

        .joberp-category-icon {
          transition: transform .4s cubic-bezier(.2, .8, .2, 1), box-shadow .4s ease;
        }

        .joberp-category-card:hover .joberp-category-icon {
          transform: rotate(-6deg) scale(1.09);
          box-shadow: 0 7px 16px rgba(249, 115, 22, .12);
        }

        @keyframes category-heading-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes category-card-enter {
          from { opacity: 0; transform: translateY(22px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .joberp-works {
          position: relative;
          isolation: isolate;
          background:
            radial-gradient(ellipse at 8% 10%, rgba(249,115,22,.12), transparent 34%),
            radial-gradient(ellipse at 95% 90%, rgba(245,158,11,.09), transparent 32%),
            #11100e;
        }

        .joberp-works-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.025));
          padding: 24px;
          box-shadow: 0 18px 50px rgba(0,0,0,.15);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }

        .joberp-works-card:hover {
          transform: translateY(-5px);
          border-color: rgba(251,146,60,.42);
          box-shadow: 0 24px 60px rgba(0,0,0,.28), 0 0 35px rgba(249,115,22,.06);
        }

        .joberp-works-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,146,60,.8), transparent);
          opacity: .65;
        }

        .joberp-works-step {
          position: relative;
          display: flex;
          gap: 14px;
          padding: 15px 12px;
          border: 1px solid transparent;
          border-radius: 15px;
          transition: background .3s ease, border-color .3s ease, transform .3s ease;
        }

        .joberp-works-step:hover {
          transform: translateX(4px);
          background: rgba(255,255,255,.045);
          border-color: rgba(251,146,60,.16);
        }

        .joberp-works-step-icon {
          display: flex;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(251,146,60,.25);
          border-radius: 13px;
          color: #fdba74;
          background: linear-gradient(145deg, rgba(249,115,22,.18), rgba(245,158,11,.06));
          transition: transform .3s ease, background .3s ease, color .3s ease;
        }

        .joberp-works-step:hover .joberp-works-step-icon {
          transform: scale(1.06) rotate(-3deg);
          color: #fff7ed;
          background: linear-gradient(145deg, #f97316, #c2410c);
        }

        .joberp-works-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          flex-shrink: 0;
          border-radius: 8px;
          background: rgba(249,115,22,.12);
          color: #fdba74;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .04em;
        }

        .joberp-works-cta {
          background: linear-gradient(100deg, #f97316, #ea580c);
          box-shadow: 0 8px 22px rgba(249,115,22,.18);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .joberp-works-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(249,115,22,.28);
        }

        @media (min-width: 640px) {
          .joberp-works-card { padding: 30px; }
        }

        @media (max-width: 640px) {
          .joberp-company-track { animation-duration: 24s; }
          .joberp-works-card { border-radius: 20px; padding: 19px; }
          .joberp-works-step { gap: 11px; padding: 12px 7px; }
          .joberp-works-step-icon { width: 39px; height: 39px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .joberp-letter,
          .joberp-glow,
          .joberp-glow-two,
          .joberp-particle,
          .joberp-orbit,
          .joberp-orbit-reverse,
          .joberp-hero-item,
          .joberp-company-track,
          .joberp-category-heading,
          .joberp-category-card {
            animation: none !important;
            opacity: 1;
            transform: none;
            filter: none;
          }

          .joberp-category-card,
          .joberp-category-icon,
          .joberp-works-card,
          .joberp-works-step,
          .joberp-works-step-icon {
            transition: none;
          }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#FFFAF3] py-12 sm:py-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="joberp-glow absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-orange-400/20 blur-[100px]" />
          <div className="joberp-glow-two absolute -left-24 top-1/3 h-[360px] w-[360px] rounded-full bg-amber-300/20 blur-[100px]" />
          <div className="joberp-glow absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-orange-200/20 blur-[90px]" />
          <div className="joberp-orbit absolute -right-24 top-8 h-72 w-72 rounded-full border border-orange-300/30" />
          <div className="joberp-orbit-reverse absolute -right-12 top-20 h-52 w-52 rounded-full border border-amber-400/30" />

          <div className="joberp-bubbles" aria-hidden="true">
            <span className="joberp-bubble bubble-1" />
            <span className="joberp-bubble bubble-2" />
            <span className="joberp-bubble bubble-3" />
            <span className="joberp-bubble bubble-4" />
            <span className="joberp-bubble bubble-5" />
            <span className="joberp-bubble bubble-6" />
            <span className="joberp-bubble bubble-7" />
            <span className="joberp-bubble bubble-8" />
            <span className="joberp-bubble bubble-9" />
            <span className="joberp-bubble bubble-10" />
            <span className="joberp-bubble bubble-11" />
            <span className="joberp-bubble bubble-12" />
          </div>

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(#49352A 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div
            className="joberp-hero-item mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
            style={{ "--content-delay": "0.1s" }}
          >
            <Sparkles size={15} className="text-orange-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
              Discover Your Next Opportunity
            </span>
          </div>

          <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            <AnimatedText text="Find Your Dream Job or" startDelay={0.15} />
            <br className="hidden sm:block" />
            <AnimatedText text="Hire Top Talent" startDelay={1.5} gradient />
            {" "}
            <AnimatedText text="Today." startDelay={2.6} />
          </h1>

          <p
            className="joberp-hero-item mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-500 sm:text-base sm:leading-7"
            style={{ "--content-delay": "3.6s" }}
          >
            Discover exciting career opportunities, connect with leading
            employers and find the right talent with JobERP.
          </p>

          <form
            onSubmit={handleSearch}
            className="joberp-hero-item mx-auto mt-7 flex max-w-4xl flex-col gap-2 rounded-2xl border border-orange-100 bg-white p-2 shadow-xl shadow-stone-300/30 transition-all duration-300 hover:shadow-orange-500/10 md:flex-row"
            style={{ "--content-delay": "4s" }}
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-transparent bg-stone-50 px-4 py-3 transition-all focus-within:border-orange-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10">
              <Search size={19} className="shrink-0 text-orange-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  userRole === "provider"
                    ? "Job title or candidate skills"
                    : "Job title, keywords, or company"
                }
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-transparent bg-stone-50 px-4 py-3 transition-all focus-within:border-orange-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 md:border-l md:border-orange-100">
              <MapPin size={19} className="shrink-0 text-orange-500" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder={
                  userRole === "provider"
                    ? "Company location"
                    : "City, state or 'Remote'"
                }
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
            >
              {userRole === "provider" ? "Find Candidates" : "Search Jobs"}
            </button>
          </form>

          {userRole === "seeker" && (
            <div
              className="joberp-hero-item mt-4 flex flex-col justify-center gap-3 sm:flex-row"
              style={{ "--content-delay": "4.4s" }}
            >
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:bg-orange-600"
              >
                <Search size={17} /> Explore Jobs <ArrowRight size={17} />
              </Link>
              <Link
                to="/register-seeker"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-orange-600 transition-all hover:-translate-y-1 hover:bg-orange-50"
              >
                <Users size={17} /> Create Account
              </Link>
            </div>
          )}

          {userRole === "provider" && (
            <div
              className="joberp-hero-item mt-4 flex flex-col justify-center gap-3 sm:flex-row"
              style={{ "--content-delay": "4.4s" }}
            >
              <Link
                to="/add-job"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:bg-orange-600"
              >
                <Briefcase size={17} /> Post Job <ArrowRight size={17} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3 text-sm font-bold text-orange-600 transition-all hover:-translate-y-1 hover:bg-orange-50"
              >
                <Users size={17} /> Contact
              </Link>
            </div>
          )}

          <div
            className="joberp-hero-item mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:gap-x-10"
            style={{ "--content-delay": "4.8s" }}
          >
            <span className="flex items-center gap-2">
              <Briefcase size={17} className="text-orange-500" />
              10,000+ Active Jobs
            </span>
            <span className="flex items-center gap-2">
              <Building2 size={17} className="text-orange-500" />
              2,500+ Companies
            </span>
            <span className="flex items-center gap-2">
              <Users size={17} className="text-orange-500" />
              50,000+ Candidates
            </span>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="joberp-category-heading mb-7 text-center sm:mb-9">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5">
              <Layers size={14} className="text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700">
                Explore Industries
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Popular <span className="text-orange-500">Categories</span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore opportunities across trending industries.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => {
              const catName =
                typeof cat === "object" && cat !== null
                  ? cat.name || "Category"
                  : String(cat || "Category");

              const iconKey =
                typeof cat === "object" && cat !== null ? cat.icon : null;

              const colorStyle =
                CATEGORY_STYLES[catName] ||
                DYNAMIC_COLORS[idx % DYNAMIC_COLORS.length];

              const Icon = (iconKey && ICON_MAP[iconKey]) || Tag;

              return (
                <Link
                  key={typeof cat === "object" ? cat.id || idx : idx}
                  to={`/jobs?category=${encodeURIComponent(catName)}`}
                  className="joberp-category-card group flex items-center gap-4 rounded-2xl border border-stone-100 bg-white p-4 sm:p-5"
                  style={{ "--category-delay": `${idx * 100}ms` }}
                >
                  <div className={`joberp-category-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorStyle.bg} ${colorStyle.color} sm:h-14 sm:w-14`}>
                    <Icon size={25} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold capitalize text-slate-800 transition-colors duration-300 group-hover:text-orange-600">
                      {catName}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Explore open positions
                    </p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="ml-auto shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COMPANIES */}
      <section className="overflow-hidden border-y border-orange-100 bg-[#FFFAF3] py-9 sm:py-11">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Building2 size={14} className="text-orange-500" />
              Company Spotlight
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Explore <span className="text-orange-500">Companies</span>
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Discover well-known companies and explore career possibilities.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#FFFAF3] to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#FFFAF3] to-transparent sm:w-20" />

            <div className="joberp-company-track">
              {[0, 1].map((group) => (
                <div
                  className="joberp-company-group"
                  key={group}
                  aria-hidden={group === 1 ? "true" : undefined}
                >
                  {COMPANIES.map((company) => (
                    <div
                      key={`${group}-${company.name}`}
                      className="flex h-[94px] w-[155px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-orange-100 bg-white px-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md sm:h-[105px] sm:w-[180px]"
                      title={company.name}
                    >
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        loading="lazy"
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span
                        className="text-center text-xs font-extrabold sm:text-sm"
                        style={{ color: company.color }}
                      >
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-[10px] leading-5 text-stone-400">
            Company names and logos are shown for illustrative purposes.
          </p>
        </div>
      </section>

      {/* 4. CAREER OPPORTUNITIES */}
      <section className="relative overflow-hidden bg-[#FFFAF3] py-11 sm:py-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-300/15 blur-[90px]" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-200/25 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(#49352A 1px, transparent 1px)",
              backgroundSize: "22px 22px"
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 shadow-sm">
              <Sparkles size={14} className="text-orange-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
                Your Next Chapter Starts Here
              </span>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Explore Career{" "}
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              Discover your strengths, explore growing industries and find
              career paths that match your skills and ambitions.
            </p>

            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="h-1 w-8 rounded-full bg-orange-300" />
              <span className="h-1.5 w-5 rounded-full bg-orange-500" />
              <span className="h-1 w-8 rounded-full bg-orange-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS.map((career) => {
              const Icon = career.icon;

              return (
                <Link
                  key={career.title}
                  to={`/jobs?query=${encodeURIComponent(career.title)}`}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-[0_5px_22px_rgba(73,53,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-[0_18px_38px_rgba(249,115,22,0.12)] sm:p-6"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-50 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange-100/80" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-100/70 text-orange-600 shadow-sm transition-all duration-300 group-hover:rotate-[-4deg] group-hover:border-orange-500 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white sm:h-14 sm:w-14">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full border border-orange-100 bg-[#FFFAF3] px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-orange-500">
                      {career.number}
                    </span>
                  </div>

                  <div className="relative z-10 mt-5">
                    <h3 className="text-lg font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-orange-600 sm:text-xl">
                      {career.title}
                    </h3>
                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                      {career.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                    {career.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-stone-100 bg-[#FFFAF3] px-2 py-1 text-[10px] font-semibold text-stone-600 transition-colors group-hover:border-orange-100 group-hover:text-orange-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="relative z-10 mt-5 flex items-center justify-between gap-3 border-t border-orange-50 pt-4">
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Career Paths
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-stone-700 transition-colors group-hover:text-orange-600">
                        {career.jobs}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-white text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                      <ArrowRight size={17} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="relative mt-6 flex flex-col gap-5 overflow-hidden rounded-2xl border border-orange-200/70 bg-white p-5 shadow-[0_8px_28px_rgba(73,53,42,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-orange-100/60 blur-3xl" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 sm:h-12 sm:w-12">
                <TrendingUp size={23} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                  Your next opportunity is waiting.
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Take the next step towards your career goals.
                </p>
              </div>
            </div>

            <Link
              to="/jobs"
              className="relative z-10 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Explore All Jobs <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HOW JOBERP WORKS */}
        {/* 5. HOW JOBERP WORKS */}
<section className="relative overflow-hidden py-8 text-white sm:py-10">
  <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />
  <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-[100px]" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* SINGLE OUTER FRAME */}
    <div className="overflow-hidden rounded-2xl border border-orange-400/20 bg-[#292522] p-4 shadow-lg sm:p-6 lg:p-7">

      {/* HEADING */}
      <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-7">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.08] px-3 py-1">
          <Zap size={13} className="text-orange-300" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-200">
            Simple. Smart. Seamless.
          </span>
        </div>

        <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
          How JobERP{" "}
          <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Works
          </span>
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-stone-400 sm:text-sm sm:leading-6">
          Whether you're looking for your next role or hiring new talent,
          JobERP keeps the journey clear and simple.
        </p>
      </div>

      {/* SEEKER + EMPLOYER */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <WorksCard
          label="FOR JOB SEEKERS"
          title="Build your career."
          description="Find opportunities that fit your skills and goals."
          icon={Users}
          steps={SEEKER_STEPS}
          buttonText="Explore Jobs"
          to="/jobs"
          onViewWorkflow={() => setShowWorkflow(true)}
        />

        <WorksCard
          label="FOR EMPLOYERS"
          title="Find your next hire."
          description="Reach potential candidates and manage hiring."
          icon={Building2}
          steps={EMPLOYER_STEPS}
          buttonText="Post a Job"
          to="/add-job"
          onViewWorkflow={() => setShowWorkflow(true)}
        />
      </div>

      {/* BOTTOM MESSAGE */}
      <div className="mt-5 flex flex-col items-center justify-center gap-2 border-t border-white/10 pt-4 text-center sm:flex-row sm:gap-3 sm:pt-5">
        <CheckCircle2 size={21} className="shrink-0 text-orange-300" />

        <div>
          <p className="text-xs font-bold text-white sm:text-sm">
            One platform. Two possibilities. Endless opportunities.
          </p>
          <p className="mt-1 text-[11px] leading-5 text-stone-400 sm:text-xs">
            Start exploring and take your next professional step with JobERP.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
        
      {/* 6. LATEST JOBS */}
      <section className="bg-[#FFFAF3] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3 py-1.5">
                <Sparkles size={13} className="text-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700">
                  New Opportunities
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Latest <span className="text-orange-500">Jobs</span>
              </h2>

              <p className="mt-1.5 text-sm text-slate-500">
                Explore featured opportunities and take your next step.
              </p>
            </div>

            <Link
              to="/jobs"
              className="group inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition-colors hover:text-orange-700"
            >
              View All Jobs
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_JOBS.map((job) => (
              <div
                key={job.id}
                className="group rounded-2xl border border-orange-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-stone-100 bg-stone-50 transition-colors group-hover:border-orange-100 group-hover:bg-orange-50">
                    <Building2 size={23} className="text-stone-400 transition-colors group-hover:text-orange-500" />
                  </div>

                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                    Featured
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-orange-600 sm:text-lg">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-orange-600">
                  {job.company}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-2.5 py-2">
                    <MapPin size={13} className="text-stone-400" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-2.5 py-2">
                    <Briefcase size={13} className="text-stone-400" />
                    {job.type}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                      Salary Range
                    </p>
                    <span className="mt-1 block text-base font-extrabold text-slate-800 sm:text-lg">
                      ₹{job.salary}
                    </span>
                  </div>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-orange-500 sm:text-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-7 text-center text-white shadow-xl shadow-orange-500/15 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-8 -top-12 opacity-[0.10]">
              <TrendingUp size={260} />
            </div>
            <div className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5">
                <Sparkles size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Your Future Starts Today
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Ready to Boost Your Career?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-orange-50 sm:text-base">
                Discover new opportunities, connect with employers and move
                closer to your professional goals with JobERP.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/register-seeker"
                  className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-orange-600 shadow-lg transition-all hover:-translate-y-1 hover:bg-orange-50"
                >
                  I Want a Job
                </Link>

                <Link
                  to="/add-company"
                  className="rounded-xl border border-orange-300/60 bg-orange-700 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:border-slate-900 hover:bg-slate-900"
                >
                  I Want to Hire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW ASSISTANT POPUP */}
      <WorkflowChat
        isOpen={showWorkflow}
        onClose={() => setShowWorkflow(false)}
      />

      {/* EXISTING CHATBOT */}
      <Chatbot />
    </main>
  );
}

function WorksCard({
  label,
  title,
  description,
  icon: Icon,
  steps,
  buttonText,
  to,
  onViewWorkflow
}) {
  return (
    <div className="joberp-works-card group">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.18em] text-orange-300">
            {label}
          </span>

          <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {title}
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-stone-400">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-400/25 bg-gradient-to-br from-orange-400/20 to-amber-400/5 text-orange-300 sm:h-14 sm:w-14">
          <Icon size={27} strokeWidth={1.7} />
        </div>
      </div>

      <div className="mb-5 h-px bg-gradient-to-r from-orange-400/35 via-white/10 to-transparent" />

      <div className="space-y-1">
        {steps.map((step) => (
          <WorksStep key={step.number} {...step} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 border-t border-white/[0.08] pt-5">
        <Link
          to={to}
          className="joberp-works-cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold text-white"
        >
          {buttonText}
          <ArrowRight size={17} />
        </Link>

        <button
          type="button"
          onClick={onViewWorkflow}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-300/30 px-5 py-3.5 text-sm font-extrabold text-orange-200 transition hover:border-orange-300 hover:bg-orange-500/10"
        >
          <MessageCircle size={17} />
          View Workflow
        </button>
      </div>
    </div>
  );
}

function WorksStep({ number, title, desc, icon: Icon }) {
  return (
    <div className="joberp-works-step">
      <div className="joberp-works-step-icon">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="joberp-works-number">{number}</span>
          <h4 className="text-sm font-bold text-white sm:text-base">
            {title}
          </h4>
        </div>

        <p className="mt-2 text-xs leading-6 text-stone-400 sm:text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}

function WorkflowChat({ isOpen, onClose }) {
  const [role, setRole] = useState("seeker");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to JobERP! I can guide you through applying for jobs or posting a job."
    }
  ]);

  const workflows = {
    seeker: {
      title: "How to Apply for a Job",
      steps: [
        "Open the Jobs section.",
        "Search by job title, company or location.",
        "Open a job and read its description and requirements.",
        "Click Apply Now and complete the application form.",
        "Submit your application and check My Applications for updates, if available."
      ]
    },
    employer: {
      title: "How to Post a Job",
      steps: [
        "Sign in with your employer/provider account.",
        "Complete your company profile if required.",
        "Open the Post a Job page.",
        "Enter the job title, description, skills, location and other details.",
        "Review and submit the form, then check Applicants if available."
      ]
    }
  };

  const chooseRole = (nextRole) => {
    setRole(nextRole);

    setMessages([
      {
        sender: "bot",
        text:
          nextRole === "seeker"
            ? "Here is your step-by-step guide to applying for a job."
            : "Here is your step-by-step guide to posting a job."
      }
    ]);
  };

  const askQuestion = (question) => {
    const isApply = question === "apply";

    setRole(isApply ? "seeker" : "employer");

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: isApply ? "How do I apply?" : "How do I post a job?"
      },
      {
        sender: "bot",
        text: isApply
          ? "Go to Jobs, find a suitable opening, read the details, click Apply Now, complete the form and submit your application."
          : "Sign in as an employer/provider, open Post a Job, fill in the job details and submit the form."
      }
    ]);
  };

  if (!isOpen) return null;

  const activeWorkflow = workflows[role];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="JobERP Workflow Assistant"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-orange-200/20 bg-[#171411] text-white shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#30221C] to-[#171411] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500">
              <Bot size={24} />
            </div>

            <div>
              <h3 className="font-extrabold">JobERP Assistant</h3>
              <p className="mt-1 text-xs text-orange-200">
                Job application & hiring guide
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="rounded-xl p-2 text-stone-300 transition hover:bg-white/10 hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        <div className="border-b border-white/10 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
            What would you like to do?
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => chooseRole("seeker")}
              className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                role === "seeker"
                  ? "border-orange-400 bg-orange-500 text-white"
                  : "border-white/10 bg-white/5 text-stone-300 hover:border-orange-400/50"
              }`}
            >
              <Search size={17} className="mx-auto mb-1" />
              Apply for a Job
            </button>

            <button
              type="button"
              onClick={() => chooseRole("employer")}
              className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                role === "employer"
                  ? "border-orange-400 bg-orange-500 text-white"
                  : "border-white/10 bg-white/5 text-stone-300 hover:border-orange-400/50"
              }`}
            >
              <Briefcase size={17} className="mx-auto mb-1" />
              Post a Job
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={`${message.sender}-${index}`}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.sender === "user"
                    ? "rounded-br-sm bg-orange-500 text-white"
                    : "rounded-bl-sm border border-white/10 bg-white/[0.06] text-stone-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/[0.06] p-4">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-300" />
              <h4 className="font-bold text-orange-100">
                {activeWorkflow.title}
              </h4>
            </div>

            <ol className="space-y-3">
              {activeWorkflow.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 text-sm leading-6 text-stone-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-xs font-extrabold text-orange-300">
                    {index + 1}
                  </span>

                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20 p-4">
          <p className="mb-3 text-xs font-semibold text-stone-400">
            Quick questions
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => askQuestion("apply")}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-stone-200 transition hover:border-orange-400/50 hover:text-orange-200"
            >
              How do I apply? <ChevronRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => askQuestion("post")}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-stone-200 transition hover:border-orange-400/50 hover:text-orange-200"
            >
              How do I post a job? <ChevronRight size={14} />
            </button>
          </div>

          <p className="mt-3 text-[10px] leading-4 text-stone-500">
            This assistant explains the workflow. It does not submit
            applications or publish jobs automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedText({
  text,
  className = "",
  startDelay = 0,
  gradient = false
}) {
  return (
    <span
      className={className}
      aria-label={text}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {Array.from(text).map((letter, index) => (
        <span
          key={`${text}-${index}`}
          aria-hidden="true"
          className={`joberp-letter ${gradient ? "joberp-gradient-letter" : ""}`}
          style={{
            "--letter-delay": `${startDelay + index * 0.065}s`
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
}

export default Home;
