import { Stagehand } from "@browserbasehq/stagehand"

export async function observe({
  stagehand,
  instruction,
}: {
  stagehand: Stagehand
  instruction: string
}) {
  const results = await stagehand.observe(instruction)

  // Stagehand observation objects can contain runtime-only fields. Publish the
  // stable, serializable details needed by downstream interpolation and logs.
  const matches = results.map(({ selector, description }) => ({
    selector,
    description,
  }))

  return {
    matches,
  }
}
