"use client"

import { createContext, useContext, useMemo } from "react"
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks"
import type { RunStep, runWorkflowTask } from "../tasks/run-workflow"

type WorkflowRun = ReturnType<
  typeof useRealtimeRunsWithTag<typeof runWorkflowTask>
>["runs"][number]

type WorkflowRunsContextType = {
  runs: WorkflowRun[]
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

  const value = useMemo<WorkflowRunsContextType>(
    () => ({ runs, error }),
    [runs, error]
  )

  return (
    <WorkflowRunsContext.Provider value={value}>
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

  return useMemo(() => {
    const latestRun = runs.reduce<WorkflowRun | undefined>((latest, run) => {
      if (!latest || run.createdAt > latest.createdAt) return run
      return latest
    }, undefined)

    if (!latestRun) {
      return { steps: [] as RunStep[], isLive: false }
    }

    const isLive =
      latestRun.status === "QUEUED" || latestRun.status === "EXECUTING"
    const finalSteps = latestRun.output?.steps as RunStep[] | undefined
    const metadataSteps = latestRun.metadata?.steps as RunStep[] | undefined
    const finalSessionId = latestRun.output?.sessionId as string | undefined
    const metadataSessionId = latestRun.metadata?.sessionId as
      string | undefined

    return {
      steps: finalSteps ?? metadataSteps ?? [],
      isLive,
      sessionId: finalSessionId ?? metadataSessionId,
      runId: latestRun.id,
    }
  }, [runs])
}
