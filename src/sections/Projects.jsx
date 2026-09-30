import { useRef } from 'react'
import { PROJECTS } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Cursor-follow spotlight: writes CSS vars directly, no React state.
function ProjectCard({ project, delay }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Reveal delay={delay}>
      <a
        ref={ref}
        onMouseMove={onMove}
        className="project-card"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3>{project.name}</h3>
        <p className="project-blurb">{project.blurb}</p>
        <div className="project-body">
          {project.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <ul className="chips">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <span className="project-link">
          {project.label} 
        </span>
      </a>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading index="04" title="Projects" />
        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
