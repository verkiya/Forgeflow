"use client"

import { Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "../actions"
import { useTransition } from "react"
import { toast } from "sonner"

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()

  const handleRun = () => {
    startTransition(async () => {
      try {
        await runWorkflowAction()
        toast.success("Workflow triggered!")
      } catch (error) {
        toast.error("Failed to trigger workflow")
      }
    })
  }

  return (
    <div className="flex size-full items-center justify-center bg-muted/40 p-6">
      <Button onClick={handleRun} disabled={isPending}>
        {isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Play className="mr-2 size-4" />
        )}
        Run
      </Button>
    </div>
  )
}
