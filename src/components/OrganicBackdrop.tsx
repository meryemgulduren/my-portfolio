import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function SageBlob() {
  return (
    <Float speed={1.55} rotationIntensity={0.32} floatIntensity={0.55}>
      <Sphere args={[1, 72, 72]} scale={2.65}>
        <MeshDistortMaterial
          color="#9ba389"
          roughness={0.42}
          metalness={0.12}
          distort={0.38}
          speed={1.62}
        />
      </Sphere>
    </Float>
  )
}

export function OrganicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1]">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={(state) => {
          state.gl.setClearAlpha(0)
          state.scene.background = null
        }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 3.5, 4]} intensity={0.95} />
        <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#f5f1e9" />
        <Suspense fallback={null}>
          <SageBlob />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream-soft/95 via-cream-soft/76 to-sage-muted/40" />
    </div>
  )
}
