"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TestPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-8 space-y-12 pb-24">

        {/* ── HEADER ── */}
        <div className="space-y-2 border-b pb-6">
          <h1 className="text-4xl font-bold tracking-tighter">Design System</h1>
          <p className="text-muted-foreground text-lg tracking-tight">
            ForgeFlow component showcase — validate tokens, contrast, and hierarchy.
          </p>
        </div>

        {/* ── COLOR SWATCHES ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Color Tokens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Background", bg: "bg-background", fg: "text-foreground", border: true },
              { name: "Card", bg: "bg-card", fg: "text-card-foreground", border: true },
              { name: "Popover", bg: "bg-popover", fg: "text-popover-foreground", border: true },
              { name: "Primary", bg: "bg-primary", fg: "text-primary-foreground" },
              { name: "Secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
              { name: "Muted", bg: "bg-muted", fg: "text-muted-foreground" },
              { name: "Accent", bg: "bg-accent", fg: "text-accent-foreground" },
              { name: "Destructive", bg: "bg-destructive", fg: "text-destructive-foreground" },
              { name: "Success", bg: "bg-success", fg: "text-success-foreground" },
              { name: "Warning", bg: "bg-warning", fg: "text-warning-foreground" },
              { name: "Info", bg: "bg-info", fg: "text-info-foreground" },
              { name: "Sidebar", bg: "bg-sidebar", fg: "text-sidebar-foreground", border: true },
            ].map((swatch) => (
              <div
                key={swatch.name}
                className={`${swatch.bg} ${swatch.fg} ${swatch.border ? "border" : ""} rounded-lg p-4 text-sm font-medium flex items-end min-h-[5rem]`}
              >
                {swatch.name}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── CHART COLORS ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Chart Palette</h2>
          <div className="flex gap-2 h-24">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`bg-chart-${i} flex-1 rounded-lg flex items-end p-3`}
              >
                <span className="text-xs font-mono font-bold text-white mix-blend-difference">
                  chart-{i}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* ── BUTTONS ── */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>All variants with proper contrast.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </CardContent>
          </Card>

          {/* ── BADGES ── */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators and labels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">Semantic badges (custom):</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                  Completed
                </span>
                <span className="inline-flex items-center rounded-md bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning">
                  Pending
                </span>
                <span className="inline-flex items-center rounded-md bg-info/15 px-2.5 py-0.5 text-xs font-medium text-info">
                  Running
                </span>
                <span className="inline-flex items-center rounded-md bg-destructive/15 px-2.5 py-0.5 text-xs font-medium text-destructive">
                  Failed
                </span>
              </div>
            </CardContent>
          </Card>

          {/* ── TOASTS ── */}
          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
              <CardDescription>Sonner toast variants.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => toast("Default message")}>Default</Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Operation successful")}>Success</Button>
                <Button variant="outline" size="sm" onClick={() => toast.error("Something went wrong")}>Error</Button>
                <Button variant="outline" size="sm" onClick={() => toast.warning("Action required")}>Warning</Button>
                <Button variant="outline" size="sm" onClick={() => toast.info("Update available")}>Info</Button>
                <Button variant="outline" size="sm" onClick={() => toast.loading("Processing...")}>Loading</Button>
              </div>
            </CardContent>
          </Card>

          {/* ── FORMS ── */}
          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Inputs, toggles, and selections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="workflow-name">Workflow Name</Label>
                <Input id="workflow-name" placeholder="my-automation-flow" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="sk-..." className="font-mono" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-run">Auto-run on trigger</Label>
                <Switch id="auto-run" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">Accept terms and conditions</Label>
              </div>

              <RadioGroup defaultValue="manual">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual">Manual trigger</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cron" id="cron" />
                  <Label htmlFor="cron">Scheduled (cron)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="webhook" id="webhook" />
                  <Label htmlFor="webhook">Webhook</Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label>Concurrency Limit</Label>
                <Slider defaultValue={[5]} max={20} step={1} />
              </div>
            </CardContent>
          </Card>

          {/* ── DATA DISPLAY ── */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs & Accordion</CardTitle>
              <CardDescription>Content organization patterns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Execution Progress</Label>
                <Progress value={72} />
                <p className="text-xs text-muted-foreground font-mono">72% — 18/25 nodes complete</p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
                  Workflow executed 3 nodes in 2.4s.
                </TabsContent>
                <TabsContent value="logs" className="p-3 border rounded-md mt-2 font-mono text-xs text-muted-foreground">
                  <p>[00:00.000] Start → triggered</p>
                  <p>[00:00.372] Open URL → 200 OK</p>
                  <p>[00:10.500] Agent → completed</p>
                </TabsContent>
                <TabsContent value="output" className="p-3 border rounded-md mt-2 font-mono text-xs text-muted-foreground">
                  {`{ "url": "https://example.com", "status": "ok" }`}
                </TabsContent>
              </Tabs>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Node Configuration</AccordionTrigger>
                  <AccordionContent>
                    Configure input mappings, output transformations, and retry policies for this node.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Error Handling</AccordionTrigger>
                  <AccordionContent>
                    Set up fallback paths, retry counts, and dead-letter queues for failed executions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* ── TABLE ── */}
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>Recent workflow runs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">run_01HX...</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                        Success
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">2.4s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">run_01HW...</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-destructive/15 px-2 py-0.5 text-xs font-medium text-destructive">
                        Failed
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">0.8s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">run_01HV...</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">
                        Timeout
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">30.0s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">run_01HU...</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                        Success
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">1.1s</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* ── TYPOGRAPHY ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Heading Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter">Heading 1</h1>
                <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
                <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
                <h4 className="text-xl font-semibold">Heading 4</h4>
                <h5 className="text-lg font-medium">Heading 5</h5>
                <p className="text-base">Body text — the quick brown fox jumps over the lazy dog.</p>
                <p className="text-sm text-muted-foreground">Small / muted text for secondary information.</p>
                <p className="text-xs text-muted-foreground">Caption text for labels and metadata.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monospace & Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-mono text-sm">font-mono: Geist Mono / JetBrains Mono</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                  <p className="text-muted-foreground">// Node output</p>
                  <p>{`const result = await workflow.run();`}</p>
                  <p>{`console.log(result.status); // "success"`}</p>
                </div>
                <div className="flex gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">workflow.id</code>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">node.execute()</code>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">run_01HX</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* ── SURFACE HIERARCHY ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Surface Hierarchy</h2>
          <div className="bg-background border rounded-xl p-6 space-y-4">
            <p className="text-sm font-medium">Background layer</p>
            <div className="bg-card border rounded-lg p-5 space-y-3">
              <p className="text-sm font-medium">Card layer</p>
              <div className="bg-muted rounded-md p-4 space-y-2">
                <p className="text-sm font-medium">Muted layer</p>
                <div className="bg-accent rounded-md p-3">
                  <p className="text-sm font-medium">Accent layer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── BORDER & RING ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Borders & Focus</h2>
          <div className="flex flex-wrap gap-4">
            <div className="border rounded-lg p-6 text-sm">Standard border</div>
            <div className="border-2 rounded-lg p-6 text-sm">Heavy border</div>
            <div className="ring-2 ring-ring rounded-lg p-6 text-sm">Ring (focus)</div>
            <Input placeholder="Focus me for ring..." className="max-w-[220px]" />
          </div>
        </section>

      </div>
    </div>
  )
}
