import { useState, useEffect } from "react";

function cornerOpacity(t, holdStart, holdEnd) {
  const fadeIn = 0.04;
  const fadeOut = 0.04;
  if (t < holdStart - fadeIn) return 0;
  if (t < holdStart) return (t - (holdStart - fadeIn)) / fadeIn;
  if (t <= holdEnd) return 1;
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
  color: "#e0f0ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: "3rem",
  fontWeight: 200,
  letterSpacing: "0.2em",
  textShadow: "0 0 20px rgba(68, 136, 204, 0.5), 0 2px 10px rgba(0,0,0,0.8)",
  margin: 0,
};

const subtitleStyle = {
  color: "#c0d8ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontWeight: 200,
  textShadow: "0 0 20px rgba(68, 136, 204, 0.5), 0 2px 10px rgba(0,0,0,0.8)",
};

const linkStyle = {
  color: "#88bbff",
  textDecoration: "none",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontWeight: 200,
};

const sectionHeadingStyle = {
  ...titleStyle,
  fontSize: "2.2rem",
  letterSpacing: "0.15em",
  marginBottom: "1.5rem",
};

const projectNameStyle = {
  color: "#e0f0ff",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontSize: "1.6rem",
  fontWeight: 300,
  letterSpacing: "0.1em",
  margin: "0 0 0.3rem 0",
};

const projectDescStyle = {
  ...subtitleStyle,
  fontSize: "1rem",
  letterSpacing: "0.1em",
  margin: "0 0 0.3rem 0",
};

const projectLinkStyle = {
  ...linkStyle,
  fontSize: "0.9rem",
  letterSpacing: "0.1em",
};

const dividerStyle = {
  width: "60px",
  height: "1px",
  background: "rgba(136, 187, 255, 0.3)",
  margin: "1.2rem 0",
};

export default function TitleOverlay() {
  const [opacities, setOpacities] = useState([1, 0, 0, 0]);

  useEffect(() => {
    let raf;
    const update = () => {
      const t = window.__cycleT || 0;
      setOpacities([
        cornerOpacity(t, 0.0, 0.08),
        cornerOpacity(t, 0.2, 0.28),
        cornerOpacity(t, 0.4, 0.48),
        cornerOpacity(t, 0.6, 0.68),
      ]);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Corner 1: Intro */}
      <div style={{ ...baseStyle, opacity: opacities[0] }}>
        <h1 style={titleStyle}>JoshuaFoxworth.com</h1>
        <p
          style={{
            ...subtitleStyle,
            fontSize: "1.15rem",
            letterSpacing: "0.25em",
            margin: "0.5rem 0 0 0",
          }}
        >
          Full Stack Developer, Data Engineer, Entrepreneur
        </p>
        <p
          style={{
            ...linkStyle,
            fontSize: "0.95rem",
            letterSpacing: "0.15em",
            margin: "0.4rem 0 0 0",
          }}
        >
          jfoxworth@cadwolf.com
        </p>

        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#c0d8ff",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 200,
            fontSize: "0.85rem",
            letterSpacing: "0.35em",
            textShadow:
              "0 0 20px rgba(68, 136, 204, 0.5), 0 2px 10px rgba(0,0,0,0.8)",
            animation: "scrollHint 2.2s ease-in-out infinite",
          }}
        >
          SCROLL
          <div
            style={{
              marginTop: "0.6rem",
              fontSize: "1.1rem",
              letterSpacing: 0,
            }}
          >
            ↓
          </div>
        </div>
      </div>

      {/* Corner 2: Projects */}
      <div style={{ ...baseStyle, opacity: opacities[1] }}>
        <div
          style={{
            width: "600px",
            textAlign: "left",
            border: "1px solid rgba(136, 187, 255, 0.3)",
            padding: "2em",
            borderRadius: "1em",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2
            style={{
              ...sectionHeadingStyle,
              marginBottom: "0.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(136, 187, 255, 0.3)",
            }}
          >
            Projects
          </h2>

          <h3 style={{ ...projectNameStyle, marginTop: "1rem" }}>CADWOLF</h3>
          <p style={projectDescStyle}>
            A collaborative, AI driven engineering platform
          </p>
          <p style={projectDescStyle}>
            Built with React, Next.js, Tailwind, PostGres, Prisma, and AWS
          </p>
          <a
            href="https://www.cadwolf.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...projectLinkStyle,
              pointerEvents: opacities[1] > 0.5 ? "auto" : "none",
            }}
          >
            www.cadwolf.com
          </a>

          <h3 style={{ ...projectNameStyle, marginTop: "1.5rem" }}>
            CheckOnMe
          </h3>
          <p style={projectDescStyle}>A wellness check-in platform</p>
          <p style={projectDescStyle}>
            Built with React, Next.js, MUI, DynammoDB, EventBridge, SQS, and
            others
          </p>
          <a
            href="https://checkonme.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...projectLinkStyle,
              pointerEvents: opacities[1] > 0.5 ? "auto" : "none",
            }}
          >
            checkonme.co
          </a>
        </div>
      </div>

      {/* Corner 3: Work History */}
      <div style={{ ...baseStyle, opacity: opacities[2] }}>
        <div
          style={{
            width: "600px",
            textAlign: "left",
            border: "1px solid rgba(136, 187, 255, 0.3)",
            padding: "2em",
            borderRadius: "1em",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2
            style={{
              ...sectionHeadingStyle,
              marginBottom: "0.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(136, 187, 255, 0.3)",
            }}
          >
            Work History
          </h2>

          <h3 style={{ ...projectNameStyle, marginTop: "1rem" }}>
            Dallas Morning News
          </h3>
          <p style={{ ...projectDescStyle, opacity: 0.7, fontSize: "0.9rem" }}>
            Full Stack Developer &bull; 2020–2026
          </p>

          <p
            style={{
              ...projectDescStyle,
              marginTop: "0.8rem",
              lineHeight: 1.7,
            }}
          >
            Built and maintained the main site and supporting systems using
            React, Node, GraphQL, and PostgreSQL. Led development of editorial
            tools, data pipelines, and reader-facing products.
          </p>

          <p
            style={{
              ...projectDescStyle,
              marginTop: "0.6rem",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            Key projects included AirTable-driven editorial workflow automation,
            AWS data pipelines (Lambda, Glue, SQS, SNS), a high school sports
            stats platform, election results and voter guide systems, and a
            reader-voted "Best in DFW" product with Google Maps integration.
          </p>
        </div>
      </div>

      {/* Corner 4: Education and Experience */}
      <div style={{ ...baseStyle, opacity: opacities[3] }}>
        <div
          style={{
            width: "600px",
            textAlign: "left",
            border: "1px solid rgba(136, 187, 255, 0.3)",
            padding: "2em",
            borderRadius: "1em",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2
            style={{
              ...sectionHeadingStyle,
              marginBottom: "0.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(136, 187, 255, 0.3)",
            }}
          >
            Education &amp; Experience
          </h2>

          <h3 style={{ ...projectNameStyle, marginTop: "1rem" }}>
            BS — Aerospace Engineering — 2003
          </h3>
          <p style={projectDescStyle}>University of Texas at Austin</p>

          <h3 style={{ ...projectNameStyle, marginTop: "1.5rem" }}>
            MS — Aerospace Engineering — 2005
          </h3>
          <p style={projectDescStyle}>University of Texas at Austin</p>

          <h3 style={{ ...projectNameStyle, marginTop: "1.5rem" }}>
            US Marines
          </h3>
          <p style={projectDescStyle}>Reconnaissance Marine (1994–1998)</p>
        </div>
      </div>
    </>
  );
}
