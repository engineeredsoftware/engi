# V26 Inference Systems

## Status

- Scope: supplementary V26 specification for prompts, tools, agents, executions, and pipeline inference carriers
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Purpose: make every inference-bearing implementation specify its need, prompt substrate, tool boundary, agentic role, execution carrier, evidence, and promotion posture before it can be treated as Bitcode behavior

## Rule

No prompt, tool, agent, phase, pipeline, MCP operation, or execution carrier may define live Bitcode behavior only by code presence.
Each inference system must be specified as an auditable unit with the same canonical terms:

- `need`
  The expressed or measured objective the inference system satisfies.
- `prompt surface`
  The `PromptPart`, `Prompt`, `PromptExecution`, formatter, raw promptpart, or doc-code prompt structure used to shape inference.
- `tool contract`
  The callable operation, parameter schema, output schema, capability boundary, and failure behavior.
- `agentic role`
  The role, phase, step, substep, tool budget, structured output, and delegation boundary if an agent owns the work.
- `execution carrier`
  The `Execution`, `PipelineExecution`, `AgentExecution`, `ToolExecution`, run store, event stream, or persisted row that records the work.
- `asset-pack effect`
  The stable written asset, proof artifact, delivery mechanism, or state transition the system may produce.
- `verification`
  The static, unit, integration, runtime, proof, reread, or generated-artifact evidence required to claim the system is implemented.

## Mandatory Specification Shape

Every active or admitted-support inference system must answer the following before promotion:

| Field | Requirement |
| --- | --- |
| Need | Name the Bitcode need in product terms, not legacy task/deliverable shorthand. |
| Prompt ownership | Identify the exact prompt class, Registry primitive, registry path/key structure, generic base PromptParts, specific implementation PromptParts, formatter, and runtime import boundary. |
| Tool ownership | Identify callable tools, schema inputs/outputs, capability limits, and fail-closed behavior. |
| Agent ownership | Identify agent role, phase, step/substep structure, structured output, tool usage, and retry/refine behavior. |
| Execution ownership | Identify where runtime state is stored, streamed, persisted, reread, and proven. |
| Asset ownership | Identify whether the output is a stable written asset, asset pack, proof artifact, state mutation, or delivery wrapper. |
| Boundary posture | Classify as active, admitted support, ingress, compatibility, reference-only, or cut-target. |
| Verification | Name concrete tests, typechecks, runtime load checks, generated proof artifacts, or manual verification gaps. |

Compatibility names may remain only when the specification states what canonical Bitcode meaning they carry and why destructive rename is deferred.

## Inference Implementation Record

Every active or admitted-support package that owns inference behavior must be describable by a stable implementation record.
The record does not need to live in one source file yet, but the repository must make every field recoverable from specification, package docs, source, tests, and generated proof artifacts.
The current V26 source-visible registry is `protocol-demonstration/src/canonical/inference-implementation-records.js`, verified by `protocol-demonstration/test/v26-inference-implementation-records.test.js` and generated into `.bitcode/inference-implementation-records-proof.json`.
The registry proof is structural, not only declarative: it checks top-level record fields, nested prompt/tool/agent/execution/asset-pack section fields, allowed boundary postures, source-backed implementation owner references, source evidence references, typed verification evidence, and hard executable/generated verification footing.

Required record fields:

- `recordId`
  Stable identifier for the inference system, using Bitcode product terms before compatibility names.
- `canonicalNeed`
  The measured or expressed need the system satisfies.
- `promptImplementation`
  Exact prompt classes, Registry primitive, registry path/key structure, generic base PromptParts, specific implementation PromptParts, prompt formatter, prompt execution carrier, and runtime JavaScript carry-through requirement.
- `toolImplementation`
  Exact tool classes/functions, schemas, permission boundary, mutation boundary, and fail-closed behavior.
- `agentImplementation`
  Exact agent role, phase, step/substep factory, structured output contract, registry requirements, and retry/refinement limit.
- `executionImplementation`
  Exact execution carrier, persisted/read model, stream event family, registry hydration, and reread/proof witness.
- `assetPackImplementation`
  The written asset, asset pack, proof artifact, delivery mechanism, state transition, or wrapper payload that can be produced.
