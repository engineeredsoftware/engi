# Spec V8 Coverage Matrix

## Status
- Demo repo: `protocol-demonstration`
- Historical spec target: legacy V8
- Historical root pointer at authoring time: `V8`
- Current automated test count: **52 passing**
- Current implementation center of gravity:
  - `server.js`
  - `src/bitcode-demo.js`
  - `public/index.html`
  - `public/app.js`
  - `test/api.test.js`
  - `test/core.test.js`

## Purpose of this document
This file is the authoritative V8 implementation audit + design + plan for the local Bitcode package realization.

It serves four jobs at once:
1. **audit** current implementation against the V8 spec
2. **design** the remaining repo-shape and UX alignment work needed for a fully legible V8 demo
3. **document** exact implementation references, gaps, and intentional Profile A/Profile B boundaries
4. **plan** the concrete edits required to move from “substantively V8” to “cleanly, fully, presentation-grade V8”

## Versioning policy for legacy specs and preserved demo alignment
This repo preserves the legacy spec-versioning convention:
- each historical spec draft keeps its **own versioned file** under `_legacy/` (`ENGI_SPEC_VN.md`, notes, etc.)
- prior spec versions remain in place for history / diffability
- at the time, only the root canonical pointer changed to identify the current version
- demo implementation naming should avoid stale embedded version numbers when the file is the canonical current implementation

Therefore:
- spec docs should continue to version as `V1`, `V2`, ..., `V8`, ...
- the demo implementation file is canonically named **`src/bitcode-demo.js`**
- the coverage matrix should track V8 explicitly and document the remaining work needed to reach full V8 implementation and presentation closure

## Audit basis
The audit in this file is grounded in:
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V8.md`
- `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V8_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/server.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/src/bitcode-demo.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/public/index.html`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/test/api.test.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/HOST_CAPABILITIES.md`
- live test run after closure edits: `npm test` -> **52/52 passing**

---

## Coverage map

| Area | V8 expectation | Repo coverage | Audit status | Remaining work for full V8 closure |
|---|---|---|---|---|
| Need measurement | GitHub-bound benchmark parsing, fail-closed validation, need descriptor closure | `src/bitcode-demo.js`, `test/core.test.js`, `test/api.test.js` | **Pass** | no material implementation gap found |
| Prompt surfaces | Prompt templates, interpolation, context lineage, downstream artifact bindings | `src/bitcode-demo.js` prompt surfaces, `public/app.js`, prompt-lineage tests | **Pass** | improve operator UX wording / layout if needed, but implementation surface is present |
| Recall channels | lexical, symbolic, path, config, semantic/vector, artifact kind/type | `src/bitcode-demo.js` recall contracts + provenance tests | **Pass** | no material implementation gap found |
| Ranking explainability | need match, benchmark impact, penalty mass visual/detail surfaces | `public/app.js`, evaluation tests | **Pass** | tighten live-demo readability if necessary; current semantics are present |
| Verification separation | ranking separated from verification and use tiers | `src/bitcode-demo.js`, verification tests | **Pass** | no material implementation gap found |
| Identity/auth separation | identity bindings and authorization decisions separate from settlement/proofs | branch artifact tests + UI surfaces | **Pass** | no material implementation gap found |
| Signer separation | signer binding stays distinct from authz, GitHub, and settlement | asset creation tests + branch artifact surfaces | **Pass** | no material implementation gap found |
| GitHub boundary separation | explicit local-modeled vs external-only GitHub boundary surface | branch artifact tests + UI surfaces | **Pass** | no material implementation gap found |
| External boundary concretization | explicit contracts/manifests for formerly external-only areas | `.engi/external-boundary-manifest.json`, tests, UI surfaces | **Pass** | no material implementation gap found |
| Artifact upload precision | kind/type, visual/raw, signer/binding metadata | deposit API tests + asset creation tests | **Pass** | no material implementation gap found |
| Profile UX | Profile A vs B identity, operator meaning, and non-switchability surfaced | public state + UI artifacts | **Pass in runtime/UI; partial in repo docs** | update stale V7 repo docs and scripts to V8 language |
| Asset pack / branch artifacts | lock files, manifests, policy, source material | branch artifact tests | **Pass** | no material implementation gap found |
| Proof closure | proof contract, evidence chain, theorem checks, artifact bindings | `.engi/system-proof-bundle.json`, `.engi/settlement-proof.json`, proof tests | **Pass** | tighten wording for memo/demo polish only |
| Settlement | deterministic shares, exact accounting, exact theorem checks | settlement tests | **Pass formally; partial for demo semantics** | resolve / explain seeded zero-share selected settlement-eligible asset behavior |
| Telemetry / proof surfaces | telemetry, unit catalog, prompt implementation surface, system proof bundle | proof and telemetry tests | **Pass** | no material implementation gap found |
| Host capability documentation | durable host/runtime/tooling/network assumptions recorded | `HOST_CAPABILITIES.md`, `HOST_CAPABILITIES.json`, doc-presence test | **Pass** | no material implementation gap found |

