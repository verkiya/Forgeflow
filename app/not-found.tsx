import Link from "next/link"
import { Search, Home, Unplug } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-background relative overflow-hidden">
      {/* ── Dot Grid Background ── */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20" 
        style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 flex flex-col items-center gap-10 scale-90 sm:scale-100">
        
        {/* Node: 404 Disconnected */}
        <div className="w-80 bg-card border shadow-xl rounded-xl overflow-hidden relative">
          <div className="h-1.5 w-full bg-warning" />
          <div className="p-6 flex flex-col items-center text-center gap-4">
            <div className="size-16 rounded-full bg-warning/10 text-warning-foreground flex items-center justify-center shrink-0 ring-8 ring-warning/5">
              <Unplug className="size-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground mb-1">404</h1>
              <h4 className="text-base font-semibold">Node Not Found</h4>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                The endpoint you are trying to reach is disconnected or does not exist in this workflow.
              </p>
            </div>
          </div>
          
          {/* Unconnected Ports */}
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 bg-background border-2 border-border rounded-full" />
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 bg-background border-2 border-border rounded-full" />
        </div>

        {/* Dashboard "Action" Node */}
        <Link 
          href="/"
          className="group flex items-center gap-3 bg-card border shadow-sm rounded-full px-5 py-2 hover:border-primary hover:ring-2 hover:ring-primary/20 transition-all"
        >
          <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Home className="size-3" />
          </div>
          <span className="text-sm font-medium">Return to Dashboard</span>
        </Link>

      </div>
    </div>
  )
}
