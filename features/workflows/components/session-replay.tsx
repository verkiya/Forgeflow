"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { Loader2 } from "lucide-react"

const POLL_INTERVAL_MS = 2000

export function SessionReplay({
  workflowId,
  runId,
  sessionId,
}: {
  workflowId: string
  runId: string
  sessionId: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const replayKey = `${workflowId}:${runId}:${sessionId}`
  const [renderedReplayKey, setRenderedReplayKey] = useState(replayKey)

  // A new run may reuse this component instance. Reset during render so the
  // first frame reflects the new recording before its polling effect begins.
  if (replayKey !== renderedReplayKey) {
    setRenderedReplayKey(replayKey)
    setIsReady(false)
    setError(null)
  }

  useEffect(() => {
    const replayUrl = `/api/replays/${sessionId}?${new URLSearchParams({
      workflowId,
      runId,
    })}`
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let hls: Hls | undefined

    const play = () => {
      const video = videoRef.current
      if (!video) return

      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(replayUrl)
        hls.attachMedia(video)
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = replayUrl
      } else {
        setError("This browser cannot play this recording")
        return
      }

      setIsReady(true)
      video.play().catch(() => {
        // Autoplay can be blocked despite the muted player; controls remain
        // available so the viewer can start playback manually.
      })
    }

    const waitForReplay = async () => {
      try {
        const res = await fetch(replayUrl)
        if (cancelled) return

        if (res.status === 202) {
          timeoutId = setTimeout(waitForReplay, POLL_INTERVAL_MS)
          return
        }

        if (!res.ok) {
          setError("Failed to load recording")
          return
        }

        play()
      } catch {
        if (!cancelled) setError("Failed to load recording")
      }
    }

    waitForReplay()

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
      hls?.destroy()
    }
  }, [runId, sessionId, workflowId])

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
        playsInline
        className="h-full max-h-full w-full object-contain"
      />
    </div>
  )
}
