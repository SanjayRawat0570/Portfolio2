"use client"

import { useEffect, useRef } from "react"
import { SafeClientComponent } from "./safe-client-component"

function CyberpunkBackgroundInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    const drawCyberpunkEffect = () => {
      if (!ctx || !canvas) return
      time += 0.01

      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + Math.sin(time) * 0.05})`
      ctx.lineWidth = 1
      ctx.beginPath()

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }

      ctx.stroke()

      // Draw glitch effects
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const width = Math.random() * 200 + 50
        const height = Math.random() * 5 + 1

        ctx.fillStyle = `rgba(255, 0, 255, ${Math.random() * 0.3})`
        ctx.fillRect(x, y, width, height)
      }

      // Draw data streams
      for (let i = 0; i < 20; i++) {
        const x = (time * 100 + i * 50) % (canvas.width + 100)
        const y = Math.sin(time + i) * 50 + canvas.height / 2

        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.8})`
        ctx.fillRect(x, y, 2, 10)
      }
    }

    const animate = () => {
      drawCyberpunkEffect()
      animationFrameId = requestAnimationFrame(animate)
    }

    try {
      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)
      animate()
    } catch (error) {
      console.error("Error initializing cyberpunk background:", error)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      try {
        window.removeEventListener("resize", resizeCanvas)
      } catch (error) {
        console.error("Error cleaning up cyberpunk background:", error)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-30 opacity-20" />
}

export function CyberpunkBackground() {
  return (
    <SafeClientComponent>
      <CyberpunkBackgroundInner />
    </SafeClientComponent>
  )
}
