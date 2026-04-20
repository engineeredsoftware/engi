# Spec V9 Implementation Matrix

## Status
- Repo: `protocol-demonstration`
- Spec draft target: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V9.md`
- Historical root pointer at authoring time remained on: `V8`
- Local closure status after this pass:
  - Phase 1: implemented
  - Phase 2: implemented
  - Phase 3: implemented
  - Phase 4: implemented
  - Phase 5: implemented
  - Phase 6: implemented in this pass for witness-complete proof closure across prompt/static/verification/materialization/disclosure surfaces
  - Phase 7: implemented in this pass for fixed-point source-to-shares accounting closure and explicit settlement participation precision
  - Phase 8: implemented in this pass for richer seeded scenario families, normalization-heavy scenario coverage, and deeper fixture manifests
  - Phase 9: implemented in this pass for host-capability truthing and local containerization configurations grounded in actual repo usage
- Current canonical implementation center:
  - `server.js`
  - `src/bitcode-demo.js`
  - `public/index.html`
  - `public/app.js`
  - `test/core.test.js`
  - `test/api.test.js`
- Current code-organization decision: **acceptable to keep the demo mostly together in `src/bitcode-demo.js` during V9**, rather than forcing a speculative module split first

## Purpose of this document
This file is the authoritative **V9 implementation-driving matrix** for the local Bitcode package realization.

It serves five jobs at once:
1. translate the legacy V9 system spec into concrete repo work,
2. map current V8 implementation surfaces to V9 closure targets,
3. define file-by-file changes for the next upgrade pass,
4. define test/fixture expansion required for V9 confidence,
5. keep the implementation plan grounded in the current canonical demo rather than abstract greenfield design.

## Audit basis
This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V6.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V7.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V8.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V8_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V9.md`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/src/bitcode-demo.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/server.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/test/api.test.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/SPEC_V8_COVERAGE_MATRIX.md`

---

## V9 closure map

| Area | Current V8 implementation refs | Current state | V9 closure target | Priority |
|---|---|---|---|---|
| Prompt/context completeness | `buildPromptSurface()`, `measureNeedFromScenario()` | prompt surfaces present; placeholder/context completeness not validated | add prompt-contract validator + prompt contract artifact + proof | P0 |
| Public/API projection privacy | `publicState()`, `server.js` API responses | privacy classified but not strictly enforced in projection | principal-scoped projections + bounded public proof + redaction proof | P0 |
| Static measurement execution | `extractSignals()`, `repoContextStaticMeasurements()`, `buildEvalManifest()` | heuristic extraction exists; no real static tool execution receipts | execution-backed static evaluator receipts + measurement report | P0 |
| Heuristic registry and use audit | `extractSignals()`, `computeNeedMatch()` | signals gathered and partly consumed but no formal completeness audit | heuristic registry + consumed-by matrix + debug coverage checks | P1 |
| Verification receipts | `checkIssuanceVerification()`, `checkProvenanceVerification()`, `checkVerificationSufficiency()` | decisions structured but mostly fed by booleans/metadata | receipt-backed verification report and evaluation surfaces | P1 |
| Proof witness completeness | `buildProofContract()`, `buildSystemProofBundle()` | proof shape strong but some claims still weak/tautological | witness manifests + stronger proofs + no hardcoded truthy claims | P1 |
| Accounting precision | `scoreSourceBundleForShares()`, `normalizeContributionUnitsToBasisPoints()`, `buildSourceToSharesArtifact()`, `allocateExactMicroUnitsByShare()` | fixed-point source-to-shares chain implemented with clipping receipts, basis-point normalization trace, and exact micro-unit replay surfaces | keep exact-accounting invariants green while extending replayable source-to-shares coverage | P1 |
| Scenario/fixture realism | `buildInitialState()`, `buildScenarioFixtureManifest()`, `buildTestCoverageReport()`, current tests | seeded multi-family scenario corpus implemented with GitHub-shaped provenance bindings and public-safe coverage artifacts | continue deepening scenario realism without shallow fixture spam | P1 |
| Host capability / containerization | `HOST_CAPABILITIES.md`, `HOST_CAPABILITIES.json`, `Dockerfile`, `.dockerignore` | previously generic and V8-stale host docs; no checked-in container config | record actual V9 host usage truth, bootstrap/furnishing guidance, safe configurations, and container run/test surfaces | P2 |
| Profile B boundary refresh | external manifests + eval manifest | concrete enough for V8 | keep schema-compatible with stronger V9 receipts/proofs | P2 |

---

## Phase order

### Phase 0 — guardrails / keep-together rule
**Decision:** do not do a broad codebase reorganization first.

For V9 in the demo repo, prefer:
- extending `src/bitcode-demo.js` coherently,
- adding small helper files only where they reduce risk or improve testability,
- avoiding architecture churn that would obscure the real V9 implementation work.

Acceptance:
- repo remains easy to inspect,
- V9 work is visible in-place,
- function boundaries improve because of capability closure, not because of abstract tidiness pressure.

---

## Phase 1 — prompt/context completeness validation

### Why first
This is the cheapest high-signal V9 closure item and exposes current concrete mismatches already visible in V8.

### Current implementation refs
- `src/bitcode-demo.js#501` — `buildPromptSurface()`
- `src/bitcode-demo.js#1182` — `measureNeedFromScenario()`
- `src/bitcode-demo.js#2871` — `buildPromptImplementationSurface()`
- `test/core.test.js` prompt-surface tests

