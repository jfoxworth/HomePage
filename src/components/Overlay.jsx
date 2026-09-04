import { useState, useEffect } from "react";

function viewOpacity(t, holdStart, holdEnd, fadeIn = 0.04, fadeOut = 0.04) {
  if (t < holdStart - fadeIn) return 0;
  if (t < holdStart) return (t - (holdStart - fadeIn)) / fadeIn;
  if (t <= holdEnd) return 1;
  if (holdEnd >= 1) return 1;
  if (t < holdEnd + fadeOut) return 1 - (t - holdEnd) / fadeOut;
  return 0;
}

const baseStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  zIndex: 10,
  transition: "opacity 0.15s ease",
};

const titleStyle = {
  color: "#eef4ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: "5rem",
  fontWeight: 200,
  letterSpacing: "0.2em",
  textShadow: "0 0 24px rgba(255, 154, 82, 0.35), 0 2px 10px rgba(0,0,0,0.8)",
  margin: 0,
};

const subtitleStyle = {
  color: "#cbd9f5",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontWeight: 200,
  textShadow: "0 0 20px rgba(68, 100, 180, 0.4), 0 2px 10px rgba(0,0,0,0.8)",
};

const linkStyle = {
  color: "#9fc1ff",
  textDecoration: "none",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontWeight: 200,
};

const panelStyle = {
  minWidth: "500px",
  maxWidth: "88vw",
  textAlign: "left",
  border: "1px solid rgba(160, 180, 220, 0.25)",
  padding: "2em",
  borderRadius: "1em",
  background: "rgba(8, 6, 14, 0.85)",
  backdropFilter: "blur(10px)",
};

const sectionHeadingStyle = {
  ...titleStyle,
  fontSize: "2rem",
  letterSpacing: "0.15em",
  marginTop: "1.0rem",
  marginBottom: "0.5rem",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid rgba(160, 180, 220, 0.25)",
};

const itemNameStyle = {
  color: "#eef4ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
  margin: "0 0 0.2rem 0",
};

const itemMetaStyle = {
  ...subtitleStyle,
  fontSize: "0.8rem",
  opacity: 0.7,
  margin: "0 0 0.9rem 0",
};

const certBadgesWrapStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  gap: "1rem",
  marginTop: "0.6rem",
};

const certBadgeImgStyle = {
  width: "172px",
  height: "172px",
  objectFit: "contain",
  filter: "drop-shadow(0 0 10px rgba(255, 154, 82, 0.3))",
};

const CERTS = [
  { name: "AWS Certified Cloud Practitioner", file: "aws-certified-cloud-practitioner.svg" },
  { name: "AWS Certified Solutions Architect – Associate", file: "aws-certified-solutions-architect-associate.svg" },
  { name: "AWS Certified Data Engineer – Associate", file: "dataengineer.png" },
  { name: "AWS Certified AI Practitioner", file: "aws-certified-ai-practitioner.svg" },
];

const socialLinksWrapStyle = {
  display: "flex",
  gap: "1.2rem",
  marginTop: "0.6rem",
  marginBottom: "0.5rem",
};

const socialLinkIconStyle = {
  width: "48px",
  height: "48px",
  objectFit: "contain",
  filter: "drop-shadow(0 0 10px rgba(159, 193, 255, 0.3))",
};

const SOCIAL_LINKS = [
  { name: "GitHub", file: "github.png", href: "https://github.com/jfoxworth" },
  { name: "LinkedIn", file: "linkedin.png", href: "https://www.linkedin.com/in/joshua-foxworth-1a655920/" },
  { name: "LeetCode", file: "leetcode.png", href: "https://leetcode.com/u/jfoxworth/" },
];

const resumeButtonStyle = {
  display: "inline-block",
  border: "1px solid rgba(159, 193, 255, 0.4)",
  background: "rgba(159, 193, 255, 0.1)",
  borderRadius: "8px",
  padding: "0.5rem 1rem",
  margin: "0.8rem 0 1.2rem 0",
  fontSize: "0.9rem",
  color: "#dbe9ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  textDecoration: "none",
};

const JOBS = [
  {
    title: "Full Stack Developer",
    company: "Dallas Morning News (later Hearst) — Remote",
    dates: "Aug 2021 – May, 2026",
    text:"My work at DMN involved work across the full stack. This included front end work in React, back end work in postgres, AWS, and Mongo, and infrastrucutre work in AWS."
  },
  {
    title: "React Developer",
    company: "GoRadar — Remote Contract Work",
    dates: "Jan 2021 – Jun 2021",
    text:"At GoRadar, I developed a React-Three-Fiber app that took in tens of thousands of points of data per second and displayed that in a 3D environment modeled after storefronts."
  },
  {
    title: "Full Stack Developer",
    company: "Cadwolf (My Startup)",
    dates: "2016 – Present",
    text: "Cadwolf is an advanced, AI assisted, structural engineering platform.",
  },
  {
    title: "Full Stack Developer — Personal Project",
    company: "CheckOnMe.co",
    dates: "Dec 2025 – Present",
    text: "CheckOnMe is a simple system that lets a user set up checks to ensure that they are OK after trips, hikes, dates, etc.",
  },
];

const projectNameStyle = {
  color: "#eef4ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: "1.4rem",
  fontWeight: 300,
  letterSpacing: "0.08em",
  margin: "0 0 0.3rem 0",
};

const projectDescStyle = {
  ...subtitleStyle,
  fontSize: "0.95rem",
  letterSpacing: "0.02em",
  margin: "0 0 0.3rem 0",
  lineHeight: 1.5,
};

