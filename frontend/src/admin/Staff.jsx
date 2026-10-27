import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus, Search, LayoutGrid, List, Eye, Edit, Trash2, X
} from "lucide-react";

// Import your newly updated AddStaff component
import AddStaff from "./Addstaff";

const Staff = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  
  // States for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState(null);
  
  const [viewMode, setViewMode] = useState("table"); 
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStaff = () => {
    const savedData = localStorage.getItem("staffList");
    const saved = savedData ? JSON.parse(savedData) : [];
    
    const mapped = saved.map((s) => ({
      ...s,
      id: s.id || Math.random(),
      name: s.fullName || s.name || "Unknown",
      designation: s.designation || s.role || "Staff",
      employeeId: s.employeeId || "N/A",
      email: s.email || "",
      phone: s.phone || "",
      status: s.status || "Active",
      joinDate: s.joinDate || new Date().toISOString().slice(0, 10),
      salary: s.salary || "N/A",
      address: s.address || "N/A",
      notes: s.notes || "N/A",
      avatar: s.avatar || null,
    }));
    setStaffList(mapped);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const saveToStorage = (newList) => {
    setStaffList(newList);
    localStorage.setItem("staffList", JSON.stringify(newList));
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "?";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      const updatedList = staffList.filter((s) => s.id !== id);
      saveToStorage(updatedList);
    }
  };

  // Open the AddStaff modal as Edit Form
  const handleEditClick = (staff) => {
    setStaffToEdit(staff);
    setIsEditModalOpen(true);
  };

  const filteredStaff = staffList.filter((s) => {
    const sName = (s.name || s.fullName || "").toLowerCase();
    const sEmail = (s.email || "").toLowerCase();
    const sId = (s.employeeId || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return sName.includes(query) || sEmail.includes(query) || sId.includes(query);
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── HEADER & CONTROLS ─── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md flex items-center gap-2 text-sm font-semibold transition-all ${viewMode === "grid" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}><LayoutGrid size={16} /> Grid</button>
            <button onClick={() => setViewMode("table")} className={`p-2 rounded-md flex items-center gap-2 text-sm font-semibold transition-all ${viewMode === "table" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}><List size={16} /> Table</button>
          </div>
          <div className="flex-1 w-full max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search by name, email or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"/>
          </div>
          <button onClick={() => navigate("/dashboard/add-staff")} className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-orange-600 transition-all cursor-pointer whitespace-nowrap w-full lg:w-auto justify-center">
            <UserPlus size={18} /> Add New Staff
          </button>
        </div>

        {/* ─── GRID VIEW ─── */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStaff.map((staff) => (
              <div key={staff.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all p-5 flex flex-col items-center text-center relative">
                <span className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${staff.status === "Active" ? "bg-emerald-100 text-emerald-700" : staff.status === "On Leave" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>{staff.status}</span>
                <div className="w-20 h-20 rounded-full border-2 border-orange-100 bg-orange-50 text-orange-600 flex items-center justify-center text-xl font-bold mb-3 overflow-hidden">
                  {staff.avatar ? <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" /> : getInitials(staff.name)}
                </div>
                <h3 className="font-bold text-slate-900 truncate w-full" title={staff.name}>{staff.name}</h3>
                <p className="text-xs font-semibold text-orange-600 mb-1 truncate w-full" title={staff.designation}>{staff.designation}</p>
                <p className="text-xs text-slate-500 mb-4">{staff.employeeId}</p>
                <div className="flex items-center justify-center gap-2 w-full mt-auto pt-4 border-t border-slate-100">
                  <button onClick={() => setSelectedStaff(staff)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details"><Eye size={18} /></button>
                  {/* EDIT MODAL TRIGGER */}
                  <button onClick={() => handleEditClick(staff)} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Staff"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(staff.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TABLE VIEW ─── */}
        {viewMode === "table" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="p-4 w-12 text-center">S.No</th>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Emp ID</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map((staff, index) => (
                    <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-center text-sm font-semibold text-slate-500">{index + 1}</td>
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
                          {staff.avatar ? <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" /> : getInitials(staff.name)}
                        </div>
                        <div className="max-w-[150px]">
                          <p className="font-bold text-slate-800 text-sm truncate" title={staff.name}>{staff.name}</p>
                          <p className="text-xs text-slate-500 truncate" title={staff.designation}>{staff.designation}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-sm text-slate-700">{staff.employeeId}</p>
                      </td>
                      <td className="p-4 max-w-[160px]">
                        <p className="text-sm text-slate-700 truncate" title={staff.email}>{staff.email}</p>
                        <p className="text-xs text-slate-500 truncate" title={staff.phone}>{staff.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${staff.status === "Active" ? "bg-emerald-100 text-emerald-700" : staff.status === "On Leave" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setSelectedStaff(staff)} className="p-1.5 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded shadow-sm" title="View"><Eye size={16} /></button>
                          {/* EDIT MODAL TRIGGER */}
                          <button onClick={() => handleEditClick(staff)} className="p-1.5 text-slate-400 hover:text-orange-600 bg-white border border-slate-200 rounded shadow-sm" title="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(staff.id)} className="p-1.5 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded shadow-sm" title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ─── ADD STAFF MODAL (FOR EDITING) ─── */}
      {isEditModalOpen && (
        <AddStaff 
          isModal={true} 
          editDataProp={staffToEdit} 
          onClose={() => setIsEditModalOpen(false)} 
          onSuccess={fetchStaff} // List refresh hogi form submit ke baad
        />
      )}

      {/* FULL PROFILE MODAL KEEPS UNCHANGED */}
      {selectedStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white p-8 rounded-3xl w-full max-w-md relative shadow-2xl">
             <button onClick={() => setSelectedStaff(null)} className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-colors"><X size={20}/></button>
             <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl font-black overflow-hidden shadow-sm mb-4">
                  {selectedStaff.avatar ? <img src={selectedStaff.avatar} alt="Avatar" className="w-full h-full object-cover"/> : getInitials(selectedStaff.name)}
                </div>
                <h2 className="text-2xl font-black text-slate-900">{selectedStaff.name}</h2>
                <p className="text-orange-600 font-bold mb-4">{selectedStaff.designation}</p>
             </div>
             <div className="space-y-3 mt-6 border-t border-slate-100 pt-6">
               <p className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Emp ID:</span> <span className="font-bold text-slate-800">{selectedStaff.employeeId}</span></p>
               <p className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Email:</span> <span className="font-bold text-slate-800">{selectedStaff.email}</span></p>
               <p className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Phone:</span> <span className="font-bold text-slate-800">{selectedStaff.phone}</span></p>
               <p className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Join Date:</span> <span className="font-bold text-slate-800">{selectedStaff.joinDate}</span></p>
               <p className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Salary:</span> <span className="font-bold text-slate-800">₹{selectedStaff.salary}</span></p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Staff;