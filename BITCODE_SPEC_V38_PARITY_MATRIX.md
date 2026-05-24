# Bitcode Spec V38 Parity Matrix

## Status

- Version: `V38`
- V38 state: active draft opening over promoted V37
- Current canonical/latest target: `V37`
- Prior canonical anchor: `BITCODE_SPEC_V37.md`
- Prior generated proof appendix: `BITCODE_SPEC_V37_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v38-spec-family-report.json`, `.bitcode/v38-canonical-input-report.json`, `.bitcode/v38-canon-posture-drift-report.json`, `.bitcode/v38-inference-surface-inventory.json`, `.bitcode/v38-ptrr-failsafe-thricified-stack.json`, `.bitcode/v38-prompt-benchmark-report.json`, V38 gate-quality workflow evidence, and future V38 generated proof artifacts as gates close
- Source parity state: V38 source-side inference stack, prompt benchmarking, Reading pipeline, depository-search, telemetry, rehearsal, workflow, and promotion surfaces are draft-required until their gates close
- Spec companion: `BITCODE_SPEC_V38.md`
- Notes companion: `BITCODE_SPEC_V38_NOTES.md`
- Delta companion: `BITCODE_SPEC_V38_DELTA.md`
- Generated proof appendix: `BITCODE_SPEC_V38_PROVEN.md` only after V38 promotion
- Scope: V38 parity ledger for inference stack correctness, prompt and PromptPart benchmarking, Reading pipeline inference, depository fit-finding, tool prompt definitions, telemetry, rehearsal, and promotion readiness over promoted V37 Website Conversations canon

## Purpose

