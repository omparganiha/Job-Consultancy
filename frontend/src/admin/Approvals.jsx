import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Building2, MapPin, IndianRupee, Clock, Sparkles } from "lucide-react";

function Approvals() {
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    const filtered = allJobs.filter((job) => job.status === "Pending");
    setPendingJobs(filtered);
  }, []);

  // Handle Approve or Reject
  const handleAction = (id, newStatus) => {
    const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    
    // Update the specific job
    const updatedJobs = allJobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    );
    
    // Save back to localStorage
    localStorage.setItem("myJobs", JSON.stringify(updatedJobs));
    
    // Remove from current UI
    setPendingJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* <header className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
          <Sparkles size={15} />
          ADMIN ACTIONS
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Pending <span className="text-orange-500">Approvals</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review job postings submitted by providers. Approve them to make them live.
        </p>
      </header> */}

      <div className="grid grid-cols-1 gap-5">
        {pendingJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <CheckCircle size={40} className="mb-3 text-emerald-400" />
            <h3 className="text-lg font-bold">All caught up!</h3>
            <p className="text-sm text-slate-500">No pending jobs to review right now.</p>
          </div>
        ) : (
          pendingJobs.map((job) => (
            <div key={job.id} className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
              
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50 border border-orange-100">
                  <Building2 size={24} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{job.jobTitle}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{job.companyName}</p>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.jobType} • {job.workMode}</span>
                    <span className="flex items-center gap-1 text-emerald-600"><IndianRupee size={14} /> {job.minSalary || "NA"} - {job.maxSalary || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:flex-col sm:items-end sm:justify-center">
                <button 
                  onClick={() => handleAction(job.id, "Approved")}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button 
                  onClick={() => handleAction(job.id, "Rejected")}
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 shadow-sm hover:bg-red-100 transition"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Approvals;