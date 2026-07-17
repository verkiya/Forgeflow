"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { createWorkflow, deleteWorkflow, saveWorkflowGraph } from "./data"
import { WorkflowGraph } from "@/lib/db/schema"
import { liveblocks } from "./lib/liveblocks"
import { tasks, runs } from "@trigger.dev/sdk"
import { redirect } from "next/navigation"
import { type runWorkflowTask } from "@/features/workflows/tasks/run-workflow"
export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("Unauthorized: No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/workflows", "layout")
  return { id: workflow.id }
}

export async function runWorkflowAction({
  id,
  graph,
}: {
  id: string
  graph: WorkflowGraph
}) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("No active organization")
  await saveWorkflowGraph({ orgId, id, graph })
  const handle = await tasks.trigger<typeof runWorkflowTask>(
    "run-workflow",
    { workflowId: id, orgId },
    { tags: [`workflow:${id}`] }
  )

  return handle
}

export async function deleteWorkflowAction(id: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("Unauthorized: No active organization")
  }

  await deleteWorkflow(orgId, id)

  try {
    await liveblocks.deleteRoom(id)
  } catch (error) {
    // Ignore errors if the room doesn't exist
    console.error(`Failed to delete room ${id}:`, error)
  }

  revalidatePath("/", "layout")
}
export async function cancelWorkflowRunAction(runId: string) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("No active organization")
  await runs.cancel(runId)
}
