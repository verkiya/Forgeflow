"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ── Header: Org Switcher ── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox:
                      "!w-full !h-12 border-1 rounded-xl group-data-[collapsible=icon]:border-transparent",
                    avatarBox: "!size-4 !rounded-sm",
                    organizationSwitcherTrigger:
                      "!w-full !justify-start group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2",
                    organizationPreview:
                      "group-data-[collapsible=icon]:!justify-center !gap-2",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:!hidden !text-xs !font-medium !text-sidebar-foreground",
                    organizationSwitcherTriggerIcon:
                      "group-data-[collapsible=icon]:!hidden !ml-auto !text-sidebar-foreground",
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Content: Workflow List ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workflows</SidebarGroupLabel>
          <SidebarGroupAction title="New workflow">
            <Plus />
            <span className="sr-only">New workflow</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {workflows.map((workflow) => (
                <SidebarMenuItem key={workflow.id}>
                  <SidebarMenuButton
                    isActive={workflow.active}
                    tooltip={workflow.name}
                  >
                    <span>{workflow.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: User Button ── */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox:
                    "!w-full !h-12 border-1 rounded-xl group-data-[collapsible=icon]:border-transparent",
                  userButtonTrigger:
                    "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2!",
                  userButtonBox:
                    "!w-full !flex-row-reverse !justify-end !gap-2 group-data-[collapsible=icon]:!justify-center !text-sidebar-foreground",
                  userButtonOuterIdentifier:
                    "!pl-0 group-data-[collapsible=icon]:!hidden",
                  avatarBox: "!size-4",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
