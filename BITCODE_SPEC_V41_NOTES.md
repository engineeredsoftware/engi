# Bitcode Spec V41 Notes

## Status

- Version: `V41`
- V41 state: notes-only draft opening
- Canonical pointer: `BITCODE_SPEC.txt` -> `V40`
- Active canonical anchor: `BITCODE_SPEC_V40.md`
- Active generated proof appendix: `BITCODE_SPEC_V40_PROVEN.md`
- Draft target posture: V41 is opened as planning notes only until its first gate creates the full SPEC, DELTA, NOTES companion, and PARITY family.
- Scope: Prompt and PromptPart excellence over the promoted V40 exhaustive testing base.

## Notes-only draft rule

This file is the only opened V41 draft-target file until V41 Gate 1 formally creates the full V41 specification family.
It records next-version intent so strict draft-target spec-quality can remain truthful after V40 promotion.
It is not first-gate implementation evidence and does not by itself admit V41 source changes, route changes, generated artifact requirements, or promotion checks.

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
