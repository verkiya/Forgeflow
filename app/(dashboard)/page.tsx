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
import { useProGate } from "@/features/workflows/hooks/use-pro-gate"

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { isPro, upgrade } = useProGate()
  return (
    <div className="flex min-h-svh flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b p-2">
        <SidebarTrigger />
      </div>

      {/* Empty state */}
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Workflow />
          </EmptyMedia>
          <EmptyTitle className="text-lg">No workflow selected</EmptyTitle>
          <EmptyDescription>
            Select a workflow from the sidebar or create a new one to get
            started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            size="lg"
            disabled={isPending}
            onClick={() => {
              if (!isPro) {
                upgrade()
                return
              }
              const slug = generateSlug()
              startTransition(async () => {
                try {
                  const res = await createWorkflowAction(slug)
                  toast.success("Workflow created")
                  router.push(`/workflows/${res.id}`)
                } catch (error) {
                  toast.error("Failed to create workflow")
                }
              })
            }}
          >
            <Plus />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
