import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Upload, Sparkles, Send, CheckCircle, Lock, ShieldCheck
} from "lucide-react";

function RegisterSeeker() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "", // NEW: Password field for Login
    phone: "",
    currentLocation: "",
    experience: "",
    highestQualification: "",
    skills: "",
    agreeTerms: false,
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    const extension = selectedFile.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "doc", "docx"];
    
    if (!allowed.includes(extension)) {
      setErrors((prev) => ({ ...prev, resume: "Upload a PDF, DOC, or DOCX file." }));
      return;
    }
    
    setResume(selectedFile);
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.password.trim()) newErrors.password = "Password is required for login";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.currentLocation.trim()) newErrors.currentLocation = "Current location is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.skills.trim()) newErrors.skills = "Please add your skills";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setSubmitting(true);

    // Register User Logic
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      // Check if email already exists
      if (existingUsers.some((u) => u.email === formData.email)) {
        toast.error("Email is already registered! Please login.");
        setSubmitting(false);
        return;
      }

      const newUser = {
        id: "seeker_" + Date.now().toString(),
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.currentLocation,
        role: "Seeker", // Role important for access
        experience: formData.experience,
        skills: formData.skills,
        qualification: formData.highestQualification,
        joinedAt: new Date().toISOString()
      };

      localStorage.setItem("registeredUsers", JSON.stringify([...existingUsers, newUser]));

      setSubmitting(false);
      setSubmitted(true);
      toast.success("Account created successfully!");
    }, 1500);
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="w-full text-slate-800 py-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner">
          <CheckCircle size={50} />
        </div>
        <h1 className="mt-8 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Registration <span className="text-orange-500">Successful!</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-6 text-slate-500 sm:text-base">
          Welcome to JobERP, <span className="font-semibold text-slate-700">{formData.fullName}</span>! Your Job Seeker account is ready.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button 
            type="button" 
            onClick={() => navigate("/")} 
            className="rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 hover:-translate-y-0.5"
          >
            Go to Home & Login
          </button>
        </div>
      </div>
    );
  }

  // FORM SCREEN
  return (
    <div className="w-full text-slate-800 pb-12">
      {/* Header */}
      <header className="mb-10 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} />
            JOIN THE PLATFORM
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Create <span className="text-orange-500">Seeker Account</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">Register for free to apply for thousands of jobs instantly.</p>
        </div>
        <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-orange-100 bg-orange-50 text-orange-500 sm:flex shadow-sm">
          <ShieldCheck size={36} strokeWidth={1.5} />
        </div>
      </header>

      {/* Actual Form Fields */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          
          {/* LEFT COLUMN */}
          <div className="grid min-w-0 gap-6">
            
            {/* 1. Account Details (Including Password) */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 hover:border-orange-200 transition-colors">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md shadow-orange-500/20"><User size={22} /></div>
                <div><h2 className="text-lg font-bold text-slate-800">Account Information</h2></div>
              </div>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="fullName" icon={User} value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
                <Field label="Email Address" name="email" type="email" icon={Mail} value={formData.email} onChange={handleChange} error={errors.email} required />
                <Field label="Create Password" name="password" type="password" icon={Lock} value={formData.password} onChange={handleChange} error={errors.password} required placeholder="Min 6 characters" />
                <Field label="Phone Number" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} error={errors.phone} required />
              </div>
            </section>

            {/* 2. Professional Details */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 hover:border-orange-200 transition-colors">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><Briefcase size={22} /></div>
                <div><h2 className="text-lg font-bold text-slate-800">Professional Profile</h2></div>
              </div>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Current Location" name="currentLocation" icon={MapPin} value={formData.currentLocation} onChange={handleChange} error={errors.currentLocation} required />
                <SelectField label="Experience" name="experience" value={formData.experience} onChange={handleChange} error={errors.experience} required 
                  options={[
                    {value: "", label: "Select Experience"}, 
                    {value: "fresher", label: "Fresher"}, 
                    {value: "1-3", label: "1 - 3 years"}, 
                    {value: "3-5", label: "3 - 5 years"},
                    {value: "5+", label: "5+ years"}
                  ]} 
                />
                <SelectField label="Qualification" name="highestQualification" value={formData.highestQualification} onChange={handleChange} error={errors.highestQualification} 
                  options={[
                    {value: "", label: "Select Qualification"}, 
                    {value: "bachelors", label: "Bachelor's Degree"}, 
                    {value: "masters", label: "Master's Degree"},
                    {value: "diploma", label: "Diploma"}
                  ]} 
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Key Skills <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="skills" 
                  value={formData.skills} 
                  onChange={handleChange} 
                  placeholder="e.g. React, Node.js, Marketing, Sales" 
                  className={`w-full rounded-xl border bg-slate-50 p-4 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-orange-500 ${errors.skills ? "border-red-300" : "border-slate-200 focus:bg-white"}`} 
                />
                {errors.skills && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.skills}</p>}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid min-w-0 gap-6">
            
            {/* Resume Upload */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><Upload size={22} /></div>
                <div><h2 className="text-lg font-bold text-slate-800">Upload Resume</h2></div>
              </div>
              
              <label className={`flex min-h-[160px] flex-col cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-all ${resume ? "border-orange-400 bg-orange-50/60" : "border-slate-200 bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30"}`}>
                <Upload size={28} className="text-orange-400 mb-3" />
                <h3 className="text-sm font-bold text-slate-700">Click to Upload Resume</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">PDF, DOC, DOCX up to 5MB</p>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
              </label>
              
              {errors.resume && <p className="mt-2 text-xs font-semibold text-red-500">{errors.resume}</p>}
              {resume && (
                <div className="mt-3 flex items-center justify-between bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-100">
                  <span className="text-xs font-bold truncate pr-4">{resume.name}</span>
                  <CheckCircle size={16} className="shrink-0" />
                </div>
              )}
            </section>

            {/* Submit Action */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <label className="flex cursor-pointer items-start gap-3 mb-5">
                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 h-4 w-4 rounded text-orange-500 focus:ring-orange-500" />
                <span className="text-xs font-medium leading-relaxed text-slate-500">I agree to the Terms of Service and Privacy Policy. I confirm that all information provided is accurate.</span>
              </label>
              {errors.agreeTerms && <p className="text-xs font-semibold text-red-500 mb-4">{errors.agreeTerms}</p>}

              <button 
                type="submit" 
                disabled={submitting} 
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {submitting ? "Creating Account..." : <><Send size={18} /> Register Account</>}
              </button>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}

// Sub-components
function Field({ label, name, type = "text", icon: Icon, value, onChange, placeholder, error, required }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
          className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-orange-500 ${Icon ? "pl-11" : ""} ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:bg-white focus:border-orange-500"}`} 
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, required }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-orange-500 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:bg-white focus:border-orange-500"}`}
      >
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}

export default RegisterSeeker;