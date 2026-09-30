export const NAME = 'Joshua Foxworth'
export const TAGLINE = 'Full Stack Developer, Data and AI Engineer, Entrepreneur'
export const EMAIL = 'jfoxworth@cadwolf.com'
export const RESUME_HREF = '/badges/Resume%20-%20Joshua%20Foxworth.pdf'

export const CERTS = [
  { name: 'AWS Certified Cloud Practitioner', file: 'aws-certified-cloud-practitioner.svg' },
  { name: 'AWS Certified Solutions Architect – Associate', file: 'aws-certified-solutions-architect-associate.svg' },
  { name: 'AWS Certified Data Engineer – Associate', file: 'dataengineer.png' },
  { name: 'AWS Certified AI Practitioner', file: 'aws-certified-ai-practitioner.svg' },
]

export const SOCIAL_LINKS = [
  { name: 'GitHub', file: 'github.png', href: 'https://github.com/jfoxworth' },
  { name: 'LinkedIn', file: 'linkedin.png', href: 'https://www.linkedin.com/in/joshua-foxworth-1a655920/' },
  { name: 'LeetCode', file: 'leetcode.png', href: 'https://leetcode.com/u/jfoxworth/' },
]

export const JOBS = [
  {
    title: 'Full Stack Developer, AI Engineer',
    company: 'Engentic (My Startup)',
    dates: '2016 – Present',
    text: 'Engentic is an advanced, AI assisted, structural engineering platform. It uses RAG, LLM, and other technologies to assist engineers in designing parts and building large structures. (See Below)',
  },
  {
    title: 'Full Stack Developer',
    company: 'Dallas Morning News (later Hearst) — Remote',
    dates: 'Aug 2021 – May 2026',
    text: 'My work at DMN spanned the full stack: front end work in React, back end work in Postgres, AWS, and Mongo, and infrastructure work in AWS.',
  },
  {
    title: 'React Developer',
    company: 'GoRadar — Remote Contract Work',
    dates: 'Jan 2021 – Jun 2021',
    text: 'At GoRadar, I developed a React-Three-Fiber app that took in tens of thousands of points of data per second and displayed that in a 3D environment modeled after storefronts.',
  },
]

export const PROJECTS = [
  {
    name: 'Engentic',
    blurb: 'A collaborative, AI driven engineering platform',
    description: [
      'The name Engentic comes from the combination of engineering and agentic AI. It is an advanced, AI assisted, structural engineering platform. It helps engineers design parts and build large structures by combining calculation, documentation, and collaboration in one place.',
      'It uses RAG, LLMs, and other technologies to assist engineers as they work, surfacing relevant standards and prior work and helping automate repetitive analysis.',
      'This project began in 2016 and has been overhauled to use AI.',
    ],
    stack: ['React', 'Claude', 'RAG', 'Agentic AI', 'Next.js', 'Tailwind', 'PostgreSQL', 'Prisma', 'AWS'],
    href: 'https://www.engentic.tech',
    label: 'Engentic',
  },
  {
    name: 'CheckOnMe',
    blurb: 'A wellness check-in platform',
    description: [
      'CheckOnMe is a simple system that lets a user set up checks to make sure they are OK after trips, hikes, dates, and other situations where a little extra safety is welcome.',
      'A user schedules a check-in. If they do not respond in time, the people they chose are notified. Scheduling and escalation are handled by event-driven AWS services, so nothing depends on a server staying up.',
    ],
    stack: ['React', 'Next.js', 'MUI', 'DynamoDB', 'EventBridge', 'SQS'],
    href: 'https://checkonme.co',
    label: 'Check On Me',
  },
]

export const EDUCATION = [
  { degree: 'MS, Aerospace Engineering', school: 'University of Texas at Austin', year: '2005' },
  { degree: 'BS, Aerospace Engineering', school: 'University of Texas at Austin', year: '2003' },
]
