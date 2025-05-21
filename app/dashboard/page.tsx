"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import { RecordVideoButton } from "@/components/record-video-button"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockVideos } from "@/lib/mock-data"

export default function DashboardPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading videos from an API
    const loadVideos = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setVideos(mockVideos)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast({
          title: "Error loading videos",
          description: "Could not load your videos. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadVideos()
  }, [toast])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">View and manage your team's video updates.</p>
        </div>
        <div className="flex items-center gap-2">
          <RecordVideoButton />
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Updates</TabsTrigger>
          <TabsTrigger value="mine">My Updates</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-[100px] bg-muted"></CardHeader>
                  <CardContent className="p-4">
                    <div className="h-4 w-3/4 bg-muted rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No videos yet</CardTitle>
                <CardDescription>Record or upload your first video update to get started.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <RecordVideoButton />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="mine" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Updates</CardTitle>
              <CardDescription>Videos you've recorded or uploaded.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              ) : videos.filter((v) => v.isOwner).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos
                    .filter((v) => v.isOwner)
                    .map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-4 text-muted-foreground">You haven't created any video updates yet.</p>
                  <RecordVideoButton />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Updates</CardTitle>
              <CardDescription>Videos you haven't watched yet.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              ) : videos.filter((v) => !v.viewed).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos
                    .filter((v) => !v.viewed)
                    .map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-muted-foreground">You're all caught up! No unread videos.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