### Current gaps to close
1. no validator that checks template placeholders against context inputs
2. no validator that checks required context inputs against template/output contract
3. no prompt-contract artifact with hashes / placeholder inventories
4. prompt surfaces currently exist only for need-measurement prompts
5. some current prompt/context mismatches exist in the seeded V8 implementation:
   - `baseRef` appears in the task template but is not declared as a context input
   - `repo` appears in the failure-modes template but is not declared as a context input

### Required implementation changes
In `src/bitcode-demo.js`:
- add a placeholder extractor for template strings
- add a prompt completeness validator
- add `buildPromptContract()`
- extend `buildPromptSurface()` to emit or link prompt contracts
- extend `buildPromptImplementationSurface()` to include:
  - template hash
  - context hash
  - output-schema hash
  - placeholder completeness status

### Required artifacts
- `.engi/prompt-contracts.json`
- `.engi/prompt-completeness-proof.json`

### Required tests
Add tests that:
1. fail on missing placeholder bindings
2. fail on undeclared required context fields
3. allow explicitly non-rendered context fields only when marked as such
4. verify prompt contracts exist and hashes are stable

### Acceptance
- prompt surfaces are no longer just visible; they are validated
- deliberate prompt/context mistakes fail deterministically in tests
- current seeded prompt mismatches are resolved
- Implemented in repo:
  - prompt contracts now fail closed on missing placeholders and undeclared non-rendered context
  - seeded `baseRef` and `repo` prompt mismatches are fixed
  - prompt completeness proof is emitted as `.engi/prompt-completeness-proof.json`

---

## Phase 2 — projection/privacy enforcement

### Why second
This is the most important trust/safety gap. The current demo classifies confidentiality well, but the app/API projection still exposes too much of `latestRun` for a final privacy model.

### Current implementation refs
- `src/bitcode-demo.js#3583` — `publicState()`
- `src/bitcode-demo.js#3549` — bounded public proof object on `latestRun`
- `server.js#108` — `GET /api/state`
- `server.js#150` — `POST /api/make-bitcode-branch`
- `src/bitcode-demo.js#2578` — `buildSensitiveDataFlowRecords()`
- `src/bitcode-demo.js#2663` — `buildBranchPolicyRelease()`

### Current gaps to close
1. `publicState()` currently returns `latestRun` broadly rather than principal-scoped projections
2. `POST /api/make-bitcode-branch` returns full `latestRun` directly
3. bounded public proof is carried in memory but not emitted as a dedicated branch artifact with redaction/disclosure proof
4. artifact confidentiality classes do not yet drive actual field-level projection

### Required implementation changes
In `src/bitcode-demo.js`:
- add projection policy definitions per principal class:
  - buyer
  - reviewer
  - public
  - internal/system
- add projection builders:
  - `buildBuyerProjection()`
  - `buildReviewerProjection()`
  - `buildPublicProjection()`
- add explicit bounded public proof artifact builder
- add redaction/disclosure proof builder
- ensure public projection excludes private branch artifacts and source material

In `server.js`:
- add projection mode parameter or principal-scoped endpoint behavior for public state
- stop returning overly broad `latestRun` objects to public-equivalent callers by default

### Required artifacts
- `.engi/projection-policy.json`
- `.engi/bounded-public-proof.json`
- `.engi/redaction-proof.json`
- `.engi/disclosure-proof.json`

### Required tests
Add tests that:
1. public projection omits private artifacts and source material
2. bounded public proof remains available and sufficient
3. buyer/reviewer projection can see more than public, but not unconstrained raw internals
4. confidentiality classes map to actual projection behavior

