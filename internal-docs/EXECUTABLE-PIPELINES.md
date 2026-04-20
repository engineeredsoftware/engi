# Executable Pipelines (Verified)

This document describes the production pipeline architecture as implemented in source. It avoids unverifiable counts and marketing language. All references below point to concrete code paths.

## SDIVS Pattern
- Setup → Discovery → Implementation → Validation → Shipping
- Implementation may iterate Discovery→Implementation→Validation up to configured limits.
- Pipelines can hook per-iteration logic (e.g., refreshed instructions + attachments overlays) via `iterationPreprocess` in the SDIVS executor pipeline.
- Preprocess stores `pipeline/input` (normalized input snapshot) at the start of a run; Prepare Concise Context can consult it via the root execution.

Code: `packages/pipelines/deliverable/src/index.ts` (lines 23–48)

## Deliverables Pipeline
- Entry: `packages/pipelines/deliverable/src/index.ts` (default export)
- SDIVS execution via `factorySDIVSExecutorPipeline` with `deliverablePhases`
- Iterations configured (sequential); during bring-up tests only Setup runs

### Phases (current source implementation)
- Setup: `packages/pipelines/deliverable/src/phases/setup.ts`
  - Declarative PhaseRunner using EE primitives under the hood.
  - Agents: clone → setup-plan → parallel(comprehend-task, optional initialize-lsp).

- Discovery: `packages/pipelines/deliverable/src/phases/index.ts`
  - EE sequential executor:
    - `discovery:gather-context` → `discovery:understand-requirements` → `discovery:research-approach` → `discovery:plan-implementation` → `discovery:assess-complexity`.

- Implementation: `packages/pipelines/deliverable/src/phases/index.ts`
  - EE executor; dynamic by deliverable type.
  - `code-change`: Divide → dynamic parallel Conquer → Correct.
  - Other types: single agent executor.

- Validation: `packages/pipelines/deliverable/src/phases/index.ts`
  - EE executor: three validations in parallel, then final check.
    - Parallel:
      - `validation:validate-last-iterations-validation-phase` → store(`validation/last`,'issues',string[])
      - `validation:validate-discovery-phase` → store(`validation/discovery`,'issues',string[])
      - Implementation validator by type (ALL write to `validation/implementation:issues`):
        - `validation:validate-implementation-phase-code-change`
        - `validation:validate-implementation-phase-code-change-review`
        - `validation:validate-implementation-phase-design-document`
        - `validation:validate-implementation-phase-design-document-review`
    - Then: `validation:deliverable-pipeline-ready-to-ship-agent`.

- Shipping: `packages/pipelines/deliverable/src/phases/index.ts`
  - EE sequential executor with exactly two agents:
    - `shipping:deliverable-pipeline-ship-agent` (PTRR)
    - `shipping:final-work-summary` (Quick)

### EE Phase Patterns (Source‑Backed)

All phases use execution‑generics (EE) primitives to declare order and parallelism. Agents are resolved from the registry via `createAgentExecutor`, and execution state is emitted automatically by AG/EE/PG.

Snippet – Sequential phase (Discovery):
```ts
import { Executor, sequential } from '@bitcode/execution-generics';
import { createAgentExecutor } from '@bitcode/pipelines-generics';

const discoveryExec: Executor<any, any> = sequential(
  createAgentExecutor('discovery:gather-context'),
  createAgentExecutor('discovery:understand-requirements'),
  createAgentExecutor('discovery:research-approach'),
  createAgentExecutor('discovery:plan-implementation'),
  createAgentExecutor('discovery:assess-complexity')
);
```

Snippet – Dynamic Implementation (code‑change):
```ts
// 1) Divide
const divide = createAgentExecutor('implementation:deliverable-pipeline-divide-code-change-agent');
const divOut = await divide(input, execution);
// 2) Conquer (parallel per file)
const execs = (divOut.filesToChange || []).map(() => createAgentExecutor('implementation:deliverable-pipeline-conquer-file-agent'));
const conquer = parallel(...execs);
const results = await conquer(divOut, execution);
// 3) Correct
const correct = createAgentExecutor('implementation:deliverable-pipeline-correct-code-change-agent');
return await correct({ allFileResults: results, originalDivision: divOut }, execution);
```

