"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Moon, Sun, Palette, Zap, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SafeClientComponent } from "./safe-client-component"

type Theme = "dark" | "light" | "cyberpunk" | "neon"

interface ThemeConfig {
  name: string
  icon: React.ReactNode
  description: string
}

const themes: Record<Theme, ThemeConfig> = {
  dark: {
    name: "Dark Cyber",
    icon: <Moon className="h-4 w-4" />,
    description: "Classic dark cyberpunk theme",
  },
  light: {
    name: "Light Neural",
    icon: <Sun className="h-4 w-4" />,
    description: "Clean light futuristic theme",
  },
  cyberpunk: {
    name: "Neon City",
    icon: <Zap className="h-4 w-4" />,
    description: "High contrast neon theme",
  },
  neon: {
    name: "Hologram",
    icon: <Palette className="h-4 w-4" />,
    description: "Vibrant holographic theme",
  },
}

function ThemeToggleInner() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("cyber-theme") as Theme
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("dark")
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    const body = document.body

    // Remove all theme classes
    root.classList.remove("theme-dark", "theme-light", "theme-cyberpunk", "theme-neon")
    body.classList.remove("theme-dark", "theme-light", "theme-cyberpunk", "theme-neon")

    // Add new theme class
    root.classList.add(`theme-${newTheme}`)
    body.classList.add(`theme-${newTheme}`)

    // Update data attribute for CSS targeting
    root.setAttribute("data-theme", newTheme)
    body.setAttribute("data-theme", newTheme)

    console.log(`Theme changed to: ${newTheme}`) // Debug log
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("cyber-theme", newTheme)
    setIsOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 transition-all duration-300"
      >
        {themes[theme].icon}
        <span className="hidden sm:inline">{themes[theme].name}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 z-50 bg-black/95 backdrop-blur-xl border border-cyan-500/20 rounded-lg shadow-2xl overflow-hidden">
            {Object.entries(themes).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key as Theme)}
                className={`w-full px-4 py-3 text-left hover:bg-cyan-400/10 transition-all duration-300 border-b border-cyan-500/10 last:border-b-0 ${
                  theme === key ? "bg-cyan-400/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-cyan-400">{config.icon}</div>
                  <div className="flex-1">
                    <div className="font-mono font-bold text-cyan-400">{config.name}</div>
                    <div className="text-xs text-cyan-500/70 font-mono">{config.description}</div>
                  </div>
                  {theme === key && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ThemeToggle() {
  return (
    <SafeClientComponent>
      <ThemeToggleInner />
    </SafeClientComponent>
  )
}
