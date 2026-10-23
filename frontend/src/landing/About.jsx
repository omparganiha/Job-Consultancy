import React from "react";

function About() {
  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      background: "#F7F9FC",
      color: "#172B4D",
      minHeight: "100vh",
      padding: "26px",
      boxSizing: "border-box",
    },

    hero: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      gap: "35px",
      padding: "45px",
      borderRadius: "26px",
      background:
        "linear-gradient(120deg, #FFFFFF 0%, #FFF7F0 58%, #FFE5D0 100%)",
      border: "1px solid #FFE1C8",
      boxShadow: "0 15px 40px rgba(255, 107, 0, 0.07)",
      overflow: "hidden",
    },

    tag: {
      display: "inline-block",
      color: "#FF6B00",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "2px",
      marginBottom: "18px",
    },

    heroTitle: {
      fontSize: "clamp(32px, 4vw, 52px)",
      fontWeight: "800",
      lineHeight: 1.17,
      margin: "0 0 20px",
      letterSpacing: "-1.5px",
    },

    highlight: {
      color: "#FF6B00",
    },

    paragraph: {
      color: "#64748B",
      fontSize: "15px",
      lineHeight: 1.9,
      marginBottom: "25px",
    },

    button: {
      display: "inline-block",
      background: "linear-gradient(135deg, #FF7900, #FF5B00)",
      color: "#FFFFFF",
      padding: "15px 23px",
      borderRadius: "12px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "700",
      boxShadow: "0 9px 22px rgba(255, 107, 0, 0.23)",
    },

    imageWrap: {
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 18px 40px rgba(23, 43, 77, 0.17)",
    },

    heroImage: {
      display: "block",
      width: "100%",
      height: "350px",
      objectFit: "cover",
    },

    imageBadge: {
      position: "absolute",
      bottom: "15px",
      left: "15px",
      right: "15px",
      padding: "15px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.95)",
      color: "#172B4D",
      fontSize: "13px",
      fontWeight: "700",
    },

    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "18px",
      margin: "25px 0 60px",
    },

    statCard: {
      background: "#FFFFFF",
      border: "1px solid #E5EAF2",
      borderRadius: "17px",
      padding: "24px 18px",
      textAlign: "center",
      boxShadow: "0 6px 20px rgba(23, 43, 77, 0.04)",
    },

    statNumber: {
      color: "#FF6B00",
      fontSize: "30px",
      fontWeight: "800",
      margin: "0 0 8px",
    },

    statLabel: {
      color: "#64748B",
      fontSize: "13px",
      margin: 0,
    },

    section: {
      maxWidth: "1200px",
      margin: "0 auto 65px",
    },

    story: {
      display: "grid",
      gridTemplateColumns: "0.95fr 1.05fr",
      alignItems: "center",
      gap: "45px",
    },

    storyImage: {
      width: "100%",
      height: "340px",
      objectFit: "cover",
      borderRadius: "22px",
      display: "block",
      boxShadow: "0 15px 35px rgba(23, 43, 77, 0.12)",
    },

    sectionTitle: {
      fontSize: "clamp(26px, 3vw, 36px)",
      lineHeight: 1.3,
      margin: "12px 0 18px",
      fontWeight: "800",
    },

    storyText: {
      color: "#64748B",
      lineHeight: 1.9,
      fontSize: "15px",
      marginBottom: "15px",
    },

    valuesHeading: {
      textAlign: "center",
      marginBottom: "32px",
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
    },

    valueCard: {
      background: "#FFFFFF",
      border: "1px solid #E6EBF2",
      borderRadius: "18px",
      padding: "28px 24px",
      boxShadow: "0 7px 22px rgba(23, 43, 77, 0.04)",
    },

    valueIcon: {
      width: "54px",
      height: "54px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#FFF0E2",
      borderRadius: "15px",
      fontSize: "26px",
      marginBottom: "18px",
    },

    valueTitle: {
      fontSize: "19px",
      margin: "0 0 12px",
    },

    valueText: {
      color: "#64748B",
      fontSize: "14px",
      lineHeight: 1.8,
      margin: 0,
    },

    chooseUs: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "35px",
      alignItems: "center",
      padding: "35px",
      borderRadius: "24px",
      background: "#FFF5EB",
      border: "1px solid #FFE2CA",
    },

    chooseImage: {
      width: "100%",
      height: "320px",
      objectFit: "cover",
      display: "block",
      borderRadius: "18px",
    },

    listItem: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
      marginBottom: "18px",
      color: "#475569",
      lineHeight: 1.7,
      fontSize: "14px",
    },

    check: {
      color: "#FF6B00",
      fontSize: "19px",
      fontWeight: "800",
    },

    bottom: {
      textAlign: "center",
      padding: "45px 22px",
      borderRadius: "22px",
      background: "linear-gradient(135deg, #172B4D, #263F63)",
      color: "#FFFFFF",
      marginTop: "25px",
    },

    bottomText: {
      color: "#D7E0ED",
      fontSize: "15px",
      lineHeight: 1.8,
      margin: "12px auto 25px",
      maxWidth: "650px",
    },
  };

  const values = [
    {
      icon: "🎯",
      title: "Our Mission",
      description:
        "To connect job seekers and employers through a simple, organized and reliable recruitment experience.",
    },
    {
      icon: "🤝",
      title: "Our Approach",
      description:
        "We believe in meaningful connections, transparent communication and opportunities based on skills.",
    },
    {
      icon: "🚀",
      title: "Our Vision",
      description:
        "To make career growth and talent discovery easier for people and organizations.",
    },
  ];

  return (
    <div style={styles.page}>
      {/* ABOUT HERO */}
      <section style={styles.hero}>
        <div>
          <span style={styles.tag}>✦ ABOUT JOBERP</span>

          <h1 style={styles.heroTitle}>
            We're Building a Smarter Future of Work{" "}
            <span style={styles.highlight}>Together.</span>
          </h1>

          <p style={styles.paragraph}>
            JobERP connects talented people with meaningful career
            opportunities and helps employers build stronger teams through
            a simple, organized recruitment platform.
          </p>

          <a href="/services" style={styles.button}>
            Explore Our Services ↗
          </a>
        </div>

        <div style={styles.imageWrap}>
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
            alt="Professional team collaborating in an office"
            style={styles.heroImage}
          />

          <div style={styles.imageBadge}>
            🤝 &nbsp; Connecting Talent with Opportunity
          </div>
        </div>
      </section>

      {/* PLATFORM HIGHLIGHTS */}
      <section style={styles.stats}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>01</h2>
          <p style={styles.statLabel}>People First</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>02</h2>
          <p style={styles.statLabel}>Smarter Recruitment</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>03</h2>
          <p style={styles.statLabel}>Career Growth</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>04</h2>
          <p style={styles.statLabel}>Better Connections</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ ...styles.section, ...styles.story }}>
        <div>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"
            alt="Team members working together"
            style={styles.storyImage}
          />
        </div>

        <div>
          <span style={styles.tag}>OUR STORY</span>

          <h2 style={styles.sectionTitle}>
            Bringing People and Opportunities Closer
          </h2>

          <p style={styles.storyText}>
            Finding the right job or the right candidate should not feel
            complicated. JobERP is designed to bring the important parts of
            recruitment together in one place.
          </p>

          <p style={styles.storyText}>
            Job seekers can explore opportunities and track applications,
            while providers can organize job postings and manage applicants
            more efficiently.
          </p>

          <p style={styles.storyText}>
            Our goal is to make the journey clearer, more organized and
            more productive for everyone.
          </p>
        </div>
      </section>

      {/* MISSION, APPROACH AND VISION */}
      <section style={styles.section}>
        <div style={styles.valuesHeading}>
          <span style={styles.tag}>WHAT MATTERS TO US</span>

          <h2 style={styles.sectionTitle}>The Values Behind JobERP</h2>

          <p style={styles.paragraph}>
            Every great career connection begins with the right purpose.
          </p>
        </div>

        <div style={styles.valuesGrid}>
          {values.map((item) => (
            <div style={styles.valueCard} key={item.title}>
              <div style={styles.valueIcon}>{item.icon}</div>

              <h3 style={styles.valueTitle}>{item.title}</h3>

              <p style={styles.valueText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ ...styles.section, ...styles.chooseUs }}>
        <div>
          <span style={styles.tag}>WHY CHOOSE JOBERP?</span>

          <h2 style={styles.sectionTitle}>
            A Better Experience for Both Sides
          </h2>

          <p style={styles.paragraph}>
            Whether you're searching for your next opportunity or hiring
            your next team member, JobERP helps make the process easier
            to manage.
          </p>

          {[
            "Explore opportunities and keep track of applications.",
            "Help employers organize job posts and applicants.",
            "Bring job seekers and providers onto one platform.",
            "Make recruitment more structured and convenient.",
          ].map((item) => (
            <div style={styles.listItem} key={item}>
              <span style={styles.check}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div style={styles.imageWrap}>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85"
            alt="Colleagues discussing ideas in a business meeting"
            style={styles.chooseImage}
          />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={styles.bottom}>
        <h2 style={{ fontSize: "clamp(25px, 3vw, 36px)", margin: 0 }}>
          Your Next Chapter Starts Here
        </h2>

        <p style={styles.bottomText}>
          Discover new possibilities, build meaningful connections and take
          the next step in your professional journey with JobERP.
        </p>

        <a href="/services" style={styles.button}>
          Discover Our Services ↗
        </a>
      </section>
    </div>
  );
}

export default About;