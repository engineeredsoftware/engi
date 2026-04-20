# TESTING (Authoritative Overview)

This document explains the Bitcode test architecture across layers, how tests are organized, how to run them, and patterns for building reliable, deterministic tests (including “trivial agents”). All paths below refer to code in this repository.

## Layers
- Generics (units): core pipeline/execution utilities, events, metrics
  - events: `packages/pipelines-generics/src/execution/__tests__/events.unit.test.ts`
  - metrics: `packages/pipelines-generics/src/execution/__tests__/metrics.test.ts`
  - SDIVS integration: `packages/pipelines-generics/src/phases/__tests__/sdivs.events.integration.test.ts`
  - streaming integration: `packages/pipelines-generics/src/streaming/__tests__/pipeline-stream-integration.test.ts`

- Pipeline implementation (units): deliverable pipeline normalization + metrics
  - metrics on output: `packages/pipelines/deliverable/src/__tests__/metrics-output.test.ts`
  - postprocessing normalization: `packages/pipelines/deliverable/src/__tests__/postprocess.test.ts`

- ORM (units): database model query composition
  - run events: `packages/orm/src/__tests__/deliverable-run-events.test.ts`
  - runs model: `packages/orm/src/__tests__/deliverable-runs.test.ts`

- API (units/integration): routes for streaming/events/history
  - SSE stream: `uapi/tests/deliverablesStreamRoute.test.ts`
  - History (GET): `uapi/tests/deliverablesHistoryRoute.test.ts`

- UI (units): hooks and components mapping structured events to logs
  - hook: `uapi/tests/usePipelineExecution.test.tsx`
  - log mapping: `uapi/tests/RunDetailsView.mapping.test.tsx`

- E2E (Playwright): UI flows and visual snapshots
  - folder: `uapi/tests/e2e`
  - examples: `deliverables.visual.spec.ts`, API smoke tests

## Running Tests
- Monorepo default: `pnpm test` (runs each package’s Jest config)
- Package‑scoped:
  - Generics: `pnpm -C packages/pipelines-generics test`
  - Deliverable pipeline: `pnpm -C packages/pipelines/deliverable test`
  - ORM: `pnpm -C packages/orm test`
  - UAPI: `pnpm -C uapi test`
- E2E (Playwright): `pnpm -C uapi test:e2e:ui`

## Configuration Notes
- pipelines‑generics/jest.config.cjs
  - `moduleNameMapper` resolves monorepo packages to sources, including `@bitcode/orm`.
- uapi/jest.config.cjs
  - `testMatch` includes targeted deliverables tests.
  - `moduleNameMapper` resolves `@bitcode/*` to monorepo packages and `@/*` to uapi paths.

## Determinism via “Trivial Agents”
“Trivial agents” are minimal, deterministic agent functions used purely in tests to make event ordering, iteration counts, and metrics predictable. They are not production agents. Typical patterns:
- Return stable outputs without I/O; e.g., `() => ({ ok: true, tokens: 10 })`.
- Increment counters on `Execution` to simulate agentsExecuted.
- Optionally attach synthetic `llm.usage` objects on the execution to test token aggregation.
- Wire through the registry in a test‑local PipelineExecution instance (see `PipelineExecutor` tests) to validate phase → agent event sequencing.

Why: They enable precise assertions for event ordering and per‑phase metrics without relying on real LLM calls, file system, or network.

## Streaming & SSE Testing
- Persistence path:
  - `enablePipelineStreaming` subscribes to stream events and persists via ORM model `execution_events`.
  - Tests mock the ORM model to capture persisted rows.
- SSE route testing approach (`uapi/.../stream/route.ts`):
  - Mock Supabase admin client builders used by the route.
  - Simulate ownership check (allow/deny).
  - Return a finite set of events for polling, then set run status to `completed` to trigger `stream_end`.
  - Read from the Response’s readable stream and assert JSON lines `stream_start`, pipeline/phase events, and `stream_end`.

## Metrics Testing
- Use `computePipelineMetrics` over an `Execution` tree populated with timestamps and llm usage objects to validate:
  - `totalDuration`, `phaseDurations`, aggregated `tokensUsed`, global and per‑phase `agentsExecuted`.
  - Attach metrics in deliverables shipping wrapper and assert normalized shape (`duration`, `tokensUsed`, `agentsExecuted`, `phases`, `phasesDetail`).

## Guidelines & Conventions
- Use industrial language; avoid marketing terms and unverifiable counts.
- Evolve in place (no versioned filenames like `*-v2.ts`).
- Do not re‑export (`export *`); keep imports explicit.
- Keep primitives pure; do not leak pipeline/agent concepts downward.
- Prefer deterministic mocks over network/LLM in unit tests; reserve E2E for integration behaviors.

## Adding New Tests (Checklist)
- Identify the layer (generics, pipeline, ORM, API, UI, E2E).
- Prefer “trivial agents” to isolate event/metrics behaviors.
- Update `moduleNameMapper` if importing new monorepo packages in a package’s test.
- Keep test runtime short; avoid flakiness by not relying on timers unless testing SSE/polling.
- Ensure new behaviors (events/metrics/output) are documented here and in GA‑1 tracking if they affect production flows.
