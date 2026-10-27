// import { useState, useEffect } from "react"; // ✅ Added useEffect
// import { Tags, Plus, Trash2 } from "lucide-react";

// function Categories() {
//   // ✅ Initialize from localStorage (fallback to default categories if empty)
//   const [categories, setCategories] = useState(() => {
//     const saved = localStorage.getItem("jobCategories");
//     return saved ? JSON.parse(saved) : ["IT & Software", "Finance", "Marketing", "Healthcare", "Education", "Design"];
//   });
  
//   const [newCat, setNewCat] = useState("");

//   // ✅ Save to localStorage whenever categories change
//   useEffect(() => {
//     localStorage.setItem("jobCategories", JSON.stringify(categories));
//   }, [categories]);

//     const add = () => {
//     if (!newCat.trim()) return;
    
//     // Capitalize the first letter of each word
//     const formattedCat = newCat
//       .trim()
//       .replace(/\b\w/g, (char) => char.toUpperCase());

//     // Prevent duplicates
//     if (categories.includes(formattedCat)) return; 
    
//     setCategories([...categories, formattedCat]);
//     setNewCat("");
//   };

//   const remove = (cat) => setCategories(categories.filter(c => c !== cat));

//   return (
//     <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">

//       <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="flex gap-3">
//           <input 
//             value={newCat} 
//             onChange={e => setNewCat(e.target.value)}
//             placeholder="Enter new category name..."
//             className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
//             onKeyDown={(e) => e.key === "Enter" && add()} // ✅ Added Enter key support
//           />
//           <button onClick={add} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
//             <Plus size={16}/> Add
//           </button>
//         </div>
//       </div>

//       <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//         {categories.length === 0 ? (
//           <div className="col-span-full py-10 text-center text-slate-500">
//             No categories found. Add one above!
//           </div>
//         ) : (
//           categories.map(c => (
//             <div key={c} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
//                   <Tags size={16}/>
//                 </div>
//                 <span className="font-semibold">{c}</span>
//               </div>
//               <button onClick={() => remove(c)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
//                 <Trash2 size={15}/>
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </main>
//   );
// }

// export default Categories;

import { useState, useEffect, useRef } from "react";
import {
  Tags, Plus, Trash2, MonitorPlay, Calculator, Megaphone,
  HeartPulse, BookOpen, Palette, Code, Briefcase, Building2,
  Truck, Shield, Cpu, Globe, Music, Camera, Utensils, Home,
  Wrench, ShoppingBag, Layers, Sparkles, Scale, GraduationCap,
  Stethoscope, Car, Plane, Wifi, Database, Users, Landmark,
  ChevronDown, Check,
} from "lucide-react";

// ── Available icons for dropdown (name = lucide export name) ──
const ICON_OPTIONS = [
  { name: "MonitorPlay", Icon: MonitorPlay, label: "IT / Software" },
  { name: "Calculator", Icon: Calculator, label: "Finance" },
  { name: "Megaphone", Icon: Megaphone, label: "Marketing" },
  { name: "HeartPulse", Icon: HeartPulse, label: "Healthcare" },
  { name: "Stethoscope", Icon: Stethoscope, label: "Medical" },
  { name: "BookOpen", Icon: BookOpen, label: "Education" },
  { name: "GraduationCap", Icon: GraduationCap, label: "College" },
  { name: "Palette", Icon: Palette, label: "Design" },
  { name: "Code", Icon: Code, label: "Development" },
  { name: "Briefcase", Icon: Briefcase, label: "HR / Jobs" },
  { name: "Building2", Icon: Building2, label: "Corporate" },
  { name: "Users", Icon: Users, label: "Team / HR" },
  { name: "Truck", Icon: Truck, label: "Logistics" },
  { name: "Car", Icon: Car, label: "Automobile" },
  { name: "Plane", Icon: Plane, label: "Travel" },
  { name: "Shield", Icon: Shield, label: "Security" },
  { name: "Cpu", Icon: Cpu, label: "AI / Data" },
  { name: "Database", Icon: Database, label: "Database" },
  { name: "Wifi", Icon: Wifi, label: "Network" },
  { name: "Globe", Icon: Globe, label: "Global" },
  { name: "Music", Icon: Music, label: "Music" },
  { name: "Camera", Icon: Camera, label: "Media" },
  { name: "Utensils", Icon: Utensils, label: "Food" },
  { name: "Home", Icon: Home, label: "Real Estate" },
  { name: "Wrench", Icon: Wrench, label: "Engineering" },
  { name: "ShoppingBag", Icon: ShoppingBag, label: "Retail" },
  { name: "Landmark", Icon: Landmark, label: "Government" },
  { name: "Scale", Icon: Scale, label: "Legal" },
  { name: "Layers", Icon: Layers, label: "General" },
  { name: "Sparkles", Icon: Sparkles, label: "Other" },
  { name: "Tags", Icon: Tags, label: "Default" },
];

