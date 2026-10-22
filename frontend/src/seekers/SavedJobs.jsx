import { useState, useEffect } from "react";
import { Bookmark, Building2, MapPin, IndianRupee, Trash2 } from "lucide-react";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    const savedIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    
    // Filter jobs that are saved AND still approved
    const filtered = allJobs.filter(job => savedIds.includes(job.id) && job.status === "Approved");
    setSavedJobs(filtered);
  }, []);

  const removeSavedJob = (jobId) => {
    const savedIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const updatedIds = savedIds.filter(id => id !== jobId);
    
    localStorage.setItem("savedJobs", JSON.stringify(updatedIds));
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Saved <span className="text-orange-500">Jobs</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Jobs you have bookmarked for later.</p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {savedJobs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-16 text-slate-400">
            <Bookmark size={48} className="mb-4 opacity-50" />
            <p>You haven't saved any jobs yet.</p>
          </div>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-100 bg-slate-50">
                  <Building2 size={24} className="text-orange-400" />
                </div>
                <h3 className="text-lg font-bold">{job.jobTitle}</h3>
                <p className="text-sm text-slate-500">{job.companyName}</p>
                <p className="mt-2 text-xs font-semibold text-slate-600 flex items-center gap-1"><MapPin size={12}/> {job.location}</p>
              </div>

              <div className="mt-6 flex gap-3 border-t border-slate-100 pt-4">
                <button className="flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">Apply</button>
                <button onClick={() => removeSavedJob(job.id)} className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-2.5 text-red-500 hover:bg-red-100 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default SavedJobs;