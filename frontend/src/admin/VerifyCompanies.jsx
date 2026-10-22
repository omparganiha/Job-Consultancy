import { useState } from "react";
import { ShieldCheck, Building2, CheckCircle, XCircle, FileText } from "lucide-react";

function VerifyCompanies() {
  const [companies, setCompanies] = useState([
    { id: 1, name: "TechCorp Solutions", industry: "IT", gst: "29ABCDE1234F1Z5", email: "hr@techcorp.com", status: "Pending" },
    { id: 2, name: "InnovateX", industry: "Marketing", gst: "27PQRST5678G2H9", email: "hire@innovatex.com", status: "Pending" },
    { id: 3, name: "DesignHub", industry: "Design", gst: "19XYZAB9876K3L1", email: "jobs@designhub.com", status: "Pending" },
  ]);

  const handleAction = (id, status) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    // Yahan API call hogi: update company status in backend
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Verify <span className="text-orange-500">Companies</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Review company credentials before approving them.</p>
      </header>

      <div className="grid gap-5">
        {companies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <ShieldCheck size={40} className="mx-auto mb-3 text-emerald-400"/>
            <h3 className="text-lg font-bold">All companies verified!</h3>
          </div>
        ) : (
          companies.map(c => (
            <div key={c.id} className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 border border-orange-100">
                  <Building2 size={24} className="text-orange-500"/>
                </div>
                <div>
                  <h2 className="text-lg font-bold">{c.name}</h2>
                  <p className="text-sm text-orange-600">{c.industry}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span>📧 {c.email}</span>
                    <span>GST: <strong className="text-slate-700">{c.gst}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">
                  <FileText size={14}/> Documents
                </button>
                <button onClick={() => handleAction(c.id, "Verified")}
                  className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-600">
                  <CheckCircle size={14}/> Verify
                </button>
                <button onClick={() => handleAction(c.id, "Rejected")}
                  className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100">
                  <XCircle size={14}/> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default VerifyCompanies;