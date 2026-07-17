import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  Braces,
  CheckCircle2,
  CloudCog,
  Database,
  FileCode2,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  LockKeyhole,
  PlayCircle,
  RadioTower,
  ServerCog,
  ShieldCheck,
  TimerReset,
  Wrench,
  Workflow,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Engineering learnings",
  description:
    "Architecture decisions, maintenance invariants, and operational lessons from ForgeFlow.",
}

const lessons = [
  {
    title: "One registry is the node contract",
    area: "Workflow engine",
    detail:
      "The node registry defines kinds, fields, icons, and outputs, while the executor map satisfies every action-node type at compile time. Adding a node is a three-file change, not a canvas rewrite.",
    evidence: "features/workflows/nodes/",
    icon: Workflow,
  },
  {
    title: "The saved graph is what runs",
    area: "Persistence",
    detail:
      "Liveblocks holds the collaborative editing copy. The Run action validates and writes an organization-owned JSONB snapshot before Trigger.dev loads and executes it.",
    evidence: "features/workflows/actions.ts and data.ts",
    icon: Database,
  },
  {
    title: "Realtime state is not durable history",
    area: "State management",
    detail:
      "Trigger metadata powers live node status and output while a run is active. A future run-history view should use a durable record rather than assume a realtime subscription is a permanent audit log.",
    evidence: "workflow-runs-provider.tsx and run-workflow.ts",
    icon: Layers3,
  },
  {
    title: "Side effects need a run identity",
    area: "Reliability",
    detail:
      "Workflow tasks retry. The Send Email executor receives the Trigger run id and node id so Resend can reject a duplicate attempt without blocking a deliberately new workflow run.",
    evidence: "node-executors.ts and send-email.ts",
    icon: ShieldCheck,
  },
  {
    title: "The browser session belongs to the run",
    area: "Browser automation",
    detail:
      "Stagehand opens lazily on the first browser node and is reused for later browser nodes. A finally block closes it whether the run succeeds, fails, or is cancelled.",
    evidence: "features/workflows/tasks/run-workflow.ts",
    icon: PlayCircle,
  },
  {
    title: "Pro gates belong on the server too",
    area: "Authorization",
    detail:
      "The palette can guide users to upgrade, but direct Server Action calls remain possible. Agent execution and replay retrieval independently check the active organization plan on the server.",
    evidence: "actions.ts and app/api/replays/[sessionId]/route.ts",
    icon: LockKeyhole,
  },
]

const debugging = [
  {
    symptom: "A workflow appears to run but a node never updates",
    check:
      "Inspect the Trigger run metadata first. The runner publishes pending, running, done, and failed steps; a missing step usually means the graph was not saved or the node is disconnected.",
  },
  {
    symptom: "A replay keeps preparing",
    check:
      "Browserbase records asynchronously after a session closes. The replay route translates the temporary not-ready state to HTTP 202, and the player polls it instead of treating it as a hard failure.",
  },
  {
    symptom: "A value token resolves to an empty string",
    check:
      "Verify the upstream node ran first and that the token path matches one of the outputs in the registry. Missing paths deliberately interpolate to an empty string so a template never crashes the runner.",
  },
  {
    symptom: "An email node looks successful without a message id",
    check:
      "Resend returns errors in its response object rather than throwing. Treat an error or missing data object as a failed step, then verify the Resend API key and sender domain.",
  },
]

const invariants = [
  "Every workflow read, update, and delete includes the active organization id.",
  "Only connected nodes execute; a graph must contain one Start trigger and no cycle.",
  "A browser session is created lazily and always closed by the task runner.",
  "Replay access verifies the user, organization, Pro plan, workflow ownership, run tag, and session id.",
  "Action-node executor coverage stays compile-time checked against the registry.",
  "Liveblocks room permissions and identity group ids use the same Clerk organization id.",
]

