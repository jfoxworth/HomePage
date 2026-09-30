import { NAME, TAGLINE } from '../data'

// The 3D scene will eventually mount inside .hero-scene (e.g. a <Canvas>).
// Until then it holds a CSS-only aurora + perspective grid.
export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-scene" aria-hidden="true">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="grid-floor" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{NAME.replace(' ', '')}</h1>
        <p className="hero-tagline">{TAGLINE}</p>
      </div>
      <a href="#certifications" className="scroll-hint">
        SCROLL
        <span>&darr;</span>
      </a>
    </section>
  )
}
