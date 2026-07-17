"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { Loader2 } from "lucide-react"

export function SessionReplay({ sessionId }: { sessionId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let hls: Hls | null = null

    const checkReplay = async () => {
      try {
        const res = await fetch(`/api/replays/${sessionId}`)
        if (res.status === 404 || res.status === 400 || res.status === 500) {
          // Polling if recording is not ready yet
          timeoutId = setTimeout(checkReplay, 3000)
          return
        }

        if (!res.ok) {
          setError("Failed to load recording")
          return
        }

        setIsReady(true)

        if (videoRef.current) {
          const video = videoRef.current
          const src = `/api/replays/${sessionId}`

          if (Hls.isSupported()) {
            hls = new Hls()
            hls.loadSource(src)
            hls.attachMedia(video)
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play().catch(() => {
                // Ignore auto-play errors (e.g. unmuted)
              })
            })
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari supports HLS natively
            video.src = src
            video.addEventListener("loadedmetadata", () => {
              video.play().catch(() => {})
            })
          }
        }
      } catch (err) {
        timeoutId = setTimeout(checkReplay, 3000)
      }
    }

    checkReplay()

    return () => {
      clearTimeout(timeoutId)
      if (hls) {
        hls.destroy()
      }
    }
  }, [sessionId])

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center text-sm text-destructive">
        {error}
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black">
      {!isReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <span className="text-sm">Processing recording...</span>
        </div>
      )}
      <video
        ref={videoRef}
        controls
        muted
        autoPlay
        className="h-full max-h-full w-full object-contain"
      />
    </div>
  )
}
