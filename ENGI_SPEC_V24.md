# ENGI Spec V24

## Status

- Scope: V24 system draft for realizing external interfacing after V23 deployed-infrastructure canon
- Current canonical/latest target: `V23`
- Current draft target: `V24`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Draft companion delta file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- Draft companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PARITY_MATRIX.md`
- Draft companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V23`
- Draft posture source: `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js` keeps `ACTIVE_CANON_VERSION = 'V23'` and `DRAFT_TARGET_VERSION = 'V24'`
- V24 state: drafting only; no V24 `_PROVEN_` appendix or `.engi/v24-*` generated reports may exist until V24 source and validation close

## Drafting and acceptance state

V23 closed first-gate deployed infrastructure by specifying and prototype-demonstrating:
- Bitcoin-facing commitment, anchor, and settlement carriers,
- sidechain-connected bridge posture,
- prototype compute and storage reality manifests,
- and a deterministic stubbed-testnet demonstration service boundary.

That leaves the next system question.
V24 is not centered on adding more modeled interfaces.
V24 is centered on realizing external interfacing for real ENGI operation:
- real Bitcoin and sidechain network execution,
- real audited compute and storage container execution,
- real GitHub App and repository interaction,
- and proof-bearing receipts for every real external effect ENGI claims.

V24 therefore is realization-facing.
Its job is to turn V23 boundary contracts into live, typed, auditable execution surfaces without relaxing ENGI's fail-closed posture.

## Version executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

V24 extends V23 from prototype-demonstrated deployment posture to real external realization posture:
- Bitcoin-backed settlement and anchor interfaces move from stubbed-testnet demonstration service to real network-capable execution classes,
- compute and storage reality move from prototype manifests to auditable execution containers with replay and attestation surfaces,
- GitHub boundaries move from modeled or partial prototype posture to real session, fetch, branch, PR, and artifact interaction receipts,
- and every real external effect must be represented as a proof-bearing artifact that can be replayed, audited, and fail closed if missing or contradictory.

The V24 position is still narrow:
- Bitcoin remains ENGI's audit and spend substrate, not ENGI's bulk proof-compute or bulk private storage layer,
- containerized compute and storage remain off-chain but become execution-attested,
- GitHub remains an external operating surface rather than a hidden side effect,
- and no external interface may count as realized unless ENGI emits auditable receipts and validation closes over them.

## Canonical ENGI executive summary

The ENGI operating chain remains:
1. authenticated repo supply and candidate deposits are brought into ENGI,
2. measured need is derived from benchmark, parser, and repo reality,
3. deposit-to-need fit is made explicit before deeper closure,
4. recall, ranking, verification, and use-tiering select an asset pack,
5. branch artifacts, proof artifacts, and witness artifacts are materialized,
6. projection and disclosure policy determine what each principal may inspect,
7. exact source-to-shares settlement and journal diff materialize NGI-denominated consequence surfaces,
8. commitment scopes bind bounded-public and private proof surfaces,
9. external spend, anchor, compute, storage, and GitHub observations bind real execution to those surfaces,
10. and generated reports plus emitted `.engi/` artifacts make the result auditable.

V24 does not replace the V23 Bitcoin-facing architecture.
It realizes the external interfaces V23 named.

## V24 inheritance rule

V24 inherits V23 as the immediate prior full-system authority.

That means:
- V23 commitment-scope derivation remains authoritative,
- V23 Bitcoin-facing artifact contracts remain authoritative,
- V23 sidechain bridge posture remains authoritative,
- V23 compute-reality and storage-reality concepts remain authoritative,
- V23 generated appendix discipline remains authoritative,
- and V24 may only convert a V23-modeled boundary into a realized boundary by adding audited execution surfaces rather than by loosening the contract.

V24 also inherits the V23 fail-closed rule.
For this version, that means:
- a real network effect without a matching execution receipt is invalid,
- a real container execution without replayable attestation is invalid,
- a real GitHub mutation without authorization, addressing, and execution receipts is invalid,
- and a future V24 promotion must fail closed if draft claims outrun source, tests, or generated evidence.

## Why V24 exists

### 1. V23 closed the interface contract but not real execution

