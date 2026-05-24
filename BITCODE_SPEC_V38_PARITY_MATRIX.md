# Bitcode Spec V38 Parity Matrix

## Status

- Version: `V38`
- V38 state: active draft opening over promoted V37
- Current canonical/latest target: `V37`
- Prior canonical anchor: `BITCODE_SPEC_V37.md`
- Prior generated proof appendix: `BITCODE_SPEC_V37_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v38-spec-family-report.json`, `.bitcode/v38-canonical-input-report.json`, `.bitcode/v38-canon-posture-drift-report.json`, V38 gate-quality workflow evidence, and future V38 generated proof artifacts as gates close
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

## Completion condition

Gate 1 closes when `pnpm run check:v38-gate1`, V38 draft spec-family validation over V37, V37/V38 canon-posture drift validation, canonical input validation for V37, and diff hygiene all pass on `v38/gate-1-inference-stack-roadmap-opening`.

## accepted boundaries

- V38 draft work may specify and implement inference stack, prompt benchmarking, Reading search, telemetry, rehearsal, and promotion-readiness surfaces.
- V38 draft work may not change BTD supply law, production-mainnet admission, route versioning discipline, settlement finality law, or source visibility rights without a later explicit promoted canon.
- V38 parity rows begin as drafted during Gate 1 and must become closed only as each gate's source, tests, generated artifacts, and workflow evidence land.
