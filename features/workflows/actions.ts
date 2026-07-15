"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createWorkflow } from "./data"
import { tasks } from "@trigger.dev/sdk"
import type { helloWorldTask } from "@/trigger/example"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("Unauthorized: No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/workflows","layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function runWorkflowAction() {
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Triggered from the UI"
  })
  
  return { id: handle.id }
}
