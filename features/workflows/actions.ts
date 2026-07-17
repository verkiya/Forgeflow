"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import {
  createWorkflow,
  deleteWorkflow,
  getWorkflow,
  saveWorkflowGraph,
  renameWorkflow,
} from "./data"
import { WorkflowGraph } from "@/lib/db/schema"
import { liveblocks } from "./lib/liveblocks"
import { tasks, runs } from "@trigger.dev/sdk"
import { type runWorkflowTask } from "@/features/workflows/tasks/run-workflow"
export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("Unauthorized: No active organization")
  }

  const normalizedName = name.trim()
  if (!normalizedName) {
    throw new Error("A workflow name is required")
  }

  if (normalizedName.length > 120) {
    throw new Error("Workflow names must be 120 characters or fewer")
  }

  const workflow = await createWorkflow(orgId, normalizedName)

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
  const { orgId, has } = await auth()
  if (!orgId) throw new Error("No active organization")

  // Trigger.dev tasks do not have a Clerk session. Enforce this expensive,
  // organization-level feature while the active plan is still available here.
  if (
    graph.nodes.some((node) => node.data.type === "agent") &&
    !has({ plan: "pro" })
  ) {
    throw new Error("The Agent node requires the Pro plan")
  }

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

  const workflow = await deleteWorkflow(orgId, id)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  try {
    await liveblocks.deleteRoom(id)
  } catch (error) {
    // Ignore errors if the room doesn't exist
    console.error(`Failed to delete room ${id}:`, error)
  }

  revalidatePath("/", "layout")
}
export async function cancelWorkflowRunAction({
  workflowId,
  runId,
}: {
  workflowId: string
  runId: string
}) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("No active organization")

  // Check both the database owner and the Trigger tag. Server Actions are
  // directly invokable, so the client-provided run id cannot be trusted.
  const workflow = await getWorkflow(orgId, workflowId)
  if (!workflow) throw new Error("Workflow not found")

  const run = await runs.retrieve(runId)
  if (!run.tags.includes(`workflow:${workflowId}`)) {
    throw new Error("Run does not belong to this workflow")
  }

  await runs.cancel(runId)
}

export async function renameWorkflowAction(id: string, name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("Unauthorized: No active organization")
  }

  const normalizedName = name.trim()
  if (!normalizedName) {
    throw new Error("A workflow name is required")
  }

  if (normalizedName.length > 120) {
    throw new Error("Workflow names must be 120 characters or fewer")
  }

  await renameWorkflow(orgId, id, normalizedName)

  revalidatePath("/workflows", "layout")
  revalidatePath(`/workflows/${id}`, "layout")
}
