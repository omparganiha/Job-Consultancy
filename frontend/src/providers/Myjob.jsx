import { useState, useEffect } from "react";
import { Briefcase, Building2, MapPin, Clock, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Provider ki saari jobs load karo (Pending + Approved + Rejected)
    const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    setMyJobs(allJobs);
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            My <span className="text-orange-500">Jobs</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">Track the status of the jobs you posted.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/post-job")}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition"
        >
          <PlusCircle size={18} /> Post New Job
        </button>
      </header>

      <div className="grid grid-cols-1 gap-5">
        {myJobs.length === 0 ? (
          <div className="py-16 text-center text-slate-500">You haven't posted any jobs yet.</div>
        ) : (
          myJobs.map((job) => (
            <div key={job.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
              
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                  <Building2 size={24} className="text-slate-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{job.jobTitle}</h2>
                  <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                {/* Status Badge */}
                {job.status === "Pending" && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 border border-amber-200">
                    Review Pending
                  </span>
                )}
                {job.status === "Approved" && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-200">
                    Live / Approved
                  </span>
                )}
                {job.status === "Rejected" && (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-200">
                    Rejected
                  </span>
                )}
                <div className="text-xs font-medium text-slate-500">
                  Applicants: <span className="font-bold text-slate-800">{job.applicants || 0}</span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default MyJobs;