const boundaries = [
  {
    system: "React Flow + Liveblocks",
    owns: "Canvas edits, node positions, edges, cursors, and presence",
    mustNotOwn: "The graph that a task executes or durable run history",
    code: "components/canvas.tsx, components/room.tsx",
    icon: Workflow,
  },
  {
    system: "Next.js server",
    owns: "Authentication, entitlement checks, mutations, cache revalidation, and integration routes",
    mustNotOwn: "Long-running browser work or secret-bearing client state",
    code: "features/workflows/actions.ts, app/api/",
    icon: ServerCog,
  },
  {
    system: "Postgres + Drizzle",
    owns: "Organization-owned workflow identity and the executable JSONB graph snapshot",
    mustNotOwn: "Realtime cursor state or transient step progress",
    code: "lib/db/schema.ts, features/workflows/data.ts",
    icon: Database,
  },
  {
    system: "Trigger.dev",
    owns: "Durable queued execution, retries, logs, cancellation, and realtime run metadata",
    mustNotOwn:
      "Clerk session authorization or a permanent ForgeFlow audit record",
    code: "features/workflows/tasks/run-workflow.ts",
    icon: RadioTower,
  },
  {
    system: "Browserbase + Stagehand",
    owns: "A run-scoped browser, automation calls, recording, and replay source",
    mustNotOwn: "Authorization decisions or browser-visible API secrets",
    code: "nodes/*.ts, lib/browserbase.ts, api/replays/",
    icon: CloudCog,
  },
  {
    system: "Resend",
    owns: "Actual email delivery and duplicate-request rejection",
    mustNotOwn: "Workflow scheduling or retry policy",
    code: "nodes/send-email.ts",
    icon: TimerReset,
  },
]

const changePlaybooks = [
  {
    title: "Add a workflow node",
    steps: [
      "Implement one executor under features/workflows/nodes/.",
      "Register it in node-executors.ts so action coverage remains type checked.",
      "Declare the node manifest, fields, outputs, and visual metadata in node-registry.ts.",
      "Keep inputs and outputs JSON-safe, then add validation and documentation for its side effects.",
    ],
    icon: Braces,
  },
  {
    title: "Add a paid or sensitive capability",
    steps: [
      "Use the client gate only to explain the experience.",
      "Enforce the plan and organization on the server entry point.",
      "Bind external identifiers to an owned workflow or run before using them.",
      "Check that errors do not disclose other organizations or secret values.",
    ],
    icon: KeyRound,
  },
  {
    title: "Change the workflow data model",
    steps: [
      "Update Drizzle schema types before consumers; never hand-write row shapes.",
      "Generate and review a migration, then validate old and new graph snapshots.",
      "Preserve orgId in every query and ensure the Trigger task can reload the new data.",
      "Run a real worker execution, not only a browser save flow.",
    ],
    icon: FileCode2,
  },
  {
    title: "Change task or replay behavior",
    steps: [
      "Read the current Trigger.dev or Browserbase documentation before changing SDK calls.",
      "Preserve run tags, concise metadata, idempotency, and finally cleanup.",
      "Treat asynchronous recording readiness as pending, not authorization failure.",
      "Exercise another organization's access path to verify the negative case.",
    ],
    icon: ShieldCheck,
  },
]

const deliberateLimits = [
  "Workflow edits become the executable database snapshot when Run saves a validated graph; there is no separate explicit Save command yet.",
  "Trigger metadata is live progress, not a durable ForgeFlow run-history data model.",
  "Email content is sent as text; do not silently change its semantics to HTML without a product decision and sanitization design.",
  "The application has no automated test suite yet. Typecheck, lint, production build, and a real organization-scoped run are the current release floor.",
  "Transitive dependency advisories remain upstream. Do not use npm audit fix --force without an approved compatibility plan and a full rebuild.",
]

