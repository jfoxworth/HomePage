# JoshuaFoxworth.com

Personal portfolio site built with React, Three.js (react-three-fiber), and a GLTF room model. Scroll-driven camera moves between four corners of the room, displaying portfolio content at each view.

## Tech Stack

- React 19 + Vite
- Three.js / @react-three/fiber / @react-three/drei
- GLTF room model with Draco compression

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

## Room Model

The compressed room model (`public/room/scene-compressed.glb`) is checked into the repo. The original uncompressed files (`scene.gltf`, `scene.bin`, `textures/`) are gitignored.

To recompress from originals:

```bash
npm install -g gltf-pipeline
# Place scene.gltf, scene.bin, and textures/ in public/room/
gltf-pipeline -i public/room/scene.gltf -o public/room/scene-compressed.glb --draco.compressionLevel 10
```
