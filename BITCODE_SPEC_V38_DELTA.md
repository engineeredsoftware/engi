# Bitcode Spec V38 Delta

## Status

- Version: `V38`
- V38 state: active draft opening over promoted V37
- Current canonical/latest target: `V37`
- Prior canonical anchor: `BITCODE_SPEC_V37.md`
- Prior generated proof appendix: `BITCODE_SPEC_V37_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v38-spec-family-report.json`, `.bitcode/v38-canonical-input-report.json`, `.bitcode/v38-canon-posture-drift-report.json`, `.bitcode/v38-inference-surface-inventory.json`, V38 gate-quality workflow evidence, and future V38 generated proof artifacts as gates close
- Source parity state: V38 source-side inference stack, prompt benchmarking, Reading pipeline, depository-search, telemetry, rehearsal, workflow, and promotion surfaces are draft-required until their gates close
- Spec companion: `BITCODE_SPEC_V38.md`
- Notes companion: `BITCODE_SPEC_V38_NOTES.md`
- Parity companion: `BITCODE_SPEC_V38_PARITY_MATRIX.md`
- Generated proof appendix: `BITCODE_SPEC_V38_PROVEN.md` only after V38 promotion
- Scope: V38 delta for inference stack correctness, Reading inference, fit-finding depository search, prompt benchmarking, telemetry, and promotion readiness over promoted V37 Website Conversations canon

## Why V38 exists

V37 promoted Website Conversations.
That made route-local conversation sessions, streaming UI, writing, source selection, Terminal handoff, persistence, privacy, telemetry, and rehearsal visible enough for enterprise product use.

V38 exists because Bitcode now needs the inference stack beneath Reading, Conversations, tools, and depository search to become explicit, testable, benchmarkable, and commercially reliable.
V38 closes implementation gaps in how PTRR agents, Failsafe chains, ThricifiedGeneration, prompt registries, PromptParts, tool prompts, telemetry, context ancestry, and Reading search/synthesis work together.

## Accepted V38 decisions

- V37 remains active canon during V38 drafting.
- V38 gate branches are opened from `version/v38` and merged back only when their gate acceptance criteria are closed.
- V38 owns inference correctness across Reading pipelines, Website Conversations, tool-definition prompts, and interface-specific inference entrypoints.
- All practical PTRR agent steps should use `FailsafeGenerationSequence` above `ThricifiedGeneration`; any exception must be source-backed, specified, and tested.
- `ThricifiedGeneration` remains the lowest-level Reason, Judge, StructuredOutput chain.
- Tools are step-owned capabilities, and their doc-comment definitions must be injected into final prompt material through `DocCodeToolPrompt` and `formatUsableTools`.
- Prompt registry composition, interpolation bindings, raw responses, parsed typed results, schema verdicts, retries, repairs, and execution ancestry roots must be telemetry-visible at permitted disclosure tiers.
- `ReadFitsFindingSynthesis` must discover many candidate fits above threshold, not merely one candidate, before AssetPack synthesis and settlement handoff.
- Fit-finding must preserve the active OpenAI embedding policy (`text-embedding-3-small`, 1536 dimensions, cosine `match_deliverable_vectors`) unless a replacement is explicitly specified, tested, and migrated.

## Explicitly deferred

- Production-mainnet value-bearing launch remains blocked.
- Bridge chain-of-record implementation remains deferred.
- V38 does not reopen BTD supply law, Exchange law, or Bitcoin settlement law except for inference and fit-finding traceability needed by AssetPack preview and post-settlement delivery.
- New LlamaIndex, Pinecone, or provider-specific search channels may be specified only after boundaries, credentials, storage, telemetry, and tests are explicit.

## Pre-Implementation Sequence

1. Open `version/v38` from promoted `main`.
2. Open `v38/gate-1-inference-stack-roadmap-opening` from `version/v38`.
3. Create the V38 SPEC, DELTA, NOTES, and PARITY family while preserving `BITCODE_SPEC.txt -> V37`.
4. Refresh `SPECIFICATIONS_ROADMAP.md` so V37 is active canon, V38 is draft target, and post-V38 work remains coherent.
5. Retarget gate-quality and canon-quality workflow posture checks to V37 active / V38 draft.
6. Add `check:v38-gate1` and a V38 Gate 1 checker.
7. Define V38 gates, acceptance criteria, carryforward parity rows, and promotion boundaries.
8. Validate spec family, canonical inputs, canon posture, workflows, roadmap truth, README/docs, and diff hygiene.
9. Push the gate branch and open a pull request to `version/v38`.

## Commit-Body Direction

V38 gate commit bodies should describe the closed gate, inference surfaces, prompt/promptpart changes, pipeline or tool changes, generated proof artifacts, tests, telemetry/disclosure boundaries, and accepted deferrals.
The eventual V38 promotion commit body must name all closed V38 gates, generated inference proof artifacts, prompt benchmark reports, Reading pipeline evidence, depository-search evidence, source-safe telemetry evidence, local/staging rehearsal proof, promotion workflow evidence, and the `BITCODE_SPEC.txt` pointer change from `V37` to `V38`.

## Gate Delta

### Gate 1: V38 Inference Stack Roadmap And Spec Opening

Gate 1 opens V38 correctly:

