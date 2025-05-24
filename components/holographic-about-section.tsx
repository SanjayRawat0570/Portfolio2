"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Float,
  Text3D,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Environment,
  Sphere,
  Box,
  MeshDistortMaterial,
  Stars,
  Trail,
} from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Code, Zap, Calendar, MapPin, Award } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  bio: string
  stats: {
    projectsCompleted: number
    clientsSatisfied: number
    yearsExperience: number
    technologiesMastered: number
  }
}

interface Experience {
  id: number
  company: string
  position: string
  duration: string
  location: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
  projects: string[]
}

interface HolographicAboutSectionProps {
  personalInfo: PersonalInfo
  experience: Experience[]
}

function BrainVisualization() {
  const brainRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      brainRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1

      if (hovered) {
        brainRef.current.scale.setScalar(1.2)
      } else {
        brainRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group ref={brainRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Brain Sphere */}
        <Sphere
          args={[2, 32, 32]}
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshTransmissionMaterial
            color="#00ffff"
            thickness={0.3}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            backside
          />
        </Sphere>

        {/* Neural Network Connections */}
        {Array.from({ length: 25 }).map((_, i) => {
          const angle = (i / 25) * Math.PI * 2
          const radius = 3 + Math.sin(i) * 0.5
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = (Math.random() - 0.5) * 3

          return (
            <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
              <Trail width={1} length={4} color="#ff00ff" attenuation={(t) => t * t}>
                <Sphere args={[0.08, 16, 16]} position={[x, y, z]}>
                  <MeshDistortMaterial color="#ff00ff" distort={0.3} speed={2} roughness={0} metalness={0.8} />
                </Sphere>
              </Trail>
            </Float>
          )
        })}

        {/* Data Streams */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 4
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          return (
            <Float key={`stream-${i}`} speed={2} rotationIntensity={1} floatIntensity={2}>
              <Box args={[0.1, 2, 0.1]} position={[x, 0, z]} rotation={[0, angle, 0]}>
                <meshBasicMaterial color="#ffff00" transparent opacity={0.8} />
              </Box>
            </Float>
          )
        })}
      </Float>
    </group>
  )
}

function AboutText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
      textRef.current.position.y = -4 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <Float position={[0, -4, 0]} speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={0.3}
        height={0.06}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2.5, 0, 0]}
      >
        NEURAL ARCHITECT
        <MeshTransmissionMaterial
          color="#ffff00"
          thickness={0.2}
          roughness={0}
          transmission={0.8}
          ior={1.5}
          chromaticAberration={0.03}
          backside
        />
      </Text3D>
    </Float>
  )
}

function HolographicAboutSectionInner({ personalInfo, experience }: HolographicAboutSectionProps) {
  return (
    <div className="container relative z-10">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        {/* 3D Scene */}
        <div className="h-[700px] relative">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <color attach="background" args={["#000"]} />
            <fog attach="fog" args={["#000", 8, 25]} />

            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
            <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

            <BrainVisualization />
            <AboutText />

            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-cyan-400 text-sm font-mono tracking-wider animate-typing">
                {"> ACCESSING PERSONAL DATABASE..."}
              </div>
              <h2 className="text-5xl font-bold tracking-tighter md:text-7xl gradient-text-primary font-mono">
                NEURAL PROFILE
              </h2>
              <p className="text-xl theme-text-secondary font-mono">{"> COMPREHENSIVE SYSTEM ANALYSIS COMPLETE"}</p>
            </div>

            <div className="space-y-6 text-cyan-300/80 font-mono">
              <p className="text-lg leading-relaxed">
                {"> I am a cybernetic engineer specializing in the fusion of artificial intelligence, "}
                {"3D visualization, and quantum computing. My neural pathways are optimized for "}
                {"creating immersive digital experiences that push the boundaries of what's possible."}
              </p>

              <p className="text-lg leading-relaxed">{personalInfo.bio}</p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(personalInfo.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="group p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold gradient-text-primary font-mono">
                        {typeof value === "number" ? `${value}+` : value}
                      </div>
                      <div className="text-sm theme-text-secondary font-mono capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                    <div className="text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity">
                      {key.includes("project") && <Code className="h-6 w-6" />}
                      {key.includes("client") && <Award className="h-6 w-6" />}
                      {key.includes("year") && <Calendar className="h-6 w-6" />}
                      {key.includes("technolog") && <Zap className="h-6 w-6" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Competencies */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="group p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <Brain className="h-10 w-10 text-cyan-400 mb-4 group-hover:text-pink-400 transition-colors duration-300" />
                <h3 className="font-bold text-cyan-400 mb-2 font-mono text-lg">AI ARCHITECT</h3>
                <p className="text-sm text-cyan-300/70 font-mono">Neural network design & quantum optimization</p>
              </div>

              <div className="group p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <Code className="h-10 w-10 text-cyan-400 mb-4 group-hover:text-pink-400 transition-colors duration-300" />
                <h3 className="font-bold text-cyan-400 mb-2 font-mono text-lg">CODE WIZARD</h3>
                <p className="text-sm text-cyan-300/70 font-mono">Full-stack quantum development & 3D interfaces</p>
              </div>

              <div className="group p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <Zap className="h-10 w-10 text-cyan-400 mb-4 group-hover:text-pink-400 transition-colors duration-300" />
                <h3 className="font-bold text-cyan-400 mb-2 font-mono text-lg">3D ARTIST</h3>
                <p className="text-sm text-cyan-300/70 font-mono">
                  Holographic interface creation & immersive experiences
                </p>
              </div>
            </div>
          </div>

          <Button className="cyber-button-primary-advanced group px-8 py-4 text-lg">
            <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            <span className="relative z-10">DOWNLOAD NEURAL MAP</span>
          </Button>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="mt-20 space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-bold gradient-text-primary font-mono">EXPERIENCE MATRIX</h3>
          <p className="theme-text-secondary font-mono">{"> PROFESSIONAL EVOLUTION TIMELINE"}</p>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <Card
              key={exp.id}
              className="bg-black/40 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold gradient-text-primary font-mono group-hover:text-pink-400 transition-colors">
                      {exp.position}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-semibold theme-text-accent-primary">{exp.company}</span>
                      <Badge variant="outline" className="text-xs">
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm theme-text-secondary font-mono">
                      <Calendar className="h-4 w-4" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm theme-text-secondary font-mono mt-1">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="theme-text-secondary font-mono">{exp.description}</p>

                <div>
                  <h4 className="font-bold theme-text-accent-primary font-mono mb-3">KEY ACHIEVEMENTS:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm theme-text-secondary font-mono">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs border-cyan-400/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HolographicAboutSection({ personalInfo, experience }: HolographicAboutSectionProps) {
  return (
    <SafeClientComponent>
      <HolographicAboutSectionInner personalInfo={personalInfo} experience={experience} />
    </SafeClientComponent>
  )
}
