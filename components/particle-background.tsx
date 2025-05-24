"use client"

import { useEffect, useRef, useState } from "react"
import { SafeClientComponent } from "./safe-client-component"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

function ParticleBackgroundInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 })
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let animationFrameId: number | undefined
    let particles: Particle[] = []

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      if (!canvas) return
      particles = []
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 200)
      const colors = ["#ff00ff", "#00ffff", "#8800ff", "#ff0088", "#00ff88"]

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1
        const x = Math.random() * (canvas.width - size * 2)
        const y = Math.random() * (canvas.height - size * 2)
        const speedX = Math.random() * 1 - 0.5
        const speedY = Math.random() * 1 - 0.5
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
        })
      }

      particlesRef.current = particles
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Check for mouse interaction
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius
          p.x += Math.cos(angle) * force * 2
          p.y += Math.sin(angle) * force * 2
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
      }
    }

    const animate = () => {
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Initialize
    try {
      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)
      window.addEventListener("mousemove", handleMouseMove)
      animate()
      setIsInitialized(true)
    } catch (error) {
      console.error("Error initializing particle background:", error)
    }

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      try {
        window.removeEventListener("resize", resizeCanvas)
        window.removeEventListener("mousemove", handleMouseMove)
      } catch (error) {
        console.error("Error cleaning up particle background:", error)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-transparent" />
}

export function ParticleBackground() {
  return (
    <SafeClientComponent>
      <ParticleBackgroundInner />
    </SafeClientComponent>
  )
}
