import { JOBS, RESUME_HREF, SOCIAL_LINKS } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading index="03" title="Experience" />
        <Reveal className="resume-row">
          <a className="btn" href={RESUME_HREF} download="Joshua-Foxworth-Resume.pdf">
            Download Resume (PDF) <span aria-hidden="true">&darr;</span>
          </a>
          <div className="social-row">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" title={link.name}>
                <img src={`/badges/${link.file}`} alt={link.name} />
              </a>
            ))}
          </div>
        </Reveal>
        <ol className="timeline">
          {JOBS.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 80} className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-dates">{job.dates}</span>
                <h3>{job.company}</h3>
                <p className="timeline-role">{job.title}</p>
                <p>{job.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
