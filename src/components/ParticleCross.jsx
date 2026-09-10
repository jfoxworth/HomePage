import { useMemo, useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Latin cross proportions: tall vertical beam, arm ~1/3 down from the top.
// Exported so CameraRig can target the same anchor heights.
export const CROSS = {
  beamWidth: 0.9,
  beamDepth: 0.9,
  top: 3,
  base: -3,
  armY: 1,
  armHalfLength: 1.8,
  armHeight: 0.9,
  armDepth: 0.9,
}

const PARTICLE_COUNT = 8000
const TOP_COLOR = new THREE.Color('#bcd9ff')
const BASE_COLOR = new THREE.Color('#ff9a52')

const MAX_DRIFT = 0.08

function randomInBox(minX, maxX, minY, maxY, minZ, maxZ, surfaceBias) {
  let x = THREE.MathUtils.randFloat(minX, maxX)
  let y = THREE.MathUtils.randFloat(minY, maxY)
  let z = THREE.MathUtils.randFloat(minZ, maxZ)

  if (Math.random() < surfaceBias) {
    const jitter = 0.02
    const axis = Math.floor(Math.random() * 3)
    if (axis === 0) x = (Math.random() < 0.5 ? minX : maxX) + THREE.MathUtils.randFloatSpread(jitter)
    if (axis === 1) y = (Math.random() < 0.5 ? minY : maxY) + THREE.MathUtils.randFloatSpread(jitter)
    if (axis === 2) z = (Math.random() < 0.5 ? minZ : maxZ) + THREE.MathUtils.randFloatSpread(jitter)
  }

  // How far this particle can wander on each axis before it would cross
  // its box wall, capped at MAX_DRIFT so motion stays subtle.
  const drift = [
    Math.min(x - minX, maxX - x, MAX_DRIFT),
    Math.min(y - minY, maxY - y, MAX_DRIFT),
    Math.min(z - minZ, maxZ - z, MAX_DRIFT),
  ]

  return [x, y, z, drift]
}

function buildGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)
  const phases = new Float32Array(PARTICLE_COUNT)
  const drifts = new Float32Array(PARTICLE_COUNT * 3)

  const beamVolume = CROSS.beamWidth * CROSS.beamDepth * (CROSS.top - CROSS.base)
  const armVolume = CROSS.armHalfLength * 2 * CROSS.armHeight * CROSS.armDepth
  const beamFraction = beamVolume / (beamVolume + armVolume)

  const tmpColor = new THREE.Color()

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let pos
    if (Math.random() < beamFraction) {
      pos = randomInBox(
        -CROSS.beamWidth / 2, CROSS.beamWidth / 2,
        CROSS.base, CROSS.top,
        -CROSS.beamDepth / 2, CROSS.beamDepth / 2,
        0.4
      )
    } else {
      pos = randomInBox(
        -CROSS.armHalfLength, CROSS.armHalfLength,
        CROSS.armY - CROSS.armHeight / 2, CROSS.armY + CROSS.armHeight / 2,
        -CROSS.armDepth / 2, CROSS.armDepth / 2,
        0.4
      )
    }

    positions[i * 3] = pos[0]
    positions[i * 3 + 1] = pos[1]
    positions[i * 3 + 2] = pos[2]

    drifts[i * 3] = pos[3][0]
    drifts[i * 3 + 1] = pos[3][1]
    drifts[i * 3 + 2] = pos[3][2]

    const t = THREE.MathUtils.clamp((pos[1] - CROSS.base) / (CROSS.top - CROSS.base), 0, 1)
    tmpColor.copy(BASE_COLOR).lerp(TOP_COLOR, t)
    colors[i * 3] = tmpColor.r
    colors[i * 3 + 1] = tmpColor.g
    colors[i * 3 + 2] = tmpColor.b

    sizes[i] = THREE.MathUtils.randFloat(0.8, 2.2)
    phases[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  geometry.setAttribute('aDrift', new THREE.BufferAttribute(drifts, 3))
  return geometry
}

const CrossParticleMaterial = shaderMaterial(
  { uTime: 0, uSize: 70 },
  /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    attribute vec3 color;
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aDrift;
    varying vec3 vColor;
    void main() {
      vColor = color;
      // Wander in place — sin() stays within [-1, 1], and aDrift is capped to
      // this particle's distance from its box wall, so it can never cross it.
      vec3 driftedPosition = position + aDrift * vec3(
        sin(uTime * 0.6 + aPhase),
        sin(uTime * 0.5 + aPhase * 1.3),
        sin(uTime * 0.7 + aPhase * 1.7)
      );
      vec4 mvPosition = modelViewMatrix * vec4(driftedPosition, 1.0);
      float shimmer = 0.75 + 0.25 * sin(uTime * 1.6 + aPhase);
      // Clamp so points can't balloon into full-screen overdraw at close range.
      gl_PointSize = clamp(aSize * shimmer * (uSize / -mvPosition.z), 1.0, 14.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* glsl */ `
    varying vec3 vColor;
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      float alpha = smoothstep(0.5, 0.0, d) * 0.8;
      if (alpha < 0.02) discard;
      gl_FragColor = vec4(vColor, alpha);
    }
  `
)

extend({ CrossParticleMaterial })

export default function ParticleCross() {
  const geometry = useMemo(() => buildGeometry(), [])
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uTime = state.clock.elapsedTime
  })

  return (
    <points geometry={geometry}>
      <crossParticleMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
