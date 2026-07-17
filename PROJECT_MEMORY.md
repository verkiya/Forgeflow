# ForgeFlow project memory

This file is the repository&apos;s continuity record. It is for an engineer or AI agent arriving without prior conversation context. Reconcile every entry against the code before acting; the repository is authoritative when this file and implementation disagree.

**Last reconciled:** 2026-07-17

## Mission and product boundary

ForgeFlow is a collaborative, organization-scoped visual workflow builder for browser automation. A user edits a graph on a React Flow canvas, collaborators see that editing state through Liveblocks, and clicking Run saves a server-readable graph snapshot before Trigger.dev executes it. Browser actions use Stagehand against Browserbase; the run console receives Trigger metadata; completed browser sessions can be replayed through an authenticated HLS proxy.

It is not a general job scheduler, an API-integration marketplace, a durable run-history product, or a generic AI chat product. The repository&apos;s single business table is `workflows`.

## Architectural source of truth

| Concern                                                   | Authoritative owner     | Important consequence                                                                                       |
| --------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Identity, active tenant, and organization plan            | Clerk                   | Every sensitive server operation must use the active `orgId`; client plan gates are only guidance.          |
| Collaborative canvas graph, positions, cursors, presence  | Liveblocks              | Realtime room data is editable working state, not the executable contract.                                  |
| Workflow identity, name, and runnable graph snapshot      | Postgres via Drizzle    | The runner reloads `{ workflowId, orgId }` from the database rather than trusting a queued browser payload. |
| Queueing, retries, logs, cancellation, live step metadata | Trigger.dev             | It has no Clerk session and its metadata is a view model, not permanent ForgeFlow history.                  |
| Browser session, automation, recording, replay source     | Browserbase + Stagehand | A session is lazy and run-scoped; cleanup belongs in the runner&apos;s `finally`.                           |
| Email delivery and request idempotency                    | Resend                  | The workflow controls retry identity; Resend performs delivery.                                             |
| Error telemetry                                           | Sentry                  | Sentry is observability, not product workflow state.                                                        |

## Routes and access model

`proxy.ts` Clerk-protects all routes except `/learnings`, `/test`, `/sign-in`, and `/sign-up` (including their nested routes). `/choose-org` is part of Clerk&apos;s authenticated organization-selection flow. Do not infer tenancy from middleware alone: API routes and Server Actions perform their own active-organization checks.

- `/` is the dashboard empty state and workflow creation entry point.
- `/workflows/[id]` loads an organization-owned workflow, provisions a Liveblocks room whose write group is that organization, creates a one-hour Trigger public token scoped to `workflow:{id}`, and mounts the canvas shell.
- `/pricing` renders Clerk&apos;s organization pricing table.
- `/learnings` is a public engineering notebook; `/test` is a public design-system sandbox, not a customer-facing workflow function.
- `/sentry-example-page` and `/api/sentry-example-api` intentionally generate Sentry events for verification and remain Clerk-protected.
- `POST /api/liveblocks/auth` creates a Liveblocks identity using the current user and organization group. `POST /api/liveblocks/users` accepts `userIds`, filters Clerk users to the active organization, preserves the requested order, and returns unavailable users as `null`.
- `GET /api/replays/[sessionId]` additionally requires `workflowId` and `runId`. It verifies user, organization, Pro plan, workflow ownership, Trigger tag, and exact session id before requesting Browserbase HLS data. A `202` is recording readiness, not an error; the playlist is `no-store`.

## Data model and server mutations

`lib/db/schema.ts` defines one `workflows` table: UUID `id`, Clerk `org_id`, `name`, nullable JSONB `graph`, and `created_at`/`updated_at`. The graph shape is `{ nodes: StepNodeType[]; edges: Edge[] }`, deliberately close to React Flow&apos;s serializable model. `lib/db/migrations/0000_curved_inertia.sql` creates this table and no secondary indexes.

`features/workflows/data.ts` is the data-access boundary. Every workflow lookup, update, rename, or delete predicates on both workflow id and organization id. `actions.ts` contains creation, run, delete, cancel, and rename Server Actions:

