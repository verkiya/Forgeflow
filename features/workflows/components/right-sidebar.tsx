"use client"

import { useState, useEffect, useTransition } from "react"
import { Play, Trash2, Pen } from "lucide-react"
import { useReactFlow, useStore } from "@xyflow/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useUpstreamConnections } from "../hooks/use-upstream-connections"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { validateGraph } from "../lib/validate-graph"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ResizablePanel } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import {
  nodeRegistry,
  type NodeDefinition,
  type NodeField,
  type NodeType,
  type StepNodeData,
  type StepNodeKind,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry"
import {
  deleteWorkflowAction,
  runWorkflowAction,
} from "@/features/workflows/actions"

// This file builds up to the RightSidebar component exported at the bottom: a
// header with workflow actions (delete, run), then two tabs — a Toolbar for
// adding nodes and an Editor for tweaking the selected node. Each helper below is
// defined just above the block that uses it.

// ---------------------------------------------------------------------------
// Shared pieces — used by both the Toolbar and the Editor.
// ---------------------------------------------------------------------------

// The accent-colored icon chip, mirroring the node on the canvas.
function NodeIcon({ type, className }: { type: NodeType; className?: string }) {
  const def = nodeRegistry[type]
  const Icon = def.icon
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        def.accent,
        className
      )}
    >
      <Icon className="size-4" />
    </span>
  )
}

// A titled, scrollable panel. Each tab renders its content inside one.
function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-2 border-y border-white/5 bg-black/20 px-4 py-2.5 text-xs font-bold tracking-wider text-muted-foreground uppercase shadow-sm">
        {icon}
        {title}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Editor tab — edits the fields of the selected node.
// ---------------------------------------------------------------------------

// A single editor field for a node property.
function FieldInput({
  field,
  value,
  onChange,
  onFocus,
}: {
  field: NodeField
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
}) {
  if (field.multiline) {
    return (
      <Textarea
        id={field.key}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        rows={3}
        className="resize-none"
      />
    )
  }

  return (
    <Input
      id={field.key}
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />
  )
}