---

## Detailed audit by V8 area

### Need measurement
**Audit status:** Pass

Implemented strongly in Profile A:
- canonical benchmark parser contract
- fail-closed validation
- explicit field derivations
- benchmark target artifact
- measurement provenance
- inference proofs

Main refs:
- `measureNeedFromScenario()` in `src/bitcode-demo.js`
- `buildGithubActionsBenchmarkParser()` in `src/bitcode-demo.js`
- tests:
  - `buildNeedDescriptor carries canonical run evidence, parser failure contract, and V8 derivation closure`
  - `measureNeedFromScenario fails closed when canonical benchmark outputs are malformed`

Design conclusion:
- this area is implementation-complete for V8 Profile A
- no further structural work required beyond keeping it stable during naming cleanup

### Prompt surfaces
**Audit status:** Pass

Implemented strongly in Profile A:
- first-class prompt artifact surface
- template text
- interpolated prompt
- interpolated values
- ordered context inputs
- evidence refs
- output fields
- downstream artifact bindings
- evaluator-surface metadata

Main refs:
- `buildPromptSurface()`
- `promptSurfaces` produced in `measureNeedFromScenario()`
- `.engi/prompt-surfaces.json`
- `public/app.js` prompt visualizations
- prompt-lineage tests in `test/core.test.js`

Design conclusion:
- prompt lineage is real, not decorative
- remaining work is UX polish only, not implementation completion

### Recall channels
**Audit status:** Pass

Implemented strongly in Profile A:
- semantic task search
- failure-mode search
- technical-context search
- lexical search
- symbol search
- path search
- config-key search
- artifact kind/type filtered search

Main refs:
- `RECALL_CHANNEL_SPECS`
- `buildRecallChannelContracts()`
- `recallCandidates()`

Design conclusion:
- recall contracts already meet V8 expectations
- no additional channel-family implementation work is currently required

### Ranking explainability
**Audit status:** Pass

Implemented strongly in Profile A:
- need-match group
- benchmark-impact group
- penalty-mass group
- explicit sequence / accumulation / references
- final rank decomposition

Main refs:
- `computeNeedMatch()`
- `computeBenchmarkImpact()`
- `computeActionability()`
- `computePenaltyMass()`
- `buildScoreGroups()`
- `public/app.js`

Design conclusion:
- score-group explainability is present and inspectable
- any remaining work should target live-demo clarity, not architecture

### Verification separation
**Audit status:** Pass

Implemented strongly in Profile A:
- separate issuance verification
- separate provenance verification
- separate verification sufficiency
- separate issuer policy status
- downstream use tiers and rights propagation

Main refs:
- `evaluateCandidates()`
- `buildVerificationReport()`
- tests around use tiers and branch-mode rights

Design conclusion:
- implementation is complete enough for V8
- keep stable while improving UI copy if needed

### Identity/auth separation
**Audit status:** Pass

Implemented strongly in Profile A:
- identity bindings artifact
- authorization decisions artifact
- policy release artifact
- identity/auth proof surface kept distinct from settlement proof surface

Main refs:
- `buildIdentityBindings()`
- `buildAuthorizationDecisions()`
- `buildBranchPolicyRelease()`
- `.engi/identity-bindings.json`
- `.engi/authorization-decisions.json`

Design conclusion:
- no material implementation gap found

### Signer separation
**Audit status:** Pass

Implemented strongly in Profile A:
- signer bindings remain separate from authz, GitHub, and settlement
- attestation structures remain explicit

Main refs:
- `makeCandidateAsset()`
- asset identity surface / attestation surface

Design conclusion:
- no material implementation gap found

### GitHub boundary separation
**Audit status:** Pass

Implemented strongly in Profile A:
- explicit local modeled binding
- explicit production-boundary meaning
- explicit artifact surface for GitHub boundary

Main refs:
- `buildGithubBoundarySurface()`
- `.engi/github-boundary.json`
- tests referencing branch artifact presence

Design conclusion:
- no material implementation gap found

### External boundary concretization
**Audit status:** Pass

Implemented strongly in Profile A as explicit boundary contracts for:
- GitHub App auth
- workflow artifact fetch
- branch / PR / review actions
- model execution
- vector store operations
- signer verification
- settlement/network effects

