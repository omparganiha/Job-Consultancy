import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase, Building2, MapPin, IndianRupee, Calendar, Clock,
  Save, CheckCircle2, ArrowLeft, FileText, Tag,
  Users, Monitor, Phone, Mail, User, Link2, StickyNote,
  Edit, AlertCircle, Layers, Target, Hash, Eye, Send,
  ShieldCheck, Bell, Flag, Star, UserCheck, Zap, Globe,
  Loader2
} from "lucide-react";
import { toast } from "react-toastify";

const AddJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.jobData || null;

  // ==================== ADMIN INFO (from localStorage) ====================
  const adminInfo = JSON.parse(localStorage.getItem("adminUser") || '{"name":"Admin","id":"ADM-001","role":"Super Admin"}');

  // ==================== TAB STATE ====================
  const [activeTab, setActiveTab] = useState("job");
  const [showPreview, setShowPreview] = useState(false);

  // ==================== POSTED JOBS LIST (for interview tab) ====================
  const [postedJobs, setPostedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  // ==================== SUCCESS POPUP STATE ====================
  const [successModal, setSuccessModal] = useState({
    show: false,
    title: "",
    message: "",
    path: ""
  });

  // ==================== JOB FORM STATE ====================
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    companyLogo: "",
    location: "",
    workMode: "On-Site",
    salary: "",
    salaryType: "Monthly",
    jobType: "Full-Time",
    experience: "",
    experienceLevel: "Mid-Level",
    category: "",
    skills: "",
    description: "",
    requirements: "",
    benefits: "",
    lastDate: "",
    vacancies: "",
    status: "Draft",
    priority: "Normal",
    sendNotification: true,
    featured: false,
    postedBy: adminInfo.name,
    adminId: adminInfo.id,
  });

  // ==================== INTERVIEW FORM STATE ====================
  const [interviewForm, setInterviewForm] = useState({
    selectedJobId: "",
    selectedCandidateId: "",
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    jobTitle: "",
    company: "",
    interviewDate: "",
    interviewTime: "",
    duration: "30",
    interviewType: "Online",
    interviewRound: "Round 1",
    interviewerName: "",
    interviewerEmail: "",
    meetingLink: "",
    address: "",
    notes: "",
    status: "Scheduled",
    sendEmailToCandidate: true,
    sendEmailToInterviewer: true,
    scheduledBy: adminInfo.name,
    adminId: adminInfo.id,
  });

  const [errors, setErrors] = useState({});

  // ==================== DROPDOWN OPTIONS ====================
  const jobTypes = ["Full-Time", "Part-Time", "Internship", "Contract", "Freelance"];
  const workModes = ["On-Site", "Remote", "Hybrid"];
  const salaryTypes = ["Monthly", "Yearly (LPA)", "Hourly", "Fixed"];
  const experienceLevels = ["Fresher", "Entry-Level", "Mid-Level", "Senior", "Lead", "Executive"];
  const categories = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations", "Support", "Management", "Other"];
  const jobStatuses = ["Draft", "Published", "Under Review", "Closed", "Expired"];
  const priorities = ["Low", "Normal", "High", "Urgent"];
  const interviewTypes = ["Online", "Offline (In-Person)", "Phone Call", "Technical Round", "HR Round"];
  const interviewRounds = ["Screening", "Round 1", "Round 2", "Round 3", "Technical", "HR", "Final"];
  const interviewStatuses = ["Scheduled", "Rescheduled", "Completed", "Cancelled", "No Show"];
  const durations = ["15", "30", "45", "60", "90", "120"];

  // ==================== LOAD DATA ====================
  useEffect(() => {
    let jobs = JSON.parse(localStorage.getItem("jobList") || "null");
    if (!jobs || jobs.length === 0) {
      jobs = [
        { id: "J-01", title: "React Developer", company: "TCS India" },
        { id: "J-02", title: "UI/UX Designer", company: "Infosys" }
      ];
    }
    setPostedJobs(jobs);

    let mockApps = JSON.parse(localStorage.getItem("applicantsList") || "null");
    if (!mockApps || mockApps.length === 0) {
      mockApps = [
        { id: "APP-01", name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210" },
        { id: "APP-02", name: "Priya Singh", email: "priya@yahoo.com", phone: "8765432109" },
        { id: "APP-03", name: "Amit Kumar", email: "amit.k@hotmail.com", phone: "7654321098" }
      ];
    }
    setApplicants(mockApps);
  }, []);

  useEffect(() => {
    if (editData) {
      setJobForm((prev) => ({
        ...prev,
        ...editData,
        skills: Array.isArray(editData.skills) ? editData.skills.join(", ") : editData.skills || "",
      }));
    }
  }, [editData]);

  // ==================== AUTO-FILL HANDLERS ====================
  const handleJobSelect = (jobId) => {
    const selectedJob = postedJobs.find((j) => String(j.id) === String(jobId));
    if (selectedJob) {
      setInterviewForm((prev) => ({
        ...prev, selectedJobId: jobId, jobTitle: selectedJob.title, company: selectedJob.company,
      }));
    } else {
      setInterviewForm((prev) => ({ ...prev, selectedJobId: "", jobTitle: "", company: "" }));
    }
  };

  const handleCandidateSelect = (candidateId) => {
    const selectedCandidate = applicants.find((c) => String(c.id) === String(candidateId));
    if (selectedCandidate) {
      const cleanPhone = (selectedCandidate.phone || "").replace(/\D/g, "").slice(0, 10);
      setInterviewForm((prev) => ({
        ...prev,
        selectedCandidateId: candidateId,
        candidateName: selectedCandidate.name || "",
        candidateEmail: selectedCandidate.email || "",
        candidatePhone: cleanPhone,
      }));
      toast.success(`${selectedCandidate.name}'s details auto-filled!`);
    } else {
      setInterviewForm((prev) => ({ ...prev, selectedCandidateId: "" }));
    }
  };

  const handleJobChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInterviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "candidatePhone") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setInterviewForm((prev) => ({ ...prev, [name]: numbersOnly }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }
    setInterviewForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ==================== VALIDATION ====================
  const validateJob = () => {
    const e = {};
    if (!jobForm.title.trim()) e.title = "Required";
    if (!jobForm.company.trim()) e.company = "Required";
    if (!jobForm.location.trim()) e.location = "Required";
    if (!jobForm.salary.trim()) e.salary = "Required";
    if (!jobForm.jobType) e.jobType = "Required";
    if (!jobForm.experience.trim()) e.experience = "Required";
    if (!jobForm.category) e.category = "Required";
    if (!jobForm.skills.trim()) e.skills = "Required";
    if (!jobForm.description.trim()) e.description = "Required";
    if (!jobForm.lastDate) e.lastDate = "Required";
    if (!jobForm.vacancies) e.vacancies = "Required";

    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error("Please fill all required fields correctly!");
      return false;
    }
    return true;
  };

  const validateInterview = () => {
    const e = {};
    if (!interviewForm.selectedJobId && !interviewForm.jobTitle.trim()) e.jobTitle = "Select or enter job";
    if (!interviewForm.candidateName.trim()) e.candidateName = "Required";
    if (!interviewForm.candidateEmail.trim()) e.candidateEmail = "Required";
    if (!interviewForm.candidatePhone.trim()) {
      e.candidatePhone = "Required";
    } else if (interviewForm.candidatePhone.length !== 10) {
      e.candidatePhone = "Must be exactly 10 digits";
    }
    if (!interviewForm.interviewDate) e.interviewDate = "Required";
    if (!interviewForm.interviewTime) e.interviewTime = "Required";
    if (!interviewForm.interviewerName.trim()) e.interviewerName = "Required";
    if (interviewForm.interviewType === "Online" && !interviewForm.meetingLink.trim()) {
      e.meetingLink = "Required for Online";
    }

    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error("Please fill all required fields correctly!");
      return false;
    }
    return true;
  };

  // ==================== SUBMIT HANDLERS (UPDATED) ====================
  const handleJobSubmit = (e, publishNow = false) => {
    e.preventDefault();
    if (!validateJob()) return;

    const existingList = JSON.parse(localStorage.getItem("jobList") || "[]");
    const status = publishNow ? "Published" : jobForm.status || "Draft";

    const payload = {
      ...jobForm,
      jobTitle: jobForm.title, 
      companyName: jobForm.company, 
      skills: jobForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
      status: status,
      updatedAt: new Date().toISOString(),
    };

    let savedJob;
    if (editData) {
      const updated = existingList.map((job) => job.id === editData.id ? { ...job, ...payload } : job);
      localStorage.setItem("jobList", JSON.stringify(updated));
      savedJob = updated.find(j => j.id === editData.id);
    } else {
      savedJob = { id: Date.now(), ...payload, applicantsCount: 0, views: 0, createdAt: new Date().toISOString() };
      localStorage.setItem("jobList", JSON.stringify([...existingList, savedJob]));
    }

    // EXTRA SYNC FOR ALL JOBS COMPATIBILITY
    if (status === "Published" || status === "Approved") {
      const myJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      const withoutDup = myJobs.filter((j) => j.id !== savedJob.id);
      savedJob.status = "Approved"; 
      localStorage.setItem("myJobs", JSON.stringify([...withoutDup, savedJob]));
    }

    // ⭐ GREEN SUCCESS TOAST ADDED HERE
    toast.success(editData ? "Job Updated Successfully!" : (publishNow ? "Job Published Successfully!" : "Draft Saved Successfully!"));

    setSuccessModal({
      show: true,
      title: editData ? "Job Updated!" : (publishNow ? "Job Published!" : "Draft Saved!"),
      message: publishNow 
        ? "The job is now live and visible to all candidates." 
        : "Job details have been saved successfully.",
      path: "/dashboard/all-jobs"
    });

    setTimeout(() => {
      navigate("/dashboard/all-jobs");
    }, 2500);
  };

  const handleInterviewSubmit = (e) => {
    e.preventDefault();
    if (!validateInterview()) return;

    const existingList = JSON.parse(localStorage.getItem("interviewList") || "[]");
    const newInterview = { id: Date.now(), ...interviewForm, createdAt: new Date().toISOString() };
    localStorage.setItem("interviewList", JSON.stringify([...existingList, newInterview]));

    // ⭐ GREEN SUCCESS TOAST ADDED HERE
    toast.success("Interview Scheduled Successfully!");

    setSuccessModal({
      show: true,
      title: "Interview Scheduled!",
      message: "Invitations have been sent to the candidate and interviewer.",
      path: "/dashboard/interviews"
    });

    setTimeout(() => {
      navigate("/dashboard/interviews");
    }, 2500);
  };

  // ==================== HELPER CLASSES ====================
  const inputClass = (fieldName) =>
    `w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 outline-none transition-all ${
      errors[fieldName] ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"
    }`;

  const selectClass = (fieldName) =>
    `w-full pl-10 pr-8 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 outline-none transition-all cursor-pointer ${
      errors[fieldName] ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"
    }`;

  const plainSelectClass = "w-full px-3.5 pr-8 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all cursor-pointer";
  const optionStyle = { backgroundColor: "#ffffff", color: "#1e293b" };

  const errorText = (fieldName) =>
    errors[fieldName] ? (
      <p className="text-[11px] font-bold text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle size={10} /> {errors[fieldName]}
      </p>
    ) : null;

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300 relative">

      {/* ============ ATTRACTIVE SUCCESS POPUP ================ */}
      {successModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transform scale-100 animate-in zoom-in-95 duration-300 border border-emerald-100">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-2 bg-emerald-200 rounded-full animate-pulse opacity-50"></div>
              <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <CheckCircle2 size={36} className="text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
              {successModal.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 px-2">
              {successModal.message}
            </p>
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigate(successModal.path)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-md hover:bg-slate-800 transition-all active:scale-95"
              >
                <Loader2 size={16} className="animate-spin" /> Redirecting...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== HEADER ========== */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => navigate("/dashboard/all-jobs")}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-orange-300 text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-400 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              {editData ? <Edit size={20} /> : <Briefcase size={20} />}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {editData ? "Edit" : activeTab === "job" ? "Post New" : "Schedule"}{" "}
                <span className="text-orange-500">
                  {activeTab === "job" ? "Job" : "Interview"}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ========== TAB SWITCHER ========== */}
      <div className="flex items-center gap-2 mb-6 bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-sm w-fit">
        <button
          type="button"
          onClick={() => { setActiveTab("job"); setErrors({}); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "job"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Briefcase size={15} /> Post Job
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("interview"); setErrors({}); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "interview"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Calendar size={15} /> Schedule Interview
        </button>
      </div>

      {/* ====================================================== */}
      {/* =================== JOB FORM ========================= */}
      {/* ====================================================== */}
      {activeTab === "job" && (
        <form onSubmit={(e) => handleJobSubmit(e, false)} className="space-y-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
              <Zap size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">Admin Posting Guidelines</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                Fill in accurate details. Published jobs will be visible to all candidates immediately.
                Save as draft if you need to review later.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Basic Job Information
              </h2>
              <span className="text-[11px] font-semibold text-slate-400">* Required</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Job Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Title <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Target size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="title" value={jobForm.title} onChange={handleJobChange}
                      placeholder="e.g. Senior React Developer" className={inputClass("title")} />
                  </div>
                  {errorText("title")}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="company" value={jobForm.company} onChange={handleJobChange}
                      placeholder="e.g. Google India" className={inputClass("company")} />
                  </div>
                  {errorText("company")}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Category <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="category" value={jobForm.category} onChange={handleJobChange} className={selectClass("category")}>
                      <option value="" style={optionStyle}>Select Category</option>
                      {categories.map((c) => <option key={c} value={c} style={optionStyle}>{c}</option>)}
                    </select>
                  </div>
                  {errorText("category")}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Location <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="location" value={jobForm.location} onChange={handleJobChange}
                      placeholder="e.g. Bangalore, India" className={inputClass("location")} />
                  </div>
                  {errorText("location")}
                </div>

                {/* Work Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Mode</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="workMode" value={jobForm.workMode} onChange={handleJobChange} className={selectClass("workMode")}>
                      {workModes.map((w) => <option key={w} value={w} style={optionStyle}>{w}</option>)}
                    </select>
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Type <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="jobType" value={jobForm.jobType} onChange={handleJobChange} className={selectClass("jobType")}>
                      {jobTypes.map((t) => <option key={t} value={t} style={optionStyle}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Salary <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <IndianRupee size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="salary" value={jobForm.salary} onChange={handleJobChange}
                      placeholder="e.g. 8-12 LPA" className={inputClass("salary")} />
                  </div>
                  {errorText("salary")}
                </div>

                {/* Salary Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Salary Type</label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="salaryType" value={jobForm.salaryType} onChange={handleJobChange} className={selectClass("salaryType")}>
                      {salaryTypes.map((s) => <option key={s} value={s} style={optionStyle}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Layers size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="experience" value={jobForm.experience} onChange={handleJobChange}
                      placeholder="e.g. 2-4 Years" className={inputClass("experience")} />
                  </div>
                  {errorText("experience")}
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience Level</label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="experienceLevel" value={jobForm.experienceLevel} onChange={handleJobChange} className={selectClass("experienceLevel")}>
                      {experienceLevels.map((e) => <option key={e} value={e} style={optionStyle}>{e}</option>)}
                    </select>
                  </div>
                </div>

                {/* Vacancies */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Vacancies <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="number" name="vacancies" value={jobForm.vacancies} onChange={handleJobChange}
                      placeholder="e.g. 5" min="1" className={inputClass("vacancies")} />
                  </div>
                  {errorText("vacancies")}
                </div>

                {/* Last Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Application Deadline <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" name="lastDate" value={jobForm.lastDate} onChange={handleJobChange}
                      min={new Date().toISOString().split("T")[0]} className={inputClass("lastDate")} />
                  </div>
                  {errorText("lastDate")}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span> Skills, Description & Benefits
              </h2>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Required Skills <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input type="text" name="skills" value={jobForm.skills} onChange={handleJobChange}
                    placeholder="e.g. React, Node.js, MongoDB, TypeScript" className={inputClass("skills")} />
                </div>
                {errorText("skills")}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Description <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea name="description" value={jobForm.description} onChange={handleJobChange} rows={4}
                    placeholder="Describe the role, responsibilities..." className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 outline-none transition-all resize-none ${errors.description ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errorText("description")}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Additional Requirements</label>
                <div className="relative">
                  <StickyNote size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea name="requirements" value={jobForm.requirements} onChange={handleJobChange} rows={3}
                    placeholder="Qualifications, certifications, preferences..." className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Benefits & Perks</label>
                <div className="relative">
                  <Star size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea name="benefits" value={jobForm.benefits} onChange={handleJobChange} rows={3}
                    placeholder="e.g. Health Insurance, Flexible Hours, WFH, Bonus..." className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={13} className="text-orange-500" /> Admin Controls & Publishing
              </h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Status</label>
                  <select name="status" value={jobForm.status} onChange={handleJobChange} className={plainSelectClass}>
                    {jobStatuses.map((s) => <option key={s} value={s} style={optionStyle}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Priority</label>
                  <div className="relative">
                    <Flag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="priority" value={jobForm.priority} onChange={handleJobChange} className={selectClass("priority")}>
                      {priorities.map((p) => <option key={p} value={p} style={optionStyle}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-orange-300 bg-slate-50/50 cursor-pointer hover:bg-orange-50/50 transition-all">
                    <input type="checkbox" name="featured" checked={jobForm.featured} onChange={handleJobChange} className="hidden" />
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${jobForm.featured ? "bg-orange-500 border-orange-500" : "bg-white border-slate-300"}`}>
                      {jobForm.featured && <CheckCircle2 size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-orange-500" />
                      <span className="text-xs font-bold text-slate-700">Mark as Featured Job</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate("/dashboard/all-jobs")}
              className="px-6 py-2.5 rounded-xl border border-orange-300 bg-white text-slate-600 text-sm font-bold hover:bg-orange-50 transition-all active:scale-95">
              Cancel
            </button>
            <button type="button" onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all active:scale-95">
              <Eye size={16} /> {showPreview ? "Hide" : "Preview"}
            </button>
            <button type="submit" onClick={(e) => handleJobSubmit(e, false)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-orange-500 bg-white text-orange-600 text-sm font-bold hover:bg-orange-50 transition-all active:scale-95">
              <Save size={16} /> Save as Draft
            </button>
            <button type="button" onClick={(e) => handleJobSubmit(e, true)}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95">
              <Send size={16} /> {editData ? "Update & Publish" : "Publish Now"}
            </button>
          </div>

          {showPreview && (
            <div className="mt-6 bg-white rounded-3xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm max-w-sm mx-auto md:mx-0 lg:max-w-md">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <Building2 size={16} className="text-slate-500" />
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">POSTING AS</h3>
              </div>
              <div className="p-5 border-b border-slate-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-800">{jobForm.company || "Company Name"}</h4>
                  <p className="text-sm font-medium text-slate-500">{jobForm.category || "Category"}</p>
                </div>
              </div>
              <div className="px-5 py-4 bg-slate-50/50">
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">JOB PREVIEW</h3>
                <h2 className="text-xl font-black text-slate-900 mb-4">{jobForm.title || "Job Title"}</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Briefcase size={16} className="text-orange-500" />
                    {jobForm.jobType || "Type"} • {jobForm.workMode || "Mode"}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <MapPin size={16} className="text-orange-500" />
                    {jobForm.location || "Location"}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <IndianRupee size={16} className="text-orange-500" />
                    {jobForm.salary || "Salary"}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Layers size={16} className="text-orange-500" />
                    {jobForm.experience || "Experience"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      )}

      {/* ====================================================== */}
      {/* ============== INTERVIEW FORM ======================== */}
      {/* ====================================================== */}
      {activeTab === "interview" && (
        <form onSubmit={handleInterviewSubmit} className="space-y-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
              <Calendar size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">Schedule Interview for Candidate</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                Select a posted job and candidate from applied list, or enter details manually.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Select Job & Candidate
              </h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Posted Job <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select value={interviewForm.selectedJobId} onChange={(e) => handleJobSelect(e.target.value)} className={selectClass("jobTitle")}>
                      <option value="" style={optionStyle}>-- Select from posted jobs --</option>
                      {postedJobs.map((job) => (
                        <option key={job.id} value={job.id} style={optionStyle}>{job.title} @ {job.company}</option>
                      ))}
                    </select>
                  </div>
                  {errorText("jobTitle")}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Applicant</label>
                  <div className="relative">
                    <UserCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select value={interviewForm.selectedCandidateId} onChange={(e) => handleCandidateSelect(e.target.value)} className={plainSelectClass + " pl-10"}>
                      <option value="" style={optionStyle}>-- Enter manually or select --</option>
                      {applicants.map((c) => (
                        <option key={c.id} value={c.id} style={optionStyle}>{c.name} ({c.email})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span> Candidate Details
              </h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Name <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="candidateName" value={interviewForm.candidateName} onChange={handleInterviewChange} className={inputClass("candidateName")} />
                  </div>
                  {errorText("candidateName")}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" name="candidateEmail" value={interviewForm.candidateEmail} onChange={handleInterviewChange} className={inputClass("candidateEmail")} />
                  </div>
                  {errorText("candidateEmail")}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone (10 Digits) <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="candidatePhone" maxLength={10} value={interviewForm.candidatePhone} onChange={handleInterviewChange} placeholder="e.g. 9876543210" className={inputClass("candidatePhone")} />
                  </div>
                  {errorText("candidatePhone")}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Interview Schedule
              </h2>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" name="interviewDate" value={interviewForm.interviewDate} onChange={handleInterviewChange} min={new Date().toISOString().split("T")[0]} className={inputClass("interviewDate")} />
                  </div>
                  {errorText("interviewDate")}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Time <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="time" name="interviewTime" value={interviewForm.interviewTime} onChange={handleInterviewChange} className={inputClass("interviewTime")} />
                  </div>
                  {errorText("interviewTime")}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Duration (mins)</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="duration" value={interviewForm.duration} onChange={handleInterviewChange} className={selectClass("duration")}>
                      {durations.map((d) => <option key={d} value={d} style={optionStyle}>{d} minutes</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Interview Type</label>
                  <div className="relative">
                    <Monitor size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="interviewType" value={interviewForm.interviewType} onChange={handleInterviewChange} className={selectClass("interviewType")}>
                      {interviewTypes.map((t) => <option key={t} value={t} style={optionStyle}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Round</label>
                  <div className="relative">
                    <Layers size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                    <select name="interviewRound" value={interviewForm.interviewRound} onChange={handleInterviewChange} className={selectClass("interviewRound")}>
                      {interviewRounds.map((r) => <option key={r} value={r} style={optionStyle}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Interviewer Name <span className="text-orange-500">*</span></label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="interviewerName" value={interviewForm.interviewerName} onChange={handleInterviewChange} className={inputClass("interviewerName")} placeholder="e.g. Ankit Mehta" />
                  </div>
                  {errorText("interviewerName")}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Interviewer Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" name="interviewerEmail" value={interviewForm.interviewerEmail} onChange={handleInterviewChange} className={inputClass("interviewerEmail")} placeholder="interviewer@company.com" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Meeting Link {interviewForm.interviewType === "Online" && <span className="text-orange-500">*</span>}</label>
                  <div className="relative">
                    <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="url" name="meetingLink" value={interviewForm.meetingLink} onChange={handleInterviewChange} className={inputClass("meetingLink")} placeholder="https://meet.google.com/xxx-xxxx-xxx" />
                  </div>
                  {errorText("meetingLink")}
                </div>
                {(interviewForm.interviewType === "Offline (In-Person)" || interviewForm.interviewType === "Phone Call") && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Venue / Address</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" name="address" value={interviewForm.address} onChange={handleInterviewChange} className={inputClass("address")} placeholder="Office address or call instructions" />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Notes / Instructions</label>
                <div className="relative">
                  <StickyNote size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea name="notes" value={interviewForm.notes} onChange={handleInterviewChange} rows={3} placeholder="Any special instructions for the candidate..." className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate("/dashboard/interviews")} className="px-6 py-2.5 rounded-xl border border-orange-300 bg-white text-slate-600 text-sm font-bold hover:bg-orange-50 transition-all active:scale-95">Cancel</button>
            <button type="submit" className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95">
              <Send size={16} /> Schedule & Send Invite
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddJob;