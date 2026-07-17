import { NotFoundError } from "@browserbasehq/sdk"
import { auth } from "@clerk/nextjs/server"
import { runs } from "@trigger.dev/sdk"

import { getWorkflow } from "@/features/workflows/data"
import { browserbase } from "@/lib/browserbase"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { userId, orgId, has } = await auth()
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!has({ plan: "pro" })) {
    return new Response("Pro plan required", { status: 403 })
  }

  const { sessionId } = await params
  const { searchParams } = new URL(request.url)
  const workflowId = searchParams.get("workflowId")
  const runId = searchParams.get("runId")

  if (!workflowId || !runId) {
    return new Response("Workflow and run identifiers are required", {
      status: 400,
    })
  }

  // A session id alone is not authorization. Verify that this user owns the
  // workflow, that the Trigger run is tagged for it, and that it produced this
  // exact Browserbase session before proxying a signed playlist.
  const workflow = await getWorkflow(orgId, workflowId)
  if (!workflow) {
    return new Response("Not found", { status: 404 })
  }

  const run = await runs.retrieve(runId)
  const output = run.output as { sessionId?: unknown } | undefined
  if (
    !run.tags.includes(`workflow:${workflowId}`) ||
    output?.sessionId !== sessionId
  ) {
    return new Response("Not found", { status: 404 })
  }

  try {
    const replay = await browserbase.sessions.replays.retrieve(sessionId)
    const firstPage = replay.pages[0]
    if (!firstPage) {
      return new Response(null, { status: 202 })
    }

    const playlist = await browserbase.sessions.replays.retrievePage(
      sessionId,
      firstPage.pageId
    )
    const m3u8 = await playlist.text()

    return new Response(m3u8, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        // Browserbase signs the playlist segment URLs, so never cache an old
        // manifest after those URLs expire.
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    // Browserbase returns a 404 while it is still registering a recording.
    // The client understands 202 as the transient state and continues polling.
    if (error instanceof NotFoundError) {
      return new Response(null, { status: 202 })
    }
    throw error
  }
}
