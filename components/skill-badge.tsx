import { Card, CardContent } from "@/components/ui/card"

interface SkillBadgeProps {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "from-blue-500 to-cyan-500"
      case "Intermediate":
        return "from-purple-500 to-pink-500"
      case "Advanced":
        return "from-pink-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-400"
    }
  }

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hover:shadow-[0_0_15px_rgba(120,0,255,0.4)] transition-all duration-500 group">
      <CardContent className="p-4 flex flex-col items-center text-center gap-2">
        <div className="text-lg font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500 transition-all duration-300">
          {name}
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(level)} animate-pulse-slow`}
            style={{
              width: level === "Beginner" ? "33%" : level === "Intermediate" ? "66%" : "100%",
              transition: "width 1s ease-in-out",
            }}
          ></div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full text-white/70 group-hover:bg-white/10 transition-all duration-300">
          {level}
        </span>
      </CardContent>
    </Card>
  )
}
