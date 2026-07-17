import { SidebarTrigger } from "@/components/ui/sidebar"
import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { auth } from "@clerk/nextjs/server"
import { getWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/features/workflows/lib/liveblocks"
import { notFound } from "next/navigation"
import { auth as triggerAuth } from "@trigger.dev/sdk"
import { WorkflowRunsProvider } from "@/features/workflows/components/workflow-runs-provider"
import { nodeRegistry, type NodeType } from "@/features/workflows/nodes/node-registry"
import { NodeIcon } from "@/features/workflows/components/node-icon"
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

  const definitions = Object.values(nodeRegistry)

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
            <DialogContent className="w-[720px]! max-w-none! h-[83vh]! max-h-none! overflow-y-auto">

              <div className="space-y-6 py-2">
                <section>
                  <h3 className="text-base font-semibold mb-3">Canvas Controls</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm">
                      <span className="text-sm font-medium">Pan Canvas</span>
                      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-black/40 px-2 font-mono text-[11px] font-medium text-muted-foreground opacity-100">Click & Drag</kbd>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm">
                      <span className="text-sm font-medium">Zoom In/Out</span>
                      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-black/40 px-2 font-mono text-[11px] font-medium text-muted-foreground opacity-100">Scroll Wheel</kbd>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm">
                      <span className="text-sm font-medium">Select Multiple</span>
                      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-black/40 px-2 font-mono text-[11px] font-medium text-muted-foreground opacity-100">Shift + Drag</kbd>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm">
                      <span className="text-sm font-medium">Delete Nodes/Edges</span>
                      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-black/40 px-2 font-mono text-[11px] font-medium text-muted-foreground opacity-100">Backspace</kbd>
                    </div>
                  </div>
                </section>
                <section>
                  <h3 className="text-base font-semibold mb-3">Node Reference</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {definitions.map((def) => (
                      <div
                        key={def.type}
                        className="flex flex-col gap-2 rounded-xl border p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <NodeIcon
                            type={def.type as NodeType}
                            className="size-8"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">{def.label}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              {def.kind} Node
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {def.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
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
