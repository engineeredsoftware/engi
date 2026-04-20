# Bitcode Spec V7 Coverage Matrix

## Scope

This matrix audits the current `protocol-demonstration/` against:

- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V7.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V7_NOTES.md`
- prior baseline: `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/SPEC_V6_COVERAGE_MATRIX.md`

It focuses on **demoable / Profile A** requirements and explicitly labels what remains **Profile B / external-only**.

## Executive readout

Relative to the prior V6-complete prototype, the V7 pass closes the main demoable clarifications around:

1. **need-descriptor normalization / derivation closure**
2. **stricter required artifact contracts**
3. **authorization + sensitive-data-flow + policy-release completeness**
4. **use-tier rights and branch-mode interaction surfaces**
5. **settlement proof ↔ asset-pack-lock closure**
6. **explicit Profile A vs Profile B labeling in runtime, UI, and docs**

The repo remains a **deterministic local prototype**. Live GitHub integration, real branch / PR delivery, production authz enforcement, real policy publishing, and networked evaluator execution remain outside Profile A.

## V7 delta matrix

| V7 area | Prior V6 matrix / pre-pass state | Current demo status | Profile A result | Profile B / external-only remainder | Main refs |
| --- | --- | --- | --- | --- | --- |
| Need-descriptor normalization + derivation closure | V6 matrix had need measurement broadly implemented, but derivation closure for every normalized field was not explicit. | `need.fieldDerivations` now records source/policy/evidence for task, failure modes, constraints, target artifact kinds, stacks, paths, symbols, config keys, failing cases, weak dimensions, and baseline metrics. | **Implemented** | Real parser provenance from live GitHub artifacts and production normalization policy enforcement. | `src/spec-v7-demo.js` (`measureNeedFromScenario`), `public/app.js`, `test/core.test.js` |
| Parser fail-closed behavior | Already present in V6 prototype, but now carried forward as a named V7 invariant. | Parser validation still hard-fails on malformed canonical outputs; tests pin it. | **Implemented** | Real workflow artifact retrieval / integrity validation. | `src/spec-v7-demo.js` (`buildGithubActionsBenchmarkParser`, `measureNeedFromScenario`), `test/core.test.js` |
| Stricter artifact contract | V6 prototype produced the right family of artifacts, but the contract was not explicitly enforced. | `assertRequiredBranchArtifacts()` now fails closed if core V7 branch artifacts are missing. | **Implemented** | Real on-disk branch/PR artifact emission and external publication workflow. | `src/spec-v7-demo.js` (`assertRequiredBranchArtifacts`, `buildBranchArtifacts`) |
| Ranking / verification separation | Already a strong V6 area. | Still explicit; V7 pass preserves the split and attaches use-tier rights more clearly downstream. | **Implemented** | Real model-backed evaluators / external verification services. | `src/spec-v7-demo.js` (`evaluateCandidates`, `buildVerificationReport`) |
| Use-tier rights + branch-mode interactions | V6 had branch-mode selection logic, but rights surfaces were implicit. | `allowedUseTiersForBranchMode()` + `useTierRights()` now make report visibility, branch materialization, settlement eligibility, and source-material mode explicit. | **Implemented** | Real enforcement in GitHub/App auth boundaries rather than modeled JSON only. | `src/spec-v7-demo.js`, `test/core.test.js`, `test/api.test.js`, `public/app.js` |
| Authorization completeness | V6 had authorization decisions, but V7 notes called for fuller action coverage. | Authorization matrix and persisted decisions now cover private-branch read/write, selected-source-material materialization, settlement event authorization, bounded-public-proof derivation, and delivery-open denial. | **Implemented** | Real identity provider bindings, signatures, and enforcement beyond deterministic policy tables. | `src/spec-v7-demo.js` (`buildPolicyState`, `buildIdentityBindings`, `buildAuthorizationDecisions`), `test/core.test.js` |
| Sensitive-data-flow completeness | V6 had a few flow records, but not the full V7 closure. | Sensitive-data-flow records now cover repo-private-source, verification-evidence, licensed-source-material, private-branch-derived-artifact, settlement-preview, private-proof-artifact, and bounded-public-proof-metadata. Proof checks require complete class coverage. | **Implemented** | Real storage / retention / disclosure control planes. | `src/spec-v7-demo.js` (`buildSensitiveDataFlowRecords`, `buildSensitiveDataFlowProof`), `test/core.test.js` |
| Policy release completeness | V6 had policy release basics. | Policy release now includes explicit conformance profile labels plus a richer artifact-class map matching the tighter V7 surfaces. | **Implemented** | Real revocation / publication / distribution lifecycle for policy releases. | `src/spec-v7-demo.js` (`buildPolicyRelease`, `buildBranchPolicyRelease`), `test/core.test.js` |
| Asset-pack-lock closure | V6 already locked assets/units. | Lock now carries branch-mode/profile labeling, and downstream settlement preview/proof binds back to the lock hash. | **Implemented** | Real cryptographic publication / external verifier interoperability. | `src/spec-v7-demo.js` (`buildAssetPackLock`, `buildSettlementProof`), `test/core.test.js` |
| Settlement proof closure | V6 settled exactly, but V7 notes wanted clearer closure with the asset pack lock. | Settlement preview now persists `assetPackLockHash` and participating assets; settlement proof carries the same lock hash; tests pin equality. | **Implemented** | Real buyer-side settlement execution, external ledger, or on-chain/off-chain proof publication. | `src/spec-v7-demo.js` (`settleNeedEvent`, `buildSettlementProof`), `test/core.test.js` |
| Fail-closed persistence / state-transition rules | Already partly present through atomic writes and write-failure tests. | Retained; no state persists on simulated write failures, bootstrap repairs incomplete state, and required artifact contract adds another fail-closed edge. | **Implemented** | Real transactional durability across external systems. | `server.js`, `test/api.test.js`, `src/spec-v7-demo.js` |
| Profile A vs Profile B labeling | Not explicit in the V6 prototype. | Added to state, need descriptor, policy release, asset pack, manifests, proof bundle, bounded public proof, README, and UI. | **Implemented** | N/A — this row is specifically about labeling. | `src/spec-v7-demo.js`, `README.md`, `public/index.html`, `public/app.js`, `test/api.test.js`, `test/core.test.js` |
| UI exposure of new V7 semantics | V6 UI exposed the main flow but not the new labels/rights/derivation closure. | UI now surfaces active profile, seed-vs-measured task fallback, field derivations, and verification + rights views. | **Implemented** | Real GitHub / delivery UI integration. | `public/index.html`, `public/app.js` |
| Test codification of V7 deltas | V6 tests covered the original deterministic flow. | Tests now explicitly pin derivation closure, required sensitive-data classes, richer authorization actions, profile labels, unit-hash materialization, lock-hash closure, and branch-mode rights. | **Implemented** | End-to-end tests against real GitHub / auth / branch infra. | `test/core.test.js`, `test/api.test.js` |

## Comparison against `SPEC_V6_COVERAGE_MATRIX.md`

The prior V6 coverage matrix already showed the prototype as broadly strong on:

- need measurement
- candidate recall
- ranking
- verification determinisms
- asset pack assembly
- settlement and journal diff
- reports / manifests
- sensitive data / identity proof modeling

The V7 pass did **not** rewrite those core mechanics. Instead, it tightened the places where the V6 matrix still effectively read as “implemented but not fully closed”:

- **Need measurement** → now has explicit derivation closure, not just provenance traces.
- **Verification / use tiers** → now has explicit rights semantics by branch mode.
- **Reports / manifests** → now enforced via required artifact contract and richer manifest contents.
- **Sensitive data / identity / proof model** → now includes fuller authorization actions and required sensitive-data-class coverage.
- **Settlement / proofs** → now explicitly binds settlement preview and settlement proof to the asset-pack lock hash.
- **Public/docs/UI surfaces** → now explicitly distinguish Profile A and Profile B.

So the V7 change is mostly a **closure / completeness pass**, not a greenfield architecture change.

## Advanced V7 interface codification added in the second pass

| Advanced interface area | Current codification | Profile A stand-in | Future Profile B boundary | Main refs |
| --- | --- | --- | --- | --- |
| Content-unit semantic contracts | Content units now carry explicit embedding artifacts, vector-space contracts, semantic summaries, and measurement provenance. | Deterministic vectors stand in for real embeddings. | Swap in real embedding providers/models without changing unit schema or downstream consumers. | `src/spec-v7-demo.js` (`splitContentUnits`, `buildEmbeddingArtifact`, `buildUnitCatalog`) |
| Static vs inferred boundaries | Measurement detail / traces / inference proofs now carry measurement class, evaluator kind, evaluator surface, prompt/tool identity, and replayability metadata. | Local deterministic evaluator ids and static commands simulate the interface. | Real prompt execution, model routing, and external tool invocation. | `src/spec-v7-demo.js` (`measurementDetail`, `measurementTrace`, `inferenceProof`, `evaluatorSurface`) |
| Matching/scoring/vector hand-offs | Recall now exposes query representation contracts; asset measurement captures vector interfaces and content-unit semantics; these flow into ranking and later manifests/telemetry. | Deterministic stand-in vector generation. | Real embedding/vector search backends and evaluator services. | `src/spec-v7-demo.js` (`recallCandidates`, `buildEvalManifest`, `buildPipelineTelemetry`) |
| Share-computation explainability | Settlement preview, journal diff, and telemetry now expose participating assets plus share allocation surfaces tied back to the asset-pack lock. | Local exact deterministic share computation. | Production settlement services / external proof publication. | `src/spec-v7-demo.js` (`settleNeedEvent`, `buildPipelineTelemetry`) |
| Interactive telemetry / harness | Added unit catalog and pipeline telemetry artifacts for live demo inspection. | Structured JSON artifacts rather than external observability infra. | Real streaming telemetry, tracing backend, and UI observability. | `src/spec-v7-demo.js`, `public/app.js`, `README.md` |
| Prompt/proof implementation surfaces | System proof bundle now includes a prompt implementation surface describing inferred outputs and stand-in boundaries. | Deterministic/local prompt stand-ins. | Real prompts, remote traces, and evaluator execution services. | `src/spec-v7-demo.js` (`buildPromptImplementationSurface`, `buildSystemProofBundle`) |

## Remaining Profile B / external-only work

These areas are still intentionally outside the demo boundary:

- live GitHub workflow artifact ingestion and verification
- actual branch creation / PR creation / delivery-open behavior
- production authn/authz enforcement against real identities
- real policy publication, revocation propagation, and key management
- networked or LLM-backed evaluators and expensive inference roles
- production retention / disclosure / audit infrastructure
- external settlement rail integration and public proof publishing
- any non-local source-material access control beyond modeled artifacts/state

## Bottom line

For **demoable / Profile A** V7 requirements, the prototype is now in field-level parity with the V7 clarifications called out in the notes. What remains is the expected **Profile B / external system boundary**, not missing local-demo codification.
