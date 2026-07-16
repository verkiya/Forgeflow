import { Loader2, Database, Sparkles, Server } from "lucide-react"

const ForgeflowIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 71 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 31.369C0 19.567 9.567 10 21.369 10H71C71 21.802 61.433 31.369 49.631 31.369H0Z"
      fill="oklch(0.8545 0.1675 159.6564)"
    />
    <path
      d="M0 53.423C0 45.047 6.79 38.258 15.165 38.258H49.631C49.631 46.633 42.841 53.423 34.466 53.423H0Z"
      fill="oklch(0.74 0.15 159)"
    />
    <path
      d="M0 70.66C0 64.95 4.63 60.32 10.34 60.32H33.777C33.777 66.03 29.147 70.66 23.437 70.66H0Z"
      fill="oklch(0.63 0.13 159)"
    />
  </svg>
)

export default function Loading() {
  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden bg-background">
      <style>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -12;
          }
        }
        .animate-dash-flow {
          animation: dash-flow 1s linear infinite;
        }
      `}</style>

      {/* ── Dot Grid Background ── */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Diagram Container */}
      <div className="relative z-10 h-[400px] w-[750px] scale-75 sm:scale-90 md:scale-100">
        {/* SVG Edges */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          {/* Static semi-transparent paths */}
          <g strokeWidth="2" fill="none" className="opacity-20">
            <path stroke="#10b981" d="M 192 195 C 226 195, 226 95, 260 95" />
            <path stroke="#10b981" d="M 192 195 C 226 195, 226 295, 260 295" />
            <path stroke="#f97316" d="M 452 95 C 489 95, 489 195, 526 195" />
            <path stroke="#a855f7" d="M 452 295 C 489 295, 489 195, 526 195" />
          </g>
          {/* Animated dashed paths */}
          <g
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 6"
            className="animate-dash-flow opacity-80"
          >
            <path stroke="#10b981" d="M 192 195 C 226 195, 226 95, 260 95" />
            <path stroke="#10b981" d="M 192 195 C 226 195, 226 295, 260 295" />
            <path stroke="#f97316" d="M 452 95 C 489 95, 489 195, 526 195" />
            <path stroke="#a855f7" d="M 452 295 C 489 295, 489 195, 526 195" />
          </g>
        </svg>

        {/* Node 1: Trigger */}
        <div
          className="absolute top-[160px] left-0 w-48 overflow-hidden rounded-xl border bg-card shadow-sm"
          style={{ zIndex: 10 }}
        >
          <div className="h-1.5 w-full bg-emerald-500" />
          <div className="flex items-center gap-3 p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <ForgeflowIcon className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Forgeflow</h4>
            </div>
          </div>
          <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-emerald-500" />
        </div>

        {/* Node 2: AI Processing */}
        <div
          className="absolute top-[60px] left-[260px] w-48 overflow-hidden rounded-xl border bg-card opacity-90 shadow-sm"
          style={{ zIndex: 10 }}
        >
          <div className="h-1.5 w-full bg-orange-500" />
          <div className="flex items-center gap-3 p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">AI Agent</h4>
            </div>
          </div>
          <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-orange-500" />
          <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-orange-500" />
        </div>

        {/* Node 3: Database */}
        <div
          className="absolute top-[260px] left-[260px] w-48 overflow-hidden rounded-xl border bg-card opacity-90 shadow-sm"
          style={{ zIndex: 10 }}
        >
          <div className="h-1.5 w-full bg-purple-500" />
          <div className="flex items-center gap-3 p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <Database className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Query DB</h4>
            </div>
          </div>
          <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-purple-500" />
          <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-purple-500" />
        </div>

        {/* Node 4: Loading State (Final) */}
        <div
          className="absolute top-[152px] left-[526px] w-56 overflow-hidden rounded-xl border-2 border-blue-500/50 bg-card shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-4 ring-blue-500/10"
          style={{ zIndex: 10 }}
        >
          <div className="h-1.5 w-full bg-blue-500" />
          <div className="flex items-start gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Loader2 className="size-5 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Loading Workflow</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Syncing layout...
              </p>
            </div>
          </div>
          <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-background" />
        </div>
      </div>
    </div>
  )
}
