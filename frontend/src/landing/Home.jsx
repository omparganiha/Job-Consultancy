import { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import {
  Search, MapPin, Briefcase, Building2, Users, ArrowRight, TrendingUp,
  // Icons for Categories
  MonitorPlay, HeartPulse, Calculator, PenTool, Megaphone, BookOpen, Palette, Tag,
  Code, Truck, Car, Plane, Shield, Cpu, Database, Wifi, Globe, Music, Camera, Utensils, Home as HomeIcon, Wrench, ShoppingBag, Landmark, Scale, Layers, Sparkles, Tags
} from "lucide-react";

import Chatbot from "./Chatbot"; 

// ✅ 1. ICON MAP (Taki Admin jo icon select kare wo yahan dikhe)
const ICON_MAP = {
  MonitorPlay, Calculator, Megaphone, HeartPulse, BookOpen, Palette, Code, Briefcase, Building2, Users, Truck, Car, Plane, Shield, Cpu, Database, Wifi, Globe, Music, Camera, Utensils, Home: HomeIcon, Wrench, ShoppingBag, Landmark, Scale, Layers, Sparkles, Tags, Tag
};

// ✅ 2. CATEGORY COLORS (Premium look ke liye)
const CATEGORY_STYLES = {
  "IT & Software": { color: "text-blue-500", bg: "bg-blue-50" },
  "Healthcare": { color: "text-emerald-500", bg: "bg-emerald-50" },
  "Finance": { color: "text-amber-500", bg: "bg-amber-50" },
  "Design & Art": { color: "text-purple-500", bg: "bg-purple-50" },
  "Design": { color: "text-purple-500", bg: "bg-purple-50" },
  "Marketing": { color: "text-pink-500", bg: "bg-pink-50" },
  "Engineering": { color: "text-orange-500", bg: "bg-orange-50" },
  "Education": { color: "text-indigo-500", bg: "bg-indigo-50" },
};

// Fallback dynamic colors for unknown categories
const DYNAMIC_COLORS = [
  { color: "text-blue-500", bg: "bg-blue-50" },
  { color: "text-emerald-500", bg: "bg-emerald-50" },
  { color: "text-amber-500", bg: "bg-amber-50" },
  { color: "text-purple-500", bg: "bg-purple-50" },
  { color: "text-pink-500", bg: "bg-pink-50" },
];

function Home() {
  const navigate = useNavigate();
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  
  // Categories State from LocalStorage
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const savedCats = localStorage.getItem("jobCategories");
    if (savedCats) {
      try {
        setCategories(JSON.parse(savedCats));
      } catch(e) {
        setCategories(["IT & Software", "Finance", "Marketing", "Healthcare", "Education", "Design"]);
      }
    } else {
      setCategories(["IT & Software", "Finance", "Marketing", "Healthcare", "Education", "Design"]);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("query", searchQuery.trim());
    if (locationQuery.trim()) params.append("location", locationQuery.trim());
    
    navigate(`/jobs?${params.toString()}`);
  };

  const featuredJobs = [
    { id: 1, title: "Senior React Developer", company: "TechCorp Solutions", location: "Bangalore", type: "Full-Time", salary: "12L - 18L" },
    { id: 2, title: "UI/UX Product Designer", company: "DesignHub", location: "Remote", type: "Contract", salary: "8L - 12L" },
    { id: 3, title: "Marketing Manager", company: "GrowthX", location: "Mumbai", type: "Full-Time", salary: "10L - 15L" },
  ];

  return (
    <main className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-50 pt-16 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-orange-400/10 blur-[100px]"></div>
          <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Your Dream Job or <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Hire Top Talent
            </span> Today.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-500 font-medium leading-relaxed">
            Join the fastest-growing job consultancy platform. Whether you're looking for your next career move or searching for the perfect candidate, we've got you covered.
          </p>

          <form 
            onSubmit={handleSearch}
            className="mt-12 max-w-4xl mx-auto bg-white p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col md:flex-row gap-2 transition-all hover:shadow-2xl hover:shadow-orange-500/10"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 bg-slate-50 hover:bg-slate-100/50 transition-colors rounded-xl border border-transparent focus-within:border-orange-500/30 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10">
              <Search className="text-orange-500 shrink-0" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or company" 
                className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium text-sm"
              />
            </div>
            
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 bg-slate-50 hover:bg-slate-100/50 transition-colors rounded-xl border border-transparent focus-within:border-orange-500/30 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 md:border-l md:border-slate-200 md:rounded-l-none">
              <MapPin className="text-orange-500 shrink-0" size={20} />
              <input 
                type="text" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="City, state or 'Remote'" 
                className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium text-sm"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-10 rounded-xl transition-all duration-300 w-full md:w-auto shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Search
            </button>
          </form>

          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-bold text-slate-500 uppercase tracking-wide">
            <span className="flex items-center gap-2"><Briefcase size={18} className="text-orange-500"/> 10,000+ Active Jobs</span>
            <span className="flex items-center gap-2"><Building2 size={18} className="text-orange-500"/> 2,500+ Companies</span>
            <span className="flex items-center gap-2"><Users size={18} className="text-orange-500"/> 50,000+ Candidates</span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION - ✅ CRASH FIXED HERE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Popular <span className="text-orange-500">Categories</span></h2>
            <p className="mt-3 text-slate-500 font-medium">Explore jobs across various trending industries.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              
              // ✅ SAFE CHECK: Extacting Name safely
              const catName = typeof cat === "object" && cat !== null ? (cat.name || "Category") : String(cat || "Category");
              
              // ✅ Extracting Icon safely
              const iconKey = typeof cat === "object" && cat !== null ? cat.icon : null;
              
              // Map Icon & Colors
              const colorStyle = CATEGORY_STYLES[catName] || DYNAMIC_COLORS[idx % DYNAMIC_COLORS.length];
              const Icon = (iconKey && ICON_MAP[iconKey]) || Tag; // Uses Admin selected icon if available

              return (
                <Link 
                  key={typeof cat === "object" ? cat.id || idx : idx} 
                  to={`/jobs?category=${encodeURIComponent(catName)}`} 
                  className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
                >
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${colorStyle.bg} ${colorStyle.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  <div>
                    {/* Yahan pehle sirf {cat} tha jo crash karwa raha tha. Ab {catName} (String) hai */}
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors capitalize">{catName}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Explore open positions</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-24 bg-[#0A0A0A] text-white border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              How JobERP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Works</span>
            </h2>
            <p className="mt-4 text-slate-400 font-medium max-w-2xl mx-auto">A seamless, premium experience for both top-tier candidates and leading employers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.07] hover:border-amber-500/30 transition-all duration-500">
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                <div className="p-3 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-xl border border-amber-500/20 text-amber-400">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold tracking-wide">For Job Seekers</h3>
              </div>
              <div className="space-y-10">
                <Step number="1" title="Create an Account" desc="Sign up for free and build your standout professional profile." />
                <Step number="2" title="Upload Resume" desc="Add your skills, experience, and highlight your achievements." />
                <Step number="3" title="Apply & Get Hired" desc="Browse approved jobs, apply with one click, and track your status." />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.07] hover:border-amber-500/30 transition-all duration-500">
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                <div className="p-3 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-xl border border-amber-500/20 text-amber-400">
                  <Building2 size={32} />
                </div>
                <h3 className="text-2xl font-bold tracking-wide">For Employers</h3>
              </div>
              <div className="space-y-10">
                <Step number="1" title="Register Company" desc="Create your company profile and get premium verification." />
                <Step number="2" title="Post Jobs" desc="Publish your requirements and attract world-class talent." />
                <Step number="3" title="Hire the Best" desc="Review applications, schedule interviews, and hire seamlessly." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED JOBS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Latest <span className="text-orange-500">Jobs</span></h2>
              <p className="mt-2 text-slate-500 font-medium">Recently approved jobs waiting for your application.</p>
            </div>
            <Link to="/jobs" className="group flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors">
              View All Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-orange-200 transition-all duration-300">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                    <Building2 size={24} className="text-slate-400" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100">
                    New
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                <p className="text-sm font-semibold text-orange-600 mt-1">{job.company}</p>
                
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                  <span className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {job.location}</span>
                  <span className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg flex items-center gap-1.5"><Briefcase size={14} className="text-slate-400"/> {job.type}</span>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 text-lg">₹{job.salary}</span>
                  <Link to={`/jobs/${job.id}`} className="text-sm font-bold text-white bg-slate-900 px-5 py-2.5 rounded-lg hover:bg-orange-500 transition-colors">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <TrendingUp size={350} className="-mt-16 -mr-16" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold relative z-10 tracking-tight">Ready to boost your career?</h2>
            <p className="mt-5 text-orange-50 max-w-2xl mx-auto relative z-10 text-lg font-medium">
              Join thousands of professionals and companies already using JobERP to achieve their goals.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link to="/register-seeker" className="bg-white text-orange-600 font-bold py-4 px-10 rounded-xl hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-xl shadow-orange-700/20">
                I want a Job
              </Link>
              <Link to="/add-company" className="bg-orange-700 text-white border border-orange-400/50 font-bold py-4 px-10 rounded-xl hover:bg-slate-900 hover:border-slate-900 hover:-translate-y-1 transition-all shadow-xl shadow-orange-700/20">
                I want to Hire
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
    </main>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-black text-lg font-extrabold shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors">{title}</h4>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

export default Home;