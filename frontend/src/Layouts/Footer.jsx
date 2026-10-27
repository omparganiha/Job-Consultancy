import { Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0A0A0A] font-sans text-slate-300">
      {/* Orange Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:pr-4">
            <Link to="/" className="group mb-6 inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-transform duration-300 group-hover:scale-105">
                <Briefcase size={20} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Job<span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">ERP</span>
              </span>
            </Link>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">
              Connecting talented job seekers with top-tier companies. Your next big career journey starts right here.
            </p>
            <div className="mt-8 flex gap-3">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Instagram} />
            </div>
          </div>

          {/* For Seekers */}
          <div>
            <h3 className="mb-6 text-sm font-extrabold uppercase tracking-widest text-white">
              For Job Seekers
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <FooterLink to="/jobs">Browse Jobs</FooterLink>
              <FooterLink to="/register-seeker">Create Account</FooterLink>
              <FooterLink to="/login">Candidate Login</FooterLink>
              <FooterLink to="/help-support">Help & Support</FooterLink>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="mb-6 text-sm font-extrabold uppercase tracking-widest text-white">
              For Employers
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <FooterLink to="/post-job">Post a Job</FooterLink>
              <FooterLink to="/add-company">Company Register</FooterLink>
              <FooterLink to="/login">Employer Login</FooterLink>
              <FooterLink to="/contact">Contact Sales</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-extrabold uppercase tracking-widest text-white">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li className="group flex items-start gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-orange-400 transition-all duration-300 group-hover:border-orange-400/50 group-hover:bg-gradient-to-br group-hover:from-orange-400 group-hover:to-orange-600 group-hover:text-white">
                  <MapPin size={16} />
                </div>
                <span className="mt-1 leading-snug">123 Business Park, Sector 62, Noida, India</span>
              </li>
              <li className="group flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-orange-400 transition-all duration-300 group-hover:border-orange-400/50 group-hover:bg-gradient-to-br group-hover:from-orange-400 group-hover:to-orange-600 group-hover:text-white">
                  <Phone size={16} />
                </div>
                <span>+91 1800-123-4567</span>
              </li>
              <li className="group flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-orange-400 transition-all duration-300 group-hover:border-orange-400/50 group-hover:bg-gradient-to-br group-hover:from-orange-400 group-hover:to-orange-600 group-hover:text-white">
                  <Mail size={16} />
                </div>
                <span>support@joberp.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-300">JobERP Consultancy</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link to="/help-support" className="transition-colors hover:text-orange-400">
              Privacy Policy
            </Link>
            <Link to="/help-support" className="transition-colors hover:text-orange-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center text-slate-400 transition-colors hover:text-orange-400"
      >
        <span className="w-0 overflow-hidden text-orange-400 opacity-0 transition-all duration-300 group-hover:mr-1 group-hover:w-4 group-hover:opacity-100">
          <ChevronRight size={14} />
        </span>
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon: Icon }) {
  return (
    <a
      href="#"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-gradient-to-br hover:from-orange-400 hover:to-orange-600 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
    >
      <Icon size={18} />
    </a>
  );
}

export default Footer;