### Acceptance
- privacy/disclosure is enforced, not merely described
- public projection no longer exposes private run internals by convention
- Implemented in repo:
  - `/api/state` and `/api/make-bitcode-branch` now default to `public` projection
  - `buyer`, `reviewer`, and `internal` projections are explicit rather than implicit
  - richer buyer/reviewer projections still withhold raw branch files and source material

---

## Phase 3 — static measurement execution receipts

### Why third
This is the clearest V9 finality-gap exemplar: V8 already has static-measurement contracts, but not actual execution receipts.

### Current implementation refs
- `src/bitcode-demo.js#306` — `extractSignals()`
- `src/bitcode-demo.js#343` — `splitContentUnits()`
- `src/bitcode-demo.js#1173` — `repoContextStaticMeasurements()`
- `src/bitcode-demo.js#2300` — `buildEvalManifest()`
- `src/bitcode-demo.js#894` — asset verification evidence booleans

### Current gaps to close
1. no actual static-evaluator execution receipts
2. no measurement-receipt artifact
3. static measurement still means regex extraction / seeded evidence / metadata claims
4. verification booleans are not bound to executed tool receipts

### Required implementation changes
Keep code mostly together, but add minimal helper support if needed.

Preferred approach:
- add a local static-measurement receipt builder inside `src/bitcode-demo.js`
- optionally add a small helper file for receipt hashing / tool metadata normalization if it materially reduces clutter

Implementation tasks:
1. define `StaticExecutionReceipt` shape in code
2. add receipt builders for local deterministic static measurement stages:
   - benchmark parser normalization
   - repo context extraction
   - asset signal extraction
   - verification static checks
3. change measurement provenance to reference receipt IDs
4. extend eval manifest and need measurement artifacts to include receipt refs
5. do **not** fake external static tooling yet; start by making local static stages receipt-backed and replayable

### Required artifacts
- `.engi/measurement-receipts.json`
- `.engi/static-measurement-report.json`

### Required tests
Add tests that:
1. static receipts exist for measured need fields
2. receipt fields are stable and complete
3. measurement provenance links to receipt IDs
4. missing/invalid receipt structure fails

### Acceptance
- “static measurement” in Profile A becomes execution-backed within the local deterministic pipeline
- no critical static field is emitted without a producing receipt
- Implemented in repo:
  - receipt-backed static stages now cover benchmark parser normalization, repo context extraction, asset signal extraction, and verification static checks
  - measurement provenance now references receipt IDs
  - `.engi/static-measurement-report.json` closes receipt/provenance linkage in tests

---

## Phase 4 — code-analysis fact registry and consumption audit

### Why now
Once receipts exist, V9 should make the heuristic inventory explicit and auditable.

### Current implementation refs
- `src/bitcode-demo.js#306` — `extractSignals()`
- `src/bitcode-demo.js#829` — `assetMeasurement.measuredFields`
- `src/bitcode-demo.js#1653` — `computeNeedMatch()`
- `src/bitcode-demo.js#1783` — `computeBenchmarkImpact()`
- `src/bitcode-demo.js#1836` — `computeActionability()`

### Current gaps to close
1. no formal registry of gathered static/inferred/hybrid code-analysis facts
2. no formal consumed-by matrix
3. some fields are partly used but not independently auditable as first-class scoring inputs
4. no debug failure when gathered code-analysis facts are forgotten downstream

### Required implementation changes
In `src/bitcode-demo.js`:
- add `buildCodeAnalysisFactRegistry()`
- define code-analysis fact inventory
- annotate scoring/evaluation outputs with consumed code-analysis facts
- add a debug audit that checks:
  - gathered facts are registered
  - registered facts are either consumed or intentionally unused

### Required artifacts
- `.engi/code-analysis-fact-registry.json`

### Required tests
Add tests that:
1. registry contains required signal families
2. need-match subscore surfaces show consumed code-analysis facts
3. unused registered facts are explicitly marked or fail the audit

### Acceptance
- every gathered code-analysis fact can be traced to storage and consumption
- no silent dead code-analysis facts remain in the core V9 path
- Implemented in repo:
  - `.engi/code-analysis-fact-registry.json` now inventories gathered facts, consumer matrix, and audit closure
  - need-match / benchmark-impact / actionability detail surfaces now list consumed code-analysis facts
  - registry audit fails if consumed facts are not registered

---

## Phase 5 — verification receipts

