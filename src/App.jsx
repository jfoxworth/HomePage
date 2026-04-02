import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Room from './components/Room'
import CameraRig from './components/CameraRig'
import Loader from './components/Loader'
import TitleOverlay from './components/TitleOverlay'

export default function App() {
  return (
    <>
      <TitleOverlay />
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 100, position: [0, 1.5, 0] }}
        style={{ background: '#111111' }}
        dpr={[0.75, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<Loader />}>
          <ScrollControls pages={40} infinite damping={0.3}>
            <CameraRig />
            <ambientLight intensity={0.8} />
            <Room />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  )
}
