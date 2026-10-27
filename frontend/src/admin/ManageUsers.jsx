import { useState } from "react";
import { Users, Mail, Ban, CheckCircle, Trash2, Search } from "lucide-react";

function ManageUsers() {
  const [tab, setTab] = useState("Seekers");
  const [users] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", type: "Seekers", status: "Active", joined: "12 Oct 2023", feePaid: true },
    { id: 2, name: "Priya Verma", email: "priya@mail.com", type: "Seekers", status: "Active", joined: "10 Oct 2023", feePaid: false },
    { id: 3, name: "TechCorp Ltd", email: "hr@techcorp.com", type: "Providers", status: "Active", joined: "05 Oct 2023", feePaid: true },
    { id: 4, name: "Amit Kumar", email: "amit@mail.com", type: "Seekers", status: "Blocked", joined: "01 Oct 2023", feePaid: false },
  ]);

  const filtered = users.filter(u => u.type === tab);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Manage <span className="text-orange-500">Users</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">View and manage all registered users on the platform.</p>
      </header> */}

      <div className="mb-6 flex gap-6 border-b border-slate-200">
        {["Seekers", "Providers"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 text-sm font-semibold border-b-2 transition
              ${tab === t ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500"}`}>
            {t} ({users.filter(u => u.type === t).length})
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr className="text-left text-slate-600">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Joined</th>
                <th className="p-4 font-semibold">Fee Status</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{u.joined}</td>
                  <td className="p-4">
                    {u.feePaid ? (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">Paid</span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 border border-amber-100">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                      u.status === "Active" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-red-50 text-red-700 border-red-100"
                    }`}>{u.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Block"><Ban size={16}/></button>
                      <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" title="Delete"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default ManageUsers;