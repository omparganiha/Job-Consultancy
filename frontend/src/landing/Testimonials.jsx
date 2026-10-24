import React, { useState, useEffect, useCallback } from "react";

// ─── MOCK DATA ───
const partners = [
  { id: 1, name: "TechNova IT", initials: "TN", color: "from-violet-500 to-indigo-600" },
  { id: 2, name: "Global Finance", initials: "GF", color: "from-emerald-500 to-teal-600" },
  { id: 3, name: "Apex Builders", initials: "AB", color: "from-amber-500 to-orange-500" },
  { id: 4, name: "Sangeeta Sales", initials: "SS", color: "from-rose-500 to-pink-600" },
  { id: 5, name: "Verma Fabrication", initials: "VF", color: "from-cyan-500 to-blue-600" },
  { id: 6, name: "Algo Trader", initials: "AT", color: "from-fuchsia-500 to-purple-600" },
  { id: 7, name: "DK RTO Services", initials: "DK", color: "from-lime-500 to-green-600" },
  { id: 8, name: "A&D Design Studio", initials: "AD", color: "from-orange-500 to-red-600" },
];

const successStories = [
  {
    id: "01",
    category: "IT SECTOR",
    title: "Software Engineer at TechNova",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Helped Rahul secure a 12 LPA package as a Full Stack Developer. Complete interview prep provided.",
    stat: "12 LPA",
    statLabel: "Package Secured",
  },
  {
    id: "02",
    category: "MANAGEMENT",
    title: "HR Manager at Global Finance",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Placed Priya in a senior HR role within 15 days of registration. Seamless direct interview scheduling.",
    stat: "15 Days",
    statLabel: "Quick Placement",
  },
  {
    id: "03",
    category: "BULK HIRING",
    title: "Customer Support Team",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Provided a team of 20 trained support executives to Apex Builders for their new international campaign.",
    stat: "20+",
    statLabel: "Team Members",
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Very good service, genuine work, 100% satisfaction. Very experienced team members who guided me through every step of the journey.",
    name: "om",
    company: "Placed at Sangeeta Sales",
    role: "Sales Executive",
    rating: 5,
    avatar: "AA",
  },
  {
    id: 2,
    quote: "As an HR, finding right talent was tough. This consultancy provided us top 1% candidates in just 48 hours. Absolutely remarkable!",
    name: "chandni",
    company: "HR, YashviTech",
    role: "Human Resources",
    rating: 5,
    avatar: "HS",
  },
  {
    id: 3,
    quote: "Got my first IT job through them. The resume building session was an eye-opener. Thanks for the constant support and guidance!",
    name: "nishu",
    company: "SDE at TechNova",
    role: "Software Developer",
    rating: 5,
    avatar: "JK",
  },
  {
    id: 4,
    quote: "Professional team and quick response. They understood my requirements perfectly and got me hired within just a single week.",
    name: "Neha Sharma",
    company: "Placed at Global Finance",
    role: "Finance Analyst",
    rating: 5,
    avatar: "NS",
  },
  {
    id: 5,
    quote: "Best consultancy in town. Transparent process and genuine job openings only. Highly recommended to every job seeker out there!",
    name: "Rohit Verma",
    company: "SDE at AlgoTrader",
    role: "Backend Engineer",
    rating: 5,
    avatar: "RV",
  },
];

