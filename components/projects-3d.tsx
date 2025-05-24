"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text, MeshTransmissionMaterial, PerspectiveCamera, Environment } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  githubUrl: string
  featured: boolean
}

interface ProjectsProps {
  projects: Project[]
}

function ProjectHologram({
  project,
  position,
  index,
}: { project: Project; position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2 + index * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + index) * 0.2
    }
  })

  return (
    <Float position={position} speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[2, 2.5, 0.1]} />
        <MeshTransmissionMaterial
          color={project.featured ? "#00ffff" : "#ff00ff"}
          thickness={0.1}
          roughness={0}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.02}
          backside
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="center"
        font="/fonts/Inter_Bold.json"
      >
        {project.title}
      </Text>
    </Float>
  )
}

function ProjectsScene({ projects }: ProjectsProps) {
  return (
    <group>
      {projects.slice(0, 6).map((project, index) => {
        const angle = (index / 6) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (index % 2) * 2 - 1

        return <ProjectHologram key={project.title} project={project} position={[x, y, z]} index={index} />
      })}
    </group>
  )
}

function ProjectsSection3DInner({ projects }: ProjectsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 items-center">
      {/* 3D Scene */}
      <div className="h-[600px] relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
          <ProjectsScene projects={projects} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.slice(0, 3).map((project, index) => (
          <div
            key={project.title}
            className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm p-6 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-pink-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400 group-hover:text-pink-400 transition-colors duration-300 font-mono">
                  {project.title}
                </h3>
                {project.featured && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold">FEATURED</Badge>
                )}
              </div>

              <p className="text-cyan-300/70 mb-4 font-mono text-sm">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-cyan-400/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-black font-bold transition-all duration-300"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  DEMO
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                >
                  <Github className="mr-2 h-4 w-4" />
                  CODE
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectsSection3D({ projects }: ProjectsProps) {
  return (
    <SafeClientComponent>
      <ProjectsSection3DInner projects={projects} />
    </SafeClientComponent>
  )
}
