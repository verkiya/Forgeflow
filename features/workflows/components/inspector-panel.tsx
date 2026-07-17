import { NodeIcon } from "./node-icon"
import { type NodeType } from "@/features/workflows/nodes/node-registry"
import type { RunStep } from "../tasks/run-workflow"
import { ScrollArea } from "@/components/ui/scroll-area"

export function InspectorPanel({ step }: { step: RunStep | undefined }) {
  if (!step) return null

  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-black/40">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/5 bg-black/20 px-4">
        <NodeIcon
          type={step.type as NodeType}
          className="size-5 [&_svg]:size-3"
        />
        <span className="text-sm font-semibold tracking-wide text-foreground">
          {step.title}
        </span>
      </div>
      <ScrollArea className="flex-1 p-4">
        {step.status === "pending" || step.status === "running" ? (
          <p className="text-sm text-muted-foreground">Waiting for output...</p>
        ) : step.status === "failed" ? (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            <span className="font-semibold">Error: </span>
            {step.error || "Unknown error occurred"}
          </div>
        ) : step.output ? (
          <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/60 p-4 text-xs text-green-400">
            {JSON.stringify(step.output, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">No output produced.</p>
        )}
      </ScrollArea>
    </div>
  )
}
