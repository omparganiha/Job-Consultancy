import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus, Mail, Phone, Calendar, MapPin, 
  Briefcase, Shield, DollarSign, AlignLeft, X,
  GraduationCap
} from "lucide-react";

const initialStaff = [
  {
    id: 1,
    name: "Aman Sharma",
    designation: "Senior HR Manager",
    department: "Human Resources",
    sysRole: "Admin",
    employeeId: "EMP-1001",
    email: "aman.sharma@company.com",
    phone: "+91 98765 43210",
    emergencyContact: "+91 91234 56789",
    location: "Delhi HQ",
    joinDate: "2021-03-15",
    status: "Active",
    salary: "125000",
    address: "Block A, Connaught Place, New Delhi",
    notes: "Top performing HR in the northern region.",
    avatar: null,
  },
  {
    id: 2,
    name: "Priya Singh",
    designation: "Software Engineer",
    department: "IT & Tech",
    sysRole: "Staff",
    employeeId: "EMP-1002",
    email: "priya.s@company.com",
    phone: "+91 87654 32109",
    emergencyContact: "N/A",
    location: "Remote",
    joinDate: "2022-08-10",
    status: "Active",
    salary: "95000",
    address: "Koramangala, Bangalore",
    notes: "Works on the main ERP dashboard project.",
    avatar: null,
  },
];

