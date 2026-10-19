import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';

const MyJob = () => {
  // Demo Data (Backend API aane par ye state API se fill hogi)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      jobType: "Full-time",
      workMode: "On-site",
      experience: "Fresher",
      location: "Bangalore, Karnataka",
      minSalary: "5,000,00",
      maxSalary: "8,000,00",
      company: "nishu",
      status: "Active",
      postedDate: "19-10-2026"
    },
    {
      id: 2,
      jobTitle: "React.js Developer",
      jobType: "Full-time",
      workMode: "Remote",
      experience: "1-3 Years",
      location: "Mumbai, Maharashtra",
      minSalary: "6,000,00",
      maxSalary: "10,000,00",
      company: "nishu",
      status: "Active",
      postedDate: "18-10-2026"
    }
  ]);

  // Job Delete karne ke liye handler
  const handleDelete = (id) => {
    if (window.confirm("क्या आप इस जॉब को डिलीट करना चाहते हैं?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>
          <p className="text-sm text-gray-500"></p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="py-4 px-6">Job Title</th>
                <th className="py-4 px-6">Type & Mode</th>
                <th className="py-4 px-6">Experience</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Salary Range (₹)</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    {/* Job Title & Company */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">{job.jobTitle}</div>
                      <div className="text-xs text-gray-400">Company: {job.company}</div>
                    </td>

                    {/* Job Type & Work Mode */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-orange-50 text-orange-600 rounded-md border border-orange-100 mb-1">
                        {job.jobType}
                      </span>
                      <div className="text-xs text-gray-500">{job.workMode}</div>
                    </td>

                    {/* Experience */}
                    <td className="py-4 px-6 text-gray-600">
                      {job.experience}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-gray-600">
                      {job.location || 'Not Specified'}
                    </td>

                    {/* Min & Max Salary */}
                    <td className="py-4 px-6 text-gray-800 font-semibold">
                      ₹{job.minSalary} - ₹{job.maxSalary}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button 
                          title="View Details"
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <FiEye size={18} />
                        </button>
                        <button 
                          title="Edit Job"
                          className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button 
                          title="Delete Job"
                          onClick={() => handleDelete(job.id)} 
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJob;