import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserPlus, User, Mail, Phone, Briefcase, 
  MapPin, Calendar, Shield, Save, Upload, 
  CheckCircle2, ArrowLeft, Camera, IndianRupee, FileText, Lock
} from "lucide-react";
import { toast } from "react-toastify"; // Added toast

const AddStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.staffData || null; // Check if coming from Edit

  const availablePages = [
    "Manage Users", "Pending Approvals", "All Jobs", 
    "Categories", "Locations", "Support", "Review"
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    employeeId: "",
    joinDate: "",
    location: "",
    role: "Staff",
    status: "Active",
    address: "",
    emergencyContact: "",
    salary: "",
    notes: "",
    permissions: [],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const roles = ["Staff", "Manager", "Team Lead", "Admin", "Intern"];
  const statuses = ["Active", "Inactive", "On Leave", "Probation"];

  // Populate data if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        fullName: editData.fullName || editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        designation: editData.designation || "",
        employeeId: editData.employeeId || "",
        joinDate: editData.joinDate || "",
        location: editData.location || "",
        role: editData.sysRole || editData.role || "Staff",
        status: editData.status || "Active",
        address: editData.address || "",
        emergencyContact: editData.emergencyContact || "",
        salary: editData.salary || "",
        notes: editData.notes || "",
        permissions: editData.permissions || [],
      });
      if (editData.avatar) setAvatarPreview(editData.avatar);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePermissionChange = (page) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.includes(page);
      if (isSelected) {
        return { ...prev, permissions: prev.permissions.filter((p) => p !== page) };
      } else {
        return { ...prev, permissions: [...prev.permissions, page] };
      }
    });
  };

  const toggleAllPermissions = () => {
    if (formData.permissions.length === availablePages.length) {
      setFormData((prev) => ({ ...prev, permissions: [] }));
    } else {
      setFormData((prev) => ({ ...prev, permissions: [...availablePages] }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.designation.trim()) newErrors.designation = "Required";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Required";
    if (!formData.joinDate) newErrors.joinDate = "Required";

    setErrors(newErrors);
    
    // Toast notification if validation fails
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all the required fields correctly!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const existingList = JSON.parse(localStorage.getItem("staffList") || "[]");

    if (editData) {
      // Update existing record
      const updatedList = existingList.map((staff) => 
        staff.id === editData.id ? { ...staff, ...formData, avatar: avatarPreview, name: formData.fullName } : staff
      );
      localStorage.setItem("staffList", JSON.stringify(updatedList));
      toast.success("Staff details updated successfully!");
    } else {
      // Create new record
      const newStaff = {
        id: Date.now(),
        ...formData,
        name: formData.fullName, 
        avatar: avatarPreview,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("staffList", JSON.stringify([...existingList, newStaff]));
      toast.success("New staff added successfully!");
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate("/dashboard/staff");
    }, 1500);
  };

  const getInitials = (name) => {
    if (!name.trim()) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">
          {editData ? "Staff Updated" : "Staff Member Added"}
        </h2>
        <p className="text-slate-500 mt-1 text-sm font-medium">Redirecting to staff directory...</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300">
      <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-200/80">
        <button
          type="button"
          onClick={() => navigate("/dashboard/staff")}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-orange-300 text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-400 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
            {editData ? <Edit size={20} /> : <UserPlus size={20} />}
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {editData ? "Edit" : "Add New"} <span className="text-orange-500">Staff</span>
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* PERSONAL INFO */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Personal Information
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">* Required fields</span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-200/80 flex items-center justify-center text-slate-500 font-extrabold text-xl overflow-hidden shadow-inner">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    getInitials(formData.fullName) || <Camera size={26} className="text-slate-400" />
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-orange-500 text-white shadow-md flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-transform active:scale-90">
                  <Upload size={14} />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 outline-none transition-all ${errors.fullName ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errors.fullName && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@company.com" className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 outline-none transition-all ${errors.email ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 outline-none transition-all ${errors.phone ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errors.phone && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Emergency Contact</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="+91 91234 56789" className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Address</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Residential address" className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EMPLOYMENT DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800"></span> Employment Details
            </h2>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Employee ID <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="e.g. EMP-1001" className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 outline-none transition-all ${errors.employeeId ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errors.employeeId && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.employeeId}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Designation <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Software Engineer" className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 outline-none transition-all ${errors.designation ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errors.designation && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.designation}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">System Role</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none">
                    {roles.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Joining Date <span className="text-orange-500">*</span></label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-sm font-medium focus:bg-white focus:ring-2 outline-none transition-all ${errors.joinDate ? "border-red-400 focus:ring-red-500/20 bg-red-50/20" : "border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"}`} />
                </div>
                {errors.joinDate && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.joinDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Mumbai HQ / Remote" className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Employment Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none">
                  {statuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Salary (Monthly)</label>
                <div className="relative">
                  <IndianRupee size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. 75000" className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Additional Notes</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} placeholder="Any extra details..." className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-orange-300 rounded-xl text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Page Access Permissions
            </h2>
            <button type="button" onClick={toggleAllPermissions} className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors">
              {formData.permissions.length === availablePages.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availablePages.map((page) => (
                <label key={page} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${formData.permissions.includes(page) ? "border-orange-500 bg-orange-50/50" : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"}`}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${formData.permissions.includes(page) ? "bg-orange-500 border-orange-500" : "bg-white border-slate-300"}`}>
                    {formData.permissions.includes(page) && <CheckCircle2 size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <input type="checkbox" className="hidden" checked={formData.permissions.includes(page)} onChange={() => handlePermissionChange(page)} />
                  <span className={`text-sm font-bold ${formData.permissions.includes(page) ? "text-orange-700" : "text-slate-600"}`}>{page}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => navigate("/dashboard/staff")} className="px-6 py-2.5 rounded-xl border border-orange-300 bg-white text-slate-600 text-sm font-bold hover:bg-orange-50 transition-all active:scale-95">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95">
            <Save size={16} /> {editData ? "Update Staff" : "Save Staff"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;