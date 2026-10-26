import React, { useState } from 'react';
import {
  FileText, Download, Filter, Calendar, TrendingUp, 
  CheckCircle2, Clock, ArrowUpRight, ArrowDownRight, 
  Building2, DollarSign, MapPin, Globe, ChevronRight, ChevronDown, ChevronUp
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';

const Reports = () => {
  // --- State for Toggle ---
  const [showAllLocations, setShowAllLocations] = useState(false);

  // --- Chart Data ---
  const revenueData = [
    { name: 'Jan', revenue: 12000, applications: 400 },
    { name: 'Feb', revenue: 18000, applications: 550 },
    { name: 'Mar', revenue: 15000, applications: 480 },
    { name: 'Apr', revenue: 24000, applications: 700 },
    { name: 'May', revenue: 22000, applications: 650 },
    { name: 'Jun', revenue: 32000, applications: 950 },
  ];

  const locationData = [
    { name: 'Bangalore', value: 450, percentage: 26, color: 'from-orange-500 to-amber-400' },
    { name: 'Mumbai', value: 380, percentage: 22, color: 'from-blue-500 to-cyan-400' },
    { name: 'Delhi', value: 310, percentage: 18, color: 'from-emerald-500 to-teal-400' },
    { name: 'Remote', value: 280, percentage: 16, color: 'from-purple-500 to-fuchsia-400' },
    { name: 'Pune', value: 190, percentage: 11, color: 'from-pink-500 to-rose-400' },
    { name: 'Bhilai', value: 150, percentage: 9, color: 'from-indigo-500 to-blue-400' },
    { name: 'Raipur', value: 126, percentage: 7, color: 'from-amber-500 to-yellow-400' },
    { name: 'Hyderabad', value: 110, percentage: 6, color: 'from-cyan-500 to-sky-400' },
    { name: 'Chennai', value: 95, percentage: 5, color: 'from-lime-500 to-green-400' },
    { name: 'Kolkata', value: 80, percentage: 4, color: 'from-fuchsia-500 to-pink-400' },
  ];

  const displayedLocations = showAllLocations ? locationData : locationData.slice(0, 5);

  const sourceData = [
    { name: 'Direct', value: 45, color: 'url(#gradDirect)', fill: '#f97316', bg: 'bg-orange-500' },
    { name: 'LinkedIn', value: 30, color: 'url(#gradLinkedIn)', fill: '#10b981', bg: 'bg-emerald-500' },
    { name: 'Referrals', value: 15, color: 'url(#gradReferrals)', fill: '#8b5cf6', bg: 'bg-purple-500' },
    { name: 'Others', value: 10, color: 'url(#gradOthers)', fill: '#94a3b8', bg: 'bg-slate-400' },
  ];

  const reportHistory = [
    { id: 'RPT-001', name: 'Monthly Performance Report', date: 'Oct 01, 2023', type: 'PDF', size: '2.4 MB', status: 'Completed' },
    { id: 'RPT-002', name: 'Q3 Applicant Demographics', date: 'Sep 28, 2023', type: 'CSV', size: '8.1 MB', status: 'Completed' },
    { id: 'RPT-003', name: 'Revenue & Billing Summary', date: 'Sep 15, 2023', type: 'PDF', size: '1.2 MB', status: 'Completed' },
    { id: 'RPT-004', name: 'Provider Activity Log', date: 'Sep 05, 2023', type: 'XLSX', size: '4.5 MB', status: 'Processing' },
  ];

  // --- Pie Chart State ---
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(-1);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g className="filter drop-shadow-xl">
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs rounded-xl shadow-2xl p-4 border border-slate-700/50">
          <p className="font-bold mb-2 text-slate-200">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="flex items-center justify-between gap-6 mb-1 last:mb-0">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill || entry.color || entry.payload.fill }}></span>
                <span className="text-slate-400 font-medium">{entry.name}</span>
              </span>
              <span className="font-extrabold text-white">
                {entry.name === 'Revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
                {entry.name !== 'Revenue' && entry.name !== 'Applications' && '%'}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* ✅ Custom CSS to hide the side scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] min-h-screen">
        
        {/* 1. Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reports & Analytics</h2>
            <p className="text-sm text-slate-500 mt-1.5 font-medium">Detailed insights into platform performance and user activity.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-sm hover:border-slate-300 transition-colors cursor-pointer group">
              <Calendar size={15} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              <span className="text-xs font-bold text-slate-700">Last 6 Months</span>
            </div>
            <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors">
              <Filter size={15} className="text-slate-400" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-slate-900/20 transition-all active:scale-95">
              <Download size={15} />
              Export Report
            </button>
          </div>
        </div>

        {/* 2. Unified Stat Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
            {[
              { title: 'Total Revenue', value: '$123,400', icon: DollarSign, trend: '+14.5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { title: 'Total Applications', value: '3,730', icon: FileText, trend: '+22.1%', color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'Active Providers', value: '142', icon: Building2, trend: '+5.2%', color: 'text-orange-600', bg: 'bg-orange-50' },
              { title: 'Conversion Rate', value: '4.8%', icon: TrendingUp, trend: '-1.1%', color: 'text-red-600', bg: 'bg-red-50' },
            ].map((kpi, idx) => (
              <div key={idx} className="p-5 flex flex-col justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{kpi.title}</span>
                  <div className={`p-1.5 rounded-md ${kpi.bg} ${kpi.color}`}>
                    <kpi.icon size={16} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">{kpi.value}</span>
                  <span className={`flex items-center text-xs font-bold ${kpi.trend.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {kpi.trend.includes('+') ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
                    {kpi.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Top Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Revenue Area Chart (Span 3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Revenue vs. Volume</h3>
                <p className="text-sm text-slate-500">Financial and application trends</p>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm"></span> Revenue</div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></span> Apps</div>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} tickFormatter={(value) => `$${value/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff', fill: '#f97316' }} />
                  <Area yAxisId="right" type="monotone" dataKey="applications" name="Applications" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff', fill: '#3b82f6' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Premium Donut Chart (Span 2) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="mb-2 relative z-10">
              <h3 className="text-base font-bold text-slate-900">Application Sources</h3>
              <p className="text-sm text-slate-500">Acquisition channels</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px] z-10">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <defs>
                    <linearGradient id="gradDirect" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <linearGradient id="gradLinkedIn" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="gradReferrals" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="gradOthers" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>

                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={6}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    stroke="none"
                    cornerRadius={6}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">1,248</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Apps</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 relative z-10">
              {sourceData.map((source, index) => (
                <div key={source.name} className={`flex flex-col transition-all duration-300 ${activeIndex !== -1 && activeIndex !== index ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${source.bg}`}></span>
                    <span className="text-xs font-bold text-slate-600">{source.name}</span>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 ml-4.5">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Bottom Row: Locations & Reports Table */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Locations List (Span 2) - Scrollable but hides scrollbar */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Top Locations</h3>
                <p className="text-sm text-slate-500">Geographic distribution</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                <Globe size={18} />
              </div>
            </div>

            {/* ✅ Applied hide-scrollbar class here, fixed max-height when expanded */}
            <div className={`space-y-4 flex-1 ${showAllLocations ? 'max-h-[380px] overflow-y-auto pr-2 hide-scrollbar' : ''}`}>
              {displayedLocations.map((loc, index) => (
                <div key={loc.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white bg-gradient-to-br ${loc.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        <MapPin size={12} strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {loc.name}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-slate-900">{loc.value}</span>
                      <span className="text-[10px] font-bold text-slate-400">{loc.percentage}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${loc.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${loc.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Button */}
            <button 
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 group"
            >
              {showAllLocations ? 'Show Less' : 'View All Locations'}
              {showAllLocations ? (
                <ChevronUp size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors group-hover:translate-y-0.5" />
              )}
            </button>
          </div>

          {/* Premium Data Table (Span 3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Generated Reports</h3>
                <p className="text-sm text-slate-500">Download previous system reports</p>
              </div>
              <button className="text-xs text-slate-500 font-bold hover:text-slate-900 flex items-center gap-1 transition-colors">
                View Archive <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Report Name</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Format</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportHistory.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{report.name}</p>
                            <p className="text-[11px] font-medium text-slate-500">{report.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{report.date}</td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60">
                          {report.type} ({report.size})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                          report.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {report.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          disabled={report.status !== 'Completed'}
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded-lg shadow-sm"
                        >
                          <Download size={14} /> Download
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
    </>
  );
};

export default Reports;