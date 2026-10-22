import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Linkedin,
  Globe,
  DollarSign,
  Calendar,
  Sparkles,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  Clock,
  FileCheck,
  Code,
  Award,
} from "lucide-react";

function Application() {
  const resumeRef = useRef(null);
  const coverLetterRef = useRef(null);
  const navigate = useNavigate();

  // Job info (ye normally props ya URL se aayega)
  const jobInfo = {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    type: "Full-time",
    posted: "2 days ago",
  };

    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentLocation: "",
    linkedin: "",
    portfolio: "",
    currentCompany: "",
    currentRole: "",
    experience: "",
    noticePeriod: "",
    currentSalary: "",
    expectedSalary: "",
    highestQualification: "",
    university: "",
    graduationYear: "",
    skills: "",
    coverLetterText: "",
    availableFrom: "",
    willingToRelocate: "no",
    agreeTerms: false,
  });

  // Load saved data once on mount
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
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Save to localStorage (files are never in formData, so safe)
      localStorage.setItem("jobApplicationDraft", JSON.stringify(updated));

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFile = (selectedFile, type) => {
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "doc", "docx"];

    if (!allowed.includes(extension)) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Upload a PDF, DOC, or DOCX file.",
      }));
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [type]: "File size must be less than 5 MB.",
      }));
      return;
    }

    if (type === "resume") setResume(selectedFile);
    else setCoverLetterFile(selectedFile);

    setErrors((prev) => ({ ...prev, [type]: "" }));
  };

  const removeFile = (type) => {
    if (type === "resume") {
      setResume(null);
      if (resumeRef.current) resumeRef.current.value = "";
    } else {
      setCoverLetterFile(null);
      if (coverLetterRef.current) coverLetterRef.current.value = "";
    }
  };

  const formatSize = (bytes) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.currentLocation.trim())
      newErrors.currentLocation = "Current location is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.noticePeriod)
      newErrors.noticePeriod = "Notice period is required";
    if (!formData.expectedSalary.trim())
      newErrors.expectedSalary = "Expected salary is required";
    if (!formData.highestQualification)
      newErrors.highestQualification = "Qualification is required";
    if (!formData.skills.trim()) newErrors.skills = "Please add your skills";
    if (!resume) newErrors.resume = "Resume is required";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    // Demo only. Replace with your Django API request.
    setTimeout(() => {
      // 1. Create the job object (keys must match Approvals.jsx)
      const newJob = {
        id: Date.now().toString(),
        jobTitle: jobInfo.title,
        companyName: jobInfo.company,
        location: formData.currentLocation,
        jobType: jobInfo.type,
        workMode: "On-site",
        minSalary: formData.expectedSalary,
        maxSalary: formData.expectedSalary,
        status: "Pending",                    // ← admin filters on this
        postedAt: new Date().toISOString(),
      };

      // 2. Append to myJobs array
      const existing = JSON.parse(localStorage.getItem("myJobs") || "[]");
      localStorage.setItem("myJobs", JSON.stringify([...existing, newJob]));

      // 3. Finish
      // Save application to localStorage
        const old = JSON.parse(localStorage.getItem("myApplications") || "[]");
        old.push({
          id: Date.now(),
          role: jobInfo.title,
          company: jobInfo.company,
          location: formData.currentLocation,
          appliedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          status: "Applied",
        });
        localStorage.setItem("myApplications", JSON.stringify(old));

        setSubmitting(false);
        setSubmitted(true);
        localStorage.removeItem("jobApplicationDraft");
        window.scrollTo({ top: 0, behavior: "smooth" });
            }, 1200);
  };

  // Success screen
  if (submitted) {
    return (
      <main className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle size={44} />
            </div>

            <h1 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Application <span className="text-orange-500">Submitted!</span>
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              Your application for{" "}
              <span className="font-semibold text-slate-700">
                {jobInfo.title}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-slate-700">
                {jobInfo.company}
              </span>{" "}
              has been sent successfully. You will receive updates on your
              email.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => navigate("/dashboard/myapplications")}
                className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                View My Applications
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/browsejobs")}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Browse More Jobs
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Page header */}
      <header className="mb-7 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} />
            APPLY NOW
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Job <span className="text-orange-500">Application</span>
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Fill out the form below to apply. Make sure your details are
            accurate before submitting.
          </p>
        </div>

        <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-500 sm:flex">
          <FileCheck size={42} strokeWidth={1.5} />
        </div>
      </header>

      {/* Job info card */}
      <section className="mb-5 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Building2 size={26} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold sm:text-xl">
                {jobInfo.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-orange-600">
                {jobInfo.company}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} />
                  {jobInfo.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={13} />
                  {jobInfo.type}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} />
                  Posted {jobInfo.posted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[1.4fr_0.6fr]">
          {/* LEFT COLUMN - Form fields */}
          <div className="grid min-w-0 gap-5">
            {/* Personal Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <User size={21} />
                </div>
                <div>
                  <h2 className="font-bold">Personal Information</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Basic details about yourself
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="fullName"
                  icon={User}
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  placeholder="John Doe"
                  required
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                  required
                />

                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  icon={Phone}
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                  required
                />

                <Field
                  label="Current Location"
                  name="currentLocation"
                  icon={MapPin}
                  value={formData.currentLocation}
                  onChange={handleChange}
                  error={errors.currentLocation}
                  placeholder="City, State"
                  required
                />

                <Field
                  label="LinkedIn Profile"
                  name="linkedin"
                  icon={Linkedin}
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/username"
                />

                <Field
                  label="Portfolio / Website"
                  name="portfolio"
                  icon={Globe}
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </section>

            {/* Professional Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Briefcase size={21} />
                </div>
                <div>
                  <h2 className="font-bold">Professional Information</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your current work details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Current Company"
                  name="currentCompany"
                  icon={Building2}
                  value={formData.currentCompany}
                  onChange={handleChange}
                  placeholder="Company name"
                />

                <Field
                  label="Current Role"
                  name="currentRole"
                  icon={Briefcase}
                  value={formData.currentRole}
                  onChange={handleChange}
                  placeholder="Your job title"
                />

                <SelectField
                  label="Total Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  error={errors.experience}
                  required
                  options={[
                    { value: "", label: "Select experience" },
                    { value: "fresher", label: "Fresher" },
                    { value: "0-1", label: "0 - 1 year" },
                    { value: "1-3", label: "1 - 3 years" },
                    { value: "3-5", label: "3 - 5 years" },
                    { value: "5-8", label: "5 - 8 years" },
                    { value: "8+", label: "8+ years" },
                  ]}
                />

                <SelectField
                  label="Notice Period"
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                  error={errors.noticePeriod}
                  required
                  options={[
                    { value: "", label: "Select notice period" },
                    { value: "immediate", label: "Immediate" },
                    { value: "15days", label: "15 Days" },
                    { value: "30days", label: "30 Days" },
                    { value: "60days", label: "60 Days" },
                    { value: "90days", label: "90 Days" },
                  ]}
                />

                <Field
                  label="Current Salary (LPA)"
                  name="currentSalary"
                  icon={DollarSign}
                  value={formData.currentSalary}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                />

                <Field
                  label="Expected Salary (LPA)"
                  name="expectedSalary"
                  icon={DollarSign}
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  error={errors.expectedSalary}
                  placeholder="e.g. 12"
                  required
                />
              </div>
            </section>

            {/* Education */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <GraduationCap size={21} />
                </div>
                <div>
                  <h2 className="font-bold">Education</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your academic background
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Highest Qualification"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  error={errors.highestQualification}
                  required
                  options={[
                    { value: "", label: "Select qualification" },
                    { value: "high-school", label: "High School" },
                    { value: "diploma", label: "Diploma" },
                    { value: "bachelors", label: "Bachelor's Degree" },
                    { value: "masters", label: "Master's Degree" },
                    { value: "phd", label: "PhD" },
                  ]}
                />

                <Field
                  label="University / Institution"
                  name="university"
                  icon={Award}
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="University name"
                />

                <Field
                  label="Graduation Year"
                  name="graduationYear"
                  type="number"
                  icon={Calendar}
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g. 2022"
                />

                <Field
                  label="Available From"
                  name="availableFrom"
                  type="date"
                  icon={Calendar}
                  value={formData.availableFrom}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Skills & Cover Letter */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Code size={21} />
                </div>
                <div>
                  <h2 className="font-bold">Skills & Cover Letter</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Tell us why you're a great fit
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Key Skills <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, TypeScript, Python..."
                    className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 ${
                      errors.skills ? "border-red-300" : "border-slate-200"
                    }`}
                  />
                  {errors.skills && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                      <AlertCircle size={13} />
                      {errors.skills}
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-slate-400">
                    Separate skills with commas
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Cover Letter{" "}
                    <span className="font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="coverLetterText"
                    value={formData.coverLetterText}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Write a short message explaining why you are a great fit for this role..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                  <div className="mt-2 flex justify-between gap-3 text-[11px] text-slate-400">
                    <span>
                      {formData.coverLetterText.length} characters
                    </span>
                    <span>Recommended for better response</span>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Willing to Relocate?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["yes", "no", "maybe"].map((option) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition ${
                          formData.willingToRelocate === option
                            ? "border-orange-400 bg-orange-50 text-orange-700"
                            : "border-slate-200 text-slate-600 hover:border-orange-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="willingToRelocate"
                          value={option}
                          checked={formData.willingToRelocate === option}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Uploads & Submit */}
          <div className="grid min-w-0 gap-5">
            {/* Resume Upload */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <Upload size={21} />
                </div>
                <div>
                  <h2 className="font-bold">
                    Upload Resume <span className="text-red-500">*</span>
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    PDF, DOC or DOCX · Max 5 MB
                  </p>
                </div>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFile(e.dataTransfer.files[0], "resume");
                }}
                className={`flex min-h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${
                  resume
                    ? "border-orange-400 bg-orange-50/60"
                    : "border-orange-200 bg-orange-50/30 hover:border-orange-400 hover:bg-orange-50"
                }`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Upload size={24} />
                </div>

                <h3 className="text-sm font-bold">Drop your resume here</h3>
                <p className="mt-1 text-xs text-slate-500">or browse files</p>

                <button
                  type="button"
                  onClick={() => resumeRef.current?.click()}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
                >
                  <Upload size={15} />
                  Choose File
                </button>

                <input
                  ref={resumeRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0], "resume")}
                />
              </div>

              {errors.resume && (
                <p className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-600">
                  {errors.resume}
                </p>
              )}

              {resume && (
                <div className="mt-4 flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    <FileText size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      {resume.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {formatSize(resume.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile("resume")}
                    aria-label="Remove resume"
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </section>

            {/* Cover Letter Upload (Optional) */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <FileText size={21} />
                </div>
                <div>
                  <h2 className="font-bold">Cover Letter File</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Optional · PDF, DOC or DOCX
                  </p>
                </div>
              </div>

              {!coverLetterFile ? (
                <button
                  type="button"
                  onClick={() => coverLetterRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-5 text-sm font-semibold text-slate-500 transition hover:border-orange-300 hover:bg-orange-50/40 hover:text-orange-600"
                >
                  <Upload size={16} />
                  Upload Cover Letter
                </button>
              ) : (
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <FileText size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      {coverLetterFile.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {formatSize(coverLetterFile.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile("coverLetter")}
                    aria-label="Remove cover letter"
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {errors.coverLetter && (
                <p className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-600">
                  {errors.coverLetter}
                </p>
              )}

              <input
                ref={coverLetterRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  handleFile(e.target.files[0], "coverLetter")
                }
              />
            </section>

            {/* Submit section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-bold">Review & Submit</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Confirm your application before submitting
                </p>
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-orange-500"
                />
                <span className="text-xs leading-5 text-slate-600">
                  I agree that the information provided is accurate and
                  consent to its sharing with the employer.
                </span>
              </label>

              {errors.agreeTerms && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle size={13} />
                  {errors.agreeTerms}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Application
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                You will receive a confirmation email shortly
              </p>
            </section>

            {/* Tip card */}
            <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500">
                <Sparkles size={21} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Pro Tip
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Tailor your resume and cover letter to match the job
                  description for better results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

/* ---------- Reusable field components ---------- */

function Field({
  label,
  name,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-slate-50 p-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-red-300" : "border-slate-200"}`}
        />
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full cursor-pointer rounded-xl border bg-slate-50 p-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

export default Application;