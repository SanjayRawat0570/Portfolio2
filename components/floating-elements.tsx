"use client"

import { useEffect, useState } from "react"
import { SafeClientComponent } from "./safe-client-component"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
  blur: number
  delay: number
  rotation: number
  rotationSpeed: number
}

function FloatingElementsInner() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random floating elements
    const colors = [
      "rgba(255, 0, 255, 0.3)",
      "rgba(128, 0, 255, 0.3)",
      "rgba(0, 255, 255, 0.3)",
      "rgba(255, 0, 128, 0.3)",
      "rgba(255, 255, 0, 0.3)",
      "rgba(0, 255, 128, 0.3)",
    ]

    const newElements: FloatingElement[] = []

    for (let i = 0; i < 25; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50,
        speed: Math.random() * 10 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: Math.random() * 50 + 10,
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
      })
    }

    setElements(newElements)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            filter: `blur(${element.blur}px)`,
            opacity: 0.6,
            animation: `float ${element.speed}s infinite alternate ease-in-out, rotate ${30 + Math.random() * 30}s infinite linear`,
            animationDelay: `${element.delay}s`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(-50%, -50%) translateY(0) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) translateY(-40px) scale(1.1);
          }
        }
        
        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export function FloatingElements() {
  return (
    <SafeClientComponent>
      <FloatingElementsInner />
    </SafeClientComponent>
  )
}
