# ENGI Spec V6 Coverage Matrix

Status legend:
- **implemented** — deterministic local prototype implements the modeled behavior end-to-end
- **modeled** — explicit schema/proof/artifact exists, but boundary remains simulated
- **partial** — meaningful implementation exists, but some spec depth is still trimmed
- **missing** — not materially represented yet
- **non-demoable-external** — intentionally outside a deterministic local prototype without fake integrations

## Executive summary

This pass moved the demo much closer to V6’s actual control-plane shape.

Biggest improvements now present in code:
- GitHub-need measurement from canonical benchmark evidence rather than free-text-first flow
- explicit benchmark parser contract and canonical run evidence carry-through
- multi-channel candidate recall + fusion traces
- richer ranking decomposition, whole-asset score, and explainability surfaces
- separate verification determinisms and use-tier derivation
- asset-pack lock + selected source-material materialization
- remediation-branch artifact set expanded toward V6
- settlement preview + exact journal diff + proof bundle surfaces
- authorization, confidentiality, retention, revocation, and policy-release modeling
- materially stronger tests covering core flow and failure invariants

## Coverage matrix

| Spec area | Status | Notes | Exact code / file refs |
|---|---|---|---|
| GitHub-bound need measurement | implemented | Need is measured from seeded GitHub scenario + canonical benchmark outputs, not from a free-text query. | `src/spec-v6-demo.js:755` (`measureNeedFromScenario`), `src/spec-v6-demo.js:859` (`buildNeedDescriptor`), `server.js:144` (`/api/make-engi-branch`) |
| Benchmark parser contract | implemented | Parser contract, parser validation, fail-closed behavior, consumed inputs, and parser metadata are modeled explicitly. | `src/spec-v6-demo.js:385` (`buildGithubActionsBenchmarkParser`), `src/spec-v6-demo.js:755`, `src/spec-v6-demo.js:843`, `public/app.js:55` |
| Canonical run evidence modeling | implemented | Scenario state includes canonical run evidence and latest run carries it forward for inspection. | `src/spec-v6-demo.js:620`, `src/spec-v6-demo.js:804`, `src/spec-v6-demo.js:2193`, `public/app.js:67` |
| Need measurement richness + provenance | implemented | Static vs inferred measurement provenance and inference proofs are tracked. | `src/spec-v6-demo.js:778`, `src/spec-v6-demo.js:826`, `src/spec-v6-demo.js:837`, `test/core.test.js` |
| Candidate asset schema | implemented | Candidate assets include content units, content root, attestations, provenance binding, verification evidence, source-material binding, and measurement provenance. | `src/spec-v6-demo.js:139` (`makeCandidateAsset`), `src/spec-v6-demo.js:111` (`splitContentUnits`) |
| Candidate recall channels / fusion | implemented | Multi-channel recall over task, failure mode, technical context, lexical, symbol, path, config, and artifact-kind signals; fusion trace is persisted per recalled unit/asset. | `src/spec-v6-demo.js:876` (`recallCandidates`), `src/spec-v6-demo.js:1450` (`evaluateCandidates`), `public/app.js:92` |
| Need-match scoring | implemented | Spec-shaped subscores and final weighted score with detail payloads are implemented. | `src/spec-v6-demo.js:1054` (`computeNeedMatch`) |
| Benchmark-impact scoring | implemented | Failing-case, weak-dimension, and repo-context impact scores are implemented with detailed traces. | `src/spec-v6-demo.js:1184` (`computeBenchmarkImpact`) |
| Actionability scoring | implemented | Remediation specificity, implementation specificity, and operational usability are computed with detail traces. | `src/spec-v6-demo.js:1237` (`computeActionability`) |
| Ranking penalties | implemented | Penalty mass and named penalties are modeled separately from ranking components. | `src/spec-v6-demo.js:1282` (`computePenaltyMass`) |
| Whole-asset scoring + explainability depth | implemented | Whole-asset need score, strongest signals, penalty list, and recall-fusion explainability are attached to each evaluated candidate and surfaced in UI/API. | `src/spec-v6-demo.js:1489`, `src/spec-v6-demo.js:1513`, `src/spec-v6-demo.js:2202`, `public/app.js:102` |
| Verification determinisms | implemented | Issuance, provenance, sufficiency, and issuer-policy checks are represented separately from ranking. | `src/spec-v6-demo.js:1311`, `src/spec-v6-demo.js:1333`, `src/spec-v6-demo.js:1367`, `src/spec-v6-demo.js:1406` |
| Use-tier propagation rules | implemented | Candidate tiers are derived from verification, issuer policy can cap tiers, and settlement upgrade is explicit. | `src/spec-v6-demo.js:1430`, `src/spec-v6-demo.js:1441`, `src/spec-v6-demo.js:1496`, `src/spec-v6-demo.js:1510` |
| Asset-pack selection and lock | implemented | Selected assets, selected units, locked content roots, attestation hashes, and asset-pack lock artifact are produced. | `src/spec-v6-demo.js:1539` (`assembleAssetPack`), `src/spec-v6-demo.js:1591` (`buildAssetPackLock`) |
| Selected source-material modeling | implemented | Selected source material is materialized into `.engi/source-material/*` with branch-mode-aware metadata. | `src/spec-v6-demo.js:1715` (`materializeSelectedSourceMaterial`), `src/spec-v6-demo.js:2028` (`buildBranchArtifacts`) |
| Match report | implemented | Selected and rejected assets are emitted into a durable match report. | `src/spec-v6-demo.js:1562` (`buildMatchReport`), `src/spec-v6-demo.js:2110` |
| Verification report | implemented | Verification determinisms and use tier are emitted per asset. | `src/spec-v6-demo.js:1587` (`buildVerificationReport`), `src/spec-v6-demo.js:2111` |
| Eval manifest | implemented | Manifest includes benchmark run id, evaluator set, and asset measurement provenance. | `src/spec-v6-demo.js:1601` (`buildEvalManifest`), `src/spec-v6-demo.js:2112` |
| Settlement preview | implemented | Raw shares, settled shares, and exact metered micro-units are persisted and surfaced. | `src/spec-v6-demo.js:1918` (`settleNeedEvent`), `src/spec-v6-demo.js:2113`, `public/app.js:167` |
| Exact journal diff / invariants / proof surfaces | implemented | Before/after roots, debit/credit entries, invariant set, settlement proof, and system proof bundle are all produced. | `src/spec-v6-demo.js:1918`, `src/spec-v6-demo.js:2054`, `src/spec-v6-demo.js:2114`, `public/app.js:181` |
| Authorization / principal modeling | implemented | Authorization decisions and identity/authorization proof are modeled explicitly and persisted as branch artifacts. | `src/spec-v6-demo.js:1734` (`buildAuthorizationDecisions`), `src/spec-v6-demo.js:2065`, `src/spec-v6-demo.js:2114` |
| Confidentiality / sensitive-data classification | implemented | Policy release and sensitive-data flow records classify private vs bounded-public surfaces. | `src/spec-v6-demo.js:1763` (`buildSensitiveDataFlowRecords`), `src/spec-v6-demo.js:1801` (`buildBranchPolicyRelease`) |
| Retention / revocation / policy-release modeling | implemented | Retention policy ids, revocation behavior, disclosure rules, and policy-release artifact are present. | `src/spec-v6-demo.js:1801`, `src/spec-v6-demo.js:2116` (`.engi/policy-release.json`) |
| System proof bundle | implemented | Asset-measurement, selection, journal, identity/auth, sensitive-data-flow, and settlement proofs are bundled. | `src/spec-v6-demo.js:2054`, `src/spec-v6-demo.js:2114`, `test/core.test.js` |
| API surfaces updated for V6 | implemented | API centers on `/api/make-engi-branch`, with state/deposit/reset preserved. | `server.js:108`, `server.js:144`, `server.js:159` |
| UI surfaces updated for V6 | implemented | UI now presents need measurement, ranked/verified candidates, branch artifacts, settlement, and proof surfaces. | `public/app.js:55`, `public/app.js:92`, `public/app.js:127`, `public/app.js:167`, `public/index.html` |
| Deterministic local branch/PR creation against GitHub | non-demoable-external | Real GitHub app auth, branch creation, PR flows, Actions invocation, and repo mutation are intentionally not faked here. | boundary only; represented via seeded scenario + branch artifacts |
| Real benchmark artifact ingestion from network | non-demoable-external | Parser contract is implemented locally, but remote Actions artifact retrieval is not. | boundary only; local scenario in `src/spec-v6-demo.js:620` |
| Real LLM evaluator execution | non-demoable-external | Static/inferred boundaries are modeled; no live model inference is performed. | boundary only; evaluator ids in manifests/proofs |
| Automatic patch synthesis over a real repo | partial | Patch-mode branch assembly is represented, but actual patch generation/content rewriting is still not implemented. | `src/spec-v6-demo.js:1715`, `src/spec-v6-demo.js:2054` |
| Full revocation enforcement over existing external artifacts | partial | Revocation and retention are modeled and surfaced, but there is no live external artifact deletion/permission revocation executor. | `src/spec-v6-demo.js:1763`, `src/spec-v6-demo.js:1801` |

