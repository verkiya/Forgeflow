import { Loader2, Zap, Database, ArrowRight } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-background relative overflow-hidden">
      {/* ── Dot Grid Background ── */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20" 
        style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 flex items-center gap-16 scale-90 sm:scale-100">
        
        {/* Node 1: Trigger */}
        <div className="w-48 bg-card border shadow-sm rounded-xl overflow-hidden opacity-50 relative">
          <div className="h-1.5 w-full bg-chart-1" />
          <div className="p-3 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-chart-1/20 text-chart-1 flex items-center justify-center shrink-0">
              <Zap className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Initialize</h4>
            </div>
          </div>
          {/* Output Port */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 bg-muted border-2 border-border rounded-full" />
        </div>

        {/* Edge (Connecting Line) */}
        <div className="absolute left-48 top-1/2 -translate-y-1/2 w-16 h-[2px] bg-primary/40">
          <div className="h-full bg-primary w-full animate-[shimmer_1.5s_infinite] origin-left" style={{ backgroundImage: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />
        </div>

        {/* Node 2: Loading State */}
        <div className="w-56 bg-card border-2 border-primary shadow-lg ring-4 ring-primary/20 rounded-xl overflow-hidden relative">
          <div className="h-1.5 w-full bg-primary" />
          <div className="p-4 flex items-start gap-3">
            <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Loader2 className="size-5 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Loading App</h4>
              <p className="text-xs text-muted-foreground mt-1">Booting workspace...</p>
            </div>
          </div>
          {/* Input Port */}
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 bg-background border-2 border-primary rounded-full" />
        </div>

      </div>
    </div>
  )
}
