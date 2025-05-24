"use client"

import { useEffect, useRef, useState } from "react"
import { SafeClientComponent } from "./safe-client-component"

function EnhancedBackgroundInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [theme, setTheme] = useState("dark")

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
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      life: number
    }> = []

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
            particles: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"],
            grid: "rgba(59, 130, 246, 0.1)",
            accent: "#3b82f6",
          }
        case "cyberpunk":
          return {
            bg: "rgba(10, 10, 10, 0.05)",
            particles: ["#00ff41", "#ff0080", "#ffff00", "#00ffff"],
            grid: "rgba(0, 255, 65, 0.15)",
            accent: "#00ff41",
          }
        case "neon":
          return {
            bg: "rgba(15, 15, 35, 0.03)",
            particles: ["#ff6b9d", "#4ecdc4", "#ffe66d", "#a8e6cf"],
            grid: "rgba(255, 107, 157, 0.12)",
            accent: "#ff6b9d",
          }
        default:
          return {
            bg: "rgba(0, 0, 0, 0.05)",
            particles: ["#00ffff", "#ff00ff", "#ffff00", "#00ff88"],
            grid: "rgba(0, 255, 255, 0.1)",
            accent: "#00ffff",
          }
      }
    }

    const createParticle = () => {
      const colors = getThemeColors().particles
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        life: Math.random() * 100 + 50,
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 100; i++) {
        particles.push(createParticle())
      }
    }

    const drawBackground = () => {
      if (!ctx || !canvas) return
      const colors = getThemeColors()

      // Clear with theme-based fade
      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      ctx.beginPath()

      const gridSize = 50
      const offsetX = (time * 20) % gridSize
      const offsetY = (time * 15) % gridSize

      // Vertical lines
      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }

      // Horizontal lines
      for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }

      ctx.stroke()

      // Draw flowing data streams
      for (let i = 0; i < 10; i++) {
        const x = ((time * 100 + i * 80) % (canvas.width + 200)) - 100
        const y = Math.sin(time + i) * 100 + canvas.height / 2

        ctx.fillStyle =
          colors.accent +
          Math.floor(Math.random() * 100)
            .toString(16)
            .padStart(2, "0")
        ctx.fillRect(x, y, Math.random() * 50 + 10, 2)
      }

      // Draw and update particles
      particles.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.alpha * (particle.life / 100)
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.save()
              ctx.globalAlpha = (1 - distance / 100) * 0.3
              ctx.strokeStyle = colors.accent
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
              ctx.restore()
            }
          }
        })

        // Regenerate particle if dead
        if (particle.life <= 0) {
          particles[index] = createParticle()
        }
      })

      // Draw glitch effects
      if (Math.random() < 0.01) {
        const glitchHeight = Math.random() * 5 + 1
        const glitchY = Math.random() * canvas.height
        ctx.fillStyle = colors.accent + "40"
        ctx.fillRect(0, glitchY, canvas.width, glitchHeight)
      }

      // Draw scanning line
      const scanY = (time * 200) % (canvas.height + 100)
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
      gradient.addColorStop(0, "transparent")
      gradient.addColorStop(0.5, colors.accent + "60")
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 50, canvas.width, 100)
    }

    const animate = () => {
      time += 0.01
      drawBackground()
      animationFrameId = requestAnimationFrame(animate)
    }

    try {
      resizeCanvas()
      initParticles()
      window.addEventListener("resize", resizeCanvas)
      animate()
    } catch (error) {
      console.error("Error initializing enhanced background:", error)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      try {
        window.removeEventListener("resize", resizeCanvas)
      } catch (error) {
        console.error("Error cleaning up enhanced background:", error)
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-30 opacity-40" />
}

export function EnhancedBackground() {
  return (
    <SafeClientComponent>
      <EnhancedBackgroundInner />
    </SafeClientComponent>
  )
}
