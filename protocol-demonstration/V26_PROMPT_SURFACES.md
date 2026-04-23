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
- active agent prompt hierarchy examples must teach factory-owned Registry-backed prompt attachment; documentation and source comments may not instruct callers to assign `execution.prompt = ...` directly
- `factoryAgentWithPTRR` must fail closed at the runtime/type boundary when a caller omits the Registry-backed agent prompt carrier or any of the plan/try/refine/retry step Prompt registries
- active conversation and Terminal prompt carriers must compose agent identity plus PTRR step purposes from specific raw PromptParts rather than inline string-cast prompt fragments
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
| Agent prompt composition | `packages/agent-generics/src/{prompts/*,agents/factories.ts,execution/prompt-overlays.ts,substeps/factories.ts}` | active agent prompt composition, fail-closed PTRR prompt carrier enforcement, structured-output, and tool-doc injection |
| Execution-aware prompt runtime carriers | `packages/{agent-generics/src/execution/{AgentExecution.ts,Agent*Registry.ts},pipelines-generics/src/execution/{PipelineExecution.ts,Pipeline*Registry.ts},conversations-generics/src/agent/ConversationAgent.ts}` | active execution bootstrapping, prompt-aware registries, and conversation bootstrap through narrow `Execution`/`ExecutionPrompt` public subpaths |
| Broader active execution-bearing runtime carriers | `packages/{agent-generics/src/{agents/factories.ts,diagnostics/{trace.ts,instrumentation.ts},execution/file-diff-integration.ts,substeps/factories.ts,types.ts},pipelines-generics/src/{execution/{Metrics.ts,pipeline-types.ts,resume.ts,route-pipeline-execution.ts},phases/{phase-factory.ts,sdivs-factory.ts},pipeline-factory.ts,gate-system/{meta-phase-orchestrator.ts,types.ts},executors/wait-for-instruction.ts,streaming/pipeline-stream-integration.ts}}` | active execution, phase, streaming, and diagnostic carriers now narrow base `Execution` imports onto the public `@bitcode/execution-generics/Execution` subpath while retaining only the combinator or adapter barrel exports they actually use |
| Conversation prompt system | `packages/conversations-generics/src/{prompts/BitcodeTerminalConversationSystemPrompt.ts,agent/ConversationAgent.ts}`, `packages/prompts/src/raw_promptparts/specific/promptpart_specific_{system_bitcodeterminalconversation_*,agent_conversationagent_*}` | active Bitcode Terminal conversation system prompt, conversation-agent identity, and PTRR step prompt posture through specific raw PromptParts |
| Tool prompt composition | `packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts` | active prompt-bearing tool documentation composition |
| Deliverable prompt ports | `packages/pipelines/deliverable/src/{agents/prompts/*,agents/setup/*,agents/shipping/*,agents/validation-agents.ts,tools/*}` | retained-but-admitted deliverable prompt ports shaping active execution compatibility while keeping `Prompt`/`PromptPart` on public prompt subpaths and raw promptparts explicit/file-granular |
| Deliverable prompt rendering support | `packages/pipelines/deliverable/scripts/render-prompts.ts` | retained prompt rendering support through the public formatter boundary |
| Product-level prompt binding | `uapi/prompts/bitcode-terminal-system-prompt.ts` | app-facing binding of the canonical Bitcode Terminal conversation prompt |

## Support prompt consumers

These corridors do not define the live product center directly, but they remain admitted support or proof-bearing consumers.

