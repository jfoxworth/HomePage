import { EDUCATION, EMAIL } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading index="05" title="Education" />
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.degree} delay={i * 100} className="edu-card">
              <span className="edu-year">{e.year}</span>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="footer" className="footer" delay={150}>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p>© {new Date().getFullYear()} Joshua Foxworth</p>
        </Reveal>
        <Reveal className="page-mascot" delay={200}>
          <img src="/badges/onePM.png" alt="One Punch Man" loading="lazy" />
        </Reveal>
      </div>
    </section>
  )
}
