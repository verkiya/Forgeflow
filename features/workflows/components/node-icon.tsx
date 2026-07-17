import { Loader2, Box } from "lucide-react"
import {
  nodeRegistry,
  type NodeType,
} from "@/features/workflows/nodes/node-registry"
import { cn } from "@/lib/utils"

export function NodeIcon({
  type,
  className,
  running,
}: {
  type: NodeType | string | undefined
  className?: string
  running?: boolean
}) {
  const def = type ? nodeRegistry[type as NodeType] : undefined

  if (!def) {
    return (
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground",
          className
        )}
      >
        {running ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Box className="size-4" />
        )}
      </span>
    )
  }

  const Icon = def.icon

  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        def.accent,
        className
      )}
    >
      {running ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Icon className="size-4" />
      )}
    </span>
  )
}