- V38 SPEC, DELTA, NOTES, and PARITY files exist.
- `BITCODE_SPEC.txt` remains `V37`.
- README, roadmap, PR template, package docs, demonstration docs, and workflows describe V37 active / V38 draft posture.
- `check:v38-gate1` validates branch naming, spec family, notes, parity, roadmap truth, workflow posture, inference vocabulary, depository-search vocabulary, and promotion boundaries.
- The V38 gate list is explicit before inference implementation begins.

### Gate 2: Inference Surface Inventory And Prompt Registry Map

Closure acceptance:

- every active Reading, Conversation, tool-definition, and interface inference point is counted;
- phase, PTRR agent, step, Failsafe, ThricifiedGeneration, tool, prompt, PromptPart, interpolation binding, context field, output schema, failure surface, storage target, and stream target inventories are package-backed and generated;
- `pnpm run check:v38-gate2` validates inventory freshness, source coverage, prompt registry coverage, source-safety boundaries, and workflow wiring.

Closure implementation:

- `V38InferenceSurfaceInventory` is now package-backed in `packages/protocol/src/canonical/inference-surface-inventory.js` and generated to `.bitcode/v38-inference-surface-inventory.json`.
- The generated artifact is `source-safe-inference-surface-metadata` and covers `ReadNeedComprehensionSynthesis`, `ReadFitsFindingSynthesis`, Website Conversations, tool-definition prompts, interface entrypoints, prompt registry coverage, and execution primitive rows.
- The current inventory count is 52 PTRR steps, 156 Failsafe/Thricified chains, 468 provider-call slots, and 9 tool/tool-definition surfaces, with known follow-on gaps carried to later V38 gates.

### Gate 3: PTRR Failsafe And Thricified Execution Stack

Closure acceptance:

- practical PTRR steps use `FailsafeGenerationSequence` over `ThricifiedGeneration`;
- Plan, Try, Refine, Retry steps preserve agent, step, Failsafe, generation, and provider-call ancestry;
- exceptions are source-backed and tested;
- `pnpm run check:v38-gate3` validates stack composition, typed output repair, and telemetry events.

### Gate 4: PromptPart And Prompt Benchmarking

Closure acceptance:

- PromptParts and complete Prompts are benchmarkable;
- active Reading, Conversation, and tool-definition prompts have initial benchmark suites;
- benchmark artifacts preserve prompt identities, fixtures, typed-output quality expectations, and disclosure tiers;
- `pnpm run check:v38-gate4` validates benchmark runner, fixtures, reports, and source-safe metadata.

### Gate 5: Inference Telemetry And Disclosure Tiers

Closure acceptance:

- inference telemetry emits phase, agent, step, Failsafe, ThricifiedGeneration, tool, prompt template, interpolated prompt, raw response, parsed output, schema verdict, retry, repair, and failure events;
- each event has disclosure-tier rules;
- protected payloads remain blocked or redacted;
- `pnpm run check:v38-gate5` validates event contracts, UI stream compatibility, API contracts, and redaction tests.

### Gate 6: ReadNeedComprehensionSynthesis Inference Hardening

Closure acceptance:

- Read Request to Need synthesis uses the V38 inference stack;
- synthesized Needs are reviewable, resynthesizable with feedback, measurement-backed, and bounded to the original request;
- storage and telemetry are source-safe and typed;
- `pnpm run check:v38-gate6` validates pipeline contracts, agents, prompts, outputs, tests, and docs.

### Gate 7: ReadFitsFindingSynthesis Depository Search And Embeddings

Closure acceptance:

- Finding Fits uses inference-derived queries and depository search tools across lexical, symbolic, path, metadata, measurement, embedding/vector, and provider-specific channels;
- candidate deposits above threshold are ranked, verified, and traceable;
- embedding policy, vector dimensions, similarity metric, storage, credentials, and telemetry are explicit;
- `pnpm run check:v38-gate7` validates search tools, embeddings, ranking, thresholding, tests, and generated evidence.

### Gate 8: AssetPack Synthesis Handoff And Economic Traceability

Closure acceptance:

- selected fits remain traceable into AssetPack synthesis;
- source-safe preview and post-settlement delivery preserve visibility boundaries;
- contributor compensation, ledger/database synchronization, proof receipts, and repair paths are specified and tested;
- `pnpm run check:v38-gate8` validates fit-to-AssetPack receipts, settlement traceability, source-safety, and repair posture.

### Gate 9: Conversation And Tool-Prompt Inference Parity

Closure acceptance:

- Website Conversations and tool-definition prompts use V38 prompt registry, Failsafe, Thricified, tool prompt, telemetry, and disclosure posture;
- interface-specific inference entrypoints do not bypass the stack;
- `pnpm run check:v38-gate9` validates Conversation/tool parity, route contracts, UI surfaces, and prompt disclosure rules.

### Gate 10: Local Staging Inference And Depository Search Rehearsal

Closure acceptance:

- local and staging-testnet rehearsals run Reading inference, depository search, source-safe AssetPack preview, telemetry streaming, and blocked mainnet posture;
- real non-mocked inference is exercised where credentials are available;
- logs/screenshots/proofs are source-safe;
- `pnpm run check:v38-gate10` validates rehearsal evidence and workflow wiring.

### Gate 11: V38 Promotion Readiness

Closure acceptance:

- all V38 gates are closed;
- V38 generated proof appendix support exists;
- promotion workflow validates V38 and commits only the canonical pointer and generated promotion artifacts;
- `pnpm run check:v38-gate11` validates promotion readiness, source-safety, generated artifacts, and V39 draft posture preparation.