// ─── ICON COMPONENTS ───
const StarIcon = ({ filled = true }) => (
  <svg className={`w-4 h-4 ${filled ? "text-[#F97316]" : "text-slate-200"} fill-current`} viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const QuoteIcon = ({ className = "" }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24" width="32" height="32">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const ArrowIcon = ({ direction = "right", className = "" }) => (
  <svg className={`transition-transform duration-300 ${direction === "left" ? "rotate-180" : ""} ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CheckBadge = () => (
  <svg className="w-[18px] h-[18px] text-[#10B981] fill-current" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path fill="#fff" d="M10 15.17l-3.59-3.58L5 13l5 5 9-9-1.41-1.42z" />
  </svg>
);

// ─── NAVIGATION BUTTON ───
const NavButton = ({ direction = "right", onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95
      ${direction === "right"
        ? "bg-[#F97316] text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_12px_25px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
        : "bg-white border border-slate-200 text-slate-500 hover:border-[#F97316] hover:text-[#F97316] hover:-translate-y-0.5"
      }`}
    aria-label={direction === "right" ? "Next" : "Previous"}
  >
    <ArrowIcon direction={direction} className="w-5 h-5" />
  </button>
);

// ─── MAIN COMPONENT ───
const Testimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = testimonials.length;

  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === "next") {
        setActiveTestimonial((prev) => (prev + 1) % total);
      } else {
        setActiveTestimonial((prev) => (prev - 1 + total) % total);
      }
      setIsAnimating(false);
    }, 280);
  }, [isAnimating, total]);

  useEffect(() => {
    const timer = setInterval(() => navigate("next"), 3000);
    return () => clearInterval(timer);
  }, [navigate]);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeTestimonial + i + total) % total;
      cards.push({ ...testimonials[index], position: i });
    }
    return cards;
  };

  const partnerLoop = [...partners, ...partners, ...partners];

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-800 overflow-hidden">
      <style>{`
        * { -ms-overflow-style: none; scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-inner:hover { animation-play-state: paused; }
        
        .mesh-gradient {
          background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.05) 0%, transparent 70%);
        }
      `}</style>

      {/* ═══════════════════════════════════════════
          SECTION 1 — TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 mb-5 shadow-sm border border-[#F97316]/10">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span className="text-[#F97316] text-[11px] font-bold tracking-[0.2em] uppercase">
                Client Testimonials
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-[1.1]">
              Voices That{" "}
              <span className="relative inline-block text-[#F97316]">
                Inspire Trust
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="text-slate-500 text-[15px] max-w-lg mx-auto font-medium">
              Real stories from real people who transformed their careers with our guidance
            </p>
          </div>

          <div className="relative flex items-center justify-center gap-3 md:gap-5 min-h-[340px] mb-10 px-2">
            {getVisibleCards().map((testi) => {
              const isCenter = testi.position === 0;
              
              return (
                <div
                  key={`${testi.id}-${testi.position}`}
                  className={`relative transition-all duration-300 ease-out flex-shrink-0
                    ${isCenter
                      ? "w-full max-w-[380px] md:max-w-[420px] scale-100 opacity-100 z-30"
                      : "w-full max-w-[300px] md:max-w-[340px] scale-[0.92] opacity-70 z-10 hidden md:block cursor-pointer hover:opacity-90 hover:scale-[0.95]"
                    }`}
                  onClick={() => !isCenter && navigate(testi.position === -1 ? "prev" : "next")}
                >
                  <div
                    className={`relative bg-white rounded-3xl p-7 md:p-8 flex flex-col h-full transition-all duration-300
                      ${isCenter
                        ? "shadow-[0_25px_50px_-12px_rgba(249,115,22,0.2)] border-2 border-orange-200 ring-4 ring-orange-500/10"
                        : "shadow-md border border-slate-200/80"
                      }`}
                  >
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 rounded-t-full bg-[#F97316] transition-all duration-300
                        ${isCenter ? "w-20 opacity-100" : "w-0 opacity-0"}`}
                    />

                    <div className="absolute top-5 right-5">
                      <QuoteIcon
                        className={`w-9 h-9 transition-colors duration-300 ${
                          isCenter ? "text-[#F97316]/15" : "text-slate-100"
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} filled={i < testi.rating} />
                        ))}
                      </div>
                      <span className={`font-bold text-xs ml-1 ${isCenter ? "text-slate-500" : "text-slate-400"}`}>
                        5.0
                      </span>
                    </div>

                    <p
                      className={`font-medium leading-relaxed mb-7 flex-1 text-[14px] md:text-[15px]
                        ${isCenter ? "text-slate-700" : "text-slate-600"}`}
                    >
                      "{testi.quote}"
                    </p>

                    <div className="flex items-center gap-3.5 mt-auto">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300
                          ${isCenter
                            ? "bg-[#F97316] text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)]"
                            : "bg-orange-50 text-[#F97316] border border-orange-100"
                          }`}
                      >
                        {testi.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4
                            className={`font-bold text-[14px] transition-colors duration-300 ${
                              isCenter ? "text-slate-900" : "text-slate-700"
                            }`}
                          >
                            {testi.name}
                          </h4>
                          <CheckBadge />
                        </div>
                        <p
                          className={`text-[10px] tracking-wider uppercase font-bold mt-0.5 transition-colors duration-300
                            ${isCenter ? "text-[#F97316]" : "text-slate-400"}`}
                        >
                          {testi.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-2">
            <NavButton direction="left" onClick={() => navigate("prev")} />

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveTestimonial(i);
                      setIsAnimating(false);
                    }, 280);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeTestimonial
                      ? "w-8 h-2.5 bg-[#F97316] shadow-[0_2px_8px_rgba(249,115,22,0.4)]"
                      : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <NavButton direction="right" onClick={() => navigate("next")} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — SUCCESS STORIES
          ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white relative">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FFF6EF] rounded-full px-4 py-1.5 mb-4 border border-[#FFE8D6]">
                <span className="text-[#F97316] text-[10px] leading-none pb-[1px]">◆</span>
                <span className="text-[#F97316] text-[10px] font-black tracking-[0.2em] uppercase">
                  Success Stories
                </span>
              </div>
              
              <h2 className="text-4xl md:text-[2.75rem] font-black text-[#0B1A28] tracking-tight leading-[1.1]">
                Real Results, <span className="text-[#F97316]">Real Impact.</span>
              </h2>
            </div>
            
            <div className="md:max-w-sm md:text-right">
              <p className="text-slate-400 text-[14px] leading-relaxed">
                Every placement tells a story of transformation. Here are some of our proudest moments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="group flex flex-col bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 hover:border-[#F97316]/80 transition-all duration-300 shadow-sm hover:shadow-[0_15px_35px_-10px_rgba(249,115,22,0.15)] cursor-pointer"
              >
                <div className="relative h-[180px] w-full overflow-hidden bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A28]/70 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-[#F97316] text-[15px] font-black leading-none mb-0.5">
                      {story.stat}
                    </span>
                    <span className="text-slate-400 text-[8px] font-bold uppercase tracking-[0.1em] leading-none">
                      {story.statLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <div className="bg-[#1A202C]/70 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/10">
                      {story.category}
                    </div>
                  </div>

                  <div className="absolute -bottom-2 right-3">
                    <span className="text-white/25 font-black text-[4.5rem] leading-none tracking-tighter mix-blend-overlay">
                      {story.id}
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-[16px] font-bold text-slate-800 mb-2.5 group-hover:text-[#F97316] transition-colors duration-300">
                    {story.title}
                  </h3>
                  
                  <p className="text-slate-500 text-[13px] leading-[1.6] mb-5 flex-1 line-clamp-3">
                    {story.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2.5">
                    <span className="text-[#F97316] text-[11px] font-black tracking-widest uppercase">
                      View Details
                    </span>
                    
                    <div className="w-6 h-6 rounded-full border border-[#F97316]/40 flex items-center justify-center group-hover:bg-[#F97316] group-hover:border-[#F97316] transition-all duration-300">
                      <ArrowIcon className="w-3 h-3 text-[#F97316] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — TRUSTED PARTNERS (stats removed)
          ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-5 shadow-sm border border-orange-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F97316]" />
              </span>
              <span className="text-[#F97316] text-[11px] font-bold tracking-[0.2em] uppercase">
                Our Network
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Partnered With The{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  Best
                </span>
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 120 8" fill="none">
                  <path d="M2 6C20 2 40 1 60 3C80 5 100 2 118 5" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>
            </h2>
            <p className="text-slate-500 text-[15px] max-w-md mx-auto leading-relaxed">
              Building bridges between exceptional talent and industry-leading organizations
            </p>
          </div>

          {/* Marquee only */}
          <div className="relative py-2">
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

            <div className="marquee-inner py-3">
              {partnerLoop.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 flex items-center gap-4 bg-white/90 backdrop-blur-sm border border-slate-200/70 rounded-2xl px-5 py-4 mx-3 min-w-[250px]
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_12px_32px_-8px_rgba(249,115,22,0.18)]
                    hover:border-orange-200 hover:-translate-y-1.5
                    transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${partner.color} blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 scale-110`} />
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} text-white flex items-center justify-center font-bold text-sm shadow-md
                      group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                      {partner.initials}
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-800 text-[15px] font-bold whitespace-nowrap group-hover:text-[#F97316] transition-colors duration-300">
                      {partner.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-400 text-[10px] font-bold tracking-[0.12em] uppercase">
                        Hiring Partner
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Testimonial;