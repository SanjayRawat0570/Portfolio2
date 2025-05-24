"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text3D, MeshTransmissionMaterial, PerspectiveCamera, Environment, Torus } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { ContactForm } from "./contact-form"
import { Mail, MessageSquare, Zap } from "lucide-react"

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
        <Torus args={[2, 0.1, 16, 100]} position={[0, 0, 0]}>
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

        <Torus args={[1.5, 0.05, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
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

        <Torus args={[1, 0.03, 16, 100]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
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
      </Float>
    </group>
  )
}

function ContactText() {
  return (
    <Float position={[0, -3, 0]} speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.4}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
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

function ContactSection3DInner() {
  return (
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-cyan-400 text-sm font-mono tracking-wider">
              {"> ESTABLISHING NEURAL CONNECTION..."}
            </div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 font-mono">
              INITIATE CONTACT
            </h2>
            <p className="text-cyan-300/70 md:text-xl font-mono">{"> READY TO COLLABORATE ON QUANTUM PROJECTS"}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
              <Mail className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-cyan-400 font-mono font-bold">NEURAL.MAIL</div>
                <div className="text-cyan-300/70 font-mono text-sm">alex@cyber.dev</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
              <MessageSquare className="h-6 w-6 text-pink-400" />
              <div>
                <div className="text-pink-400 font-mono font-bold">QUANTUM.CHAT</div>
                <div className="text-cyan-300/70 font-mono text-sm">Available 24/7 in the metaverse</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
              <Zap className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-yellow-400 font-mono font-bold">INSTANT.SYNC</div>
                <div className="text-cyan-300/70 font-mono text-sm">Response time: 0.001ms</div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        {/* 3D Scene */}
        <div className="h-[600px] relative">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
            <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

            <ContactPortal />
            <ContactText />

            <Environment preset="night" />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export function ContactSection3D() {
  return (
    <SafeClientComponent>
      <ContactSection3DInner />
    </SafeClientComponent>
  )
}
