import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { auth } from "@clerk/nextjs/server"
import { listWorkflows } from "@/features/workflows/data"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      {/* ── Header: Org Switcher ── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                afterLeaveOrganizationUrl="/"
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox:
                      "!w-full !h-12 border-1 rounded-xl group-data-[collapsible=icon]:border-transparent",
                    avatarBox:
                      "!size-6 !rounded-sm ml-2 group-data-[collapsible=icon]:ml-0",
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
        <WorkflowNav workflows={workflows} />
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
                  avatarBox:
                    "!size-4 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:rounded-xl!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail className="!cursor-col-resize" />
    </Sidebar>
  )
}
