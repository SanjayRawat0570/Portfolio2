import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
}

export function ProjectCard({ title, description, tags, imageUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(120,0,255,0.5)] bg-black/40 backdrop-blur-sm border-white/10 group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <CardHeader className="relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500 transition-all duration-500">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-white/70">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 relative z-10">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="bg-white/5 text-white border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-purple-500/50"
          >
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
