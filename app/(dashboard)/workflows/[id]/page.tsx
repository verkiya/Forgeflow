import { SidebarTrigger } from "@/components/ui/sidebar"
import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { auth } from "@clerk/nextjs/server"
import { getWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/features/workflows/lib/liveblocks"
import { notFound } from "next/navigation"
import { auth as triggerAuth } from "@trigger.dev/sdk"
import { WorkflowRunsProvider } from "@/features/workflows/components/workflow-runs-provider"
import { Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()
  if (!orgId) notFound()
  const workflow = await getWorkflow(orgId, id)
  if (!workflow) notFound()

  // Ensure the room exists and the organization has write access
  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
  })

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: { read: { tags: [`workflow:${id}`] } },
    expirationTime: "1hr",
  })

  return (
    <div className="flex min-h-svh flex-col">
      {/* Top bar */}
      <div className="flex h-12 items-center gap-3 border-b px-4">
        <SidebarTrigger className="shrink-0" />
        <div className="h-4 w-px bg-border" />
        <h1 className="text-sm font-medium tracking-tight truncate text-foreground">
          {workflow.name}
        </h1>

        <div className="ml-auto flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-yellow-500/90 hover:text-yellow-300 hover:bg-yellow-400/10">
                <Info className="size-5" />
                <span className="sr-only">Canvas Controls Info</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Canvas Controls</DialogTitle>
                <DialogDescription>
                  Shortcuts to help you navigate and edit the workflow canvas efficiently.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <span className="text-sm font-medium">Pan Canvas</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Click & Drag</kbd>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <span className="text-sm font-medium">Zoom In/Out</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Scroll Wheel</kbd>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <span className="text-sm font-medium">Select Multiple</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Shift + Drag</kbd>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <span className="text-sm font-medium">Delete Nodes</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Backspace</kbd>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <Room roomId={id}>
          <WorkflowRunsProvider
            workflowId={id}
            publicAccessToken={publicAccessToken}
          >
            <WorkflowShell workflowId={id} />
          </WorkflowRunsProvider>
        </Room>
      </div>
    </div>
  )
}
