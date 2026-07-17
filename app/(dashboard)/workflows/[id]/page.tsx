import { SidebarTrigger } from "@/components/ui/sidebar"
import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { auth } from "@clerk/nextjs/server"
import { getWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/features/workflows/lib/liveblocks"
import { notFound } from "next/navigation"
import { auth as triggerAuth } from "@trigger.dev/sdk"
import { WorkflowRunsProvider } from "@/features/workflows/components/workflow-runs-provider"

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
      <div className="flex items-center gap-2 border-b p-2">
        <SidebarTrigger />
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