| Corridor | Current owners | Current role |
| --- | --- | --- |
| Digest and analysis prompt helpers | `packages/digest/prompts/*` | support prompt composition for repository guidance/digest output through the public `@bitcode/prompts` and `@bitcode/prompts/raw_promptparts/*` boundary rather than sibling source reach-through |
| Prompt-primitive support carriers | `packages/{tools-generics/src/{types.ts,doc-code-tool/*},llm-generics/src/generation.ts,time/src/doc-prompts/*}` | admitted support/type carriers that now keep `Prompt`, `PromptPart`, and `PromptFormatter` on explicit public prompt subpaths instead of the root prompt barrel |
| Doc-comment/doc-code tool prompt injection | `packages/{doc-comment,doc-code}/*`, `packages/tools-generics/src/doc-code-tool/*`, `packages/{execution-generics,registry}/*` | support and compatibility bridge for parsing doc annotations and attaching `DocCodeToolPrompt` instances onto tool runs through explicit Bitcode-owned build/runtime carriers and honest public support-package subpaths |
| Prompt contracts and theorem language | `protocol-demonstration/src/canonical/type-contracts.ts`, `protocol-demonstration/src/canonical/proven-generator.js` | prompt contract/proof interpretation and generated witness language |
| Prompt proof/test surfaces | `protocol-demonstration/test/{v26-prompt-system-boundary.test.js,v26-prompt-surface-map.test.js,v26-prompt-runtime-loadability.test.js}` | procedural witnesses that the prompt corridor stays explicit, package-bounded, and runtime-loadable |
| Prompt hierarchy lint and factory enforcement | `packages/eslint-plugin-bitcode/src/requirePromptHierarchy.ts`, `packages/eslint-plugin-bitcode/docs/require-prompt-hierarchy.md`, `packages/eslint-plugin-bitcode/__tests__/requirePromptHierarchy.test.ts`, `packages/agent-generics/src/__tests__/factory-agent-ptrr-prompt-hierarchy.test.ts` | support verifier plus runtime/type boundary that requires `factoryAgentWithPTRR` callers to provide a Registry-backed agent prompt carrier plus complete plan/try/refine/retry step Prompt registries, forbids manual `execution.prompt` mutation, and documents generic/base plus specific implementation PromptPart composition as the reason for the rule |
| Prompt repair and migration scripts | `scripts/{fix-remaining-imports,fix-barrel-imports,fix-multiline-imports,fix-corrupted-imports}.sh` | fifth-gate prompt-maintenance carriers that must repair toward public `@bitcode/prompts` and `raw_promptparts` boundaries with repository-root path resolution, not old import namespaces or removed raw prompt trees |
| Prompt generation and update scripts | `scripts/{generate-massive-prompt-parts,mass-update-prompt-parts,architecture-review}.ts`, `scripts/{codemod-deep-promptparts,normalize-deliverables-promptparts}.mjs` | retained generation/codemod/verifier carriers that must target `promptpart_*`, `PROMPTPART_*`, active `raw_promptparts/{generic,specific}` folders, public `@bitcode/prompts/raw_promptparts/*` package subpaths, canonical V26 inference records, and the doc-comment/tool-prompt injection bridge |

Obsolete one-off prompt migration scripts that hard-coded removed raw prompt trees, local checkout paths, old prompt organization names, or destructive reorganizations are cut from active source during fifth-gate reform.
Their old-world implementation ideas are documented under `_legacy/old-world-prompt-migration-scripts/README.md`; that document is not an active prompt-system owner and must not be used as live Bitcode implementation truth.

## Reference-only or retained old-world prompt ports

These corridors still consume prompt abstractions or raw promptparts, but they are not allowed to silently own the live Bitcode product path.

| Corridor | Current owners | Current role |
| --- | --- | --- |
| Generic retained agents | `packages/generic-agents/*` including `jira-processor`, `text-searcher`, `web-search`, `web-researcher`, `danger-wall`, `ready-to-short-circuit` | reference-only/retained acceleration corridors unless promoted as admitted support; Jira remains reader-first need-ingestion/reference posture rather than live Bitcode product ownership; `text-searcher` is admitted only as Bitcode repository-evidence search support for need measurement, proof inspection, and AssetPack source-grounding; `web-researcher` is admitted only as Bitcode discovery-phase need-synthesis web research for source-attributed auxiliary context, third-party interface planning, proof-gap question formation, and AssetPack planning; `web-search` is admitted only as lower-level source-attributed web-search support under that same need-synthesis corridor; `danger-wall` is admitted only as Bitcode need/AssetPack risk-admission support for deciding whether the next retained pipeline phase may proceed |
| Generic retained tools | `packages/generic-tools/*` including `mcps-tools/*`, `task-comprehension`, `simple-system-text-search`, `lsp-query`, `web-search`, `vcs`, `use-computer`, `repository-setup` | retained prompt-bearing tool reservoirs and doc-code ports; `task-comprehension` is now a compatibility package whose active prompts and placeholder primitives are interpreted as Bitcode need-comprehension, written-asset, asset-pack, and shipping-wrapper analysis; `simple-system-text-search` is now admitted only as bounded repository-evidence search support for need measurement and asset-pack source-grounding; `web-search` is now admitted only as source-attributed external evidence search/content retrieval for discovery-phase need synthesis |
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
Bitcode does not have tasks as canonical ontology, so this retained corridor is acceptable only when it says so explicitly and limits every task-named file to compatibility-carrier status.
Its canonical prompt owners should stay local to the package usage sites under need-first names such as `AnalyzeNeedSemanticsDocCodeToolPrompt`, `ExtractNeedRequirementsDocCodeToolPrompt`, `IdentifyNeedConstraintsDocCodeToolPrompt`, `GenerateNeedSatisfactionCriteriaDocCodeToolPrompt`, `ValidateNeedComprehensionDocCodeToolPrompt`, and `AnalyzeNeedSatisfactionImplementationComplexityDocCodeToolPrompt`, while task-named prompt files remain explicit compatibility re-export wrappers only.
Its canonical code owners must follow the same locality rule: `AnalyzeNeedSemanticsTool`, `need-comprehension-primitives`, and `need-comprehension-schemas` own active behavior, while `AnalyzeTaskSemanticsTool`, `primitives.ts`, and `schemas.ts` remain wrapper carriers only.
Runtime JavaScript PromptPart carry-through must match the TypeScript content so old task-first text cannot remain live after the TypeScript surface is reformed.

