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
    <div className="flex h-svh w-full items-center justify-center bg-background relative overflow-hidden">
      {/* ── Dot Grid Background ── */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20" 
        style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 flex flex-col items-center gap-8 scale-90 sm:scale-100">
        
        {/* Node: Error State */}
        <div className="w-80 bg-card border-2 border-destructive shadow-lg ring-4 ring-destructive/10 rounded-xl overflow-hidden relative">
          <div className="h-1.5 w-full bg-destructive" />
          <div className="p-5 flex items-start gap-4">
            <div className="size-10 rounded-lg bg-destructive/20 text-destructive flex items-center justify-center shrink-0">
              <ServerCrash className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold">Execution Failed</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-3 leading-relaxed">
                A critical error occurred while attempting to render this view.
              </p>
              
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2 flex items-center gap-2 text-destructive text-xs font-mono">
                <AlertCircle className="size-4 shrink-0" />
                <span className="truncate">ERR_UNHANDLED_EXCEPTION</span>
              </div>
            </div>
          </div>
          
          {/* Ports */}
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 bg-background border-2 border-destructive rounded-full" />
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 bg-destructive border-2 border-destructive rounded-full" />
        </div>

        {/* Retry "Action" Node */}
        <button 
          onClick={() => reset()}
          className="group flex items-center gap-3 bg-card border shadow-sm rounded-full px-5 py-2 hover:border-primary hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer"
        >
          <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <RotateCcw className="size-3" />
          </div>
          <span className="text-sm font-medium">Retry Execution</span>
        </button>

      </div>
    </div>
  )
}
