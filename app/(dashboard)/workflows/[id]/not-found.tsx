import Link from "next/link"
import { Home, Unplug } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative flex h-full flex-1 w-full items-center justify-center overflow-hidden bg-background">
      {/* ── Dot Grid Background ── */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex scale-90 flex-col items-center gap-10 sm:scale-100">
        {/* Node: 404 Disconnected */}
        <div className="relative w-80 overflow-hidden rounded-xl border bg-card shadow-xl">
          <div className="h-1.5 w-full bg-warning" />
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning-foreground ring-8 ring-warning/5">
              <Unplug className="size-8" />
            </div>
            <div>
              <h1 className="mb-1 text-4xl font-bold tracking-tighter text-foreground">
                404
              </h1>
              <h4 className="text-base font-semibold">Workflow Not Found</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The workflow you are looking for does not exist or you do not have access to it.
              </p>
            </div>
          </div>

          {/* Unconnected Ports */}
          <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-background" />
          <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-background" />
        </div>

        {/* Dashboard "Action" Node */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full border bg-card px-5 py-2 shadow-sm transition-all hover:border-primary hover:ring-2 hover:ring-primary/20"
        >
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Home className="size-3" />
          </div>
          <span className="text-sm font-medium">Return to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}
