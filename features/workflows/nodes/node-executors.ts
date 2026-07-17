import { Stagehand } from "@browserbasehq/stagehand"
import { ActionNodeType, NodeType } from "./node-registry"
import { openUrl } from "./open-url"
import { act } from "./act"
import { extract } from "./extract"
import { observe } from "./observe"
import { agent } from "./agent"
import { sendEmail } from "./send-email"
export type NodeContext = {
  values: Record<string, string>
  getStagehand: () => Promise<Stagehand>
  runId: string
  nodeId: string
}
export type NodeExecutor = (ctx: NodeContext) => Promise<unknown>
export const nodeExecutors: Partial<Record<NodeType, NodeExecutor>> = {
  "open-url": async ({ values, getStagehand }) =>
    openUrl({ stagehand: await getStagehand(), url: values.url }),
  act: async ({ values, getStagehand }) =>
    act({ stagehand: await getStagehand(), instruction: values.instruction }),
  extract: async ({ values, getStagehand }) =>
    extract({
      stagehand: await getStagehand(),
      instruction: values.instruction,
    }),
  observe: async ({ values, getStagehand }) =>
    observe({
      stagehand: await getStagehand(),
      instruction: values.instruction,
    }),
  agent: async ({ values, getStagehand }) =>
    agent({ stagehand: await getStagehand(), instruction: values.instruction }),
  "send-email": async ({ values, runId, nodeId }) =>
    sendEmail({
      to: values.to,
      subject: values.subject,
      body: values.body,
      // Trigger.dev can retry a failed workflow from its first step. Keep this
      // side effect idempotent within one run so a retry never sends twice.
      idempotencyKey: `workflow-run/${runId}/node/${nodeId}`,
    }),
} satisfies Record<ActionNodeType, NodeExecutor>