The V38 parity matrix prevents Bitcode inference from becoming hidden prompt folklore, direct provider-call drift, one-off search code, or telemetry that cannot be audited.
Every V38 gate must name the primitive stack it uses, source evidence, generated artifacts, tests, prompt identities, disclosure tiers, depository-search channels, typed outputs, proof roots, and fail-closed repair posture.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V37.md`
- `BITCODE_SPEC_V37_PROVEN.md`
- `BITCODE_SPEC_V38.md`
- `BITCODE_SPEC_V38_DELTA.md`
- `BITCODE_SPEC_V38_NOTES.md`
- `BITCODE_SPEC_V38_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `packages/protocol/README.md`
- `protocol-demonstration/README.md`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`
- `packages/protocol/data/state.json`
- `packages/agent-generics/src/steps/failsafe-sequence.ts`
- `packages/agent-generics/src/steps/thricified-generation.ts`
- `packages/agent-generics/src/agents/factories.ts`
- `packages/tools-generics/src/Tool.ts`
- `packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts`
- `packages/tools-generics/src/doc-code-tool/formatUsableTools.ts`
- `packages/pipelines/asset-pack/src/reading-pipeline-contract.ts`
- `packages/pipelines/asset-pack/src/read-need.ts`
- `packages/pipelines/asset-pack/src/depository-search.ts`
- `packages/pipelines/asset-pack/src/tools/AssetPackLexicalDepositorySearchTool.ts`
- `scripts/check-v38-gate1-inference-stack-roadmap-opening.mjs`
- `.bitcode/v38-inference-surface-inventory.json`
- `packages/protocol/src/canonical/inference-surface-inventory.js`
- `packages/protocol/test/v38-inference-surface-inventory.test.js`
- `scripts/generate-v38-inference-surface-inventory.mjs`
- `scripts/check-v38-gate2-inference-surface-inventory.mjs`
- `.bitcode/v38-ptrr-failsafe-thricified-stack.json`
- `packages/protocol/src/canonical/ptrr-failsafe-thricified-stack.js`
- `packages/protocol/test/v38-ptrr-failsafe-thricified-stack.test.js`
- `scripts/generate-v38-ptrr-failsafe-thricified-stack.mjs`
- `scripts/check-v38-gate3-ptrr-failsafe-thricified-stack.mjs`
- `.bitcode/v38-prompt-benchmark-report.json`
- `packages/protocol/src/canonical/prompt-benchmark-report.js`
- `packages/protocol/test/v38-prompt-benchmark-report.test.js`
- `scripts/generate-v38-prompt-benchmark-report.mjs`
- `scripts/check-v38-gate4-prompt-benchmark-report.mjs`

No `_legacy/` source is active source truth.

## V38 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V38.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v38/gate-1-inference-stack-roadmap-opening` | drafted | V38 family validates in draft mode over active V37 and `check:v38-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V37 active, V38 draft, and coherent post-V38 responsibility. |
| Inference vocabulary | Gate 1 | `PipelineExecution`, PTRR Plan/Try/Refine/Retry, `FailsafeGenerationSequence`, `ThricifiedGeneration`, `ToolExecution`, `DocCodeToolPrompt` | drafted | Spec family uses primitive names without overlapping terminology or replacement abstractions. |
| Reading pipeline scope | Gate 1 | `ReadNeedComprehensionSynthesis`, `ReadFitsFindingSynthesis`, Reading pipeline contracts | drafted | Gate plan names both Reading pipelines and their inference, storage, telemetry, and source-safe disclosure obligations. |
| Depository search scope | Gate 1 | depository-search source and tools, embedding policy, fit ranking expectations | drafted | Gate plan requires many-candidate Finding Fits across lexical, symbolic, path, metadata, measurement, vector, and provider channels. |
| Prompt benchmarking scope | Gate 1 | PromptPart and prompt benchmarking source anchors | drafted | Gate plan requires semantically divided PromptParts and complete Prompts to be benchmarkable. |
| Telemetry disclosure scope | Gate 1 | V35 telemetry law, V37 stream UI law, V38 inference notes | drafted | Gate plan requires source-safe prompt, raw response, parsed output, schema verdict, retry, and repair visibility at permitted tiers. |
| Inference surface inventory | Gate 2 | `V38InferenceSurfaceInventory`, `.bitcode/v38-inference-surface-inventory.json`, protocol test, generator, checker, workflows | closed | Source-safe inventory covers Reading, Conversation, tool-definition prompt, interface entrypoint, prompt registry, and execution primitive families with 52 PTRR steps and later-gate gaps explicit. |
| PTRR Failsafe and Thricified execution stack | Gate 3 | `V38PtrrFailsafeThricifiedStack`, `.bitcode/v38-ptrr-failsafe-thricified-stack.json`, protocol test, generator, checker, workflows | closed | Practical PTRR agents prove four steps, three Failsafe stages, three ThricifiedGeneration stages, 69 source predicates, and Gate 2 count binding with step-owned tools. |
| PromptPart and Prompt benchmarking | Gate 4 | `V38PromptBenchmarkReport`, `.bitcode/v38-prompt-benchmark-report.json`, protocol test, generator, checker, workflows | closed | Source-safe benchmark report covers active Reading, Conversation, and tool-definition PromptParts and complete Prompts with 7 rows, 13 fixtures, 24 typed-output quality expectations, and 38 passed source predicates. |

## V38 implementation checklist

| Area | Required V38 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V37` during V38 gate work | drafted |
| Gate branch pattern | V38 work happens on `version/v38` or `v38/gate-N-*` branches | drafted |
| Spec-family shape | V38 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v38-gate1` fails closed on stale posture, missing roadmap truth, missing inference scope, missing depository-search scope, or missing workflow wiring | drafted |
| Gate-quality workflow | Gate workflow validates V37 active / V38 draft posture and the V38 Gate 1 checker | drafted |
| Canon-quality workflow | Canon workflow validates promoted V37 canon, V38 draft family when present, and V37/V38 posture | drafted |
| Package docs | README, protocol package README, demonstration README, and PR template state V37 active / V38 draft workflow | drafted |
| Inference surface inventory | `.bitcode/v38-inference-surface-inventory.json` and `V38InferenceSurfaceInventory` are generated, tested, checked, documented, and workflow-wired as `source-safe-inference-surface-metadata` | closed |
| PTRR stack artifact | `.bitcode/v38-ptrr-failsafe-thricified-stack.json` and `V38PtrrFailsafeThricifiedStack` are generated, tested, checked, documented, and workflow-wired as `source-safe-ptrr-failsafe-thricified-stack-metadata` | closed |
| Prompt benchmark artifact | `.bitcode/v38-prompt-benchmark-report.json` and `V38PromptBenchmarkReport` are generated, tested, checked, documented, and workflow-wired as `source-safe-prompt-benchmark-metadata` | closed |
| Inference stack vocabulary | V38 spec family names `PipelineExecution`, PTRR agents, Plan, Try, Refine, Retry, `FailsafeGenerationSequence`, `ThricifiedGeneration`, `ToolExecution`, `DocCodeToolPrompt`, and provider call boundaries | drafted |
| Reading vocabulary | V38 spec family names `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis` | drafted |
| Depository search vocabulary | V38 spec family names lexical, symbolic, path, metadata, measurement, embedding/vector, provider-specific channels, candidate deposits, ranking, thresholds, and selected-fit provenance | drafted |
| Embedding policy | V38 spec family preserves `text-embedding-3-small`, 1536 dimensions, cosine `match_deliverable_vectors` until a tested migration exists | drafted |
| Disclosure boundary | V38 telemetry exposes prompt and inference evidence only by disclosure tier and blocks protected source, credentials, unpaid AssetPack source, wallet private material, and private settlement payloads | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V38 judgment |
| --- | --- | --- |
| V38 draft family exists | `BITCODE_SPEC_V38.md`, `BITCODE_SPEC_V38_DELTA.md`, `BITCODE_SPEC_V38_NOTES.md`, `BITCODE_SPEC_V38_PARITY_MATRIX.md` | drafted |
| Active pointer remains V37 | `BITCODE_SPEC.txt` | drafted |
| Branch posture is correct | `version/v38`, `v38/gate-1-inference-stack-roadmap-opening` | drafted |
| Loose V38 notes are retained | `BITCODE_SPEC_V38_NOTES.md` | drafted |
| Failsafe above Thricified is specified | `packages/agent-generics/src/steps/failsafe-sequence.ts`, `packages/agent-generics/src/steps/thricified-generation.ts`, V38 SPEC/NOTES | drafted |
| PTRR agent naming is precise | `packages/agent-generics/src/agents/factories.ts`, V38 SPEC/DELTA | drafted |
| Tool prompt definitions are included | `packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts`, `packages/tools-generics/src/doc-code-tool/formatUsableTools.ts`, V38 SPEC/NOTES | drafted |
| Reading pipeline scope is exact | `packages/pipelines/asset-pack/src/reading-pipeline-contract.ts`, `packages/pipelines/asset-pack/src/read-need.ts`, V38 SPEC/DELTA | drafted |
| Finding Fits is plural and depository-wide | `packages/pipelines/asset-pack/src/depository-search.ts`, V38 SPEC/DELTA | drafted |
| Gate checker is wired | `scripts/check-v38-gate1-inference-stack-roadmap-opening.mjs`, `package.json`, workflows | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V38 judgment |
| --- | --- | --- |
| Inventory source is package-owned | `packages/protocol/src/canonical/inference-surface-inventory.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Deterministic artifact exists | `.bitcode/v38-inference-surface-inventory.json` | closed |
| Source-safe disclosure posture is explicit | `source-safe-inference-surface-metadata`, forbidden payload classes, disclosure tier catalog | closed |
| Reading pipelines are counted | `ReadNeedComprehensionSynthesis`, `ReadFitsFindingSynthesis`, `packages/pipelines/asset-pack/src/reading-pipeline-contract.ts` | closed |
| Conversation and interface inference rows are counted | Website Conversations, stream-event entrypoints, conversation quick-response repair gap | closed |
| Tool-definition prompt surfaces are counted | `DocCodeToolPrompt`, `formatUsableTools`, depository-search tool definitions | closed |
| Prompt registry and benchmark carryforward is visible | prompt registry row plus Gate 4 benchmark gap | closed |
| Execution primitive stack is named | `PipelineExecution`, PTRR agents, `FailsafeGenerationSequence`, `ThricifiedGeneration`, `ToolExecution`, provider call slots | closed |
| Count contract is explicit | 13 phase/surface groups, 13 PTRR agents, 52 PTRR steps, 156 Failsafe/Thricified chains, 468 provider-call slots, 9 tool/tool-definition surfaces | closed |
| Gate checker is wired | `pnpm run check:v38-gate2`, package test, generator check, gate/canon workflows | closed |

