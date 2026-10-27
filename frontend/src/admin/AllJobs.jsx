import { useState, useEffect } from "react";
import { Globe, Building2, MapPin, Trash2, ExternalLink } from "lucide-react";

function AllJobs() {
  const [approvedJobs, setApprovedJobs] = useState([]);

  // Load ONLY Approved jobs
  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
    setApprovedJobs(allJobs.filter((job) => job.status === "Approved"));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this live job?")) {
      const allJobs = JSON.parse(localStorage.getItem("myJobs") || "[]");
      const updatedJobs = allJobs.filter(job => job.id !== id);
      localStorage.setItem("myJobs", JSON.stringify(updatedJobs));
      setApprovedJobs(prev => prev.filter(job => job.id !== id));
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Published <span className="text-orange-500">Jobs</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage all live jobs that are currently visible to job seekers.
        </p>
      </header> */}

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
                  <td colSpan="4" className="p-8 text-center text-slate-500">No published jobs available.</td>
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
                          <p className="font-bold text-slate-800">{job.jobTitle}</p>
                          <p className="text-xs text-slate-500">{job.companyName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}</span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{job.jobType}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="View Job">
                          <ExternalLink size={18} />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Remove Job">
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