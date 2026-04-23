# V26 Prompt Surfaces

## Status

- Scope: supplementary V26 architecture map for prompt-bearing systems
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Purpose: make prompt ownership, consumer corridors, and retained prompt ports explicit package-by-package while fifth-gate reform stays active
- Inference companion: `protocol-demonstration/V26_INFERENCE_SYSTEMS.md`

## Prompt rope

`PromptPart`, `Prompt`, and `PromptExecution` are not incidental utilities.
They are one of the strongest repository-level ropes for following Bitcode inference:

- `PromptPart` defines the smallest typed semantic unit of inference
- `Prompt` defines the registry/composition shape of inference by extending `RegistryImpl<PromptPart>`
- `PromptExecution` defines the execution-side carrier that binds prompts to runtime work

Registry primitives are therefore required knowledge for prompt work.
`RegistryImpl` provides priority resolution, hierarchical path composition, multi-path merging, and explicit inheritance-by-registry rather than hidden class inheritance.
Prompt-types use that primitive in practical implementation layers:

- `_generic_` raw PromptPart nameparts and `PROMPTPART_GENERIC_*` constants name base reusable PromptPart types, objectives, formatters, and cross-corridor fragments that can be inherited or merged into more concrete prompt registries.
- `_specific_` raw PromptPart nameparts and `PROMPTPART_SPECIFIC_*` constants name concrete implementations of those prompt types for tools, agents, phases, pipelines, products, compatibility overlays, and Bitcode-specific proof/measurement/evidence corridors.
- Registry paths, priorities, and merge order decide how generic base layers and specific implementation layers compose into final prompt material.
- The naming split is a Bitcode implementation-layer contract, not a loose filesystem convention: generic base PromptParts and specific implementation PromptParts must both be specified before a prompt-bearing corridor can be accepted as live Bitcode behavior.

If a corridor meaningfully shapes Bitcode inference, it should either:
- consume these abstractions through the public prompt contract,
- expose raw promptparts through the explicit prompt package subpaths,
- or be classified as reference-only residue rather than silently owning live behavior

Prompt ownership is one part of the larger inference-system contract.
Every prompt-bearing corridor that also owns tools, agents, phases, pipeline execution, MCP ingress, or product execution state must satisfy `protocol-demonstration/V26_INFERENCE_SYSTEMS.md`: need, prompt surface, tool contract, agentic role, execution carrier, asset-pack effect, and verification must all be specified together.

## Public prompt contract

The public Bitcode prompt contract is:

- `@bitcode/prompts`
  `PromptPart`, `createPromptPart`, `Prompt`, `createPrompt`, `PromptExecution`, `createPromptExecution`
- `@bitcode/prompts/prompt`, `@bitcode/prompts/parts/PromptPart`, `@bitcode/prompts/execution/PromptExecution`
  narrow public runtime-safe prompt primitive subpaths for consumers that should not load the full root barrel
- `@bitcode/execution-generics/Execution`, `@bitcode/execution-generics/prompts/ExecutionPrompt`
  narrow public execution-aware prompt subpaths for carriers that only need execution ancestry or prompt-hierarchy ownership
- `@bitcode/prompts/formatters`
  shared prompt formatters such as `hierarchicalFormatter`
- `@bitcode/prompts/raw_promptparts/*`
  explicit raw prompt content families

Operational rules:

- active prompt-bearing inference carriers must import prompt primitives through the public contract above
- active app/package configs must not preserve `@bitcode/prompts/src/*` compatibility aliases
- retained reference test/build configs should use exact public prompt subpath maps such as `@bitcode/prompts/parts/PromptPart`, `@bitcode/prompts/prompt`, and `@bitcode/prompts/raw_promptparts/*` rather than broad `@bitcode/prompts/* -> packages/prompts/src/*` catchalls
- retained prompt reservoir package configs must be source-backed, no-emit verification boundaries when they only prove prompt/tool compatibility; they may map exact public prompt subpaths for local typechecking, but they may not use declaration-file path targets or broad source catchalls as a substitute for package dependencies
- execution-aware prompt carriers and broader active execution-bearing runtime carriers that only need prompt hierarchy, execution ancestry, or the base execution tree should prefer `@bitcode/execution-generics/Execution` and `@bitcode/execution-generics/prompts/ExecutionPrompt` rather than the broad execution barrel
- support primitives that prompt/doc-code runtime carriers depend on, including `@bitcode/registry`, `@bitcode/execution-generics/{Execution,prompts/ExecutionPrompt}`, `@bitcode/doc-comment/{base-plugin,types}`, `@bitcode/doc-code`, and `@bitcode/tools-generics`, must expose honest source-backed public package subpaths and direct dependency declarations rather than relying on repo-relative cross-package imports
- prompt-bearing runtime carriers and adjacent execution/phase/diagnostic carriers that only need the base execution tree must stay loadable without dragging the full execution storage/logging stack through a broad execution barrel
- raw promptparts may stay explicit and file-granular, but route-local ad hoc strings may not silently replace prompt-owned product logic
- raw promptparts must keep their implementation-layer meaning legible: `raw_promptparts/generic` is the base/inheritable PromptPart layer, `raw_promptparts/specific` is the concrete implementation PromptPart layer, and every active/admitted prompt registry must be able to explain which layer it consumes
- raw promptpart TypeScript sources and runtime JavaScript carry-through files must stay content-equivalent so commercial runtime imports cannot silently use old prompt text after the canonical TS prompt has been reformed
- prompt behavior that remains old-world, experimental, or pre-Bitcode may survive only as reference-only or auxiliary-input corridors
- the base `doc-comment` primitive plus `doc-code` tool prompt injection may remain admitted support/compatibility infrastructure where Bitcode still needs build-time prompt attachment for tool runs, but `generic-doc-comment-plugins`, `doc-comment` examples, and prompt-package developing experiments remain reference-only reform material under `protocol-demonstration/V26_DOC_COMMENT_REFORM.md`; package docs in those corridors must not present prompt-package internal paths as public consumer APIs

