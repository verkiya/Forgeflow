"use client"

import { useState } from "react"
import { LogsPanel } from "./logs-panel"
import { InspectorPanel } from "./inspector-panel"
import { useLatestRunSteps } from "./workflow-runs-provider"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ConsolePanel() {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const { steps } = useLatestRunSteps()

  const selectedStep = steps.find((s) => s.id === selectedStepId)

  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize={20} defaultSize={selectedStepId ? 50 : 100}>
        <LogsPanel
          selectedStepId={selectedStepId}
          onSelectStep={setSelectedStepId}
        />
      </ResizablePanel>

      {selectedStepId && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={50}>
            <InspectorPanel step={selectedStep} />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}
