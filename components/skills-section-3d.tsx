"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, MeshTransmissionMaterial, PerspectiveCamera, Environment, Float } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Skill {
  name: string
  percentage: number
  color: string
  experience: string
  category: string
}

interface SkillsData {
  programmingLanguages: Skill[]
  frontendTechnologies: Skill[]
  backendTechnologies: Skill[]
  databases: Skill[]
  cloudAndDevOps: Skill[]
  aiAndML: Skill[]
  tools: Skill[]
}

interface SkillsSection3DProps {
  skillsData: SkillsData
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
          <sphereGeometry args={[0.3, 32, 32]} />
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

        <Text
          position={[0, -0.6, 0]}
          fontSize={0.08}
          color="white"
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.name}
        </Text>

        <Text
          position={[0, -0.75, 0]}
          fontSize={0.1}
          color={skill.color}
          anchorX="center"
          anchorY="center"
          font="/fonts/Inter_Bold.json"
        >
          {skill.percentage}%
        </Text>
      </group>
    </Float>
  )
}

function SkillsVisualization({ skills }: { skills: Skill[] }) {
  return (
    <group>
      {skills.slice(0, 12).map((skill, index) => {
        const angle = (index / 12) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(index * 0.5) * 1

        return <SkillOrb key={skill.name} skill={skill} position={[x, y, z]} index={index} />
      })}
    </group>
  )
}

function SkillsSection3DInner({ skillsData }: SkillsSection3DProps) {
  const [activeTab, setActiveTab] = useState("programming")

  const skillCategories = {
    programming: {
      title: "Programming Languages",
      skills: skillsData.programmingLanguages,
      description: "Core programming languages I work with",
    },
    frontend: {
      title: "Frontend Technologies",
      skills: skillsData.frontendTechnologies,
      description: "Frontend frameworks and technologies",
    },
    backend: {
      title: "Backend Technologies",
      skills: skillsData.backendTechnologies,
      description: "Backend frameworks and server technologies",
    },
    database: {
      title: "Databases",
      skills: skillsData.databases,
      description: "Database systems and data storage solutions",
    },
    cloud: {
      title: "Cloud & DevOps",
      skills: skillsData.cloudAndDevOps,
      description: "Cloud platforms and DevOps tools",
    },
    ai: {
      title: "AI & Machine Learning",
      skills: skillsData.aiAndML,
      description: "AI/ML frameworks and technologies",
    },
    tools: {
      title: "Tools & Software",
      skills: skillsData.tools,
      description: "Development tools and software",
    },
  }

  const currentCategory = skillCategories[activeTab as keyof typeof skillCategories]

  return (
    <div className="container relative z-10">
      <div className="flex flex-col gap-16">
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <div className="text-accent-primary text-sm font-mono tracking-wider animate-typing">
            {"> TECHNICAL EXPERTISE"}
          </div>
          <h2 className="text-4xl font-bold tracking-tighter md:text-6xl gradient-text-primary font-mono section-title">
            SKILLS & TECHNOLOGIES
          </h2>
          <p className="md:text-xl font-mono theme-text-secondary max-w-3xl mx-auto">
            {"> COMPREHENSIVE TECHNICAL STACK ACROSS MULTIPLE DOMAINS"}
          </p>
        </div>

        {/* Skills Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-black/40 backdrop-blur-sm">
            <TabsTrigger value="programming" className="text-xs">
              Languages
            </TabsTrigger>
            <TabsTrigger value="frontend" className="text-xs">
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="text-xs">
              Backend
            </TabsTrigger>
            <TabsTrigger value="database" className="text-xs">
              Database
            </TabsTrigger>
            <TabsTrigger value="cloud" className="text-xs">
              Cloud
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">
              AI/ML
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs">
              Tools
            </TabsTrigger>
          </TabsList>

          {Object.entries(skillCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                {/* 3D Visualization */}
                <div className="h-[500px] relative">
                  <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />

                    <SkillsVisualization skills={category.skills} />

                    <Environment preset="night" />
                  </Canvas>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text-primary font-mono mb-2">{category.title}</h3>
                    <p className="theme-text-secondary font-mono">{category.description}</p>
                  </div>

                  <div className="grid gap-4">
                    {category.skills.map((skill) => (
                      <Card key={skill.name} className="bg-black/40 backdrop-blur-sm border-cyan-500/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono font-bold theme-text-accent-primary">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono theme-text-accent-secondary">{skill.experience}</span>
                              <Badge variant="outline" className="text-xs">
                                {skill.percentage}%
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${skill.percentage}%`,
                                backgroundColor: skill.color,
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs theme-text-secondary font-mono">{skill.category}</span>
                            <span className="text-xs theme-text-accent-primary font-mono">
                              {skill.percentage >= 90
                                ? "Expert"
                                : skill.percentage >= 80
                                  ? "Advanced"
                                  : skill.percentage >= 70
                                    ? "Intermediate"
                                    : "Beginner"}
                            </span>
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

        {/* Skills Summary */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {Object.values(skillsData).flat().length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Total Skills</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {Math.round(
                  Object.values(skillsData)
                    .flat()
                    .reduce((sum, skill) => sum + skill.percentage, 0) / Object.values(skillsData).flat().length,
                )}
                %
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Avg Proficiency</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {
                  Object.values(skillsData)
                    .flat()
                    .filter((skill) => skill.percentage >= 90).length
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Expert Level</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {Object.keys(skillsData).length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Categories</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function SkillsSection3D({ skillsData }: SkillsSection3DProps) {
  return (
    <SafeClientComponent>
      <SkillsSection3DInner skillsData={skillsData} />
    </SafeClientComponent>
  )
}
