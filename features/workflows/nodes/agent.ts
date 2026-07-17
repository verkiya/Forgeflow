import { Stagehand } from "@browserbasehq/stagehand"

export async function agent({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const agentInstance = stagehand.agent({
    model: "google/gemini-2.5-flash",
  })

  const result = await agentInstance.execute({
    instruction,
    maxSteps: 20,
  })

  return {
    success: result.success,
    message: result.message,
    completed: result.completed,
  }
}
