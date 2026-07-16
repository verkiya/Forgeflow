"use client"

import React, { useCallback, useSyncExternalStore } from 'react'
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, addEdge, type Connection, ConnectionLineType, MiniMap, BackgroundVariant, NodeTypes, Edge } from '@xyflow/react'
import { useTheme } from 'next-themes'
import '@xyflow/react/dist/style.css'
import { StepNode } from './step-node'
import type { StepNodeType } from '../nodes/node-registry'
const emptySubscribe = () => () => { }
const getSnapshot = () => true
const getServerSnapshot = () => false
const nodeTypes:NodeTypes={step:StepNode}
const initialNodes = [
  {
    id: "start", type: "step",
    position: { x: 0, y: 0 }, data: {
      type: "start", kind: "trigger", title: "Start", values: {}
    },
  },
]
const initialEdges: Edge[] = []

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SimpleBezier}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={
          {
            type: "smoothstep",
            animated: true,
            style: { stroke: "var(--border)" }
          }
        }
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width":2
          } as React.CSSProperties
        }
        maxZoom={1.5}
        colorMode={isMounted ? (resolvedTheme as "light" | "dark" | "system") : "dark"}
        snapToGrid
        snapGrid={[16, 16]}
        connectionRadius={24}
        fitView
      >

        <MiniMap zoomable pannable />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