## Gate 3 Parity

| Requirement | Source evidence | Current V38 judgment |
| --- | --- | --- |
| Stack source is package-owned | `packages/protocol/src/canonical/ptrr-failsafe-thricified-stack.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Deterministic artifact exists | `.bitcode/v38-ptrr-failsafe-thricified-stack.json` | closed |
| Source-safe disclosure posture is explicit | `source-safe-ptrr-failsafe-thricified-stack-metadata`, forbidden payload classes, no protected source, credentials, or unpaid AssetPack source | closed |
| PTRR carrier is complete | `factoryAgentWithPTRR`, agent prompt carrier, Plan/Try/Refine/Retry step prompt registries | closed |
| Practical steps delegate through Failsafe | `factoryPlanStep`, `factoryTryStep`, `factoryRefineStep`, `factoryRetryStep`, `createFailsafeGenerationSequence` | closed |
| Failsafe delegates to Thricified | `createFailsafeGenerationSequence`, `createThricifiedGeneration`, prepare-concise-context, chunk-then-sum, stitch-until-complete | closed |
| Thricified remains lowest-level inference chain | Reason, Judge, StructuredOutput, provider-call slots, typed schema output | closed |
| Substep prompt/context telemetry is stored | `factoryLLMSubStep`, FailsafeExecution, GenerationExecution, hierarchical prompt, `llm.input`, `llm.prompt`, `llm.output`, `llm.parsedOutput` | closed |
| Tools are step-owned | Plan/Try/Refine conditional postprocess, Retry after final attempt, `ToolExecution` outside `ThricifiedGeneration` | closed |
| Gate 2 counts are bound | 52 PTRR steps, 156 Failsafe sequences, 156 ThricifiedGeneration chains, 468 provider-call slots | closed |
| Gate checker is wired | `pnpm run check:v38-gate3`, package test, generator check, gate/canon workflows | closed |

## Gate 4 Parity

| Requirement | Source evidence | Current V38 judgment |
| --- | --- | --- |
| Benchmark report source is package-owned | `packages/protocol/src/canonical/prompt-benchmark-report.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Deterministic artifact exists | `.bitcode/v38-prompt-benchmark-report.json` | closed |
| Source-safe disclosure posture is explicit | `source-safe-prompt-benchmark-metadata`, fixture ids, typed-output quality ids, raw prompt text private, raw provider response private | closed |
| Benchmark runner and suite types are included | `packages/prompts/src/benchmarking/runner.ts`, `packages/prompts/src/benchmarking/types.ts`, `packages/prompts/src/developing/doc-comment-developing.ts` | closed |
| Generic PromptParts are benchmarkable | generic PTRR, Failsafe, ThricifiedGeneration, formatting, and DocCode PromptParts | closed |
| Reading PromptParts are benchmarkable | `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis` specific PromptParts and typed-output quality fixtures | closed |
| Complete Reading Prompts are benchmarkable | `packages/pipelines/asset-pack/src/agents/prompts`, `packages/pipelines/asset-pack/src/reading-pipeline-contract.ts` | closed |
| Conversation Prompt is benchmarkable | `BitcodeTerminalConversationSystemPrompt` benchmark row with route-local source-safe fixture | closed |
| Tool-definition Prompts are benchmarkable | `DocCodeToolPrompt`, `formatUsableTools`, web-search, repository-evidence search, and VCS PR tool prompts | closed |
| Count contract is explicit | 7 rows, 13 fixtures, 24 typed-output quality expectations, 38 source predicates, 443 PromptPart doc-comments, 39 complete Prompt doc-comments, 465 benchmark definitions, 275 PromptPart exports, and 85 Prompt constructions | closed |
| Gate checker is wired | `pnpm run check:v38-gate4`, package test, generator check, gate/canon workflows | closed |

## Completion condition

Gate 4 closes when `pnpm run check:v38-gate4`, the V38 prompt benchmark report generator check, Gate 3 PTRR/Failsafe/Thricified stack checks, Gate 2 inventory checks, V38 draft spec-family validation over V37, V37/V38 canon-posture drift validation, canonical input validation for V37, strict V38 spec quality, protocol tests, workflow wiring checks, secret scans, and diff hygiene all pass on `v38/gate-4-promptpart-prompt-benchmarking`.

## accepted boundaries

- V38 draft work may specify and implement inference stack, prompt benchmarking, Reading search, telemetry, rehearsal, and promotion-readiness surfaces.
- V38 draft work may not change BTD supply law, production-mainnet admission, route versioning discipline, settlement finality law, or source visibility rights without a later explicit promoted canon.
- V38 parity rows begin as drafted during Gate 1 and must become closed only as each gate's source, tests, generated artifacts, and workflow evidence land.