Snippet – Iteration preprocess (instructions + attachments overlay):
```ts
const iterationPreprocess = async (input, execution) => {
  // Re-apply gate preprocessing for each iteration
  const processedInput = gatePreprocess(input, execution);

  // Fetch user instructions from Supabase and expose them
  const { supabaseAdmin } = await import('@bitcode/supabase');
  const { data: instructions } = await supabaseAdmin
    .from('instructions')
    .select('*')
    .eq('execution_id', execution.id)
    .order('created_at', { ascending: true });

  if (instructions?.length) {
    execution.store('instructions', 'all', instructions);
    processedInput.userInstructions = instructions.map(i => {
      try { return JSON.parse(i.content); } catch { return { text: i.content }; }
    });
  }

  // Surface attachments as context enhancements
  const attachments = execution.get('attachments', 'list') || [];
  if (Array.isArray(attachments) && attachments.length > 0) {
    const enhancements = attachments.map((a: any) => ({
      title: a?.title || a?.name || 'Context',
      content: String(a?.content || a?.output || '')
    })).filter(e => e.content);

    execution.store('context', 'enhancements', enhancements);
  }

  return processedInput;
};

const pipeline = factorySDIVSExecutorPipeline('deliverable', {
  preprocess,
  setup,
  discovery,
  implementation,
  validation,
  shipping,
  iterationPreprocess,
});
```

Snippet – Shipping (standard 2‑step):
```ts
const shippingExec: Executor<any, any> = sequential(
  createAgentExecutor('shipping:deliverable-pipeline-ship-agent'),
  createAgentExecutor('shipping:final-work-summary')
);
```

### Tools & Prompts (SSOT)

- Generic `use-computer` tool: `packages/generic-tools/use-computer/src/index.ts`.
  - Deliverables wrapper delegates to it: `packages/pipelines/deliverable/src/tools/DeliverablePipelineUseComputerTool.ts`.
  - Used in Implementation:Correct (optional) and Shipping:Ship (for commit/push).
- VCS tools (create PR/issue/comment): `packages/generic-tools/vcs/src/index.ts`.
  - Used by Shipping:Ship agent per deliverable type.
- Prompt scaffolding: JSON‑only + schema hinting via PromptParts (`generation:json_only_header`, `generation:use_this_structure`, `failsafe:prepare_context`).
  - Applied to shipping agents; agents under Implementation/Discovery use their existing Prompt files under `packages/pipelines/deliverable/src/agents/prompts/*`.

### Deliverable Types
- `code-change` (PR creation) – Divide|Conquer|Correct
- `code-change-review` (PR review)
- `design-document` (issue creation)
- `design-document-review` (issue comment)

Type determination is agent‑driven in Setup/Discovery (never an input) and stored to execution state, then consumed by Implementation/Validation/Shipping.

## Short-Circuit Primitive
- Interface and helpers: `packages/execution-generics/src/signals/ShortCircuitSignal.ts`
  - `ShortCircuitSignal` (type, reason, refundType, confidence, metadata)
  - `hasShortCircuitSignal`, `ShortCircuitError`
- Credits settlement (centralized): `packages/credits/src/index.ts` (`withCreditReservation`, `processShortCircuitRefund`)

Short-circuit points (from phase configs):
- Setup: `danger-wall`, `ready-to-iterate` → full refund via `processShortCircuitRefund`
- Validation: `ready-to-ship` → refund handled by withCreditReservation finalization

## Agent Registration Pattern
- Phases register agents with an agent registry via dynamic imports.
- Examples:
  - Discovery registration: `packages/pipelines/deliverable/src/phases/discovery.ts` (lines 63–106)
  - Setup registration: `packages/pipelines/deliverable/src/phases/setup.ts` (lines 62–98)
  - Validation registration: `packages/pipelines/deliverable/src/phases/validation.ts` (lines 61–116)

## Registries & Initialization (Pipeline Level)
- Pipeline‑level initialize hook sets defaults and registries:
  - Default LLM provider/model (env‑overridable)
  - Pipeline system prompt registration (Prompt hierarchy enforced)
  - Tool registry superset at pipeline; agents may restrict via `restrictTo(requiredTools)`
- Source: `packages/pipelines/deliverable/src/initialize.ts`

## Execution State and Streaming
- Store-driven streaming (no direct emit helpers). Namespaced `execution.store(...)` updates drive all events:
  - Phase: `store('phase','start'|'complete', { phase })` → `phase-start` / `phase-complete`.
  - Agent step: `store('agent:<name>','start'|'complete', { phase, agent, step })` → `agent-start` / `agent-complete`.
  - LLM/tool: `store('llm','output', ...)` → `generation`; `store('tools','result', ...)` → `tool-use`.