// The Editor tab: one input per field on the selected node, or an empty state.
function Inspector({ node }: { node: StepNodeType | undefined }) {
  const { updateNodeData } = useReactFlow<StepNodeType>()
  const [lastFocusedField, setLastFocusedField] = useState<string | null>(null)
  const upstreamConnections = useUpstreamConnections(node)

  useEffect(() => {
    setLastFocusedField(null)
  }, [node?.id])

  if (!node) {
    return (
      <Section title="Editor">
        <p className="p-3 text-sm text-muted-foreground">No node selected</p>
      </Section>
    )
  }

  const { type, title, values } = node.data
  const def: NodeDefinition = nodeRegistry[type]

  const insertToken = (token: string) => {
    const fieldKey =
      lastFocusedField || (def.fields.length > 0 ? def.fields[0].key : null)
    if (!fieldKey) return
    const currentVal = values[fieldKey] ?? ""
    updateNodeData(node.id, {
      values: { ...values, [fieldKey]: currentVal + token },
    })
  }

  return (
    <Section title={title} icon={<NodeIcon type={type} />}>
      <div className="flex flex-col gap-3 p-3">
        {def.fields.length === 0 ? (
          <p className="text-xs text-muted-foreground">No properties</p>
        ) : (
          def.fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <Label htmlFor={field.key} className="text-xs">
                {field.label}
                {field.required && (
                  <span className="flex items-center text-destructive">*</span>
                )}
              </Label>
              <FieldInput
                field={field}
                value={values[field.key] ?? ""}
                onFocus={() => setLastFocusedField(field.key)}
                onChange={(value) => {
                  updateNodeData(node.id, {
                    values: { ...values, [field.key]: value },
                  })
                }}
              />
            </div>
          ))
        )}

        {upstreamConnections.length > 0 && (
          <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
            <Label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Connections
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {upstreamConnections.map((conn) => (
                <Button
                  key={conn.token}
                  variant="secondary"
                  size="sm"
                  onClick={() => insertToken(conn.token)}
                  className="h-6 gap-1.5 rounded-full px-2 text-[10px] font-medium"
                >
                  <NodeIcon
                    type={conn.nodeType}
                    className="size-4 [&_svg]:size-3"
                  />
                  {conn.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Toolbar tab — adds nodes to the canvas, grouped by kind.
// ---------------------------------------------------------------------------

// The Toolbar's groups, one accordion section per node kind.
const sections: { kind: StepNodeKind; label: string }[] = [
  { kind: "trigger", label: "Triggers" },
  { kind: "action", label: "Actions" },
]

// Every node type from the registry, filtered into the groups below.
const definitions = Object.values(nodeRegistry)

// The Toolbar tab: a button per node type that adds it to the canvas.
function Palette() {
  const { getNodes, addNodes, getViewport } = useReactFlow()

  const add = (type: NodeType) => {
    const def = nodeRegistry[type]
    const allNodes = getNodes()

    // Enforce single-trigger rule
    if (
      def.kind === "trigger" &&
      allNodes.some((n) => (n.data as StepNodeData).kind === "trigger")
    ) {
      toast.info("Only one Trigger node is allowed per workflow.")
      return
    }

    // Count existing nodes of this type to generate a numbered title
    const sameTypeCount = allNodes.filter(
      (n) => (n.data as StepNodeData).type === type
    ).length
    const title =
      sameTypeCount === 0 ? def.label : `${def.label} ${sameTypeCount + 1}`

    // Place the new node at the center of the current viewport, with a staggered offset
    // so multiple nodes don't spawn directly on top of one another.
    const { x, y, zoom } = getViewport()
    const offset = (allNodes.length % 10) * 20
    const centerX = (-x + window.innerWidth / 2) / zoom + offset
    const centerY = (-y + window.innerHeight / 2) / zoom + offset

    addNodes({
      id: crypto.randomUUID(),
      type: "step",
      position: { x: centerX, y: centerY },
      data: {
        type,
        kind: def.kind,
        title,
        values: {},
      } satisfies StepNodeData,
    })
  }

  return (
    <Section title="Toolbar">
      <Accordion
        type="multiple"
        defaultValue={sections.map((s) => s.kind)}
        className="px-2"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.kind}
            value={section.kind}
            className="mb-3 overflow-hidden rounded-xl border border-white/5 bg-black/20 shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-xs font-semibold text-foreground transition-colors hover:bg-white/5 hover:no-underline">
              {section.label}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 border-t border-white/5 bg-black/40 p-2">
              {definitions
                .filter((def) => def.kind === section.kind)
                .map((def) => (
                  <Button
                    key={def.type}
                    variant="ghost"
                    onClick={() => add(def.type as NodeType)}
                    className="group h-auto justify-start gap-3 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:bg-white/10 hover:text-white"
                  >
                    <NodeIcon
                      type={def.type as NodeType}
                      className="shadow-sm transition-transform group-hover:scale-110"
                    />
                    {def.label}
                  </Button>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Header — workflow-level actions shown above the tabs.
// ---------------------------------------------------------------------------

// Workflow-level actions.
function ActionsMenu({ workflowId }: { workflowId: string }) {
  const [isPending, startTransition] = useTransition()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="flex items-center gap-1">
      <Button
        size="icon"
        variant="secondary"
        className="size-8 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
        onClick={() => {
          // TODO: rename the workflow
        }}
      >
        <Pen className="size-3.5" />
      </Button>
      <Popover open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="destructive"
            className="size-8 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
            disabled={isPending}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Delete workflow?</h4>
            <p className="text-xs text-muted-foreground">
              This action cannot be undone. This will permanently delete this
              workflow.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              disabled={isPending}
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-8"
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  try {
                    await deleteWorkflowAction(workflowId)
                    toast.warning("Workflow deleted")
                    setIsDeleteOpen(false)
                    router.push("/")
                  } catch (err) {
                    toast.error("Failed to delete workflow")
                    setIsDeleteOpen(false)
                  }
                })
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Kicks off a run of the current workflow.
function RunButton({ workflowId }: { workflowId: string }) {
  const { getNodes, getEdges } = useReactFlow<StepNodeType>()
  const [isPending, startTransition] = useTransition()
  return (
    <Button
      size="lg"
      className="rounded-full border border-primary/20 bg-primary/20 px-5 font-semibold tracking-wide text-primary shadow-[0_0_15px_rgba(var(--primary),0.15)] transition-all hover:bg-primary/30 hover:text-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
      disabled={isPending}
      onClick={() => {
        // Validate the graph and run the workflow (toggle to Stop while running)
        const graph = { nodes: getNodes(), edges: getEdges() }
        const problems = validateGraph(graph)
        if (problems.length > 0) {
          toast.error(problems[0])
          return
        }
        startTransition(async () => {
          await runWorkflowAction({ id: workflowId, graph })
        })
      }}
    >
      <Play fill="currentColor" className="mr-1 size-4" />
      Run
    </Button>
  )
}

// ---------------------------------------------------------------------------
// The sidebar itself — header on top, then the Toolbar / Editor tabs.
// ---------------------------------------------------------------------------

export function RightSidebar({ workflowId }: { workflowId: string }) {
  const [tab, setTab] = useState("toolbar")

  // TODO: read the currently selected node from React Flow.
  const selected = useStore((s) => s.nodes.find((n) => n.selected)) as
    StepNodeType | undefined

  // Auto-switch to the Editor tab when a node is selected.
  useEffect(() => {
    if (selected) {
      setTab("editor")
    } else {
      setTab("toolbar")
    }
  }, [selected?.id])

  return (
    <ResizablePanel
      className="flex flex-col border-l border-white/10 bg-background/80 shadow-2xl backdrop-blur-xl"
      defaultSize="25rem"
      minSize="20rem"
      maxSize="36rem"
      groupResizeBehavior="preserve-pixel-size"
    >
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex size-full min-h-0 flex-col"
      >
        <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-black/40 p-3 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <ActionsMenu workflowId={workflowId} />
          <RunButton workflowId={workflowId} />
        </div>

        <div className="bg-gradient-to-b from-black/20 to-transparent px-4 py-3">
          <TabsList className="grid h-11 w-full grid-cols-2 items-center gap-1 rounded-xl border border-white/5 bg-black/40 p-1 shadow-inner">
            <TabsTrigger
              value="toolbar"
              className="h-full rounded-lg text-xs font-bold tracking-wide transition-all data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Toolbar
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              className="h-full rounded-lg text-xs font-bold tracking-wide transition-all data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Editor
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <TabsContent
            value="toolbar"
            className="m-0 h-full flex-col outline-none data-[state=active]:flex"
          >
            <Palette />
          </TabsContent>
          <TabsContent
            value="editor"
            className="m-0 h-full flex-col outline-none data-[state=active]:flex"
          >
            <Inspector node={selected} />
          </TabsContent>
        </div>
      </Tabs>
    </ResizablePanel>
  )
}
