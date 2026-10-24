import { useState, useEffect } from "react"; // ✅ Added useEffect
import { Tags, Plus, Trash2 } from "lucide-react";

function Categories() {
  // ✅ Initialize from localStorage (fallback to default categories if empty)
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("jobCategories");
    return saved ? JSON.parse(saved) : ["IT & Software", "Finance", "Marketing", "Healthcare", "Education", "Design"];
  });
  
  const [newCat, setNewCat] = useState("");

  // ✅ Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("jobCategories", JSON.stringify(categories));
  }, [categories]);

    const add = () => {
    if (!newCat.trim()) return;
    
    // Capitalize the first letter of each word
    const formattedCat = newCat
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Prevent duplicates
    if (categories.includes(formattedCat)) return; 
    
    setCategories([...categories, formattedCat]);
    setNewCat("");
  };

  const remove = (cat) => setCategories(categories.filter(c => c !== cat));

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Job <span className="text-orange-500">Categories</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">Manage categories that providers use when posting jobs.</p>
      </header>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-3">
          <input 
            value={newCat} 
            onChange={e => setNewCat(e.target.value)}
            placeholder="Enter new category name..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            onKeyDown={(e) => e.key === "Enter" && add()} // ✅ Added Enter key support
          />
          <button onClick={add} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            <Plus size={16}/> Add
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="col-span-full py-10 text-center text-slate-500">
            No categories found. Add one above!
          </div>
        ) : (
          categories.map(c => (
            <div key={c} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <Tags size={16}/>
                </div>
                <span className="font-semibold">{c}</span>
              </div>
              <button onClick={() => remove(c)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={15}/>
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Categories;