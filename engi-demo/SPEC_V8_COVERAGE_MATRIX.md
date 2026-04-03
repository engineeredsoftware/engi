# Spec V8 Coverage Matrix

## Status
- Demo repo: `engi-demo`
- Spec target: ENGI V8
- Current automated test count: **51 passing**

## Coverage map

| Area | V8 expectation | Repo coverage |
|---|---|---|
| Need measurement | GitHub-bound benchmark parsing, fail-closed validation, need descriptor closure | `src/spec-v7-demo.js`, `test/core.test.js`, `test/api.test.js` |
| Prompt surfaces | Prompt templates, interpolation, context lineage, downstream artifact bindings | `src/spec-v7-demo.js` prompt surfaces, `public/app.js`, prompt-lineage tests |
| Recall channels | lexical, symbolic, path, config, semantic/vector, artifact kind/type | `src/spec-v7-demo.js` recall contracts + provenance tests |
| Ranking explainability | need match, benchmark impact, penalty mass visual/detail surfaces | `public/app.js`, evaluation tests |
| Verification separation | ranking separated from verification and use tiers | `src/spec-v7-demo.js`, verification tests |
| Identity/auth separation | identity bindings and authorization decisions separate from settlement/proofs | branch artifact tests + UI surfaces |
| Signer separation | signer binding stays distinct from authz, GitHub, and settlement | asset creation tests + branch artifact surfaces |
| GitHub boundary separation | explicit local-modeled vs external-only GitHub boundary surface | branch artifact tests + UI surfaces |
| External boundary concretization | explicit contracts/manifests for formerly external-only areas | `.engi/external-boundary-manifest.json`, tests, UI surfaces |
| Artifact upload precision | kind/type, visual/raw, signer/binding metadata | deposit API tests + asset creation tests |
| Profile UX | Profile A vs B identity, operator meaning, and non-switchability surfaced | public state + UI artifacts |
| Asset pack / branch artifacts | lock files, manifests, policy, source material | branch artifact tests |
| Proof closure | proof contract, evidence chain, theorem checks, artifact bindings | `.engi/system-proof-bundle.json`, `.engi/settlement-proof.json`, proof tests |
| Settlement | deterministic shares, exact accounting, exact theorem checks | settlement tests |
| Telemetry / proof surfaces | telemetry, unit catalog, prompt implementation surface, system proof bundle | proof and telemetry tests |
| Host capability documentation | durable host/runtime/tooling/network assumptions recorded | `HOST_CAPABILITIES.md`, `HOST_CAPABILITIES.json`, doc-presence test |

## Direct test coverage

### API tests
- seeded public state is V8-shaped
- app shell exposes finalized V8 copy
- profile labels exposed pre-run
- host capability docs exist in repo
- deposit validation still enforced
- V8 deposit precision fields accepted
- full branch flow succeeds
- branch flow materializes prompt surfaces + external boundary manifest
- context branch mode succeeds
- reset restores seed state
- malformed JSON handled safely
- static traversal blocked
- state-write failure safety preserved

### Core tests
- need descriptor carries parser contract + recall channel contracts
- prompt surfaces materialize interpolation + lineage bindings
- candidate assets carry upload precision + identity surfaces
- signal extraction still covers symbols / paths / config / stacks
- recall returns channel provenance + vector contracts
- evaluation returns score groups
- issuer restrictions / revocations still gate use tiers
- asset pack selection and branch modes still behave correctly
- V8 branch artifacts include identity / GitHub / upload / prompt / profile / external-boundary surfaces
- proof contract and proof bundle remain populated
- settlement invariants remain exact
- policy / telemetry / proof surfaces remain populated
- public projection remains coherent

## Known external-only boundaries
Not covered locally because intentionally out of scope for Profile A:
- real GitHub App authentication
- live workflow/artifact fetches
- live PR / branch writes
- remote model routing and trace capture
- external vector stores
- production identity / signer verification
- production settlement execution / network confirmations
