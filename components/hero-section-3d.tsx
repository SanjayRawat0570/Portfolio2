"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text3D, MeshTransmissionMaterial, PerspectiveCamera, Environment, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter, MapPin, Phone, Globe } from "lucide-react"

interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  location: string
  email: string
  phone: string
  website: string
  bio: string
  resume: string
  social: {
    github: string
    linkedin: string
    twitter: string
    instagram: string
  }
}

interface HeroSection3DProps {
  personalInfo: PersonalInfo
}

function FloatingName() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <Float position={[0, 0, -2]} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={0.8}
        height={0.15}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        SANJAY RAWAT
        <MeshTransmissionMaterial
          color="#00ffff"
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

function FloatingOrbs() {
  const orbs = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const radius = 4
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = (Math.random() - 0.5) * 3

    return (
      <Float key={i} position={[x, y, z]} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.2, 16, 16]}>
          <MeshTransmissionMaterial
            color={["#00ffff", "#ff00ff", "#ffff00", "#00ff88"][i % 4]}
            thickness={0.1}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.02}
            backside
          />
        </Sphere>
      </Float>
    )
  })

  return <>{orbs}</>
}

function HeroSection3DInner({ personalInfo }: HeroSection3DProps) {
  return (
    <div className="container relative z-10 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* 3D Scene */}
        <div className="h-[600px] relative order-2 lg:order-1">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
            <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

            <FloatingName />
            <FloatingOrbs />

            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-accent-primary text-sm font-mono tracking-wider animate-typing">
                {"> HELLO WORLD, I'M"}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter gradient-text-primary font-mono">
                {personalInfo.name.split(" ").map((word, index) => (
                  <span key={index} className="block">
                    {word}
                  </span>
                ))}
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold theme-text-accent-secondary font-mono">
                {personalInfo.title}
              </h2>
              <p className="text-lg theme-text-secondary font-mono">{personalInfo.subtitle}</p>
            </div>

            <p className="text-lg leading-relaxed theme-text-secondary max-w-2xl">{personalInfo.bio}</p>

            {/* Quick Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg border theme-border-accent bg-black/20">
                <MapPin className="h-5 w-5 theme-text-accent-primary" />
                <span className="font-mono theme-text-secondary">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border theme-border-accent bg-black/20">
                <Mail className="h-5 w-5 theme-text-accent-primary" />
                <span className="font-mono theme-text-secondary text-sm">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border theme-border-accent bg-black/20">
                <Phone className="h-5 w-5 theme-text-accent-primary" />
                <span className="font-mono theme-text-secondary">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border theme-border-accent bg-black/20">
                <Globe className="h-5 w-5 theme-text-accent-primary" />
                <span className="font-mono theme-text-secondary text-sm">{personalInfo.website}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button className="cyber-button-primary font-bold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
              VIEW MY WORK
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="cyber-button px-8 py-3 text-lg transition-all duration-300">
              <Download className="mr-2 h-5 w-5" />
              DOWNLOAD RESUME
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="social-icon transition-all duration-300 transform hover:scale-110"
              asChild
            >
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="social-icon transition-all duration-300 transform hover:scale-110"
              asChild
            >
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="social-icon transition-all duration-300 transform hover:scale-110"
              asChild
            >
              <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="social-icon transition-all duration-300 transform hover:scale-110"
              asChild
            >
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection3D({ personalInfo }: HeroSection3DProps) {
  return (
    <SafeClientComponent>
      <HeroSection3DInner personalInfo={personalInfo} />
    </SafeClientComponent>
  )
}
