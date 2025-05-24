"use client"

import type React from "react"
import { useState } from "react"
import { Send, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Neural link established!",
        description: "Message transmitted successfully. Quantum response incoming.",
      })
      // Reset form
      e.currentTarget.reset()
    }, 1500)
  }

  return (
    <Card className="bg-black/60 backdrop-blur-sm border-cyan-500/20 overflow-hidden">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-cyan-400 font-mono">
                NEURAL.ID
              </Label>
              <Input
                id="name"
                placeholder="Enter your neural identifier"
                required
                className="bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyan-400 font-mono">
                QUANTUM.MAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@neural.net"
                required
                className="bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-cyan-400 font-mono">
              TRANSMISSION.SUBJECT
            </Label>
            <Input
              id="subject"
              placeholder="Neural link purpose"
              required
              className="bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-cyan-400 font-mono">
              DATA.STREAM
            </Label>
            <Textarea
              id="message"
              placeholder="Transmit your quantum message..."
              className="min-h-[120px] resize-none bg-black/40 border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50 focus:border-cyan-400 transition-colors font-mono"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-black font-bold py-3 text-lg transition-all duration-300 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Zap className="mr-2 h-5 w-5 animate-spin" />
                TRANSMITTING...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                INITIATE NEURAL LINK
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
