"use client"

import { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Float,
  Text3D,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Environment,
  Sphere,
  Box,
  Torus,
  MeshDistortMaterial,
  Stars,
  Trail,
  Sparkles,
} from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Zap, Rocket, Code } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  tagline: string
  bio: string
  stats: {
    projectsCompleted: number
    clientsSatisfied: number
    yearsExperience: number
    technologiesMastered: number
  }
}

interface AdvancedHeroSectionProps {
  personalInfo: PersonalInfo
}

function HolographicName() {
  const sanjayRef = useRef<THREE.Mesh>(null)
  const rawatRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    // SANJAY - stable with minimal movement
    if (sanjayRef.current) {
      sanjayRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05 // Very minimal rotation
      sanjayRef.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1 // Minimal vertical movement

      if (hovered) {
        sanjayRef.current.scale.setScalar(1.05) // Less scaling
      } else {
        sanjayRef.current.scale.setScalar(1)
      }
    }

    // RAWAT - with swinging animation (offset timing to avoid collision)
    if (rawatRef.current) {
      rawatRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.6 + Math.PI) * 0.4 // More swing, offset phase
      rawatRef.current.position.y = -0.8 + Math.sin(state.clock.getElapsedTime() * 0.5 + Math.PI / 2) * 0.3 // Vertical movement, offset phase
      rawatRef.current.position.x = -1.5 + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2 // Slight horizontal swing

      if (hovered) {
        rawatRef.current.scale.setScalar(1.1)
      } else {
        rawatRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float position={[0, 1, -3]} speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      {/* First Name - SANJAY (stable) */}
      <Text3D
        ref={sanjayRef}
        font="/fonts/Inter_Bold.json"
        size={0.8}
        height={0.15}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={8}
        position={[-2, 0.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        SANJAY
        <MeshTransmissionMaterial
          color="#00ffff"
          thickness={0.3}
          roughness={0}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          backside
        />
      </Text3D>

      {/* Last Name - RAWAT (with swing) */}
      <Text3D
        ref={rawatRef}
        position={[-1.5, -0.8, 0]}
        font="/fonts/Inter_Bold.json"
        size={0.8}
        height={0.15}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={8}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        RAWAT
        <MeshTransmissionMaterial
          color="#ff00ff"
          thickness={0.3}
          roughness={0}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          backside
        />
      </Text3D>

      {/* Connecting Energy Line - dynamic based on RAWAT position */}
      <mesh position={[-1, -0.15, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[2, 0.02, 0.02]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function FloatingTechOrbs() {
  const groupRef = useRef<THREE.Group>(null)

  const orbs = useMemo(() => {
    const techColors = ["#61dafb", "#f7df1e", "#3776ab", "#ff6b35", "#00d4aa", "#ff0080", "#00ff88", "#8b5cf6"]
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2
      const radius = 6 + Math.sin(i) * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 4

      return {
        position: [x, y, z] as [number, number, number],
        color: techColors[i % techColors.length],
        scale: 0.3 + Math.random() * 0.4,
        speed: 0.5 + Math.random() * 1,
        type: Math.random() > 0.6 ? "sphere" : Math.random() > 0.3 ? "box" : "torus",
      }
    })
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} position={orb.position} speed={orb.speed} rotationIntensity={2} floatIntensity={3}>
          <Trail width={2} length={6} color={orb.color} attenuation={(t) => t * t}>
            {orb.type === "sphere" ? (
              <Sphere args={[orb.scale, 32, 32]}>
                <MeshDistortMaterial color={orb.color} distort={0.4} speed={2} roughness={0} metalness={0.8} />
              </Sphere>
            ) : orb.type === "box" ? (
              <Box args={[orb.scale * 2, orb.scale * 2, orb.scale * 2]}>
                <MeshDistortMaterial color={orb.color} distort={0.3} speed={1.5} roughness={0} metalness={0.8} />
              </Box>
            ) : (
              <Torus args={[orb.scale, orb.scale * 0.4, 16, 32]}>
                <MeshDistortMaterial color={orb.color} distort={0.5} speed={2.5} roughness={0} metalness={0.8} />
              </Torus>
            )}
          </Trail>
        </Float>
      ))}
    </group>
  )
}

function DataStreams() {
  const streamRef = useRef<THREE.Group>(null)

  const streams = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20] as [
        number,
        number,
        number,
      ],
      velocity: [(Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02] as [
        number,
        number,
        number,
      ],
      color: ["#00ffff", "#ff00ff", "#ffff00", "#00ff88"][Math.floor(Math.random() * 4)],
      size: 0.02 + Math.random() * 0.03,
    }))
  }, [])

  useFrame(() => {
    if (streamRef.current) {
      streamRef.current.children.forEach((child, i) => {
        const stream = streams[i]
        child.position.x += stream.velocity[0]
        child.position.y += stream.velocity[1]
        child.position.z += stream.velocity[2]

        // Reset position if out of bounds
        if (Math.abs(child.position.x) > 10) child.position.x *= -1
        if (Math.abs(child.position.y) > 5) child.position.y *= -1
        if (Math.abs(child.position.z) > 10) child.position.z *= -1
      })
    }
  })

  return (
    <group ref={streamRef}>
      {streams.map((stream, i) => (
        <mesh key={i} position={stream.position}>
          <boxGeometry args={[stream.size, stream.size, stream.size]} />
          <meshBasicMaterial color={stream.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function HolographicInterface() {
  const interfaceRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (interfaceRef.current) {
      interfaceRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group ref={interfaceRef} position={[4, 0, -2]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Holographic Rings */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Torus
            key={i}
            args={[1 + i * 0.3, 0.02, 16, 100]}
            position={[0, 0, i * 0.1]}
            rotation={[0, 0, (i * Math.PI) / 4]}
          >
            <meshBasicMaterial
              color={["#00ffff", "#ff00ff", "#ffff00", "#00ff88", "#ff0080"][i]}
              transparent
              opacity={0.6}
            />
          </Torus>
        ))}

        {/* Central Core */}
        <Sphere args={[0.2, 32, 32]}>
          <MeshDistortMaterial color="#ffffff" distort={0.3} speed={3} roughness={0} metalness={1} />
        </Sphere>
      </Float>
    </group>
  )
}

function AdvancedHeroSectionInner({ personalInfo }: AdvancedHeroSectionProps) {
  const [currentStat, setCurrentStat] = useState(0)
  const stats = Object.entries(personalInfo.stats)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <div className="container relative z-10 py-32">
      <div className="grid gap-16 lg:grid-cols-2 items-center min-h-screen">
        {/* 3D Scene */}
        <div className="h-[800px] relative order-2 lg:order-1">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
            <color attach="background" args={["#000"]} />
            <fog attach="fog" args={["#000", 15, 40]} />

            {/* Advanced Lighting */}
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
            <spotLight position={[0, 20, 0]} intensity={3} color="#ffff00" angle={0.3} penumbra={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />

            {/* 3D Elements */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
            <Sparkles count={100} scale={10} size={2} speed={0.4} />

            <Suspense fallback={null}>
              <HolographicName />
              <FloatingTechOrbs />
              <DataStreams />
              <HolographicInterface />
              <Environment preset="night" />
            </Suspense>
          </Canvas>

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Enhanced Content */}
        <div className="space-y-10 order-1 lg:order-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="text-cyan-400 text-sm font-mono tracking-wider animate-typing">
                  {"> SYSTEM INITIALIZED... WELCOME TO THE FUTURE"}
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter gradient-text-primary font-mono leading-none">
                {personalInfo.name.split(" ").map((word, index) => (
                  <div key={index} className="relative inline-block mr-4">
                    <span className="relative z-10">{word}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-yellow-500/20 blur-xl animate-pulse"></div>
                  </div>
                ))}
              </h1>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold theme-text-accent-secondary font-mono">
                  {personalInfo.title}
                </h2>
                <p className="text-xl md:text-2xl theme-text-accent-tertiary font-mono">{personalInfo.subtitle}</p>
                <p className="text-lg theme-text-secondary font-mono italic">"{personalInfo.tagline}"</p>
              </div>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(([key, value], index) => (
                <div
                  key={key}
                  className={`text-center p-4 rounded-lg border transition-all duration-500 ${
                    currentStat === index
                      ? "theme-border-accent bg-cyan-500/10 scale-105"
                      : "border-gray-700 bg-black/20"
                  }`}
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text-primary font-mono">
                    {typeof value === "number" ? `${value}+` : value}
                  </div>
                  <div className="text-xs theme-text-secondary font-mono capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg leading-relaxed theme-text-secondary max-w-2xl">{personalInfo.bio}</p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-wrap gap-6">
            <Button className="cyber-button-primary-advanced group px-8 py-4 text-lg">
              <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              <span className="relative z-10">EXPLORE MY UNIVERSE</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button variant="outline" className="cyber-button-secondary-advanced group px-8 py-4 text-lg">
              <Download className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              <span className="relative z-10">DOWNLOAD NEURAL MAP</span>
            </Button>
          </div>

          {/* Tech Stack Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 theme-text-accent-primary" />
              <span className="font-mono theme-text-accent-primary">CURRENT TECH STACK:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {["React", "Node.js", "Python", "AI/ML", "3D Graphics", "Blockchain"].map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 text-sm font-mono theme-text-accent-primary hover:scale-105 transition-transform cursor-pointer"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-mono theme-text-accent-primary">STATUS: AVAILABLE FOR REVOLUTIONARY PROJECTS</span>
            <Zap className="h-4 w-4 theme-text-accent-tertiary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdvancedHeroSection({ personalInfo }: AdvancedHeroSectionProps) {
  return (
    <SafeClientComponent>
      <AdvancedHeroSectionInner personalInfo={personalInfo} />
    </SafeClientComponent>
  )
}
