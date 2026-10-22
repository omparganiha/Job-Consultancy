import { useState } from "react";
import { Calendar, Clock, Video, Users, PlusCircle, X } from "lucide-react";

function ProviderInterviews() {
  const [showForm, setShowForm] = useState(false);
  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "Rahul Sharma", role: "Frontend Dev", date: "25 Oct 2023", time: "11:00 AM", type: "Video" },
    { id: 2, candidate: "Priya Verma", role: "UI Designer", date: "27 Oct 2023", time: "03:00 PM", type: "In-Person" },
  ]);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Interview <span className="text-orange-500">Schedule</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">Manage all scheduled candidate interviews.</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">
          <PlusCircle size={18}/> Schedule New
        </button>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {interviews.map(iv => (
          <div key={iv.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                  <Users size={22}/>
                </div>
                <div>
                  <h3 className="font-bold">{iv.candidate}</h3>
                  <p className="text-xs text-slate-500">{iv.role}</p>
                </div>
              </div>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 border border-blue-100">
                Scheduled
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-xs"><Calendar size={14} className="text-orange-500"/> {iv.date}</div>
              <div className="flex items-center gap-2 text-xs"><Clock size={14} className="text-orange-500"/> {iv.time}</div>
              <div className="col-span-2 flex items-center gap-2 text-xs"><Video size={14} className="text-orange-500"/> {iv.type} Interview</div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-orange-500 py-2 text-xs font-bold text-white hover:bg-orange-600">Join</button>
              <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Reschedule</button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Schedule Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Schedule Interview</h2>
              <button onClick={() => setShowForm(false)}><X size={20}/></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Candidate Name" className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400"/>
              <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400"/>
              <input type="time" className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400"/>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400">
                <option>Video</option><option>In-Person</option><option>Phone</option>
              </select>
              <button onClick={() => setShowForm(false)} className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600">
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProviderInterviews;