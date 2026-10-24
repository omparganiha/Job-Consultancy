import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload, FileText, Trash2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Linkedin, Globe, DollarSign, Calendar, Sparkles, Send, CheckCircle, AlertCircle, Building2, Clock, FileCheck, Code, Award,
} from "lucide-react";

// jobInfo aur onClose props receive honge
function Application({ jobInfo, onClose }) {
  const resumeRef = useRef(null);
  const coverLetterRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", currentLocation: "", linkedin: "", portfolio: "", currentCompany: "", currentRole: "", experience: "", noticePeriod: "", currentSalary: "", expectedSalary: "", highestQualification: "", university: "", graduationYear: "", skills: "", coverLetterText: "", availableFrom: "", willingToRelocate: "no", agreeTerms: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jobApplicationDraft");
      if (saved) setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
    } catch {
      localStorage.removeItem("jobApplicationDraft");
    }
  }, []);

  const [resume, setResume] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === "checkbox" ? checked : value };
      localStorage.setItem("jobApplicationDraft", JSON.stringify(updated));
      return updated;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (selectedFile, type) => {
    if (!selectedFile) return;
    const extension = selectedFile.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "doc", "docx"];
    if (!allowed.includes(extension)) {
      setErrors((prev) => ({ ...prev, [type]: "Upload a PDF, DOC, or DOCX file." }));
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "File size must be less than 5 MB." }));
      return;
    }
    if (type === "resume") setResume(selectedFile);
    else setCoverLetterFile(selectedFile);
    setErrors((prev) => ({ ...prev, [type]: "" }));
  };

  const removeFile = (type) => {
    if (type === "resume") { setResume(null); if (resumeRef.current) resumeRef.current.value = ""; }
    else { setCoverLetterFile(null); if (coverLetterRef.current) coverLetterRef.current.value = ""; }
  };

  const formatSize = (bytes) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.currentLocation.trim()) newErrors.currentLocation = "Current location is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.noticePeriod) newErrors.noticePeriod = "Notice period is required";
    if (!formData.expectedSalary.trim()) newErrors.expectedSalary = "Expected salary is required";
    if (!formData.highestQualification) newErrors.highestQualification = "Qualification is required";
    if (!formData.skills.trim()) newErrors.skills = "Please add your skills";
    if (!resume) newErrors.resume = "Resume is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newJob = {
        id: Date.now().toString(),
        jobTitle: jobInfo?.title || "Job Role",
        companyName: jobInfo?.company || "Company",
        location: formData.currentLocation,
        jobType: jobInfo?.type || "Full-time",
        status: "Pending",
        postedAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("myJobs") || "[]");
      localStorage.setItem("myJobs", JSON.stringify([...existing, newJob]));

      const old = JSON.parse(localStorage.getItem("myApplications") || "[]");
      old.push({
        id: Date.now(),
        role: jobInfo?.title || "Role",
        company: jobInfo?.company || "Company",
        location: formData.currentLocation,
        appliedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        status: "Applied",
      });
      localStorage.setItem("myApplications", JSON.stringify(old));

      setSubmitting(false);
      setSubmitted(true);
      localStorage.removeItem("jobApplicationDraft");
    }, 1200);
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="w-full text-slate-800">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle size={44} />
        </div>
        <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          Application <span className="text-orange-500">Submitted!</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-slate-500 sm:text-base">
          Your application for <span className="font-semibold text-slate-700">{jobInfo?.title}</span> at <span className="font-semibold text-slate-700">{jobInfo?.company}</span> has been sent successfully.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => navigate("/dashboard/myapplications")} className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600">
            Go to Dashboard
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Browse More Jobs
          </button>
        </div>
      </div>
    );
  }

  // FORM SCREEN (Removed min-h-screen so it fits in modal)
  return (
    <div className="w-full text-slate-800">
      
      {/* Modal Header inside Form */}
      <header className="mb-7 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} />
            APPLY NOW
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Job <span className="text-orange-500">Application</span>
          </h1>
        </div>
        <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-500 sm:flex">
          <FileCheck size={32} strokeWidth={1.5} />
        </div>
      </header>

      {/* Dynamic Job Info Card */}
      {jobInfo && (
        <section className="mb-5 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white overflow-hidden">
              {jobInfo.logo ? <img src={jobInfo.logo} className="w-full h-full object-cover" alt="" /> : <Building2 size={24} />}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold sm:text-xl">{jobInfo.title}</h2>
              <p className="text-sm font-semibold text-orange-600">{jobInfo.company}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {jobInfo.location}</span>
                <span className="inline-flex items-center gap-1.5"><Briefcase size={13} /> {jobInfo.type}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Actual Form Fields */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[1.4fr_0.6fr]">
          
          {/* LEFT COLUMN */}
          <div className="grid min-w-0 gap-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white"><User size={21} /></div>
                <div><h2 className="font-bold">Personal Information</h2></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="fullName" icon={User} value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
                <Field label="Email Address" name="email" type="email" icon={Mail} value={formData.email} onChange={handleChange} error={errors.email} required />
                <Field label="Phone Number" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} error={errors.phone} required />
                <Field label="Current Location" name="currentLocation" icon={MapPin} value={formData.currentLocation} onChange={handleChange} error={errors.currentLocation} required />
                <Field label="LinkedIn Profile" name="linkedin" icon={Linkedin} value={formData.linkedin} onChange={handleChange} />
                <Field label="Portfolio / Website" name="portfolio" icon={Globe} value={formData.portfolio} onChange={handleChange} />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><Briefcase size={21} /></div>
                <div><h2 className="font-bold">Professional Information</h2></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Current Company" name="currentCompany" icon={Building2} value={formData.currentCompany} onChange={handleChange} />
                <Field label="Current Role" name="currentRole" icon={Briefcase} value={formData.currentRole} onChange={handleChange} />
                <SelectField label="Experience" name="experience" value={formData.experience} onChange={handleChange} error={errors.experience} required options={[{value: "", label: "Select"}, {value: "fresher", label: "Fresher"}, {value: "1-3", label: "1 - 3 years"}, {value: "3-5", label: "3 - 5 years"}]} />
                <SelectField label="Notice Period" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} error={errors.noticePeriod} required options={[{value: "", label: "Select"}, {value: "immediate", label: "Immediate"}, {value: "30days", label: "30 Days"}, {value: "90days", label: "90 Days"}]} />
                <Field label="Current Salary (LPA)" name="currentSalary" icon={DollarSign} value={formData.currentSalary} onChange={handleChange} />
                <Field label="Expected Salary (LPA)" name="expectedSalary" icon={DollarSign} value={formData.expectedSalary} onChange={handleChange} error={errors.expectedSalary} required />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><GraduationCap size={21} /></div>
                <div><h2 className="font-bold">Education & Skills</h2></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField label="Qualification" name="highestQualification" value={formData.highestQualification} onChange={handleChange} error={errors.highestQualification} required options={[{value: "", label: "Select"}, {value: "bachelors", label: "Bachelor's Degree"}, {value: "masters", label: "Master's Degree"}]} />
                <Field label="University" name="university" icon={Award} value={formData.university} onChange={handleChange} />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Key Skills <span className="text-red-500">*</span></label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js..." className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm outline-none ${errors.skills ? "border-red-300" : "border-slate-200"}`} />
                {errors.skills && <p className="text-xs text-red-500 mt-1">{errors.skills}</p>}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid min-w-0 gap-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white"><Upload size={21} /></div>
                <div><h2 className="font-bold">Upload Resume <span className="text-red-500">*</span></h2></div>
              </div>
              <div onClick={() => resumeRef.current?.click()} className={`flex min-h-32 flex-col cursor-pointer items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center ${resume ? "border-orange-400 bg-orange-50/60" : "border-orange-200 bg-orange-50 hover:border-orange-400"}`}>
                <Upload size={24} className="text-orange-500 mb-2" />
                <h3 className="text-sm font-bold">Upload Resume</h3>
                <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleFile(e.target.files[0], "resume")} />
              </div>
              {errors.resume && <p className="mt-2 text-xs text-red-600">{errors.resume}</p>}
              {resume && <p className="mt-2 text-xs font-bold text-slate-600 truncate">Selected: {resume.name}</p>}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <label className="flex cursor-pointer items-start gap-3 mb-4">
                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-0.5 h-4 w-4" />
                <span className="text-xs leading-5 text-slate-600">I agree that the information provided is accurate.</span>
              </label>
              {errors.agreeTerms && <p className="text-xs text-red-600 mb-3">{errors.agreeTerms}</p>}

              <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600">
                {submitting ? "Submitting..." : <><Send size={16} /> Submit Application</>}
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
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm outline-none ${Icon ? "pl-10" : ""} ${error ? "border-red-300" : "border-slate-200"}`} />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, required }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
      <select name={name} value={value} onChange={onChange} className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm outline-none ${error ? "border-red-300" : "border-slate-200"}`}>
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}

export default Application;