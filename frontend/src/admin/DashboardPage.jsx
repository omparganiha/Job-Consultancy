import React from 'react';
import {
  Briefcase, ClipboardList, CheckCircle, Clock, Users, Building2,
  TrendingUp, FileText, Calendar, Bell, ArrowRight, MapPin, 
  MoreHorizontal, Filter, Download, Target, Award, CheckCircle2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const DashboardPage = () => {
  // --- Chart Data ---
  const activityData = [
    { name: 'Week 1', applications: 12, interviews: 1 },
    { name: 'Week 2', applications: 19, interviews: 2 },
    { name: 'Week 3', applications: 15, interviews: 3 },
    { name: 'Week 4', applications: 24, interviews: 5 },
    { name: 'Week 5', applications: 24, interviews: 4 },
    { name: 'Week 6', applications: 35, interviews: 8 },
    { name: 'Week 7', applications: 42, interviews: 12 },
  ];

  const pipelineData = [
    { name: 'Jan', InReview: 20, Shortlisted: 10, Interviewing: 2 },
    { name: 'Feb', InReview: 25, Shortlisted: 15, Interviewing: 5 },
    { name: 'Mar', InReview: 35, Shortlisted: 20, Interviewing: 8 },
    { name: 'Apr', InReview: 30, Shortlisted: 18, Interviewing: 6 },
    { name: 'May', InReview: 45, Shortlisted: 25, Interviewing: 12 },
    { name: 'Jun', InReview: 55, Shortlisted: 35, Interviewing: 15 },
  ];

  // --- UI Data ---
  const stats = [
    { title: 'Total Applications', value: '248', icon: ClipboardList, trend: '+12.5%', trendDirection: 'up', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'In Review', value: '36', icon: Clock, trend: '+4.2%', trendDirection: 'up', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Interviews', value: '12', icon: Calendar, trend: '+18.1%', trendDirection: 'up', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Offers', value: '3', icon: Award, trend: '+1 new', trendDirection: 'up', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickActions = [
    { title: 'My Profile', desc: 'Update details', icon: Users, path: '/dashboard/profile', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Browse Jobs', desc: 'Find new roles', icon: Briefcase, path: '/dashboard/jobs', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Applications', desc: 'Track status', icon: ClipboardList, path: '/dashboard/applications', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Resume', desc: 'Manage files', icon: FileText, path: '/dashboard/resume', color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Interviews', desc: 'View schedule', icon: Calendar, path: '/dashboard/interviews', color: 'text-pink-600', bg: 'bg-pink-50' },
    { title: 'Saved Jobs', desc: 'View bookmarks', icon: Building2, path: '/dashboard/saved-jobs', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const recentApplications = [
    { id: 1, role: 'Senior Frontend Developer', company: 'TechCorp', location: 'Bangalore', salary: '₹18L - ₹24L', status: 'Interviewing', date: '2 days ago', match: 98, logo: 'T' },
    { id: 2, role: 'React Developer', company: 'StartupX', location: 'Remote', salary: '₹12L - ₹16L', status: 'Shortlisted', date: '5 days ago', match: 92, logo: 'S' },
    { id: 3, role: 'UI/UX Engineer', company: 'DesignHub', location: 'Mumbai', salary: '₹10L - ₹15L', status: 'In Review', date: '1 week ago', match: 85, logo: 'D' },
    { id: 4, role: 'Frontend Engineer', company: 'CloudScale', location: 'Pune', salary: '₹14L - ₹20L', status: 'Rejected', date: '2 weeks ago', match: 65, logo: 'C' },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Interviewing': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Shortlisted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'In Review': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs rounded-lg shadow-xl p-3 border border-slate-700">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex items-center justify-between gap-4">
              <span>{entry.name}:</span>
              <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
            {['7d', '30d', '3m', '1y'].map((range) => (
              <button 
                key={range} 
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${range === '30d' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={14} className="text-slate-400" />
            Export
          </button>
        </div>
      </div>

      {/* Compact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{s.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                  <span className={`flex items-center text-[10px] font-bold ${
                    s.trendDirection === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={10} className={s.trendDirection === 'down' ? 'rotate-180 mr-0.5' : 'mr-0.5'} />
                    {s.trend}
                  </span>
                </div>
              </div>
              <div className={`p-2.5 rounded-lg ${s.bg} ${s.color}`}>
                <Icon size={18} strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Application Activity</h3>
              <p className="text-xs text-slate-500">Applications vs. Interviews over time</p>
            </div>
            <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Applications</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Interviews</div>
            </div>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            <p className="text-xs text-slate-500">Frequently used shortcuts</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5 flex-1">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <a 
                  key={a.title} 
                  href={a.path}
                  className="flex flex-col items-start p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all group"
                >
                  <div className={`p-1.5 rounded-md ${a.bg} ${a.color} mb-1.5 group-hover:scale-110 transition-transform`}>
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900 text-left leading-tight">{a.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 text-left font-medium">{a.desc}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lower Section: Stacked Bar Chart & Recent Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Stacked Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Pipeline Breakdown</h3>
            <p className="text-xs text-slate-500">Status distribution over months</p>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} />
                <Bar dataKey="InReview" name="In Review" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Shortlisted" name="Shortlisted" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Interviewing" name="Interviewing" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications Data Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Applications</h3>
            </div>
            <a href="/dashboard/applications" className="text-xs text-orange-500 font-bold flex items-center gap-1 hover:text-orange-600 transition-colors">
              View All <ArrowRight size={14} />
            </a>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Role & Company</th>
                  <th className="px-5 py-3">Match</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {app.logo}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{app.role}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{app.company} • {app.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[50px]">
                          <div 
                            className={`h-1.5 rounded-full ${app.match > 80 ? 'bg-emerald-500' : app.match > 70 ? 'bg-orange-500' : 'bg-red-500'}`} 
                            style={{ width: `${app.match}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">{app.match}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-200 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;