- Streaming enablement: `enablePipelineStreaming(execution, { runId, userId, supabase, streamToDatabase, structuredToDatabase })`.
  - Source: `packages/pipelines-generics/src/streaming/pipeline-stream-integration.ts`.
- Event persistence (GA‑1): `execution_events` (SSE stream consumption in UI).
- Structured DB persistence (planned): execution hierarchy tables (`phase_executions`, `step_executions`, `substep_executions`, `tool_executions`, `generations`) referenced in streaming integration code; not present in the GA‑1 squashed schema.
- SSE route (UI consumption): `uapi/app/api/executions/stream/route.ts` (type-qualified).

### Primitives & Types (SSOT)
- Canonical primitives (DB + Streams): `packages/pipelines-generics/src/types/primitives.ts`
  - PhaseLower/Title, StepLower, FailsafeStep, GenerationStep + mappers.
- DB aliases from ORM SoT: `packages/pipelines-generics/src/types/db.ts`
- Optional runtime validation: generated schemas (`packages/orm/src/types/generated/deliverables_pipeline.generated.ts`) used as best‑effort `safeParse` in the streaming persistence layer; DB remains final SoT.

- ### Event Semantics
  - Canonical event types:
  - `phase-start`, `phase-complete`, `agent-start`, `agent-complete`, `generation`, `tool-use`, `status`, `completion`.
  - Execution path enrichment included on all messages: `{ phase, agent, step, failsafe?, generation? }`.
  - UI mapping remains a display concern only.

## Shipping Output
- Final Work Summary agent (Quick) emits the UI‑ready payload and stores structured metadata under `shipping/final_work_summary/*`.
- Metrics: derived from pipeline stores (start/end times) and `packages/pipelines-generics/src/execution/Metrics.ts` where applicable.

## Notes
- This doc reflects current source reality; counts are avoided unless mechanically verified.

## Notes
- This doc reflects current source reality; counts (agents, PromptParts, tables) intentionally omitted unless mechanically verified.
### Naming Canon (Execution/Executor)
- PipelineExecution: canonical execution record (no "run").
- PhaseExecution: per‑phase execution record (formerly “delegations”).
- Agent Executor: agent‑level executor (sequence formerly called “steps”).
- Substeps: preserved (Failsafe parents and Generation children), owned by an Executor.
### Guided Pipeline Execution: Pre → Pipeline → Post

- Preprocess (pre): Persist top-level intent and provisioning (deliverables: `{ computeEnabled, multiAgentEnabled }`). The legacy-named fields (`{ sync, spawn }`) now mirror AI Document overlays rather than a standalone pipeline.
- Pipeline: Deliverable pipeline executes today; the Measure variant stays feature-flagged. LLM-call adapters still inject preprocess + OTF data for every call.
- Postprocess (post): Sugar objects finalized. Measure registration paths reuse these code paths and are currently no-ops in GA‑1.

---

# Execution Store, Executors, and Auto‑Storing (Merged Canon)

This section merges the Execution Store Registry canon into the pipelines view, showing how Execution and Executors cooperate, how “auto‑storing” works (store‑driven streaming), and how pre/post processing fits sequencing.

## Execution & Executors — The Core Loop

- Execution is a pure, in‑memory state container. It exposes:
  - `store(namespace: string, key: string, value: any)`
  - `get(namespace: string, key: string)`
- Executors are pure async functions: `(input, execution) => output`.
- Everything (agents, phases, pipelines) composes executors. State flows via Execution, not function parameters, except for “Input” of the top executor stage.

## Auto‑Storing and Event Emission

All “auto‑storing” is driven by `Execution.store()` — not bespoke emit calls.

- Ephemeral store (default): `store(ns, key, value)` updates an internal Map and immediately calls the stream adapter:
  - `ExecutionStreamAdapter.onStore(rootId, ns, key, value, destinations, context)`
  - Failures in streaming never break execution.
- Persistent store (optional): `store(ns, key, value, { destinations: [PERSISTENT] })` persists to blob storage (S3, etc.) via `ExecutionStorageAdapter`.
- Storage metadata is tracked per `(namespace,key)` for auditability.
- Event semantics: Higher layers (pipelines‑generics) map specific store writes to typed events — `phase-start`, `agent-start`, `generation`, `tool-use`, etc. The UI consumes SSE assembled from these emissions.

