"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text, MeshTransmissionMaterial, PerspectiveCamera, Environment, Stars, Trail } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  percentage: number
  color: string
  experience: string
  category: string
  level: string
  projects: number
}

interface SkillsData {
  programmingLanguages: Skill[]
  frontendTechnologies: Skill[]
  backendTechnologies: Skill[]
  aiAndML: Skill[]
}

interface AdvancedSkillsSectionProps {
  skillsData: SkillsData
}

function SkillOrb({ skill, position, index }: { skill: Skill; position: [number, number, number]; index: number }) {
  const orbRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 + index * 0.1
      orbRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.2

      const baseScale = (skill.percentage / 100) * 0.8 + 0.2
      const scale = baseScale * (hovered ? 1.4 : 1)
      orbRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float position={position} speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <Trail width={2} length={8} color={skill.color} attenuation={(t) => t * t}>
          <mesh ref={orbRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <MeshTransmissionMaterial
              color={skill.color}
              thickness={0.2}
              roughness={0}
              transmission={0.9}
              ior={1.5}
              chromaticAberration={0.02}
              anisotropy={0.3}
              distortion={0.1}
              distortionScale={0.2}
              temporalDistortion={0.1}
              backside
            />
          </mesh>
        </Trail>

        {/* Skill Name */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.name}
        </Text>

        {/* Percentage */}
        <Text
          position={[0, -1, 0]}
          fontSize={0.15}
          color={skill.color}
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.percentage}%
        </Text>

        {/* Level */}
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.08}
          color="#ffff00"
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.level}
        </Text>
      </group>
    </Float>
  )
}

function SkillsConstellation({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {skills.slice(0, 12).map((skill, index) => {
        const angle = (index / 12) * Math.PI * 2
        const radius = 4 + Math.sin(index * 0.5) * 1
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(index * 0.3) * 2

        return <SkillOrb key={skill.name} skill={skill} position={[x, y, z]} index={index} />
      })}
    </group>
  )
}

function AdvancedSkillsSectionInner({ skillsData }: AdvancedSkillsSectionProps) {
  const [activeTab, setActiveTab] = useState("programming")

  const skillCategories = {
    programming: {
      title: "Programming Languages",
      skills: skillsData.programmingLanguages,
      description: "Core programming languages mastered",
      icon: "💻",
    },
    frontend: {
      title: "Frontend Technologies",
      skills: skillsData.frontendTechnologies,
      description: "Frontend frameworks and technologies",
      icon: "🎨",
    },
    backend: {
      title: "Backend Technologies",
      skills: skillsData.backendTechnologies,
      description: "Backend frameworks and server technologies",
      icon: "⚙️",
    },
    ai: {
      title: "AI & Machine Learning",
      skills: skillsData.aiAndML,
      description: "AI/ML frameworks and technologies",
      icon: "🤖",
    },
  }

  const currentCategory = skillCategories[activeTab as keyof typeof skillCategories]
  const allSkills = Object.values(skillsData).flat()

  const skillStats = useMemo(() => {
    return {
      totalSkills: allSkills.length,
      avgProficiency: Math.round(allSkills.reduce((sum, skill) => sum + skill.percentage, 0) / allSkills.length),
      expertLevel: allSkills.filter((skill) => skill.percentage >= 90).length,
      totalProjects: allSkills.reduce((sum, skill) => sum + skill.projects, 0),
    }
  }, [allSkills])

  return (
    <div className="container relative z-10">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <div className="text-cyan-400 text-sm font-mono tracking-wider animate-typing">
            {"> ANALYZING NEURAL CAPABILITIES..."}
          </div>
          <h2 className="text-5xl font-bold tracking-tighter md:text-7xl gradient-text-primary font-mono">
            SKILL MATRIX
          </h2>
          <p className="text-xl theme-text-secondary font-mono max-w-3xl mx-auto">
            {"> COMPREHENSIVE TECHNICAL EXPERTISE ACROSS MULTIPLE DOMAINS"}
          </p>
        </div>

        {/* Skills Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-sm">
            {Object.entries(skillCategories).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="text-sm font-mono">
                {category.icon} {category.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(skillCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-12">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                {/* 3D Skills Constellation */}
                <div className="h-[600px] relative">
                  <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                    <color attach="background" args={["#000"]} />
                    <fog attach="fog" args={["#000", 8, 25]} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
                    <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

                    <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

                    <SkillsConstellation skills={category.skills} />

                    <Environment preset="night" />
                  </Canvas>
                </div>

                {/* Skills Details */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold gradient-text-primary font-mono mb-2">{category.title}</h3>
                    <p className="theme-text-secondary font-mono">{category.description}</p>
                  </div>

                  <div className="grid gap-6">
                    {category.skills.map((skill) => (
                      <Card
                        key={skill.name}
                        className="bg-black/40 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-mono font-bold theme-text-accent-primary text-lg group-hover:text-pink-400 transition-colors">
                                {skill.name}
                              </h4>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {skill.level}
                                </Badge>
                                <span className="text-sm theme-text-secondary font-mono">{skill.experience}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold gradient-text-primary font-mono">
                                {skill.percentage}%
                              </div>
                              <div className="text-xs theme-text-secondary font-mono">{skill.projects} projects</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Progress
                              value={skill.percentage}
                              className="h-3 bg-gray-800"
                              style={{
                                background: `linear-gradient(90deg, ${skill.color}20 0%, ${skill.color}40 ${skill.percentage}%, transparent ${skill.percentage}%)`,
                              }}
                            />
                            <div className="flex justify-between text-xs theme-text-secondary font-mono">
                              <span>Proficiency Level</span>
                              <span className="theme-text-accent-primary">
                                {skill.percentage >= 90
                                  ? "Expert"
                                  : skill.percentage >= 80
                                    ? "Advanced"
                                    : skill.percentage >= 70
                                      ? "Intermediate"
                                      : "Beginner"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Skills Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                {skillStats.totalSkills}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Total Skills</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Across all domains</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                {skillStats.avgProficiency}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Avg Proficiency</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Overall expertise</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                {skillStats.expertLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Expert Level</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">90%+ proficiency</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                {skillStats.totalProjects}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Total Projects</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Practical experience</p>
            </CardContent>
          </Card>
        </div>

        {/* Skill Level Distribution */}
        <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold gradient-text-primary font-mono text-center">
              EXPERTISE DISTRIBUTION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              {["Expert", "Advanced", "Intermediate", "Beginner"].map((level) => {
                const count = allSkills.filter((skill) => skill.level === level).length
                const percentage = Math.round((count / allSkills.length) * 100)

                return (
                  <div key={level} className="text-center p-4 rounded-lg border border-cyan-500/20 bg-black/20">
                    <div className="text-2xl font-bold gradient-text-primary font-mono mb-2">{count}</div>
                    <div className="text-sm theme-text-accent-primary font-mono mb-1">{level}</div>
                    <div className="text-xs theme-text-secondary font-mono">{percentage}% of skills</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function AdvancedSkillsSection({ skillsData }: AdvancedSkillsSectionProps) {
  return (
    <SafeClientComponent>
      <AdvancedSkillsSectionInner skillsData={skillsData} />
    </SafeClientComponent>
  )
}
