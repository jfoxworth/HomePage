import { Html } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

const WALL_DIST = 3 // distance from center to wall content

const cardStyle = {
  background: 'rgba(10, 15, 30, 0.8)',
  border: '1px solid rgba(80, 120, 200, 0.3)',
  borderRadius: '12px',
  padding: '2rem 2.5rem',
  backdropFilter: 'blur(10px)',
  color: '#c0d8ff',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  maxWidth: '400px',
  boxShadow: '0 0 30px rgba(68, 136, 255, 0.15)',
  textAlign: 'center',
}

const headingStyle = {
  color: '#e0f0ff',
  fontWeight: 300,
  letterSpacing: '0.1em',
  margin: '0 0 0.8rem 0',
}

const linkStyle = {
  color: '#88bbff',
  textDecoration: 'none',
}

const tagStyle = {
  display: 'inline-block',
  background: 'rgba(68, 136, 255, 0.15)',
  border: '1px solid rgba(80, 120, 200, 0.3)',
  borderRadius: '4px',
  padding: '0.2rem 0.6rem',
  margin: '0.2rem',
  fontSize: '0.8rem',
  color: '#88bbff',
}

function VisibilityController({ children }) {
  const scroll = useScroll()
  const [vis, setVis] = useState([true, false, false, false])

  useFrame(() => {
    const t = scroll.offset
    setVis([
      t < 0.15,
      t > 0.25 && t < 0.45,
      t > 0.52 && t < 0.72,
      t > 0.77,
    ])
  })

  return children(vis)
}

function WallPlacard({ position, rotation, visible, children }) {
  return (
    <Html
      position={position}
      rotation={rotation}
      center
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: visible ? 'auto' : 'none',
        width: '400px',
      }}
    >
      <div style={cardStyle}>
        {children}
      </div>
    </Html>
  )
}

export default function WallContent() {
  return (
    <VisibilityController>
      {(vis) => (
        <group>
          {/* Wall 1 — Front (negative Z) — Intro */}
          <WallPlacard
            position={[0, 1.6, -WALL_DIST]}
            rotation={[0, 0, 0]}
            visible={vis[0]}
          >
            <h1 style={{ ...headingStyle, fontSize: '2rem', letterSpacing: '0.15em' }}>
              JoshuaFoxworth.com
            </h1>
            <p style={{ fontSize: '1rem', fontWeight: 300, letterSpacing: '0.1em', opacity: 0.8, margin: 0 }}>
              Full Stack Developer &bull; Data Engineer &bull; Entrepreneur
            </p>
          </WallPlacard>

          {/* Wall 2 — Right (positive X) — Cadwolf */}
          <WallPlacard
            position={[WALL_DIST, 1.6, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            visible={vis[1]}
          >
            <h2 style={{ ...headingStyle, fontSize: '1.5rem' }}>
              <a href="https://www.cadwolf.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Cadwolf
              </a>
            </h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0.5rem 0' }}>
              A collaborative engineering platform for scientific computing,
              documentation, and data analysis.
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{
                width: '80px', height: '80px',
                background: 'rgba(68, 136, 255, 0.1)',
                border: '1px solid rgba(80, 120, 200, 0.3)',
                borderRadius: '8px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', opacity: 0.6,
              }}>Logo</div>
            </div>
          </WallPlacard>

          {/* Wall 3 — Back (positive Z) — CheckOnMe */}
          <WallPlacard
            position={[0, 1.6, WALL_DIST]}
            rotation={[0, Math.PI, 0]}
            visible={vis[2]}
          >
            <h2 style={{ ...headingStyle, fontSize: '1.5rem' }}>
              <a href="https://checkonme.co" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                CheckOnMe
              </a>
            </h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0.5rem 0' }}>
              A wellness check-in platform that helps people stay connected
              and look out for each other.
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{
                width: '80px', height: '80px',
                background: 'rgba(68, 136, 255, 0.1)',
                border: '1px solid rgba(80, 120, 200, 0.3)',
                borderRadius: '8px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', opacity: 0.6,
              }}>Logo</div>
            </div>
          </WallPlacard>

          {/* Wall 4 — Left (negative X) — Career & Education */}
          <WallPlacard
            position={[-WALL_DIST, 1.6, 0]}
            rotation={[0, Math.PI / 2, 0]}
            visible={vis[3]}
          >
            <h2 style={{ ...headingStyle, fontSize: '1.5rem' }}>Career &amp; Education</h2>
            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', margin: '0.3rem 0' }}>
                <strong style={{ color: '#e0f0ff' }}>Full Stack Developer / Entrepreneur</strong>
              </p>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: '0.2rem 0' }}>
                Your Company &bull; 20XX - Present
              </p>
            </div>
            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', margin: '0.3rem 0' }}>
                <strong style={{ color: '#e0f0ff' }}>Data Engineer</strong>
              </p>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: '0.2rem 0' }}>
                Previous Company &bull; 20XX - 20XX
              </p>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              {['React', 'Node.js', 'Python', 'Three.js', 'PostgreSQL', 'AWS', 'Docker'].map(s => (
                <span key={s} style={tagStyle}>{s}</span>
              ))}
            </div>
          </WallPlacard>
        </group>
      )}
    </VisibilityController>
  )
}