Key identity & streaming:
- `execution/id`: unique id for this execution (use this; legacy `runId` is deprecated).
- `execution/correlationId`: trace id.
- `execution/dataStream`: `{ writeData(chunk), close?() }` used by pipelines to stream SSE to the client and persist events.

## Namespaces (What They Are) and Registry Canon

- A “namespace” is a string label for a sub‑map of keys under the Execution store. Examples:
  - `execution`, `repository`, `task`, `config`, `attachments`, `route/preprocessed`, `shipping/final_work_summary`, `postprocessed`.
  - Agent‑specific (pipeline/phase/agent) namespace pattern:
    - `execution-<pipeline>-pipeline-phase-<phase>-<agent>`
    - e.g., `execution-deliverable-pipeline-phase-validation-ready-to-ship-agent`
- Registry SSOT lists canonical namespaces, keys, and typed helpers. Never introduce ad‑hoc namespaces — register first.

Common namespaces/keys:
- `execution`: `id`, `correlationId`, `dataStream`
- `repository`: `connectionId`, `owner`, `name`, `branch`, `commit`
- `task`: `description` (AI Document classification lives in `.ai/` overlay stores; future pipeline types will introduce their own keys when implemented)
- `config`: `iterationCount`, `computeEnabled?`, `multiAgentEnabled?`, `mcpConfig?`
- `attachments`: `list`
- `route/preprocessed`: `deliverables` snapshot plus `ai_documents` snapshot for AI Document overlays and need-measurement activation
- `shipping/final_work_summary`: `summary`, `processingStats`, `repoSnapshot`, `deliverables?`
- `postprocessed`: `result` (normalized deliverable payload; need-measurement-specific shapes will extend this schema while the underlying primitive still uses `measure`)
- RTS namespaces (header decision):
  - Deliverables: `execution-deliverable-pipeline-phase-validation-ready-to-ship-agent`
  - Need-measurement placeholder: `execution-measure-pipeline-phase-validation-ready-to-ship-agent`

Typed helpers (from `@bitcode/execution-generics`):
- Identity: `setExecutionIdentity(exec,{ id, correlationId })`, `getExecutionId(exec)`, `getCorrelationId(exec)`
- RTS: `setValidationReadyToShip(exec, value, pipelineType)`, `getValidationReadyToShip(exec, ...)` (`pipelineType` is `'deliverable'` today; the reserved need-measurement pipeline reuses the current `measure` primitive when enabled)
- Agent namespace computation: `nsAgent(pipeline, phase, agent)`

## Pre‑/Post‑Processing Sequencing

There are two levels of preprocessing/postprocessing:

1) Guided Pipeline Execution — at the UI/API boundary:
   - Routes to gate-specific pipelines and configures inputs.
   - Sets `execution/id`, `execution/correlationId`, `execution/dataStream`, and initial state under `repository/*`, `task/*`, `config/*`, `attachments/list`.
   - Writes a small snapshot under `route/preprocessed/<pipeline>` (for audits and reproducibility).

2) Pipeline‑level preprocess/postprocess:
   - Preprocess: pipeline initialization (registries, environment guards). Returns input unchanged, but can prime state.
   - Postprocess: produces a normalized `postprocessed.result` for headers/TL;DR. Must include `validationReady` (from RTS namespace) for UX parity.

## Iteration & RTS

- SDIVS iteration is governed by `execution/config/iterationCount`.
- Even at limit, the ready‑to‑ship agent executes to yield a final decision.
- RTS writes to pipeline‑specific namespaces; routes enrich `postprocessed.validationReady` from those stores.

## Inputs: From DoD/IoI → Source, Attachments, MCP Config

- Source is required (owner/repo/branch/commit); attachments are one of: Files, Issues/PRs, URLs, Integrations/Connections, Deliverable (feedback).
- `execution/config/mcpConfig` remains reserved for AI Document‑driven tooling. GA‑1 deliverables do not populate it.

## Gate Enforcement Architecture

### Gate System Overview
The gate system (Design → Develop → Digest) controls file access, transitions, and interactions throughout pipeline execution. Gates are enforced at multiple layers to ensure proper restrictions.

### Gate Definitions

**Design Gate**:
- Allowed Files: `.ai/PRODUCT.md` only
- Collaborative: Yes (requires user approval)
- Primary Document: `.ai/PRODUCT.md`
- Purpose: Define what to build

