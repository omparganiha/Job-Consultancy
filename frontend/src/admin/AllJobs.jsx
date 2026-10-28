import { useState, useEffect } from "react";
import { Building2, MapPin, Trash2, ExternalLink } from "lucide-react";

function AllJobs() {
  const [approvedJobs, setApprovedJobs] = useState([]);

  // Load Published jobs from jobList (AddJob saves here)
  const loadJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem("jobList") || "[]");
    // Support both "Published" (AddJob) and "Approved" (legacy)
    setApprovedJobs(
      allJobs.filter(
        (job) => job.status === "Published" || job.status === "Approved"
      )
    );
  };

  useEffect(() => {
    loadJobs();

    // Refresh when returning to this page / storage updates
    const onFocus = () => loadJobs();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this live job?")) return;

    const allJobs = JSON.parse(localStorage.getItem("jobList") || "[]");
    const updatedJobs = allJobs.filter((job) => job.id !== id);
    localStorage.setItem("jobList", JSON.stringify(updatedJobs));
    setApprovedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Job Title & Company</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {approvedJobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No published jobs available.
                  </td>
                </tr>
              ) : (
                approvedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                          <Building2 size={18} />
                        </div>
                        <div>
                          {/* Support both field naming conventions */}
                          <p className="font-bold text-slate-800">
                            {job.title || job.jobTitle}
                          </p>
                          <p className="text-xs text-slate-500">
                            {job.company || job.companyName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {job.location}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                        {job.jobType || job.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                          title="View Job"
                        >
                          <ExternalLink size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Remove Job"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default AllJobs;