Main refs:
- `buildExternalBoundaryManifest()`
- `.engi/external-boundary-manifest.json`
- tests asserting manifest presence and interface coverage

Design conclusion:
- boundary interfaces are concrete enough for V8 finalization
- no new architecture work required here

### Artifact upload precision
**Audit status:** Pass

Implemented strongly in Profile A:
- artifact kind
- artifact type
- precision metadata
- visual preview
- raw content surface
- signer binding
- repo / commit / workflow binding

Main refs:
- `buildArtifactUploadSurface()`
- deposit API flow in `server.js`
- deposit tests in `test/api.test.js`

Design conclusion:
- no material implementation gap found

### Profile UX
**Audit status:** Pass in runtime/UI; partial in repo docs

Implemented strongly in runtime/UI:
- Profile A / Profile B surfaces in UI and public state
- explicit profile composition artifact
- non-switchability in local demo is made explicit

Main refs:
- `buildProfileCompositions()`
- `public/index.html`
- `public/app.js`
- state/API tests

Repo-consistency gap:
- resolved in this closure pass:
  - `README.md` now reads as V8
  - `SCRIPT.md` now reads as V8
  - `SCRIPT_SHORT.md` now reads as V8
  - `CHECKLIST.md` now reads as V8
  - canonical implementation file is now `src/bitcode-demo.js`

Design conclusion:
- runtime semantics are already V8
- remaining work is repo-language and operator-script cleanup

### Asset pack / branch artifacts
**Audit status:** Pass

Implemented strongly in Profile A:
- lock file
- selected source-material manifest
- policy / identity / auth / GitHub / upload / profile / prompt / external-boundary artifacts
- settlement preview / proof / journal diff / system proof bundle
- branch artifact contract assertion

Main refs:
- `buildBranchArtifacts()`
- `assertRequiredBranchArtifacts()`
- branch-artifact tests

Design conclusion:
- branch artifact family is V8-complete for Profile A

### Proof closure
**Audit status:** Pass

Implemented strongly in Profile A:
- proof contract
- evidence-chain staging
- theorem checks
- artifact bindings
- unified system proof bundle

Main refs:
- `buildProofContract()`
- `buildSettlementProof()`
- `buildSystemProofBundle()`
- proof tests in `test/core.test.js`

Design conclusion:
- proof closure is structurally complete
- remaining work is wording polish only if desired for demos / memos

### Settlement
**Audit status:** Pass formally; partial for seeded demo semantics

Implemented strongly in Profile A:
- deterministic raw + settled shares
- exact accounting journal diff
- debit / credit equality
- normalized basis points
- asset-pack lock binding
- receipt chain

Main refs:
- `settleNeedEvent()`
- settlement tests in `test/core.test.js`

Current design issue found during audit:
- in the seeded scenario, more than one asset can be selected and marked settlement-eligible while one selected settlement-eligible asset receives `0` basis points and `0` credited units

Why this matters:
- it is not a theorem failure
- it is a **demo coherence** issue
- it weakens the operator story unless it is either resolved or explicitly surfaced as intentional

Design conclusion:
- settlement engine is formally correct for current tests
- this closure pass should target **semantic legibility**, not accounting correctness

### Telemetry / proof surfaces
**Audit status:** Pass

Implemented strongly in Profile A:
- pipeline telemetry
- unit catalog
- prompt implementation surface
- system proof bundle integration

Main refs:
- `buildUnitCatalog()`
- `buildPipelineTelemetry()`
- `buildPromptImplementationSurface()`

Design conclusion:
- no material implementation gap found

### Host capability documentation
**Audit status:** Pass

Implemented strongly:
- durable host capability docs
- present vs absent vs modeled split
- explicit honesty about Profile A vs Profile B host assumptions

