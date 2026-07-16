"use client"

import React, { useSyncExternalStore } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  type Connection,
  ConnectionLineType,
  Panel,
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  Edge,
} from "@xyflow/react"
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow"
import { useTheme } from "next-themes"
import { AvatarStack } from "@liveblocks/react-ui"
import "@xyflow/react/dist/style.css"
import "@liveblocks/react-ui/styles.css"
import "@liveblocks/react-flow/styles.css"
import { StepNode } from "./step-node"
import type { StepNodeType } from "../nodes/node-registry"
const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false
const nodeTypes: NodeTypes = { step: StepNode }
const initialNodes = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: {
      type: "start",
      kind: "trigger",
      title: "Start",
      values: {},
    },
  },
]
const initialEdges: Edge[] = []

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot
  )
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      nodes: { initial: initialNodes as any },
      edges: { initial: initialEdges },
      suspense: true,
    })

  return (
    <div className="size-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        connectionLineType={ConnectionLineType.SimpleBezier}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: "var(--border)" },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1.5}
        colorMode={
          isMounted ? (resolvedTheme as "light" | "dark" | "system") : "dark"
        }
        snapToGrid
        snapGrid={[16, 16]}
        connectionRadius={24}
        fitView
      >
        <MiniMap zoomable pannable />
        <Controls showInteractive={false} />
        <Cursors />
        <Panel position="top-right">
          <AvatarStack />
        </Panel>
      </ReactFlow>
    </div>
  )
}
