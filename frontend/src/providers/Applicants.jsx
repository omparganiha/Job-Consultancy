import { useState } from "react";
import { Users, Mail, Phone, FileText, CheckCircle, XCircle, Calendar, Eye, Search } from "lucide-react";

function Applicants() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "New", "Shortlisted", "Rejected"];

  // Demo data (baad me localStorage/API se aayega)
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", phone: "9876543210", role: "Frontend Dev", exp: "3 years", status: "New" },
    { id: 2, name: "Priya Verma", email: "priya@mail.com", phone: "9876501234", role: "Frontend Dev", exp: "5 years", status: "Shortlisted" },
    { id: 3, name: "Amit Kumar", email: "amit@mail.com", phone: "9876554321", role: "Backend Dev", exp: "2 years", status: "New" },
    { id: 4, name: "Sneha Patel", email: "sneha@mail.com", phone: "9876512345", role: "UI Designer", exp: "4 years", status: "Rejected" },
  ]);
  

  const updateStatus = (id, newStatus) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const filtered = activeTab === "All" ? applicants : applicants.filter(a => a.status === activeTab);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Job <span className="text-orange-500">Applicants</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Review candidates and update their status.</p>
      </header>

      <div className="mb-6 flex overflow-x-auto border-b border-slate-200">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition
                ${activeTab === tab ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
              {tab} ({tab === "All" ? applicants.length : applicants.filter(a => a.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(app => (
          <div key={app.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 text-lg font-bold">
                {app.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold">{app.name}</h2>
                <p className="text-sm font-medium text-orange-600">{app.role} · {app.exp}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Mail size={12}/> {app.email}</span>
                  <span className="flex items-center gap-1"><Phone size={12}/> {app.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <FileText size={14}/> Resume
              </button>
              <button onClick={() => updateStatus(app.id, "Shortlisted")}
                className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600">
                <CheckCircle size={14}/> Shortlist
              </button>
              <button onClick={() => updateStatus(app.id, "Rejected")}
                className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100">
                <XCircle size={14}/> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Applicants;