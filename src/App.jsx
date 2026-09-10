import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import * as THREE from 'three'
import ParticleCross from './components/ParticleCross'
import Background, { FOG_COLOR } from './components/Background'
import CameraRig from './components/CameraRig'
import Loader from './components/Loader'
import Overlay from './components/Overlay'

export default function App() {
  return (
    <>
      <Overlay />
      <Canvas
        camera={{ fov: 35, near: 0.1, far: 120, position: [0, 0.6, 1.1] }}
        style={{ background: FOG_COLOR }}
        dpr={[0.75, 1]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
        }}
      >
        <Suspense fallback={<Loader />}>
          <ScrollControls pages={4} damping={0.25}>
            <CameraRig />
            <Background />
            <ParticleCross />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  )
}