- Names are trimmed, non-empty, and capped at 120 characters.
- Run performs the server-side Pro check when any node claims type `agent`, validates and saves the graph, then triggers `run-workflow` with tag `workflow:{id}`.
- Cancel verifies both the owned workflow and the Trigger tag before cancelling a client-supplied run id.
- Delete removes the database row and then attempts to delete the Liveblocks room. The latter is intentionally best-effort; a failed room deletion is logged and can leave an orphaned room.

## Workflow execution contract

`validateGraph` only enforces exactly one trigger, at least one edge, and acyclicity. The runner topologically sorts all nodes, filters to nodes touching an edge, and marks trigger nodes done without dispatching an executor. It then interpolates each action&apos;s fields from prior outputs immediately before invocation.

Interpolation supports `{{ nodeId.path }}` and nested path segments. Missing or null values become `""`; objects are JSON-stringified. This is deliberately failure-tolerant but can turn a bad token into a later external-service failure.

The task is `features/workflows/tasks/run-workflow.ts`, configured globally in `trigger.config.ts` with Node runtime, a one-hour maximum duration, and two retry attempts using exponential backoff. It publishes pending/running/done/failed `RunStep` metadata, flushes after updates, and returns `{ steps, sessionId }`. The runner uses a single lazy Stagehand instance for browser nodes and closes it in `finally` even after cancellation or an exception.

### Current node contract

`node-registry.ts` is the canonical editor manifest. `node-executors.ts` is type-checked so each action node must have an executor.

| Node       | Executor behavior                                                                                   | Output                        |
| ---------- | --------------------------------------------------------------------------------------------------- | ----------------------------- |
| Start      | Trigger only; no executor                                                                           | None                          |
| Open URL   | Uses the first Stagehand page, waits for `load`, and has a 30-second navigation timeout             | URL and title                 |
| Act        | Calls Stagehand `act` with a natural-language instruction                                           | success, message, current URL |
| Extract    | Calls Stagehand `extract`                                                                           | extraction                    |
| Observe    | Calls Stagehand `observe` then reduces results to serializable selector/description pairs           | matches                       |
| Agent      | Runs Stagehand Agent with `google/gemini-2.5-flash` and `maxSteps: 20`                              | success, message, completed   |
| Send Email | Sends plain text from `onboarding@resend.dev` with `workflow-run/{runId}/node/{nodeId}` idempotency | Resend email id               |

The registry&apos;s `required` field flags only drive the inspector UI. They are **not** current runtime validation. Adding field validation needs a client-feedback layer and a server/task enforcement layer; do not assume a red asterisk protects an executor.

## Authorization, billing, and secrets

Clerk organizations are the tenancy unit. The Pro plan is checked in server code for Agent execution and replay retrieval. `billing.json` lists other product-plan features, but there is no code for priority execution or workflow-count enforcement; configuration alone does not implement a capability.

Never send `BROWSERBASE_API_KEY`, `LIVEBLOCKS_SECRET_KEY`, `RESEND_API_KEY`, `TRIGGER_SECRET_KEY`, `CLERK_SECRET_KEY`, database URLs, or `SENTRY_AUTH_TOKEN` to a client component, public environment variable, log, task metadata, node output, or email. `SENTRY_DSN` is telemetry configuration rather than an authentication secret, but it should still be deliberately scoped per environment.

Browserbase replay must remain server-proxied because the API key retrieves signed playlist data. A session id by itself is not authorization. The current player presents only the first recorded Browserbase page; multi-page replay selection does not exist.

## UI, state, and design notes

The application is a Next.js App Router project using Server Components by default and client components where browser state is needed. The workflow shell nests React Flow inside a Liveblocks room and a Trigger run provider, with resizable canvas/log/inspector panels.

- `Canvas` uses `useLiveblocksFlow`, a 16 px snap grid, maximum zoom 1.3, Liveblocks cursors, avatar stack, minimap, and controls.
- The right sidebar&apos;s registry-driven palette creates nodes with UUIDs, numbered titles, viewport-centered placement, and a client-side Agent upgrade gate. It also supports rename, delete, run, and cancel actions.
- `useUpstreamConnections` turns upstream manifest outputs into inspector tokens; it does not prove that a token has a non-empty runtime value.
- Trigger run metadata is rendered by `WorkflowRunsProvider`, which deterministically selects the newest run by `createdAt`.
- `SessionReplay` polls the protected replay route every two seconds while it returns `202`, then attaches `hls.js` or native HLS playback.

