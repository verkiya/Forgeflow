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
import { CreditCardIcon } from "lucide-react"
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
            <Link href="/" className="flex items-center gap-0">
              <Image
                src="/forgeflow.svg"
                alt="ForgeFlow Logo"
                width={32}
                height={32}
                className="shrink-0"
              />
              <div className="flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
                <span className="-ml-3.0! mt-1 bg-gradient-to-br z-2! from-primary to-[oklch(0.63_0.13_159)] bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
                  orgeflow
                </span>
                {has({ plan: "org:pro" }) ? (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                    Pro
                  </span>
                ) : (
                  <span className="rounded-full bg-sidebar-border! px-2 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
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
      <SidebarContent className="mt-2 group-data-[collapsible=icon]:-mt-4! ">
        <WorkflowNav workflows={workflows} />
      </SidebarContent>

      {/* Vertical 'Forge' text (only visible when collapsed) */}
      <div className="hidden mb-55 animate-pulse flex-1 flex-col items-center justify-center gap-1 group-data-[collapsible=icon]:flex overflow-hidden">
        {"Forge".split("").map((letter, i) => (
          <span
            key={i}
            className="text-xl font-bold uppercase bg-gradient-to-b from-primary to-[oklch(0.63_0.13_159)]/80 bg-clip-text text-transparent opacity-60"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* ── Footer: User Button ── */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="mb-2">
            <SidebarMenuButton asChild className="w-full group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 text-center! flex! flex-1! justify-center! border">
              <Link href="/pricing" className="flex items-center gap-2">
               <CreditCardIcon className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">Billing</span>
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
