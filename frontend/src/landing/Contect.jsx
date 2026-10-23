import React, { useState } from "react";

// ─── SVGs ───
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "job_seeker",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    alert("Thank you! Our team will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", userType: "job_seeker", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-12 lg:py-20 font-sans">
      
      {/* ─── MAIN WRAPPER ─── */}
      <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 relative z-10">
        
        {/* ==========================================
            LEFT PANEL: DARK THEME CONTACT INFO
            ========================================== */}
        <div className="lg:w-[40%] bg-slate-900 p-10 lg:p-14 text-white relative overflow-hidden flex flex-col justify-between">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/20 rounded-full blur-[80px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">
              Get in <span className="text-orange-500">Touch</span>
            </h2>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-12">
              Whether you're looking for your dream job or hiring top talent, our expert team is ready to help you succeed.
            </p>

            <div className="space-y-8">
              {/* Info Item 1 */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us 24/7</p>
                  <p className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">+91 1800-123-4567</p>
                </div>
              </div>

              {/* Info Item 2 */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">hello@jobconsultancy.com</p>
                </div>
              </div>

              {/* Info Item 3 */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Headquarters</p>
                  <p className="text-base font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                    12th Floor, Tech Park,<br />Sector 62, Noida, UP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            RIGHT PANEL: CONTACT FORM
            ========================================== */}
        <div className="lg:w-[60%] p-8 lg:p-14 bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
            <p className="text-slate-500 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Custom Toggle for Role */}
            <div className="bg-slate-50 p-1.5 rounded-xl inline-flex w-full md:w-auto border border-slate-100">
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="userType" value="job_seeker" checked={formData.userType === 'job_seeker'} onChange={handleChange} className="hidden" />
                <div className={`px-6 py-2.5 text-sm font-bold text-center rounded-lg transition-all duration-300 ${formData.userType === 'job_seeker' ? 'bg-white text-orange-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}>
                  I'm a Job Seeker
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="userType" value="employer" checked={formData.userType === 'employer'} onChange={handleChange} className="hidden" />
                <div className={`px-6 py-2.5 text-sm font-bold text-center rounded-lg transition-all duration-300 ${formData.userType === 'employer' ? 'bg-white text-orange-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}>
                  I'm an Employer
                </div>
              </label>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-400" 
                />
              </div>
              
              {/* Phone */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label>
                <input 
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-400" 
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-400" 
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wide">Message</label>
              <textarea 
                name="message" required rows="4" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-orange-600 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Send Message
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;