V23 already specifies:
- bitcoin settlement intent and observation,
- anchor publication posture,
- sidechain bridge connection points,
- compute and storage reality manifests,
- and explicit external boundary specialization.

But V23 intentionally stops short of live execution.
V24 exists to convert that modeled honesty into real realized honesty.

### 2. Real ENGI operation requires auditable external execution classes

ENGI cannot remain only locally self-consistent if it claims real infrastructure posture.
Real operation requires:
- real BTC-backed spend and anchor execution,
- real storage publication and retrieval boundaries,
- real proof-computation execution containers,
- and real GitHub inventory, branch, PR, and artifact operations.

### 3. External execution must be proof-bearing, not merely successful

A live network or container effect is insufficient by itself.
V24 requires each execution class to produce:
- intent surfaces,
- execution receipts,
- observation receipts,
- replay handles,
- policy bindings,
- and proof-family closure.

### 4. ENGI needs one auditable model for all real external effects

V24 is where ENGI stops treating:
- network execution,
- container execution,
- storage publication,
- and GitHub mutations
as separate integration stories.

They become one external-realization model with shared proof expectations.

## V24 accepted drafting decisions

V24 accepts the following drafting decisions:

1. V24 is realization-facing rather than another interface-description release.
2. Bitcoin-backed infrastructure moves from stubbed-testnet demonstration service toward real network execution classes.
3. Sidechain connectivity remains inside first-gate V24 because the ENGI:BTC bridge must function across mainchain and sidechain realities.
4. ENGI proof computation remains off-chain, but V24 requires auditable compute containers for all real proof-bearing usages.
5. ENGI storage remains off-chain, but V24 requires auditable storage containers and publication receipts for all real artifact persistence and retrieval expectations.
6. GitHub remains an external boundary, but V24 requires end-to-end real GitHub App interfacings rather than modeled-only or partial prototype posture.
7. Every realized external interface must emit proof-bearing execution receipts and observation receipts that bind back to existing ENGI artifact, need, bundle, and settlement identities.
8. V24 keeps ENGI as the system name and NGI as the share and settlement denomination.
9. V24 promotion may only occur after real external execution classes are implemented, validated, and represented in generated evidence.

## V24 source-of-truth hierarchy

