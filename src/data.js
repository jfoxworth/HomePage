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
    details: [
      {
        heading: 'Data Engineering (solo projects)',
        items: [
          { name: 'Sportsgraf', text: 'Took in CSV files with data such as names, sports, positions, and schools. Extracted that data, performed data quality checks, and loaded the final data into databases for use in real-time high school sports displays and in calculations.' },
          { name: 'IFX and Airtable', text: 'Real-time article creation and editorial data was streamed to infrastructure that extracted certain data, sent it to Airtable, and ran calculations on the statistics within it. Similar infrastructure sent data from Airtable back to our article system. This became how the entire paper’s editorial process was handled, and the data it generated was used to address future publication times and procedures.' },
        ],
      },
      {
        heading: 'Full Stack Development',
        items: [
          { text: 'Developed and maintained all aspects of the main site as well as supporting systems, using React, React Admin, Tailwind, Material UI, Node, Postgres, and GraphQL / Apollo APIs. Major front end projects included video integration within the site, live streaming a local sports station, and integrating multiple third party platforms.' },
          { name: 'Sportsgraf', text: 'A system to take in, format, and display high school sports stats in the Dallas area. Coaches and staff logged in and entered play-by-play data for football, basketball, soccer, and other sports, and users could view those stats as well as schedules, standings, and more. A React Admin dashboard managed the data. I was one of a few developers who built the database and AWS infrastructure.' },
          { name: 'Best in DFW', text: 'A reader voting system to select the favorite restaurants, bars, stores, and more in the area. It used Google Maps to display option locations, tracked votes in a Postgres database, and displayed results.' },
          { name: 'Voter Guide', text: 'A system to display voting options and results. It read real-time results from AP sources on election days and displayed the results after the elections.' },
        ],
      },
      {
        heading: 'Logistics and Leadership',
        items: [
          { text: 'DMN ran agile sprints. I created Jira tickets when needed and participated in sprint planning, retros, and all other logistical aspects.' },
        ],
      },
    ],
  },
  {
    title: 'React Developer',
    company: 'GoRadar — Remote Contract Work',
    dates: 'Jan 2021 – Jun 2021',
    text: 'GoRadar was a startup that took in real time data for a number of tags that were placed on numerous items in a store and tracked them in real time. I developed an algorithm to build three-dimensional rooms from textual data and then display that data in real time.',
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