Main refs:
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`

Design conclusion:
- no material implementation gap found

---

## Cross-cutting audit findings

### 1. Implementation is already substantively V8
The current repo is not missing the core V8 implementation. The strongest conclusion from the audit is:
- runtime behavior is V8
- artifact surface is V8
- tests are V8
- UI shell is V8
- remaining work is mostly **repo truthfulness, naming hygiene, live-demo clarity, and final documentation closure**

### 2. The biggest current inconsistency is repo language, not runtime behavior
The code and tests largely tell a V8 story.
Some docs and filenames still tell a V7 story.

That inconsistency is now the highest-value cleanup target because it creates avoidable cognitive drag and undermines confidence during inspection.

### 3. The main remaining product/demo issue is settlement legibility
The seeded run currently allows:
- selected asset
- settlement-eligible asset
- zero credited units

That can be acceptable mathematically, but it is weak demo storytelling unless the distinction is made explicit.

---

## Design decisions for closing V8 cleanly

### Design decision A — canonical implementation naming should be version-implicit
Action:
- keep the canonical implementation at `src/bitcode-demo.js`

Rationale:
- spec files should remain versioned
- canonical implementation files should not carry stale version numbers once they represent the current official implementation
- this matches the preserved legacy pointer convention, where the historical root pointer identified the current spec version while historical versioned spec files remained intact

### Design decision B — the V8 coverage matrix should become the master finishing plan
Action:
- this file should continue to be the single source of truth for:
  - what V8 requires
  - what the repo already implements
  - what still needs editing / cleanup / polish

Rationale:
- avoids scattered TODOs across chat, memory, and repo docs
- gives a clean artifact for future V9 transition prep too

### Design decision C — settlement semantics should be clarified rather than hidden
Action:
- either:
  - exclude zero-marginal assets from settlement participation, or
  - explicitly separate “selected for branch use” from “credited in settlement”, or
  - keep current behavior but make zero-credit outcomes visible and justified in UI + tests

Rationale:
- preserves economic honesty while removing live-demo ambiguity

---

## Remaining work plan

### Phase 1 — repo truth / naming alignment
Goal: eliminate stale V7 framing where the repo is already V8.

Completed edits:
1. renamed `src/spec-v7-demo.js` -> `src/bitcode-demo.js`
2. updated imports in:
   - `server.js`
   - `test/api.test.js`
   - `test/core.test.js`
3. updated V7-labeled current-state docs to V8:
   - `README.md`
   - `SCRIPT.md`
   - `SCRIPT_SHORT.md`
   - `CHECKLIST.md`
4. retained runtime/UI consistency after rename

Acceptance status:
- no canonical current-state implementation file embeds `V7`
- no current-state operator doc claims V7 when describing current repo behavior
- tests rerun after closure pass: `npm test` -> 52/52 passing

### Phase 2 — settlement semantics / UX closure
Goal: make the default seeded demo run economically and visually legible.

Chosen design:
1. keep the current share logic because the zero-credit outcome is a real marginal-contribution result, not an accounting failure
2. explicitly distinguish:
   - selected branch assets
   - settlement participants
   - credited settlement assets
   - zero-credit selected/participating assets with reasons
3. update settlement artifacts, UI, and tests to pin that distinction

Acceptance criteria:
- seeded run is easy to explain live
- no silent-looking contradiction between selection and payout
- semantics are test-pinned, not accidental

### Phase 3 — document and operator-story closure
Goal: make the repo feel final, not merely correct.

Planned edits:
1. upgrade `README.md` to describe the repo as V8, not V7
2. re-sequence `SCRIPT.md` / `SCRIPT_SHORT.md` to match V8 operator story:
   1. measured need
   2. profile meaning
   3. prompt surfaces
   4. recall + score groups
   5. verification + rights
   6. asset pack + source material
   7. identity/auth/boundaries
   8. settlement + proof closure
3. update `CHECKLIST.md` to validate V8-specific surfaces rather than V7-specific copy
4. optionally add a concise current-state V8 architecture section or doc if the existing architecture map remains too backward-looking

Acceptance criteria:
- operator walkthrough docs align with what the repo actually shows
- a new reviewer can inspect the repo and see one coherent V8 story

---

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

### Additional test coverage added as part of V8 closure
- canonical implementation rename causes no behavior regression
- settlement semantics for seeded run are intentional and explicitly pinned
- current-state V8 docs / script references are reflected in operator-facing copy where testable

---

## Known external-only boundaries
Not covered locally because intentionally out of scope for Profile A:
- real GitHub App authentication
- live workflow/artifact fetches
- live PR / branch writes
- remote model routing and trace capture
- external vector stores
- production identity / signer verification
- production settlement execution / network confirmations

These remain acceptable V8 omissions for the local repo as long as:
- they stay explicit
- boundary contracts stay concrete
- the repo does not imply they are live when they are only modeled

---

## Definition of done for V8 closure
The local demo should be considered fully V8-implemented and presentation-clean when all of the following are true:
- the canonical implementation file is `src/bitcode-demo.js`
- current-state operator docs consistently say V8
- the coverage matrix remains accurate after rename and doc updates
- settlement behavior in the seeded run is semantically legible and intentionally tested
- Profile A vs Profile B wording is consistent across UI, code comments, and docs
- `npm test` remains fully passing after all cleanup work
