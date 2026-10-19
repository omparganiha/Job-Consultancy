import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Camera,
  Save,
  Linkedin,
  Globe,
  Sparkles,
  CheckCircle,
  FileText
} from "lucide-react";

function MyProfile() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Profile State (API se data aayega yahan)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    title: "Senior Frontend Developer",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/johndoe",
    portfolio: "johndoe.dev",
    experience: "5-8",
    about:
      "I am a passionate frontend developer with 5+ years of experience in building scalable web applications using React, Redux, and Tailwind CSS. I love creating beautiful and performant user interfaces.",
    skills: "React.js, Next.js, JavaScript, Tailwind CSS, TypeScript",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    // Dummy API call simulation
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      
      // 3 second baad success message hide karne ke liye
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Page Header */}
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} />
            YOUR ACCOUNT
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            My <span className="text-orange-500">Profile</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and professional details.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
            <CheckCircle size={18} />
            Profile Updated!
          </div>
        )}
      </header>

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        
        {/* LEFT COLUMN - Avatar & Quick Info */}
        <div className="flex flex-col gap-6">
          
          {/* Profile Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 text-orange-500 border-4 border-white shadow-lg overflow-hidden">
                {/* Dummy Image ki jagah User Icon */}
                <User size={48} />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm hover:bg-orange-600 transition"
                title="Change Avatar"
              >
                <Camera size={14} />
              </button>
            </div>

            <h2 className="text-xl font-bold">{profile.firstName} {profile.lastName}</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">{profile.title}</p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <MapPin size={14} /> {profile.location}
            </p>

            <div className="mt-6 w-full border-t border-slate-100 pt-5">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>Profile Completion</span>
                <span className="text-orange-600">85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <p className="mt-2 text-xs text-slate-400">Add your portfolio to reach 100%</p>
            </div>
          </section>

          {/* Contact Quick View */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400"><Mail size={16} /></div>
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400"><Phone size={16} /></div>
                <span>{profile.phone}</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - Edit Forms */}
        <div className="flex flex-col gap-6">
          
          {/* Basic Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <User size={20} className="text-orange-500" />
              <h2 className="text-lg font-bold">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} />
              <Field label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} />
              <Field label="Email Address" name="email" type="email" value={profile.email} onChange={handleChange} disabled />
              <Field label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} />
              <Field label="Professional Title" name="title" value={profile.title} onChange={handleChange} placeholder="e.g. UI/UX Designer" />
              <Field label="Location" name="location" value={profile.location} onChange={handleChange} placeholder="City, State" />
            </div>
          </section>

          {/* Professional Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Briefcase size={20} className="text-orange-500" />
              <h2 className="text-lg font-bold">Professional Details</h2>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">About Me</label>
              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                rows={4}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                placeholder="Write a brief summary about your professional background..."
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Total Experience</label>
                <select
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="fresher">Fresher</option>
                  <option value="0-1">0 - 1 Year</option>
                  <option value="1-3">1 - 3 Years</option>
                  <option value="3-5">3 - 5 Years</option>
                  <option value="5-8">5 - 8 Years</option>
                  <option value="8+">8+ Years</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Top Skills (Comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="React, Python, Design..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Globe size={20} className="text-orange-500" />
              <h2 className="text-lg font-bold">Social & Links</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field 
                label="LinkedIn Profile" 
                name="linkedin" 
                value={profile.linkedin} 
                onChange={handleChange} 
                icon={Linkedin}
                placeholder="linkedin.com/in/username" 
              />
              <Field 
                label="Portfolio / Website" 
                name="portfolio" 
                value={profile.portfolio} 
                onChange={handleChange} 
                icon={Globe}
                placeholder="yourwebsite.com" 
              />
            </div>
          </section>

          {/* Save Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </div>
      </form>
    </main>
  );
}

/* Reusable Input Field Component for Profile Page */
function Field({ label, name, type = "text", value, onChange, placeholder, disabled, icon: Icon }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 
          ${disabled ? 'text-slate-400 cursor-not-allowed bg-slate-100' : 'text-slate-800'}
          ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
}

export default MyProfile;