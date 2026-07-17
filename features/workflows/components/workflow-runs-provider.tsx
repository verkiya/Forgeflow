"use client"

import { createContext, useContext } from "react"
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks"
import type { RunStep, runWorkflowTask } from "../tasks/run-workflow"

type WorkflowRunsContextType = {
  runs: any[]
  error: Error | undefined
}

const WorkflowRunsContext = createContext<WorkflowRunsContextType | undefined>(
  undefined
)

export function WorkflowRunsProvider({
  workflowId,
  publicAccessToken,
  children,
}: {
  workflowId: string
  publicAccessToken: string
  children: React.ReactNode
}) {
  const { runs, error } = useRealtimeRunsWithTag<typeof runWorkflowTask>(
    `workflow:${workflowId}`,
    {
      accessToken: publicAccessToken,
    }
  )

  return (
    <WorkflowRunsContext.Provider value={{ runs, error }}>
      {children}
    </WorkflowRunsContext.Provider>
  )
}

export function useLatestRunSteps() {
  const context = useContext(WorkflowRunsContext)
  if (!context) {
    throw new Error(
      "useLatestRunSteps must be used within WorkflowRunsProvider"
    )
  }

  const { runs } = context

  if (!runs || runs.length === 0) {
    return { steps: [] as RunStep[], isLive: false }
  }

  const latestRun = runs[0]
  const isLive =
    latestRun.status === "QUEUED" || latestRun.status === "EXECUTING"

  const finalSteps = latestRun.output?.steps as RunStep[] | undefined
  const metadataSteps = latestRun.metadata?.steps as RunStep[] | undefined

  const steps = finalSteps ?? metadataSteps ?? []

  const finalSessionId = latestRun.output?.sessionId as string | undefined
  const metadataSessionId = latestRun.metadata?.sessionId as string | undefined

  const sessionId = finalSessionId ?? metadataSessionId

  return { steps, isLive, sessionId, runId: latestRun.id }
}
