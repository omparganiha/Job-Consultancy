import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Edit3, 
  Eye, 
  Briefcase, 
  MapPin, 
  Building2,
  Clock,
  IndianRupee,
  X,
  AlertTriangle,
  Save
} from 'lucide-react';

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals Control State
  const [selectedJob, setSelectedJob] = useState(null); 
  const [editingJob, setEditingJob] = useState(null);   
  const [deletingJobId, setDeletingJobId] = useState(null); 

  // 1. Load Data from LocalStorage
  useEffect(() => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      setJobs(savedJobs);
    } catch (error) {
      console.error("Error loading jobs from localStorage:", error);
    }
  }, []);

  // Helper function to update localStorage
  const updateLocalStorage = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("myJobs", JSON.stringify(updatedJobs));
  };

  // 2. Delete Logic
  const handleConfirmDelete = () => {
    if (deletingJobId) {
      const updated = jobs.filter(j => j.id !== deletingJobId);
      updateLocalStorage(updated);
      setDeletingJobId(null);
    }
  };

  // 3. Edit Form Submit Logic
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = jobs.map(j => j.id === editingJob.id ? editingJob : j);
    updateLocalStorage(updated);
    setEditingJob(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingJob(prev => ({ ...prev, [name]: value }));
  };

  // 4. Dynamic Search Filter
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [jobs, searchTerm]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.35s ease forwards; }
        .animate-scale-in { animation: scaleIn 0.25s ease-out forwards; }
        
        /* Custom Scrollbar for Modal */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          background: #f8fafc;
          padding: 0.65rem 1rem;
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
      `}</style>

      <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 font-sans text-slate-800 animate-fade-in">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              My <span className="text-orange-500">Jobs</span>
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Manage, view and edit all your posted job listings.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search by job title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full sm:w-72 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              
              {/* Table Head */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Role & Company</th>
                  <th className="py-4 px-6">Type & Mode</th>
                  <th className="py-4 px-6">Experience</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Salary Range</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                            <Briefcase size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{job.jobTitle}</div>
                            <div className="mt-0.5 flex items-center gap-1 text-[13px] font-medium text-slate-500">
                              <Building2 size={12} /> {job.companyName || job.company || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {job.jobType} • {job.workMode}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          <Clock size={13} className="text-slate-500" /> {job.experience}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
                          <MapPin size={14} className="text-slate-400" /> {job.location || 'Not Specified'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[14px] font-bold text-slate-700">
                          {job.minSalary || job.maxSalary 
                            ? `₹${job.minSalary || '0'} - ₹${job.maxSalary || '0'}` 
                            : <span className="text-slate-400 italic font-medium">Not Disclosed</span>}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold border ${
                          job.status === 'Active' || !job.status ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${job.status === 'Active' || !job.status ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                          {job.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setSelectedJob(job)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-blue-600 hover:text-white active:scale-95">
                            <Eye size={17} />
                          </button>
                          <button onClick={() => setEditingJob(job)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition hover:bg-orange-500 hover:text-white active:scale-95">
                            <Edit3 size={17} />
                          </button>
                          <button onClick={() => setDeletingJobId(job.id)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-500 hover:text-white active:scale-95">
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center justify-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><Search size={32} /></div>
                        <h3 className="mb-1 text-base font-bold text-slate-800">No jobs found</h3>
                        <p className="text-sm font-medium text-slate-500">
                          {searchTerm ? `We couldn't find any jobs matching "${searchTerm}".` : "You haven't posted any jobs yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. NEW PREMIUM VIEW JOB DETAILS MODAL */}
      {/* ========================================================= */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl animate-scale-in flex flex-col max-h-[90vh]">
            
            {/* Header Area */}
            <div className="relative bg-gradient-to-b from-orange-50/50 to-white px-8 pt-8 pb-6 border-b border-slate-100">
              <button onClick={() => setSelectedJob(null)} className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-100 hover:text-red-500">
                <X size={18} />
              </button>
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm border border-orange-200">
                  <Briefcase size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">{selectedJob.jobTitle}</h2>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                    <Building2 size={16} /> {selectedJob.companyName || 'Unknown Company'}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Body Area */}
            <div className="overflow-y-auto px-8 py-6 custom-scrollbar">
              
              {/* Colored Tag Badges (No more ugly gray boxes) */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3.5 py-1.5 text-[13px] font-bold text-blue-700 border border-blue-100">
                  {selectedJob.jobType}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-purple-50 px-3.5 py-1.5 text-[13px] font-bold text-purple-700 border border-purple-100">
                  {selectedJob.workMode}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3.5 py-1.5 text-[13px] font-bold text-amber-700 border border-amber-100">
                  <Clock size={14}/> {selectedJob.experience}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[13px] font-bold border ${selectedJob.status === 'Active' || !selectedJob.status ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  <span className={`h-2 w-2 rounded-full ${selectedJob.status === 'Active' || !selectedJob.status ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                  {selectedJob.status || 'Active'}
                </span>
              </div>

              {/* Location & Salary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">{selectedJob.location || 'Not Specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-orange-50/50 p-4 border border-orange-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-orange-100 text-orange-500">
                    <IndianRupee size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Salary</p>
                    <p className="mt-0.5 text-sm font-extrabold text-orange-600">
                      {selectedJob.minSalary || selectedJob.maxSalary ? `₹${selectedJob.minSalary || '0'} - ₹${selectedJob.maxSalary || '0'}` : 'Not Disclosed'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description (Clean View) */}
              <div className="mb-8">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Job Description
                </h3>
                <div className="rounded-2xl border border-slate-100 p-5 text-sm leading-relaxed text-slate-600 shadow-sm bg-white">
                  {selectedJob.description || 'No description provided.'}
                </div>
              </div>

              {/* Requirements (Clean View) */}
              {selectedJob.requirements && (
                <div className="mb-2">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Requirements & Skills
                  </h3>
                  <div className="rounded-2xl border border-slate-100 p-5 text-sm leading-relaxed text-slate-600 shadow-sm bg-white">
                    {selectedJob.requirements}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            <div className="border-t border-slate-100 bg-slate-50 px-8 py-4 flex justify-end">
              <button onClick={() => setSelectedJob(null)} className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. EDIT JOB MODAL */}
      {/* ========================================================= */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Edit Job Post</h2>
                  <p className="text-xs text-slate-500">Update job details and save changes</p>
                </div>
              </div>
              <button onClick={() => setEditingJob(null)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Job Title</label>
                <input type="text" name="jobTitle" value={editingJob.jobTitle} onChange={handleEditChange} className="input-base" required />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Job Type</label>
                  <select name="jobType" value={editingJob.jobType} onChange={handleEditChange} className="input-base">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Work Mode</label>
                  <select name="workMode" value={editingJob.workMode} onChange={handleEditChange} className="input-base">
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Experience</label>
                  <select name="experience" value={editingJob.experience} onChange={handleEditChange} className="input-base">
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Location</label>
                  <input type="text" name="location" value={editingJob.location || ''} onChange={handleEditChange} className="input-base" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Status</label>
                  <select name="status" value={editingJob.status || 'Active'} onChange={handleEditChange} className="input-base">
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Min Salary (₹)</label>
                  <input type="number" name="minSalary" value={editingJob.minSalary || ''} onChange={handleEditChange} className="input-base" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Max Salary (₹)</label>
                  <input type="number" name="maxSalary" value={editingJob.maxSalary || ''} onChange={handleEditChange} className="input-base" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">Description</label>
                <textarea name="description" rows={3} value={editingJob.description || ''} onChange={handleEditChange} className="input-base resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setEditingJob(null)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {deletingJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl animate-scale-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Delete Job Post?</h2>
            <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">
              Are you sure you want to delete this job listing? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => setDeletingJobId(null)} className="w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="w-full rounded-xl bg-red-600 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-red-700">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyJob;