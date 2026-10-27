import { useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";

function Locations() {
  const [locations, setLocations] = useState(["Bangalore", "Mumbai", "Delhi NCR", "Pune", "Hyderabad", "Chennai", "Remote"]);
  const [newLoc, setNewLoc] = useState("");

  const add = () => {
    if (!newLoc.trim()) return;
    setLocations([...locations, newLoc.trim()]);
    setNewLoc("");
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-3">
          <input value={newLoc} onChange={e => setNewLoc(e.target.value)}
            placeholder="Enter city or location..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/>
          <button onClick={add} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            <Plus size={16}/> Add
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map(l => (
          <div key={l} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <MapPin size={16}/>
              </div>
              <span className="font-semibold">{l}</span>
            </div>
            <button onClick={() => setLocations(locations.filter(x => x !== l))}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <Trash2 size={15}/>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Locations;