### Why after static receipts
Verification receipts should build on the new receipt substrate rather than invent a parallel mechanism.

### Current implementation refs
- `src/bitcode-demo.js#1910` — issuance verification
- `src/bitcode-demo.js#1932` — provenance verification
- `src/bitcode-demo.js#1974` — verification sufficiency
- `src/bitcode-demo.js#2022` — issuer policy status
- `src/bitcode-demo.js#2282` — verification report

### Current gaps to close
1. verification decisions are not receipt-backed
2. evidence is partly boolean/metadata-driven
3. missing way to distinguish claimed evidence vs measured evidence vs policy ceilings

### Required implementation changes
In `src/bitcode-demo.js`:
- add verification receipt builders
- extend verification report to include receipt refs
- differentiate:
  - claimed evidence
  - measured evidence
  - policy-derived restrictions

### Required artifacts
- extend `.engi/verification-report.json`
- emit `.engi/verification-receipts.json`

### Required tests
Add tests that:
1. each verification family emits receipts
2. restricted or revoked issuers show policy ceilings distinctly from measurement failures
3. verification sufficiency cites specific missing receipts/checks

### Acceptance
- verification is no longer only a structured result; it is a structured, receipt-backed result
- Implemented in repo:
  - verification now emits issuance, provenance, sufficiency, and issuer-policy receipts
  - verification report surfaces claimed evidence, measured evidence, policy restrictions, and receipt refs
  - buyer/reviewer projections expose `.engi/verification-receipts.json`

---

## Phase 6 — proof witness completion

### Why now
Once prompts, receipts, projections, and verification are stronger, the proof bundle can become materially stronger rather than cosmetically larger.

### Current implementation refs
- `src/bitcode-demo.js#4028` — `buildSelectionConsistencyProof()`
- `src/bitcode-demo.js#4066` — `buildJournalCompletenessProof()`
- `src/bitcode-demo.js#4103` — `buildIdentityAuthorizationProof()`
- `src/bitcode-demo.js#4122` — `buildSensitiveDataFlowProof()`
- `src/bitcode-demo.js#4157` — `buildMaterializationVisibilityProof()`
- `src/bitcode-demo.js#4186` — `buildProofWitnessManifest()`
- `src/bitcode-demo.js#4281` — `buildProofContract()`
- `src/bitcode-demo.js#4310` — `buildSettlementProof()`
- `src/bitcode-demo.js#4569` — `buildSystemProofBundle()`

### Gaps closed in this pass
1. proof claims that were previously weaker are now backed by explicit witness inputs
2. assertion-like proof booleans are now paired with witness refs and proof hashes
3. explicit proof-witness manifest coverage now exists
4. prompt completeness proof is now bundled explicitly
5. disclosure/redaction proof families are now carried in the bundle

### Required implementation changes
In `src/bitcode-demo.js`:
- add proof witness manifest builder
- upgrade selection/materialization proof to use real inputs rather than fixed truthy placeholders
- strengthen journal completeness proof beyond tautological replay hash checks
- include prompt completeness proof, static-measurement proof, materialization visibility proof, and disclosure proof in the system proof bundle

### Required artifacts
- `.engi/proof-witness-manifest.json`
- `.engi/prompt-completeness-proof.json`
- `.engi/static-measurement-proof.json`
- `.engi/materialization-visibility-proof.json`
- `.engi/disclosure-proof.json`

### Required tests
Add tests that:
1. no proof fields are hardcoded true without derived witness inputs
2. proof witness manifest covers all proof-relevant artifacts
3. system proof bundle includes all new proof families

### Acceptance
- proof bundle becomes witness-complete enough for V9 claims
- Implemented in repo:
  - `.engi/proof-witness-manifest.json` now enumerates proof families and witness refs
  - `.engi/materialization-visibility-proof.json` now proves selected-source closure over the asset-pack lock and rejects unexpected materialized bindings
  - system proof bundle now carries prompt completeness, static measurement, verification receipts, materialization visibility, source-to-shares replay surfaces, redaction, and disclosure proofs
  - proof witness digests now cover proof-relevant accounting artifacts including `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, and `.engi/accounting-precision-report.json`
  - selection/journal/identity/data-flow proofs now include explicit witness refs and proof hashes instead of only bare booleans

---

## Phase 7 — accounting precision closure

### Why now
The current settlement path is strong enough to preserve while tightening upstream precision.

### Current implementation refs
- `src/bitcode-demo.js#3486` — `scoreSourceBundleForShares()`
- `src/bitcode-demo.js#3554` — `normalizeContributionUnitsToBasisPoints()`
- `src/bitcode-demo.js#3644` — `buildSourceToSharesArtifact()`
- `src/bitcode-demo.js#3744` — `allocateExactMicroUnitsByShare()`
- `src/bitcode-demo.js#4334` — `buildSettlementParticipationArtifact()`
- `src/bitcode-demo.js#4399` — `buildAccountingPrecisionReport()`
- `src/bitcode-demo.js#5035` — `settleNeedEvent()`

