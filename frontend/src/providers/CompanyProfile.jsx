import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Plus,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  FileText,
  FileCheck,
  ExternalLink,
} from "lucide-react";

function CompanyProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // ✅ DYNAMIC LOGIC: LocalStorage se REAL data laana
  const [formData] = useState(() => {
    try {
      const savedData = localStorage.getItem("companyData");
      if (savedData) {
        // Agar form bhara gaya hai, toh SIRF form ka data aayega (dummy mix nahi hoga)
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error(e);
    }
    
    // Fallback: Agar koi company save nahi ki gayi hai toh dummy data dikhega
    return {
      companyName: "TechCorp Solutions Pvt. Ltd.",
      industry: "Information Technology",
      companySize: "201-500",
      foundedYear: "2015",
      website: "https://techcorp.com",
      email: "hr@techcorp.com",
      phone: "+91 98765 43210",
      address: "42, Tech Park, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560066",
      description:
        "TechCorp Solutions is a leading IT company providing innovative software solutions, cloud services, and digital transformation to businesses worldwide.",
      tagline: "Innovating the Future of Technology",
      gstNumber: "29ABCDE1234F1Z5",
      registrationNumber: "CIN-U72200KA2015PTC012345",
      facebook: "https://facebook.com/techcorp",
      twitter: "https://twitter.com/techcorp",
      linkedin: "https://linkedin.com/company/techcorp",
      logo: null,
    };
  });

  // UI ko bhara hua dikhane ke liye Stats abhi static rakhe hain
  const companyStats = [
    { label: "Active Jobs", value: "12", icon: Briefcase, color: "orange" },
    { label: "Total Applicants", value: "248", icon: Users, color: "emerald" },
    { label: "Hired Candidates", value: "34", icon: CheckCircle2, color: "blue" },
    { label: "Pending Reviews", value: "18", icon: AlertCircle, color: "amber" },
  ];

  const colorStyles = {
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "contact", label: "Contact & Location", icon: MapPin },
    { id: "legal", label: "Legal & Docs", icon: ShieldCheck },
    { id: "social", label: "Social Links", icon: Globe },
  ];

  // Dynamic component jo khali hone par "Not provided" dikhata hai
  const DisplayField = ({ label, value }) => (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 min-h-[46px] flex items-center">
        {value ? (
          value
        ) : (
          <span className="italic text-slate-400 text-xs">Not provided</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .upload-dropzone {
          transition: all 0.25s ease-in-out;
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23CBD5E1FF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        }
        .custom-tab-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .custom-tab-scroll::-webkit-scrollbar { height: 4px; }
        .custom-tab-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-tab-scroll::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 9999px;
        }
      `}</style>

      <div className="w-full min-w-0 text-slate-800 animate-fade-in">
        {/* Page Header */}
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
              <Sparkles size={15} />
              COMPANY SETTINGS
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Company <span className="text-orange-500">Profile</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your company information, public profile, and contact details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard/add-company")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus size={18} />
              Add Company
            </button>
          </div>
        </header>

        <div className="grid min-w-0 gap-6">
          {/* Banner & Logo */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-32 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 sm:h-44"></div>

            <div className="px-5 pb-6 sm:px-8">
              <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">
                {/* Logo Box */}
                <div className="relative shrink-0">
                  <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-2xl border-4 border-white bg-white shadow-md sm:h-32 sm:w-32">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Building2 size={40} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1 sm:pb-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="truncate text-2xl font-extrabold text-slate-900">
                      {formData.companyName || "Company Name"}
                    </h2>
                    {formData.companyName && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 size={12} />
                        VERIFIED
                      </span>
                    )}
                  </div>
                  
                  {formData.tagline && (
                    <p className="mt-1 text-sm font-medium text-slate-500">{formData.tagline}</p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                    {formData.industry && (
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-orange-500" />
                        {formData.industry}
                      </span>
                    )}
                    {(formData.city || formData.state) && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-orange-500" />
                        {[formData.city, formData.state].filter(Boolean).join(", ")}
                      </span>
                    )}
                    {formData.companySize && (
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-orange-500" />
                        {formData.companySize} employees
                      </span>
                    )}
                  </div>
                </div>

                {formData.website && (
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 hidden shrink-0 items-center gap-2 self-end rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
                  >
                    <Globe size={16} className="text-slate-400" />
                    Visit Website
                    <ExternalLink size={14} className="text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {companyStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colorStyles[stat.color]}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              );
            })}
          </section>

          {/* Tabs Section */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="custom-tab-scroll flex overflow-x-auto border-b border-slate-200 bg-slate-50/50">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-6 py-4 text-sm font-bold transition-colors ${
                      isActive
                        ? "border-orange-500 bg-white text-orange-600"
                        : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <TabIcon
                      size={16}
                      className={isActive ? "text-orange-500" : "text-slate-400"}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-5 sm:p-7">
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <DisplayField label="Company Name" value={formData.companyName} />
                    <DisplayField label="Tagline" value={formData.tagline} />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <DisplayField label="Industry" value={formData.industry} />
                    <DisplayField label="Company Size" value={formData.companySize ? `${formData.companySize} employees` : null} />
                    <DisplayField label="Founded Year" value={formData.foundedYear} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Company Description
                    </label>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap min-h-[60px]">
                      {formData.description ? (
                        formData.description
                      ) : (
                        <span className="italic text-slate-400 text-xs">Not provided</span>
                      )}
                    </div>
                  </div>

                  <DisplayField label="Website URL" value={formData.website} />
                </div>
              )}

              {/* CONTACT TAB */}
              {activeTab === "contact" && (
                <div className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <DisplayField label="Email Address" value={formData.email} />
                    <DisplayField label="Phone Number" value={formData.phone} />
                  </div>
                  <DisplayField label="Complete Address" value={formData.address} />
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <DisplayField label="City" value={formData.city} />
                    <DisplayField label="State" value={formData.state} />
                    <DisplayField label="Country" value={formData.country} />
                    <DisplayField label="Pin Code" value={formData.pincode} />
                  </div>
                </div>
              )}

              {/* LEGAL TAB */}
              {activeTab === "legal" && (
                <div className="grid gap-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <DisplayField label="GST Number" value={formData.gstNumber} />
                    <DisplayField label="Registration Number (CIN)" value={formData.registrationNumber} />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <FileCheck size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">Company Documents</h3>
                        <p className="mt-1 text-xs text-slate-500">Official docs for verification</p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {["Registration Certificate", "GST Certificate"].map((doc) => (
                        <div
                          key={doc}
                          className="upload-dropzone flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center"
                        >
                          <FileText size={28} className="mb-3 text-slate-300" />
                          <h4 className="text-sm font-bold text-slate-700">{doc}</h4>
                          <p className="mt-1 text-xs text-slate-500">
                            {formData.companyName === "TechCorp Solutions Pvt. Ltd." ? "Uploaded" : "Not Uploaded"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SOCIAL TAB */}
              {activeTab === "social" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">Social Media Links</h3>
                        <p className="mt-1 text-xs text-slate-500">Official connected profiles</p>
                      </div>
                    </div>
                  </div>

                  <DisplayField label="LinkedIn Profile" value={formData.linkedin} />
                  <DisplayField label="Twitter Profile" value={formData.twitter} />
                  <DisplayField label="Facebook Page" value={formData.facebook} />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CompanyProfile;