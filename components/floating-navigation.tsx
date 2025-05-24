"use client"

import { useState, useEffect } from "react"
import { SafeClientComponent } from "./safe-client-component"
import { Button } from "@/components/ui/button"
import { Home, User, Briefcase, Code, MessageSquare, ArrowUp } from "lucide-react"

function FloatingNavigationInner() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)

  const navItems = [
    { id: "hero", icon: Home, label: "Home", href: "#" },
    { id: "about", icon: User, label: "About", href: "#about" },
    { id: "projects", icon: Briefcase, label: "Projects", href: "#projects" },
    { id: "skills", icon: Code, label: "Skills", href: "#skills" },
    { id: "contact", icon: MessageSquare, label: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)

      // Determine active section
      const sections = ["hero", "about", "projects", "skills", "contact"]
      const currentSection = sections.find((section) => {
        const element = section === "hero" ? document.body : document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    if (href === "#") {
      scrollToTop()
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-4">
      {/* Navigation Dots */}
      <div className="flex flex-col gap-3 p-4 rounded-2xl glass-effect-advanced backdrop-blur-xl border border-cyan-500/20">
        {navItems.map(({ id, icon: Icon, label, href }) => (
          <Button
            key={id}
            variant="ghost"
            size="icon"
            className={`relative group w-12 h-12 rounded-full transition-all duration-300 ${
              activeSection === id
                ? "bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/50"
                : "hover:bg-cyan-500/10"
            }`}
            onClick={() => scrollToSection(href)}
          >
            <Icon
              className={`h-5 w-5 transition-colors duration-300 ${
                activeSection === id ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
              }`}
            />

            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-1 bg-black/90 text-cyan-400 text-sm font-mono rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {label}
            </div>
          </Button>
        ))}
      </div>

      {/* Scroll to Top Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-full glass-effect-advanced backdrop-blur-xl border border-cyan-500/20 hover:bg-cyan-500/10 transition-all duration-300 group"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
      </Button>
    </div>
  )
}

export function FloatingNavigation() {
  return (
    <SafeClientComponent>
      <FloatingNavigationInner />
    </SafeClientComponent>
  )
}