**Develop Gate**:
- Allowed Files: All files EXCEPT `.ai/` directory (but `.ai/PRODUCT.md` updates allowed)
- Collaborative: No (autonomous operation)
- Self-Instruct Threshold: 0.6
- Purpose: Build the implementation

**Digest Gate**:
- Allowed Files: `.ai/AGENTS.md`, `.ai/PRODUCT.md`
- Collaborative: Yes (requires user approval)
- Primary Document: `.ai/AGENTS.md`
- Purpose: Capture learnings and evolve agents

### Enforcement Mechanisms

1. **Pipeline Layer** (`packages/pipelines-generics/src/execution/route-pipeline-execution.ts`):
   - `createGuidedPipelineExecution()` - Routes to gate-specific pipelines
   - `gatePreprocess()` - Adds gate context to input for each iteration
   - `transitionToNextGate()` - Handles user-triggered gate transitions
   - Gate state stored in execution for persistence

2. **Agent Layer** (Individual Agents):
   - Agents receive gate context in input
   - Discovery agents only read (no restrictions)
   - Implementation agents check `gateContext.allowedFiles`
   - Validation agents verify gate compliance

3. **Tool Layer** (`packages/tools-generics`):
   - `EditFileTool` - Validates file path against gate patterns
   - `WriteFileTool` - Checks creation permissions
   - `CreatePRTool` - Ensures PR only includes allowed files
   - Tools throw errors for gate violations

4. **Database Layer**:
   - `gate_state` JSONB - Current gate and history
   - `gate_config` JSONB - Active gate configuration
   - State persisted for recovery

### File Pattern Matching
Gate file patterns use glob syntax with negation support:
- Design: `['.ai/PRODUCT.md']`
- Develop: `['**/*', '!.ai/**', '.ai/PRODUCT.md']`
- Digest: `['.ai/AGENTS.md', '.ai/PRODUCT.md']`

Pattern evaluation:
1. Check positive matches first
2. Apply negations
3. Re-include exceptions

### Gate Transitions
Transitions are USER-GATED (no automatic transitions):
- Design → Develop: "Ready to Develop" button
- Develop → Digest: "Ready to Digest" button
- Digest → Design: "Another Iteration" button

### Error Handling
Gate violations produce specific errors:
```typescript
class GateViolationError extends Error {
  constructor(gate: Gate, file: string, operation: string)
}
```

## Registries: Agents, Tools, LLMs, Prompts

- Agents: constructed via PTRR factories; export `type Input`, `type Output`. Agent stores reference the Output type in inline docs when persisting structured results.
- Tools: generic tools are registered at pipeline initialization; agents may restrict available tools.
- LLMs: registry ensures a default provider/model; pipeline can pin variants.
- Prompts: hierarchical assembly — system identity/purpose → PTRR step purpose → generation/failsafe scaffolding → tools → structured schema.

## Postprocessed (Header SSOT)

- Deliverables: stored under `executions.output.postprocessed`.
- Reserved path `ai_document_runs.context.postprocessed` tracks AI Document diff proposals and will extend to the need-measurement pipeline.
- All postprocessed payloads must expose `validationReady` so headers can show RTS results consistently.

## Practical Examples

Set identity & stream in a route:
```ts
setExecutionIdentity(execution, { id: runId, correlationId });
execution.store('execution','dataStream', dataStream);
execution.store('repository','owner', repoOwner);
execution.store('task','description', task);
execution.store('config','iterationCount', iterationCount);
execution.store('attachments','list', attachments);
execution.store('route/preprocessed','deliverables', { multi, compute });
```

Store RTS result in an agent and enrich postprocessed at route:
```ts
// Agent (deliverables RTS)
execution.store('execution-deliverable-pipeline-phase-validation-ready-to-ship-agent','approved', true);
execution.store('execution-deliverable-pipeline-phase-validation-ready-to-ship-agent','result', result as Output);

// Route enrichment before responding
const approved = execution.get('execution-deliverable-pipeline-phase-validation-ready-to-ship-agent','approved');
postprocessed = { ...postprocessed, validationReady: { approved: !!approved } };
```

---

This section is authoritative. When adding a namespace or structured result, update the typed registry in `@bitcode/execution-generics/src/store/registry.ts` and this document, use constants, reference the agent `Output` type in inline comments, and keep postprocessed shapes uniform.
