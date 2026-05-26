# Bitcode Spec V41 Parity Matrix

## Status

- Version: `V41`
- V41 state: Gate 9 promotion readiness implemented; V41 parity covers prompt-program specification through promotion readiness
- Current canonical/latest target: `V40`
- Prior canonical anchor: `BITCODE_SPEC_V40.md`
- Prior generated proof appendix: `BITCODE_SPEC_V40_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v41-spec-family-report.json`, draft `.bitcode/v41-canonical-input-report.json`, Gate 2 `.bitcode/v41-promptpart-prompt-inventory.json`, Gate 3 `.bitcode/v41-registry-interpolation-contracts.json`, Gate 4 `.bitcode/v41-reading-prompt-benchmark-baselines.json`, Gate 5 `.bitcode/v41-readneed-prompt-hardening.json`, Gate 6 `.bitcode/v41-readfitsfinding-prompt-hardening.json`, Gate 7 `.bitcode/v41-conversation-tool-interface-prompt-rewrite.json`, Gate 8 `.bitcode/v41-prompt-program-benchmark-report.json`, Gate 9 `.bitcode/v41-promotion-readiness-report.json`, and eventual `BITCODE_SPEC_V41_PROVEN.md` after V41 promotion
- Source parity state: Gate 1 through Gate 9 close spec, roadmap, docs, package scripts, workflow posture, prompt inventory, registry/interpolation contracts, benchmark baselines, prompt rewrites, benchmark telemetry, and promotion-readiness parity
- Scope: V41 draft parity ledger for Prompt and PromptPart excellence
- Last fully realized canonical target preserved in source: `V40`

## Purpose

This matrix records the prompt-program surfaces that must become promotion-grade before V41 can replace V40 as active canon.

## Audit basis

- `BITCODE_SPEC.txt` -> `V40`
- `BITCODE_SPEC_V40.md`
- `BITCODE_SPEC_V40_PROVEN.md`
- `BITCODE_SPEC_V41.md`
- `BITCODE_SPEC_V41_DELTA.md`
- `BITCODE_SPEC_V41_NOTES.md`
- prompt, registry, pipeline, Conversation, tool-definition, benchmark, and telemetry source roots

## V41 implementation matrix

| Area | Required V41 result | Source evidence | Judgment |
| --- | --- | --- | --- |
| Draft family | V41 SPEC, DELTA, NOTES, and PARITY files exist over active V40 | `BITCODE_SPEC_V41.md` family | drafted |
| Roadmap truth | Roadmap states V40 active, V41 draft, prompt-program Gate 1 active | `SPECIFICATIONS_ROADMAP.md` | drafted |
| Gate workflow | Gate quality knows active V40 / draft V41 and promoted V41 / draft V42 posture | `.github/workflows/bitcode-gate-quality.yml` | implemented |
| Canon workflow | Canon quality knows active V40 / draft V41 and promoted V41 / draft V42 posture | `.github/workflows/bitcode-canon-quality.yml` | implemented |
| Prompt inventory | Every raw PromptPart and composed Prompt catalogued | `.bitcode/v41-promptpart-prompt-inventory.json` | implemented |
| Registry/interpolation | Registry composition and interpolation contracts proven | `.bitcode/v41-registry-interpolation-contracts.json` | implemented |
| Reading baselines | Reading prompt benchmarks captured before rewrites | `.bitcode/v41-reading-prompt-benchmark-baselines.json` | implemented |
| ReadNeed rewrite | ReadNeedComprehensionSynthesis prompts rewritten and type-hardened | `.bitcode/v41-readneed-prompt-hardening.json` | implemented |
| Finding Fits rewrite | ReadFitsFindingSynthesis prompts rewritten for search and AssetPack context | `.bitcode/v41-readfitsfinding-prompt-hardening.json` | implemented |
| Conversation/tool/interface rewrite | Non-Reading prompt surfaces brought to same standard | `.bitcode/v41-conversation-tool-interface-prompt-rewrite.json` | implemented |
| Benchmark and telemetry | Prompt benchmark deltas and telemetry projections source-safe | `.bitcode/v41-prompt-program-benchmark-report.json` | implemented |
| Promotion readiness | V41 prompt-program proof and workflow promotion ready | `.bitcode/v41-promotion-readiness-report.json` | implemented |

## V41 implementation checklist

