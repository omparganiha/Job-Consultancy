import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, UserPlus, LayoutGrid, List } from "lucide-react";
import { toast } from "react-toastify";

import Addjob from "../providers/Addjob";
import Application from "../seekers/Application"; 
import Login from "./Login"; 

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"];
const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Berlin, Germany",
  "Singapore",
  "London, UK",
  "Remote",
];

export default function Jobs() {
  const navigate = useNavigate();
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // State
  const [keyword, setKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // View Mode State (table = wide cards, grid = compact cards)
  const [viewMode, setViewMode] = useState("table");

  // Category State
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Modal states
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Login drawer states
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const savedCats = localStorage.getItem("jobCategories");
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    } else {
      setCategories(["IT & Software", "Finance", "Marketing", "Healthcare", "Education", "Design"]);
    }
  }, [refreshTrigger]);

  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshTrigger((prev) => prev + 1);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ================= AUTH HELPERS =================
  const getAuthUser = () => {
    try {
      const raw = localStorage.getItem("authUser");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const canPostJob = (user) => {
    if (!user) return false;
    const role = String(user.role || "").toLowerCase().trim();
    return role.includes("provider") || role === "admin";
  };

  const isLoggedIn = () => !!getAuthUser();

  // ================= FILTER HELPERS =================
  const toggleArrayFilter = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearFilters = () => {
    setKeyword("");
    setSelectedLocation("");
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedCategories([]); 
  };

  // ================= FILTER LOGIC =================
  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    const savedJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    
    const approvedSavedJobs = savedJobs
      .filter((job) => job.status === "Approved")
      .map((job) => ({
        id: job.id,
        title: job.jobTitle,
        company: job.companyName || "Unknown Company",
        location: job.location,
        type: job.type || job.jobType,
        experienceLevel: job.experienceLevel || "Mid Level",
        salary: `₹${job.minSalary || 0} - ₹${job.maxSalary || 0}`,
        postedAt: job.postedAt || "Recently",
        isFeatured: false,
        skills: job.skills || ["General"],
        category: job.category || "General", 
        logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&auto=format&fit=crop&q=60",
      }));

    return approvedSavedJobs.filter((job) => {
      const matchesKeyword =
        k === "" ||
        job.title.toLowerCase().includes(k) ||
        job.company.toLowerCase().includes(k) ||
        job.skills.some((s) => s.toLowerCase().includes(k));

      const matchesLocation =
        selectedLocation === "" || job.location === selectedLocation;
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.includes(job.experienceLevel);

      const matchesCategory = 
        selectedCategories.length === 0 || 
        selectedCategories.includes(job.category);

      return (
        matchesKeyword && matchesLocation && matchesType && matchesLevel && matchesCategory
      );
    });
  }, [keyword, selectedLocation, selectedTypes, selectedLevels, selectedCategories, refreshTrigger]);

  // ================= BUTTON HANDLERS =================
  const handlePostJobClick = () => {
    const authUser = getAuthUser();

    if (!authUser) {
      setPendingAction({ type: "post" });
      setIsLoginDrawerOpen(true);
      return;
    }

    if (canPostJob(authUser)) {
      setIsPostJobModalOpen(true);
    } else {
      toast.error("Only Job Providers can post a job.");
    }
  };

  const handleApplyClick = (job) => {
    const authUser = getAuthUser();

    if (!authUser) {
      setPendingAction({ type: "apply", job });
      setIsLoginDrawerOpen(true);
      return;
    }

    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleApplyForJobHeader = () => {
    if (!isLoggedIn()) {
      setIsLoginDrawerOpen(true);
      return;
    }
    window.scrollTo({ top: 400, behavior: "smooth" });
    toast.info("Select a job below and click Apply Now.");
  };

  const handleLoginSuccess = () => {
    setIsLoginDrawerOpen(false);
    window.dispatchEvent(new Event("auth-change"));

    setTimeout(() => {
      const authUser = getAuthUser();
      if (!authUser) return;

      toast.success("Logged in successfully!");

      if (pendingAction?.type === "post") {
        if (canPostJob(authUser)) {
          setIsPostJobModalOpen(true);
        } else {
          toast.error("Only Job Providers can post a job.");
        }
      }

      if (pendingAction?.type === "apply" && pendingAction.job) {
        setSelectedJob(pendingAction.job);
        setIsApplyModalOpen(true);
      }

      setPendingAction(null);
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
      {/* ================= PAGE HEADER ================= */}
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Open positions
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Explore current opportunities and join our network of consultants.
          </p>
        </div>

        {/* ✅ Moved View Toggle Buttons here */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm mr-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table" 
                  ? "bg-orange-100 text-orange-600" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="List View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid" 
                  ? "bg-orange-100 text-orange-600" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleApplyForJobHeader}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
          >
            <UserPlus size={16} />
            Apply for a Job
          </button>

          <button
            type="button"
            onClick={handlePostJobClick}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            <Plus size={16} />
            Post a Job
          </button>
        </div>
      </header>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative">
        
        {/* Mobile Filter Toggle Button */}
        <div className="w-full lg:hidden sticky top-0 z-10 bg-slate-50/90 backdrop-blur pb-2 pt-2 -mt-2">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex w-full items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* ================= SIDEBAR FILTERS ================= */}
        <aside
          className={`w-full lg:w-72 flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 lg:sticky lg:top-6 ${
            isMobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            <button onClick={clearFilters} className="text-xs text-orange-500 hover:text-orange-700 font-medium">
              Reset
            </button>
          </div>

          {/* Keyword */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Keyword</label>
            <input
              type="text"
              placeholder="Search jobs..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-400"
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Location</label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none cursor-pointer"
              >
                <option value="">Any location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter UI */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Category</label>
            <div className="space-y-2.5">
              {categories.length === 0 ? (
                <p className="text-xs text-slate-400">No categories available</p>
              ) : (
                categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleArrayFilter(cat, selectedCategories, setSelectedCategories)}
                      className="w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900 capitalize">{cat}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Job Type */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Job Type</label>
            <div className="space-y-2.5">
              {JOB_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleArrayFilter(type, selectedTypes, setSelectedTypes)}
                    className="w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">Experience Level</label>
            <div className="space-y-2.5">
              {EXPERIENCE_LEVELS.map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => toggleArrayFilter(level, selectedLevels, setSelectedLevels)}
                    className="w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= JOB LISTINGS ================= */}
        <main className="flex-1 w-full min-w-0">
          
          <div className="mb-4 text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> results
          </div>

          <div className="flex flex-col gap-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                No positions found. Try adjusting your filters.
              </div>
            ) : viewMode === "table" ? (
              
              // ================= WIDE CARD STYLE (List View) =================
              filtered.map((job) => (
                <article
                  key={job.id}
                  className="relative bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5"
                >
                  {job.isFeatured && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-2xl">
                      Featured
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover bg-slate-50 border border-slate-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-12 sm:pr-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">{job.title}</h3>
                      <p className="text-sm font-medium text-slate-500 mb-2.5">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salary}
                        </span>
                        <span className="whitespace-nowrap">{job.postedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span key={skill} className="bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        {job.type}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleApplyClick(job)}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </article>
              ))

            ) : (
              
              // ================= COMPACT GRID STYLE =================
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((job) => (
                  <article
                    key={job.id}
                    className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100"
                        />
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                          {job.type}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-bold text-slate-900 line-clamp-1">{job.title}</h3>
                        <p className="text-xs font-medium text-slate-500">{job.company}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {job.salary}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-50">
                      {job.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(job)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors mt-2"
                    >
                      Apply Now
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Login Drawer */}
      {isLoginDrawerOpen && (
        <Login
          isOpen={isLoginDrawerOpen}
          onClose={() => {
            setIsLoginDrawerOpen(false);
            setPendingAction(null);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Post a Job Modal (Provider) */}
      {isPostJobModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white p-4 md:p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setIsPostJobModalOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-800"
            >
              <X size={18} />
            </button>

            <Addjob
              onSuccess={() => {
                setIsPostJobModalOpen(false);
                toast.success("Job posted successfully! Waiting for admin approval.");
                setRefreshTrigger((prev) => prev + 1); 
              }}
              onCancel={() => setIsPostJobModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Apply Modal (Seeker/Provider) */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white p-4 md:p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-800"
            >
              <X size={18} />
            </button>

            <Application
              jobInfo={selectedJob}
              onClose={() => setIsApplyModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}