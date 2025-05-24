"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Box, MeshTransmissionMaterial, Float, PerspectiveCamera, Environment } from "@react-three/drei"
import * as THREE from "three"
import { SafeClientComponent } from "./safe-client-component"

interface SkillBarProps {
  name: string
  percentage: number
  color: string
  position: [number, number, number]
  index: number
}

function SkillBar({ name, percentage, color, position, index }: SkillBarProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { viewport } = useThree()

  // Animation for growing the bar to its percentage
  useFrame((state) => {
    if (meshRef.current) {
      // Animate the scale based on percentage
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        (percentage / 100) * (clicked ? 1.1 : 1),
        0.05,
      )

      // Add some subtle movement
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index * 0.5) * 0.05
    }

    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index * 0.5) * 0.05
    }
  })

  // Adjust position based on viewport for responsiveness
  const scaleFactor = viewport.width < 10 ? 0.7 : 1
  const adjustedPosition: [number, number, number] = [position[0] * scaleFactor, position[1] * scaleFactor, position[2]]

  return (
    <>
      {/* Skill name */}
      <Text
        ref={textRef}
        position={[adjustedPosition[0] - 3.5, adjustedPosition[1], adjustedPosition[2]]}
        fontSize={0.3 * scaleFactor}
        color="white"
        anchorX="left"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        {name}
      </Text>

      {/* Percentage text */}
      <Text
        position={[adjustedPosition[0] + 3.5, adjustedPosition[1], adjustedPosition[2]]}
        fontSize={0.3 * scaleFactor}
        color="white"
        anchorX="right"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        {`${percentage}%`}
      </Text>

      {/* Background bar */}
      <Box args={[6, 0.3, 0.1]} position={adjustedPosition}>
        <meshStandardMaterial color="#ffffff" opacity={0.1} transparent />
      </Box>

      {/* Foreground bar (percentage) */}
      <mesh
        ref={meshRef}
        position={[adjustedPosition[0] - (3 - (3 * percentage) / 100), adjustedPosition[1], adjustedPosition[2] + 0.05]}
        scale={[0.001, 0.3, 0.15]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
      >
        <boxGeometry args={[6, 1, 1]} />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.3}
          roughness={0.1}
          metalness={0.9}
          transmission={0.95}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          reflectivity={1}
          chromaticAberration={0.1}
          anisotropicBlur={0.1}
          ior={1.5}
        />
      </mesh>
    </>
  )
}

interface Skill {
  name: string
  percentage: number
  color: string
}

interface SkillsProps {
  skills: Skill[]
}

function Skills({ skills }: SkillsProps) {
  const { viewport } = useThree()
  const scaleFactor = viewport.width < 10 ? 0.7 : 1

  return (
    <group position={[0, 0, 0]}>
      {skills.map((skill, index) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          percentage={skill.percentage}
          color={skill.color}
          position={[0, 2 - index * 0.8 * scaleFactor, 0]}
          index={index}
        />
      ))}
    </group>
  )
}

interface SkillsSectionProps {
  skills: Skill[]
}

function SkillsSection3DInner({ skills }: SkillsSectionProps) {
  return (
    <div className="w-full h-[600px] md:h-[800px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
          <Skills skills={skills} />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export function SkillsSection3D({ skills }: SkillsSectionProps) {
  return (
    <SafeClientComponent>
      <SkillsSection3DInner skills={skills} />
    </SafeClientComponent>
  )
}
