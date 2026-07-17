import { useLatestRunSteps } from "./workflow-runs-provider"
import { NodeIcon } from "./node-icon"
import { type NodeType } from "@/features/workflows/nodes/node-registry"
import { cn } from "@/lib/utils"
import prettyMilliseconds from "pretty-ms"
import type { RunStep } from "../tasks/run-workflow"
import { Video } from "lucide-react"

export function LogsPanel({
  selectedStepId,
  onSelectStep,
}: {
  selectedStepId: string | null
  onSelectStep: (id: string | null) => void
}) {
  const { steps, isLive, sessionId } = useLatestRunSteps()

  if (steps.length === 0) {
    return (
      <div className="flex size-full items-center justify-center p-6 text-sm text-muted-foreground">
        No runs yet. Click Run to start.
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-11 shrink-0 items-center border-b border-white/5 bg-black/20 px-4">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Run Logs
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-1">
          {steps.map((step) => {
            const isRunning = isLive && step.status === "running"
            const isFailed = step.status === "failed"
            const isSelected = selectedStepId === step.id

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(isSelected ? null : step.id)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all hover:bg-white/5",
                  isSelected && "bg-white/10 ring-1 ring-white/20",
                  isFailed &&
                    "border border-destructive/50 bg-destructive/10 hover:bg-destructive/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <NodeIcon
                    type={step.type as NodeType}
                    running={isRunning}
                    className={cn(
                      "transition-transform group-hover:scale-110",
                      step.status === "pending" && "opacity-50 grayscale"
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium",
                      step.status === "pending" && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {step.durationMs !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    {prettyMilliseconds(step.durationMs)}
                  </span>
                )}
              </button>
            )
          })}

          {sessionId && !isLive && (
            <button
              onClick={() =>
                onSelectStep(selectedStepId === "replay" ? null : "replay")
              }
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all hover:bg-white/5",
                selectedStepId === "replay" &&
                  "bg-white/10 ring-1 ring-white/20"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-blue-500 text-white">
                  <Video className="size-4" />
                </span>
                <span className="font-medium text-blue-400">
                  Session Replay
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
