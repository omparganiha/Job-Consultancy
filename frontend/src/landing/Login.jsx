import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, LogIn, ArrowRight, UserCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. ADMIN LOGIN (Hardcoded)
    if (email === 'admin@joberp.com' && password === 'admin123') {
      const adminUser = { id: 'admin1', name: 'System Admin', role: 'Admin', email };
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      toast.success('Welcome back, Admin!');
      if (onLoginSuccess) onLoginSuccess();
      onClose();
      navigate('/dashboard');
      return;
    }

    // 2. DYNAMIC STAFF LOGIN (Jo Admin ne create kiya hai)
    const staffList = JSON.parse(localStorage.getItem('staffList') || '[]');
    // Find staff by email. Agar password saved nahi hai, toh default 'staff123' check karega
    const dynamicStaff = staffList.find(s => 
      s.email === email && (s.password === password || password === 'staff123')
    );

    // Hardcoded demo staff as fallback
    if (dynamicStaff || (email === 'staff@joberp.com' && password === 'staff123')) {
      const staffUser = dynamicStaff ? {
        id: dynamicStaff.id,
        name: dynamicStaff.name || dynamicStaff.fullName || 'Staff Member',
        role: 'Staff',
        email: dynamicStaff.email,
        designation: dynamicStaff.designation || 'Staff'
      } : { 
        id: 'staff_demo', 
        name: 'Demo Staff', 
        role: 'Staff', 
        email: 'staff@joberp.com' 
      };

      localStorage.setItem('authUser', JSON.stringify(staffUser));
      toast.success(`Welcome ${staffUser.name}!`);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
      navigate('/dashboard/staff-stats'); // Staff ka apna dashboard
      return;
    }

    // 3. JOB SEEKER / PROVIDER LOGIN (From localStorage)
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name || user.companyName}!`);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
      // Seeker ya Provider page par hi rahenge, Navbar update ho jayega
      return;
    }

    // Agar koi match nahi mila
    toast.error('Invalid email or password! Please try again.');
  };

  // Quick fill buttons for testing
  const fillDemoData = (type) => {
    if (type === 'admin') {
      setEmail('admin@joberp.com'); setPassword('admin123');
    } else if (type === 'staff') {
      setEmail('staff@joberp.com'); setPassword('staff123');
    } else if (type === 'provider') {
      // Find first provider or use dummy
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const prov = users.find(u => u.role === 'Provider');
      if (prov) {
        setEmail(prov.email); setPassword(prov.password);
      } else {
        toast.info("No registered Provider found. Please register one first.");
      }
    } else if (type === 'seeker') {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const seek = users.find(u => u.role === 'Seeker');
      if (seek) {
        setEmail(seek.email); setPassword(seek.password);
      } else {
        toast.info("No registered Seeker found. Please register one first.");
      }
    }
  };

  const goToRegister = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
              <UserCircle size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          <p className="text-sm text-slate-500 mb-6 font-medium">
            Sign in to access your dashboard, post jobs, or apply for new opportunities.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98]"
            >
              <LogIn size={18} /> Sign In
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-400 font-medium">Quick Fill for Testing</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button onClick={() => fillDemoData('seeker')} className="py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Job Seeker</button>
              <button onClick={() => fillDemoData('provider')} className="py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Provider</button>
              <button onClick={() => fillDemoData('staff')} className="py-2 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100">Staff</button>
              <button onClick={() => fillDemoData('admin')} className="py-2 text-xs font-bold text-slate-800 bg-slate-200 rounded-lg hover:bg-slate-300">Admin</button>
            </div>
          </div>
        </div>

        {/* Footer Registration Links */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
          <button 
            onClick={() => goToRegister('/register-seeker')}
            className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all group"
          >
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">New Job Seeker?</p>
              <p className="text-xs text-slate-500 font-medium">Create a free account to apply</p>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
          </button>

          <button 
            onClick={() => goToRegister('/add-company')}
            className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all group"
          >
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">Are you a Company?</p>
              <p className="text-xs text-slate-500 font-medium">Register to post jobs</p>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;