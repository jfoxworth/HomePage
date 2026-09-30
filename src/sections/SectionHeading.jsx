import Reveal from './Reveal'

export default function SectionHeading({ index, title }) {
  return (
    <Reveal as="header" className="section-heading">
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
      <span className="section-rule" />
    </Reveal>
  )
}
