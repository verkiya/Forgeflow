import { Stagehand } from "@browserbasehq/stagehand"

export async function act({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const result = await stagehand.act(instruction)
  const url = stagehand.context.pages()[0]?.url() || ""
  return {
    success: result.success,
    message: result.message,
    url,
  }
}
