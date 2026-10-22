import { useState, useEffect } from "react";
import { Building2, Save, Camera, Globe, Mail, Phone, MapPin, Sparkles, CheckCircle, Briefcase } from "lucide-react";

function CompanyProfile() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [company, setCompany] = useState({
    companyName: "",
    industry: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    about: "",
    gstNumber: "",
    foundedYear: "",
    employees: "1-10",
    logo: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem("companyData");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCompany(prev => ({ ...prev, logo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem("companyData", JSON.stringify(company));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} /> COMPANY SETUP
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Company <span className="text-orange-500">Profile</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">Complete your profile to post jobs and get verified.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
            <CheckCircle size={18} /> Saved Successfully!
          </div>
        )}
      </header>

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        {/* Logo Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center text-center h-fit">
          <div className="relative mb-4">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-orange-50 border-4 border-white shadow-md overflow-hidden">
              {company.logo ? (
                <img src={company.logo} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                <Building2 size={48} className="text-orange-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow-sm hover:bg-orange-600">
              <Camera size={16} />
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          </div>
          <h2 className="text-xl font-bold">{company.companyName || "Your Company"}</h2>
          <p className="mt-1 text-sm text-slate-500">{company.industry || "Industry"}</p>
          <div className="mt-5 w-full rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs text-amber-700">
            🛡️ Verification Pending from Admin
          </div>
        </section>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-lg font-bold">
              <Building2 size={20} className="text-orange-500" /> Company Details
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company Name" name="companyName" value={company.companyName} onChange={handleChange} required />
              <Field label="Industry" name="industry" value={company.industry} onChange={handleChange} placeholder="e.g. IT, Finance" />
              <Field label="Company Email" name="email" type="email" value={company.email} onChange={handleChange} />
              <Field label="Phone Number" name="phone" value={company.phone} onChange={handleChange} />
              <Field label="Website" name="website" value={company.website} onChange={handleChange} placeholder="https://..." />
              <Field label="Founded Year" name="foundedYear" type="number" value={company.foundedYear} onChange={handleChange} />
              <Field label="GST / Registration No." name="gstNumber" value={company.gstNumber} onChange={handleChange} />
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Company Size</label>
                <select name="employees" value={company.employees} onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100">
                  <option>1-10</option><option>11-50</option><option>51-200</option>
                  <option>201-500</option><option>500+</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Office Address</label>
              <input name="address" value={company.address} onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">About Company</label>
              <textarea name="about" value={company.about} onChange={handleChange} rows={4}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </div>
          </section>

          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-600 disabled:opacity-70">
              <Save size={18} /> {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
    </div>
  );
}

export default CompanyProfile;