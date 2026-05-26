# Bitcode Spec V41 Parity Matrix

## Status

- Version: `V41`
- V41 state: draft opened; V41 parity begins with prompt-program specification and workflow posture
- Current canonical/latest target: `V40`
- Prior canonical anchor: `BITCODE_SPEC_V40.md`
- Prior generated proof appendix: `BITCODE_SPEC_V40_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v41-spec-family-report.json`, draft `.bitcode/v41-canonical-input-report.json`, Gate 2 `.bitcode/v41-promptpart-prompt-inventory.json`, Gate 3 `.bitcode/v41-registry-interpolation-contracts.json`, planned benchmark artifacts, planned promotion-readiness artifact, and eventual `BITCODE_SPEC_V41_PROVEN.md` after V41 promotion
- Source parity state: Gate 1 closes spec, roadmap, docs, package script, workflow posture, and checker parity; Gate 2 closes source-safe prompt inventory parity; Gate 3 closes source-safe registry/interpolation contract parity; later gates own rewrite, benchmark, telemetry, and promotion parity
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
| Gate workflow | Gate quality knows active V40 and draft V41 Gate 1 | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon workflow | Canon quality knows active V40 and draft V41 Gate 1 | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| Prompt inventory | Every raw PromptPart and composed Prompt catalogued | `.bitcode/v41-promptpart-prompt-inventory.json` | implemented |
| Registry/interpolation | Registry composition and interpolation contracts proven | `.bitcode/v41-registry-interpolation-contracts.json` | implemented |
| Reading baselines | Reading prompt benchmarks captured before rewrites | planned V41 Gate 4 artifact | pending |
| ReadNeed rewrite | ReadNeedComprehensionSynthesis prompts rewritten and type-hardened | planned V41 Gate 5 artifact | pending |
| Finding Fits rewrite | ReadFitsFindingSynthesis prompts rewritten for search and AssetPack context | planned V41 Gate 6 artifact | pending |
| Conversation/tool/interface rewrite | Non-Reading prompt surfaces brought to same standard | planned V41 Gate 7 artifact | pending |
| Benchmark and telemetry | Prompt benchmark deltas and telemetry projections source-safe | planned V41 Gate 8 artifact | pending |
| Promotion readiness | V41 prompt-program proof and workflow promotion ready | planned V41 Gate 9 artifact | pending |

## V41 implementation checklist

| Area | Closure requirement | Judgment |
| --- | --- | --- |
| Gate 1 | Open V41 family, roadmap, docs, workflow posture, package script, and checker | closed |
| Gate 2 | PromptPart and Prompt inventory artifact | implemented |
| Gate 3 | Registry composition and interpolation artifact | implemented |
| Gate 4 | Reading prompt benchmark baseline artifact | pending |
| Gate 5 | ReadNeedComprehensionSynthesis rewrite artifact | pending |
| Gate 6 | ReadFitsFindingSynthesis rewrite artifact | pending |
| Gate 7 | Conversation, tool, and interface prompt rewrite artifact | pending |
| Gate 8 | Prompt benchmark report and telemetry artifact | pending |
| Gate 9 | Promotion readiness artifact and workflow | pending |

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

## V41 completion condition

V41 closes when prompt-program quality is fully specified, implemented, benchmarked, source-safe, tested, documented, generated, workflow-checked, and promotion-ready across Reading, Conversation, tool-definition, and interface inference surfaces.