While V24 is a draft, current truth order is:
1. `ENGI_SPEC.txt`
2. `ENGI_SPEC_V23.md`
3. `ENGI_SPEC_V23_DELTA.md`
4. `ENGI_SPEC_V23_PARITY_MATRIX.md`
5. `ENGI_SPEC_V23_PROVEN.md`
6. active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v23-*` artifacts
7. `ENGI_SPEC_V24.md`
8. `ENGI_SPEC_V24_DELTA.md`
9. `ENGI_SPEC_V24_PARITY_MATRIX.md`
10. `ENGI_SPEC_V24_NOTES.md`
11. current source and tests explicitly referenced by active canon or V24 draft

V24 cannot outrank V23 until promotion.

## V24 system goals, non-goals, and design principles

### Goals

1. Realize Bitcoin-backed execution from V23 boundary contracts into real network-capable spend and anchor surfaces.
2. Realize sidechain bridge execution as a proof-bearing external effect rather than a placeholder connection point.
3. Define auditable compute containers for proof computation, evaluation, verification, and other real ENGI execution workloads.
4. Define auditable storage containers for artifact persistence, retrieval, publication, and retention-boundary enforcement.
5. Define end-to-end real GitHub App interfacings for installation sessions, inventory, artifact fetch, branch publication, and PR updates.
6. Require proof-bearing execution receipts and fail-closed validation for all realized external effects.

### Non-goals

1. Moving ENGI bulk compute or private proof storage onto Bitcoin mainchain.
2. Replacing V23 commitment-scope derivation, exact settlement, or disclosure-boundary semantics.
3. Treating containerization as merely operational convenience rather than a proof-bearing interface.
4. Treating GitHub effects as acceptable if they are observable only in GitHub and not in ENGI artifacts.

### Design principles

- Real execution must remain auditable.
- Every external effect must have an intent, execution, observation, and proof surface.
- Containers must be attestable, replayable, and policy-bound.
- Storage publication must preserve principal-scoped disclosure and retention policy.
- Live GitHub interaction must preserve repo-authenticated supply, authorization, and proof closure.

## V24 system architecture and layer boundaries

V24 external realization is organized into five interacting layers:

1. `bitcoin-mainchain-execution`
   Real spend construction, signing coordination, broadcast, confirmation, and anchor publication.
2. `sidechain-execution`
   Real checkpointed bridge observation and any first-gate sidechain settlement execution required by ENGI's BTC bridge posture.
3. `compute-container-execution`
   Real containerized execution for proof computation, verification, evaluation, and replay.
4. `storage-container-execution`
   Real containerized persistence, retrieval, publication, and retention enforcement for ENGI artifacts.
5. `github-live-interface`
   Real GitHub App sessions, inventory fetch, artifact fetch, branch publication, issue/PR mutation, and observation receipts.

These layers remain external to ENGI's exact accounting and proof core, but they are no longer allowed to remain opaque.

## V24 real network execution rule

V24 fixes the realization boundary for Bitcoin-backed infrastructure:

- `audited-base-layer-purchase` must support real spend-intent, execution, broadcast, and confirmation receipts.
- `repeated-read-payment` must support a real payment-network execution class if V24 claims it as realized.
- `checkpointed-sidechain-bridge` must support real bridge and checkpoint observation if V24 claims it as realized.
- `bitcoin-anchor-publication` must support real anchor publication receipts, not only demonstration envelopes.

No V24 network surface counts as realized unless ENGI can produce:
- an execution policy ref,
- a request envelope,
- an execution receipt,
- an observation receipt,
- a replay handle,
- and proof-family closure over those artifacts.

## V24 compute and storage container rule

V24 converts V23 compute and storage reality from posture manifests into realized execution containers.

For compute containers, V24 requires:
- deterministic or policy-bounded container manifests,
- image or environment attestations,
- input and output sealing,
- execution receipts,
- replay handles,
- and proof linkage back to produced ENGI artifacts.

For storage containers, V24 requires:
- storage publication manifests,
- retrieval receipts,
- retention and deletion policy receipts,
- disclosure-boundary enforcement receipts,
- and proof linkage back to anchored or published ENGI artifacts.

Real ENGI usage may not bypass these container receipts.

## V24 GitHub live interfacing rule

V24 converts GitHub from a prototype or modeled boundary into a realized audited interface.

That includes:
- real installation-session receipts,
- real repo inventory fetch receipts,
- real workflow-artifact fetch receipts,
- real branch publication receipts,
- real PR or issue mutation receipts,
- and observation surfaces that bind GitHub effects back to ENGI need, asset-pack, proof, and settlement identities.

Any live GitHub operation must preserve:
- repo-authenticated supply,
- authorization and sensitive-flow posture,
- proof-family closure,
- and fail-closed behavior if GitHub observations drift from ENGI records.

## V24 artifact family additions

V24 draft adds the following candidate artifact family:

- `.engi/external-execution-policy.json`
- `.engi/network-capability-manifest.json`
- `.engi/bitcoin-network-intent.json`
- `.engi/bitcoin-network-execution.json`
- `.engi/bitcoin-network-observation.json`
- `.engi/sidechain-execution-receipt.json`
- `.engi/compute-container-manifest.json`
- `.engi/compute-container-execution.json`
- `.engi/storage-container-manifest.json`
- `.engi/storage-publication-receipt.json`
- `.engi/storage-retrieval-receipt.json`
- `.engi/github-live-session.json`
- `.engi/github-inventory-fetch-receipt.json`
- `.engi/github-artifact-fetch-receipt.json`
- `.engi/github-branch-publication-receipt.json`
- `.engi/github-pr-update-receipt.json`
- `.engi/external-realization-proof.json`
- `.engi/container-reality-proof.json`
- `.engi/github-live-interface-proof.json`

The final V24 artifact list may contract or expand, but every realized external interface must map to a concrete emitted artifact.

## V24 proof-family additions

V24 opens the following draft proof families:

### External-realization-execution

- `proofArtifactPath:` `.engi/external-realization-proof.json`
- `members:` bitcoin network intent binding, bitcoin execution receipt binding, bitcoin observation closure, sidechain execution closure, external execution policy closure
- `theorems:` live execution receipts match declared intents, observed network state matches declared execution, journal finalization does not outrun execution observation, anchor publication is backed by real network receipt
- `replay basis:` replay from execution policy, network receipts, anchor receipts, and settlement artifacts

### Containerized-reality

- `proofArtifactPath:` `.engi/container-reality-proof.json`
- `members:` compute container manifest binding, compute execution receipt binding, storage manifest binding, storage publication and retrieval receipt binding, disclosure and retention closure
- `theorems:` container execution is attributable and replayable, produced artifacts match declared execution environment, storage publication respects disclosure boundary, storage retrieval and retention posture remain auditable
- `replay basis:` replay from container manifests, attestation surfaces, execution receipts, and affected artifact digests

### GitHub-live-interface

- `proofArtifactPath:` `.engi/github-live-interface-proof.json`
- `members:` live session binding, inventory fetch binding, artifact fetch binding, branch publication binding, PR mutation binding
- `theorems:` GitHub effects preserve repo-authenticated provenance, live mutations match declared addressing and authorization, fetched GitHub artifacts match ENGI-recorded inventory and content roots
- `replay basis:` replay from GitHub session receipts, addressing roots, execution receipts, and resulting ENGI artifacts

## V24 principal-scoped execution and disclosure policy

V24 keeps V23 principal-scoped disclosure intact.

That means:
- public surfaces may inspect only bounded-public anchor and bounded-public publication receipts,
- reviewer surfaces may inspect replay-capable summaries and non-sensitive execution receipts,
- buyer surfaces may inspect settlement-, bundle-, and purchase-relevant execution receipts,
- internal surfaces may inspect full execution and container manifests where policy allows.

Live execution does not weaken disclosure policy.
It increases the number of private proof-bearing artifacts ENGI must classify correctly.

## V24 acceptance criteria

The following acceptance criteria are the review gate for V24 drafting:

1. V24 clearly keeps V23 active and does not claim promotion.
2. V24 states that real external execution, not additional modeling, is the center of the version.
3. V24 covers all three user-requested realization axes:
   - BTC-backed real network execution,
   - auditable compute and storage containers,
   - end-to-end real GitHub interfacings.
4. V24 defines concrete artifact families for each realized external effect class.
5. V24 defines concrete proof families for network execution, containers, and GitHub interfacing.
6. V24 preserves V23 commitment, disclosure, settlement, and NGI denomination rules unless explicitly extended.
7. V24 requires proof-bearing execution and observation receipts rather than informal operational success.
8. V24 keeps sidechain execution in scope as a required bridge component.
9. V24 states promotion prerequisites separately from drafting acceptance.

The following acceptance criteria are the later implementation/promotion gate:

1. Source emits the realized V24 external-execution artifact family.
2. Source emits real container manifests and execution receipts for compute and storage.
3. Source emits real GitHub session and mutation receipts for end-to-end GitHub interfacings.
4. Deliverables classification and projection policy classify all new V24 artifacts correctly.
5. Proof-witness manifest and proof-contract include all new V24 proof families.
6. Tests fail closed on receipt drift, network drift, container attestation drift, storage policy drift, GitHub observation drift, and disclosure leakage.
7. Generated V24 reports and `ENGI_SPEC_V24_PROVEN.md` exist.
8. Only then may `ENGI_SPEC.txt` point to `V24`.

## Accepted boundaries

Still explicitly outside first-gate V24 drafting:
- moving bulk proof computation to Bitcoin mainchain,
- moving private artifact payloads to public-chain storage,
- claiming threshold or federated policy specifics before source chooses them,
- and claiming any realized network, container, or GitHub path before proof-bearing receipts exist in source.

## V24 completion condition

This V24 draft is first-gate complete only when:
1. the V24 file family exists,
2. the realization center is explicit,
3. artifact and proof-family additions are concrete rather than gestural,
4. review-gate and promotion-gate acceptance criteria are distinct,
5. and the draft can be implemented without ambiguity about what counts as a realized external effect.
