"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, MeshTransmissionMaterial, PerspectiveCamera, Environment, Float } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"

interface Skill {
  name: string
  percentage: number
  color: string
  experience: string
  category: string
}

interface SkillsProps {
  skills: Skill[]
}

function SkillOrb({ skill, position, index }: { skill: Skill; position: [number, number, number]; index: number }) {
  const orbRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 + index * 0.1
      orbRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.2

      const scale = (skill.percentage / 100) * (hovered ? 1.3 : 1)
      orbRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float position={position} speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh ref={orbRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshTransmissionMaterial
            color={skill.color}
            thickness={0.2}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.02}
            backside
          />
        </mesh>

        {/* Skill Name */}
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.name}
        </Text>

        {/* Percentage */}
        <Text
          position={[0, -1.1, 0]}
          fontSize={0.12}
          color={skill.color}
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.percentage}%
        </Text>

        {/* Experience */}
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.08}
          color="#00ffff"
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.experience}
        </Text>

        {/* Category */}
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.07}
          color="#ff00ff"
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.category}
        </Text>
      </group>
    </Float>
  )
}

function HologramGrid({ skills }: SkillsProps) {
  return (
    <group>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = Math.min(skills.length * 0.3, 6)
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(index * 0.5) * 2

        return <SkillOrb key={skill.name} skill={skill} position={[x, y, z]} index={index} />
      })}
    </group>
  )
}

function SkillsHologramInner({ skills }: SkillsProps) {
  const categories = [...new Set(skills.map((skill) => skill.category))]

  return (
    <div className="space-y-12">
      {/* 3D Hologram */}
      <div className="h-[600px] relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
          <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

          <HologramGrid skills={skills} />

          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Detailed Skill Breakdown */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category)
          const avgPercentage = Math.round(
            categorySkills.reduce((sum, skill) => sum + skill.percentage, 0) / categorySkills.length,
          )

          return (
            <div
              key={category}
              className="group p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-cyan-400 group-hover:text-pink-400 transition-colors duration-300 font-mono text-sm">
                  {category.toUpperCase()}
                </h3>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono">
                  {avgPercentage}%
                </span>
              </div>

              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-cyan-300 font-mono font-bold">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-mono">{skill.percentage}%</span>
                        <span className="text-cyan-500/70 font-mono text-xs">{skill.experience}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-cyan-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{
                          width: `${skill.percentage}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-500/60 font-mono">Proficiency</span>
                      <span className="text-cyan-400/80 font-mono">
                        {skill.percentage >= 90
                          ? "EXPERT"
                          : skill.percentage >= 80
                            ? "ADVANCED"
                            : skill.percentage >= 70
                              ? "INTERMEDIATE"
                              : "BEGINNER"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="text-center p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono">
            {skills.length}
          </div>
          <div className="text-cyan-400 font-mono text-sm">TOTAL SKILLS</div>
        </div>

        <div className="text-center p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 font-mono">
            {Math.round(skills.reduce((sum, skill) => sum + skill.percentage, 0) / skills.length)}%
          </div>
          <div className="text-cyan-400 font-mono text-sm">AVG PROFICIENCY</div>
        </div>

        <div className="text-center p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400 font-mono">
            {skills.filter((skill) => skill.percentage >= 90).length}
          </div>
          <div className="text-cyan-400 font-mono text-sm">EXPERT LEVEL</div>
        </div>

        <div className="text-center p-6 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 font-mono">
            {categories.length}
          </div>
          <div className="text-cyan-400 font-mono text-sm">CATEGORIES</div>
        </div>
      </div>
    </div>
  )
}

export function SkillsHologram({ skills }: SkillsProps) {
  return (
    <SafeClientComponent>
      <SkillsHologramInner skills={skills} />
    </SafeClientComponent>
  )
}