const Staff = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("staffList") || "[]");

    if (saved.length > 0) {
      const mapped = saved.map((s) => ({
        id: s.id,
        name: s.fullName || s.name || "Unknown",
        designation: s.designation || s.role || "Staff",
        department: s.department || "General",
        sysRole: s.role || "Staff",
        employeeId: s.employeeId || "N/A",
        email: s.email || "",
        phone: s.phone || "",
        emergencyContact: s.emergencyContact || "N/A",
        location: s.location || "N/A",
        joinDate: s.joinDate || new Date().toISOString().slice(0, 10),
        status: s.status || "Active",
        salary: s.salary || "N/A",
        address: s.address || "N/A",
        notes: s.notes || "N/A",
        avatar: s.avatar || null,
      }));

      const merged = [...mapped, ...initialStaff].filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );
      setStaffList(merged);
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── HEADER SECTION ─── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Staff Management
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Manage your team members and their complete details ({staffList.length} Total)
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/add-staff")}
            className="flex items-center gap-2 bg-[#F97316] text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
          >
            <UserPlus size={18} /> Add New Staff
          </button>
        </div>

        {/* ─── NEW ID CARD STYLE GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-[1.5rem] shadow-lg border border-slate-200 overflow-hidden relative flex flex-col hover:shadow-2xl transition-all duration-300 group"
            >
              {/* --- Top SVG Waves Background --- */}
              <div className="absolute top-0 left-0 w-full h-[130px] z-0">
                <svg viewBox="0 0 1440 320" className="w-full h-full object-cover" preserveAspectRatio="none">
                  <path fill="#334155" d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,213.3C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                  <path fill="#F97316" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-2 py-1 rounded bg-white/90 backdrop-blur text-[9px] font-black uppercase shadow-sm tracking-wider
                  ${staff.status === "Active" ? "text-emerald-600" : staff.status === "On Leave" ? "text-amber-600" : "text-rose-600"}
                `}>
                  {staff.status}
                </span>
              </div>

              {/* Logo / Company Mark (Top Right) */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-white">
                <div className="text-right">
                  <p className="text-[9px] font-bold leading-none tracking-widest uppercase">Company</p>
                  <p className="text-[13px] font-black leading-none tracking-widest uppercase">LOGO</p>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <GraduationCap size={16} />
                </div>
              </div>

              {/* Avatar Section */}
              <div className="relative z-10 w-[100px] h-[100px] mx-auto mt-[75px] rounded-full ring-[5px] ring-[#F97316] border-4 border-white bg-slate-800 shadow-md flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                {staff.avatar ? (
                  <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-white tracking-tighter">
                    {getInitials(staff.name)}
                  </span>
                )}
              </div>

              {/* Name & Designation */}
              <div className="text-center mt-4 px-4 relative z-10">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest leading-tight w-full truncate">
                  {staff.name}
                </h3>
                <p className="text-[11px] font-extrabold text-[#F97316] uppercase tracking-widest mt-0.5 w-full truncate">
                  {staff.designation}
                </p>
              </div>

              {/* Details Table */}
              <div className="px-5 w-full mt-6 mb-6">
                <div className="border-t-2 border-slate-100">
                  
                  {/* Row 1 */}
                  <div className="flex border-b border-slate-100 items-center">
                    <div className="w-[45%] py-2 pr-3 border-r-2 border-[#F97316] text-right text-[11px] font-black text-slate-800 uppercase tracking-wider">
                      Emp ID #:
                    </div>
                    <div className="w-[55%] py-2 pl-3 text-left text-xs font-semibold text-slate-600 truncate">
                      {staff.employeeId}
                    </div>
                  </div>
                  
                  {/* Row 2 */}
                  <div className="flex border-b border-slate-100 items-center">
                    <div className="w-[45%] py-2 pr-3 border-r-2 border-[#F97316] text-right text-[11px] font-black text-slate-800 uppercase tracking-wider">
                      Department:
                    </div>
                    <div className="w-[55%] py-2 pl-3 text-left text-xs font-semibold text-slate-600 truncate">
                      {staff.department}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex border-b border-slate-100 items-center">
                    <div className="w-[45%] py-2 pr-3 border-r-2 border-[#F97316] text-right text-[11px] font-black text-slate-800 uppercase tracking-wider">
                      Phone No:
                    </div>
                    <div className="w-[55%] py-2 pl-3 text-left text-xs font-semibold text-slate-600 truncate">
                      {staff.phone || "N/A"}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setSelectedStaff(staff)}
                className="mt-auto w-full py-3.5 bg-slate-50 text-orange-600 border-t border-slate-200 font-extrabold text-[11px] uppercase tracking-[0.2em] hover:bg-[#F97316] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                View Full Profile
              </button>
            </div>
          ))}
        </div>

        {staffList.length === 0 && (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-3xl">
            <UserPlus size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 mb-4 font-medium">No staff members found.</p>
            <button
              onClick={() => navigate("/dashboard/add-staff")}
              className="text-orange-500 font-bold hover:underline"
            >
              Add your first staff member
            </button>
          </div>
        )}
      </div>

      {/* ─── FULL PROFILE MODAL (Unchanged) ─── */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 flex justify-between items-start">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-orange-600 font-black text-2xl shadow-lg overflow-hidden border-2 border-white">
                  {selectedStaff.avatar ? (
                    <img src={selectedStaff.avatar} alt={selectedStaff.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(selectedStaff.name)
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{selectedStaff.name}</h2>
                  <p className="text-slate-300 font-medium">{selectedStaff.designation} • {selectedStaff.department}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStaff(null)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-orange-500" /> Employment
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center"><Shield size={18} className="text-slate-400"/></div>
                    <div><p className="text-xs text-slate-400 font-semibold">Employee ID</p><p className="font-bold text-slate-700">{selectedStaff.employeeId}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center"><Calendar size={18} className="text-slate-400"/></div>
                    <div><p className="text-xs text-slate-400 font-semibold">Joining Date</p><p className="font-bold text-slate-700">{selectedStaff.joinDate}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center"><DollarSign size={18} className="text-slate-400"/></div>
                    <div><p className="text-xs text-slate-400 font-semibold">Salary</p><p className="font-bold text-slate-700">{selectedStaff.salary !== "N/A" ? `₹${selectedStaff.salary}` : "Not Disclosed"}</p></div>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" /> Contact Info
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center"><Mail size={18} className="text-slate-400"/></div>
                    <div><p className="text-xs text-slate-400 font-semibold">Email Address</p><p className="font-bold text-slate-700">{selectedStaff.email}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center"><Phone size={18} className="text-slate-400"/></div>
                    <div><p className="text-xs text-slate-400 font-semibold">Phone Number</p><p className="font-bold text-slate-700">{selectedStaff.phone}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0"><MapPin size={18} className="text-slate-400"/></div>
                    <div><p className="text-xs text-slate-400 font-semibold">Full Address</p><p className="font-bold text-slate-700 leading-tight">{selectedStaff.address}</p></div>
                  </div>
                </div>
              </div>

              {selectedStaff.notes && selectedStaff.notes !== "N/A" && (
                <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-5">
                  <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <AlignLeft size={14} /> Additional Notes
                  </h3>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    {selectedStaff.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Staff;