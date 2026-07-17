import type { Node } from "@xyflow/react"

import {
  Globe,
  MousePointerClick,
  MousePointer2,
  FileJson,
  Eye,
  Bot,
  type LucideIcon,
} from "lucide-react"

export type StepNodeKind = "trigger" | "action"

// One editable field on a node, rendered as an input in the inspector later.
export type NodeField = {
  key: string
  label: string
  placeholder?: string
  multiline?: boolean
  required?: boolean
}
export type NodeOutput = {
  path: string
  label: string
}
// A node type's manifest entry. Add a node by adding an entry to nodeRegistry.
export type NodeDefinition = {
  type: string
  kind: StepNodeKind
  label: string
  icon: LucideIcon
  accent: string // Tailwind classes for the icon chip color
  colorBorder: string
  colorHandleHover: string
  fields: NodeField[]
  outputs: NodeOutput[]
}

export const nodeRegistry = {
  start: {
    type: "start",
    kind: "trigger",
    label: "Start",
    icon: MousePointerClick,
    accent: "bg-blue-500 text-white",
    colorBorder: "border-blue-500",
    colorHandleHover: "hover:bg-blue-500!",
    fields: [],
    outputs: [],
  },
  "open-url": {
    type: "open-url",
    kind: "action",
    label: "Open URL",
    icon: Globe,
    accent: "bg-emerald-500 text-white",
    colorBorder: "border-emerald-500",
    colorHandleHover: "hover:bg-emerald-500!",
    fields: [
      {
        key: "url",
        label: "URL",
        placeholder: "https://youtube.com",
        required: true,
      },
    ],
    outputs: [
      { path: "url", label: "URL" },
      { path: "title", label: "Title" },
    ],
  },
  act: {
    type: "act",
    kind: "action",
    label: "Act",
    icon: MousePointer2,
    accent: "bg-orange-500 text-white",
    colorBorder: "border-orange-500",
    colorHandleHover: "hover:bg-orange-500!",
    fields: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Click the sign in button",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { path: "success", label: "Success" },
      { path: "message", label: "Message" },
      { path: "url", label: "URL" },
    ],
  },
  extract: {
    type: "extract",
    kind: "action",
    label: "Extract",
    icon: FileJson,
    accent: "bg-purple-500 text-white",
    colorBorder: "border-purple-500",
    colorHandleHover: "hover:bg-purple-500!",
    fields: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Extract the names and prices of all products",
        multiline: true,
        required: true,
      },
    ],
    outputs: [{ path: "extraction", label: "Extraction" }],
  },
  observe: {
    type: "observe",
    kind: "action",
    label: "Observe",
    icon: Eye,
    accent: "bg-amber-500 text-white",
    colorBorder: "border-amber-500",
    colorHandleHover: "hover:bg-amber-500!",
    fields: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder: "Find all interactive elements",
        multiline: true,
        required: true,
      },
    ],
    outputs: [{ path: "matches", label: "Matches" }],
  },
  agent: {
    type: "agent",
    kind: "action",
    label: "Agent",
    icon: Bot,
    accent: "bg-indigo-500 text-white",
    colorBorder: "border-indigo-500",
    colorHandleHover: "hover:bg-indigo-500!",
    fields: [
      {
        key: "instruction",
        label: "Instruction",
        placeholder:
          "Log in with test@example.com and password123, then cancel my subscription",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { path: "success", label: "Success" },
      { path: "message", label: "Message" },
      { path: "completed", label: "Completed" },
    ],
  },
} satisfies Record<string, NodeDefinition>

export type NodeType = keyof typeof nodeRegistry

// Plain JSON only (synced through Liveblocks later). type keys into the registry;
// kind and title are denormalized so the server can read them without the registry.
export type StepNodeData = {
  type: NodeType
  kind: StepNodeKind
  title: string
  values: Record<string, string>
}

export type StepNodeType = Node<StepNodeData, "step">
export type ActionNodeType = {
  [K in NodeType]: (typeof nodeRegistry)[K]["kind"] extends "action" ? K : never
}[NodeType]
