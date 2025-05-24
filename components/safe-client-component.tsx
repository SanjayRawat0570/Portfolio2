"use client"

import { useState, useEffect, type ReactNode } from "react"

interface SafeClientComponentProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SafeClientComponent({ children, fallback = null }: SafeClientComponentProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
