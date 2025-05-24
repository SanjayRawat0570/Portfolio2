"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Stars,
  Float,
  Text3D,
  Environment,
  PerspectiveCamera,
  MeshTransmissionMaterial,
  Sphere,
  Box,
  Torus,
} from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"

function CyberGrid() {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
      gridRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5
    }
  })

  const gridLines = useMemo(() => {
    const lines = []
    for (let i = -10; i <= 10; i++) {
      lines.push(
        <mesh key={`h-${i}`} position={[0, 0, i]} rotation={[0, 0, 0]}>
          <boxGeometry args={[20, 0.02, 0.02]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </mesh>,
      )
      lines.push(
        <mesh key={`v-${i}`} position={[i, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, 20]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </mesh>,
      )
    }
    return lines
  }, [])

  return (
    <group ref={gridRef} position={[0, -5, 0]}>
      {gridLines}
    </group>
  )
}

function FloatingHolograms() {
  const holograms = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15],
      scale: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI,
      color: ["#00ffff", "#ff00ff", "#ffff00", "#ff0080", "#80ff00"][Math.floor(Math.random() * 5)],
      speed: Math.random() * 2 + 1,
      type: Math.random() > 0.6 ? "sphere" : Math.random() > 0.3 ? "box" : "torus",
    }))
  }, [])

  return (
    <>
      {holograms.map((props, i) => (
        <Float
          key={i}
          position={props.position as [number, number, number]}
          rotation={[props.rotation, props.rotation, props.rotation]}
          speed={props.speed}
          rotationIntensity={2}
          floatIntensity={3}
        >
          {props.type === "sphere" ? (
            <Sphere args={[0.5, 16, 16]} scale={props.scale}>
              <MeshTransmissionMaterial
                color={props.color}
                thickness={0.2}
                roughness={0}
                transmission={0.9}
                ior={1.5}
                chromaticAberration={0.02}
                backside
              />
            </Sphere>
          ) : props.type === "box" ? (
            <Box args={[1, 1, 1]} scale={props.scale}>
              <MeshTransmissionMaterial
                color={props.color}
                thickness={0.2}
                roughness={0}
                transmission={0.9}
                ior={1.5}
                chromaticAberration={0.02}
                backside
              />
            </Box>
          ) : (
            <Torus args={[0.5, 0.2, 16, 32]} scale={props.scale}>
              <MeshTransmissionMaterial
                color={props.color}
                thickness={0.2}
                roughness={0}
                transmission={0.9}
                ior={1.5}
                chromaticAberration={0.02}
                backside
              />
            </Torus>
          )}
        </Float>
      ))}
    </>
  )
}

function CyberText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <Float position={[0, 2, -5]} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        CYBER
        <MeshTransmissionMaterial
          color="#00ffff"
          thickness={0.3}
          roughness={0}
          transmission={0.8}
          ior={1.5}
          chromaticAberration={0.05}
          backside
        />
      </Text3D>
    </Float>
  )
}

function DataStreams() {
  const streamRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (streamRef.current) {
      streamRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const streams = useMemo(() => {
    const streamElements = []
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2
      const radius = 8
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 10

      streamElements.push(
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
        </mesh>,
      )
    }
    return streamElements
  }, [])

  return <group ref={streamRef}>{streams}</group>
}

function CyberpunkHeroInner() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-cyan-900/10 to-black/90 z-10"></div>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 10, 50]} />

        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight position={[0, 20, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
        <CyberGrid />
        <FloatingHolograms />
        <CyberText />
        <DataStreams />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export function CyberpunkHero() {
  return (
    <SafeClientComponent>
      <CyberpunkHeroInner />
    </SafeClientComponent>
  )
}
