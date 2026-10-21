import { useState } from "react";
import { MessageSquare, User, Clock, CheckCircle } from "lucide-react";

function Support() {
  const [tickets, setTickets] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", subject: "Unable to upload resume", message: "Getting error while uploading PDF.", status: "Open", time: "2 hours ago" },
    { id: 2, name: "TechCorp", email: "hr@techcorp.com", subject: "Payment issue", message: "Please verify my last payment transaction.", status: "In Progress", time: "1 day ago" },
    { id: 3, name: "Priya", email: "priya@mail.com", subject: "Account verification", message: "My account is not verified yet.", status: "Resolved", time: "3 days ago" },
  ]);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Support <span className="text-orange-500">Tickets</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Help users by resolving their issues quickly.</p>
      </header>

      <div className="grid gap-4">
        {tickets.map(t => (
          <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{t.subject}</h3>
                  <p className="text-xs text-slate-500">by {t.name} · {t.email}</p>
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                t.status === "Open" ? "bg-red-50 text-red-700 border-red-100" :
                t.status === "In Progress" ? "bg-amber-50 text-amber-700 border-amber-100" :
                "bg-emerald-50 text-emerald-700 border-emerald-100"
              }`}>{t.status}</span>
            </div>
            
            <p className="mt-3 text-sm text-slate-600">{t.message}</p>
            
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={12}/> {t.time}</span>
              <div className="flex gap-2">
                <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-600">Reply</button>
                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50">Mark Resolved</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Support;