"use client"

import { Plus, Workflow as WorkflowIcon, Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTransition } from "react"

import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Workflow } from "@/lib/db/schema"
interface WorkflowNavProps{
  workflows:Workflow[]
}
function WorkflowList({ workflows }: WorkflowNavProps) {
  const pathname = usePathname()
  return (
    <>
      {workflows.map((workflow) => {
        const active = pathname === `/workflows/${workflow.id}`
        return (
          <SidebarMenuItem key={workflow.id}>
            <SidebarMenuButton
              isActive={active}
              asChild
              className={cn(
                "transition-all hover:scale-[1.01] hover:bg-primary/20",
                active && "bg-primary/60! font-semibold!"
              )}
            >
              <Link href={`/workflows/${workflow.id}`}>
                <span>{workflow.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </>
  )
}

export function WorkflowNav({ workflows }: { workflows: Workflow[] }) {
  const { state } = useSidebar()
  const [isPending, startTransition] = useTransition()

  const handleCreateWorkflow = () => {
    const slug = generateSlug()
    startTransition(async () => {
      try {
        await createWorkflowAction(slug)
      } catch (error) {
        console.error("Failed to create workflow:", error)
      }
    })
  }

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Workflows"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <WorkflowIcon />
                    <span className="sr-only">Workflows</span>
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  className="w-56 rounded-xl p-2"
                >
                  <div className="mb-2 px-1">
                    <Button 
                      onClick={handleCreateWorkflow}
                      disabled={isPending}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border/60 bg-transparent p-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                    >
                      {isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                      <span>{isPending ? "Creating..." : "New Workflow"}</span>
                    </Button>
                  </div>
                  <SidebarMenu className="space-y-1">
                    <WorkflowList workflows={workflows} />
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
      <SidebarGroupAction 
        onClick={handleCreateWorkflow} 
        disabled={isPending} 
        title="New workflow"
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2">
          <WorkflowList workflows={workflows} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
