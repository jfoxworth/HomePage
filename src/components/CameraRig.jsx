import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Camera path as literal waypoints — edit the numbers directly, no formulas.
// Each entry: t = scroll progress (0-1, must stay in increasing order),
// pos = camera [x, y, z], look = the point it's aimed at [x, y, z], fov = degrees.
// Two consecutive entries with identical pos/look create a "hold" (a pause).
//
// Current path: start hugging the base of the cross, close enough that
// individual particles are all you see -> circle+rise while hugging the
// vertical beam (two laps) -> peel off along the right arm, hugging its
// surface, and stop at the tip facing back in -> pull way out for a level,
// front-on view of the whole cross.
const keyframes = [
  { t: 0.00, pos: [0.00, -2.70, 0.75], look: [0.00, -2.20, 0.00], fov: 42 },
  { t: 0.05, pos: [0.00, -2.70, 0.75], look: [0.00, -2.20, 0.00], fov: 42 },

  { t: 0.09, pos: [0.65, -2.25, 0.38], look: [0.00, -1.75, 0.00], fov: 42 },
  { t: 0.13, pos: [0.65, -1.80, -0.38], look: [0.00, -1.30, 0.00], fov: 42 },
  { t: 0.17, pos: [0.00, -1.35, -0.75], look: [0.00, -0.85, 0.00], fov: 42 },
  { t: 0.21, pos: [-0.65, -0.90, -0.38], look: [0.00, -0.40, 0.00], fov: 42 },
  { t: 0.25, pos: [-0.65, -0.45, 0.38], look: [0.00, 0.05, 0.00], fov: 42 },
  { t: 0.30, pos: [0.00, 0.00, 0.75], look: [0.00, 0.50, 0.00], fov: 42 },
  { t: 0.36, pos: [0.00, 0.00, 0.75], look: [0.00, 0.50, 0.00], fov: 42 },

  { t: 0.40, pos: [0.69, 0.37, 0.40], look: [0.00, 0.97, 0.00], fov: 42 },
  { t: 0.44, pos: [0.69, 0.73, -0.40], look: [0.00, 1.33, 0.00], fov: 42 },
  { t: 0.48, pos: [0.00, 1.10, -0.80], look: [0.00, 1.70, 0.00], fov: 42 },
  { t: 0.52, pos: [-0.69, 1.47, -0.40], look: [0.00, 2.07, 0.00], fov: 42 },
  { t: 0.56, pos: [-0.69, 1.83, 0.40], look: [0.00, 2.43, 0.00], fov: 42 },
  { t: 0.60, pos: [0.00, 2.20, 0.80], look: [0.00, 2.60, 0.00], fov: 42 },

  { t: 0.65, pos: [0.50, 1.60, 0.60], look: [0.00, 1.40, 0.00], fov: 44 },
  { t: 0.70, pos: [1.00, 1.10, 0.50], look: [0.30, 1.00, 0.00], fov: 44 },
  { t: 0.75, pos: [1.50, 1.40, 0.30], look: [1.20, 1.00, 0.00], fov: 44 },
  { t: 0.80, pos: [2.00, 1.00, 0.40], look: [0.00, 1.00, 0.00], fov: 45 },
  { t: 0.86, pos: [2.00, 1.00, 0.40], look: [0.00, 1.00, 0.00], fov: 45 },

  { t: 1.00, pos: [0.00, 0.00, -8.00], look: [0.00, 0.00, 0.00], fov: 55 },
]

const tmpPos = new THREE.Vector3()
const tmpLook = new THREE.Vector3()

// Exposed so the DOM overlay can sync fades to camera progress without prop drilling.
window.__scrollT = 0

export default function CameraRig() {
  const scroll = useScroll()

  useFrame((state) => {
    const t = THREE.MathUtils.clamp(scroll.offset, 0, 1)
    window.__scrollT = t

    let i = 0
    for (let j = 0; j < keyframes.length - 1; j++) {
      if (t >= keyframes[j].t) i = j
    }
    const kf0 = keyframes[i]
    const kf1 = keyframes[Math.min(i + 1, keyframes.length - 1)]

    const range = kf1.t - kf0.t
    const local = range > 0 ? THREE.MathUtils.clamp((t - kf0.t) / range, 0, 1) : 1
    const s = THREE.MathUtils.smoothstep(local, 0, 1)

    tmpPos.set(
      THREE.MathUtils.lerp(kf0.pos[0], kf1.pos[0], s),
      THREE.MathUtils.lerp(kf0.pos[1], kf1.pos[1], s),
      THREE.MathUtils.lerp(kf0.pos[2], kf1.pos[2], s)
    )
    tmpLook.set(
      THREE.MathUtils.lerp(kf0.look[0], kf1.look[0], s),
      THREE.MathUtils.lerp(kf0.look[1], kf1.look[1], s),
      THREE.MathUtils.lerp(kf0.look[2], kf1.look[2], s)
    )
    const fov = THREE.MathUtils.lerp(kf0.fov, kf1.fov, s)

    state.camera.position.copy(tmpPos)
    state.camera.lookAt(tmpLook)

    if (Math.abs(state.camera.fov - fov) > 0.001) {
      state.camera.fov = fov
      state.camera.updateProjectionMatrix()
    }
  })

  return null
}
