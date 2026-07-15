"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bot,
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock,
  Code2,
  Command as CommandIcon,
  Cpu,
  CreditCard,
  Database,
  Globe,
  Info,
  Key,
  LayoutDashboard,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Moon,
  Play,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
  Workflow,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const Section = ({
  title,
  children,
  description,
}: {
  title: string
  children: React.ReactNode
  description?: string
}) => (
  <section className="space-y-6 border-b pt-8 pb-12">
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
    {children}
  </section>
)

const ColorSwatch = ({
  name,
  variable,
  cssVar,
  fgClass = "",
}: {
  name: string
  variable: string
  cssVar: string
  fgClass?: string
}) => (
  <div className="flex flex-col space-y-2">
    <div
      className={`h-24 w-full rounded-lg border shadow-sm ${variable} flex items-end p-3`}
    >
      <span
        className={`font-mono text-xs font-medium ${fgClass || "text-current"}`}
      >
        Aa
      </span>
    </div>
    <div className="space-y-1 text-sm">
      <p className="font-semibold">{name}</p>
      <p className="font-mono text-xs text-muted-foreground">{cssVar}</p>
    </div>
  </div>
)

export default function DesignSystemPage() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="min-h-svh bg-background pb-24 text-foreground">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-50 border-b bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
              <Workflow className="size-4" />
            </div>
            <div>
              <h1 className="text-lg leading-none font-bold tracking-tight">
                ForgeFlow Design System
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Living UI Documentation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8">
        {/* ── COLORS ── */}
        <Section
          title="Colors"
          description="Semantic and structural color palettes, synchronized with globals.css."
        >
          <Tabs defaultValue="side-by-side" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="side-by-side">Side-by-Side</TabsTrigger>
              <TabsTrigger value="light">Light Mode</TabsTrigger>
              <TabsTrigger value="dark">Dark Mode</TabsTrigger>
            </TabsList>

            {[
              {
                id: "side-by-side",
                lightClass: "bg-background text-foreground",
                darkClass: "dark bg-background text-foreground",
              },
              {
                id: "light",
                lightClass: "bg-background text-foreground col-span-2",
                darkClass: "hidden",
              },
              {
                id: "dark",
                lightClass: "hidden",
                darkClass: "dark bg-background text-foreground col-span-2",
              },
            ].map((view) => (
              <TabsContent key={view.id} value={view.id}>
                <div className="grid grid-cols-2 gap-8">
                  {/* Light Container */}
                  <div className={`rounded-xl border p-8 ${view.lightClass}`}>
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                      <Sun className="size-4" /> Light Theme
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Surfaces
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch
                            name="Background"
                            variable="bg-background"
                            cssVar="var(--background)"
                            fgClass="text-foreground"
                          />
                          <ColorSwatch
                            name="Card"
                            variable="bg-card"
                            cssVar="var(--card)"
                            fgClass="text-card-foreground"
                          />
                          <ColorSwatch
                            name="Popover"
                            variable="bg-popover"
                            cssVar="var(--popover)"
                            fgClass="text-popover-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Neutrals
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch
                            name="Secondary"
                            variable="bg-secondary"
                            cssVar="var(--secondary)"
                            fgClass="text-secondary-foreground"
                          />
                          <ColorSwatch
                            name="Muted"
                            variable="bg-muted"
                            cssVar="var(--muted)"
                            fgClass="text-muted-foreground"
                          />
                          <ColorSwatch
                            name="Accent"
                            variable="bg-accent"
                            cssVar="var(--accent)"
                            fgClass="text-accent-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Semantic
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch
                            name="Primary"
                            variable="bg-primary"
                            cssVar="var(--primary)"
                            fgClass="text-primary-foreground"
                          />
                          <ColorSwatch
                            name="Success"
                            variable="bg-success"
                            cssVar="var(--success)"
                            fgClass="text-success-foreground"
                          />
                          <ColorSwatch
                            name="Warning"
                            variable="bg-warning"
                            cssVar="var(--warning)"
                            fgClass="text-warning-foreground"
                          />
                          <ColorSwatch
                            name="Destructive"
                            variable="bg-destructive"
                            cssVar="var(--destructive)"
                            fgClass="text-destructive-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Charts
                        </h4>
                        <div className="grid grid-cols-5 gap-4">
                          <ColorSwatch
                            name="Chart 1"
                            variable="bg-chart-1"
                            cssVar="var(--chart-1)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 2"
                            variable="bg-chart-2"
                            cssVar="var(--chart-2)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 3"
                            variable="bg-chart-3"
                            cssVar="var(--chart-3)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 4"
                            variable="bg-chart-4"
                            cssVar="var(--chart-4)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 5"
                            variable="bg-chart-5"
                            cssVar="var(--chart-5)"
                            fgClass="text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Sidebar
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch
                            name="Sidebar"
                            variable="bg-sidebar"
                            cssVar="var(--sidebar)"
                            fgClass="text-sidebar-foreground"
                          />
                          <ColorSwatch
                            name="Sidebar Primary"
                            variable="bg-sidebar-primary"
                            cssVar="var(--sidebar-primary)"
                            fgClass="text-sidebar-primary-foreground"
                          />
                          <ColorSwatch
                            name="Sidebar Accent"
                            variable="bg-sidebar-accent"
                            cssVar="var(--sidebar-accent)"
                            fgClass="text-sidebar-accent-foreground"
                          />
                          <ColorSwatch
                            name="Sidebar Border"
                            variable="bg-sidebar-border"
                            cssVar="var(--sidebar-border)"
                            fgClass="text-sidebar-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dark Container */}
                  <div className={`rounded-xl border p-8 ${view.darkClass}`}>
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                      <Moon className="size-4" /> Dark Theme
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Surfaces
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch
                            name="Background"
                            variable="bg-background"
                            cssVar="var(--background)"
                            fgClass="text-foreground"
                          />
                          <ColorSwatch
                            name="Card"
                            variable="bg-card"
                            cssVar="var(--card)"
                            fgClass="text-card-foreground"
                          />
                          <ColorSwatch
                            name="Popover"
                            variable="bg-popover"
                            cssVar="var(--popover)"
                            fgClass="text-popover-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Neutrals
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch
                            name="Secondary"
                            variable="bg-secondary"
                            cssVar="var(--secondary)"
                            fgClass="text-secondary-foreground"
                          />
                          <ColorSwatch
                            name="Muted"
                            variable="bg-muted"
                            cssVar="var(--muted)"
                            fgClass="text-muted-foreground"
                          />
                          <ColorSwatch
                            name="Accent"
                            variable="bg-accent"
                            cssVar="var(--accent)"
                            fgClass="text-accent-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Semantic
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch
                            name="Primary"
                            variable="bg-primary"
                            cssVar="var(--primary)"
                            fgClass="text-primary-foreground"
                          />
                          <ColorSwatch
                            name="Success"
                            variable="bg-success"
                            cssVar="var(--success)"
                            fgClass="text-success-foreground"
                          />
                          <ColorSwatch
                            name="Warning"
                            variable="bg-warning"
                            cssVar="var(--warning)"
                            fgClass="text-warning-foreground"
                          />
                          <ColorSwatch
                            name="Destructive"
                            variable="bg-destructive"
                            cssVar="var(--destructive)"
                            fgClass="text-destructive-foreground"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Charts
                        </h4>
                        <div className="grid grid-cols-5 gap-4">
                          <ColorSwatch
                            name="Chart 1"
                            variable="bg-chart-1"
                            cssVar="var(--chart-1)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 2"
                            variable="bg-chart-2"
                            cssVar="var(--chart-2)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 3"
                            variable="bg-chart-3"
                            cssVar="var(--chart-3)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 4"
                            variable="bg-chart-4"
                            cssVar="var(--chart-4)"
                            fgClass="text-white"
                          />
                          <ColorSwatch
                            name="Chart 5"
                            variable="bg-chart-5"
                            cssVar="var(--chart-5)"
                            fgClass="text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                          Sidebar
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch
                            name="Sidebar"
                            variable="bg-sidebar"
                            cssVar="var(--sidebar)"
                            fgClass="text-sidebar-foreground"
                          />
                          <ColorSwatch
                            name="Sidebar Primary"
                            variable="bg-sidebar-primary"
                            cssVar="var(--sidebar-primary)"
                            fgClass="text-sidebar-primary-foreground"
                          />
                          <ColorSwatch
                            name="Sidebar Accent"
                            variable="bg-sidebar-accent"
                            cssVar="var(--sidebar-accent)"
                            fgClass="text-sidebar-accent-foreground"
                          />
                          <ColorSwatch
                            name="Sidebar Border"
                            variable="bg-sidebar-border"
                            cssVar="var(--sidebar-border)"
                            fgClass="text-sidebar-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section
          title="Typography"
          description="Font scales, weights, and mono spacing for data-dense UI."
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2 border-l-2 border-primary py-1 pl-4">
                <p className="text-sm text-muted-foreground">Heading XL</p>
                <h1 className="text-4xl font-bold tracking-tighter">
                  Design System
                </h1>
              </div>
              <div className="space-y-2 border-l-2 border-primary/60 py-1 pl-4">
                <p className="text-sm text-muted-foreground">Heading LG</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Typography Scale
                </h2>
              </div>
              <div className="space-y-2 border-l-2 border-primary/40 py-1 pl-4">
                <p className="text-sm text-muted-foreground">Heading MD</p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Section Title
                </h3>
              </div>
              <div className="space-y-2 border-l-2 border-primary/20 py-1 pl-4">
                <p className="text-sm text-muted-foreground">Heading SM</p>
                <h4 className="text-xl font-medium tracking-tight">
                  Card Title
                </h4>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="mb-1 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  Body Text (Inter)
                </p>
                <p className="text-base leading-7">
                  ForgeFlow is a developer-first platform. The typography is
                  tuned for density and legibility. This is the standard body
                  size used across paragraphs and longer descriptions.
                </p>
              </div>
              <div className="space-y-2">
                <p className="mb-1 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  Small Text
                </p>
                <p className="text-sm leading-6">
                  Used for secondary information, card descriptions, and form
                  labels. It remains highly legible due to the Inter font
                  family.
                </p>
              </div>
              <div className="space-y-2">
                <p className="mb-1 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  Muted Text
                </p>
                <p className="text-sm text-muted-foreground">
                  Applied to timestamps, breadcrumbs, and de-emphasized UI
                  elements.
                </p>
              </div>
              <div className="space-y-2">
                <p className="mb-1 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  Monospace (Geist Mono)
                </p>
                <div className="rounded-md bg-muted p-4">
                  <p className="font-mono text-sm">
                    <span className="text-primary">const</span>{" "}
                    <span className="text-blue-500">workflow</span> ={" "}
                    <span className="text-primary">await</span>{" "}
                    client.workflows.
                    <span className="text-purple-500">trigger</span>(
                    <span className="text-orange-500">'invoice-sync'</span>);
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── BORDER RADIUS ── */}
        <Section
          title="Border Radius"
          description="Dashboard-grade structural radiuses."
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {[
              { label: "xs (2px)", radius: "rounded-sm" },
              { label: "sm (4px)", radius: "rounded" },
              { label: "md (6px)", radius: "rounded-md" },
              { label: "lg (8px) - default", radius: "rounded-lg" },
              { label: "xl (12px)", radius: "rounded-xl" },
              { label: "2xl (16px)", radius: "rounded-2xl" },
              { label: "3xl (24px)", radius: "rounded-3xl" },
              { label: "full", radius: "rounded-full" },
            ].map((r) => (
              <div key={r.label} className="space-y-3">
                <div
                  className={`h-24 border bg-card shadow-sm ${r.radius} flex items-center justify-center`}
                >
                  <div className="size-2 rounded-full bg-primary/20" />
                </div>
                <p className="text-center font-mono text-xs text-muted-foreground">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SHADOWS ── */}
        <Section
          title="Shadows & Elevation"
          description="Subtle depth for structural separation (Linear/Vercel inspired)."
        >
          <div className="grid grid-cols-1 gap-8 pb-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                label: "shadow-2xs",
                desc: "Buttons, tiny elements",
                shadow: "shadow-2xs",
              },
              {
                label: "shadow-xs",
                desc: "Inputs, badges",
                shadow: "shadow-xs",
              },
              {
                label: "shadow-sm",
                desc: "Cards, standard surfaces",
                shadow: "shadow-sm",
              },
              {
                label: "shadow",
                desc: "Elevated cards, dropdowns",
                shadow: "shadow",
              },
              {
                label: "shadow-md",
                desc: "Popovers, small modals",
                shadow: "shadow-md",
              },
              {
                label: "shadow-lg",
                desc: "Modals, command palettes",
                shadow: "shadow-lg",
              },
              {
                label: "shadow-xl",
                desc: "Large dialogs",
                shadow: "shadow-xl",
              },
              {
                label: "shadow-2xl",
                desc: "Hero elements",
                shadow: "shadow-2xl",
              },
            ].map((s) => (
              <div key={s.label} className="space-y-4">
                <div
                  className={`h-32 border bg-card ${s.shadow} flex flex-col justify-end rounded-xl p-4 transition-all hover:-translate-y-1`}
                >
                  <p className="font-mono text-sm font-semibold">{s.label}</p>
                </div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <Section
          title="Button Gallery"
          description="Every button permutation for dashboards, forms, and tools."
        >
          <div className="space-y-10">
            {/* Standard Variants */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Core Variants</h3>
              <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-card p-6 shadow-sm">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Sizes & Shapes</h3>
              <div className="flex flex-wrap items-end gap-4 rounded-xl border bg-card p-6 shadow-sm">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large CTA</Button>
                <Button size="icon" variant="outline">
                  <Settings className="size-4" />
                </Button>
                <Button className="rounded-full">Pill Shape</Button>
                <Button className="rounded-none">Square</Button>
              </div>
            </div>

            {/* Icons & States */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Icons & States</h3>
              <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-card p-6 shadow-sm">
                <Button>
                  <Plus className="mr-2 size-4" /> Left Icon
                </Button>
                <Button variant="secondary">
                  Right Icon <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button disabled>Disabled Primary</Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
                <Button disabled>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Loading State
                </Button>
              </div>
            </div>

            {/* Custom Semantic & Platform Buttons */}
            <div>
              <h3 className="mb-4 text-lg font-medium">
                Platform & Semantic Actions
              </h3>
              <div className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed bg-background p-6">
                {/* Success */}
                <Button className="bg-success text-success-foreground hover:bg-success/90">
                  <CheckCircle2 className="mr-2 size-4" /> Approve Run
                </Button>

                {/* AI / Magic */}
                <Button className="border-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:from-purple-600 hover:to-indigo-600">
                  <Sparkles className="mr-2 size-4" /> Generate Workflow
                </Button>

                {/* Workflow Canvas Button */}
                <Button className="flex h-12 flex-col items-start justify-center gap-0 rounded-xl border bg-card px-4 text-foreground shadow-sm hover:bg-accent">
                  <span className="text-xs font-semibold">Start Node</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    trigger.webhook
                  </span>
                </Button>

                {/* Glass Button */}
                <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                  <div className="bg-grid-white/10 absolute inset-0" />
                  <Button className="relative z-10 border border-white/20 bg-background/20 text-white shadow-xl backdrop-blur-md hover:bg-background/30">
                    Glass Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── INPUTS & FORMS ── */}
        <Section
          title="Form Controls"
          description="Inputs, selects, toggles, and commands."
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Text Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Text & Select</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Standard Input</Label>
                  <Input placeholder="Enter workflow name..." />
                </div>
                <div className="space-y-2">
                  <Label>Search Input</Label>
                  <div className="relative">
                    <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password / Secret</Label>
                  <div className="relative">
                    <Key className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="sk-live-..."
                      className="pl-9 font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Select Dropdown</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Textarea</Label>
                  <Textarea
                    placeholder="Enter prompt instructions..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Toggles & Advanced */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Toggles & Checks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-retry failed runs</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically retry up to 3 times.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Checkbox id="debug" className="mt-1" />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="debug">Enable debug logging</Label>
                      <p className="text-xs text-muted-foreground">
                        Captures full payload data in execution logs.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <RadioGroup defaultValue="parallel">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sequential" id="r1" />
                      <Label htmlFor="r1">Sequential Execution</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="parallel" id="r2" />
                      <Label htmlFor="r2">Parallel Execution (Faster)</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>OTP / Secret Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* ── TOASTS ── */}
        <Section
          title="Toasts & Notifications"
          description="Sonner toast variants for user feedback."
        >
          <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-card p-6 shadow-sm">
            <Button
              variant="outline"
              onClick={() => toast("Event has been created.")}
            >
              Default
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created.", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                })
              }
            >
              Description
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success("Event has been created.")}
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Be at the area 10 minutes early.")}
            >
              Info
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.warning("Event start time cannot be earlier than 8am.")
              }
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Event has not been created.")}
            >
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              Action
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const promise = new Promise((resolve) =>
                  setTimeout(resolve, 2000)
                )
                toast.promise(promise, {
                  loading: "Loading...",
                  success: "Success!",
                  error: "Error",
                })
              }}
            >
              Promise
            </Button>
          </div>
        </Section>

        {/* ── BADGES & ALERTS ── */}
        <Section
          title="Badges & Alerts"
          description="Status indicators, tags, and page-level notifications."
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Badges */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Badges</h3>
              <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Standard
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Semantic & Status (Custom)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border border-success/20 bg-success/15 text-success shadow-none hover:bg-success/25">
                      <CheckCircle2 className="mr-1 size-3" /> Success
                    </Badge>
                    <Badge className="border border-destructive/20 bg-destructive/15 text-destructive shadow-none hover:bg-destructive/25">
                      <AlertCircle className="mr-1 size-3" /> Failed
                    </Badge>
                    <Badge className="border border-info/20 bg-info/15 text-info shadow-none hover:bg-info/25">
                      <Loader2 className="mr-1 size-3 animate-spin" /> Running
                    </Badge>
                    <Badge className="border border-warning/20 bg-warning/15 text-warning-foreground shadow-none hover:bg-warning/25">
                      <Clock className="mr-1 size-3" /> Paused
                    </Badge>
                    <Badge className="border bg-muted text-muted-foreground shadow-none hover:bg-muted">
                      <CircleDashed className="mr-1 size-3" /> Draft
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Marketing & Product
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm">
                      <Sparkles className="mr-1 size-3" /> AI Agent
                    </Badge>
                    <Badge className="border border-amber-500/20 bg-amber-500/15 text-amber-600 shadow-none dark:text-amber-400">
                      Premium
                    </Badge>
                    <Badge className="border border-blue-500/20 bg-blue-500/15 font-mono text-[10px] text-blue-600 uppercase shadow-none dark:text-blue-400">
                      Enterprise
                    </Badge>
                    <Badge className="border border-pink-500/20 bg-pink-500/15 text-pink-600 shadow-none dark:text-pink-400">
                      Beta
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Alerts</h3>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Update Available</AlertTitle>
                  <AlertDescription>
                    A new version of the Stripe integration is ready to be
                    installed.
                  </AlertDescription>
                </Alert>

                <Alert className="border-success/50 bg-success/5 text-success">
                  <CheckCircle2 className="h-4 w-4 stroke-success" />
                  <AlertTitle>Workflow Deployed</AlertTitle>
                  <AlertDescription>
                    Your workflow is now active and listening for incoming
                    webhooks.
                  </AlertDescription>
                </Alert>

                <Alert className="border-warning/50 bg-warning/5 text-warning-foreground">
                  <AlertTriangle className="h-4 w-4 stroke-warning-foreground" />
                  <AlertTitle>Rate Limit Warning</AlertTitle>
                  <AlertDescription>
                    You have consumed 90% of your OpenAI API quota for this
                    billing cycle.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Execution Failed</AlertTitle>
                  <AlertDescription>
                    Node "Fetch Data" timed out after 30 seconds. Check your
                    endpoint.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </Section>

        {/* ── CARDS & GRADIENTS ── */}
        <Section
          title="Cards & Gradients"
          description="Complex surface layouts and background treatments."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Analytics Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Executions
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,450</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-success">+15.2%</span> from
                  last month
                </p>
                <div className="mt-4 flex h-12 w-full items-end gap-1 rounded bg-muted/50 p-1">
                  {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-sm bg-primary/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integration Card */}
            <Card className="group cursor-pointer transition-colors hover:border-primary/50">
              <CardHeader className="pb-4">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-zinc-900">
                  {/* Fake logo */}
                  <div className="text-xl leading-none font-bold text-white">
                    S
                  </div>
                </div>
                <CardTitle>Stripe Checkout</CardTitle>
                <CardDescription>
                  Create payment links and handle subscriptions.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <Badge variant="secondary" className="font-mono text-[10px]">
                  v2.4.1
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="group-hover:bg-primary/10 group-hover:text-primary"
                >
                  <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* AI Gradient Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <CardHeader className="relative z-10">
                <Sparkles className="mb-2 h-8 w-8 text-white" />
                <CardTitle className="text-xl text-white">
                  AI Agent Node
                </CardTitle>
                <CardDescription className="text-white/80">
                  Drop this node to let an autonomous agent make decisions based
                  on your workflow state.
                </CardDescription>
              </CardHeader>
              <CardFooter className="relative z-10 pt-8">
                <Button className="w-full bg-white text-purple-700 hover:bg-white/90">
                  Add to Canvas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ── WORKFLOW THEME PREVIEW ── */}
        <Section
          title="Workflow Canvas Preview"
          description="Visual simulation of node states, edges, and canvas chrome."
        >
          <div className="relative flex h-[500px] w-full overflow-hidden rounded-2xl border bg-background shadow-inner">
            {/* Fake Sidebar */}
            <div className="hidden h-full w-64 flex-col space-y-6 border-r bg-sidebar p-4 md:flex">
              <div className="flex items-center gap-2 px-2">
                <Workflow className="size-5 text-primary" />
                <span className="font-semibold">My Automation</span>
              </div>
              <div className="space-y-1">
                <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase">
                  Nodes
                </p>
                <div className="flex cursor-pointer items-center gap-2 rounded-md bg-sidebar-accent p-2 text-sm font-medium text-sidebar-accent-foreground">
                  <Play className="size-4" /> Webhook Trigger
                </div>
                <div className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
                  <Database className="size-4" /> Extract Data
                </div>
                <div className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
                  <Bot className="size-4" /> AI Agent
                </div>
              </div>
            </div>

            {/* Fake Canvas area */}
            <div className="relative flex-1 bg-muted/30">
              {/* Dot Grid Background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(var(--border) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Fake Toolbar */}
              <div className="absolute top-4 left-4 z-10 flex rounded-lg border bg-card p-1 shadow-sm">
                <Button variant="ghost" size="icon" className="size-8">
                  <Plus className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8">
                  <Search className="size-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-8" />
                <Button variant="ghost" size="icon" className="size-8">
                  <Play className="size-4 text-success" />
                </Button>
              </div>

              {/* Node 1: Trigger */}
              <div className="absolute top-24 left-24 w-64 cursor-move overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="h-2 w-full bg-chart-1" />
                <div className="flex items-start gap-3 p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-chart-1/20 text-chart-1">
                    <Globe className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Webhook</h4>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      POST /api/hook
                    </p>
                  </div>
                </div>
                {/* Fake Output port */}
                <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-border bg-muted" />
              </div>

              {/* Fake Edge */}
              <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
                <path
                  d="M 350 145 C 400 145, 400 245, 450 245"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <path
                  d="M 706 245 C 750 245, 750 145, 800 145"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  className="drop-shadow-[0_0_8px_var(--primary)]"
                />
              </svg>

              {/* Node 2: Selected / AI */}
              <div className="absolute top-48 left-[450px] z-10 w-64 cursor-move overflow-hidden rounded-xl border-2 border-primary bg-card shadow-md ring-4 ring-primary/20">
                <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                <div className="flex items-start gap-3 p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-500">
                    <Bot className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Summarize</h4>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      gpt-4-turbo
                    </p>
                  </div>
                </div>
                {/* Ports */}
                <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-primary bg-background" />
                <div className="absolute top-1/2 right-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-primary bg-primary" />
              </div>

              {/* Node 3: Failed */}
              <div className="absolute top-24 left-[800px] w-64 cursor-move overflow-hidden rounded-xl border-2 border-destructive bg-card shadow-sm">
                <div className="h-2 w-full bg-destructive" />
                <div className="flex items-start gap-3 p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Send Email</h4>
                    <p className="mt-1 text-xs font-medium text-destructive">
                      API Error: 401
                    </p>
                  </div>
                </div>
                <div className="absolute top-1/2 left-[-6px] size-3 -translate-y-1/2 rounded-full border-2 border-destructive bg-background" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