// name se Icon component nikalne ke liye map
const ICON_MAP = Object.fromEntries(ICON_OPTIONS.map((o) => [o.name, o.Icon]));

// purane string data ko object me convert
function normalizeCategories(list) {
  if (!Array.isArray(list)) return [];
  return list.map((item, i) => {
    if (typeof item === "string") {
      return { id: `cat_${i}_${item}`, name: item, icon: "Tags" };
    }
    return {
      id: item.id || `cat_${i}`,
      name: item.name || "Category",
      icon: item.icon && ICON_MAP[item.icon] ? item.icon : "Tags",
    };
  });
}

function Categories() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("jobCategories");
    const parsed = saved ? JSON.parse(saved) : [
      { id: "1", name: "IT & Software", icon: "MonitorPlay" },
      { id: "2", name: "Finance", icon: "Calculator" },
      { id: "3", name: "Marketing", icon: "Megaphone" },
      { id: "4", name: "Healthcare", icon: "HeartPulse" },
      { id: "5", name: "Education", icon: "BookOpen" },
      { id: "6", name: "Design", icon: "Palette" },
    ];
    return normalizeCategories(parsed);
  });

  const [newCat, setNewCat] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Tags");
  const [iconOpen, setIconOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("jobCategories", JSON.stringify(categories));
  }, [categories]);

  // outside click → close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIconOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const add = () => {
    if (!newCat.trim()) return;
    const formatted = newCat.trim().replace(/\b\w/g, (c) => c.toUpperCase());
    if (categories.some((c) => c.name.toLowerCase() === formatted.toLowerCase())) return;

    setCategories([
      ...categories,
      { id: `cat_${Date.now()}`, name: formatted, icon: selectedIcon },
    ]);
    setNewCat("");
    setSelectedIcon("Tags");
    setIconOpen(false);
  };

  const remove = (id) => setCategories(categories.filter((c) => c.id !== id));

  const SelectedIconCmp = ICON_MAP[selectedIcon] || Tags;

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Add box */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Icon Picker Dropdown */}
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setIconOpen((v) => !v)}
              className="flex h-[46px] w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 hover:border-orange-300 sm:w-[160px]"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <SelectedIconCmp size={16} />
                </span>
                Icon
              </span>
              <ChevronDown size={16} className={`text-slate-400 transition ${iconOpen ? "rotate-180" : ""}`} />
            </button>

            {iconOpen && (
              <div className="absolute left-0 z-30 mt-2 max-h-64 w-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:w-80">
                <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Icon
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {ICON_OPTIONS.map(({ name, Icon, label }) => {
                    const active = selectedIcon === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        title={label}
                        onClick={() => {
                          setSelectedIcon(name);
                          setIconOpen(false);
                        }}
                        className={`flex flex-col items-center gap-1 rounded-xl border p-2 transition ${
                          active
                            ? "border-orange-400 bg-orange-50 text-orange-600"
                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-orange-200 hover:bg-orange-50/50"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="w-full truncate text-center text-[9px] font-semibold">
                          {label}
                        </span>
                        {active && <Check size={10} className="text-orange-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Name input */}
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Enter category name... (e.g. Healthcare)"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            onKeyDown={(e) => e.key === "Enter" && add()}
          />

          <button
            type="button"
            onClick={add}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="col-span-full py-10 text-center text-slate-500">
            No categories found. Add one above!
          </div>
        ) : (
          categories.map((c) => {
            const IconCmp = ICON_MAP[c.icon] || Tags;
            return (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <IconCmp size={18} />
                  </div>
                  <span className="font-semibold">{c.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default Categories;