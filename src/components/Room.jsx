import { useGLTF } from '@react-three/drei'

export default function Room() {
  const { scene } = useGLTF('/room/scene-compressed.glb')

  return <primitive object={scene} />
}

useGLTF.preload('/room/scene-compressed.glb')
