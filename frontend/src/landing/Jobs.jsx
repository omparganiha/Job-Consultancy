import { useMemo, useState } from 'react';

// ---------- Data ----------
const JOBS = [
  { 
    id: 1, 
    title: 'Senior React Developer', 
    company: 'TechFlow Inc.',
    location: 'San Francisco, CA', 
    type: 'Full-time',
    experienceLevel: 'Senior',
    salary: '$140K - $180K',
    postedAt: '2 days ago',
    isFeatured: true,
    skills: ['React', 'TypeScript', 'Node.js'],
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&auto=format&fit=crop&q=60' 
  },
  { 
    id: 2, 
    title: 'Data & Analytics Consultant', 
    company: 'DataCorp',
    location: 'New York, NY', 
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: '$120K - $150K',
    postedAt: '1 day ago',
    isFeatured: false,
    skills: ['SQL', 'Python', 'Tableau'],
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60'
  },
  { 
    id: 3, 
    title: 'Change Management Specialist', 
    company: 'Enterprise Solutions',
    location: 'Remote', 
    type: 'Remote',
    experienceLevel: 'Lead',
    salary: '$80 - $100 / hr',
    postedAt: '3 days ago',
    isFeatured: false,
    skills: ['ADKAR', 'HR', 'Strategy'],
    logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&auto=format&fit=crop&q=60'
  },
  { 
    id: 4, 
    title: 'Financial Advisory Associate', 
    company: 'Capital Partners',
    location: 'Berlin, Germany', 
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: '€70K - €90K',
    postedAt: '5 hours ago',
    isFeatured: true,
    skills: ['M&A', 'Finance', 'Valuation'],
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&auto=format&fit=crop&q=60'
  },
  { 
    id: 5, 
    title: 'Healthcare Consultant', 
    company: 'MedTech Advise',
    location: 'Singapore', 
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: '$90K - $120K',
    postedAt: '1 week ago',
    isFeatured: false,
    skills: ['Healthcare', 'Operations'],
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&auto=format&fit=crop&q=60'
  },
  { 
    id: 6, 
    title: 'Marketing & Brand Analyst', 
    company: 'BrandWorks',
    location: 'London, UK', 
    type: 'Part-time',
    experienceLevel: 'Entry Level',
    salary: '£35K - £45K',
    postedAt: '4 days ago',
    isFeatured: false,
    skills: ['Marketing', 'Analytics'],
    logo: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=100&auto=format&fit=crop&q=60'
  },
];

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract'];
const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'];
const LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Berlin, Germany', 'Singapore', 'London, UK', 'Remote'];

export default function Jobs() {
  // State
  const [keyword, setKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Helpers
  const toggleArrayFilter = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearFilters = () => {
    setKeyword('');
    setSelectedLocation('');
    setSelectedTypes([]);
    setSelectedLevels([]);
  };

  // Filtering Logic
  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return JOBS.filter((job) => {
      const matchesKeyword = k === '' || 
        job.title.toLowerCase().includes(k) ||
        job.company.toLowerCase().includes(k) ||
        job.skills.some(s => s.toLowerCase().includes(k));

      const matchesLocation = selectedLocation === '' || job.location === selectedLocation;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(job.experienceLevel);

      return matchesKeyword && matchesLocation && matchesType && matchesLevel;
    });
  }, [keyword, selectedLocation, selectedTypes, selectedLevels]);

  const handleApply = (title) => {
    alert(`Application started for: ${title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
      
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Open positions
        </h1>
        <p className="text-sm md:text-base text-slate-600">
          Explore current opportunities and join our network of consultants.
        </p>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative">
        
        {/* Mobile Filter Toggle Button */}
        <div className="w-full lg:hidden sticky top-0 z-10 bg-slate-50/90 backdrop-blur pb-2 pt-2 -mt-2">
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex w-full items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* ================= SIDEBAR FILTERS ================= */}
        <aside className={`w-full lg:w-72 flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 lg:sticky lg:top-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            <button 
              onClick={clearFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Reset
            </button>
          </div>

          {/* Keyword */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Keyword</label>
            <input
              type="text"
              placeholder="Search jobs..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Location</label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="">Any location</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Type */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Job Type</label>
            <div className="space-y-2.5">
              {JOB_TYPES.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleArrayFilter(type, selectedTypes, setSelectedTypes)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">Experience Level</label>
            <div className="space-y-2.5">
              {EXPERIENCE_LEVELS.map(level => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => toggleArrayFilter(level, selectedLevels, setSelectedLevels)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= JOB LISTINGS ================= */}
        <main className="flex-1 w-full min-w-0">
          
          {/* Result Summary */}
          <div className="mb-4 text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> results
          </div>

          <div className="flex flex-col gap-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                No positions found. Try adjusting your filters.
              </div>
            ) : (
              filtered.map((job) => (
                <article
                  key={job.id}
                  className="relative bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5"
                >
                  {/* Featured Badge */}
                  {job.isFeatured && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-2xl">
                      Featured
                    </div>
                  )}

                  {/* Top Section: Logo + Title + Info */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img 
                      src={job.logo} 
                      alt={job.company} 
                      className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover bg-slate-50 border border-slate-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-12 sm:pr-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        {job.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mb-2.5">
                        {job.company}
                      </p>

                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salary}
                        </span>
                        <span className="whitespace-nowrap">{job.postedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Skills + Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Job Type & Apply */}
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        {job.type}
                      </span>
                      
                      <button
                        onClick={() => handleApply(job.title)}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}