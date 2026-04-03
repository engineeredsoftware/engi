# ENGI Spec V8

## Status
- Spec version: V8
- Demo conformance profile: **Profile A — local deterministic V8 prototype**
- Production intent profile: **Profile B — GitHub/App and external production boundary**

## Why V8 exists
V8 closes the gap between a strong local prototype and a spec that reads as final, demonstrable, and inspection-ready.

Relative to V7, V8 finalizes:
- recall-channel contracts and signal hand-offs
- score-group explainability
- prompt surfaces and prompt lineage
- proof closure and theorem/invariant legibility
- auth / identity / signer separation
- artifact upload precision
- concrete Profile A vs Profile B boundary objects
- operator-facing UX for profile meaning and demo sequencing

The bar is no longer “the pipeline basically works.” The bar is: an operator can point at each major ENGI claim and show the exact artifact, lineage, boundary, and proof surface that supports it.

---

## V8 operator story
1. Measure a GitHub-bound engineering need from canonical benchmark evidence.
2. Derive prompts and evaluator surfaces with explicit context lineage.
3. Recall candidate assets across finalized retrieval channels.
4. Rank with first-class score groups:
   - need match
   - benchmark impact
   - penalty mass
5. Verify independently from ranking.
6. Materialize a private remediation branch artifact set.
7. Compute deterministic settlement over settlement-eligible assets only.
8. Publish only a bounded public proof while keeping private proof artifacts private.

---

## Profiles are first-class

### Profile A — local deterministic V8 prototype
This profile is implemented in this repo.

Meaning:
- what the audience sees is real for this local prototype
- all branch artifacts, prompt surfaces, score surfaces, and proof surfaces are inspectable
- deterministic stand-ins satisfy the same schema/contract surfaces that Profile B would consume

Used for demoing:
- need measurement
- prompt interpolation and prompt lineage
- recall + ranking explainability
- proof bundle closure
- exact-accounting settlement demo

### Profile B — GitHub/App and external production boundary
This profile is specified concretely but intentionally not switchable in-demo.

Meaning:
- the external contracts are not vague or hand-waved
- the repo shows the exact boundary interfaces and expected artifacts
- the repo does **not** fake live GitHub App auth, remote model execution, signer verification, or network settlement

Why it is not switchable in-demo:
- switching to Profile B would imply live GitHub/App auth
- live workflow/artifact fetches
- live branch / PR / review writes
- external evaluator/model routing
- external vector-store execution
- external signer verification
- settlement/network effects

V8 requires the operator experience to make this distinction obvious, not merely implied.

---

## Core V8 pipeline

### 1. Need measurement
Input:
- canonical benchmark evidence bound to a GitHub run

Output:
- `need.json`
- `need-measurement.json`
- `benchmark-target.json`

Requirements:
- parser must be fail-closed
- derivations must be explicit
- need fields must carry lineage / evidence refs

### 2. Prompt surfaces
Prompt is now a first-class ENGI implementation surface.

V8 requires:
- explicit prompt template text
- explicit interpolated values
- explicit context inputs and evidence refs
- explicit output fields
- explicit downstream artifact bindings

Prompt surfaces must make it easy to answer:
- what context flowed into the prompt
- where that context came from
- what output was derived
- where that output is used downstream

Prompt surfaces are not limited to “future Profile B.” They also exist in Profile A as deterministic replay/lineage artifacts.

### 3. Recall
Finalized recall channels:
- semantic/vector task search
- semantic/vector failure-mode search
- semantic/vector technical-context search
- lexical search
- symbolic search
- path search
- config-key search
- artifact kind/type filtered search

For each channel, V8 requires contracts for:
- determined from
- recorded in
- vectorized in, if applicable
- searched by
- scored by
- ranked usage
- downstream uses

### 4. Ranking
V8 ranking must expose explainable groups rather than a single opaque score.

#### Need match
Answers:
- does this asset materially fit the specific measured need?

Includes:
- task semantic fit
- failure mode fit
- symbol fit
- path fit
- stack/context fit
- constraint fit
- artifact kind/type fit
- lexical support

#### Benchmark impact
Answers:
- if applied, how likely is this asset to improve the failing benchmark slices?

Includes:
- likely improves failing cases
- likely improves weak dimensions
- likely generalizes to repo context

#### Penalty mass
Answers:
- what subtractive adjustments are being applied and why?

Includes explicit penalty reasons such as:
- artifact mismatch
- weak benchmark linkage
- repo-context mismatch
- generic content
- stale/misaligned versioning

Penalty mass must be shown as an accumulation surface, not as a hidden scalar.

### 5. Verification / use-tier gating
V8 preserves and sharpens the separation:
- ranking decides relevance
- verification decides evidentiary sufficiency
- issuer policy decides ceilings / caps
- rights propagate from use tier
- settlement only consumes settlement-eligible assets

### 6. Asset pack assembly
V8 asset-pack assembly must lock:
- selected assets
- selected units
- content roots
- attestation hashes
- allowed use tiers
- branch mode

