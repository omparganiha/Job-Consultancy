
import React, { useState } from "react";
import { toast } from "react-toastify";

// ─── SVGs ───
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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

    try {
      const oldData = JSON.parse(
        localStorage.getItem("contactMessages") || "[]"
      );

      if (!Array.isArray(oldData)) {
        toast.error("Unable to submit your message. Please try again.");
        return;
      }

      const newMessage = {
        ...formData,
        userType:
          formData.userType === "job_seeker"
            ? "Job Seeker"
            : "Employer",
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        status: "New",
      };

      localStorage.setItem(
        "contactMessages",
        JSON.stringify([...oldData, newMessage])
      );

      toast.success("Message submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        userType: "job_seeker",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-300 text-slate-700 px-3 py-2.5 rounded-md text-sm outline-none hover:border-orange-500 focus:border-orange-500 focus:ring-[2px] focus:ring-orange-500/20 transition-all duration-300 placeholder:text-slate-400";

  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="bg-white w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* LEFT PANEL: CONTACT INFORMATION */}
        <div className="lg:w-[40%] bg-slate-800 p-8 lg:p-10 rounded-[2rem] text-white relative overflow-hidden h-fit shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-white">
              Get in <span className="text-orange-500">Touch</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed mb-10">
              Looking for your dream job or hiring top talent? Our expert team is ready to help you succeed.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Call Us</p>
                  <p className="text-sm font-medium text-slate-200">+91 1800-123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Email</p>
                  <p className="text-sm font-medium text-slate-200">hello@joberp.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Headquarters</p>
                  <p className="text-sm font-medium text-slate-200">
                    Tech Park, Sector 62, Noida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: CONTACT FORM */}
        <div className="lg:w-[60%] flex flex-col justify-center py-4 lg:py-6">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              Send Us a Message
            </h3>
            <p className="text-slate-500 text-sm">
              Please fill out the form below to reach us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* USER TYPE */}
            <div className="bg-slate-100 p-1 rounded-md inline-flex w-full md:w-auto mb-2">
              <label className="flex-1 md:w-36 cursor-pointer relative">
                <input
                  type="radio"
                  name="userType"
                  value="job_seeker"
                  checked={formData.userType === "job_seeker"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className={`py-1.5 px-3 text-sm font-medium text-center rounded transition-all duration-300 ${
                  formData.userType === "job_seeker"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}>
                  Job Seeker
                </div>
              </label>

              <label className="flex-1 md:w-36 cursor-pointer relative">
                <input
                  type="radio"
                  name="userType"
                  value="employer"
                  checked={formData.userType === "employer"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className={`py-1.5 px-3 text-sm font-medium text-center rounded transition-all duration-300 ${
                  formData.userType === "employer"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}>
                  Employer
                </div>
              </label>
            </div>

            {/* NAME AND PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className={labelClass}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className={labelClass}>
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                className={`${inputClass} resize-none`}
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-[180px] bg-orange-500 text-white font-medium text-sm py-2.5 rounded-md shadow-sm hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
