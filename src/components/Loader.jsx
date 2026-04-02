import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html center style={{ marginTop: '40vh' }}>
      <div style={{
        color: '#c0d8ff',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        textAlign: 'center',
      }}>
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#4488ff',
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          }} />
        </div>
        <p style={{ marginTop: '0.8rem', fontSize: '0.85rem', opacity: 0.7, letterSpacing: '0.1em' }}>
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  )
}
