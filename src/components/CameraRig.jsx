import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const H = 2
const D = 3
const CYCLE = 5 / 40

const keyframes = [
  { offset: 0.0,   pos: [D, H, D],                    target: [0, 1, 0] },
  { offset: 0.08,  pos: [D, H, D],                    target: [0, 1, 0] },

  { offset: 0.20,  pos: [-D, H, D],                   target: [0, 1, 0] },
  { offset: 0.28,  pos: [-D, H, D],                   target: [0, 1, 0] },

  { offset: 0.40,  pos: [-D * 0.6, H, -D * 0.6],     target: [0, 1, 0] },
  { offset: 0.48,  pos: [-D * 0.6, H, -D * 0.6],     target: [0, 1, 0] },

  { offset: 0.60,  pos: [D, H, -D],                   target: [0, 1, 0] },
  { offset: 0.68,  pos: [D, H, -D],                   target: [0, 1, 0] },

  { offset: 1.0,   pos: [D, H, D],                    target: [0, 1, 0] },
]

const tmpPos = new THREE.Vector3()
const tmpTarget = new THREE.Vector3()
const fromPos = new THREE.Vector3()
const toPos = new THREE.Vector3()
const fromTarget = new THREE.Vector3()
const toTarget = new THREE.Vector3()

// Expose cycle position globally so overlays can read it
window.__cycleT = 0

export default function CameraRig() {
  const scroll = useScroll()

  useFrame((state) => {
    const raw = scroll.offset
    const t = (raw % CYCLE) / CYCLE
    window.__cycleT = t

    let i = 0
    for (let j = 0; j < keyframes.length - 1; j++) {
      if (t >= keyframes[j].offset) i = j
    }
    const kf0 = keyframes[i]
    const kf1 = keyframes[Math.min(i + 1, keyframes.length - 1)]

    const range = kf1.offset - kf0.offset
    const local = range > 0 ? Math.min((t - kf0.offset) / range, 1) : 1
    const smooth = THREE.MathUtils.smoothstep(local, 0, 1)

    fromPos.set(...kf0.pos)
    toPos.set(...kf1.pos)
    tmpPos.lerpVectors(fromPos, toPos, smooth)

    fromTarget.set(...kf0.target)
    toTarget.set(...kf1.target)
    tmpTarget.lerpVectors(fromTarget, toTarget, smooth)

    state.camera.position.copy(tmpPos)
    state.camera.lookAt(tmpTarget)
  })

  return null
}
