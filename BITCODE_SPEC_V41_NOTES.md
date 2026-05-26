# Bitcode Spec V41 Notes

## Status

- Version: `V41`
- V41 state: draft opened; V41 notes now accompany the full prompt-program specification family
- Current canonical/latest target: `V40`
- Canonical pointer: `BITCODE_SPEC.txt` -> `V40`
- Prior canonical anchor: `BITCODE_SPEC_V40.md`
- Prior generated proof appendix: `BITCODE_SPEC_V40_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v41-spec-family-report.json`, draft `.bitcode/v41-canonical-input-report.json`, Gate 2 `.bitcode/v41-promptpart-prompt-inventory.json`, planned benchmark artifacts, planned promotion-readiness artifact, and eventual `BITCODE_SPEC_V41_PROVEN.md` after V41 promotion
- Source parity state: V41 notes track prompt-program planning, catalogue, benchmark, rewrite, telemetry, and promotion parity over active V40
- Draft target posture: V41 Gate 1 creates the full SPEC, DELTA, NOTES, and PARITY family.
- Scope: Prompt and PromptPart excellence over the promoted V40 exhaustive testing base.

## Notes companion rule

This notes companion records the working prompt-program plan and simplified reading for V41.
It does not override `BITCODE_SPEC_V41.md`.
Prompt content changes remain blocked until the relevant catalogue and benchmark gates admit them.

## Gate 2 prompt inventory note

Gate 2 makes the first prompt-program catalogue concrete.
The package-backed inventory currently emits 1,459 raw PromptPart rows and 105 composed Prompt rows with source path, source hash, registry owner, semantic purpose id, prompt family ids, composed prompt memberships, template variable names, benchmark fixture ids, disclosure tier, validation command, and source-safe raw-payload exclusions.
This is an inventory and admission artifact, not a rewrite artifact.

## V42 forward roadmap note

V42 is re-roadmapped as the MVP experience version after V41.
Its focus is shortest-path Depositing, shortest-path Reading, and a strong AI-reading dominant demonstration where any deposit source can contribute proprietary or otherwise non-public training, prompt, context, or evaluation material to an AssetPack that measurably improves an AI system beyond public-data-only performance.
V42 must keep depositor compensation, reader purchase, BTD/AssetPack rights, and repository delivery visible in the shortest path without widening V41 beyond Prompt and PromptPart excellence.

## Concise current-system reading

Bitcode is active at V40.
V41 now drafts the next canon: every PromptPart and composed Prompt must become catalogue-visible, benchmarkable, registry-bound, interpolation-checked, parser-typed, and source-safe.
The first priority is Reading through `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`; Conversation, tool-definition, and interface prompts follow with the same discipline.

## Simplified-spec reading rule

Read V41 as prompts as programs.
If a prompt cannot be found in the catalogue, traced through a registry, benchmarked against fixtures, tied to a parsed return type, and projected source-safely into telemetry, it is not V41-ready.

## Notes-only draft rule

This heading is retained as historical context only.
V41 is no longer notes-only after Gate 1; the full V41 specification family is the draft target.

## Deferred from V40

V40 deliberately stopped at exhaustive commercial application testing, browser proof, integration coverage, ledger/storage synchronization, local/staging rehearsal automation, and prompt benchmark smoke.
V41 inherits that tested base and now concentrates on prompts as programs.

Deferred V41 work must account for:

- Bitcoin: prompt changes must preserve BTC fee, settlement, rights, and disclosure boundaries.
- GitHub: prompt changes must preserve source-safe pull-request delivery and repository-bound Reading context.
- compute: prompt benchmarks and inference callsite audits must remain runnable in local and staged compute lanes.
- storage: prompt catalogues, benchmark outputs, and telemetry roots must avoid serializing protected prompt payloads, raw provider responses, secrets, or unpaid AssetPack source.
- build/process: V41 must add gate checks, package tests, generated reports, and workflow coverage before any prompt rewrite is considered closed.

## Candidate V41 workstreams

- Open the V41 full specification family and roadmap gate plan.
- Catalogue every raw PromptPart and every composed Prompt used by Reading, Conversation, tool-definition, and interface inference.
- Audit every registry edge, interpolation variable, prompt template, context binding, benchmark fixture, benchmark output, inference callsite, and parsed return type.
- Repartition PromptParts into meaningfully benchmarkable semantic units where the current division hides testable purpose.
- Retitle and rewrite PromptParts and Prompts only where benchmark and callsite evidence show measurable quality or maintainability improvement.
- Harden Prompt and PromptPart benchmark commands so smoke, focused, and promotion suites can compare prompt-program behavior without exposing protected content.
- Prioritize `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`, then apply the same catalogue and benchmark discipline to Conversation and other inference prompts.

## Non-goals during V41 opening

- Do not change prompt content before V41 Gate 1 defines the full gate plan and proof surfaces.
- Do not expose protected prompts, raw provider responses, secrets, wallet material, unpaid AssetPack source, private settlement payloads, or source-bearing delivery content in generated artifacts or tests.
- Do not weaken V38 inference call-stack requirements or V40 testing requirements to make prompt changes easier.
- Do not reopen V40 testing gates unless V41 finds a concrete regression that must be repaired before prompt-program work can proceed.