The design system is defined in `app/globals.css`: neutral application chrome with an emerald-teal primary accent, Inter and Geist Mono, shadcn primitives, and dark-mode token values. `ThemeProvider` currently forces dark mode; the light token set is present but not user-selectable. `design_system_proposal.md` is a proposal/history artifact, not the source of current visual behavior.

## Observability and developer operations

Sentry is initialized in client, server, and edge configuration. Client traces sample at 1.0, client Replay samples at 0.1 (1.0 on error), and server/edge traces sample at 1.0. `next.config.ts` uses the Sentry integration to upload broader client source maps, tunnel browser requests through `/monitoring`, remove debug logging, and enable Vercel Cron monitor support where applicable. Revisit sampling before high-volume production usage.

Environment configuration is expected in `.env.local` locally. Core variables are Clerk publishable/secret keys, `DATABASE_URL`, optional direct `DATABASE_URL_UNPOOLED` for migrations, Liveblocks secret, Browserbase key, Resend key, Trigger secret, and Sentry DSN/auth token as applicable. `drizzle.config.ts` intentionally prefers the unpooled connection for DDL; `lib/db/index.ts` uses Neon&apos;s HTTP client for application queries.

`npm run dev` starts Next.js and Trigger&apos;s development worker. It does not format. `npm run format`, `npm run typecheck`, `npm run lint`, and `npm run build` are distinct commands. `check-db.ts` prints every workflow record and is unsuitable for casual production use. `verify.js` drops `users` and is destructive despite its name; do not run it as verification.

## Known limits and technical debt

- No explicit Save action: Run saves the latest validated canvas snapshot.
- No durable ForgeFlow run-history table; rely on Trigger for current runs/logs only.
- No field-level node input validation on the server.
- No automated test suite.
- No explicit application-level rate limit.
- No secondary database index for organization list ordering.
- Replay selects only the first Browserbase page.
- Liveblocks deletion after workflow deletion is best-effort.
- Dependency audit output previously reported transitive advisories; `npm audit fix --force` was intentionally not used because it proposed incompatible downgrades. Reassess against current upstream releases rather than treating this note as a permanent count.

## Documentation stewardship protocol

Only `README.md`, `app/learnings/page.tsx`, and this file are documentation-steward targets unless the user explicitly expands scope. Before editing them:

1. Read this file and inspect the current implementation, package scripts, routes, schema, node registry, task, integrations, configuration, and working-tree status.
2. Prefer small corrections over broad rewrites. Preserve accurate high-quality sections.
3. State a plan or limitation as planned; never present it as implemented.
4. Keep README as the technical reference and `/learnings` as rationale, pitfalls, trade-offs, and maintenance playbooks rather than duplicate product copy.
5. Update this memory after every meaningful documentation pass with decisions, corrections, or newly discovered limitations.

### Historical context

The 2026-07-17 synchronization audit restored organization-scoped Liveblocks identity/user resolution, server-side Agent gating, replay ownership checks, serialized Observe outputs, Browserbase cleanup, stable latest-run selection, and Resend idempotency. It also introduced the documentation set. Treat those as intentional security/reliability boundaries and verify them before any architectural refactor.

At the start of the most recent documentation pass, `package.json` was the only modified tracked file: its user-owned change removes automatic formatting from `dev` and `build`. Documentation reflects that current behavior; do not overwrite the package change as part of a documentation task. Additional unrelated application and asset changes appeared in the working tree during the pass and were left untouched; inspect Git status before any future edit rather than assuming this note is current.

### 2026-07-17 documentation pass record

- Re-inventoried the tracked application routes, canvas and workflow components, actions, database/migration, Trigger task, node executors, integrations, observability files, billing configuration, scripts, and comments/TODO inventory before editing documentation.
- Corrected README statements about `dev` and `build`: formatting is now an explicit command, not an automatic side effect.
- Recorded the route exposure model, field-validation gap, first-page replay behavior, best-effort Liveblocks deletion, billing-versus-enforcement distinction, public design/Sentry probes, destructive `verify.js`, observability defaults, and current scale/testing gaps.
- Expanded `/learnings` with the corresponding rationale and debugging guidance. No application implementation, package configuration, or unrelated working-tree change was modified by this documentation pass.