The retained `packages/generic-tools/repository-setup` corridor is another package-level admissibility example:
repository preparation is admitted only as support for Bitcode need understanding and written-asset synthesis, so active file-filtering contracts must resolve `expressedNeed` / `needDescription` before `taskDescription`, and `taskDescription` must be documented as a compatibility carrier rather than the owning semantic field.
Its `RepositorySetupDocCodeToolPrompt` metadata must also be Bitcode-native and package-local, describing repository-preparation support rather than GA1-era repository-management lineage.

The retained `packages/generic-tools/simple-system-text-search` corridor is admitted as Bitcode repository-evidence search support:
the callable `simpleSystemTextSearch` and `SYSTEMTEXTSEARCH` raw PromptPart filenames remain compatibility surfaces, but active prompt ownership must move through `BitcodeRepositoryEvidenceSearchDocCodeToolPrompt`.
Its DocCode prompt metadata must be `V26`, categorized as `repository-evidence-search`, and must state that grep output is line-level evidence for need measurement, source-grounding, proof inspection, and AssetPack planning.
It must not present itself as broad codebase intelligence, generic task analysis, mutation authority, delivery authority, or proof completion by itself.
The same TS/JS carry-through rule applies to its raw PromptParts: runtime `.js` PromptPart content must match the canonical TypeScript strings so injected tool descriptions cannot retain GA-era text.
Its package manifest must directly declare `@bitcode/prompts` because the canonical prompt owner imports raw PromptParts rather than receiving them transitively through the tool primitive.

The retained `packages/generic-agents/text-searcher` corridor is admitted only as the agentic layer above that repository-evidence search tool:
`bitcodeRepositoryEvidenceSearcher` is the active semantic export, while `textSearcher`, `quickTextSearcher`, `SIMPLE_TEXT_SEARCH_AGENT`, and `TEXTSEARCHER` raw PromptPart filenames remain compatibility carriers.
Its agent, system, Plan, Try, Refine, and Retry prompt files must all carry `V26` metadata and must teach evidence-only support for need measurement, proof inspection, source-grounding, and AssetPack planning.
It may select and organize evidence, but it must not claim mutation authority, proof closure, delivery ownership, generic task analysis, indexing-product ownership, or live Exchange/Terminal product semantics.

The retained `packages/generic-agents/web-researcher` corridor is admitted only as discovery-phase web research for Bitcode need synthesis:
`bitcodeNeedSynthesisWebResearcher` is the active semantic export, while `bitcodeExternalEvidenceResearcher`, `webResearcherAgent`, `webResearcherPrompt`, `webResearcherStepPrompts`, `WEB_RESEARCH_AGENT.researchWeb`, and `WEBRESEARCHER` raw PromptPart filenames remain compatibility carriers.
Its agent, system, Plan, Try, Refine, and Retry prompt files must all carry `V26` metadata and must teach source-attributed external evidence support inside need synthesis for need measurement, proof-gap question formation, third-party interface planning, and AssetPack planning.
It may collect and classify external findings, source quality, volatility, contradictions, and unresolved gaps, but it must not claim scraping-product ownership, mutation authority, proof closure, delivery ownership, canonical need interpretation, or live Exchange/Terminal product semantics.

The retained `packages/generic-agents/web-search` and `packages/generic-tools/web-search` corridor is the lower-level searchable/source-content layer under that same need-synthesis support:
`bitcodeNeedSynthesisWebSearch` is the active semantic agent export, while `webSearch`, `quickWebSearch`, `webSearchPrompt`, `webSearchStepPrompts`, `WEBSEARCH`, `WEB_SEARCH`, `WEBSEARCHTOOL`, `WEBSEARCH_DOCCODE`, `GETCONTENTS_DOCCODE`, and `MULTIPROVIDERSEARCH_DOCCODE` names remain compatibility carriers.
Its agent prompts, DocCode tool prompts, raw PromptParts, README files, TypeScript source, and JavaScript mirrors must carry `V26` semantics and must teach source-attributed external evidence, source-quality review, volatility, unresolved evidence gaps, and proof-boundary warnings.
It may search, retrieve cited source content, classify URLs, and compare providers for corroboration, but it must not claim canonical need interpretation, proof generation, mutation, delivery-mechanism selection, search-platform product ownership, or live Exchange/Terminal product semantics.

The retained `packages/generic-tools/files-maintaining` corridor is admitted as written-asset mutation support for asset-pack synthesis:
text editing, create, replace, delete, and transaction prompts may remain generic tool package surfaces, but their DocCode prompt metadata must describe Bitcode written-asset file mutation and proof-facing transaction evidence rather than generic file-system or GA1 lineage.
These tools are support infrastructure; they do not define asset-pack semantics themselves, but their prompt descriptions must be safe to inject into agentic Bitcode runs that create, alter, or delete written assets.
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
