import React from "react";

function Services() {
  const services = [
    {
      icon: "🎯",
      title: "Smart Recruitment",
      text: "Find the right talent faster with a streamlined recruitment process designed for modern businesses.",
      tag: "FOR EMPLOYERS",
    },
    {
      icon: "💼",
      title: "Job Placement",
      text: "Discover relevant job opportunities that align with your skills, experience and career goals.",
      tag: "FOR CANDIDATES",
    },
    {
      icon: "📄",
      title: "Professional Profiles",
      text: "Showcase your qualifications, experience and strengths through a polished professional profile.",
      tag: "CAREER PROFILE",
    },
    {
      icon: "🚀",
      title: "Career Development",
      text: "Move forward with better career planning, interview preparation and job-search guidance.",
      tag: "GROWTH",
    },
    {
      icon: "🏢",
      title: "Employer Solutions",
      text: "Manage company information, publish job openings and organize candidate applications efficiently.",
      tag: "BUSINESS TOOLS",
    },
    {
      icon: "📊",
      title: "Application Tracking",
      text: "Keep applications organized and follow recruitment progress from one convenient workspace.",
      tag: "PRODUCTIVITY",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Build Your Profile",
      text: "Create your account and present your professional information.",
    },
    {
      number: "02",
      icon: "🔎",
      title: "Explore Opportunities",
      text: "Find suitable jobs or connect with potential candidates.",
    },
    {
      number: "03",
      icon: "🤝",
      title: "Make Connections",
      text: "Apply, connect and move closer to your professional goals.",
    },
  ];

  const s = {
    page: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      background: "#F5F7FB",
      color: "#172B4D",
      minHeight: "100vh",
      padding: "24px",
      boxSizing: "border-box",
      scrollBehavior: "smooth",
    },

    container: {
      maxWidth: "1400px",
      margin: "0 auto",
    },

    hero: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
      alignItems: "center",
      gap: "35px",
      padding: "clamp(26px, 4vw, 55px)",
      borderRadius: "24px",
      background:
        "linear-gradient(120deg, #FFFFFF 0%, #FFF7EF 55%, #FFE4CC 100%)",
      border: "1px solid #FFE0C2",
      boxShadow: "0 15px 40px rgba(23,43,77,0.06)",
      overflow: "hidden",
      position: "relative",
    },

    eyebrow: {
      display: "inline-block",
      color: "#F56600",
      fontSize: "11px",
      fontWeight: "800",
      letterSpacing: "2px",
      marginBottom: "12px",
    },

    title: {
      fontSize: "clamp(36px, 4.2vw, 59px)",
      fontWeight: "850",
      lineHeight: 1.12,
      letterSpacing: "-1.8px",
      margin: "12px 0 20px",
      color: "#172B4D",
    },

    highlight: {
      color: "#FF6B00",
    },

    paragraph: {
      color: "#66758C",
      fontSize: "15px",
      lineHeight: 1.9,
      maxWidth: "570px",
      margin: "0 0 25px",
    },

    button: {
      display: "inline-block",
      background: "linear-gradient(135deg, #FF7900, #FF5B00)",
      color: "#FFFFFF",
      padding: "15px 22px",
      borderRadius: "11px",
      textDecoration: "none",
      fontSize: "13px",
      fontWeight: "800",
      boxShadow: "0 9px 22px rgba(255,107,0,0.23)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },

    note: {
      display: "block",
      marginTop: "17px",
      color: "#77849A",
      fontSize: "12px",
    },

    imageWrap: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "20px",
      minWidth: 0,
      boxShadow: "0 20px 40px rgba(23,43,77,0.17)",
      background: "#E4EAF2",
    },

    image: {
      display: "block",
      width: "100%",
      height: "clamp(260px, 30vw, 360px)",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },

    imageOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(0deg, rgba(23,43,77,0.75), transparent 65%)",
      pointerEvents: "none",
    },

    imageCaption: {
      position: "absolute",
      left: "16px",
      right: "16px",
      bottom: "16px",
      padding: "15px",
      borderRadius: "13px",
      background: "rgba(255,255,255,0.94)",
      color: "#172B4D",
      fontSize: "13px",
      fontWeight: "800",
      boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
    },

    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
      gap: "16px",
      margin: "22px 0 65px",
    },

    stat: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "20px",
      borderRadius: "16px",
      background: "#FFFFFF",
      border: "1px solid #E5EAF2",
      boxShadow: "0 5px 18px rgba(23,43,77,0.035)",
    },

    statIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: "48px",
      height: "48px",
      borderRadius: "13px",
      background: "#FFF0E2",
      fontSize: "23px",
    },

    statTitle: {
      fontSize: "16px",
      fontWeight: "800",
      marginBottom: "5px",
      color: "#172B4D",
    },

    statText: {
      fontSize: "12px",
      lineHeight: 1.6,
      color: "#758198",
    },

    section: {
      scrollMarginTop: "25px",
      marginBottom: "65px",
    },

    sectionHeader: {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "18px",
      marginBottom: "28px",
    },

    sectionTitle: {
      color: "#172B4D",
      fontSize: "clamp(28px, 3.4vw, 40px)",
      fontWeight: "850",
      letterSpacing: "-1px",
      lineHeight: 1.2,
      margin: "10px 0",
    },

    sectionText: {
      maxWidth: "650px",
      color: "#718096",
      fontSize: "14px",
      lineHeight: 1.85,
      margin: 0,
    },

    pill: {
      background: "#FFF0E2",
      color: "#E65F00",
      border: "1px solid #FFD9BC",
      borderRadius: "30px",
      padding: "10px 15px",
      fontSize: "11px",
      fontWeight: "800",
      whiteSpace: "nowrap",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
      gap: "20px",
    },

    card: {
      background: "#FFFFFF",
      border: "1px solid #E4EAF2",
      borderRadius: "18px",
      padding: "25px",
      minHeight: "250px",
      boxSizing: "border-box",
      boxShadow: "0 6px 20px rgba(23,43,77,0.035)",
      transition:
        "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
    },

    cardTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "22px",
    },

    cardIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "57px",
      height: "57px",
      borderRadius: "15px",
      background: "#FFF0E2",
      fontSize: "26px",
    },

    cardNumber: {
      color: "#D1D9E5",
      fontSize: "15px",
      fontWeight: "800",
    },

    cardTitle: {
      color: "#172B4D",
      fontSize: "19px",
      fontWeight: "800",
      margin: "0 0 12px",
    },

    cardText: {
      color: "#718096",
      fontSize: "13px",
      lineHeight: 1.85,
      margin: "0 0 22px",
    },

    cardFooter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      borderTop: "1px solid #EDF0F5",
      paddingTop: "15px",
    },

    cardTag: {
      color: "#E65F00",
      fontSize: "10px",
      fontWeight: "800",
      letterSpacing: "0.8px",
    },

    arrow: {
      color: "#FF6B00",
      fontSize: "21px",
      fontWeight: "800",
    },

    process: {
      padding: "clamp(24px, 4vw, 40px)",
      borderRadius: "22px",
      background: "#FFFFFF",
      border: "1px solid #E5EAF2",
      boxShadow: "0 8px 25px rgba(23,43,77,0.035)",
    },

    steps: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
      gap: "18px",
      marginTop: "30px",
    },

    step: {
      background: "#F8FAFD",
      border: "1px solid #E7ECF4",
      borderRadius: "16px",
      padding: "23px",
      transition: "transform 0.25s ease, border-color 0.25s ease",
    },

    stepIcon: {
      fontSize: "26px",
      marginBottom: "18px",
    },

    stepNumber: {
      display: "block",
      color: "#FF6B00",
      fontSize: "11px",
      fontWeight: "900",
      letterSpacing: "1px",
      marginBottom: "9px",
    },

    stepTitle: {
      color: "#172B4D",
      fontSize: "17px",
      fontWeight: "800",
      margin: "0 0 10px",
    },

    stepText: {
      color: "#718096",
      fontSize: "13px",
      lineHeight: 1.8,
      margin: 0,
    },

    cta: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "25px",
      padding: "clamp(25px, 4vw, 42px)",
      borderRadius: "22px",
      color: "#FFFFFF",
      background:
        "radial-gradient(circle at 90% 0%, rgba(255,107,0,0.25), transparent 32%), linear-gradient(120deg, #172B4D, #263F61)",
      boxShadow: "0 15px 35px rgba(23,43,77,0.15)",
    },

    ctaTitle: {
      fontSize: "clamp(25px, 3vw, 35px)",
      fontWeight: "850",
      lineHeight: 1.25,
      margin: "0 0 12px",
    },

    ctaText: {
      color: "#D5DFEC",
      maxWidth: "650px",
      fontSize: "14px",
      lineHeight: 1.85,
      margin: 0,
    },

    footer: {
      textAlign: "center",
      color: "#8792A5",
      fontSize: "12px",
      padding: "30px 10px 10px",
    },
  };

  const cardEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-7px)";
    e.currentTarget.style.boxShadow = "0 18px 36px rgba(23,43,77,0.11)";
    e.currentTarget.style.borderColor = "#FFC28F";
  };

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(23,43,77,0.035)";
    e.currentTarget.style.borderColor = "#E4EAF2";
  };

  const buttonEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 13px 27px rgba(255,107,0,0.32)";
  };

  const buttonLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 9px 22px rgba(255,107,0,0.23)";
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* HERO */}
        <section style={s.hero}>
          <div>
            <span style={s.eyebrow}>✦ JOBERP · CAREER & RECRUITMENT</span>

            <h1 style={s.title}>
              Better Talent.
              <br />
              Better Careers.
              <br />
              <span style={s.highlight}>Better Together.</span>
            </h1>

            <p style={s.paragraph}>
              A smarter way to connect ambitious professionals with the
              right opportunities and help businesses build stronger teams.
              Everything you need to move forward, in one place.
            </p>

            <a
              href="/dashboard/browsejobs"
              style={s.button}
              onMouseEnter={buttonEnter}
              onMouseLeave={buttonLeave}
            >
              Explore Opportunities&nbsp; ↗
            </a>

            <span style={s.note}>
              ✨ &nbsp; One platform for candidates and employers
            </span>
          </div>

          <div
            style={s.imageWrap}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1.045)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
              alt="Professionals working together in a modern office"
              style={s.image}
            />
            <div style={s.imageOverlay} />
            <div style={s.imageCaption}>
              ✨ &nbsp; Connecting people with possibilities
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section style={s.stats}>
          {[
            ["🎯", "Smart Hiring", "A clearer recruitment process"],
            ["🤝", "Stronger Connections", "Candidates meet employers"],
            ["📈", "Career Growth", "Focus on your next step"],
            ["⚡", "Less Complexity", "Organized application tracking"],
          ].map(([icon, title, text]) => (
            <div key={title} style={s.stat} onMouseEnter={cardEnter} onMouseLeave={cardLeave}>
              <div style={s.statIcon}>{icon}</div>
              <div>
                <div style={s.statTitle}>{title}</div>
                <div style={s.statText}>{text}</div>
              </div>
            </div>
          ))}
        </section>

        {/* SERVICES */}
        <section id="our-services" style={s.section}>
          <div style={s.sectionHeader}>
            <div>
              <span style={s.eyebrow}>WHAT WE BRING TO THE TABLE</span>
              <h2 style={s.sectionTitle}>
                Services designed for
                <br />
                your next big move.
              </h2>
              <p style={s.sectionText}>
                Practical recruitment and career services that help job seekers
                take the next step and employers find the right people.
              </p>
            </div>

            <span style={s.pill}>✦ &nbsp; OUR CORE SERVICES</span>
          </div>

          <div style={s.grid}>
            {services.map((service, index) => (
              <article
                key={service.title}
                style={s.card}
                onMouseEnter={cardEnter}
                onMouseLeave={cardLeave}
              >
                <div style={s.cardTop}>
                  <div style={s.cardIcon}>{service.icon}</div>
                  <span style={s.cardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 style={s.cardTitle}>{service.title}</h3>
                <p style={s.cardText}>{service.text}</p>

                <div style={s.cardFooter}>
                  <span style={s.cardTag}>{service.tag}</span>
                  <span style={s.arrow}>↗</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="how-it-works" style={{ ...s.section, ...s.process }}>
          <div style={{ textAlign: "center" }}>
            <span style={s.eyebrow}>A SIMPLE WAY FORWARD</span>
            <h2 style={s.sectionTitle}>From discovery to opportunity.</h2>
            <p style={{ ...s.sectionText, margin: "0 auto" }}>
              A straightforward process that keeps your next step clear.
            </p>
          </div>

          <div style={s.steps}>
            {steps.map((step) => (
              <article
                key={step.number}
                style={s.step}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "#FFC28F";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#E7ECF4";
                }}
              >
                <div style={s.stepIcon}>{step.icon}</div>
                <span style={s.stepNumber}>STEP {step.number}</span>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepText}>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={s.cta}>
          <div>
            <h2 style={s.ctaTitle}>Your next chapter starts here.</h2>
            <p style={s.ctaText}>
              Explore opportunities, meet the right people and make your next
              career move with confidence.
            </p>
          </div>

          <a
            href="/dashboard/browsejobs"
            style={s.button}
            onMouseEnter={buttonEnter}
            onMouseLeave={buttonLeave}
          >
            Get Started&nbsp; ↗
          </a>
        </section>

        <footer style={s.footer}>
          JobERP · Connecting talent, opportunities and possibilities.
        </footer>
      </div>
    </div>
  );
}

export default Services;