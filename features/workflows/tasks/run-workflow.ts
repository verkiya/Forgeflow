import toposort from "toposort"
import { logger, task, metadata } from "@trigger.dev/sdk"
import { getWorkflow } from "../data"
import { nodeExecutors } from "../nodes/node-executors"
import { Stagehand } from "@browserbasehq/stagehand"
import { interpolate } from "../lib/interpolate"

export type RunStep = {
  id: string
  status: "pending" | "running" | "done" | "failed"
  type: string
  title: string
  startedAt?: number
  durationMs?: number
  output?: unknown
  error?: string
}

export const runWorkflowTask = task({
  id: "run-workflow",
  run: async (
    { workflowId, orgId }: { workflowId: string; orgId: string },
    { ctx }
  ) => {
    const workflow = await getWorkflow(orgId, workflowId)
    if (!workflow?.graph) throw new Error(`Workflow ${workflowId} has no graph`)
    const { nodes, edges } = workflow.graph
    const byId = new Map(nodes.map((n) => [n.id, n]))
    const connected = new Set(edges.flatMap((e) => [e.source, e.target]))
    const order = toposort
      .array(
        nodes.map((n) => n.id),
        edges.map((e) => [e.source, e.target])
      )
      .filter((id) => connected.has(id))
    logger.log(`Running workflow ${workflow.name}`, { steps: order.length })

    const steps: RunStep[] = order.map((id) => {
      const node = byId.get(id)!
      return {
        id,
        status: "pending",
        type: node.data.type,
        title: node.data.title,
      }
    })
    // Executors return runtime values, while Trigger metadata accepts JSON.
    // Node outputs are serialized by the SDK at this boundary for the console.
    const publishSteps = () =>
      metadata.set(
        "steps",
        steps as unknown as Parameters<typeof metadata.set>[1]
      )
    publishSteps()

    const updateStep = async (stepId: string, updates: Partial<RunStep>) => {
      const step = steps.find((s) => s.id === stepId)
      if (step) {
        Object.assign(step, updates)
        publishSteps()
        await metadata.flush()
      }
    }

    let sessionId: string | undefined
    let stagehand: Stagehand | undefined
    const getStagehand = async () => {
      if (stagehand) return stagehand
      stagehand = new Stagehand({
        env: "BROWSERBASE",
        apiKey: process.env.BROWSERBASE_API_KEY!,
        model: "google/gemini-2.5-flash",
        disablePino: true,
      })
      await stagehand.init()
      sessionId = stagehand.browserbaseSessionID
      if (sessionId) {
        metadata.set("sessionId", sessionId)
        await metadata.flush()
      }
      return stagehand
    }
    const outputs: Record<string, unknown> = {}

    try {
      for (const id of order) {
        const node = byId.get(id)!
        logger.log(`Running step: ${node.data.title}`)

        await updateStep(id, { status: "running", startedAt: Date.now() })
        const startedAt = Date.now()

        const executor = nodeExecutors[node.data.type]
        if (executor) {
          const interpolatedValues: Record<string, string> = {}
          for (const [key, value] of Object.entries(node.data.values)) {
            interpolatedValues[key] = interpolate(value, outputs)
          }

          try {
            const result = await executor({
              values: interpolatedValues,
              getStagehand,
              runId: ctx.run.id,
              nodeId: id,
            })
            outputs[id] = result
            await updateStep(id, {
              status: "done",
              output: result,
              durationMs: Date.now() - startedAt,
            })
          } catch (error) {
            await updateStep(id, {
              status: "failed",
              error: error instanceof Error ? error.message : String(error),
              durationMs: Date.now() - startedAt,
            })
            throw error
          }
        } else {
          await updateStep(id, {
            status: "done",
            durationMs: Date.now() - startedAt,
          })
        }
      }

      return { steps, sessionId }
    } finally {
      // A cancelled task or an exception outside an executor still owns the
      // Browserbase session. Closing in finally prevents leaked sessions.
      await stagehand?.close()
    }
  },
})