export default function LearningsPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to ForgeFlow
          </Link>
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              <Wrench className="size-3.5" />
              Repository memory
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              ForgeFlow engineering learnings
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A practical map of the architecture, maintenance boundaries, and
              debugging lessons behind ForgeFlow. This is intentionally specific
              to the codebase rather than a general workflow-automation guide.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <section className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="Reference concepts"
            value={lessons.length + invariants.length}
          />
          <Stat label="System boundaries" value={boundaries.length} />
          <Stat label="Change playbooks" value={changePlaybooks.length} />
        </section>

        <section className="mt-16">
          <SectionHeading
            icon={<GitBranch className="size-5" />}
            title="Core mental model"
            description="ForgeFlow separates collaborative authoring from durable execution so each system can do one job well."
          />
          <div className="grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={<Workflow className="size-5" />}
              title="Authoring surface"
              body="React Flow and Liveblocks make the canvas collaborative. Node data remains plain JSON so it can move between the browser, room storage, and database without a translation layer."
            />
            <InfoCard
              icon={<Database className="size-5" />}
              title="Execution contract"
              body="The database stores the validated graph snapshot. Trigger.dev reads that snapshot with the owning organization id instead of trusting a browser payload after the run begins."
            />
            <InfoCard
              icon={<Bot className="size-5" />}
              title="One browser per run"
              body="Browser steps share one lazy Stagehand session. This preserves login state between nodes and produces one Browserbase recording for the run."
            />
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            icon={<Layers3 className="size-5" />}
            title="Where each responsibility lives"
            description="Most regressions are ownership mistakes. Before moving code or state, decide which system is authoritative and what it must never be trusted to do."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {boundaries.map((boundary) => {
              const Icon = boundary.icon
              return (
                <article
                  key={boundary.system}
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{boundary.system}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Owns:{" "}
                        </span>
                        {boundary.owns}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Must not own:{" "}
                        </span>
                        {boundary.mustNotOwn}
                      </p>
                      <code className="mt-4 block text-xs text-primary">
                        {boundary.code}
                      </code>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            icon={<Layers3 className="size-5" />}
            title="Architecture and workflow lessons"
            description="These decisions keep the visual canvas, runner, and external services coherent as node types evolve."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {lessons.map((lesson) => {
              const Icon = lesson.icon
              return (
                <article
                  key={lesson.title}
                  className="rounded-2xl border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                      {lesson.area}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{lesson.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {lesson.detail}
                  </p>
                  <code className="mt-5 block rounded-lg border border-primary/10 bg-primary/5 px-3 py-2 text-xs text-primary">
                    {lesson.evidence}
                  </code>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            icon={<Braces className="size-5" />}
            title="Change playbooks"
            description="Use these checklists when changing the system. They encode the hidden cross-file contracts that are easy to miss in an otherwise small feature."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {changePlaybooks.map((playbook) => {
              const Icon = playbook.icon
              return (
                <article
                  key={playbook.title}
                  className="rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">
                    {playbook.title}
                  </h3>
                  <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    {playbook.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="font-semibold text-primary">
                          {index + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              icon={<AlertTriangle className="size-5" />}
              title="Debugging notes"
              description="Start from the durable system that owns the behavior, then work outward to the user interface."
            />
            <div className="overflow-hidden rounded-2xl border bg-card">
              {debugging.map((item, index) => (
                <article
                  key={item.symptom}
                  className={`p-5 ${
                    index === debugging.length - 1 ? "" : "border-b"
                  }`}
                >
                  <h3 className="font-semibold">{item.symptom}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.check}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              icon={<Gauge className="size-5" />}
              title="Performance and deployment"
              description="The useful optimization is usually a clear ownership boundary, not a clever cache."
            />
            <div className="space-y-4">
              <InfoCard
                icon={<Gauge className="size-5" />}
                title="Keep metadata small"
                body="Run metadata is realtime UI state with a finite size budget. Publish step summaries and serializable outputs, not browser objects or full page payloads."
              />
              <InfoCard
                icon={<LockKeyhole className="size-5" />}
                title="Deploy every secret to the right runtime"
                body="Browserbase, Liveblocks, Resend, Trigger.dev, and database credentials stay server-side. Only Clerk's publishable key is meant for the browser."
              />
              <InfoCard
                icon={<CheckCircle2 className="size-5" />}
                title="Validate before release"
                body="Run typecheck, lint, build, database migrations, and a real organization-scoped browser run. Replay verification is part of the security check, not only a UI test."
              />
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-2xl border bg-gradient-to-br from-card to-primary/5 p-7 sm:p-9">
          <SectionHeading
            icon={<ShieldCheck className="size-5" />}
            title="Invariants for future changes"
            description="These are small rules with large consequences. Keep them true when adding nodes, changing tasks, or evolving the collaboration model."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {invariants.map((invariant) => (
              <div
                key={invariant}
                className="flex items-start gap-3 rounded-xl border bg-background/70 p-4"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {invariant}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-sky-500/25 bg-sky-500/5 p-7 sm:p-9">
          <SectionHeading
            icon={<FileCode2 className="size-5" />}
            title="Deliberate limits and future decisions"
            description="These are current product boundaries, not accidental omissions. Preserve them or replace them with an explicit design and migration plan."
          />
          <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
            {deliberateLimits.map((limit) => (
              <li key={limit} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-sky-600 dark:text-sky-400" />
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-7 sm:p-9">
          <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="size-5" />
            <h2 className="text-xl font-semibold">Mistakes to avoid next</h2>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>
              Do not add a node in only the palette: registry and executor
              coverage are both required.
            </li>
            <li>
              Do not make a client-side billing gate the only protection for an
              expensive capability.
            </li>
            <li>
              Do not proxy a Browserbase replay by session id alone; bind it to
              the authenticated workflow run.
            </li>
            <li>
              Do not let a failed or cancelled task skip Browserbase cleanup.
            </li>
            <li>Do not treat Liveblocks presence as durable workflow state.</li>
          </ul>
        </section>

        <section className="mt-16 border-t pt-10 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
            The most useful next improvements are durable run history, explicit
            save semantics, automated authorization coverage, and richer
            graph-level validation.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Open ForgeFlow
          </Link>
        </section>
      </div>
    </main>
  )
}

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </article>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-card p-5 text-center shadow-sm">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-sm font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
