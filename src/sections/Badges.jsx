import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Badges() {
  return (
    <section id="badges" className="section">
      <div className="container">
        <SectionHeading index="02" title="Badges" />
        <Reveal className="badges">
          <img
            src="/badges/claudeBadges.png"
            alt="Claude badges: Building with the Claude API, AI capabilities and limitations, Model Context Protocol Advanced topics, Introduction to Model Context Protocol, Claude Code in action, Claude Platform 101, Claude Code 101, Claude 101"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  )
}
