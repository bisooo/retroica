'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/Avocado/glTF/Avocado.gltf')
  const modelRef = useRef<THREE.Group>()

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Center>
      <group position={[0, -3.5, 0]}>
        <primitive ref={modelRef} object={scene} scale={[100, 100, 100]} />
      </group>
    </Center>
  )
}

export default function Product3DModel() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/Avocado/glTF/effect1.gif?height=400&width=400)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full h-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  )
}