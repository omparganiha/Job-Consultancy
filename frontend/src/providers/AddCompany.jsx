import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Globe,
  MapPin,
  Phone,
  Mail,
  Upload,
  ArrowLeft,
  CheckCircle2,
  Save,
  Image as ImageIcon,
  Sparkles,
  Lock
} from "lucide-react";

export default function AddCompany() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "1-10",
    website: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    description: "",
    password: "", 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.industry.trim()) newErrors.industry = "Industry is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required for login";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.description.trim()) newErrors.description = "Brief description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      // 1. Naye Provider ka data banaya
      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        role: "Provider", // Role provider set kar diya
        name: formData.companyName,
        phone: formData.phone,
        logo: logoPreview
      };

      // 2. LocalStorage mein existing users nikale aur naya user push kiya
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      localStorage.setItem("registeredUsers", JSON.stringify([...existingUsers, newUser]));

      // 3. User ko auto-login karwa diya
      const authSession = { ...newUser, isLoggedIn: true };
      localStorage.setItem("authUser", JSON.stringify(authSession));
      
      // Navbar update karne ke liye event fire kiya
      window.dispatchEvent(new Event("auth-change"));

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 1500);
    }
  };

  return (
    <>
      <style>{`
        .antd-input {
          width: 100%;
          border-radius: 6px;
          border: 1px solid #d9d9d9;
          background-color: #ffffff;
          padding: 8px 12px;
          font-size: 14px;
          color: #333;
          transition: all 0.3s;
          outline: none;
        }
        .antd-input:hover { border-color: #fb923c; }
        .antd-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
        }
        .antd-input-error { border-color: #ff4d4f !important; }
        .antd-label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 text-slate-800 animate-[fadeIn_0.4s_ease-out]">
        
        {showSuccess && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Company registered successfully! Logging you in...</span>
            </div>
          </div>
        )}

        <header className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={14} />
            PROVIDER REGISTRATION
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Register your <span className="text-orange-500">Company</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Create an account to post jobs, manage applications, and hire top talent.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* ============ LEFT SIDE: FORM ============ */}
          <div className="grid gap-6 lg:col-span-2">
            
            {/* Basic Info */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="mb-6 border-b border-slate-100 pb-2 text-lg font-bold text-slate-800">Company Details</h2>
              <div className="mb-6 flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
                  {logoPreview ? <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" /> : <ImageIcon size={24} className="text-slate-400" />}
                </div>
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-400 hover:text-orange-600">
                    <Upload size={16} /> Upload Logo
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="mb-5">
                <label className="antd-label">Company Name <span className="text-red-500">*</span></label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. TechCorp Solutions" className={`antd-input ${errors.companyName ? "antd-input-error" : ""}`} />
                {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="antd-label">Industry <span className="text-red-500">*</span></label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className={`antd-input ${errors.industry ? "antd-input-error" : ""}`}>
                    <option value="">Select Industry</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance & Banking</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                  {errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
                </div>
                <div>
                  <label className="antd-label">Company Size</label>
                  <select name="companySize" value={formData.companySize} onChange={handleChange} className="antd-input">
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Account Login Details */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="mb-6 border-b border-slate-100 pb-2 text-lg font-bold text-slate-800 flex items-center gap-2">
                <Lock size={18} className="text-orange-500"/> Login Credentials (For Future Login)
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="antd-label">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hr@company.com" className={`antd-input ${errors.email ? "antd-input-error" : ""}`} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="antd-label">Set Password <span className="text-red-500">*</span></label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a secure password" className={`antd-input ${errors.password ? "antd-input-error" : ""}`} />
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>
              </div>
            </section>

            {/* Contact & About */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="mb-6 border-b border-slate-100 pb-2 text-lg font-bold text-slate-800">Contact & Location</h2>
              <div className="grid gap-5 sm:grid-cols-2 mb-5">
                <div>
                  <label className="antd-label">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`antd-input ${errors.phone ? "antd-input-error" : ""}`} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="antd-label">City <span className="text-red-500">*</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className={`antd-input ${errors.city ? "antd-input-error" : ""}`} />
                </div>
              </div>
              <div>
                <label className="antd-label">Company Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={`antd-input resize-none ${errors.description ? "antd-input-error" : ""}`} />
              </div>
            </section>

            <div className="flex justify-end gap-3 pb-10">
              <button type="button" onClick={() => navigate("/")} className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">Cancel</button>
              <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600"><Save size={16} /> Register Company</button>
            </div>
          </div>

          {/* ============ RIGHT SIDE: LIVE PREVIEW ============ */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-3"><p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Profile Preview</p></div>
              <div className="h-24 bg-slate-800"></div>
              <div className="px-5 pb-6">
                <div className="-mt-12 mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border-4 border-white bg-white shadow-sm">
                  {logoPreview ? <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" /> : <Building2 size={32} className="text-orange-400" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{formData.companyName || "Company Name"}</h3>
                <p className="text-sm font-medium text-orange-600 mb-4">{formData.industry || "Industry type"}</p>
                <div className="space-y-3 text-sm text-slate-600">
                  {formData.email && <div className="flex items-center gap-2.5"><Mail size={16} /> <span className="truncate">{formData.email}</span></div>}
                  {formData.phone && <div className="flex items-center gap-2.5"><Phone size={16} /> <span>{formData.phone}</span></div>}
                  {formData.city && <div className="flex items-center gap-2.5"><MapPin size={16} /> <span>{formData.city}</span></div>}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}