| Area | Closure requirement | Judgment |
| --- | --- | --- |
| Gate 1 | Open V41 family, roadmap, docs, workflow posture, package script, and checker | closed |
| Gate 2 | PromptPart and Prompt inventory artifact | implemented |
| Gate 3 | Registry composition and interpolation artifact | implemented |
| Gate 4 | Reading prompt benchmark baseline artifact | implemented |
| Gate 5 | ReadNeedComprehensionSynthesis rewrite artifact | implemented |
| Gate 6 | ReadFitsFindingSynthesis rewrite artifact | implemented |
| Gate 7 | Conversation, tool, and interface prompt rewrite artifact | implemented |
| Gate 8 | Prompt benchmark report and telemetry artifact | implemented |
| Gate 9 | Promotion readiness artifact and workflow | closed |

## Gate 9 Promotion readiness parity

| Area | Required V41 result | Source evidence | Judgment |
| --- | --- | --- | --- |
| Promotion artifact | Source-safe V41 prompt-program promotion report generated | `.bitcode/v41-promotion-readiness-report.json` | closed |
| Promotion workflow | Version branch PR into `main` validates and promotes V41 only after checks pass | `.github/workflows/v41-canon-promotion.yml` | closed |
| Promotion scripts | Canon promotion, spec-family promotion, runtime posture, and proven generation support V41 | `scripts/promote-bitcode-canon.mjs`, `scripts/prepare-bitcode-spec-family-promotion.mjs`, `packages/protocol/src/canonical/proven-generator.js` | closed |
| Post-promotion posture | Promotion rewrites runtime state to V41 active / draft V42 | `scripts/prepare-bitcode-runtime-canon-promotion.mjs` | closed |
| Disclosure boundary | Promotion report and generated proof use source-safe metadata only | `check:v41-gate9` | closed |

## V41 accepted boundaries

V41 Gate 1 may open specification, workflow, docs, and validation posture.
It may not rewrite prompt content.
Later gates may rewrite prompts only after catalogue, registry, interpolation, benchmark, parser, and disclosure checks exist.

V41 Gate 2 may catalogue PromptPart and Prompt metadata, hashes, registry owners, family ids, template variables, benchmark fixture ids, and validation commands.
It may not serialize raw prompt text, raw provider responses, protected source, secrets, or unpaid AssetPack source.
It also may record the V42 MVP roadmap posture as forward planning while preserving V41 as the active prompt-program draft target.

V41 Gate 3 may catalogue registry ids, interpolation key ids, missing-key behavior ids, context-handling ids, tool prompt injection ids, execution ancestry frame ids, parser target ids, source hashes, and predicate verdicts.
It may not serialize raw prompt text, raw provider responses, protected source, private context, credentials, settlement-private payloads, or unpaid AssetPack source.
It closes prompt rewrites' precondition that prompt composition and interpolation contracts are observable before semantic PromptPart or Prompt rewrite work proceeds.

V41 Gate 4 may catalogue Reading benchmark baseline ids, fixture ids, metric ids, parser target ids, source path roots, predicate verdicts, deterministic baseline scores, inventory bindings, registry/interpolation bindings, and source-safe disclosure tiers for `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`.
It may not serialize raw prompt text, interpolated prompts, provider responses, protected source, private context, credentials, settlement-private payloads, or unpaid AssetPack source.
It closes Reading prompt rewrites' benchmark precondition by proving source-safe baselines for all five Reading UX steps before semantic PromptPart or Prompt rewrite work starts.

V41 Gate 5 may catalogue ReadNeed hardening ids, prompt surface ids, parser target ids, benchmark fixture ids, dependency roots, source hashes, predicate verdicts, and disclosure posture.
It may not serialize raw prompt text, raw interpolated prompt text, raw provider responses, protected source, private context, secrets, wallet material, or unpaid AssetPack source.
It closes the first semantic prompt rewrite gate by proving ReadNeedComprehensionSynthesis is exact to the Read Request, source-constrained, strict-return-typed, review/resynthesis-gated, telemetry-redacted, and tool-prompt aligned before Finding Fits prompt work begins.

## V41 completion condition

V41 closes when prompt-program quality is fully specified, implemented, benchmarked, source-safe, tested, documented, generated, workflow-checked, and promotion-ready across Reading, Conversation, tool-definition, and interface inference surfaces.
