import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Heart, MessageSquare } from "lucide-react"

interface VideoCardProps {
  video: {
    id: string
    title: string
    description: string
    thumbnailUrl: string
    duration: string
    createdAt: string
    author: {
      name: string
      avatar: string
    }
    tags: string[]
    likes: number
    comments: any[]
    viewed: boolean
  }
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/dashboard/videos/${video.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={video.thumbnailUrl || "/placeholder.svg"}
              alt={video.title}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {video.duration}
              </Badge>
            </div>
            {!video.viewed && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-primary">New</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold line-clamp-1">{video.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{video.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={video.author.avatar || "/placeholder.svg"} alt={video.author.name} />
              <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{video.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1 text-xs">
              <Heart className="h-3 w-3" />
              {video.likes}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              {video.comments.length}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
