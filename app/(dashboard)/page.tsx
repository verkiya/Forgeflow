"use client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { Plus, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import { toast } from "sonner"

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <div className="flex min-h-svh flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b p-2">
        <SidebarTrigger />
      </div>

      {/* Empty state */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-background">
        
        {/* Subtle Canvas Dot Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(150,150,150,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

        {/* Floating subtle background nodes (decorative) */}
        <div className="absolute top-1/3 left-1/4 z-0 flex h-10 w-24 -rotate-6 animate-pulse items-center justify-center rounded-lg border border-primary/10 bg-background/50 shadow-sm backdrop-blur-sm transition-all duration-1000 dark:border-primary/20 dark:bg-black/50" />
        <div className="absolute top-1/2 right-1/4 z-0 flex h-12 w-32 rotate-3 animate-pulse items-center justify-center rounded-lg border border-blue-500/10 bg-background/50 shadow-sm backdrop-blur-sm transition-all duration-1000 delay-300 dark:border-blue-500/20 dark:bg-black/50" />
        <div className="absolute bottom-1/3 left-1/3 z-0 flex h-10 w-28 -rotate-3 animate-pulse items-center justify-center rounded-lg border border-emerald-500/10 bg-background/50 shadow-sm backdrop-blur-sm transition-all duration-1000 delay-500 dark:border-emerald-500/20 dark:bg-black/50" />
        
        {/* Connection line decorative */}
        <svg className="absolute inset-0 h-full w-full opacity-20 dark:opacity-40" style={{ zIndex: 0 }}>
          <path
            d="M 30% 35% C 40% 35%, 40% 55%, 50% 55%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-primary/30"
          />
          <path
            d="M 70% 52% C 60% 52%, 60% 70%, 50% 70%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-blue-500/30"
          />
        </svg>

        <div className="relative z-10 flex max-w-sm flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border bg-background shadow-xl dark:border-white/10 dark:bg-black/60 dark:shadow-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
            <Workflow className="size-10 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" strokeWidth={1.5} />
          </div>
          
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
            No workflow selected
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            Select an existing workflow from the sidebar, or create a brand new one to start automating tasks on the canvas.
          </p>
          
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full px-8 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            disabled={isPending}
            onClick={() => {
              const slug = generateSlug()
              startTransition(async () => {
                try {
                  const res = await createWorkflowAction(slug)
                  toast.success("Workflow created")
                  router.push(`/workflows/${res.id}`)
                } catch {
                  toast.error("Failed to create workflow")
                }
              })
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />
                Creating...
              </span>
            ) : (
              <span className="flex items-center gap-2 font-semibold">
                <Plus className="size-5" />
                Create New Workflow
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
