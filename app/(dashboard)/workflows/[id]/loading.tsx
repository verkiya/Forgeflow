import { Loader2, Zap } from "lucide-react"

export default function Loading() {
  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden bg-background">
      {/* ── Dot Grid Background ── */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex scale-90 items-center gap-16 sm:scale-100">
        {/* Node 1: Trigger */}
        <div className="relative w-48 overflow-hidden rounded-xl border bg-card opacity-50 shadow-sm">
          <div className="h-1.5 w-full bg-chart-1" />
          <div className="flex items-center gap-3 p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-chart-1/20 text-chart-1">
              <Zap className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Database</h4>
            </div>
          </div>
          {/* Output Port */}
          <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-muted" />
        </div>

        {/* Edge (Connecting Line) */}
        <div className="absolute top-1/2 left-48 h-[2px] w-16 -translate-y-1/2 bg-primary/40">
          <div
            className="h-full w-full origin-left animate-[shimmer_1.5s_infinite] bg-primary"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, var(--primary), transparent)",
            }}
          />
        </div>

        {/* Node 2: Loading State */}
        <div className="relative w-56 overflow-hidden rounded-xl border-2 border-primary bg-card shadow-lg ring-4 ring-primary/20">
          <div className="h-1.5 w-full bg-primary" />
          <div className="flex items-start gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Loader2 className="size-5 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Loading Workflow</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Fetching nodes...
              </p>
            </div>
          </div>
          {/* Input Port */}
          <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-primary bg-background" />
        </div>
      </div>
    </div>
  )
}
