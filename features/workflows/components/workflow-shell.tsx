"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ReactFlowProvider } from "@xyflow/react"
import { RightSidebar } from "./right-sidebar"
import { Canvas } from "./canvas"

export function WorkflowShell({ workflowId }: { workflowId: string }) {
  return (
    <ReactFlowProvider>
      <ResizablePanelGroup orientation="horizontal" className="size-full">
        {/* Left panel: Primary column */}
        <ResizablePanel minSize="30rem">
          <ResizablePanelGroup orientation="vertical">
            {/* Top panel: Canvas */}
            <ResizablePanel minSize="18rem">
              <Canvas />
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Bottom panel: Logs */}
            <ResizablePanel maxSize="18rem" defaultSize="16rem" minSize="16rem">
              <div className="flex size-full items-center justify-center bg-muted/20 p-6">
                <span className="font-semibold text-muted-foreground">Logs</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Right panel: Inspector */}
        <ResizablePanel defaultSize="16rem" minSize="16rem" maxSize="20rem">
          <RightSidebar workflowId={workflowId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ReactFlowProvider>
  )
}