## Active fifth-gate prompt consumers

These corridors currently participate in the live Bitcode or admitted fifth-gate inference substrate.

| Corridor | Current active owners | Current role |
| --- | --- | --- |
| Prompt primitives and prompt execution | `packages/prompts/src/{parts/PromptPart.ts,prompt.ts,execution/PromptExecution.ts,formatters/*}` | canonical prompt contract and execution-side prompt carrier |
| Execution prompt hierarchy | `packages/execution-generics/src/prompts/ExecutionPrompt.ts` | active execution prompt registry with Bitcode hierarchy rules |
| Pipeline prompt hierarchy | `packages/pipelines-generics/src/prompts/PipelinePrompt.ts` | active pipeline/phase/agent prompt registry |
| Agent prompt composition | `packages/agent-generics/src/{prompts/*,execution/prompt-overlays.ts,substeps/factories.ts}` | active agent prompt composition, structured-output, and tool-doc injection |
| Execution-aware prompt runtime carriers | `packages/{agent-generics/src/execution/{AgentExecution.ts,Agent*Registry.ts},pipelines-generics/src/execution/{PipelineExecution.ts,Pipeline*Registry.ts},conversations-generics/src/agent/ConversationAgent.ts}` | active execution bootstrapping, prompt-aware registries, and conversation bootstrap through narrow `Execution`/`ExecutionPrompt` public subpaths |
| Broader active execution-bearing runtime carriers | `packages/{agent-generics/src/{agents/factories.ts,diagnostics/{trace.ts,instrumentation.ts},execution/file-diff-integration.ts,substeps/factories.ts,types.ts},pipelines-generics/src/{execution/{Metrics.ts,pipeline-types.ts,resume.ts,route-pipeline-execution.ts},phases/{phase-factory.ts,sdivs-factory.ts},pipeline-factory.ts,gate-system/{meta-phase-orchestrator.ts,types.ts},executors/wait-for-instruction.ts,streaming/pipeline-stream-integration.ts}}` | active execution, phase, streaming, and diagnostic carriers now narrow base `Execution` imports onto the public `@bitcode/execution-generics/Execution` subpath while retaining only the combinator or adapter barrel exports they actually use |
| Conversation prompt system | `packages/conversations-generics/src/{prompts/ConversationSystemPrompt.ts,agent/ConversationAgent.ts}` | active conversations system prompt and conversation-agent prompt posture |
| Tool prompt composition | `packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts` | active prompt-bearing tool documentation composition |
| Deliverable prompt ports | `packages/pipelines/deliverable/src/{agents/prompts/*,agents/setup/*,agents/shipping/*,agents/validation-agents.ts,tools/*}` | retained-but-admitted deliverable prompt ports shaping active execution compatibility while keeping `Prompt`/`PromptPart` on public prompt subpaths and raw promptparts explicit/file-granular |
| Deliverable prompt rendering support | `packages/pipelines/deliverable/scripts/render-prompts.ts` | retained prompt rendering support through the public formatter boundary |
| Product-level prompt binding | `uapi/prompts/conversations-system-prompt.ts` | app-facing binding of the canonical conversations prompt |

## Support prompt consumers

These corridors do not define the live product center directly, but they remain admitted support or proof-bearing consumers.

