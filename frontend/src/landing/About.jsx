
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Target,
  TrendingUp,
  Handshake,
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Compass,
  FileText,
  Search,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Connect job seekers and providers through a clear, organized and reliable recruitment experience.",
    detail:
      "We aim to make job discovery, applications and recruitment workflows easier to understand and manage.",
  },
  {
    icon: HeartHandshake,
    title: "Our Approach",
    description:
      "Encourage meaningful connections, transparent communication and skills-focused opportunities.",
    detail:
      "We design workflows that help candidates and providers understand the next step in the hiring journey.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "Make career exploration and talent discovery more accessible and productive.",
    detail:
      "Our vision is a connected workspace where job opportunities and recruitment activity are easier to navigate.",
  },
];

const principles = [
  {
    icon: Users,
    title: "People first",
    text: "Keep the experience clear, useful and accessible for every user.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & clarity",
    text: "Encourage transparent information and structured recruitment.",
  },
  {
    icon: Zap,
    title: "Less friction",
    text: "Bring important job-search tasks into one connected workflow.",
  },
  {
    icon: TrendingUp,
    title: "Continuous growth",
    text: "Help people explore opportunities and build their professional journey.",
  },
];

const workflow = [
  {
    number: "01",
    icon: UserRoundIcon,
    title: "Create a profile",
    text: "Build a profile with your professional and contact information.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover opportunities",
    text: "Explore available jobs and review the requirements.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Apply & follow up",
    text: "Submit an application and follow its progress as updates become available.",
  },
];

function UserRoundIcon(props) {
  return <Users {...props} />;
}

function About() {
  const [activeValue, setActiveValue] = useState(0);

  const benefits = [
    "Explore opportunities and keep applications organized.",
    "Help providers publish jobs and review applicants.",
    "Bring job seekers and providers onto one platform.",
    "Create a more structured and convenient hiring journey.",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

        {/* COMPACT HERO */}
        <section className="relative overflow-hidden rounded-[26px] border border-orange-100 bg-white shadow-[0_18px_60px_-40px_rgba(249,115,22,0.35)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-100/80 blur-3xl" />

          <div className="relative grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-extrabold tracking-wider text-orange-700">
                <Sparkles size={15} /> GET TO KNOW US · JOBKHOJO
              </span>

              <h1 className="mt-5 max-w-xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
                People deserve better opportunities.
                <span className="mt-1 block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Let's build them.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                JobKhojo brings job seekers, job providers and recruitment
                workflows closer together — from discovering an opportunity
                to managing the hiring journey.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Discover Our Services <ArrowUpRight size={17} />
                </Link>
                <a
                  href="#our-story"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  Our Story <ArrowRight size={17} />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  People-first approach
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-500" />
                  Connected workflows
                </span>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-2xl sm:min-h-[330px]">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
                alt="Professionals collaborating at work"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Built around people
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/30 bg-white/95 p-4 shadow-xl sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Handshake size={23} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-orange-600">
                      THE JOBKHOJO BELIEF
                    </p>
                    <h2 className="mt-1.5 text-base font-extrabold text-slate-900 sm:text-lg">
                      The right connection can change a career.
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Better discovery. Clearer processes. More meaningful connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUR PRINCIPLES */}
        <section className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-orange-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/60"
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

        {/* STORY */}
        <section
          id="our-story"
          className="mb-12 grid scroll-mt-6 items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-orange-100 bg-white p-3 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85"
              alt="Team collaborating on a project"
              className="h-[260px] w-full rounded-[18px] object-cover sm:h-[340px]"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/70 bg-white/95 p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2.5 text-orange-600">
                  <Building2 size={22} />
                </div>
                <div>
                  <p className="text-sm font-extrabold">One connected platform</p>
                  <p className="mt-1 text-xs text-slate-500">
                    For seekers, providers and opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-black tracking-[0.2em] text-orange-600">
              OUR STORY
            </span>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Making the job journey feel simpler.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Finding a suitable job or the right candidate should not feel
              complicated. JobKhojo is designed to bring key recruitment
              activities together in one organized place.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Job seekers can explore opportunities and submit applications,
              while providers can organize job postings and review candidates.
              The goal is to make each step clearer and easier to manage.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "A clearer job discovery experience",
                "More organized recruitment workflows",
                "A shared space for seekers and providers",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-orange-500" />
                  <p className="text-sm font-semibold text-slate-700">{text}</p>
                </div>
              ))}
            </div>

            <Link
              to="/services"
              className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 transition hover:gap-3"
            >
              Explore how it works <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* MISSION / APPROACH / VISION */}
        <section className="mb-12 rounded-[26px] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-black tracking-[0.2em] text-orange-600">
              WHAT MATTERS TO US
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              The values behind JobKhojo.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              These principles shape how we think about people, opportunities
              and recruitment.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;
              const active = activeValue === index;
              return (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setActiveValue(index)}
                  aria-pressed={active}
                  className={`group rounded-2xl border p-5 text-left transition duration-300 sm:p-6 ${
                    active
                      ? "border-orange-300 bg-orange-50/70 shadow-lg shadow-orange-100/70"
                      : "border-slate-200 bg-white hover:border-orange-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                      active ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                    }`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-black text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                  <div className={`mt-5 flex items-center gap-1 text-xs font-bold ${
                    active ? "text-orange-600" : "text-slate-400"
                  }`}>
                    {active ? "Selected principle" : "Discover our approach"}
                    <ChevronRight size={15} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-[#fffaf5] p-4 sm:p-5">
            <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
              <Star size={20} />
            </div>
            <div>
              <p className="text-sm font-extrabold">{values[activeValue].title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {values[activeValue].detail}
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-12">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-black tracking-[0.2em] text-orange-600">
                HOW IT WORKS
              </span>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Three steps. One clear journey.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600">
              A simple overview of how a seeker can move from profile creation
              to applying for an opportunity.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.number}
                  className="relative rounded-2xl border border-orange-100 bg-white p-5 transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/50 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon size={23} />
                    </div>
                    <span className="text-2xl font-black text-orange-100">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-12 grid items-center gap-7 overflow-hidden rounded-[26px] border border-orange-100 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
          <div>
            <span className="text-xs font-black tracking-[0.2em] text-orange-600">
              WHY JOBKHOJO?
            </span>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
              A better experience for both sides.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Whether you're searching for your next opportunity or hiring
              your next team member, JobKhojo aims to make the process easier
              to navigate.
            </p>

            <div className="mt-6 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-orange-500" />
                  <p className="text-sm leading-6 text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              alt="Colleagues sharing ideas during a meeting"
              className="h-[270px] w-full object-cover sm:h-[340px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/30 bg-white/95 p-4">
              <p className="text-xs font-black tracking-widest text-orange-600">
                BUILT FOR CONNECTION
              </p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">
                Great careers start with a next step.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white shadow-xl shadow-orange-200/60 sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-black tracking-widest text-orange-50">
                YOUR NEXT STEP STARTS HERE
              </span>
              <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                Your next chapter starts here.
              </h2>
              <p className="mt-3 text-sm leading-6 text-orange-50 sm:text-base">
                Discover opportunities, build meaningful connections and move
                forward with confidence.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-black"
            >
              Explore Services <ArrowUpRight size={17} />
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

export default About;
