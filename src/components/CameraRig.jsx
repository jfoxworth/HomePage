import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Camera path as literal waypoints — edit the numbers directly, no formulas.
// Each entry: t = scroll progress (0-1, must stay in increasing order),
// pos = camera [x, y, z], fov = degrees.
// Two consecutive entries with identical pos create a "hold" (a pause).
// Position waypoints are threaded through a Catmull-Rom spline (see below),
// so they only need to rough out the coil — the spline smooths the polygon
// into a continuous spring shape. The camera looks in its direction of
// travel along that spline, not at the cross, until the final reveal.
//
// Current path: start hugging the base of the cross, close enough that
// individual particles are all you see -> spiral+rise while hugging the
// vertical beam (two laps) -> peel off along the right arm, hugging its
// surface, and stop at the tip facing back in -> pull way out for a level,
// front-on view of the whole cross.
const keyframes = [
  { t: 0.00, pos: [0.00, -2.70, 0.75], fov: 42 },
  { t: 0.05, pos: [0.00, -2.70, 0.75], fov: 42 },

  { t: 0.09, pos: [0.65, -2.25, 0.38], fov: 42 },
  { t: 0.13, pos: [0.65, -1.80, -0.38], fov: 42 },
  { t: 0.17, pos: [0.00, -1.35, -0.75], fov: 42 },
  { t: 0.21, pos: [-0.65, -0.90, -0.38], fov: 42 },
  { t: 0.25, pos: [-0.65, -0.45, 0.38], fov: 42 },
  { t: 0.30, pos: [0.00, 0.00, 0.75], fov: 42 },
  { t: 0.36, pos: [0.00, 0.00, 0.75], fov: 42 },

  { t: 0.40, pos: [0.69, 0.37, 0.40], fov: 42 },
  { t: 0.44, pos: [0.69, 0.73, -0.40], fov: 42 },
  { t: 0.48, pos: [0.00, 1.10, -0.80], fov: 42 },
  { t: 0.52, pos: [-0.69, 1.47, -0.40], fov: 42 },
  { t: 0.56, pos: [-0.69, 1.83, 0.40], fov: 42 },
  { t: 0.60, pos: [0.00, 2.20, 0.80], fov: 42 },

  { t: 0.65, pos: [0.50, 1.60, 0.60], fov: 44 },
  { t: 0.70, pos: [1.00, 1.10, 0.50], fov: 44 },
  { t: 0.75, pos: [1.50, 1.40, 0.30], fov: 44 },
  { t: 0.80, pos: [2.00, 1.00, 0.40], fov: 45 },
  { t: 0.86, pos: [2.00, 1.00, 0.40], fov: 45 },

  // Finale: break from the spline and pull straight back for the reveal.
  { t: 1.00, pos: [0.00, 0.00, -8.00], fov: 55, look: [0.00, 0.00, 0.00] },
]

const FINALE_START_T = keyframes[keyframes.length - 2].t
const REVEAL_LOOK = new THREE.Vector3(...keyframes[keyframes.length - 1].look)
const LOOK_AHEAD = 1.2
// Pure tangent-look points the camera along the path only, which at close
// range swings the narrow particle column out of frame. Blending part of
// the way toward the central axis keeps the cross in view while still
// leading forward, so it reads as "orbiting something" instead of empty fog.
const AXIS_BIAS = 0.45

// Build a smooth spring/coil curve through the travel waypoints (everything
// up to the finale). Consecutive duplicate positions (holds) collapse to a
// single control point so the spline doesn't get a zero-length segment —
// each travel keyframe still gets a matching curve parameter `u` so the
// scroll-driven segment search above can look up a position on the curve.
const travelKeyframes = keyframes.filter((k) => k.t <= FINALE_START_T)
const curvePoints = []
const travelU = travelKeyframes.map((kf) => {
  const p = new THREE.Vector3(...kf.pos)
  const last = curvePoints[curvePoints.length - 1]
  if (!last || !last.equals(p)) curvePoints.push(p)
  return curvePoints.length - 1
})
const maxIndex = curvePoints.length - 1
for (let i = 0; i < travelU.length; i++) travelU[i] /= maxIndex

const pathCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5)

// Where the travel spline ends, looking forward — the finale blends from
// this into REVEAL_LOOK so the cut into the pull-back isn't a jump.
const travelEndPos = pathCurve.getPoint(1)
const travelEndLook = travelEndPos.clone().addScaledVector(pathCurve.getTangent(1), LOOK_AHEAD)

const tmpPos = new THREE.Vector3()
const tmpLook = new THREE.Vector3()
const tmpAxis = new THREE.Vector3()

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
    const fov = THREE.MathUtils.lerp(kf0.fov, kf1.fov, s)

    if (kf0.t >= FINALE_START_T) {
      // Finale: straight pull-back from the end of the coil to the wide reveal shot.
      tmpPos.set(
        THREE.MathUtils.lerp(kf0.pos[0], kf1.pos[0], s),
        THREE.MathUtils.lerp(kf0.pos[1], kf1.pos[1], s),
        THREE.MathUtils.lerp(kf0.pos[2], kf1.pos[2], s)
      )
      tmpLook.copy(travelEndLook).lerp(REVEAL_LOOK, s)
    } else {
      // Travel: sample the coil spline and look ahead along it, not at the cross.
      const u = THREE.MathUtils.clamp(THREE.MathUtils.lerp(travelU[i], travelU[i + 1], s), 0, 1)
      pathCurve.getPoint(u, tmpPos)
      tmpLook.copy(tmpPos).addScaledVector(pathCurve.getTangent(u), LOOK_AHEAD)
      tmpAxis.set(0, tmpPos.y, 0)
      tmpLook.lerp(tmpAxis, AXIS_BIAS)
    }

    state.camera.position.copy(tmpPos)
    state.camera.up.set(0, 1, 0)
    state.camera.lookAt(tmpLook)

    if (Math.abs(state.camera.fov - fov) > 0.001) {
      state.camera.fov = fov
      state.camera.updateProjectionMatrix()
    }
  })

  return null
}
