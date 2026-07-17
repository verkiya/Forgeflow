import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

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
  const { orgId, has } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      {/* ── Header: Org Switcher ── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mt-2 mb-2 px-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/forgeflow.svg"
                alt="Forgeflow Logo"
                width={30}
                height={30}
                className="shrink-0"
              />
              <div className="flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
                <span className="-ml-0.5 bg-gradient-to-br from-primary to-[oklch(0.63_0.13_159)] bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
                  orgeflow
                </span>
                {has({ plan: "pro" }) ? (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Pro
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Free
                  </span>
                )}
              </div>
            </Link>
          </SidebarMenuItem>
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
                      "!w-full !h-12 mt-4 border-1 rounded-xl group-data-[collapsible=icon]:mt-2! group-data-[collapsible=icon]:border-transparent",
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
          <SidebarMenuItem className="mb-2 px-2">
            <SidebarMenuButton asChild className="w-full">
              <Link href="/pricing" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-credit-card"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span>Billing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
