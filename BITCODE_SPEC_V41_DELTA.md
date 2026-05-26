# Bitcode Spec V41 Delta

## Status

- Version: `V41`
- V41 state: draft opened; this delta records the V40-to-V41 prompt-program opening plan
- Current canonical/latest target: `V40`
- Prior canonical anchor: `BITCODE_SPEC_V40.md`
- Prior generated proof appendix: `BITCODE_SPEC_V40_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v41-spec-family-report.json`, draft `.bitcode/v41-canonical-input-report.json`, planned prompt-program catalogue artifacts, planned benchmark artifacts, planned promotion-readiness artifact, and eventual `BITCODE_SPEC_V41_PROVEN.md` after V41 promotion
- Source parity state: V41 source parity begins at specification and workflow posture; prompt rewrites are explicitly deferred until catalogue and benchmark gates close
- Scope: V41 draft delta for Prompt and PromptPart excellence over promoted V40

## Why V41 exists

V38 hardened inference architecture and V40 hardened testing and benchmark lanes.
V41 uses that base to treat prompts as programs: enumerable, benchmarkable, typed, source-safe, and registry-bound.

## Accepted V41 decisions

- V41 is singularly focused on Prompt and PromptPart implementation quality.
- Reading prompts are the priority, especially `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`.
- Prompt rewrites require prior inventory, registry composition proof, interpolation proof, benchmark baselines, parsed return-type checks, and source-safe telemetry proof.
- Prompt artifacts may carry ids, hashes, metrics, verdicts, and redacted summaries, but not raw protected prompt text, raw provider responses, secrets, wallet material, protected source, private settlement payloads, or unpaid AssetPack source.
- V41 preserves V27 BTC/BTD law, V38 inference call-stack law, V39 Reading product law, and V40 testing law.

## V41 gate plan

### Gate 1: Prompt Program Roadmap And Spec Opening

Open the V41 full specification family, roadmap, package script, workflow posture, documentation posture, branch convention, and checker.

### Gate 2: PromptPart And Prompt Inventory Catalog

Inventory every raw PromptPart and composed Prompt across Reading, Conversation, tool-definition, and interface inference surfaces.
Gate 2 is package-backed by `buildV41PromptPartPromptInventory`, emits `.bitcode/v41-promptpart-prompt-inventory.json`, covers 1,459 raw PromptPart rows and 105 composed Prompt rows, binds V38/V40 benchmark handoff artifacts, and records only source-safe metadata.
It also records V42 as the subsequent MVP experience version for shortest-path Depositing, shortest-path Reading, and an AI-reading dominant demonstration without expanding V41 beyond prompt-program work.

### Gate 3: Registry Composition And Interpolation Contracts

Prove registry composition, prompt context interpolation, execution ancestry, tool prompt injection, and parsed return type bindings.

### Gate 4: Reading Pipeline Prompt Benchmark Baselines

Create source-safe baseline benchmarks for Reading prompt surfaces before rewriting them.

### Gate 5: ReadNeedComprehensionSynthesis Prompt Rewrite And Return-Type Hardening

Rewrite and repartition ReadNeed prompts only after evidence proves the rewrite improves exact Need comprehension and typed output reliability.

### Gate 6: ReadFitsFindingSynthesis Prompt Rewrite Search And AssetPack Context Hardening

Rewrite and repartition Finding Fits prompts only after evidence proves the rewrite improves Depository search, ranking, selected-fit provenance, and AssetPack context source-safely.

### Gate 7: Conversation Tool And Interface Prompt Rewrite

Apply the same prompt-program discipline to Conversation, tool-definition, MCP API, ChatGPT App, public API, Terminal, and other interface prompts.

### Gate 8: Prompt Benchmark Report And Telemetry Integration

Close post-rewrite benchmark deltas, prompt lineage, telemetry integration, and source-safe rich stream projections.

### Gate 9: Promotion Readiness

Bind all V41 prompt artifacts, tests, workflow checks, generated proof support, promotion commands, and active V41 / draft V42 posture.

## Explicitly deferred

- No prompt content is rewritten during Gate 1.
- New commercial product behavior is deferred unless needed to make prompt-program tests truthful.
- Production-mainnet value-bearing prompt rehearsals remain opt-in.

## Pre-Implementation Sequence

1. Open `version/v41` and `v41/gate-1-prompt-program-roadmap-opening`.
2. Keep `BITCODE_SPEC.txt` at `V40`.
3. Add the V41 spec family and Gate 1 checker.
4. Update roadmap, docs, package scripts, and workflows for active V40 / draft V41.
5. Validate V41 draft family and V40 active posture.

## Commit-Body Direction

V41 commits should name the prompt-program surface, generated artifact or checker, benchmark posture, registry/callsite scope, source-safety boundary, and tests run.
