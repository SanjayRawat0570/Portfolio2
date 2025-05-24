"use client"

import { useEffect, useRef, useState } from "react"
import { SafeClientComponent } from "./safe-client-component"

function AnimatedGradientInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let animationFrameId: number | undefined
    let time = 0

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGradient = () => {
      if (!ctx || !canvas) return
      time += 0.005

      // Create gradient
      const gradient = ctx.createLinearGradient(
        canvas.width * (0.5 + 0.5 * Math.sin(time * 0.5)),
        canvas.height * (0.5 + 0.5 * Math.cos(time * 0.3)),
        canvas.width * (0.5 + 0.5 * Math.cos(time * 0.4)),
        canvas.height * (0.5 + 0.5 * Math.sin(time * 0.6)),
      )

      // Add colors with shifting hues
      gradient.addColorStop(0, `hsl(${(time * 50) % 360}, 100%, 50%)`)
      gradient.addColorStop(0.5, `hsl(${(time * 50 + 120) % 360}, 100%, 50%)`)
      gradient.addColorStop(1, `hsl(${(time * 50 + 240) % 360}, 100%, 50%)`)

      // Fill with gradient
      ctx.globalAlpha = 0.05
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      drawGradient()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    try {
      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)
      animate()
      setIsInitialized(true)
    } catch (error) {
      console.error("Error initializing animated gradient:", error)
    }

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      try {
        window.removeEventListener("resize", resizeCanvas)
      } catch (error) {
        console.error("Error cleaning up animated gradient:", error)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20 opacity-30" />
}

export function AnimatedGradient() {
  return (
    <SafeClientComponent>
      <AnimatedGradientInner />
    </SafeClientComponent>
  )
}
