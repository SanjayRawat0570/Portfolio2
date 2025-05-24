"use client"
import type React from "react"

import { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Float,
  Text3D,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Environment,
  Sphere,
  Torus,
  MeshDistortMaterial,
  Stars,
  Trail,
} from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Mail, Zap, Send, Phone, MapPin, Globe, Rocket } from "lucide-react"

interface PersonalInfo {
  name: string
  email: string
  phone: string
  website: string
}

interface FuturisticContactSectionProps {
  personalInfo: PersonalInfo
}

function ContactPortal() {
  const portalRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.getElapsedTime() * 0.5
      portalRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={portalRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Ring */}
        <Torus args={[3, 0.1, 16, 100]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            color="#00ffff"
            thickness={0.1}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.05}
            backside
          />
        </Torus>

        {/* Middle Ring */}
        <Torus args={[2, 0.08, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshTransmissionMaterial
            color="#ff00ff"
            thickness={0.1}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.05}
            backside
          />
        </Torus>

        {/* Inner Ring */}
        <Torus args={[1, 0.06, 16, 100]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <MeshTransmissionMaterial
            color="#ffff00"
            thickness={0.1}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.05}
            backside
          />
        </Torus>

        {/* Central Core */}
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial color="#ffffff" distort={0.4} speed={3} roughness={0} metalness={1} />
        </Sphere>

        {/* Floating Data Nodes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 4
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = Math.sin(i) * 2

          return (
            <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={3}>
              <Trail width={1} length={6} color="#00ffff" attenuation={(t) => t * t}>
                <Sphere args={[0.05, 16, 16]} position={[x, y, z]}>
                  <meshBasicMaterial color="#00ffff" />
                </Sphere>
              </Trail>
            </Float>
          )
        })}
      </Float>
    </group>
  )
}

function ContactText() {
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
        size={0.4}
        height={0.08}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-1.8, 0, 0]}
      >
        NEURAL LINK
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

function FuturisticContactSectionInner({ personalInfo }: FuturisticContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Neural link established! 🚀",
        description: "Message transmitted successfully. Quantum response incoming within 24 hours.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container relative z-10">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <div className="text-cyan-400 text-sm font-mono tracking-wider animate-typing">
            {"> ESTABLISHING NEURAL CONNECTION..."}
          </div>
          <h2 className="text-5xl font-bold tracking-tighter md:text-7xl gradient-text-primary font-mono">
            INITIATE CONTACT
          </h2>
          <p className="text-xl theme-text-secondary font-mono max-w-3xl mx-auto">
            {"> READY TO COLLABORATE ON QUANTUM PROJECTS AND REVOLUTIONARY IDEAS"}
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Contact Information */}
          <div className="space-y-10">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold gradient-text-primary font-mono">COMMUNICATION CHANNELS</h3>

              <div className="space-y-6">
                <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/50 group-hover:bg-cyan-500/30 transition-colors">
                        <Mail className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-cyan-400 font-mono font-bold text-lg">NEURAL.MAIL</div>
                        <div className="theme-text-secondary font-mono">{personalInfo.email}</div>
                        <div className="text-xs theme-text-secondary font-mono opacity-70">
                          Response time: {"<"} 24 hours
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-pink-500/20 border border-pink-500/50 group-hover:bg-pink-500/30 transition-colors">
                        <Phone className="h-6 w-6 text-pink-400" />
                      </div>
                      <div>
                        <div className="text-pink-400 font-mono font-bold text-lg">QUANTUM.CALL</div>
                        <div className="theme-text-secondary font-mono">{personalInfo.phone}</div>
                        <div className="text-xs theme-text-secondary font-mono opacity-70">
                          Available: 9 AM - 6 PM IST
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 group-hover:bg-yellow-500/30 transition-colors">
                        <Globe className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-yellow-400 font-mono font-bold text-lg">WEB.PORTAL</div>
                        <div className="theme-text-secondary font-mono">{personalInfo.website}</div>
                        <div className="text-xs theme-text-secondary font-mono opacity-70">
                          Portfolio & Live Projects
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-green-500/20 hover:border-green-400/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-green-500/20 border border-green-500/50 group-hover:bg-green-500/30 transition-colors">
                        <MapPin className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <div className="text-green-400 font-mono font-bold text-lg">LOCATION.DATA</div>
                        <div className="theme-text-secondary font-mono">Mumbai, India</div>
                        <div className="text-xs theme-text-secondary font-mono opacity-70">
                          Available for remote & on-site projects
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-black/60 backdrop-blur-sm border-cyan-500/20 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-bold gradient-text-primary font-mono text-center">
                  NEURAL TRANSMISSION FORM
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cyan-400 font-mono font-bold">
                        NEURAL.ID *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your neural identifier"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-cyan-400 font-mono font-bold">
                        QUANTUM.MAIL *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@neural.net"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-cyan-400 font-mono font-bold">
                      TRANSMISSION.SUBJECT *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Neural link purpose"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-cyan-400 font-mono font-bold">
                      DATA.STREAM *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Transmit your quantum message..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-[150px] resize-none bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full cyber-button-primary-advanced group py-4 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Zap className="mr-3 h-6 w-6 animate-spin" />
                        <span className="relative z-10">TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        <span className="relative z-10">INITIATE NEURAL LINK</span>
                        <Rocket className="ml-3 h-6 w-6 group-hover:translate-y-[-2px] transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono theme-text-accent-primary">
                STATUS: NEURAL NETWORK ONLINE - READY FOR CONNECTIONS
              </span>
              <Zap className="h-4 w-4 theme-text-accent-tertiary animate-pulse" />
            </div>
          </div>

          {/* 3D Contact Portal */}
          <div className="h-[700px] relative">
            <div style={{ width: "100%", height: "100%" }}>
              <Canvas style={{ width: "100%", height: "100%" }}>
                <Suspense fallback={null}>
                  <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                  <color attach="background" args={["#000"]} />
                  <fog attach="fog" args={["#000", 8, 25]} />

                  <ambientLight intensity={0.2} />
                  <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
                  <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
                  <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

                  <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                  <ContactPortal />
                  <ContactText />

                  <Environment preset="night" />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        {/* Contact Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                {"<"}24h
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Response Time</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Average reply speed</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                99.9%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Uptime</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Network availability</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                24/7
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Availability</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Neural link active</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold gradient-text-primary font-mono group-hover:scale-110 transition-transform">
                100%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="theme-text-accent-primary font-mono text-sm">Secure</p>
              <p className="theme-text-secondary font-mono text-xs mt-1">Encrypted transmission</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function FuturisticContactSection({ personalInfo }: FuturisticContactSectionProps) {
  return (
    <SafeClientComponent>
      <FuturisticContactSectionInner personalInfo={personalInfo} />
    </SafeClientComponent>
  )
}
