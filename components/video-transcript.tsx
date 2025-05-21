"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface VideoTranscriptProps {
  transcript: Array<{
    id: string
    start: number
    end: number
    text: string
  }>
}

export function VideoTranscript({ transcript }: VideoTranscriptProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTranscript = searchQuery
    ? transcript.filter((item) => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : transcript

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transcript..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
        {filteredTranscript.length > 0 ? (
          filteredTranscript.map((item) => (
            <div key={item.id} className="p-2 hover:bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{formatTime(item.start)}</span>
                <p className="text-sm">{item.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">
            {searchQuery ? "No matches found" : "No transcript available"}
          </p>
        )}
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}