## Test coverage added in this pass

Current test suite: **37 tests**.

High-value coverage now includes:
- API contract and static serving without binding a local port: `test/api.test.js`
- bootstrapping / state repair behavior: `test/api.test.js`
- deposit validation and persistence invariants: `test/api.test.js`
- full make-ENGI-branch gold path: `test/api.test.js`, `test/core.test.js`
- context-mode branch behavior: `test/api.test.js`, `test/core.test.js`
- parser contract and canonical run evidence: `test/core.test.js`
- asset schema extraction and signal capture: `test/core.test.js`
- recall fusion and ranking/verification separation: `test/core.test.js`
- issuer policy tier behavior including revoke/restrict cases: `test/core.test.js`
- asset-pack lock invariants: `test/core.test.js`
- exact debit/credit conservation and 10000-bp normalization: `test/core.test.js`
- system proof bundle, authorization, policy release, and source-material materialization: `test/core.test.js`
- write-failure atomicity for both deposit and make-branch flows: `test/api.test.js`

## Remaining gaps by type

### Non-demoable external boundaries
- live GitHub App installation/auth
- real PR/branch creation and repo mutation on GitHub
- remote GitHub Actions artifact download and parsing from live runs
- real model/evaluator execution
- real artifact cleanup/revocation against external systems

### Still merely partial inside the local prototype
- actual remediation patch synthesis/edit application into a real checkout
- richer policy execution state transitions beyond proof/artifact modeling
- broader scenario library beyond the seeded auth-migration case
- more exhaustive section-for-section artifact schemas for every appendix type in V6
