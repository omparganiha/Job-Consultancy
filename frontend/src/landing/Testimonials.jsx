import React, { useState, useEffect } from "react";

// ─── MOCK DATA ───
const partners = [
  { id: 1, name: "TechNova IT", initials: "TN" },
  { id: 2, name: "Global Finance", initials: "GF" },
  { id: 3, name: "Apex Builders", initials: "AB" },
  { id: 4, name: "Sangeeta Sales", initials: "SS" },
  { id: 5, name: "Verma Fabrication", initials: "VF" },
  { id: 6, name: "Algo Trader", initials: "AT" },
  { id: 7, name: "DK RTO Services", initials: "DK" },
  { id: 8, name: "A&D Design Studio", initials: "AD" },
];

const successStories = [
  {
    id: "01",
    category: "IT SECTOR PLACEMENT",
    title: "Software Engineer at TechNova",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Helped Rahul secure a 12 LPA package as a Full Stack Developer. Complete interview prep provided.",
  },
  {
    id: "02",
    category: "MANAGEMENT ROLE",
    title: "HR Manager at Global Finance",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Placed Priya in a senior HR role within 15 days of registration. Seamless direct interview scheduling.",
  },
  {
    id: "03",
    category: "BULK HIRING",
    title: "Customer Support Team",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Provided a team of 20 trained support executives to Apex Builders for their new international campaign.",
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Very good service, genuine work, 100% satisfaction. Very experienced team members who guided me through every step.",
    name: "Akshat Agarwal",
    company: "PLACED AT SANGEETA SALES",
    rating: 5,
  },
  {
    id: 2,
    quote: "As an HR, finding right talent was tough. This consultancy provided us top 1% candidates in just 48 hours.",
    name: "Harish Sen",
    company: "HR, YASHVITECH",
    rating: 5,
  },
  {
    id: 3,
    quote: "Got my first IT job through them. The resume building session was an eye-opener. Thanks for constant support!",
    name: "Jitendra",
    company: "SDE AT TECHNOVA",
    rating: 5,
  },
  {
    id: 4,
    quote: "Professional team and quick response. They understood my requirements and got me hired within a week.",
    name: "Neha Sharma",
    company: "PLACED AT GLOBAL FINANCE",
    rating: 5,
  },
  {
    id: 5,
    quote: "Best consultancy in town. Transparent process and genuine job openings only. Highly recommended!",
    name: "Rohit Verma",
    company: "SDE AT ALGOTRADER",
    rating: 5,
  },
];

// ─── SVGs ───
const StarIcon = () => (
  <svg className="w-4 h-4 text-orange-500 fill-current drop-shadow-sm" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const QuoteWatermark = () => (
  <svg className="w-24 h-24 text-orange-500/5 fill-current transform -rotate-6" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

// Outline Arrow Button
const OutlineArrowBtn = ({ direction = "right", onClick }) => (
  <button
    onClick={onClick}
    className="w-14 h-14 rounded-full border-[1.5px] border-orange-300 bg-transparent text-orange-500 flex items-center justify-center transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white active:scale-95 group"
    aria-label={direction === "right" ? "Next" : "Previous"}
  >
    <svg
      className={`w-6 h-6 transition-transform duration-300 ${direction === "left" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

// ─── MAIN COMPONENT ───
const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const total = testimonials.length;
  const maxStart = Math.max(0, total - visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [maxStart]);

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + visibleCount
  );

  const displayCards =
    visibleTestimonials.length < visibleCount && total >= visibleCount
      ? [
          ...visibleTestimonials,
          ...testimonials.slice(0, visibleCount - visibleTestimonials.length),
        ]
      : visibleTestimonials;

  const partnerLoop = [...partners, ...partners];

  return (
    <div className="w-full font-sans bg-white text-slate-800 overflow-hidden">
      <style>{`
        ::-webkit-scrollbar {
          display: none !important;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 1.25rem;
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =========================================
          SECTION 1: PORTFOLIO / PLACEMENTS
          ========================================= */}
      <div className="py-16 px-4 md:px-8 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block border border-orange-200 bg-orange-50 rounded-full px-5 py-1.5 mb-4 shadow-sm">
              <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">
                ✦ Our Placements
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Transformations That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 italic">
                Speak Volumes.
              </span>
            </h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold">
              — Real Success Stories & Case Studies —
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold tracking-wider bg-orange-50 text-orange-600 px-3 py-1 rounded-md">
                      {story.category}
                    </span>
                    <span className="text-slate-300 font-black text-lg">#{story.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1">
                    {story.title}
                  </h3>
                  <div className="rounded-xl overflow-hidden mb-5 h-40 border border-slate-100">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">
                    {story.description}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-orange-600 font-bold text-xs tracking-wider uppercase group-hover:text-orange-700 w-fit">
                  Read Case Study
                  <span className="bg-orange-50 border border-orange-200 p-1.5 rounded-full text-[10px] group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    ➔
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 2: TESTIMONIALS — CENTERED HEADER
          ========================================= */}
      <div className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#FFFDF9] to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ✅ CENTERED HEADER */}
          <div className="mb-12 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 border border-orange-200 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-orange-500 text-[11px] font-bold tracking-widest uppercase">
                Client Voices
              </span>
            </div>

            <h2 className="text-3xl md:text-[2.75rem] leading-tight font-extrabold text-[#0f172a] mb-3 tracking-tight">
              What Our Clients{" "}
              <span className="text-orange-500 italic">Say About Us.</span>
            </h2>

            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mt-2">
              — Trusted By Industry Leaders & Candidates
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {displayCards.map((testi, index) => (
              <div
                key={`${testi.id}-${startIndex}-${index}`}
                className={`group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2
                  ${
                    index === 0
                      ? "border-2 border-orange-400 shadow-xl shadow-orange-100/60"
                      : "border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-300"
                  }`}
              >
                <div className="absolute top-4 right-6 pointer-events-none">
                  <QuoteWatermark />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testi.rating)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  <p className="text-slate-700 font-medium leading-relaxed mb-8 min-h-[96px] text-[15px]">
                    "{testi.quote}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-base">
                        {testi.name}
                      </h4>
                      <p className="text-orange-500 text-[11px] tracking-wider uppercase font-bold mt-0.5">
                        {testi.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons centered below cards */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <OutlineArrowBtn direction="left" onClick={handlePrev} />
            <OutlineArrowBtn direction="right" onClick={handleNext} />
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 3: TRUSTED PARTNERS
          ========================================= */}
      <div className="py-16 bg-white overflow-hidden border-t border-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center px-4 mb-10 text-center">
          <div className="inline-flex items-center gap-2 border border-orange-200 bg-orange-50 rounded-full px-5 py-1.5 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">
              Our Trusted Partners
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Companies That <span className="text-orange-600">Trust Us</span>
          </h3>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            We partner with enterprises, innovative startups, and global
            organizations to build the perfect bridge between talent and
            opportunity.
          </p>
        </div>

        {/* ✅ Height badhaya + upper overflow hide */}
        <div className="w-full relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

          <div className="marquee-track py-6">
            {partnerLoop.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 flex items-center gap-4 bg-white border border-slate-200/80 rounded-2xl px-6 py-5 min-w-[220px] hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                  {partner.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-800 text-sm font-bold whitespace-nowrap group-hover:text-orange-600 transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-slate-400 text-[10px] font-medium tracking-wide uppercase mt-0.5">
                    Partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center bg-slate-50 py-6 rounded-3xl border border-slate-100">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 mb-1">50+</span>
              <span className="text-[11px] text-orange-600 font-bold uppercase tracking-widest">
                Companies
              </span>
            </div>
            <div className="w-px h-10 bg-slate-200 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 mb-1">1200+</span>
              <span className="text-[11px] text-orange-600 font-bold uppercase tracking-widest">
                Placements
              </span>
            </div>
            <div className="w-px h-10 bg-slate-200 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 mb-1">98%</span>
              <span className="text-[11px] text-orange-600 font-bold uppercase tracking-widest">
                Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;