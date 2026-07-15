"use client"

import { Plus, Workflow } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const workflows = [
  { id: "1", name: "dominant-wasp", active: true },
  { id: "2", name: "honest-reindeer", active: false },
  { id: "3", name: "expected-llama", active: false },
  { id: "4", name: "essential-ocelot", active: false },
  { id: "5", name: "creepy-echidna", active: false },
  { id: "6", name: "eastern-silkworm", active: false },
  { id: "7", name: "cultural-lion", active: false },
  { id: "8", name: "proud-weasel", active: false },
  { id: "9", name: "regional-bonobo", active: false },
]

function WorkflowList() {
  return (
    <>
      {workflows.map((workflow) => (
        <SidebarMenuItem key={workflow.id}>
          <SidebarMenuButton
            isActive={workflow.active}
            className={cn(
              "transition-all hover:scale-[1.01] hover:bg-primary/20",
              workflow.active && "bg-primary/60! font-semibold!"
            )}
          >
            <span>{workflow.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  )
}

export function WorkflowNav() {
  const { state } = useSidebar()

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton tooltip="Workflows" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <Workflow />
                    <span className="sr-only">Workflows</span>
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent side="right" align="start" className="w-56 p-2 rounded-xl">
                  <div className="mb-2 px-1">
                    <Button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border/60 bg-transparent p-2 text-xs font-medium text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all">
                      <Plus className="h-3.5 w-3.5" />
                      <span>New Workflow</span>
                    </Button>
                  </div>
                  <SidebarMenu className="space-y-1">
                    <WorkflowList />
                  </SidebarMenu>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  // Expanded State
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction title="New workflow">
        <Plus />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2">
          <WorkflowList />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
