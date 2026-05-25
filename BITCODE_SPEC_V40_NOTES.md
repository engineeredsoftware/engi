# Bitcode Spec V40 Notes

## Status

- Version: `V40`
- V40 state: draft opened; notes capture testing-depth requirements over promoted V39
- Current canonical/latest target: `V39`
- Prior canonical anchor: `BITCODE_SPEC_V39.md`
- Prior generated proof appendix: `BITCODE_SPEC_V39_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v40-spec-family-report.json`, `.bitcode/v40-canonical-input-report.json`, and later V40 testing artifacts
- Source parity state: V40 testing gates are planned and not yet closed

## Notes companion rule

These notes clarify V40 testing intent.
They are binding for V40 gate work while `BITCODE_SPEC.txt` remains `V39`, but the active canon remains V39 until V40 promotion.

## Concise current-system reading

V39 is active canon.
V40 is the draft target for exhaustive commercial application testing.
V41 is the next planned target and must focus singularly on Prompt and PromptPart implementation quality.

## Simplified-spec reading rule

Read V40 as: make Bitcode's commercial application provably tested across the whole product and infrastructure surface before changing prompt content deeply in V41.

## V40 testing emphasis

V40 must cover:

- browser E2E across all rich website interactions and state possibilities;
- visual and screenshot comparison proof;
- accessibility and responsive proof;
- API and route integration contracts;
- pipeline primitive tests and real Reading pipeline implementation tests;
- conversation integration and telemetry tests;
- ledger, database, object-storage, wallet, settlement, rights transfer, and delivery synchronization tests;
- unit tests for packages, primitives, isolated implementations, and real commercial implementations;
- prompt benchmark smoke proof to prepare V41.

## V41 prompt-program boundary

V41 should focus on Prompt and PromptPart implementation.
Every raw PromptPart and composed Prompt should be examined, benchmarked, semantically repartitioned where useful, retitled where useful, rewritten where benchmark evidence supports it, catalogued, and tied to inference callsites.
V41 treats prompts as programs: every prompt part, composition, interpolation binding, registry edge, benchmark fixture, and inference consumer must be precise enough to review, test, compare, and improve deliberately.
The primary V41 hardening surface is the Reading inference system, including `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`; conversational interactions and other inference points must receive the same prompt-catalogue treatment after the Reading spine is accounted.
V38's inference correctness hardening provides the call-stack scaffolding, and V40's benchmark/test work provides the measurement base that makes V41 prompt rewrites auditable instead of stylistic.
V40 should make those benchmarks runnable and trustworthy, not consume the prompt-rewrite scope.

## Candidate V40 workstreams

- Gate 1 opens specification, roadmap, workflow, and checker posture.
- Gate 2 inventories the whole test surface and missing coverage.
- Gate 3 closes unit coverage breadth.
- Gate 4 closes API and route integrations.
- Gate 5 closes Reading pipeline integration coverage.
- Gate 6 closes Conversation and Terminal integration coverage.
- Gate 7 closes browser, visual, accessibility, responsive, and screenshot proof.
- Gate 8 closes ledger/database/storage/wallet/delivery synchronization.
- Gate 9 closes local and staging-testnet rehearsals.
- Gate 10 closes prompt benchmark smoke and V41 readiness.
- Gate 11 closes promotion readiness.

## Gate 2 implementation notes

Gate 2 is closed by `V40TestInventoryCoverageMatrix`.
Its generated `.bitcode/v40-test-inventory-coverage-matrix.json` artifact names every major V40 testing surface, owner gate, source roots, command ids, generated artifact target, coverage tier, and missing-coverage closure gate.
This is an inventory and planning proof, not a substitute for the later Gate 3 through Gate 10 implementations.

## Gate 3 implementation notes

Gate 3 is closed by `V40UnitCoverageInventory`.
Its generated `.bitcode/v40-unit-coverage-inventory.json` artifact binds critical unit surfaces to package names, source roots, test paths, commands, and covered verdicts.
The covered surfaces include protocol report builders, BTD ledger/settlement/right primitives, prompt composition, PTRR agents, registry-backed tools, execution lineage, generic pipelines, Reading AssetPack units, pipeline hosts, isolated interface helpers, utility packages, and the demonstration/commercial boundary.
No missing, blocked, or exempt critical unit surface is allowed in the Gate 3 artifact.