export default function Overlay() {
  const [opacities, setOpacities] = useState([1, 0, 0, 0, 0]);

  useEffect(() => {
    let raf;
    const update = () => {
      const t = window.__scrollT || 0;
      setOpacities([
        viewOpacity(t, 0.0, 0.05),
        viewOpacity(t, 0.24, 0.3),
        viewOpacity(t, 0.47, 0.53),
        viewOpacity(t, 0.69, 0.75),
        viewOpacity(t, 0.94, 1.0),
      ]);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* View 1: Intro */}
      <div style={{ ...baseStyle, opacity: opacities[0] }}>
        <h1 style={titleStyle}>JoshuaFoxworth</h1>
        <p
          style={{
            ...subtitleStyle,
            fontSize: "1.5rem",
            letterSpacing: "0.25em",
            margin: "0.5rem 0 0 0",
          }}
        >
          Full Stack Developer, Data Engineer, Entrepreneur
        </p>

        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#cbd9f5",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 200,
            fontSize: "0.85rem",
            letterSpacing: "0.35em",
            textShadow: "0 0 20px rgba(68, 100, 180, 0.4), 0 2px 10px rgba(0,0,0,0.8)",
            animation: "scrollHint 2.2s ease-in-out infinite",
          }}
        >
          SCROLL
          <div style={{ marginTop: "0.6rem", fontSize: "1.1rem", letterSpacing: 0 }}>
            &darr;
          </div>
        </div>
      </div>

      {/* View 2: Credentials & certifications */}
      <div style={{ ...baseStyle, opacity: opacities[1] }}>
        <div style={{ ...panelStyle, display: "flex", gap: "2rem" }}>
          <div style={{ flex: 1 }}>
            <h2 style={sectionHeadingStyle}>Credentials</h2>

            <div style={certBadgesWrapStyle}>
              {CERTS.map((cert) => (
                <img
                  key={cert.file}
                  src={`/badges/${cert.file}`}
                  alt={cert.name}
                  title={cert.name}
                  style={certBadgeImgStyle}
                />
              ))}
            </div>
            <h2 style={sectionHeadingStyle}>Links</h2>

            <div style={socialLinksWrapStyle}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.file}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ pointerEvents: opacities[1] > 0.5 ? "auto" : "none" }}
                >
                  <img src={`/badges/${link.file}`} alt={link.name} title={link.name} style={socialLinkIconStyle} />
                </a>
              ))}
            </div>

            <h2 style={sectionHeadingStyle}>Education</h2>

            <p style={itemNameStyle}>BS - Aerospace Engineering - 2003</p>
            <p style={itemMetaStyle}>University of Texas at Austin</p>

            <p style={itemNameStyle}>MS - Aerospace Engineering - 2005</p>
            <p style={itemMetaStyle}>University of Texas at Austin</p>
          </div>
        </div>
      </div>

      {/* View 3: Resume */}
      <div style={{ ...baseStyle, opacity: opacities[2] }}>
        <div style={panelStyle}>
          <h2 style={sectionHeadingStyle}>Resume</h2>

          <a
            href="/badges/Resume%20-%20Joshua%20Foxworth.pdf"
            download="Joshua-Foxworth-Resume.pdf"
            style={{ ...resumeButtonStyle, pointerEvents: opacities[2] > 0.5 ? "auto" : "none" }}
          >
            Download Resume (PDF)
          </a>

          {JOBS.map((job) => (
            <div key={job.title + job.company}>
              <p style={itemNameStyle}>{job.title}</p>
              <p style={itemMetaStyle}>
                {job.company}
                {job.dates ? ` • ${job.dates}` : ""}
              </p>
              <p style={itemMetaStyle}>{job.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* View 4: Portfolio projects */}
      <div style={{ ...baseStyle, opacity: opacities[3] }}>
        <div style={panelStyle}>
          <h2 style={sectionHeadingStyle}>Projects</h2>

          <h3 style={{ ...projectNameStyle, marginTop: "1rem" }}>CADWOLF</h3>
          <p style={projectDescStyle}>A collaborative, AI driven engineering platform</p>
          <p style={projectDescStyle}>
            Built with React, Next.js, Tailwind, PostgreSQL, Prisma, and AWS
          </p>
          <a
            href="https://www.cadwolf.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...linkStyle, fontSize: "0.9rem", pointerEvents: opacities[3] > 0.5 ? "auto" : "none" }}
          >
            www.cadwolf.com
          </a>

          <h3 style={{ ...projectNameStyle, marginTop: "1.5rem" }}>CheckOnMe</h3>
          <p style={projectDescStyle}>A wellness check-in platform</p>
          <p style={projectDescStyle}>
            Built with React, Next.js, MUI, DynamoDB, EventBridge, SQS, and others
          </p>
          <a
            href="https://checkonme.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...linkStyle, fontSize: "0.9rem", pointerEvents: opacities[3] > 0.5 ? "auto" : "none" }}
          >
            checkonme.co
          </a>
        </div>
      </div>

      {/* View 5: Closing + contact */}
      <div style={{ ...baseStyle, justifyContent: "flex-end", paddingBottom: "8vh", opacity: opacities[4] }}>
        <h2 style={{ ...titleStyle, fontSize: "1.6rem", letterSpacing: "0.15em" }}>
          Joshua Foxworth
        </h2>
        <p style={{ ...subtitleStyle, fontSize: "0.95rem", letterSpacing: "0.15em", margin: "0.4rem 0 0 0" }}>
          Full Stack Developer, Data Engineer, Entrepreneur
        </p>
        <a
          href="mailto:jfoxworth@cadwolf.com"
          style={{
            ...linkStyle,
            fontSize: "0.95rem",
            letterSpacing: "0.1em",
            margin: "0.6rem 0 0 0",
            pointerEvents: opacities[4] > 0.5 ? "auto" : "none",
          }}
        >
          jfoxworth@cadwolf.com
        </a>
      </div>
    </>
  );
}
