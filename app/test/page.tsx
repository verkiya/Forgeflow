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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Section = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string }) => (
  <section className="space-y-6 pb-12 pt-8 border-b">
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
    {children}
  </section>
)

const ColorSwatch = ({ name, variable, cssVar, fgClass = "" }: { name: string; variable: string; cssVar: string; fgClass?: string }) => (
  <div className="flex flex-col space-y-2">
    <div className={`h-24 w-full rounded-lg border shadow-sm ${variable} flex items-end p-3`}>
      <span className={`text-xs font-mono font-medium ${fgClass || "text-current"}`}>Aa</span>
    </div>
    <div className="space-y-1 text-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-xs font-mono text-muted-foreground">{cssVar}</p>
    </div>
  </div>
)

export default function DesignSystemPage() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="min-h-svh bg-background text-foreground pb-24">
      {/* ── HEADER ── */}
      <div className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md">
              <Workflow className="size-4" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">ForgeFlow Design System</h1>
              <p className="text-xs text-muted-foreground mt-1">Living UI Documentation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        
        {/* ── COLORS ── */}
        <Section title="Colors" description="Semantic and structural color palettes, synchronized with globals.css.">
          <Tabs defaultValue="side-by-side" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="side-by-side">Side-by-Side</TabsTrigger>
              <TabsTrigger value="light">Light Mode</TabsTrigger>
              <TabsTrigger value="dark">Dark Mode</TabsTrigger>
            </TabsList>

            {[
              { id: "side-by-side", lightClass: "bg-background text-foreground", darkClass: "dark bg-background text-foreground" },
              { id: "light", lightClass: "bg-background text-foreground col-span-2", darkClass: "hidden" },
              { id: "dark", lightClass: "hidden", darkClass: "dark bg-background text-foreground col-span-2" },
            ].map((view) => (
              <TabsContent key={view.id} value={view.id}>
                <div className="grid grid-cols-2 gap-8">
                  {/* Light Container */}
                  <div className={`p-8 rounded-xl border ${view.lightClass}`}>
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Sun className="size-4"/> Light Theme</h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Surfaces</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch name="Background" variable="bg-background" cssVar="var(--background)" fgClass="text-foreground" />
                          <ColorSwatch name="Card" variable="bg-card" cssVar="var(--card)" fgClass="text-card-foreground" />
                          <ColorSwatch name="Popover" variable="bg-popover" cssVar="var(--popover)" fgClass="text-popover-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Neutrals</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch name="Secondary" variable="bg-secondary" cssVar="var(--secondary)" fgClass="text-secondary-foreground" />
                          <ColorSwatch name="Muted" variable="bg-muted" cssVar="var(--muted)" fgClass="text-muted-foreground" />
                          <ColorSwatch name="Accent" variable="bg-accent" cssVar="var(--accent)" fgClass="text-accent-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Semantic</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch name="Primary" variable="bg-primary" cssVar="var(--primary)" fgClass="text-primary-foreground" />
                          <ColorSwatch name="Success" variable="bg-success" cssVar="var(--success)" fgClass="text-success-foreground" />
                          <ColorSwatch name="Warning" variable="bg-warning" cssVar="var(--warning)" fgClass="text-warning-foreground" />
                          <ColorSwatch name="Destructive" variable="bg-destructive" cssVar="var(--destructive)" fgClass="text-destructive-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Charts</h4>
                        <div className="grid grid-cols-5 gap-4">
                          <ColorSwatch name="Chart 1" variable="bg-chart-1" cssVar="var(--chart-1)" fgClass="text-white" />
                          <ColorSwatch name="Chart 2" variable="bg-chart-2" cssVar="var(--chart-2)" fgClass="text-white" />
                          <ColorSwatch name="Chart 3" variable="bg-chart-3" cssVar="var(--chart-3)" fgClass="text-white" />
                          <ColorSwatch name="Chart 4" variable="bg-chart-4" cssVar="var(--chart-4)" fgClass="text-white" />
                          <ColorSwatch name="Chart 5" variable="bg-chart-5" cssVar="var(--chart-5)" fgClass="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Sidebar</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch name="Sidebar" variable="bg-sidebar" cssVar="var(--sidebar)" fgClass="text-sidebar-foreground" />
                          <ColorSwatch name="Sidebar Primary" variable="bg-sidebar-primary" cssVar="var(--sidebar-primary)" fgClass="text-sidebar-primary-foreground" />
                          <ColorSwatch name="Sidebar Accent" variable="bg-sidebar-accent" cssVar="var(--sidebar-accent)" fgClass="text-sidebar-accent-foreground" />
                          <ColorSwatch name="Sidebar Border" variable="bg-sidebar-border" cssVar="var(--sidebar-border)" fgClass="text-sidebar-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dark Container */}
                  <div className={`p-8 rounded-xl border ${view.darkClass}`}>
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Moon className="size-4"/> Dark Theme</h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Surfaces</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch name="Background" variable="bg-background" cssVar="var(--background)" fgClass="text-foreground" />
                          <ColorSwatch name="Card" variable="bg-card" cssVar="var(--card)" fgClass="text-card-foreground" />
                          <ColorSwatch name="Popover" variable="bg-popover" cssVar="var(--popover)" fgClass="text-popover-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Neutrals</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <ColorSwatch name="Secondary" variable="bg-secondary" cssVar="var(--secondary)" fgClass="text-secondary-foreground" />
                          <ColorSwatch name="Muted" variable="bg-muted" cssVar="var(--muted)" fgClass="text-muted-foreground" />
                          <ColorSwatch name="Accent" variable="bg-accent" cssVar="var(--accent)" fgClass="text-accent-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Semantic</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch name="Primary" variable="bg-primary" cssVar="var(--primary)" fgClass="text-primary-foreground" />
                          <ColorSwatch name="Success" variable="bg-success" cssVar="var(--success)" fgClass="text-success-foreground" />
                          <ColorSwatch name="Warning" variable="bg-warning" cssVar="var(--warning)" fgClass="text-warning-foreground" />
                          <ColorSwatch name="Destructive" variable="bg-destructive" cssVar="var(--destructive)" fgClass="text-destructive-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Charts</h4>
                        <div className="grid grid-cols-5 gap-4">
                          <ColorSwatch name="Chart 1" variable="bg-chart-1" cssVar="var(--chart-1)" fgClass="text-white" />
                          <ColorSwatch name="Chart 2" variable="bg-chart-2" cssVar="var(--chart-2)" fgClass="text-white" />
                          <ColorSwatch name="Chart 3" variable="bg-chart-3" cssVar="var(--chart-3)" fgClass="text-white" />
                          <ColorSwatch name="Chart 4" variable="bg-chart-4" cssVar="var(--chart-4)" fgClass="text-white" />
                          <ColorSwatch name="Chart 5" variable="bg-chart-5" cssVar="var(--chart-5)" fgClass="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Sidebar</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <ColorSwatch name="Sidebar" variable="bg-sidebar" cssVar="var(--sidebar)" fgClass="text-sidebar-foreground" />
                          <ColorSwatch name="Sidebar Primary" variable="bg-sidebar-primary" cssVar="var(--sidebar-primary)" fgClass="text-sidebar-primary-foreground" />
                          <ColorSwatch name="Sidebar Accent" variable="bg-sidebar-accent" cssVar="var(--sidebar-accent)" fgClass="text-sidebar-accent-foreground" />
                          <ColorSwatch name="Sidebar Border" variable="bg-sidebar-border" cssVar="var(--sidebar-border)" fgClass="text-sidebar-foreground" />
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
        <Section title="Typography" description="Font scales, weights, and mono spacing for data-dense UI.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2 border-l-2 border-primary pl-4 py-1">
                <p className="text-sm text-muted-foreground">Heading XL</p>
                <h1 className="text-4xl font-bold tracking-tighter">Design System</h1>
              </div>
              <div className="space-y-2 border-l-2 border-primary/60 pl-4 py-1">
                <p className="text-sm text-muted-foreground">Heading LG</p>
                <h2 className="text-3xl font-semibold tracking-tight">Typography Scale</h2>
              </div>
              <div className="space-y-2 border-l-2 border-primary/40 pl-4 py-1">
                <p className="text-sm text-muted-foreground">Heading MD</p>
                <h3 className="text-2xl font-semibold tracking-tight">Section Title</h3>
              </div>
              <div className="space-y-2 border-l-2 border-primary/20 pl-4 py-1">
                <p className="text-sm text-muted-foreground">Heading SM</p>
                <h4 className="text-xl font-medium tracking-tight">Card Title</h4>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Body Text (Inter)</p>
                <p className="text-base leading-7">
                  ForgeFlow is a developer-first platform. The typography is tuned for density and legibility. 
                  This is the standard body size used across paragraphs and longer descriptions.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Small Text</p>
                <p className="text-sm leading-6">
                  Used for secondary information, card descriptions, and form labels. It remains highly legible due to the Inter font family.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Muted Text</p>
                <p className="text-sm text-muted-foreground">
                  Applied to timestamps, breadcrumbs, and de-emphasized UI elements.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Monospace (Geist Mono)</p>
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-mono text-sm">
                    <span className="text-primary">const</span> <span className="text-blue-500">workflow</span> = <span className="text-primary">await</span> client.workflows.<span className="text-purple-500">trigger</span>(<span className="text-orange-500">'invoice-sync'</span>);
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── BORDER RADIUS ── */}
        <Section title="Border Radius" description="Dashboard-grade structural radiuses.">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                <div className={`h-24 bg-card border shadow-sm ${r.radius} flex items-center justify-center`}>
                  <div className="size-2 bg-primary/20 rounded-full" />
                </div>
                <p className="text-xs font-mono text-center text-muted-foreground">{r.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SHADOWS ── */}
        <Section title="Shadows & Elevation" description="Subtle depth for structural separation (Linear/Vercel inspired).">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-4">
            {[
              { label: "shadow-2xs", desc: "Buttons, tiny elements", shadow: "shadow-2xs" },
              { label: "shadow-xs", desc: "Inputs, badges", shadow: "shadow-xs" },
              { label: "shadow-sm", desc: "Cards, standard surfaces", shadow: "shadow-sm" },
              { label: "shadow", desc: "Elevated cards, dropdowns", shadow: "shadow" },
              { label: "shadow-md", desc: "Popovers, small modals", shadow: "shadow-md" },
              { label: "shadow-lg", desc: "Modals, command palettes", shadow: "shadow-lg" },
              { label: "shadow-xl", desc: "Large dialogs", shadow: "shadow-xl" },
              { label: "shadow-2xl", desc: "Hero elements", shadow: "shadow-2xl" },
            ].map((s) => (
              <div key={s.label} className="space-y-4">
                <div className={`h-32 bg-card border ${s.shadow} rounded-xl flex flex-col justify-end p-4 transition-all hover:-translate-y-1`}>
                  <p className="font-mono text-sm font-semibold">{s.label}</p>
                </div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <Section title="Button Gallery" description="Every button permutation for dashboards, forms, and tools.">
          <div className="space-y-10">
            {/* Standard Variants */}
            <div>
              <h3 className="text-lg font-medium mb-4">Core Variants</h3>
              <div className="flex flex-wrap gap-4 items-center p-6 bg-card border rounded-xl shadow-sm">
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
              <h3 className="text-lg font-medium mb-4">Sizes & Shapes</h3>
              <div className="flex flex-wrap gap-4 items-end p-6 bg-card border rounded-xl shadow-sm">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large CTA</Button>
                <Button size="icon" variant="outline"><Settings className="size-4" /></Button>
                <Button className="rounded-full">Pill Shape</Button>
                <Button className="rounded-none">Square</Button>
              </div>
            </div>

            {/* Icons & States */}
            <div>
              <h3 className="text-lg font-medium mb-4">Icons & States</h3>
              <div className="flex flex-wrap gap-4 items-center p-6 bg-card border rounded-xl shadow-sm">
                <Button><Plus className="size-4 mr-2" /> Left Icon</Button>
                <Button variant="secondary">Right Icon <ArrowRight className="size-4 ml-2" /></Button>
                <Button disabled>Disabled Primary</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
                <Button disabled><Loader2 className="size-4 mr-2 animate-spin" /> Loading State</Button>
              </div>
            </div>

            {/* Custom Semantic & Platform Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-4">Platform & Semantic Actions</h3>
              <div className="flex flex-wrap gap-4 items-center p-6 bg-background border border-dashed rounded-xl">
                {/* Success */}
                <Button className="bg-success text-success-foreground hover:bg-success/90">
                  <CheckCircle2 className="size-4 mr-2" /> Approve Run
                </Button>
                
                {/* AI / Magic */}
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 border-0 shadow-md">
                  <Sparkles className="size-4 mr-2" /> Generate Workflow
                </Button>

                {/* Workflow Canvas Button */}
                <Button className="bg-card hover:bg-accent text-foreground border shadow-sm h-12 px-4 rounded-xl flex flex-col items-start justify-center gap-0">
                  <span className="text-xs font-semibold">Start Node</span>
                  <span className="text-[10px] text-muted-foreground font-mono">trigger.webhook</span>
                </Button>

                {/* Glass Button */}
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/10" />
                  <Button className="bg-background/20 backdrop-blur-md border border-white/20 text-white hover:bg-background/30 shadow-xl relative z-10">
                    Glass Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── INPUTS & FORMS ── */}
        <Section title="Form Controls" description="Inputs, selects, toggles, and commands.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password / Secret</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input type="password" placeholder="sk-live-..." className="pl-9 font-mono" />
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
                  <Textarea placeholder="Enter prompt instructions..." className="min-h-[100px]" />
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
                      <p className="text-xs text-muted-foreground">Automatically retry up to 3 times.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Checkbox id="debug" className="mt-1" />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="debug">Enable debug logging</Label>
                      <p className="text-xs text-muted-foreground">Captures full payload data in execution logs.</p>
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

        {/* ── BADGES & ALERTS ── */}
        <Section title="Badges & Alerts" description="Status indicators, tags, and page-level notifications.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Badges */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Badges</h3>
              <div className="p-6 border rounded-xl bg-card shadow-sm space-y-6">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Standard</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Semantic & Status (Custom)</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-success/15 text-success hover:bg-success/25 border-success/20 border shadow-none">
                      <CheckCircle2 className="size-3 mr-1" /> Success
                    </Badge>
                    <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20 border shadow-none">
                      <AlertCircle className="size-3 mr-1" /> Failed
                    </Badge>
                    <Badge className="bg-info/15 text-info hover:bg-info/25 border-info/20 border shadow-none">
                      <Loader2 className="size-3 mr-1 animate-spin" /> Running
                    </Badge>
                    <Badge className="bg-warning/15 text-warning-foreground hover:bg-warning/25 border-warning/20 border shadow-none">
                      <Clock className="size-3 mr-1" /> Paused
                    </Badge>
                    <Badge className="bg-muted text-muted-foreground hover:bg-muted border shadow-none">
                      <CircleDashed className="size-3 mr-1" /> Draft
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Marketing & Product</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-sm">
                      <Sparkles className="size-3 mr-1" /> AI Agent
                    </Badge>
                    <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 border shadow-none">
                      Premium
                    </Badge>
                    <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20 border shadow-none font-mono uppercase text-[10px]">
                      Enterprise
                    </Badge>
                    <Badge className="bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/20 border shadow-none">
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
                    A new version of the Stripe integration is ready to be installed.
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-success/50 text-success bg-success/5">
                  <CheckCircle2 className="h-4 w-4 stroke-success" />
                  <AlertTitle>Workflow Deployed</AlertTitle>
                  <AlertDescription>
                    Your workflow is now active and listening for incoming webhooks.
                  </AlertDescription>
                </Alert>

                <Alert className="border-warning/50 text-warning-foreground bg-warning/5">
                  <AlertTriangle className="h-4 w-4 stroke-warning-foreground" />
                  <AlertTitle>Rate Limit Warning</AlertTitle>
                  <AlertDescription>
                    You have consumed 90% of your OpenAI API quota for this billing cycle.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Execution Failed</AlertTitle>
                  <AlertDescription>
                    Node "Fetch Data" timed out after 30 seconds. Check your endpoint.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </Section>

        {/* ── CARDS & GRADIENTS ── */}
        <Section title="Cards & Gradients" description="Complex surface layouts and background treatments.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Analytics Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,450</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success font-medium">+15.2%</span> from last month
                </p>
                <div className="mt-4 h-12 w-full bg-muted/50 rounded flex items-end gap-1 p-1">
                  {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                    <div key={i} className="bg-primary/80 w-full rounded-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integration Card */}
            <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="size-10 rounded-lg bg-zinc-900 flex items-center justify-center mb-2">
                  {/* Fake logo */}
                  <div className="text-white font-bold text-xl leading-none">S</div>
                </div>
                <CardTitle>Stripe Checkout</CardTitle>
                <CardDescription>Create payment links and handle subscriptions.</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <Badge variant="secondary" className="font-mono text-[10px]">v2.4.1</Badge>
                <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 group-hover:text-primary">
                  <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* AI Gradient Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <CardHeader className="relative z-10">
                <Sparkles className="h-8 w-8 text-white mb-2" />
                <CardTitle className="text-white text-xl">AI Agent Node</CardTitle>
                <CardDescription className="text-white/80">
                  Drop this node to let an autonomous agent make decisions based on your workflow state.
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
        <Section title="Workflow Canvas Preview" description="Visual simulation of node states, edges, and canvas chrome.">
          <div className="h-[500px] w-full rounded-2xl border bg-background overflow-hidden flex relative shadow-inner">
            
            {/* Fake Sidebar */}
            <div className="w-64 border-r bg-sidebar h-full hidden md:flex flex-col p-4 space-y-6">
              <div className="flex items-center gap-2 px-2">
                <Workflow className="size-5 text-primary" />
                <span className="font-semibold">My Automation</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground px-2 mb-2 uppercase">Nodes</p>
                <div className="p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Play className="size-4" /> Webhook Trigger
                </div>
                <div className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 text-sm flex items-center gap-2 cursor-pointer">
                  <Database className="size-4" /> Extract Data
                </div>
                <div className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 text-sm flex items-center gap-2 cursor-pointer">
                  <Bot className="size-4" /> AI Agent
                </div>
              </div>
            </div>

            {/* Fake Canvas area */}
            <div className="flex-1 relative bg-muted/30">
              {/* Dot Grid Background */}
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              
              {/* Fake Toolbar */}
              <div className="absolute top-4 left-4 z-10 flex bg-card border rounded-lg shadow-sm p-1">
                <Button variant="ghost" size="icon" className="size-8"><Plus className="size-4"/></Button>
                <Button variant="ghost" size="icon" className="size-8"><Search className="size-4"/></Button>
                <Separator orientation="vertical" className="mx-1 h-8" />
                <Button variant="ghost" size="icon" className="size-8"><Play className="size-4 text-success"/></Button>
              </div>

              {/* Node 1: Trigger */}
              <div className="absolute top-24 left-24 w-64 bg-card border shadow-sm rounded-xl overflow-hidden cursor-move">
                <div className="h-2 w-full bg-chart-1" />
                <div className="p-4 flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-chart-1/20 text-chart-1 flex items-center justify-center shrink-0">
                    <Globe className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Webhook</h4>
                    <p className="text-xs text-muted-foreground font-mono mt-1">POST /api/hook</p>
                  </div>
                </div>
                {/* Fake Output port */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 bg-muted border-2 border-border rounded-full" />
              </div>

              {/* Fake Edge */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
                <path d="M 350 145 C 400 145, 400 245, 450 245" fill="none" stroke="var(--border)" strokeWidth="2" />
                <path d="M 706 245 C 750 245, 750 145, 800 145" fill="none" stroke="var(--primary)" strokeWidth="3" className="drop-shadow-[0_0_8px_var(--primary)]" />
              </svg>

              {/* Node 2: Selected / AI */}
              <div className="absolute top-48 left-[450px] w-64 bg-card border-2 border-primary shadow-md ring-4 ring-primary/20 rounded-xl overflow-hidden cursor-move z-10">
                <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                <div className="p-4 flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center shrink-0">
                    <Bot className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Summarize</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">gpt-4-turbo</p>
                  </div>
                </div>
                {/* Ports */}
                <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 bg-background border-2 border-primary rounded-full" />
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 bg-primary border-2 border-primary rounded-full" />
              </div>

              {/* Node 3: Failed */}
              <div className="absolute top-24 left-[800px] w-64 bg-card border-2 border-destructive shadow-sm rounded-xl overflow-hidden cursor-move">
                <div className="h-2 w-full bg-destructive" />
                <div className="p-4 flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-destructive/20 text-destructive flex items-center justify-center shrink-0">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Send Email</h4>
                    <p className="text-xs text-destructive font-medium mt-1">API Error: 401</p>
                  </div>
                </div>
                <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 bg-background border-2 border-destructive rounded-full" />
              </div>
              
            </div>
          </div>
        </Section>

      </div>
    </div>
  )
}
