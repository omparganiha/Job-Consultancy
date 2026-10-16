import {
  Briefcase, ClipboardList, CheckCircle, Clock, Users, Building2,
  TrendingUp, FileText, Calendar, Bell, ArrowRight, MapPin,
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Jobs', value: '248', icon: Briefcase, color: 'bg-blue-100 text-blue-600', trend: '+12% this week' },
    { title: 'Applications', value: '36', icon: ClipboardList, color: 'bg-yellow-100 text-yellow-600', trend: '+5 new' },
    { title: 'Shortlisted', value: '12', icon: CheckCircle, color: 'bg-green-100 text-green-600', trend: '+2 today' },
    { title: 'Pending', value: '8', icon: Clock, color: 'bg-purple-100 text-purple-600' },
  ];

  const quickActions = [
    { title: 'My Profile', desc: 'Update your details', icon: Users, path: '/dashboard/profile', color: 'bg-blue-50 text-blue-600' },
    { title: 'Browse Jobs', desc: 'Find new openings', icon: Briefcase, path: '/dashboard/jobs', color: 'bg-green-50 text-green-600' },
    { title: 'Applications', desc: 'Track your status', icon: ClipboardList, path: '/dashboard/applications', color: 'bg-yellow-50 text-yellow-600' },
    { title: 'Resume', desc: 'Manage your resume', icon: FileText, path: '/dashboard/resume', color: 'bg-purple-50 text-purple-600' },
    { title: 'Interviews', desc: 'Upcoming schedules', icon: Calendar, path: '/dashboard/interviews', color: 'bg-pink-50 text-pink-600' },
    { title: 'Saved Jobs', desc: 'Your bookmarks', icon: Building2, path: '/dashboard/saved-jobs', color: 'bg-indigo-50 text-indigo-600' },
  ];

  const recentApplications = [
    { id: 1, role: 'Frontend Developer', company: 'TechCorp', location: 'Bangalore', status: 'Under Review', date: '2 days ago' },
    { id: 2, role: 'React Developer', company: 'StartupX', location: 'Remote', status: 'Shortlisted', date: '5 days ago' },
    { id: 3, role: 'UI Engineer', company: 'DesignHub', location: 'Mumbai', status: 'Applied', date: '1 week ago' },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Shortlisted': return 'bg-green-100 text-green-700';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Selected': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, John 👋</h2>
        <p className="text-slate-500 mt-1">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{s.title}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
                  {s.trend && <p className="text-xs text-green-600 mt-1 font-medium">{s.trend}</p>}
                </div>
                <div className={`p-3 rounded-lg ${s.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <a key={a.title} href={a.path}
                className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
                <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center ${a.color}`}>
                  <Icon size={22} />
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-3">{a.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Applications</h3>
            <a href="/dashboard/applications" className="text-sm text-blue-600 font-medium flex items-center gap-1">
              View All <ArrowRight size={14} />
            </a>
          </div>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{app.role}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      {app.company} • <MapPin size={12} /> {app.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{app.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Interviews */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Upcoming Interviews</h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-blue-50">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">TechCorp</p>
                  <p className="text-xs text-slate-600">Frontend Developer</p>
                  <p className="text-xs text-blue-600 font-medium mt-1">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-slate-50">
                <div className="w-10 h-10 rounded-lg bg-slate-600 text-white flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">StartupX</p>
                  <p className="text-xs text-slate-600">React Developer</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Fri, 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-700">Your application was shortlisted</p>
                  <p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-700">New job matches your profile</p>
                  <p className="text-xs text-slate-400 mt-0.5">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-700">Interview scheduled for tomorrow</p>
                  <p className="text-xs text-slate-400 mt-0.5">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;