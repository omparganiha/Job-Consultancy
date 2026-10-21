import { useState } from "react";
import { SearchCode, MapPin, Briefcase, Mail, FileText, Search, Filter } from "lucide-react";

function TalentPool() {
  const [search, setSearch] = useState("");
  const candidates = [
    { id: 1, name: "Rahul Sharma", title: "Senior Frontend Developer", exp: "5 years", location: "Bangalore", skills: "React, TypeScript, Node" },
    { id: 2, name: "Priya Verma", title: "UI/UX Designer", exp: "4 years", location: "Mumbai", skills: "Figma, Adobe XD, Sketch" },
    { id: 3, name: "Amit Kumar", title: "Backend Engineer", exp: "6 years", location: "Pune", skills: "Python, Django, PostgreSQL" },
    { id: 4, name: "Sneha Patel", title: "Fullstack Developer", exp: "3 years", location: "Delhi", skills: "React, Node.js, MongoDB" },
  ];

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Search <span className="text-orange-500">Candidates</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Find the perfect candidate from our talent pool.</p>
        
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, role, or skills..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold hover:bg-slate-50">
            <Filter size={18}/> Filters
          </button>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c => (
          <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-orange-200 transition">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500 text-xl font-bold">
                {c.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-xs text-slate-500">{c.title}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2"><Briefcase size={13} className="text-orange-500"/> {c.exp} experience</div>
              <div className="flex items-center gap-2"><MapPin size={13} className="text-orange-500"/> {c.location}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {c.skills.split(",").map(s => (
                <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">{s.trim()}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-orange-500 py-2 text-xs font-bold text-white hover:bg-orange-600">View Profile</button>
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-slate-500 hover:bg-slate-50"><Mail size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default TalentPool;