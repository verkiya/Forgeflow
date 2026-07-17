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
  output?: any
  error?: string
}

export const runWorkflowTask = task({
  id: "run-workflow",
  run: async ({ workflowId, orgId }: { workflowId: string; orgId: string }) => {
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
    metadata.set("steps", steps)

    const updateStep = async (stepId: string, updates: Partial<RunStep>) => {
      const step = steps.find((s) => s.id === stepId)
      if (step) {
        Object.assign(step, updates)
        metadata.set("steps", steps)
        await metadata.flush()
      }
    }

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
      return stagehand
    }
    const outputs: Record<string, any> = {}
    for (const id of order) {
      const node = byId.get(id)!
      logger.log(`Running step: ${node.data.title}`)

      await updateStep(id, { status: "running", startedAt: Date.now() })
      const startTime = performance.now()

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
          })
          outputs[id] = result
          await updateStep(id, {
            status: "done",
            output: result,
            durationMs: performance.now() - startTime,
          })
        } catch (error: any) {
          await updateStep(id, {
            status: "failed",
            error: error?.message || String(error),
            durationMs: performance.now() - startTime,
          })
          await stagehand?.close()
          throw error
        }
      } else {
        await updateStep(id, {
          status: "done",
          durationMs: performance.now() - startTime,
        })
      }
    }
    await stagehand?.close()
    return { steps }
  },
})
