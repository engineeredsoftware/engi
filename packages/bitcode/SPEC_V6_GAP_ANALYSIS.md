# Bitcode Spec V6 vs Original Demo — Gap Analysis and Implementation Guide

## Executive summary

The original demo had the right *story direction* but the wrong *system shape* for Spec V6.

It modeled:
- deposits,
- private reads,
- receipts,
- contributor allocation,
- optional buyer-value evidence.

Spec V6 instead requires a much more explicit pipeline:
1. measure a GitHub-bound engineering need,
2. rank candidate assets with named subscores,
3. apply separate verification determinisms,
4. derive final use tiers,
5. assemble an asset pack,
6. create a private Bitcode remediation branch artifact set,
7. settle via exact journal diff.

## Major gaps in the original demo

### 1. Need measurement gap
**Spec V6:** `GitHubNeedDescriptor` built from repo context + benchmark / CI evidence.

**Original demo:** free-text buyer query only.

**Change needed:** replace free-text-first retrieval with a seeded deterministic GitHub need scenario and explicit `need.json` shape.

---

### 2. Candidate asset model gap
**Spec V6:** `CandidateAsset` with:
- `artifactKind`
- `contentUnits`
- `contentRoot`
- attestation / provenance / verification evidence
- source-material binding

**Original demo:** coarse asset commitment with chunk list and booleans.

**Change needed:** refactor deposits into Spec-shaped candidate assets and content units.

---

### 3. Ranking model gap
**Spec V6:** final ranking score =
- need match
- benchmark impact likelihood
- actionability
- penalties

**Original demo:** lexical chunk overlap + asset measurement carry.

**Change needed:** replace ranking with deterministic implementations of the spec subscore families and explicit penalty objects.

---

### 4. Verification gap
**Spec V6:** verification determinisms are separate from ranking:
- issuance verification
- provenance verification
- verification sufficiency
- issuer policy status
- final use-tier derivation

**Original demo:** verification was folded into coarse asset booleans and never produced use tiers.

**Change needed:** add explicit verification objects and tier propagation.

---

### 5. Asset pack gap
**Spec V6:** select a final `AssetPack` and lock selected assets / units.

**Original demo:** no asset-pack abstraction; selected chunks were emitted directly in bundle issuance.

**Change needed:** assemble and persist `asset-pack.lock.json` inputs.

---

### 6. Buyer UX gap
**Spec V6:** the primary CTA is **Make Bitcode branch**.

**Original demo:** licensed query and separate utility receipt flow.

**Change needed:** shift UI/API from “issue bundle for query” to “make Bitcode branch” from a measured need.

---

### 7. Deliverables gap
**Spec V6:** remediation branch must contain:
- `.engi/need.json`
- `.engi/match-report.json`
- `.engi/verification-report.json`
- `.engi/eval-manifest.json`
- `.engi/asset-pack.lock.json`
- `.engi/settlement-preview.json`
- `.engi/system-proof-bundle.json`
- `.engi/source-material/`
- `BITCODE_NEED.md`

**Original demo:** receipts, proof log, schemas, and a private bundle payload.

**Change needed:** produce branch-artifact objects instead of only a returned private bundle.

---

### 8. Settlement / accounting gap
**Spec V6:** exact fixed-point settlement with journal diff invariants.

**Original demo:** visible-unit allocation + conservation check.

**Change needed:** implement:
- raw shares summing to 10000 bp
- settled shares = raw shares in default mode
- deterministic exact micro-unit allocation
- debit buyer license pool
- credit `supplier:<assetId>:pending_claims`
- before/after roots
- invariant checks

---

### 9. Proof bundle gap
**Spec V6:** cross-cutting proof surfaces, not just receipts.

**Original demo:** public receipts and auxiliary proof panels.

**Change needed:** add a deterministic `system-proof-bundle.json` with selection, journal, identity/auth, data-flow, and settlement proof objects.

## Concrete change list used for the refactor

### Data model
- replace old asset commitment shape with Spec-like `CandidateAsset`
- add explicit `contentUnits`
- add mocked GitHub need scenarios
- add buyer account / ledger state in micro-units
- persist latest run + run history

### Core pipeline
- implement `buildNeedDescriptor()`
- implement candidate recall
- implement `computeNeedMatch()`
- implement `computeBenchmarkImpact()`
- implement `computeActionability()`
- implement penalty generation
- implement verification determinisms
- implement use-tier derivation
- implement asset pack assembly
- implement raw-share normalization and exact micro-unit allocation
- implement `settleNeedEvent()` journal diff
- implement branch-artifact generation

### API
- keep `GET /api/state`
- keep `POST /api/deposits`
- replace `POST /api/license-query` with `POST /api/make-bitcode-branch`
- remove the centrality of `POST /api/utility`
- keep `POST /api/reset`

### UI
- change hero and primary CTA to **Make Bitcode branch**
- replace licensed-query story with measured need -> ranking -> verification -> branch -> settlement
- show asset pack, branch files, journal diff, and ledger accounts
- keep deposit capability for live demo mutation

### Testing
- update API tests to assert:
  - seeded need scenario presence
  - Spec V6 branch creation endpoint
  - use-tiered evaluated candidates
  - branch artifacts exist
  - settlement journal diff invariants hold
  - ledger balances move exactly
- update core tests to assert:
  - asset shape
  - ranking / verification split
  - asset-pack construction
  - exact micro-unit conservation

## Remaining intentional simplifications

These are acceptable demo simplifications, not accidental omissions:
- no live GitHub integration
- no real branch creation on disk or in git
- no real private authz layer
- no LLM evaluators
- no automatic patch generation
- no revocation / retention execution beyond modeled proof objects

## Recommended interpretation of the current refactor

The refactored demo should be read as:

> a spec-faithful local simulation of the V6 control plane and artifact surface

—not yet as the production implementation of every external system boundary.
