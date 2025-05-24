"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text3D, MeshTransmissionMaterial, PerspectiveCamera, Environment, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Code, Zap } from "lucide-react"

function BrainVisualization() {
  const brainRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      brainRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group ref={brainRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            color="#00ffff"
            thickness={0.3}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.05}
            backside
          />
        </Sphere>

        {/* Neural connections */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = (Math.random() - 0.5) * 2

          return (
            <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
              <Sphere args={[0.05, 8, 8]} position={[x, y, z]}>
                <meshBasicMaterial color="#ff00ff" />
              </Sphere>
            </Float>
          )
        })}
      </Float>
    </group>
  )
}

function AboutText() {
  return (
    <Float position={[0, -3, 0]} speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.3}
        height={0.05}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        NEURAL ARCHITECT
        <MeshTransmissionMaterial
          color="#ffff00"
          thickness={0.1}
          roughness={0}
          transmission={0.8}
          ior={1.5}
          chromaticAberration={0.02}
          backside
        />
      </Text3D>
    </Float>
  )
}

function AboutSection3DInner() {
  return (
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* 3D Scene */}
        <div className="h-[600px] relative">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
            <spotLight position={[0, 10, 0]} intensity={2} color="#ffff00" angle={0.3} penumbra={1} />

            <BrainVisualization />
            <AboutText />

            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-cyan-400 text-sm font-mono tracking-wider">{"> ACCESSING PERSONAL DATABASE..."}</div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 font-mono">
              NEURAL PROFILE
            </h2>
          </div>

          <div className="space-y-6 text-cyan-300/80 font-mono">
            <p className="text-lg leading-relaxed">
              {"> I am a cybernetic engineer specializing in the fusion of artificial intelligence, "}
              {"3D visualization, and quantum computing. My neural pathways are optimized for "}
              {"creating immersive digital experiences that push the boundaries of what's possible."}
            </p>

            <p className="text-lg leading-relaxed">
              {"> With over 7 years of experience in the digital realm, I've architected "}
              {"neural networks, built holographic interfaces, and developed quantum algorithms "}
              {"that bridge the gap between human consciousness and machine intelligence."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Brain className="h-8 w-8 text-cyan-400 mb-3 group-hover:text-pink-400 transition-colors duration-300" />
              <h3 className="font-bold text-cyan-400 mb-2 font-mono">AI ARCHITECT</h3>
              <p className="text-sm text-cyan-300/70 font-mono">Neural network design & optimization</p>
            </div>

            <div className="group p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Code className="h-8 w-8 text-cyan-400 mb-3 group-hover:text-pink-400 transition-colors duration-300" />
              <h3 className="font-bold text-cyan-400 mb-2 font-mono">CODE WIZARD</h3>
              <p className="text-sm text-cyan-300/70 font-mono">Full-stack quantum development</p>
            </div>

            <div className="group p-4 rounded-lg border border-cyan-500/20 bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Zap className="h-8 w-8 text-cyan-400 mb-3 group-hover:text-pink-400 transition-colors duration-300" />
              <h3 className="font-bold text-cyan-400 mb-2 font-mono">3D ARTIST</h3>
              <p className="text-sm text-cyan-300/70 font-mono">Holographic interface creation</p>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-black font-bold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
            DOWNLOAD NEURAL MAP
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function AboutSection3D() {
  return (
    <SafeClientComponent>
      <AboutSection3DInner />
    </SafeClientComponent>
  )
}
