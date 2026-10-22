import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Building2,
  CheckCircle2,
  X,
  ArrowLeft,
  Sparkles,
  Save,
  FileText,
  ListChecks,
} from "lucide-react";


function Addjob() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const formTopRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("companyData");
      if (saved) {
        setCompanyData(JSON.parse(saved));
      } else {
        setCompanyData({
          companyName: "Your Company",
          industry: "Not set",
          logo: null,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "Full-time",
    workMode: "On-site",
    experience: "Fresher",
    location: "",
    minSalary: "",
    maxSalary: "",
    deadline: "",
    description: "",
    requirements: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title zaroori hai";
    if (!formData.location.trim()) newErrors.location = "Location zaroori hai";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("⚠️ Kripya Job Title aur Location zaroor bharo.");
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const newJob = {
      id: Date.now(),
      jobTitle: formData.jobTitle.trim(),
      jobType: formData.jobType,
      workMode: formData.workMode,
      experience: formData.experience,
      location: formData.location.trim(),
      minSalary: formData.minSalary,
      maxSalary: formData.maxSalary,
      deadline: formData.deadline,
      description: formData.description.trim(),
      requirements: formData.requirements.trim(),
      postedAt: new Date().toISOString(),
      status: "Pending",
      applicants: 0,
      companyName: companyData?.companyName || "—",
    };

    try {
      const existingJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      if (!Array.isArray(existingJobs)) {
        localStorage.setItem("myJobs", JSON.stringify([newJob]));
      } else {
        existingJobs.unshift(newJob);
        localStorage.setItem("myJobs", JSON.stringify(existingJobs));
      }

      // verify
      const check = JSON.parse(localStorage.getItem("myJobs") || "[]");
      console.log("✅ Jobs saved in localStorage:", check);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard/my-jobs");
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("Job save nahi ho payi. Console check karo.");
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.35s ease forwards; }
        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          background: #f8fafc;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
          border: 1px solid #e2e8f0;
        }
        .input-base:focus {
          border-color: #fb923c;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12);
          background: #fff;
        }
        .input-error {
          border-color: #fca5a5 !important;
          background: #fef2f2 !important;
        }
      `}</style>

      <div ref={formTopRef} className="w-full min-w-0 animate-fade-in text-slate-800">
        {showSuccess && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <p className="text-sm font-bold">
                Job post ho gayi! My Jobs par le jaa rahe hain...
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-emerald-600">
              <X size={18} />
            </button>
          </div>
        )}

        <header className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={14} />
            POST A JOB
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Create New <span className="text-orange-500">Job Post</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Sirf Job Title + Location bharo aur Post Job dabao — list mein aa jayega.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="grid gap-6 lg:col-span-2">
            {/* Basic Details */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Basic Details</h2>
                  <p className="text-xs text-slate-500">Job title, type and experience</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Senior Frontend Developer"
                  className={`input-base ${errors.jobTitle ? "input-error" : ""}`}
                />
                {errors.jobTitle && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.jobTitle}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Job Type</label>
                  <select name="jobType" value={formData.jobType} onChange={handleChange} className="input-base">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Work Mode</label>
                  <select name="workMode" value={formData.workMode} onChange={handleChange} className="input-base">
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Experience</label>
                  <select name="experience" value={formData.experience} onChange={handleChange} className="input-base">
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Salary & Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <IndianRupee size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Salary & Location</h2>
                  <p className="text-xs text-slate-500">Compensation and job location</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Bangalore, Karnataka"
                  className={`input-base ${errors.location ? "input-error" : ""}`}
                />
                {errors.location && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.location}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Min Salary (₹)</label>
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="e.g., 500000"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Max Salary (₹)</label>
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="e.g., 800000"
                    className="input-base"
                  />
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Job Description</h2>
                  <p className="text-xs text-slate-500">Optional — roles & skills</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the job role..."
                  className="input-base resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Requirements / Skills</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., React, Node.js..."
                  className="input-base resize-none"
                />
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard/my-jobs")}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Save size={16} />
                Post Job
              </button>
            </div>
          </div>

          {/* Right preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  🏢 Posting As
                </p>
              </div>
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {companyData?.logo ? (
                      <img src={companyData.logo} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <Building2 size={24} className="text-orange-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="max-w-[180px] truncate text-sm font-extrabold text-slate-900">
                      {companyData?.companyName}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {companyData?.industry}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/30 p-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Job Preview
                </p>
                <h4 className="text-base font-bold text-slate-800">
                  {formData.jobTitle || "Job Title Preview"}
                </h4>
                <div className="mt-3 space-y-2 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-orange-500" />
                    {formData.jobType} • {formData.workMode}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange-500" />
                    {formData.location || "Location not set"}
                  </div>
                  <div className="flex items-center gap-2">
                    <ListChecks size={14} className="text-orange-500" />
                    {formData.experience} Exp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addjob;