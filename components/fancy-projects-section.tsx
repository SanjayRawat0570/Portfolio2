"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, PerspectiveCamera, Environment, Sphere, Stars, Html } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Star } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  githubUrl: string
  featured: boolean
  category: string
  status: string
  year: string
  complexity: string
  impact: string
  technologies: string[]
  features: string[]
  metrics: {
    users: string
    performance: string
    satisfaction: string
    [key: string]: string
  }
}

interface FancyProjectsSectionProps {
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
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + index) * 0.3

      if (hovered) {
        meshRef.current.scale.setScalar(1.2)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const complexityColor =
    project.complexity === "Extreme" ? "#ff0080" : project.complexity === "High" ? "#00ffff" : "#ffff00"

  return (
    <Float position={position} speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <boxGeometry args={[2.5, 3, 0.2]} />
          <MeshTransmissionMaterial
            color={project.featured ? "#00ffff" : complexityColor}
            thickness={0.1}
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

        {/* Project Title */}
        <Html position={[0, 0, 0.2]} center>
          <div className="text-center p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-cyan-500/30 min-w-[200px]">
            <h3 className="text-lg font-bold gradient-text-primary font-mono mb-2">{project.title}</h3>
            <p className="text-xs theme-text-secondary font-mono mb-2">{project.category}</p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="text-xs">
                {project.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {project.complexity}
              </Badge>
            </div>
          </div>
        </Html>

        {/* Floating Icons */}
        {project.featured && (
          <Float position={[1.5, 1.5, 0]} speed={3} rotationIntensity={2} floatIntensity={2}>
            <Sphere args={[0.1, 16, 16]}>
              <meshBasicMaterial color="#ffff00" />
            </Sphere>
          </Float>
        )}
      </group>
    </Float>
  )
}

function ProjectsGalaxy({ projects }: { projects: Project[] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {projects.slice(0, 6).map((project, index) => {
        const angle = (index / 6) * Math.PI * 2
        const radius = 5 + Math.sin(index) * 1
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (index % 2) * 3 - 1.5

        return <ProjectHologram key={project.id} project={project} position={[x, y, z]} index={index} />
      })}
    </group>
  )
}

function FancyProjectsSectionInner({ projects }: FancyProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(projects.map((p) => p.category.toLowerCase().replace(/[^a-z0-9]/g, "")))]
    return cats
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects
    return projects.filter((p) => p.category.toLowerCase().replace(/[^a-z0-9]/g, "") === activeTab)
  }, [projects, activeTab])

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <div className="container relative z-10">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <div className="text-cyan-400 text-sm font-mono tracking-wider animate-typing">
            {"> LOADING PROJECT MATRIX..."}
          </div>
          <h2 className="text-5xl font-bold tracking-tighter md:text-7xl gradient-text-primary font-mono">
            PROJECT UNIVERSE
          </h2>
          <p className="text-xl theme-text-secondary font-mono max-w-3xl mx-auto">
            {"> REVOLUTIONARY APPLICATIONS THAT RESHAPE DIGITAL REALITY"}
          </p>
        </div>

        {/* 3D Projects Galaxy */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="h-[600px] relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
              <color attach="background" args={["#000"]} />
              <fog attach="fog" args={["#000", 10, 30]} />

              <ambientLight intensity={0.2} />
              <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
              <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

              <ProjectsGalaxy projects={featuredProjects} />

              <Environment preset="night" />
            </Canvas>
          </div>

          {/* Featured Project Showcase */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold gradient-text-primary font-mono">FEATURED INNOVATIONS</h3>

            <div className="space-y-6">
              {featuredProjects.slice(0, 3).map((project) => (
                <Card
                  key={project.id}
                  className="bg-black/40 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold gradient-text-primary font-mono group-hover:text-pink-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold">
                            {project.impact}
                          </Badge>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-pink-400">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-pink-400">
                          <Github className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="theme-text-secondary font-mono text-sm">{project.description}</p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-lg font-bold gradient-text-primary font-mono">{project.metrics.users}</div>
                        <div className="text-xs theme-text-secondary font-mono">Users</div>
                      </div>
                      <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <div className="text-lg font-bold gradient-text-primary font-mono">
                          {project.metrics.performance}
                        </div>
                        <div className="text-xs theme-text-secondary font-mono">Uptime</div>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-lg font-bold gradient-text-primary font-mono">
                          {project.metrics.satisfaction}
                        </div>
                        <div className="text-xs theme-text-secondary font-mono">Rating</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 bg-black/40 backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs font-mono">
                  {category === "all" ? "ALL" : category.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-black/40 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="aspect-video bg-gradient-to-br from-cyan-500/20 via-pink-500/20 to-yellow-500/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                            <Star className="w-3 h-3 mr-1" />
                            FEATURED
                          </Badge>
                        )}
                        <Badge variant="outline">{project.status}</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge
                          className={`${
                            project.complexity === "Extreme"
                              ? "bg-red-500/20 border-red-500/50 text-red-400"
                              : project.complexity === "High"
                                ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                                : "bg-green-500/20 border-green-500/50 text-green-400"
                          }`}
                        >
                          {project.complexity}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg font-bold gradient-text-primary font-mono group-hover:text-pink-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm theme-text-secondary font-mono">{project.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button size="sm" className="cyber-button-primary-advanced text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            DEMO
                          </Button>
                          <Button size="sm" variant="outline" className="cyber-button text-xs">
                            <Github className="w-3 h-3 mr-1" />
                            CODE
                          </Button>
                        </div>
                        <div className="text-xs theme-text-secondary font-mono">{project.year}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Project Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">{projects.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Total Projects</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {featuredProjects.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Featured Works</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {new Set(projects.map((p) => p.category)).size}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Categories</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono">
                {projects.filter((p) => p.status === "Live").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Live Projects</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function FancyProjectsSection({ projects }: FancyProjectsSectionProps) {
  return (
    <SafeClientComponent>
      <FancyProjectsSectionInner projects={projects} />
    </SafeClientComponent>
  )
}
