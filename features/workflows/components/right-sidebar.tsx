"use client"

import { useState } from "react"
import { Play, Trash2, Pen } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResizablePanel } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import {
  nodeRegistry,
  type NodeDefinition,
  type NodeField,
  type NodeType,
  type StepNodeKind,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry"

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
    <div className="flex min-h-0 flex-1 flex-col h-full">
      <div className="flex items-center gap-2 border-y border-white/5 bg-black/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground shadow-sm">
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
}: {
  field: NodeField
  value: string
  onChange: (value: string) => void
}) {
  // TODO: support a multiline field variant (textarea).
  return (
    <Input
      id={field.key}
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

// The Editor tab: one input per field on the selected node, or an empty state.
function Inspector({ node }: { node: StepNodeType | undefined }) {
  if (!node) {
    return (
      <Section title="Editor">
        <p className="p-3 text-sm text-muted-foreground">No node selected</p>
      </Section>
    )
  }

  const { type, title, values } = node.data
  const def: NodeDefinition = nodeRegistry[type]

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
              </Label>
              <FieldInput
                field={field}
                value={values[field.key] ?? ""}
                onChange={(value) => {
                  // TODO: save the edit back onto the selected node.
                  void value
                }}
              />
            </div>
          ))
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
  const add = (type: NodeType) => {
    // TODO: add the clicked node to the canvas (one trigger max).
    void type
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
            className="border-white/5 border rounded-xl mb-3 overflow-hidden bg-black/20 shadow-sm"
          >
            <AccordionTrigger className="py-3 px-4 text-xs font-semibold text-foreground hover:no-underline hover:bg-white/5 transition-colors">
              {section.label}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 p-2 bg-black/40 border-t border-white/5">
              {definitions
                .filter((def) => def.kind === section.kind)
                .map((def) => (
                  <Button
                    key={def.type}
                    variant="ghost"
                    onClick={() => add(def.type as NodeType)}
                    className="justify-start gap-3 px-3 py-1.5 h-auto text-xs font-medium hover:bg-white/10 hover:text-white transition-all rounded-lg group"
                  >
                    <NodeIcon type={def.type as NodeType} className="transition-transform group-hover:scale-110 shadow-sm" />
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
function ActionsMenu() {
  return (
    <div className="flex items-center gap-1">
      <Button
        size="icon"
        variant="secondary"
        className="hover:bg-white/10 text-muted-foreground hover:text-white size-8 transition-colors"
        onClick={() => {
          // TODO: rename the workflow
        }}
      >
        <Pen className="size-3.5" />
      </Button>
      <Button
        size="icon"
        variant="destructive"
        className="hover:bg-destructive/20 text-muted-foreground hover:text-destructive size-8 transition-colors"
        onClick={() => {
          // TODO: delete the workflow, then navigate away.
        }}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  )
}

// Kicks off a run of the current workflow.
function RunButton() {
  return (
    <Button
      size="sm"
      className="bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary transition-all border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.15)] hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] rounded-full px-5 font-semibold tracking-wide"
      onClick={() => {
        // TODO: validate the graph and run the workflow (toggle to Stop while running).
      }}
    >
      <Play fill="currentColor" className="size-3.5 mr-1" />
      Run
    </Button>
  )
}

// ---------------------------------------------------------------------------
// The sidebar itself — header on top, then the Toolbar / Editor tabs.
// ---------------------------------------------------------------------------

export function RightSidebar() {
  const [tab, setTab] = useState("toolbar")

  // TODO: read the currently selected node from React Flow.
  const selected: StepNodeType | undefined = undefined

  // TODO: auto-switch to the Editor tab when the selection changes.

  return (
    <ResizablePanel
      className="bg-background/80 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col"
      defaultSize="25rem"
      minSize="20rem"
      maxSize="36rem"
      groupResizeBehavior="preserve-pixel-size"
    >
      <Tabs value={tab} onValueChange={setTab} className="flex flex-col size-full min-h-0">

        <div className="flex items-center justify-between border-b border-white/5 bg-black/40 p-3 shadow-sm z-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
          <ActionsMenu />
          <RunButton />
        </div>

        <div className="px-4 py-3 bg-gradient-to-b from-black/20 to-transparent">
          <TabsList className="w-full bg-black/40 border border-white/5 rounded-xl p-1 h-11 grid grid-cols-2 gap-1 shadow-inner items-center">
            <TabsTrigger
              value="toolbar"
              className="rounded-lg h-full text-xs font-bold tracking-wide data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
            >
              Toolbar
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              className="rounded-lg h-full text-xs font-bold tracking-wide data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
            >
              Editor
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden relative">
          <TabsContent value="toolbar" className="h-full m-0 data-[state=active]:flex flex-col outline-none">
            <Palette />
          </TabsContent>
          <TabsContent value="editor" className="h-full m-0 data-[state=active]:flex flex-col outline-none">
            <Inspector node={selected} />
          </TabsContent>
        </div>

      </Tabs>
    </ResizablePanel>
  )
}
