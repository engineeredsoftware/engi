# Bitcode V26 Product Guide

This document is the source-of-truth description of the shipping Bitcode V26 experience. Every section maps directly to code in this repository; keep it synchronized whenever source changes.

## Experience Gates

- Guided execution routes tasks through Design → Develop → Digest using `createGuidedPipelineExecution` (`packages/pipelines/deliverable/src/index.ts:115`).
- Phase handlers live alongside the pipeline: `phases/design.ts`, `phases/index.ts` (Develop SDIVS loop), and `phases/digest.ts`.
- The current gate is stored in the execution store (`execution.store('guide', ...)`) and exposed to clients through the SSE stream (`uapi/streaming/stream-parser.ts:35` and `uapi/app/executions/components/ExecutionsPageHeader.tsx`).

### Gate Responsibilities
- **Design**: contextual analysis, attachment digestion, deliverable classification (`packages/pipelines/deliverable/src/phases/design.ts`).
- **Develop**: SDIVS pipeline with PTRR agents, iteration cap 3 (`packages/pipelines/deliverable/src/index.ts:86-106`).
- **Digest**: captures work updates, prepares `.ai` diff proposals, and ensures learnings are persisted (`packages/pipelines/deliverable/src/phases/digest.ts`).

## Deliverables Pipeline (Develop Gate)

The Develop gate is the only gate that mutates customer repositories. It is composed of SDIVS phases that delegate to execution-generics patterns (`packages/pipelines/deliverable/src/phases/index.ts`).

### Setup
- Uses the phase runner declared in `deliverablesPipelineSetupPhaseExecutor` to clone the repository, normalize workspace metadata, and enforce the danger wall before continuing (`setup.ts`).
- Short-circuit signals issued here propagate to credit refunds (`packages/execution-generics/src/signals/ShortCircuitSignal.ts`).

### Discovery
- Sequential executor running five research agents (`packages/pipelines/deliverable/src/phases/index.ts:37-47`):
  - `gather-context`, `understand-requirements`, `research-approach`, `plan-implementation`, `assess-complexity`.
- Outputs validation criteria consumed later by implementation/validation agents.

### Implementation
- Determines deliverable type via execution store and selects the correct agent sequence (`packages/pipelines/deliverable/src/phases/index.ts:60-101`).
- **Code Change**: Divide → parallel Conquer per file → Correct (`implementation:deliverable-pipeline-*` agents).
- **Code Change Review / Design Document / Design Review**: single PTRR agent per type.
- File level work emits structured results consumed by validators and shipping agents.

### Validation
- Parallel validators write issues into `validation/*` stores before the `ready-to-instruct` + `waitIfNeeded` + `ready-to-ship` chain (`packages/pipelines/deliverable/src/phases/index.ts:122-167`).
- Self-instruction confidence is stored for Digest and UI timers.

### Shipping
- Always two steps: ship deliverable (VCS interaction) then produce final work summary (`packages/pipelines/deliverable/src/phases/index.ts:172-183`).
- Uses VCS gated tools so only Develop gate can write to repositories.

### Postprocess & Iterations
- `factoryIterationPreprocess` loads on-the-fly instructions and attachments per iteration (`packages/pipelines/deliverable/src/index.ts:28-63`).
- `factoryPostprocess` captures normalized output + artifacts for UI (`packages/pipelines/deliverable/src/index.ts:66-83`).

## Streaming & Work Surfaces

- `enablePipelineStreaming` writes execution state into `execution_events`; SSE polling endpoint streams them to the client (`uapi/app/api/executions/stream/route.ts`).
- `parseStreamChunk` normalizes events (phase, agent, generation, tool-use, work-update) for UI consumption (`uapi/streaming/stream-parser.ts`).
- `WorkUpdatePanel` renders agent and iteration updates between the log and instructions (`uapi/components/base/bitcode/execution/WorkUpdatePanel.tsx`).
- Completion payloads surface PR/issue metadata, file diffs, duration, and metrics in `ExecutionsCompleteHeaderContent` (`uapi/app/executions/components/ExecutionsCompleteHeaderContent.tsx`).

## User Flow & UI Surfaces

- Activity compatibility page lives under `/executions`; SSR wrapper keeps `runId` compatibility while teaching merged-world activity (`uapi/app/executions/page.tsx`).
- Transactions write-space lives under `/application`.
- Auxillaries live under `/auxillaries/*`, with `/orbitals/*` retained only as compatibility carriers.
- `ExecutionsPageClient` orchestrates repository selection, template persistence, model selection, attachment intake, and iteration timers (`uapi/app/executions/components/ExecutionsPageClient.tsx:55-200`).
- Onboarding gate checks for a VCS connection and positive credit balance before allowing execution (`ExecutionsPageClient.tsx:176-197`).
- SSE state hydrates UI components through `useExecutionState` and `PipelineExecutionLog`.

## API Surface

- `/api/executions` provides unified access; internally delegates to deliverables handlers to avoid regressions (`uapi/app/api/executions/route.ts`, `packages/api/src/routes/deliverables.ts`).
- `/api/executions/stream` streams execution events with ownership checks and cursor resume support (`uapi/app/api/executions/stream/route.ts:1-200`).
- `/api/executions/history` rehydrates past runs including guide metadata (`uapi/app/api/executions/history/route.ts`).
- Stripe webhooks and checkout session endpoints live under `/api/stripe/*` (`uapi/app/api/stripe` routes) and feed the credit ledger.

## Data & Persistence

- Primary tables: `executions`, `execution_events`, `phase_executions`, plus append-only ledgers (`user_credits`, `user_credit_usages`, `generations`) and auxillary user-state carriers. Schema lives in `supabase/migrations/**`.
- ORM exports typed accessors in `packages/orm/src/index.ts`, aligning with SSOT declared in `packages/orm/src/types/database.ts`.
- Pipeline iteration metadata (self-instruction, work updates) stored via execution stores; digest guide consumes them to produce `.ai` diffs.

## Credits & Billing

- Credit reservation + settlement handled by `withCreditReservation` around pipeline execution (`packages/api/src/routes/deliverables.ts:152-360`).
- Escrow tuning constants, ledger writes, and RPC fallback logic reside in `packages/credits/src/index.ts:13-200`.
- Refunds triggered by short-circuit signals and propagated through credit helpers; partial refunds annotated in execution metadata.

## Digest Responsibilities

- Digest agents collect learnings, propose `.ai` document updates, and ensure follow-up tasks are queued (`packages/pipelines/deliverable/src/phases/digest.ts`).
- Work-update iteration summaries expose self-instruction confidence and suggested follow-ups for future executions.
- GA-1 backlog: enforce `.ai` persistence + approval flow before Digest completes (tracked in `internal-docs/GA1.md`).

## Known GA-1 Follow-Ups

- Digest gate approval mechanics and guide history serialization (see `internal-docs/GA1.md`).
- Finalize structured persistence tables (`deliverables_pipeline_*`) once migrations land.
- Complete UI polish for WorkUpdatePanel expand/collapse and accessibility.

Keep this document authoritative: when a capability, endpoint, or flow changes in code, update the relevant section with precise paths.
