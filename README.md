# JoshuaFoxworth.com

Personal portfolio site built with React and Three.js (react-three-fiber). The scene is a Latin cross built entirely from particles. Scroll drives the camera in an orbiting path around and along the cross through four beats: an ambiguous close-up (title), an orbit past the arms (credentials & certifications), an orbit past the base (portfolio projects), and a final zoomed-out, level view where the cross is finally legible (closing statement & contact).

## Tech Stack

- React 19 + Vite
- Three.js / @react-three/fiber / @react-three/drei
- Custom GLSL point-sprite shader for the particle cross
- @react-three/postprocessing (Bloom, GodRays, Noise, Vignette) for the volumetric fog / light-shaft atmosphere

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
