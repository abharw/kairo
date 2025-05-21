"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Video, Mic, StopCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function RecordVideoButton() {
  const [open, setOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

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

  const handleSubmit = async () => {
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
        setOpen(false)
        setIsRecording(false)
        setRecordingComplete(false)
        setTitle("")
        setDescription("")
        router.refresh()
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
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Video className="h-4 w-4" /> Record
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record Video Update</DialogTitle>
            <DialogDescription>Record a short 1-2 minute video update for your team.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
            {recordingComplete && (
              <>
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
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {recordingComplete && (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload Video"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