- `boundaryPosture`
  One of active, admitted support, ingress, compatibility, reference-only, or cut-target.
- `verificationSet`
  Concrete command, test, typecheck, runtime load, static proof, generated artifact, or manual gap.

The record is incomplete if any field can only be inferred from old naming.
For example, `task-comprehension` is accepted only because package docs, prompt metadata, raw PromptParts, source primitives, package-local typecheck, and proof witnesses all state that the live meaning is Bitcode need comprehension rather than old task-first planning.
The same corridor now also requires local need-first code owners so prompt reform and runtime/tool reform cannot drift apart: `AnalyzeNeedSemanticsTool`, `need-comprehension-primitives`, and `need-comprehension-schemas` own the active implementation while task-named files remain wrappers only.
Likewise, retained support tools such as `repository-setup` are acceptable only when their active contracts resolve `expressedNeed` / `needDescription` before `taskDescription` and when their DocCode prompt metadata states Bitcode repository-preparation support instead of older task-first or GA1 lineage.
Retained file mutation tools such as `files-maintaining` are acceptable only when their tool prompts state Bitcode written-asset mutation support, asset-pack synthesis use, and proof-facing transaction evidence instead of generic file-system ownership.
Records may state that no independent tool or agent is promoted, but the supporting contract must say so explicitly; prompt and execution owners must remain concrete source-backed references.
Verification entries are classified as `executable-command`, `generated-artifact`, `source-test`, or `declared-gap`; generated artifacts and source tests must resolve to files, and declared gaps expose blockers rather than satisfying a passing implementation record.

## Complete Coverage Ledger

Fifth-gate prompt closure requires every prompt/tool/agent/execution system to land in this ledger before it is treated as live Bitcode behavior.

| System family | Required prompt implementation | Required tool implementation | Required agentic implementation | Required execution implementation | Required verification |
| --- | --- | --- | --- | --- | --- |
| Prompt primitives | `PromptPart`, `Prompt`, `PromptExecution`, formatters, raw PromptParts, and TS/JS carry-through | none directly; prompt primitives must remain import-safe support for tools | none directly | `PromptExecution` binds prompt material to execution evidence | prompt package tests, prompt runtime loadability, prompt-system proof |
| Tool prompt infrastructure | `DocCodeToolPrompt`, `formatUsableTools`, doc-code prompt labels, tool prompt registries | `Tool`, `ToolExecution`, `ToolPromptRegistry`, doc-code decorators/loaders | tool descriptions can be injected into agent runs but do not own the agent | `ToolExecution` and prompt registry evidence | support package subpath tests, doc-code transform tests, package manifests |
| Agent infrastructure | `AgentPrompt`, `AgentStepPrompt`, generation/failsafe/tool prompt overlays | tool registries and bounded callable capabilities | agent factories, substeps, structured outputs, retry/refine limits | `AgentExecution`, agent registries, diagnostics, file-diff evidence | prompt boundary tests, agent/pipeline typechecks, proof artifacts |
| Execution infrastructure | `ExecutionPrompt` and public prompt primitive imports | execution-level tool registry support, with mutating tool behavior owned by tool records | none directly; agents layer above base execution | `Execution`, execution registry, storage/stream adapters, typed stores, and work updates | execution package typecheck, prompt boundary tests, runs-pipelines proof |
| Pipeline infrastructure | `PipelinePrompt`, phase prompts, prompt registries | pipeline tool registries and MCP-facing callable adapters | phase factory, meta-phase orchestrator, setup/discovery/implementation/validation/finish agents | `PipelineExecution`, phase/subexecution, metrics, resume, streams | runs-pipelines proof, deliverable reform tests, package-local checks |
| Conversation inference | `BitcodeTerminalConversationSystemPrompt` and `uapi/prompts/bitcode-terminal-system-prompt.ts` | conversation tool registration and attachment/destination tool posture | `ConversationAgent` and rich-input write surface | conversation persistence, stream events, ad hoc execution continuity | conversation tests, prompt surface tests, persistence proof |
| Asset-pack synthesis compatibility | deliverable-corridor prompts, `comprehend-need` overlays, raw PromptParts, prompt renderer | clone/VCS, written-asset file mutation, PR, review, issue/comment, template, and delivery-wrapper tools | setup, ready-to-iterate, validation, finish, final-summary agents | registry-bearing pipeline runtime, postprocess/read models, execution history | `v26-deliverable-reform`, `v26-pipeline-finish-reform`, files-maintaining prompt witness, package typecheck boundary, prompt-system proof |
| Need-comprehension compatibility | need-first local DocCode prompt owners such as `AnalyzeNeedSemantics`, `ExtractNeedRequirements`, `IdentifyNeedConstraints`, `GenerateNeedSatisfactionCriteria`, `ValidateNeedComprehension`, and `AnalyzeNeedSatisfactionImplementationComplexity`, plus task-named compatibility wrappers, all with `need-comprehension` metadata and reformed raw PromptParts | local need-first code owners `AnalyzeNeedSemanticsTool`, `need-comprehension-primitives`, and `need-comprehension-schemas`, with retained task-named APIs mapped to need, written asset, asset pack, proof, and delivery-wrapper outputs as compatibility residue only because Bitcode does not have task-first product semantics | no independent live agent; may feed setup/comprehension agents as admitted support | no independent execution owner; evidence is consumed by parent `ToolExecution`/pipeline records through a package-local no-emit boundary | package-local no-emit typecheck, prompt boundary test, need-comprehension compatibility test, raw PromptPart TS/JS carry-through |
| MCP and external ingress | MCP prompt/tool descriptions where admitted | narrowed Exchange-facing tool families and fail-closed create admission | no invisible agent promotion without a record | queue/run/execution creation, provider/repository ingress, operator reread | MCP tests, package-local typechecks, retained-package admissibility proof |