| Corridor | Current owners | Current role |
| --- | --- | --- |
| Digest and analysis prompt helpers | `packages/digest/prompts/*` | support prompt composition for repository guidance/digest output through the public `@bitcode/prompts` and `@bitcode/prompts/raw_promptparts/*` boundary rather than sibling source reach-through |
| Prompt-primitive support carriers | `packages/{tools-generics/src/{types.ts,doc-code-tool/*},llm-generics/src/generation.ts,time/src/doc-prompts/*}` | admitted support/type carriers that now keep `Prompt`, `PromptPart`, and `PromptFormatter` on explicit public prompt subpaths instead of the root prompt barrel |
| Doc-comment/doc-code tool prompt injection | `packages/{doc-comment,doc-code}/*`, `packages/tools-generics/src/doc-code-tool/*`, `packages/{execution-generics,registry}/*` | support and compatibility bridge for parsing doc annotations and attaching `DocCodeToolPrompt` instances onto tool runs through explicit Bitcode-owned build/runtime carriers and honest public support-package subpaths |
| Prompt contracts and theorem language | `protocol-demonstration/src/canonical/type-contracts.ts`, `protocol-demonstration/src/canonical/proven-generator.js` | prompt contract/proof interpretation and generated witness language |
| Prompt proof/test surfaces | `protocol-demonstration/test/{v26-prompt-system-boundary.test.js,v26-prompt-surface-map.test.js,v26-prompt-runtime-loadability.test.js}` | procedural witnesses that the prompt corridor stays explicit, package-bounded, and runtime-loadable |
| Prompt repair and migration scripts | `scripts/{fix-remaining-imports,fix-barrel-imports,fix-multiline-imports,fix-corrupted-imports}.sh` | fifth-gate prompt-maintenance carriers that must repair toward public `@bitcode/prompts` and `raw_promptparts` boundaries with repository-root path resolution, not old import namespaces or removed raw prompt trees |
| Prompt generation and update scripts | `scripts/{generate-massive-prompt-parts,mass-update-prompt-parts,architecture-review}.ts`, `scripts/{codemod-deep-promptparts,normalize-deliverables-promptparts}.mjs` | retained generation/codemod/verifier carriers that must target `promptpart_*`, `PROMPTPART_*`, active `raw_promptparts/{generic,specific}` folders, public `@bitcode/prompts/raw_promptparts/*` package subpaths, canonical V26 inference records, and the doc-comment/tool-prompt injection bridge |

Obsolete one-off prompt migration scripts that hard-coded removed raw prompt trees, local checkout paths, old prompt organization names, or destructive reorganizations are cut from active source during fifth-gate reform.
Their old-world implementation ideas are documented under `_legacy/old-world-prompt-migration-scripts/README.md`; that document is not an active prompt-system owner and must not be used as live Bitcode implementation truth.

## Reference-only or retained old-world prompt ports

These corridors still consume prompt abstractions or raw promptparts, but they are not allowed to silently own the live Bitcode product path.

| Corridor | Current owners | Current role |
| --- | --- | --- |
| Generic retained agents | `packages/generic-agents/*` including `jira-processor`, `web-search`, `web-researcher`, `danger-wall`, `ready-to-short-circuit` | reference-only/retained acceleration corridors; Jira remains reader-first need-ingestion/reference posture rather than live Bitcode product ownership |
| Generic retained tools | `packages/generic-tools/*` including `mcps-tools/*`, `task-comprehension`, `lsp-query`, `web-search`, `vcs`, `use-computer`, `repository-setup` | retained prompt-bearing tool reservoirs and doc-code ports; `task-comprehension` is now a compatibility package whose active prompts and placeholder primitives are interpreted as Bitcode need-comprehension, written-asset, asset-pack, and shipping-wrapper analysis |
| ChatGPT-era prompt documentation | `packages/chatgptapp/src/prompts/*` | retained prompt documentation/reference corridor |
| Prompt/doc-comment experimentation | `packages/generic-doc-comment-plugins/*`, `packages/doc-comment/examples/*`, `packages/prompts/src/developing/*` | experimental/reference prompt authoring and prompt-doc tooling; see `protocol-demonstration/V26_DOC_COMMENT_REFORM.md` for the V26 reform boundary |

Operational rule:

- reference-only prompt corridors may keep older prompt inventories where they accelerate reform work
- reference-only prompt corridors should prefer `@bitcode/prompts/prompt` and `@bitcode/prompts/parts/PromptPart` for primitive access rather than the root `@bitcode/prompts` barrel unless they actually need the full prompt execution surface
- they may not define live Exchange/Terminal semantics unless they are explicitly repurposed and promoted into the active rows above
- if a retained corridor becomes necessary for live product behavior, it must move into the active or support tables and satisfy the public prompt contract

## Current fifth-gate prompt residues

The remaining honest prompt-side closure work is:

