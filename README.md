# JoshuaFoxworth.com

Personal portfolio site built with React and Vite. It is a standard scrolling page made of separate section components, in order: a hero (name and tagline, with a slot reserved for a future 3D scene), certifications, Claude badges, experience (resume download and social links), projects, and education.

## Structure

- `src/App.jsx` stacks the sections.
- `src/sections/` holds one component per section (`Hero`, `Certifications`, `Badges`, `Experience`, `Projects`, `Education`), plus the shared `Reveal` and `SectionHeading` helpers.
- `src/data.js` holds all page content (certs, jobs, projects, education, links).
- `src/App.css` holds all styling.
- `public/badges/` holds badge images and the resume PDF.
- `src/components/` holds the earlier react-three-fiber particle-cross scene. It is currently unused and is intended as a starting point for the hero's 3D scene.

## Tech Stack

- React 19 + Vite
- Plain CSS (scroll-reveal via IntersectionObserver)
- Three.js / @react-three/fiber / @react-three/drei (for the upcoming hero scene)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to S3

```bash
npm run build
aws s3 sync dist/ s3://joshuafoxworth.com --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```
