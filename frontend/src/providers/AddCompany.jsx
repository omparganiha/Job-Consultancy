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
  X,
  Save,
  Image as ImageIcon,
  Sparkles,
  Briefcase,
  FileText,
} from "lucide-react";

function AddCompany() {
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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ FileReader ka use karke Image ko Base64 me convert kiya taaki LocalStorage me save ho sake
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
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      // ✅ Data ko LocalStorage mein save kar rahe hain
      const dataToSave = { ...formData, logo: logoPreview };
      localStorage.setItem("companyData", JSON.stringify(dataToSave));

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard/company");
      }, 1800);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease forwards;
        }
        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          background: #f8fafc;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
          border: 1px solid #e2e8f0;
        }
        .input-base:focus {
          border-color: #fb923c;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12);
          background: #fff;
        }
        .input-error {
          border-color: #fca5a5 !important;
          background: #fef2f2 !important;
        }
      `}</style>

      <div className="w-full min-w-0 animate-fade-in text-slate-800">
        {showSuccess && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <p className="text-sm font-bold">
                Company added successfully! Redirecting...
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <header className="mb-8">
          <button
            onClick={() => navigate("/dashboard/company")}
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={14} />
            NEW COMPANY
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Add <span className="text-orange-500">Company</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Fill in the company details to register and start posting jobs.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          {/* ============ LEFT SIDE: FORM ============ */}
          <div className="grid gap-6 lg:col-span-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Basic Information</h2>
                  <p className="text-xs text-slate-500">Company name, logo & industry</p>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon size={28} className="text-slate-300" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-orange-400 hover:text-orange-600">
                    <Upload size={14} />
                    {logoPreview ? "Change Logo" : "Upload Logo"}
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </label>
                  <p className="mt-2 text-[11px] text-slate-400">PNG, JPG (Max 2MB)</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., TechCorp Solutions"
                  className={`input-base ${errors.companyName ? "input-error" : ""}`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.companyName}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`input-base ${errors.industry ? "input-error" : ""}`}
                  >
                    <option value="">Select Industry</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Finance & Banking">Finance & Banking</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-xs font-medium text-red-500">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="input-base"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">About Company</h2>
                  <p className="text-xs text-slate-500">Short description about your company</p>
                </div>
              </div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Write 2-3 lines about your company, culture and services..."
                className={`input-base resize-none ${errors.description ? "input-error" : ""}`}
              />
              {errors.description && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.description}</p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Phone size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Contact Details</h2>
                  <p className="text-xs text-slate-500">Email, phone & location</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hr@company.com"
                    className={`input-base ${errors.email ? "input-error" : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`input-base ${errors.phone ? "input-error" : ""}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-medium text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bangalore"
                    className={`input-base ${errors.city ? "input-error" : ""}`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs font-medium text-red-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Karnataka"
                    className="input-base"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className="input-base"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard/company")}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Save size={16} />
                Save Company
              </button>
            </div>
          </div>

          {/* ============ RIGHT SIDE: LIVE PREVIEW ============ */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  🔎 Live Preview
                </p>
              </div>

              <div className="h-20 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500"></div>

              <div className="px-5 pb-5">
                <div className="-mt-10 mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-orange-50 text-orange-500">
                      <Building2 size={28} strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  {formData.companyName || "Your Company Name"}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {formData.industry || "Industry type"}
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs">
                  {formData.email && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={13} className="text-orange-500" />
                      {formData.email}
                    </div>
                  )}
                  {formData.phone && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={13} className="text-orange-500" />
                      {formData.phone}
                    </div>
                  )}
                  {formData.city && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={13} className="text-orange-500" />
                      {formData.city}
                      {formData.state && `, ${formData.state}`}
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex items-center gap-2 truncate text-slate-600">
                      <Globe size={13} className="text-orange-500" />
                      {formData.website}
                    </div>
                  )}
                  {formData.companySize && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Briefcase size={13} className="text-orange-500" />
                      {formData.companySize} employees
                    </div>
                  )}
                </div>

                {formData.description && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs leading-relaxed text-slate-600 line-clamp-4">
                      {formData.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCompany;