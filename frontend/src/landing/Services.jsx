
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, Building2, Check,
  CheckCircle2, ChevronRight, FileText, Gauge, Handshake,
  Lightbulb, Radar, Search, ShieldCheck, Sparkles, Target,
  TrendingUp, Users, UserRound, Zap, Award, BarChart3
} from "lucide-react";

const skills = ["React", "JavaScript", "HTML", "CSS", "Python", "SQL"];

const services = [
  {
    icon: Target,
    title: "Smart Recruitment",
    tag: "FOR EMPLOYERS",
    text: "Organize job openings, review applicants and manage recruitment in one place."
  },
  {
    icon: Search,
    title: "Intelligent Job Discovery",
    tag: "FOR SEEKERS",
    text: "Explore opportunities according to your interests, skills and career goals."
  },
  {
    icon: Radar,
    title: "Career Match Studio",
    tag: "SKILL INSIGHTS",
    text: "Compare your selected skills with a sample skill set and identify learning areas."
  },
  {
    icon: FileText,
    title: "Application Intelligence",
    tag: "TRACK PROGRESS",
    text: "Understand application stages and keep your job-search journey organized."
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Navigator",
    tag: "CAREER GROWTH",
    text: "Discover unselected skills and plan what you want to learn next."
  },
  {
    icon: ShieldCheck,
    title: "Trusted Hiring",
    tag: "PROVIDER TOOLS",
    text: "Support structured recruitment with company profiles and application reviews."
  }
];

const journey = [
  { title: "Applied", desc: "Your application is submitted.", icon: FileText },
  { title: "Under Review", desc: "The provider reviews your profile.", icon: Search },
  { title: "Interview", desc: "You move to the interview stage.", icon: Users },
  { title: "Decision", desc: "The provider shares a final decision.", icon: CheckCircle2 }
];

const highlights = [
  { icon: Radar, title: "Skill-led discovery", text: "Explore your professional strengths." },
  { icon: BarChart3, title: "Clear progress", text: "Understand the recruitment journey." },
  { icon: Lightbulb, title: "Actionable insights", text: "Find skills you could develop." },
  { icon: Handshake, title: "Connected workflows", text: "Bring seekers and providers together." }
];

function Services() {
  const [selectedSkills, setSelectedSkills] = useState([
    "React", "JavaScript", "HTML", "CSS"
  ]);
  const [activeStage, setActiveStage] = useState(1);
  const [workspace, setWorkspace] = useState("seeker");

  const matchScore = useMemo(
    () => Math.round((selectedSkills.length / skills.length) * 100),
    [selectedSkills]
  );

  const missingSkills = skills.filter(
    (skill) => !selectedSkills.includes(skill)
  );

  const toggleSkill = (skill) => {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_18px_60px_-35px_rgba(249,115,22,0.35)]">
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-orange-100 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-amber-50 blur-3xl" />

          <div className="relative grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-bold tracking-wider text-orange-700">
                <Sparkles size={15} /> JOBKHOJO · CAREER INTELLIGENCE
              </span>

              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Your next move,
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  made smarter.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Discover opportunities, explore your skills and follow your
                recruitment journey through one connected career workspace.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Explore Opportunities <ArrowUpRight size={18} />
                </Link>
                <a
                  href="#career-studio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  Try Career Studio <Radar size={17} />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  Seeker-friendly tools
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  Provider workflows
                </span>
              </div>
            </div>

            {/* LIVE DEMO CARD */}
            <div className="rounded-2xl border border-orange-100 bg-[#fffaf5] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-widest text-orange-600">
                    YOUR CAREER SNAPSHOT
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold">
                    Skills at a glance
                  </h2>
                </div>
                <div className="rounded-xl bg-orange-500 p-3 text-white shadow-lg shadow-orange-500/20">
                  <Gauge size={23} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-orange-100 bg-white p-4">
                  <p className="text-xs text-slate-500">Selected skills</p>
                  <p className="mt-2 text-3xl font-black">
                    {selectedSkills.length}
                    <span className="text-base font-semibold text-slate-400">
                      /{skills.length}
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-orange-600">
                    Skill selection
                  </p>
                </div>
                <div className="rounded-xl border border-orange-100 bg-white p-4">
                  <p className="text-xs text-slate-500">Demo coverage</p>
                  <p className="mt-2 text-3xl font-black">{matchScore}%</p>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    Updates instantly
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-orange-100 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">Skill coverage</span>
                  <span className="font-extrabold text-orange-600">
                    {matchScore}%
                  </span>
                </div>
                <div
                  className="mt-3 h-2.5 overflow-hidden rounded-full bg-orange-100"
                  role="progressbar"
                  aria-valuenow={matchScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Selected skill coverage"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${matchScore}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Illustrative demo based on the six skills listed below;
                  this is not an AI assessment or a hiring prediction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-orange-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={23} />
                </div>
                <h3 className="mt-4 text-sm font-extrabold">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>
              </article>
            );
          })}
        </section>

        {/* CAREER MATCH STUDIO */}
        <section
          id="career-studio"
          className="mb-12 scroll-mt-6 rounded-[26px] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="flex items-center gap-2 text-xs font-black tracking-widest text-orange-600">
                <Sparkles size={15} /> INTERACTIVE FEATURE
              </span>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Career Match Studio
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Select the skills you know and discover which skills from this
                sample list you may want to develop next.
              </p>
            </div>
            <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              INTERACTIVE DEMO
            </span>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-orange-100 bg-[#fffaf5] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-extrabold">Your skill set</h3>
                <span className="text-xs text-slate-500">Select all that apply</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleSkill(skill)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
                        active
                          ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-600"
                      }`}
                    >
                      {active && <Check size={15} />}
                      {skill}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-orange-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Skill coverage</span>
                  <span className="text-lg font-black text-orange-600">{matchScore}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-orange-100">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${matchScore}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Calculated from the selected demo skills, not from job listings
                  or a real candidate evaluation.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 p-5 text-white sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold">Your next steps</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Based on unselected skills
                  </p>
                </div>
              </div>

              {missingSkills.length ? (
                <>
                  <p className="mt-6 text-sm text-slate-300">
                    Skills to explore:
                  </p>
                  <div className="mt-3 space-y-2">
                    {missingSkills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                      >
                        <span className="text-sm font-semibold">{skill}</span>
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className="rounded-lg px-2 py-1 text-xs font-bold text-orange-300 transition hover:bg-white/10 hover:text-orange-200"
                        >
                          Add skill +
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <CheckCircle2 className="text-emerald-400" size={24} />
                  <p className="mt-2 font-bold">All demo skills selected!</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Explore jobs to compare your skills with actual requirements
                    once job data is connected.
                  </p>
                </div>
              )}

              <Link
                to="/jobs"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-orange-400"
              >
                Explore Jobs <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* APPLICATION JOURNEY */}
        <section className="mb-12 rounded-[26px] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-black tracking-widest text-orange-600">
                APPLICATION INTELLIGENCE
              </span>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Every stage, clearly mapped.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Select a stage to preview a simple application journey.
              </p>
            </div>
            <span className="w-fit rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700">
              Interactive preview
            </span>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((stage, index) => {
              const Icon = stage.icon;
              const active = activeStage === index;
              return (
                <button
                  key={stage.title}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveStage(index)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-orange-400 bg-orange-50 shadow-md shadow-orange-100"
                      : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      active ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600"
                    }`}>
                      <Icon size={21} />
                    </div>
                    <span className="text-xs font-black text-slate-400">
                      STEP 0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-extrabold">{stage.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{stage.desc}</p>
                  <div className={`mt-4 flex items-center gap-1 text-xs font-bold ${
                    active ? "text-orange-600" : "text-slate-400"
                  }`}>
                    {active ? "Selected stage" : "Preview stage"}
                    <ChevronRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-orange-600" />
            <div>
              <p className="text-sm font-extrabold">{journey[activeStage].title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {journey[activeStage].desc} Actual application status will depend
                on the connected backend and provider updates.
              </p>
            </div>
          </div>
        </section>

        {/* SEEKER / EMPLOYER WORKSPACE */}
        <section className="mb-12 rounded-[26px] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="text-center">
            <span className="text-xs font-black tracking-widest text-orange-600">
              ONE PLATFORM, TWO WORKFLOWS
            </span>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Designed around your work.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Switch between seeker and provider tools to preview both experiences.
            </p>
          </div>

          <div className="mx-auto mt-7 flex max-w-md rounded-xl bg-slate-100 p-1.5">
            {[
              { id: "seeker", label: "Job Seeker", icon: UserRound },
              { id: "employer", label: "Provider", icon: Building2 }
            ].map((item) => {
              const Icon = item.icon;
              const active = workspace === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setWorkspace(item.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-bold transition ${
                    active ? "bg-white text-orange-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon size={17} /> {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(workspace === "seeker"
              ? [
                  { icon: Search, title: "Discover opportunities", text: "Browse roles and explore career options." },
                  { icon: FileText, title: "Track applications", text: "Review application progress in one place." },
                  { icon: TrendingUp, title: "Build your profile", text: "Identify skills you want to strengthen." }
                ]
              : [
                  { icon: BriefcaseBusiness, title: "Manage job openings", text: "Organize vacancies and role requirements." },
                  { icon: Users, title: "Review applicants", text: "Structure candidate screening and evaluation." },
                  { icon: Gauge, title: "Monitor recruitment", text: "Review progress across hiring stages." }
                ]
            ).map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 p-5 transition hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Explore Opportunities <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="our-services" className="mb-12 scroll-mt-6">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-black tracking-widest text-orange-600">
                THE PLATFORM TOOLKIT
              </span>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Tools for your next big move.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Practical recruitment and career tools for a more organized experience.
              </p>
            </div>
            <span className="flex w-fit items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-bold text-slate-600">
              <Zap size={15} className="text-orange-500" /> SIX CORE SERVICES
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group rounded-2xl border border-orange-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                      <Icon size={23} />
                    </div>
                    <span className="text-sm font-black text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-6 text-[10px] font-black tracking-widest text-orange-600">
                    {service.tag}
                  </p>
                  <h3 className="mt-2 text-lg font-extrabold transition group-hover:text-orange-600">
                    {service.title}
                  </h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {service.text}
                  </p>
                  <a
                    href="#career-studio"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-orange-600"
                  >
                    Explore feature
                    <ArrowUpRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 p-6 text-white shadow-xl shadow-orange-200/60 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-black tracking-widest text-orange-50">
                YOUR NEXT CHAPTER STARTS HERE
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                Turn your next opportunity into progress.
              </h2>
              <p className="mt-3 text-sm leading-6 text-orange-50">
                Explore available jobs and take the next step in your professional journey.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-black"
            >
              Browse Jobs <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          JobKhojo · Connecting talent, opportunities and possibilities.
        </footer>
      </div>
    </main>
  );
}

export default Services;
