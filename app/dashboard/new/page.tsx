"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Video, Mic, StopCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewVideoPage() {
  const [activeTab, setActiveTab] = useState("record")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const startRecording = () => {
    setIsRecording(true)
    // In a real app, this would start the webcam recording
    // For demo purposes, we'll simulate a recording
    setTimeout(() => {
      setIsRecording(false)
      setRecordingComplete(true)
    }, 3000)
  }

  const resetRecording = () => {
    setRecordingComplete(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your video update.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // In a real app, this would upload the video and create a new video entry
      // For demo purposes, we'll simulate a successful upload
      setTimeout(() => {
        toast({
          title: "Video uploaded",
          description: "Your video update has been uploaded successfully.",
        })
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">New Video Update</h1>
      </div>

      <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record">Record Video</TabsTrigger>
          <TabsTrigger value="upload">Upload Video</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Record a Video</CardTitle>
              <CardDescription>Record a short 1-2 minute video update for your team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                {!isRecording && !recordingComplete ? (
                  <div className="text-center">
                    <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click the record button below to start</p>
                  </div>
                ) : isRecording ? (
                  <div className="text-center">
                    <div className="h-4 w-4 bg-red-500 rounded-full animate-pulse mx-auto mb-2"></div>
                    <p className="text-sm">Recording...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Video className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Recording complete</p>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-4">
                {!isRecording && !recordingComplete ? (
                  <Button onClick={startRecording} className="gap-2">
                    <Mic className="h-4 w-4" /> Start Recording
                  </Button>
                ) : isRecording ? (
                  <Button variant="destructive" onClick={() => setIsRecording(false)} className="gap-2">
                    <StopCircle className="h-4 w-4" /> Stop Recording
                  </Button>
                ) : (
                  <Button variant="outline" onClick={resetRecording} className="gap-2">
                    <RefreshCw className="h-4 w-4" /> Record Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {recordingComplete && (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Video Details</CardTitle>
                  <CardDescription>Add information about your video update.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Quick update on project X"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of your update"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="update, project, sprint"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push("/dashboard")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Uploading..." : "Upload Video"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload a Video</CardTitle>
              <CardDescription>Upload a pre-recorded video update for your team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your video file here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">Supports MP4, WebM, MOV up to 100MB (2 minutes max)</p>
                <Button className="mt-4">Select File</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
