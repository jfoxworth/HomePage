import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { useScroll, shaderMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

export const FOG_COLOR = '#0d0912'

// Muted (pre-scroll) vs normal (once the user starts scrolling) tones.
const MUTED_TOP = new THREE.Color('#141519')
const MUTED_BOTTOM = new THREE.Color('#17151a')
const MUTED_FOG = new THREE.Color('#131215')
const NORMAL_TOP = new THREE.Color('#0a1120')
const NORMAL_BOTTOM = new THREE.Color('#1a0f0a')
const NORMAL_FOG = new THREE.Color(FOG_COLOR)
const MUTED_BLOOM = 0.15
const NORMAL_BLOOM = 0.5

const SkyMaterial = shaderMaterial(
  {
    uTop: new THREE.Color('#0a1120'),
    uBottom: new THREE.Color('#1a0f0a'),
  },
  /* glsl */ `
    varying float vY;
    void main() {
      vY = normalize(position).y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform vec3 uTop;
    uniform vec3 uBottom;
    varying float vY;
    void main() {
      float t = smoothstep(-0.3, 0.6, vY);
      gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0);
    }
  `
)

extend({ SkyMaterial })

export default function Background() {
  const scroll = useScroll()
  const skyRef = useRef()
  const fogRef = useRef()
  const bloomRef = useRef()

  useFrame(() => {
    // Muted until the user starts scrolling, then fades to the full look.
    const mix = THREE.MathUtils.smoothstep(scroll.offset, 0, 0.04)

    if (skyRef.current) {
      skyRef.current.uTop.copy(MUTED_TOP).lerp(NORMAL_TOP, mix)
      skyRef.current.uBottom.copy(MUTED_BOTTOM).lerp(NORMAL_BOTTOM, mix)
    }
    if (fogRef.current) {
      fogRef.current.color.copy(MUTED_FOG).lerp(NORMAL_FOG, mix)
    }
    if (bloomRef.current) {
      bloomRef.current.intensity = THREE.MathUtils.lerp(MUTED_BLOOM, NORMAL_BLOOM, mix)
    }
  })

  return (
    <>
      <mesh scale={50}>
        <sphereGeometry args={[1, 32, 32]} />
        <skyMaterial ref={skyRef} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      <fogExp2 ref={fogRef} attach="fog" args={[FOG_COLOR, 0.035]} />

      <Sparkles
        count={90}
        scale={[14, 10, 14]}
        size={2}
        speed={0.15}
        opacity={0.35}
        color="#a9c4ff"
      />

      <EffectComposer>
        <Bloom ref={bloomRef} luminanceThreshold={0.4} luminanceSmoothing={0.25} intensity={MUTED_BLOOM} />
        <Vignette eskil={false} offset={0.25} darkness={0.9} />
      </EffectComposer>
    </>
  )
}
