# ENGI Demo Script — Spec V7

This is the live presentation / interactive QA script for the current ENGI V7 deterministic prototype.

---

## One-sentence thesis

ENGI measures a GitHub-bound engineering need, matches the right technical intelligence supply to it, materializes an inspectable private remediation branch artifact set, and proves exactly how value moves through the system.

---

## What this demo is

This demo is **Profile A — local deterministic prototype** behavior for ENGI Spec V7.

It is meant to demonstrate:
- need measurement from GitHub-bound benchmark evidence,
- candidate recall and hybrid matching,
- ranking vs verification separation,
- use-tier propagation and branch-mode rights,
- artifact materialization,
- telemetry / proof / policy surfaces,
- exact settlement and journal closure.

It is **not** a live GitHub-integrated production deployment.

---

## Demo URL

Default local URL:

`http://127.0.0.1:4318`

---

## Opening frame

Say something like:

> ENGI is a system for turning engineering knowledge into an inspectable remediation pipeline.
>
> In Spec V7, the key idea is not just storing or retrieving technical knowledge. The key idea is measuring a real GitHub-bound need, selecting the right technical intelligence supply for that need, materializing governed artifacts for remediation, and proving how value and rights flow through the system.

Then point out:
- Spec V7
- Profile A / Profile B framing
- the seeded GitHub-bound auth rollback scenario

Important line:

> This is a deterministic local prototype of the control plane, not a fake claim that all external production boundaries are already wired up.

---

## Gold-path walkthrough

### 1. GitHub-bound need measurement

#### Where to look

- scenario / need section
- parser / benchmark evidence surface
- conformance profile labeling

#### What to say

> The demo begins with a buyer need that is GitHub-bound. A buyer branch and GitHub Actions benchmark run define the operational context.
>
> ENGI does not treat the task as a loose prompt. It normalizes workflow evidence through a declared parser contract and derives a canonical need descriptor.

Point out:
- canonical run evidence
- parser contract
- need field derivations / normalization closure
- benchmark targets / failure modes / constraints

Important line:

> The need descriptor is a measured object, not just a text box.

Operator note:

> Keep the demo in **Visual** mode by default so people can follow the story, then flip any artifact to **Raw** when you want to prove the exact JSON contract.

---

### 2. Candidate recall and hybrid matching

#### Where to look

- evaluated candidates
- recall / fusion surfaces
- explainability details

#### What to say

> Once the need is measured, ENGI recalls candidate assets through multiple channels: task alignment, failure-mode overlap, technical-context overlap, lexical/symbol/path/config matching, and artifact-kind compatibility.
>
> In the local prototype, embeddings and higher-dimensional retrieval are deterministic stand-ins, but the interface is already codified so Profile B can replace them cleanly later.

Point out:
- multi-channel recall / fusion
- strongest signals
- query/vector contracts if visible
- top-ranked rollback/auth asset

Important line:

> The point is not “search found a document.” The point is “the system can explain why this technical asset is a fit for this engineering need.”

---

### 3. Ranking vs verification

#### Where to look

- ranking breakdown
- verification surfaces
- use tiers

#### What to say

> Ranking and verification are intentionally separate.
>
> Ranking asks: how useful is this asset for the need?
>
> Verification asks: what is this asset actually allowed to do downstream? Can it be ranked only, used for context, materialized into a branch, or participate in settlement?

Point out:
- need match
- benchmark impact
- actionability
- penalties
- issuance verification
- provenance verification
- sufficiency
- issuer policy
- final use tier

Important line:

> A useful asset is not automatically a settlement-eligible asset.

---

### 4. Asset pack and private remediation branch artifacts

#### Where to look

- asset pack / asset-pack lock
- branch artifacts

#### What to say

> After ranking and verification, ENGI assembles a locked asset pack.
>
> That lock then drives the private remediation branch artifact set.
>
> The branch is the buyer-facing delivery surface: measured need, selected source material, authorization decisions, policy release, telemetry, and settlement preview all travel together.

Point out artifacts such as:
- `.engi/need.json`
- `.engi/verification-report.json`
- `.engi/asset-pack.lock.json`
- `.engi/authorization-decisions.json`
- `.engi/sensitive-data-flow.json`
- `.engi/policy-release.json`
- `.engi/unit-catalog.json`
- `.engi/pipeline-telemetry.json`
- `.engi/system-proof-bundle.json`
- `ENGI_NEED.md`

Important line:

> The branch artifact set is the inspectable remediation package, not just a hidden internal state blob.

Operator note:

> Every major artifact card now shares the same Visual|Raw toggle, so you can move fluidly between human legibility and exact machine-facing structure.

---

### 5. Telemetry and advanced V7 surfaces

#### Where to look

- unit catalog
- pipeline telemetry
- proof bundle / eval manifest

#### What to say

> V7 adds stronger interface codification around unitization, semantics, embeddings, evaluator surfaces, and telemetry.
>
> So now the demo can show not only what was selected, but how units were derived, what metadata/vector contracts exist, how recall/scoring hand-offs happened, and how those choices fed settlement and proof.

Point out:
- unit catalog
- pipeline telemetry
- prompt / evaluator implementation surfaces
- static vs inferred provenance

Important line:

> Even where Profile A still uses deterministic stand-ins, the interfaces are now explicit enough that production implementations can slot in without changing the surrounding contracts.

---

### 6. Settlement and proof closure

#### Where to look

- settlement preview
- journal diff
- proof bundle

#### What to say

> The demo ends on exact settlement closure.
>
> ENGI computes raw and settled shares, allocates exact micro-units, emits a journal diff, and proves the invariants — including the closure between the settlement proof and the asset-pack lock.

Point out:
- participating assets
- journal debits / credits
- `debitsEqualCredits = true`
- lock-hash binding
- policy / identity / sensitive-data proof surfaces

Important line:

> The system is not only selecting knowledge; it is proving the governed value movement around that selection.

---

## Recommended close

> ENGI turns engineering knowledge into a measurable, governable, inspectable remediation pipeline.
>
> In this V7 prototype, the system measures a GitHub-bound need, selects the right technical intelligence supply, materializes a governed branch artifact set, and proves both the operational and economic consequences.

---

## Interactive QA flow

Use this sequence when verifying the demo live:

1. open the app
2. reset seeded state
3. confirm Profile A + Spec V7 labels
4. confirm the auth rollback scenario
5. click **Make ENGI branch**
6. inspect evaluated candidates
7. inspect branch artifacts
8. inspect unit catalog + pipeline telemetry
9. inspect settlement preview / journal diff / proof bundle
10. confirm the app still communicates Profile A vs Profile B clearly

---

## Seeded scenario reminder

- Buyer: `Frontier Code Systems`
- Repo: `frontier/demo-auth`
- Scenario: auth issuer rollback / migration recovery
- Expected strongest asset: `Enterprise auth migration rollback playbook`
- Important V7-only surfaces:
  - field derivations
  - use-tier rights
  - asset-pack-lock closure
  - unit catalog
  - pipeline telemetry
  - prompt/evaluator implementation surfaces

---

## Do not overclaim

Do **not** present the current demo as:
- a live GitHub App deployment,
- a real embedding/vector DB service,
- a live evaluator/prompt-routing system,
- a production authz / retention / disclosure enforcement plane,
- a real external proof-publication system.

Present it as:
- a **Spec V7 Profile A deterministic prototype**
- with strong codification of the production-facing hand-offs and artifact contracts.