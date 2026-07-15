"use client"

import { useEffect } from "react"
import { AlertCircle, RotateCcw, ServerCrash } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-background">
      {/* ── Dot Grid Background ── */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex scale-90 flex-col items-center gap-8 sm:scale-100">
        {/* Node: Error State */}
        <div className="relative w-80 overflow-hidden rounded-xl border-2 border-destructive bg-card shadow-lg ring-4 ring-destructive/10">
          <div className="h-1.5 w-full bg-destructive" />
          <div className="flex items-start gap-4 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
              <ServerCrash className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold">Execution Failed</h4>
              <p className="mt-1 mb-3 text-xs leading-relaxed text-muted-foreground">
                A critical error occurred while attempting to render this view.
              </p>

              <div className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-2 font-mono text-xs text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                <span className="truncate">ERR_UNHANDLED_EXCEPTION</span>
              </div>
            </div>
          </div>

          {/* Ports */}
          <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-destructive bg-background" />
          <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-destructive bg-destructive" />
        </div>

        {/* Retry "Action" Node */}
        <button
          onClick={() => reset()}
          className="group flex cursor-pointer items-center gap-3 rounded-full border bg-card px-5 py-2 shadow-sm transition-all hover:border-primary hover:ring-2 hover:ring-primary/20"
        >
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <RotateCcw className="size-3" />
          </div>
          <span className="text-sm font-medium">Retry Execution</span>
        </button>
      </div>
    </div>
  )
}
