"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Stars,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
  Box,
  Text3D,
  Environment,
  useTexture,
  PerspectiveCamera,
} from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <Sphere args={[1, 100, 200]} ref={meshRef} scale={2.5} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#8800ff"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </Sphere>
  )
}

function FloatingObjects() {
  const objects = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10],
      scale: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * Math.PI,
      color: ["#ff00ff", "#00ffff", "#ff00aa", "#aa00ff", "#00aaff"][Math.floor(Math.random() * 5)],
      speed: Math.random() * 2 + 1,
      type: Math.random() > 0.7 ? "box" : Math.random() > 0.5 ? "sphere" : "torus",
    }))
  }, [])

  return (
    <>
      {objects.map((props, i) => (
        <Float
          key={i}
          position={props.position as [number, number, number]}
          rotation={[props.rotation, props.rotation, props.rotation]}
          speed={props.speed}
          rotationIntensity={1}
          floatIntensity={2}
        >
          {props.type === "box" ? (
            <Box args={[1, 1, 1]} scale={props.scale}>
              <MeshWobbleMaterial
                color={props.color}
                factor={0.4}
                speed={0.5}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.7}
              />
            </Box>
          ) : props.type === "sphere" ? (
            <Sphere args={[0.5, 16, 16]} scale={props.scale}>
              <MeshWobbleMaterial
                color={props.color}
                factor={0.2}
                speed={0.3}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.7}
              />
            </Sphere>
          ) : (
            <mesh scale={props.scale}>
              <torusGeometry args={[0.5, 0.2, 16, 32]} />
              <MeshWobbleMaterial
                color={props.color}
                factor={0.6}
                speed={0.4}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.7}
              />
            </mesh>
          )}
        </Float>
      ))}
    </>
  )
}

function FloatingText() {
  return (
    <Float position={[0, -2, 0]} rotation={[0, 0, 0]} speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        PORTFOLIO
        <MeshDistortMaterial
          color="#ff00ff"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0}
          metalness={1}
          wireframe={false}
        />
      </Text3D>
    </Float>
  )
}

function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null)
  const starsRef = useRef<THREE.Points>(null)

  const starPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      positions.push(x, y, z)
    }
    return new Float32Array(positions)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }

    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01 * (Math.random() * 2 + 1)

        if (positions[i + 1] < -50) {
          positions[i + 1] = 50
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
      </points>
    </group>
  )
}

function SpinningGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture("/placeholder.svg?height=1024&width=2048")

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <Float position={[3, 1, -2]} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.2}>
        <meshStandardMaterial map={texture} metalness={0.2} roughness={0.8} />
      </Sphere>
    </Float>
  )
}

function HeroBackgroundInner() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-900/20 to-black/80 z-10"></div>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 5, 30]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ff00ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ShootingStars />
        <AnimatedSphere />
        <FloatingObjects />
        <FloatingText />
        <SpinningGlobe />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export function HeroBackground() {
  return (
    <SafeClientComponent>
      <HeroBackgroundInner />
    </SafeClientComponent>
  )
}