1. prompt-space completeness across retained consumer families, not just active boundary hygiene
2. package-by-package admissibility for retained prompt-bearing generic agents/tools
3. narrowing or cutting prompt reservoirs that still imply parallel old-world product logic
4. continued canonicalization of retained compatibility names after semantic mirrors exist, exemplified by `comprehend-need` becoming the active setup prompt carrier while task-named modules remain compatibility re-exports only, `DELIVERABLESETUPCOMPREHENDNEED` PromptParts owning the active deliverable-corridor overlay while `DELIVERABLESETUPCOMPREHENDTASK` PromptParts remain compatibility wrappers, and retained deliverable substep PromptParts carrying Bitcode need / written-asset / asset-pack / proof / delivery-wrapper semantics instead of generic old-world agent boilerplate
5. proving that app- and MCP-facing inference behavior is fully explainable from the explicit prompt substrate rather than hidden composition seams

The retained `packages/generic-tools/task-comprehension` family is the next generic-tool example of this rule:
task-named package/class/input names remain compatibility carriers, but `DocCodeToolPrompt` metadata, raw PromptPart content, package docs, and placeholder outputs must describe `need`, `written asset`, `asset pack`, `shipping wrapper`, and `need satisfaction criteria`.
Runtime JavaScript PromptPart carry-through must match the TypeScript content so old task-first text cannot remain live after the TypeScript surface is reformed.
The same runtime carry-through rule applies to retained deliverable substep PromptParts and their generated declarations: broad prompt normalization must be idempotent, benchmark metadata must stay parseable, and runtime `.js` PromptPart strings must synchronize from canonical `.ts` PromptPart source.
Their doc-comment metadata must also be Bitcode-native: `current_version` cannot preserve GA1 lineage, and every retained deliverable substep `intent` must name the need-first written-asset / asset-pack / proof / delivery-wrapper role represented by that PromptPart.
The same metadata rule now applies across the whole retained deliverable-family raw PromptPart corpus: agent, phase, pipeline, tool, setup, discovery, implementation, validation, and shipping PromptParts may retain compatibility filenames, but their doc-comment `intent` and `current_version` metadata must describe Bitcode need-first written-asset / asset-pack execution rather than old deliverable product lineage.
Its package-local build boundary must typecheck those prompt/tool imports without emitting generated artifacts, and must declare direct dependencies on `@bitcode/prompts` and `@bitcode/tools-generics` rather than relying on transitive workspace reach-through.

The remaining prompt closure work must also prove Registry-layer understanding, not just prompt text cleanup.
For every live or admitted-support Bitcode prompt implementation, closure evidence must identify:

- the `Prompt`, `PromptExecution`, or prompt-aware registry carrier that owns composition,
- the generic/base PromptParts that are reused or inherited through Registry paths,
- the specific implementation PromptParts that specialize the base type for a Bitcode tool, agent, phase, pipeline, or product corridor,
- the formatter or runtime materializer that turns registry entries into model-ready prompt text,
- and the test/proof witness that verifies this layering from source.

Compatibility filenames may remain during fifth-gate only when their PromptPart metadata and content state the canonical Bitcode layer they implement.
Full V26 closure must eliminate any prompt implementation whose generic/specific layer can only be inferred from old naming or untested runtime behavior.

## Verification posture

The current prompt-space witness family is intentionally two-layered:

- the fifth-gate prompt baseline proves that prompt primitives, active inference carriers, doc-code tool prompt injection, asset-pack and need-comprehension compatibility prompts, runtime PromptPart carry-through, app/MCP ingress, and proof/spec witnesses are all source-visible and package-bounded
- final prompt-space completeness remains an eighth-gate closure obligation because retained prompt reservoirs still require whole-repository inventory saturation, quality review, and final promotion/cut decisions

The generated `.bitcode/prompt-space-completeness-proof.json` artifact must therefore keep `passed: false` until eighth-gate while also exposing `baselinePassed`, `witnessSetCount`, `closureGate`, `openCompletenessDimensions`, and role-specific witness checks for fifth-gate progress.

The current prompt surface map is expected to align with:

- `BITCODE_SPEC_V26.md`
- `BITCODE_SPEC_V26_PARITY_MATRIX.md`
- `protocol-demonstration/V26_APPLICATION_SYSTEMS.md`
- `.bitcode/prompt-system-totality-proof.json`
- `.bitcode/prompt-space-completeness-proof.json`
- `.bitcode/inference-implementation-records-proof.json`
- `protocol-demonstration/src/canonical/inference-implementation-records.js`
- `protocol-demonstration/test/v26-inference-implementation-records.test.js`
- `protocol-demonstration/test/v26-prompt-system-boundary.test.js`
- `protocol-demonstration/test/v26-prompt-surface-map.test.js`
- `protocol-demonstration/test/v26-prompt-runtime-loadability.test.js`
