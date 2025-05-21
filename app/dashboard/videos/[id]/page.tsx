"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { VideoTranscript } from "@/components/video-transcript"
import { mockVideos } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadVideo = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundVideo = mockVideos.find((v) => v.id === params.id)
          if (foundVideo) {
            setVideo(foundVideo)
          }
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast({
          title: "Error loading video",
          description: "Could not load the video. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadVideo()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="animate-pulse">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-6 w-40 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="aspect-video bg-muted rounded animate-pulse"></div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Video not found</h2>
        <p className="text-muted-foreground mb-6">The video you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </div>
    )
  }

  const handleLike = () => {
    setLiked(!liked)
    toast({
      title: liked ? "Removed like" : "Added like",
      description: liked ? "You've removed your like from this video" : "You've liked this video",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{video.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={video.author.avatar || "/placeholder.svg"} alt={video.author.name} />
                <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{video.author.name}</p>
                <p className="text-sm text-muted-foreground">{video.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleLike} className={liked ? "text-red-500" : ""}>
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{video.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {video.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
              <CardDescription>Generated from video content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{video.aiSummary}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="transcript">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript" className="mt-4">
              <VideoTranscript transcript={video.transcript} />
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <div className="space-y-4">
                {video.comments.length > 0 ? (
                  video.comments.map((comment: any) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{comment.author.name}</p>
                          <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
