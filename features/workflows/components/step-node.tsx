import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

import { nodeRegistry, type StepNodeType } from "../nodes/node-registry"
import { cn } from "@/lib/utils"
import { useLatestRunSteps } from "./workflow-runs-provider"
import { Loader2 } from "lucide-react"

function StepNodeComponent({ id, data, selected }: NodeProps<StepNodeType>) {
  const { type, kind, title, values } = data
  const def = nodeRegistry[type]
  const Icon = def.icon
  const fields = def.fields.filter((field) => values[field.key])
  // A trigger starts the flow and takes no input, so it has no target handle.
  const hasTarget = kind !== "trigger"

  const { steps, isLive } = useLatestRunSteps()
  const stepStatus = steps.find((s) => s.id === id)?.status
  const isRunning = isLive && stepStatus === "running"
  const isFailed = stepStatus === "failed"

  return (
    <div
      className={cn(
        "max-w-80 min-w-50 rounded-(--radius) border-2 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
        isRunning
          ? "border-yellow-500 shadow-md"
          : isFailed
            ? "border-destructive shadow-md"
            : selected
              ? cn(def.colorBorder, "shadow-md")
              : "border-border"
      )}
    >
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ transform: "translate(-100%, -50%)" }}
          className={cn(
            "h-4! w-1.5! min-w-0! rounded-l-xs! rounded-r-none! border-0! bg-muted-foreground/40! transition-colors",
            def.colorHandleHover
          )}
        />
      )}

      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md",
            def.accent
          )}
        >
          {isRunning ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Icon className="size-4" />
          )}
        </div>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      {fields.length > 0 && (
        <>
          <div className="border-t border-border" />
          <div className="flex flex-col gap-1.5 px-3 py-2.5">
            {fields.map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between gap-4 text-xs"
              >
                <span className="shrink-0 text-muted-foreground">
                  {field.label}
                </span>
                <span className="truncate font-medium">
                  {values[field.key]}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ transform: "translate(100%, -50%)" }}
        className={cn(
          "h-4! w-1.5! min-w-0! rounded-l-none! rounded-r-xs! border-0! bg-muted-foreground/40! transition-colors",
          def.colorHandleHover
        )}
      />
    </div>
  )
}

export const StepNode = memo(StepNodeComponent)