### Gaps closed in this pass
1. upstream contribution derivation now runs through fixed-point units rather than float-derived mass
2. clipping of non-positive marginal contribution is now modeled as an auditable receipt in the source-to-shares chain
3. deterministic tie-break behavior is now surfaced as an explicit precision trace
4. source-material-to-share derivation is now materialized as its own replay chain

### Required implementation changes
In `src/bitcode-demo.js`:
- move contribution mass derivation to fixed-point or rational representation
- add explicit source-to-shares artifact capturing marginal contribution, clipping, normalization, and tie-break steps
- add explicit settlement participation records
- add precision report with:
  - contribution inputs
  - clipping decisions
  - tie-break explanation
  - raw-to-settled normalization receipts

### Required artifacts
- `.engi/source-to-shares.json`
- `.engi/settlement-participation.json`
- `.engi/accounting-precision-report.json`

### Required tests
Add tests that:
1. multi-asset tie cases are stable
2. near-zero contribution cases are stable and explicit
3. precision report matches actual journal diff outputs
4. zero-credit participation is explicitly legal/expected when applicable

### Acceptance
- end-to-end settlement semantics become replayable without floating-point ambiguity in critical paths
- Implemented in repo:
  - `.engi/source-to-shares.json` now records bundle scoring, marginal contribution deltas, selected-unit refs, clipping receipts, basis-point normalization ledgers, and deterministic tie-break order
  - `.engi/settlement-participation.json` now distinguishes selected, settlement-participating, credited, zero-credit, and excluded assets
  - `.engi/accounting-precision-report.json` now closes the replay loop from source contribution inputs and selected unit refs through micro-unit journal outputs

---

## Phase 8 — scenario and fixture expansion

### Why last in sequence but critical for promotion
This is the confidence layer proving the earlier V9 work actually holds under realistic conditions.

### Current implementation refs
- `src/bitcode-demo.js#1458` — `buildInitialState()`
- `src/bitcode-demo.js#4947` — `buildScenarioFixtureManifest()`
- `src/bitcode-demo.js#5000` — `buildTestCoverageReport()`
- `test/core.test.js`
- `test/api.test.js`

### Gaps closed in this pass
1. the seeded corpus now includes multiple scenario families rather than one dominant path
2. the asset set is broader and scenario-bound
3. coverage now stresses richer proof/accounting/projection combinations
4. GitHub-shaped workflow/provenance fixture coverage is now surfaced explicitly
5. privacy-boundary behavior is now exercised by dedicated seeded scenarios

### Required implementation changes
Add fixture/scenario support without large refactor.

Suggested additions:
- `fixtures/github/` for workflow/check/artifact inputs
- `fixtures/scenarios/` for scenario definitions
- optional small loader helper if needed, while leaving main logic in `src/bitcode-demo.js`

### Required scenario families
At minimum:
- monorepo auth rollback
- proof-heavy Rust validator case
- config-policy incident case
- unsafe patch review case
- infra/deployment mismatch case
- malformed GitHub artifact case
- privacy boundary stress case
- multi-asset settlement/tie case

### Required artifacts
- `.engi/scenario-fixture-manifest.json`
- `.engi/test-coverage-report.json`

### Required tests
Add tests that:
1. parser fails closed on malformed workflow/artifact shapes
2. realistic repo trees and artifact sets still produce coherent need measurement
3. projection/redaction remains correct across roles
4. many-asset settlement remains stable
5. restricted/revoked/forged asset cases remain safe

### Acceptance
- V9 confidence is no longer based on one gold-path scenario alone
- Implemented in repo:
  - seeded scenario corpus now covers monorepo auth rollback, proof-heavy Rust validator repair, config-policy precedence incident response, unsafe patch review recovery, infra deployment mismatch, privacy-boundary proof export, polyglot gateway rollback, and normalization-heavy auth settlement replay
  - `.engi/scenario-fixture-manifest.json` now enumerates parser kind, stack hints, target artifact kinds, and normalization/polyglot negative fixtures in addition to the active corpus
  - `.engi/test-coverage-report.json` now exposes scenario-family, parser-kind, polyglot, and normalization coverage surfaces across the seeded runs

