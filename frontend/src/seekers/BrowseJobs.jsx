import { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, IndianRupee, Building2, Sparkles, Filter, Bookmark, BookmarkCheck } from "lucide-react";

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 1. Sirf Approved jobs load karo
    const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    setJobs(allJobs.filter((job) => job.status === "Approved"));

    // 2. Saved jobs ki list load karo
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobIds(saved);
  }, []);

  // Save / Unsave logic
  const toggleSaveJob = (jobId) => {
    let updatedSaved;
    if (savedJobIds.includes(jobId)) {
      updatedSaved = savedJobIds.filter(id => id !== jobId); // Remove
    } else {
      updatedSaved = [...savedJobIds, jobId]; // Add
    }
    setSavedJobIds(updatedSaved);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSaved));
  };

  const filteredJobs = jobs.filter(job => 
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
          <Sparkles size={15} />
          DISCOVER OPPORTUNITIES
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Browse <span className="text-orange-500">Jobs</span>
        </h1>
        
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search job title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No approved jobs found.</div>
        ) : (
          filteredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <div key={job.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:shadow-md">
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-100 bg-slate-50">
                      <Building2 size={24} className="text-orange-400" />
                    </div>
                    {/* Save Button */}
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className={`transition ${isSaved ? "text-orange-500" : "text-slate-300 hover:text-orange-500"}`}
                    >
                      {isSaved ? <BookmarkCheck size={24} className="fill-orange-100" /> : <Bookmark size={24} />}
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold">{job.jobTitle}</h3>
                  <p className="text-sm font-medium text-slate-500">{job.companyName}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1"><Briefcase size={12}/> {job.jobType}</span>
                    <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1"><MapPin size={12}/> {job.location}</span>
                    <span className="flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-2 py-1"><IndianRupee size={12}/> {job.minSalary ? `${job.minSalary/100000}L` : "NA"}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 border-t border-slate-100 pt-4">
                  <button className="flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">Apply Now</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default BrowseJobs;