## Prompt Requirements

Prompt-bearing systems must:

- import prompt primitives through public `@bitcode/prompts` package boundaries or stable narrow subpaths;
- treat `Prompt` as `RegistryImpl<PromptPart>` and specify the Registry path/key strategy, priority/merge expectation, and inheritance-by-registry behavior for every live/admitted prompt implementation;
- classify `raw_promptparts/generic` / `PROMPTPART_GENERIC_*` as reusable base PromptPart layers and `raw_promptparts/specific` / `PROMPTPART_SPECIFIC_*` as concrete implementation PromptPart layers;
- prove that generic base PromptParts and specific implementation PromptParts compose through explicit Registry-backed carriers rather than hidden strings or unspecific filesystem inference;
- enforce agent prompt hierarchy through verifier code and runtime/type boundaries where available: `factoryAgentWithPTRR` must receive a Registry-backed agent prompt carrier plus complete plan/try/refine/retry step Prompt registries, must fail closed when that carrier is absent or partial, and direct `execution.prompt` mutation remains invalid;
- require active Terminal conversation agents to source agent identity and PTRR step purposes from specific raw PromptParts, not inline string-cast prompt fragments;
- keep active documentation and source comments aligned with that verifier by describing factory-owned prompt attachment rather than manual `execution.prompt = ...` assignment;
- keep raw promptpart TypeScript and runtime JavaScript content equivalent;
- keep package-local prompt typecheck configs source-backed and no-emit when they verify retained prompt reservoirs without owning emitted artifacts;
- prefer semantic aliases such as `need`, `writtenAssetType`, `writtenAssets`, `assetPack`, `needSatisfactionCriteria`, and `deliveryMechanism` before legacy compatibility aliases;
- preserve doc-comment/doc-code prompt injection where tools need build-time tool descriptions in agentic runs;
- reject old-world prompt content that teaches parallel product semantics, hidden task-first planning, PR-first delivery, or experimental cognitive/transcendent language as live Bitcode behavior.

## Tool Requirements

Tool-bearing systems must:

- declare their package dependencies rather than relying on transitive workspace reach-through;
- expose public package subpaths for any support primitive they expect others to consume;
- describe exact parameter and output shapes in prompt content or schema source;
- define fail-closed behavior for missing auth, readiness, repository anchoring, permissions, or provider bindings where the tool can mutate state or spend `$BTD`;
- separate stable written assets from connected-interface delivery wrappers.

## Agentic Requirements

Agentic systems must:

- name the phase, step, substep, prompt overlay, and tool registry they use;
- bind structured outputs to semantic Bitcode fields before compatibility fields;
- record tool/prompt/llm/agent registry state when running inside retained compatibility corridors;
- emit enough execution store evidence for reread, proof, and operator-visible diagnostics;
- keep retries/refinement bounded by the expressed need and satisfaction criteria.

## Execution Requirements

Execution systems must:

- use `Execution`, `PipelineExecution`, `AgentExecution`, `ToolExecution`, and `PromptExecution` as explicit carriers rather than route-local hidden state;
- persist or expose enough state for Terminal reread, Exchange route coherence, event streams, run history, and generated proof witnesses;
- keep read models, mock fallback projections, and persisted rows semantically aligned on the same `need` / `assetPack` / `writtenAsset` meaning;
- avoid pulling storage/logging/runtime reservoirs through broad package barrels when only base execution ancestry is required.

## Current Package Matrix

| Corridor | Required V26 inference specification |
| --- | --- |
| `packages/prompts/*` | canonical `PromptPart`, Registry-backed `Prompt`, `PromptExecution`, formatter, generic base raw PromptPart layer, specific implementation raw PromptPart layer, and runtime carry-through ownership |
| `packages/tools-generics/*` | tool primitive, `ToolExecution`, `ToolPromptRegistry`, doc-code prompt injection, and public support subpaths |
| `packages/doc-comment/*`, `packages/doc-code/*` | build-time annotation and tool prompt attachment support, with examples/plugins remaining reference-only unless promoted |
| `packages/agent-generics/*` | agent prompt hierarchy, structured output, step/substep, retry/refine, tool/llm registry, and agent execution ownership |
| `packages/execution-generics/*`, `packages/pipelines-generics/*` | execution tree, prompt-aware registry, pipeline/phase hierarchy, streaming, metrics, and resume ownership |
| `packages/pipelines/deliverable/*` | retained asset-pack written-asset synthesis corridor with `need`, `writtenAssetType`, `writtenAssets`, `assetPack`, `deliveryMechanism`, and compatibility wrappers |
| `packages/generic-tools/task-comprehension/*` | retained compatibility tool reservoir now specified as Bitcode need-comprehension prompt/tool primitives with local need-first code ownership and explicit wrapper carriers |
| `packages/conversations-generics/*`, `uapi/prompts/*` | rich-input conversation prompt and application-facing inference binding |
| `packages/executions-mcp/*` | admitted Exchange-facing MCP inference ingress, narrowed to currently admitted tool families and fail-closed create admission |

## Promotion Control

An inference corridor is not fifth-gate complete when it merely typechecks or has prompt text.
It is complete only when:

- its canonical need and implementation boundary are specified;
- its prompt/tool/agent/execution carrier is source-visible;
- its Prompt-type Registry carrier, generic base PromptParts, and specific implementation PromptParts are explicitly mapped;
- its compatibility names are explicitly mapped or removed;
- its package dependencies and public subpaths are honest;
- its runtime and proof evidence can be regenerated from source.

Later gates may refine quality, viability, and commercial launch posture, but fifth-gate must establish this baseline for every active and admitted-support inference system.

## Prompt-Space Witness Baseline

The prompt-space completeness proof is generated during fifth-gate but remains an eighth-gate closure proof.
Its fifth-gate job is narrower and concrete: prove that the prompt substrate is source-visible enough to support active and admitted-support inference records without hidden prompt ownership.

The generated `.bitcode/prompt-space-completeness-proof.json` witness must cover, at minimum:

- primitive `PromptPart`, `Prompt`, `PromptExecution`, formatter, and raw PromptPart public contracts
- active agent, execution, pipeline, and conversation prompt carriers
- `doc-comment` and `doc-code` tool prompt injection support
- retained asset-pack and need-comprehension compatibility prompts
- TypeScript and runtime JavaScript raw PromptPart carry-through for reformed compatibility prompts
- application conversation prompt binding and admitted Bitcode MCP prompt/tool ingress
- specification, implementation-record, and test witnesses tying the prompt surface to generated proof

`baselinePassed: true` is allowed to support fifth-gate progress only when those witness sets are present.
`passed: true` is not allowed until eighth-gate prompt-space saturation proves every live inference path across the retained repository is explainable from the explicit prompt substrate.