---

## Phase 9 — host capability and containerization closure

### Why after the core V9 surfaces
Host/container work is only useful if it is derived from the real local V9 program path rather than generic workstation inventory.

### Current implementation refs
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`
- `Dockerfile`
- `.dockerignore`
- `/Users/garrettmaring/Developer/casa/README.md`
- `/Users/garrettmaring/Developer/casa/scripts/bootstrap.sh`
- `/Users/garrettmaring/Developer/casa/scripts/install-packages.sh`

### Gaps closed in this pass
1. host capability docs are now grounded in actual repo execution truth rather than broad V8-era assumptions
2. local bootstrap/furnishing guidance now references Casa’s manifest-driven patterns without pretending this repo needs the whole workstation bootstrap
3. available configurations now distinguish native runtime/test from container runtime/test
4. containerization is now checked into the repo as a minimal local-serving/local-test surface

### Acceptance
- host capability claims now track what the repo really executes locally, what is optional, and what remains a Profile B boundary
- Implemented in repo:
  - `HOST_CAPABILITIES.md` now records real V9 runtime/program usage truth, bootstrap guidance, telemetry/safety, and containerization scope
  - `HOST_CAPABILITIES.json` now exposes the same as structured data for tooling/tests
  - `Dockerfile` and `.dockerignore` provide minimal local runtime/test containerization without implying a production deployment

---

## File-by-file implementation plan

### `src/bitcode-demo.js`
Keep as the main V9 implementation center.

Primary additions planned:
- prompt placeholder extraction
- prompt contract builder + validator
- projection policy + projection builders
- bounded public proof artifact builder
- redaction/disclosure proof builders
- static execution receipt builders
- static heuristics registry builder
- verification receipt builders
- proof witness manifest builder
- accounting precision report builder
- settlement participation artifact builder
- scenario/fixture handling expansions as needed

### `server.js`
Primary changes planned:
- principal/projection-aware state responses
- safer default response shapes for `GET /api/state`
- safer default response shapes for `POST /api/make-bitcode-branch`
- optional support for explicit projection selection in local demo mode

### `public/app.js`
Primary changes planned:
- distinguish public-safe vs buyer/reviewer-private surfaces
- show prompt contract validity status
- show static receipt / verification receipt summaries
- show settlement participation / precision-report summaries
- surface redaction/disclosure state clearly

### `test/core.test.js`
Primary additions planned:
- prompt completeness validation failures
- static receipt generation
- heuristic registry consumption audit
- proof witness completeness checks
- precision-report checks
- multi-scenario / many-asset cases

### `test/api.test.js`
Primary additions planned:
- projection safety tests
- public vs buyer/reviewer response shape tests
- bounded public proof availability tests
- malformed GitHub-shaped input tests where relevant to local API surface

### `fixtures/` (new, expected)
Likely additions:
- `fixtures/github/`
- `fixtures/scenarios/`
- `fixtures/projections/`
- `fixtures/settlement/`

### Docs to update later
After implementation is materially underway or complete:
- `README.md`
- `SCRIPT.md`
- `SCRIPT_SHORT.md`
- `CHECKLIST.md`
- `SPEC_V8_COVERAGE_MATRIX.md` (cross-linking only; keep as V8 closure doc)

---

## Recommended first coding slice
If starting implementation immediately, the best first V9 slice is:

1. prompt/context completeness validation
2. projection/privacy enforcement
3. minimal static receipt substrate

Why this order:
- prompt validation is cheap and high-signal
- projection safety closes the most serious trust gap
- static receipts establish the substrate that later verification/proof work can reuse

---

## Definition of done for V9 promotion readiness
The local demo should be considered V9-promotion-ready only when all of the following are true:
- prompt surfaces are completeness-validated and test-enforced
- public/API projection is policy-enforced and redaction-proven
- static measurement surfaces are backed by execution receipts
- heuristic inventory and consumption audit exist and are green
- verification is receipt-backed
- proof bundle includes witness manifests and no weak placeholder truths remain
- settlement precision is replayable end-to-end without hidden float ambiguity in critical accounting paths
- fixture/scenario corpus materially exceeds the seeded gold path
- tests cover realistic GitHub shapes, malformed inputs, privacy boundaries, issuer-policy edges, and multi-asset accounting stress
