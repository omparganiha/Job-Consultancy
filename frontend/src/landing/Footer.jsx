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
    <footer className="relative border-t border-white/5 bg-[#0A0A0A] text-slate-300 overflow-hidden font-sans">
      {/* Golden Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:pr-4">
            <Link to="/" className="group inline-flex items-center gap-2.5 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-black shadow-[0_0_20px_rgba(251,191,36,0.25)] group-hover:scale-105 transition-transform duration-300">
                <Briefcase size={20} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">ERP</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 font-medium">
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
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-yellow-600 group-hover:text-black group-hover:border-amber-400/50 transition-all duration-300">
                  <MapPin size={16} />
                </div>
                <span className="mt-1 leading-snug">123 Business Park, Sector 62, Noida, India</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-yellow-600 group-hover:text-black group-hover:border-amber-400/50 transition-all duration-300">
                  <Phone size={16} />
                </div>
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-yellow-600 group-hover:text-black group-hover:border-amber-400/50 transition-all duration-300">
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
            <Link to="/help-support" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/help-support" className="hover:text-amber-400 transition-colors">
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
        className="group flex items-center text-slate-400 transition-colors hover:text-amber-400"
      >
        <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-1 text-amber-400">
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
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-amber-400 hover:to-yellow-600 hover:border-amber-400/50 hover:text-black hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
    >
      <Icon size={18} />
    </a>
  );
}

export default Footer;