### 7. Branch artifact materialization
Required branch artifacts include at least:
- `.engi/need.json`
- `.engi/need-measurement.json`
- `.engi/benchmark-target.json`
- `.engi/match-report.json`
- `.engi/verification-report.json`
- `.engi/eval-manifest.json`
- `.engi/asset-pack.lock.json`
- `.engi/selected-source-material.json`
- `.engi/identity-bindings.json`
- `.engi/authorization-decisions.json`
- `.engi/github-boundary.json`
- `.engi/artifact-upload-manifest.json`
- `.engi/profile-composition.json`
- `.engi/prompt-surfaces.json`
- `.engi/external-boundary-manifest.json`
- `.engi/sensitive-data-flow.json`
- `.engi/policy-release.json`
- `.engi/unit-catalog.json`
- `.engi/pipeline-telemetry.json`
- `.engi/settlement-preview.json`
- `.engi/settlement-proof.json`
- `.engi/journal-diff.json`
- `.engi/system-proof-bundle.json`
- `ENGI_NEED.md`
- materialized `.engi/source-material/*`

### 8. Settlement
V8 settlement must show:
- exact raw shares
- exact settled shares
- exact debit / credit journal diff
- exact allocation conservation
- replayable receipt chain
- lock binding to selected asset/unit refs

### 9. Bounded public proof
V8 bounded public proof must remain clearly redacted.
It may expose:
- selected asset IDs
- invariant summaries
- redaction status
- proof-contract references
- stage-level evidence-chain metadata

It must not expose private proof artifacts or private source material.

---

## Prompt surfaces in V8

### Why prompt is first-class
In ENGI, prompt/evaluator derivation is not UI garnish. It is part of the system’s evidence chain.

If a need field, evaluator judgment, or derived recommendation comes from a prompt-like synthesis step, V8 requires that step to be inspectable.

### Prompt surface contract
Each prompt surface should include:
- `promptId`
- purpose
- template version
- template text
- interpolated prompt
- interpolated values
- ordered context inputs
- evidence refs for those inputs
- output fields
- downstream artifacts
- evaluator surface metadata

### Prompt lineage requirement
The operator should be able to trace:
- benchmark evidence -> prompt context
- prompt template -> interpolated prompt
- interpolated prompt -> derived field/output
- derived field/output -> ranking / proof / branch artifacts

---

## Proof closure in V8

### Why proof needed strengthening
Earlier prototype proof surfaces could read as placeholders or loosely assembled metadata.

V8 requires proof surfaces to read as confidently final and demonstrably working:
- explicit proof contract
- explicit evidence chain
- explicit theorem / invariant checks
- explicit artifact bindings
- explicit references into upstream artifacts

### Proof contract
The proof contract must identify:
- need ID
- asset pack ID
- branch name
- evidence-chain stages
- theorem checks claimed
- asset / attestation bindings
- counts or references for authorization and sensitive-flow records

### System proof bundle
The system proof bundle should unify:
- inference proofs
- prompt implementation surface
- asset measurement proofs
- selection consistency proof
- journal completeness proof
- identity / authorization proof
- sensitive-data-flow proof
- settlement proof
- proof contract

### Settlement proof expectations
Settlement proof must state and check at least:
- raw shares normalized
- settled shares normalized
- allocation conserved
- debits equal credits
- no negative balances
- refs closed
- state-root integrity

---

## Identity / auth / signer separation
V8 requires separate surfaces for:
- identity bindings
- authorization decisions
- signer / attestation bindings
- GitHub boundary
- settlement / proof

These concerns must not be collapsed into one generic “verification” blob.

---

## Artifact upload surface
Uploads in V8 carry:
- artifact kind
- artifact type
- visual preview
- raw content
- source repo
- source commit
- workflow run ID
- signer address
- upload precision metadata

V8 requires both visual and raw inspection where possible.

---

## External boundary concretization
Formerly “outside local prototype” areas are now pulled into V8 as concrete boundary interfaces.

V8 must concretize, without faking live execution:
- GitHub App auth
- workflow artifact fetch
- branch / PR / review actions
- model execution
- vector store operations
- signer / identity verification
- settlement / network effects

For each, V8 should provide:
- interface ID and label
- Profile A behavior
- Profile B contract
- expected boundary artifacts / manifests
- explicit statement of what is modeled vs live

---

## Host capability documentation
V8 now expects durable local-host capability documentation for the demo/spec implementation.

It should cover:
- system/runtime surfaces
- command-line/global programs
- inference/model needs
- GitHub / remote connection assumptions
- what is present vs absent vs modeled

This keeps Profile A claims honest and prevents Profile B requirements from remaining implicit.

---

## Demo expectations
The demo should make it easy to answer:
- why the need exists
- which prompts were used and with what context
- why an asset was recalled
- why it ranked where it ranked
- why it did or did not pass verification
- why it was or was not settlement-eligible
- what artifact was materialized and under which rights
- what proof closes each major claim
- what is truly local vs what is a concrete external boundary

---

## Non-goals for this repo
Still truly external / non-demoable in local Profile A:
- real GitHub App installation auth and token exchange
- live workflow artifact fetches
- live branch / PR / review writes
- remote model execution
- external vector-store infrastructure
- real signer verification against external authorities
- production settlement network effects
