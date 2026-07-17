import { useNodes, useEdges, getIncomers } from "@xyflow/react"
import {
  nodeRegistry,
  type StepNodeType,
  type NodeType,
} from "../nodes/node-registry"
import { useMemo } from "react"

export type UpstreamOutput = {
  token: string
  label: string
  nodeType: NodeType
  nodeId: string
  nodeTitle: string
}

export function useUpstreamConnections(
  selectedNode: StepNodeType | undefined
): UpstreamOutput[] {
  const nodes = useNodes<StepNodeType>()
  const edges = useEdges()

  return useMemo(() => {
    if (!selectedNode) return []

    const upstreamNodes = new Set<StepNodeType>()

    const collectIncomers = (node: StepNodeType) => {
      const incomers = getIncomers(node, nodes, edges) as StepNodeType[]
      for (const incomer of incomers) {
        if (!upstreamNodes.has(incomer)) {
          upstreamNodes.add(incomer)
          collectIncomers(incomer)
        }
      }
    }

    collectIncomers(selectedNode)

    const outputs: UpstreamOutput[] = []

    for (const node of upstreamNodes) {
      const def = nodeRegistry[node.data.type]
      if (def && def.outputs) {
        for (const out of def.outputs) {
          outputs.push({
            token: `{{ ${node.id}.${out.path} }}`,
            label: `${node.data.title} · ${out.label}`,
            nodeType: node.data.type,
            nodeId: node.id,
            nodeTitle: node.data.title,
          })
        }
      }
    }

    return outputs
  }, [selectedNode, nodes, edges])
}
