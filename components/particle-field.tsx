"use client"

import { useEffect, useRef, useState } from "react"
import { SafeClientComponent } from "./safe-client-component"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
  trail: { x: number; y: number; alpha: number }[]
}

function ParticleFieldInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [theme, setTheme] = useState("dark")
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })

  useEffect(() => {
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const root = document.documentElement
      if (root.classList.contains("theme-light")) setTheme("light")
      else if (root.classList.contains("theme-cyberpunk")) setTheme("cyberpunk")
      else if (root.classList.contains("theme-neon")) setTheme("neon")
      else setTheme("dark")
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const getThemeColors = () => {
      switch (theme) {
        case "light":
          return {
            bg: "rgba(248, 250, 252, 0.02)",
            particles: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
            connections: "rgba(59, 130, 246, 0.3)",
            energy: "#3b82f6",
          }
        case "cyberpunk":
          return {
            bg: "rgba(10, 10, 10, 0.03)",
            particles: ["#00ff41", "#ff0080", "#ffff00", "#00ffff", "#ff4500"],
            connections: "rgba(0, 255, 65, 0.4)",
            energy: "#00ff41",
          }
        case "neon":
          return {
            bg: "rgba(15, 15, 35, 0.02)",
            particles: ["#ff6b9d", "#4ecdc4", "#ffe66d", "#a8e6cf", "#ff8a80"],
            connections: "rgba(255, 107, 157, 0.3)",
            energy: "#ff6b9d",
          }
        default:
          return {
            bg: "rgba(0, 0, 0, 0.03)",
            particles: ["#00ffff", "#ff00ff", "#ffff00", "#00ff88", "#ff0080"],
            connections: "rgba(0, 255, 255, 0.3)",
            energy: "#00ffff",
          }
      }
    }

    const createParticle = (): Particle => {
      const colors = getThemeColors().particles
      const maxLife = 200 + Math.random() * 300
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 5,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        life: maxLife,
        maxLife,
        trail: [],
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 150; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticle = (particle: Particle) => {
      // Add current position to trail
      particle.trail.push({
        x: particle.x,
        y: particle.y,
        alpha: particle.alpha * 0.5,
      })

      // Limit trail length
      if (particle.trail.length > 10) {
        particle.trail.shift()
      }

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy
      particle.z += particle.vz

      // Mouse interaction
      const dx = particle.x - mouseRef.current.x
      const dy = particle.y - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouseRef.current.radius) {
        const angle = Math.atan2(dy, dx)
        const force = (mouseRef.current.radius - distance) / mouseRef.current.radius
        particle.vx += Math.cos(angle) * force * 0.5
        particle.vy += Math.sin(angle) * force * 0.5
        particle.alpha = Math.min(1, particle.alpha + force * 0.1)
      }

      // 3D perspective effect
      const perspective = 1000 / (1000 + particle.z)
      particle.size = Math.max(0.5, 3 * perspective)

      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0
      if (particle.z < 0) particle.z = 1000
      if (particle.z > 1000) particle.z = 0

      // Life cycle
      particle.life--
      particle.alpha = (particle.life / particle.maxLife) * 0.8

      return particle.life > 0
    }

    const drawParticle = (particle: Particle) => {
      if (!ctx) return

      // Draw trail
      particle.trail.forEach((point, index) => {
        const trailAlpha = (point.alpha * index) / particle.trail.length
        ctx.save()
        ctx.globalAlpha = trailAlpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(point.x, point.y, particle.size * 0.3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw main particle
      ctx.save()
      ctx.globalAlpha = particle.alpha

      // Glow effect
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
      gradient.addColorStop(0, particle.color)
      gradient.addColorStop(0.5, particle.color + "80")
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
      ctx.fill()

      // Core particle
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawConnections = () => {
      if (!ctx) return
      const colors = getThemeColors()

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = colors.connections
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }

    const drawEnergyWaves = () => {
      if (!ctx) return
      const colors = getThemeColors()

      // Energy waves
      for (let i = 0; i < 3; i++) {
        const waveRadius = (time * 100 + i * 100) % 800
        const opacity = 1 - waveRadius / 800

        ctx.save()
        ctx.globalAlpha = opacity * 0.1
        ctx.strokeStyle = colors.energy
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, waveRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
    }

    const drawBackground = () => {
      if (!ctx) return
      const colors = getThemeColors()

      // Clear with fade effect
      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animated gradient overlay
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width * Math.cos(time * 0.5),
        canvas.height * Math.sin(time * 0.3),
      )
      gradient.addColorStop(0, "transparent")
      gradient.addColorStop(0.5, colors.energy + "05")
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      time += 0.01

      drawBackground()
      drawEnergyWaves()

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(updateParticle)

      // Add new particles if needed
      while (particlesRef.current.length < 150) {
        particlesRef.current.push(createParticle())
      }

      // Draw connections first
      drawConnections()

      // Draw particles
      particlesRef.current.forEach(drawParticle)

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    try {
      resizeCanvas()
      initParticles()
      window.addEventListener("resize", handleResize)
      window.addEventListener("mousemove", handleMouseMove)
      animate()
    } catch (error) {
      console.error("Error initializing particle field:", error)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      try {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("mousemove", handleMouseMove)
      } catch (error) {
        console.error("Error cleaning up particle field:", error)
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-40 opacity-60" />
}

export function ParticleField() {
  return (
    <SafeClientComponent>
      <ParticleFieldInner />
    </SafeClientComponent>
  )
}
