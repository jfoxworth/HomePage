import { CERTS } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionHeading index="01" title="Certifications" />
        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <Reveal key={cert.file} delay={i * 90} className="cert-card">
              <img src={`/badges/${cert.file}`} alt={cert.name} loading="lazy" />
              <p>{cert.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
