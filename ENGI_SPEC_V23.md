# ENGI Spec V23

## Status

- Scope: V23 canonical system specification for bitcoin-backed audit, sidechain-connected settlement interfaces, and deployed compute/storage reality after V22 truth-aligned canon
- Current canonical/latest target: `V23`
- Canonical proof-source commit: `ea3cdb1541c9c0016753450091fa21ea090cc819`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v23-spec-family-report.json`, `.engi/v23-canonical-input-report.json`, and `.engi/v23-canon-posture-drift-report.json`; `ENGI_SPEC_V23_PROVEN.md` is the active generated proof appendix for V23
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_NOTES.md`
- Companion delta file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_DELTA.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PARITY_MATRIX.md`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PROVEN.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V22`
- Current canonical/latest target remains `V22`; `V23` is the current draft target only
- Inherited canonical proof-source commit from the active anchor: `5c3410df386022bb3f7c9c102c60724be46fe1c1`
- Source parity state: V23 source-side bitcoin-facing artifacts, sidechain-connected settlement interfaces, prototype compute/storage reality manifests, canon-posture drift detection, and generated evidence are canonicalized in the promoted V23 file family
- V23 state: canonical promotion complete; V23 is the active deployed-infrastructure canon and runtime, API, browser shell, tests, demo-local docs, and generated canon are aligned
- Last fully realized canonical target preserved in source: `V23`

## Drafting and acceptance state

V22 returned ENGI to system work and closed first-gate runtime/API/browser/doc truth alignment.

That changes the next draft question.
V23 is not centered on whether ENGI can specify itself correctly.
V23 is centered on how ENGI's already-auditable proof and settlement surfaces should bind to an external public audit substrate and a spend-native settlement interface without overstating what is already live.

V23 is therefore deployment-facing.
Its job is to:
- treat Bitcoin first as public audit infrastructure,
- keep ENGI proof computation and bulk artifact storage off-chain by default,
- make principal-scoped public and private commitment roots explicit,
- define audited spend and confirmation carriers that bind payment to bundle and settlement closure,
- keep a sidechain connection point inside first-gate V23 so the ENGI:BTC bridge is not mainchain-only,
- and keep active-canon honesty intact while those deployment rails remain unimplemented in source.

## Version executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

V23 does not change that identity.
It extends the V22 system by drafting the next deployment-facing layer:
- exact ENGI proofs and settlement artifacts continue to materialize off-chain in deterministic ENGI runtime surfaces,
- stable canonical hashing and proof-witness manifests already emitted by current source become the commitment substrate,
- bounded-public and private proof surfaces become separately anchorable commitment scopes,
- bounded-public and private commitment scopes become separately replayable and auditable,
- NGI remains the denomination for share and settlement units while ENGI remains the name of the system,
- and buyer payment plus public audit anchoring become explicit boundary contracts rather than an unnamed future network effect.

The core V23 position is narrow and intentional:
- Bitcoin belongs in ENGI first as a public commitment ledger, spend ledger, and dispute-visible time substrate,
- not as ENGI's bulk proof-compute layer,
- not as ENGI's bulk private artifact store,
- and not as a pretense that the current local prototype already executes live BTC transactions.

## Canonical ENGI executive summary

ENGI's current operating chain remains:
1. authenticated repo supply and candidate deposits are brought into ENGI,
2. a benchmark- and parser-bound need is measured,
   which remains the measured need surface V23 inherits from V22,
3. deposit-to-need fit is made explicit before deeper closure,
4. recall, ranking, verification, and use-tiering select an asset pack,
5. branch artifacts, proof artifacts, and witness artifacts are materialized,
6. projection and disclosure policy determine what each principal may inspect,
7. exact source-to-shares settlement and journal diff materialize contribution and accounting consequences,
8. commitment scopes may be derived over bounded-public and private proof surfaces,
9. external spend, anchor, and confirmation observations may bind value transfer and public audit receipts to those scopes,
10. and generated reports, generated appendices, and emitted `.engi/` artifacts make the result auditable.

V23 does not replace any V22 subsystem.
It inserts an explicit external audit and settlement layer after proof, disclosure, and exact accounting are already closed.

## V23 inheritance rule

V23 inherits V22 as the active full-system authority.

That means:
- V22 exact source-to-shares settlement remains authoritative,
- V22 disclosure-boundary rules remain authoritative,
- V22 proof-contract closure remains authoritative,
- V22 generated appendix discipline remains authoritative,
- and V23 must not treat any Bitcoin-facing artifact or spend interface as live unless current source and validation actually materialize it.

V23 also inherits the V22 rule that ENGI fails closed on hidden drift.
For this version, that means:
- public anchors must not leak non-disclosable artifacts,
- payment receipts must not finalize share- or journal-level consequences without explicit observation closure,
- and future promotion must fail closed if draft Bitcoin claims outrun implementation.

## V23 audit findings

### 1. Stable artifact hashing and witness closure already exist in source

Current source already provides the cryptographic substrate V23 needs:
- `engi-demo/src/canonical/run-artifacts.js` implements `canonicalJson(...)` and `stableHashObject(...)`,
- `engi-demo/src/canonical/proof-materialization.js` uses the same canonical hashing discipline for proof-bearing surfaces,
- and `engi-demo/src/canonical/proof-materialization.js` already emits `.engi/proof-witness-manifest.json` with per-artifact digests and proof-family bindings.

V23 therefore does not need to invent an anchor substrate.
It needs to specify how those stable digests become public and private commitment scopes.

### 2. Exact settlement already closes over a satoshi-scale event size

Current source exports `METERED_MICRO_UNITS = '100000000'` in `engi-demo/src/engi-demo.js`, and `engi-demo/src/canonical/settlement.js` allocates exact micro-units against that value during settlement preview and journal materialization.

V23 therefore can specify BTC-denominated settlement interfaces without changing ENGI's existing exact accounting model.
The new work is binding that event size to audited spend and confirmation artifacts, not replacing the source-to-shares engine.

## V23 denomination and naming rule

V23 fixes the naming boundary between the system and its units:

- `ENGI` names the system, protocol, runtime, and artifact family.
- `NGI` names the share denomination and settlement unit emitted by ENGI.
- `shareBp`, `settledShareBp`, `meteredMicroUnits`, credited micro-units, and any sidechain-bridge settlement amounts are NGI-denominated values.

First-gate V23 therefore interprets current exact-settlement integer carriers as NGI base units.
Until implementation catches up, current source may still carry generic field names such as `meteredMicroUnits`, but V23 BTC-facing artifact contracts must declare denomination explicitly.

### 3. Principal-scoped disclosure already supports public versus private anchoring

Current source already classifies emitted artifacts by confidentiality and disclosability:
- `engi-demo/src/canonical/run-artifacts.js` includes `confidentialityClass` and `potentiallyDisclosable`,
- `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, and `.engi/disclosure-proof.json` are already bounded-public surfaces,
- while `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, `.engi/source-to-shares.json`, `.engi/journal-diff.json`, and settlement proof surfaces remain private.

V23 therefore should anchor at least two scopes:
- a bounded-public commitment scope,
- and a private proof-and-settlement commitment scope.

### 4. The external boundary is already named, but not yet specialized

Current `engi-demo/src/engi-demo.js` already emits `.engi/external-boundary-manifest.json` and includes `settlement-network-effects` as a boundary interface whose local prototype is deterministic accounting only and whose external contract is still unimplemented.

V23 should specialize that generic boundary into Bitcoin-facing interfaces:
- audited spend construction,
- settlement execution observation,
- and public anchor publication.

### 5. The local prototype still does not execute networked settlement or external proof publication

Current `engi-demo/README.md` remains explicit that the repo does not:
- publish proof artifacts to an external system,
- execute real networked settlement effects,
- fetch live workflow artifacts,
- or run live model/network infrastructure.

V23 must preserve that honesty.
This file drafts the next deployment architecture.
It does not authorize user-facing claims that BTC integration is already live in the local prototype.

## V23 accepted drafting decisions

V23 accepts the following initial decisions:

1. V23 is deployment-facing and audit-facing rather than another truth-alignment release.
2. Bitcoin enters ENGI first as a public audit substrate and spend rail, not as the place where ENGI performs bulk proof computation or bulk private artifact storage.
3. ENGI proof computation, storage reality, and exact settlement remain off-chain and deterministic or content-addressed by default; Bitcoin binds compact commitments and spend receipts to those NGI-denominated results.
4. V23 opens two new proof-bearing families: `bitcoin-audit-anchor` and `bitcoin-settlement-interface`.
5. V23 requires at least one bounded-public commitment scope and one private proof-and-settlement commitment scope.
6. Public commitment scopes must derive only from artifacts already classified as `potentiallyDisclosable: true`; private commitment scopes may include full proof-contract and settlement closure surfaces.
7. Larger, reviewable purchases should default to audited spend-intent and confirmation carriers; smaller repeated read-like purchases may use a lighter payment-carrier mode, but the same bundle-binding and receipt-binding rules still apply.
8. A sidechain connection point is part of first-gate V23 so the ENGI:BTC bridge is not mainchain-only; generalized sidechain-issued transferability remains later work.
9. V23 does not authorize pointer promotion, `_PROVEN_` generation, or source posture changes until the new artifact family and validation surfaces are implemented.

## V23 source-of-truth hierarchy

Because V23 is only a draft target, current truth order remains:
1. `ENGI_SPEC.txt`
2. `ENGI_SPEC_V22.md`
3. `ENGI_SPEC_V22_DELTA.md`
4. `ENGI_SPEC_V22_PARITY_MATRIX.md`
5. `ENGI_SPEC_V22_PROVEN.md`
6. active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v22-*` artifacts
7. current source and tests explicitly referenced by V22
8. V23 draft files as non-promoted next-version targets
9. optional non-canonical notes
10. historical prior specs

V23 draft truth may specify the next system.
It may not claim to outrank the active V22 canon until promotion is complete.

## V23 system goals, non-goals, and design principles

### Goals

1. Define the Bitcoin-facing artifact family ENGI needs for public anchoring, sidechain bridge posture, and spend-native settlement interfaces.
2. Preserve V22 exact accounting, proof-family, and disclosure-boundary semantics while adding those external interfaces.
3. Make public-safe versus private commitment scopes explicit and replayable from current artifact classifications.
4. Bind bundle IDs, need IDs, settlement previews, source-to-shares artifacts, and NGI-denominated journal consequences to audited payment intent and observation surfaces.
5. Specify provable compute and storage reality surfaces so deployed ENGI infrastructure closes all ledgered artifact surfaces without pretending Bitcoin is the bulk compute or storage plane.
6. Specify a phased deployment path that keeps current source honesty intact.

### Non-goals

1. Claiming that current source already creates Bitcoin transactions, PSBT packets, Taproot commitments, Lightning invoices, or fully generalized sidechain-issued assets.
2. Moving full private proof payloads or licensed source material onto a public chain by default.
3. Replacing ENGI's existing deterministic settlement engine.
4. Reopening V22 canon-posture alignment as the center of the version.

### Design principles

- Commitment scopes derive from stable canonical hashing already used by the running system.
- Bounded-public proof stays bounded-public when projected onto an external public ledger.
- Payment interfaces bind to exact ENGI bundle and settlement identifiers rather than to loose business events.
- Public anchors publish receipts, not sensitive payloads.
- External network effects remain explicit, typed, and auditable rather than hidden behind vague integration language.

## V23 system architecture and layer boundaries

The V23 draft keeps the V22 system layers and adds one new deployment-facing layer:

1. Core deterministic primitives
   Current basis: `engi-demo/src/engi-demo.js`, `engi-demo/src/canonical/run-artifacts.js`, `engi-demo/src/canonical/proof-materialization.js`
   Responsibilities: canonical hashing, stable digests, normalization, and exact identifiers.

2. Canonical runtime builders
   Current basis: `engi-demo/src/canonical/*.js`
   Responsibilities: need measurement, evaluation/materialization, settlement, proof, and projection shaping.

3. Whole-run composition
   Current basis: `engi-demo/src/engi-demo.js`
   Responsibilities: scenario corpus, asset-pack selection, proof bundle materialization, settlement preview, and branch artifact assembly.

4. Projection shaping and disclosure policy
   Current basis: `engi-demo/src/canonical/projections.js`, `engi-demo/src/demo-shell-state.js`
   Responsibilities: bounded-public projection, reviewer/buyer/internal projection, and disclosability rules.

5. Exact settlement and journal closure
   Current basis: `engi-demo/src/canonical/settlement.js`
   Responsibilities: source-to-shares, settlement participation, exact micro-unit allocation, journal diff, and settlement proofs.

6. Proof witness and artifact inventory closure
   Current basis: `engi-demo/src/canonical/proof-materialization.js`, `engi-demo/src/canonical/run-artifacts.js`
   Responsibilities: artifact digests, proof-family witness manifests, deliverables classification, and proof-contract closure.

7. External deployment boundary contracts
   Current basis: `engi-demo/src/engi-demo.js`
   Responsibilities: modeled external interfaces for model execution, vector retrieval, GitHub actions, signer verification, and settlement network effects.

8. Bitcoin-facing audit and spend interface layer
   V23 draft basis: specified here; not yet implemented in source
   Responsibilities: commitment scope derivation, anchor publication receipts, audited payment intent, audited payment observation, NGI denomination binding, and sidechain bridge binding.

## V23 compute and storage reality rule

V23 keeps Bitcoin out of ENGI's bulk compute and storage path while still requiring those realities to be specified and prototype-demonstrated.

That means:
- proof computation remains off-chain and replayable,
- private and full proof storage remains off-chain and content-addressed,
- and Bitcoin closes the public anchor and spend ledger around those realities rather than replacing them.

First-gate V23 therefore requires two additional deployment-facing surfaces:

1. Compute reality
   - declares how ENGI proof and settlement-relevant computation was executed,
   - binds that execution mode to replayable proof and settlement artifacts,
   - and makes deployed compute posture audit-visible.

2. Storage reality
   - declares where and how full proof-bearing artifacts are stored,
   - binds public and private commitment scopes to retrievable content-addressed surfaces,
   - and makes deployed storage posture audit-visible.

## V23 artifact family additions

V23 introduces the following draft artifacts:

| Artifact path | Intended role | Default disclosure posture | Minimum closure fields |
| --- | --- | --- | --- |
| `.engi/compute-reality-manifest.json` | off-chain compute substrate and replayability contract for proof and settlement-relevant execution | private-proof-artifact | `realityId`, `executionMode`, `executorClass`, `determinismClass`, `replayBasis`, `proofArtifactRefs`, `externalBoundaryRefs` |
| `.engi/storage-reality-manifest.json` | content-addressed storage and retrieval contract for full proof-bearing artifacts and commitment scopes | private-proof-artifact | `realityId`, `storageMode`, `contentAddressingScheme`, `scopeStorageBindings`, `retrievalPolicy`, `retentionPolicy`, `anchorBindingRefs` |
| `.engi/bitcoin-commitment-manifest.json` | canonical digest inventory and root derivation for bounded-public and private scopes | private-proof-artifact | `manifestVersion`, `publicRoot`, `privateRoot`, `scopeEntries`, `artifactDigests`, `derivationPolicy`, `proofWitnessRef` |
| `.engi/bitcoin-treasury-policy.json` | spend-policy, anchor-policy, sidechain-bridge policy, and settlement finalization contract for BTC-facing execution modes | private-proof-artifact | `policyId`, `paymentModes`, `anchorModes`, `settlementDenomination`, `confirmationPolicyByMode`, `journalFinalizationPolicy`, `signerPolicy`, `sidechainBridgePolicy` |
| `.engi/bitcoin-anchor.json` | full anchor contract and observation record for one or more commitment roots | private-proof-artifact | `anchorId`, `network`, `anchorMode`, `publicRoot`, `privateRootRef`, `publicationState`, `anchorRef`, `confirmationState`, `disclosurePrincipal`, `policyRef` |
| `.engi/bitcoin-bounded-public-anchor.json` | public-safe receipt surface for the bounded-public root only | bounded-public-proof-metadata | `anchorId`, `network`, `anchorMode`, `publicRoot`, `anchorRef`, `confirmationState`, `publishedAt` |
| `.engi/bitcoin-settlement-intent.json` | payment intent binding buyer spend to bundle, need, and exact settlement preview | private-proof-artifact | `intentId`, `buyerId`, `needId`, `bundleId`, `unitDenomination`, `meteredMicroUnits`, `paymentMode`, `settlementPreviewRef`, `sourceToSharesRef`, `treasuryPolicyRef` |
| `.engi/bitcoin-settlement-observation.json` | observed execution receipt or invoice/transaction confirmation carrier | private-proof-artifact | `observationId`, `intentId`, `paymentMode`, `unitDenomination`, `networkState`, `networkRef`, `confirmations`, `observedValue`, `journalBindingState` |
| `.engi/bitcoin-audit-anchor-proof.json` | proof artifact for commitment-scope and anchor-publication closure | private-proof-artifact | `proofHash`, `memberVerdicts`, `theoremVerdicts`, `witnessArtifactPaths`, `replaySteps` |
| `.engi/bitcoin-settlement-interface-proof.json` | proof artifact for payment-intent and confirmation closure | private-proof-artifact | `proofHash`, `memberVerdicts`, `theoremVerdicts`, `witnessArtifactPaths`, `replaySteps` |

## V23 commitment derivation contract

V23 first gate fixes root derivation to the stable hashing discipline already present in current source.

`publicRoot` and `privateRoot` are not Merkle roots in first-gate V23.
They are canonical manifest roots derived by:

1. selecting the allowed artifact set for the scope,
2. sorting entries by `path` ascending,
3. normalizing each entry to:
   - `path`
   - `digest`
   - `confidentialityClass`
   - `potentiallyDisclosable`
   - `proofFamilies`
4. hashing the normalized scope payload with the same `stableHashObject(...)` discipline already used by current ENGI source.

The normalized payload shape is:

```json
{
  "scopeId": "bounded-public-root | private-proof-and-settlement-root",
  "derivationVersion": "v23.manifest-root.v1",
  "entries": [
    {
      "path": ".engi/example.json",
      "digest": "sha256:...",
      "confidentialityClass": "bounded-public-proof-metadata",
      "potentiallyDisclosable": true,
      "proofFamilies": ["disclosure-boundary"]
    }
  ]
}
```

First-gate V23 therefore makes root derivation replayable from current ENGI artifact digests without introducing a second hashing system.
Merkleization remains a later optimization only if a future version needs compact inclusion paths beyond manifest-root replay.

## V23 canonical enum set

First-gate V23 fixes the minimum enum vocabulary for new BTC-facing artifacts.

- `anchorMode`
  - `op-return-receipt`
  - `taproot-commitment`
  - `batched-checkpoint`

- `paymentMode`
  - `audited-base-layer-purchase`
  - `repeated-read-payment`
  - `checkpointed-sidechain-bridge`

- `publicationState`
  - `not-published`
  - `publication-pending`
  - `published-unconfirmed`
  - `published-confirmed`
  - `publication-invalidated`
  - `publication-failed`

- `confirmationState`
  - `unobserved`
  - `observed-pending`
  - `confirmed-by-mode`
  - `confirmation-invalidated`
  - `confirmation-failed`

- `networkState`
  - `modeled-local-only`
  - `pending-network`
  - `accepted-offchain`
  - `confirmed-onchain`
  - `checkpointed-sidechain`
  - `network-invalidated`
  - `network-failed`

- `journalBindingState`
  - `unbound`
  - `observed-unfinalized`
  - `anchor-required`
  - `finalizable`
  - `finalized`
  - `binding-invalidated`

- `disclosurePrincipal`
  - `public`
  - `reviewer`
  - `buyer`
  - `internal`

- `unitDenomination`
  - `NGI`

## V23 proof-family additions

### A. Bitcoin-audit-anchor

- proofArtifactPath: `.engi/bitcoin-audit-anchor-proof.json`
- members: `commitment-manifest`, `public-root-scope`, `private-root-binding`, `storage-reality-binding`, `anchor-publication`, `bounded-public-anchor`
- minimum witnessArtifactPaths:
  - `.engi/storage-reality-manifest.json`
  - `.engi/bitcoin-commitment-manifest.json`
  - `.engi/bitcoin-treasury-policy.json`
  - `.engi/bitcoin-anchor.json`
  - `.engi/bitcoin-bounded-public-anchor.json`
  - `.engi/projection-policy.json`
  - `.engi/bounded-public-proof.json`
  - `.engi/disclosure-proof.json`
  - `.engi/proof-contract.json`
  - `.engi/system-proof-bundle.json`
  - `.engi/proof-witness-manifest.json`
- replayStepIds:
  - `bitcoin-audit-anchor.commitment-scope-derivation`
  - `bitcoin-audit-anchor.public-scope-disclosure-check`
  - `bitcoin-audit-anchor.anchor-receipt-binding`
- theorem closure reading:
  - `public_scope_is_disclosable_only` closes only when every artifact in `publicRoot` is already bounded-public according to deliverables classification and projection policy
  - `private_scope_binds_proof_contract` closes only when `privateRoot` binds the declared proof-contract and settlement witness set
  - `storage_reality_binds_declared_scope` closes only when every artifact included in the declared commitment scopes has a declared storage binding and retrieval contract
  - `anchor_receipt_matches_declared_root` closes only when the anchor receipt or publication reference matches the declared root and network mode
  - `bounded_public_anchor_matches_full_anchor` closes only when the public-safe receipt is a projection of the same anchor record rather than an independently authored summary

### B. Bitcoin-settlement-interface

- proofArtifactPath: `.engi/bitcoin-settlement-interface-proof.json`
- members: `compute-reality-binding`, `settlement-intent`, `exact-unit-binding`, `confirmation-observation`, `journal-receipt-binding`, `external-boundary-closure`
- minimum witnessArtifactPaths:
  - `.engi/compute-reality-manifest.json`
  - `.engi/bitcoin-settlement-intent.json`
  - `.engi/bitcoin-settlement-observation.json`
  - `.engi/bitcoin-treasury-policy.json`
  - `.engi/settlement-preview.json`
  - `.engi/source-to-shares.json`
  - `.engi/settlement-proof.json`
  - `.engi/journal-diff.json`
  - `.engi/external-boundary-manifest.json`
- replayStepIds:
  - `bitcoin-settlement-interface.intent-bundle-binding`
  - `bitcoin-settlement-interface.confirmation-policy`
  - `bitcoin-settlement-interface.journal-effect-binding`
- theorem closure reading:
  - `compute_reality_binds_declared_settlement_path` closes only when the declared compute reality is sufficient to replay the same settlement refs and bundle bindings observed by the payment surfaces
  - `intent_matches_settlement_preview` closes only when the payment intent references the same `needId`, `bundleId`, `unitDenomination`, `meteredMicroUnits`, and settlement refs already emitted by ENGI settlement surfaces
  - `observation_confirms_declared_value` closes only when the observed payment value and network state satisfy the mode-specific confirmation rule
  - `journal_binding_remains_exact` closes only when payment observation does not mutate or contradict exact ENGI accounting and journal totals
  - `external_boundary_contract_is_honest` closes only when the observation surface states exactly which part was local prototype behavior and which part required external network confirmation

## V23 principal-scoped anchoring policy

V23 requires two commitment scopes at minimum:

1. Public commitment scope
   Contents:
   - bounded-public proof surfaces
   - public-safe policy and disclosure surfaces
   - public-safe audit receipts only
   Exclusions:
   - licensed source material
   - private proof artifacts
   - settlement preview and settlement internals

2. Private proof-and-settlement scope
   Contents:
   - proof-contract family closure
   - system proof bundle
   - proof witness manifest
   - source-to-shares and settlement proof chain
   - any anchor or spend observation not safe for public projection

Reviewer, buyer, and internal principals may inspect different proofs of inclusion against those roots.
Public principals may inspect only the bounded-public anchor surface and any inclusion proof that does not disclose a non-public artifact.

## V23 BTC artifact projection matrix

First-gate V23 fixes the default principal visibility for new BTC-facing artifacts:

| Artifact path | Public | Reviewer | Buyer | Internal |
| --- | --- | --- | --- | --- |
| `.engi/compute-reality-manifest.json` | hidden | bounded compute-summary only | hidden | visible |
| `.engi/storage-reality-manifest.json` | hidden | bounded storage-summary only | buyer-relevant retrieval summary only | visible |
| `.engi/bitcoin-bounded-public-anchor.json` | visible | visible | visible | visible |
| `.engi/bitcoin-anchor.json` | hidden | bounded summary plus public-root inclusion proof only | visible for buyer-bound intents and observations | visible |
| `.engi/bitcoin-commitment-manifest.json` | hidden | public-root scope only | buyer-relevant scope entries plus private inclusion proofs | visible |
| `.engi/bitcoin-treasury-policy.json` | hidden | hidden | confirmation policy and denomination summary only | visible |
| `.engi/bitcoin-settlement-intent.json` | hidden | hidden | visible for matching buyer purchase | visible |
| `.engi/bitcoin-settlement-observation.json` | hidden | hidden | visible for matching buyer purchase | visible |
| `.engi/bitcoin-audit-anchor-proof.json` | hidden | public-root theorem surface only | visible with buyer-permitted inclusion proofs | visible |
| `.engi/bitcoin-settlement-interface-proof.json` | hidden | hidden | visible with buyer-permitted settlement refs | visible |

No public or reviewer projection may reveal `privateRoot`, private settlement refs, or non-disclosable artifact paths unless a later canon explicitly widens that boundary.

## V23 settlement interface modes

V23 defines three deployment modes:

1. Audited base-layer purchase mode
   Intended use: larger purchases and treasury-controlled settlements
   Required surfaces:
   - `bitcoin-settlement-intent`
   - `bitcoin-settlement-observation`
   - `bitcoin-treasury-policy`
   - `bitcoin-anchor`
   Semantics:
   - reviewable spend intent
   - explicit confirmation state
   - explicit binding to bundle and settlement refs

2. Repeated read payment mode
   Intended use: smaller, repeated, licensed read-like access events
   Required surfaces:
   - `bitcoin-settlement-intent`
   - `bitcoin-settlement-observation`
   - eventual `bitcoin-anchor` publication through a declared batch
   Semantics:
   - lower-latency payment observation
   - still must bind to the same bundle and settlement references
   - anchor publication may lag the payment event but is not optional for final closure

3. Sidechain bridge mode
   Intended use: non-mainchain bridge connectivity, checkpointed settlement, and later optional transferability
   Required surfaces:
   - same ENGI commitment and settlement bindings as above
   - `bitcoin-treasury-policy`
   - plus an explicit network-mode discriminator in both intent and observation artifacts
   Semantics:
   - sidechain bridge settlement is allowed only if periodic public mainchain anchor binding remains explicit
   - generalized sidechain-issued transferability is a later widening, not a first-gate assumption

## V23 confirmation and journal finalization policy

First-gate V23 fixes the minimum finalization rule by payment mode.

1. `audited-base-layer-purchase`
   - `networkState` must reach `confirmed-onchain`
   - `confirmationState` must reach `confirmed-by-mode`
   - `confirmations` must be `>= 1`
   - `bitcoin-anchor.publicationState` must be `published-confirmed` or `published-unconfirmed`
   - `journalBindingState` may move from `observed-unfinalized` to `finalizable`

2. `repeated-read-payment`
   - `networkState` may first reach `accepted-offchain`
   - buyer access may become provisional at `observed-unfinalized`
   - `journalBindingState` must remain `anchor-required` until a matching `bitcoin-anchor` is published
   - final ENGI settlement closure requires both:
     - `confirmationState = confirmed-by-mode`
     - and anchor publication referencing the same `intentId` or the same declared commitment scope

3. `checkpointed-sidechain-bridge`
   - `networkState` must reach `checkpointed-sidechain`
   - `confirmationState` must reach `confirmed-by-mode`
   - `journalBindingState` must remain `anchor-required` until the declared periodic mainchain checkpoint anchor exists

Across all modes:
- `journalBindingState = finalized` is not allowed until `journalBindingState` first reached `finalizable`
- any `confirmation-invalidated`, `publication-invalidated`, or `network-invalidated` event forces `journalBindingState = binding-invalidated`
- no payment observation may mutate `source-to-shares`, `settlement-proof`, or `journal-diff`; it may only bind external execution evidence to those already-materialized surfaces

Prototype-demonstration rule:
- first-gate V23 implementation must emit local deterministic versions of `compute-reality-manifest` and `storage-reality-manifest`
- those prototype surfaces may still describe modeled deployment boundaries
- but they must be real emitted artifacts and test-covered, not only prose

## V23 phased deployment rule

V23 adopts the following phased rule:

- Phase 0: current reality
  - deterministic ENGI proof and settlement artifacts exist locally
  - external proof publication and networked settlement remain modeled only

- Phase 1: audited anchor introduction
  - derive bounded-public and private roots from existing digests
  - emit Bitcoin anchor artifacts and public-safe anchor receipts
  - declare sidechain bridge policy alongside mainchain anchor policy
  - keep spend and confirmation observation explicit and fail-closed

- Phase 2: spend-native access
  - bind larger purchases to audited spend-intent and confirmation carriers
  - bind repeated read-like purchases to lighter observation carriers
  - keep exact source-to-shares settlement authoritative

- Phase 3: optional transfer and deeper verification
  - optional generalized sidechain transfer surfaces may be introduced
  - deeper public verification or challenge mechanisms may be added later
  - but only if they preserve V22 exact accounting and V23 disclosure discipline

## Accepted boundaries

The following remain explicit boundaries for V23 drafting:

1. No live Bitcoin transaction construction is currently implemented in source.
2. No live anchor publication is currently implemented in source.
3. No V23-generated appendix or generated `.engi/v23-*` artifact family exists yet.
4. No current source surface proves mode-specific payment semantics for large purchases, repeated reads, or sidechain bridge mode.
5. Current source does not yet emit prototype compute-reality or storage-reality manifests.
6. Bulk private proof and source-material storage remain off-chain by default.
7. Generalized sidechain-issued transferability or asset issuance is optional later work, not the center of V23 first gate.
8. Merkle inclusion paths are deferred; first-gate V23 uses replayable manifest roots only.

## V23 completion condition

This draft is ready for eventual promotion only when:
1. the V23 document family is complete and internally consistent,
2. current source emits the new Bitcoin-facing artifact family,
3. current source emits prototype-demonstration `compute-reality-manifest` and `storage-reality-manifest` artifacts,
4. current deliverables classification and projection policy cover those artifacts explicitly, including the BTC artifact projection matrix,
5. current proof-witness manifest and proof-contract closure include the new proof families, compute/storage reality witnesses, and the treasury-policy witness surface,
6. current external boundary manifest specializes settlement network effects into anchor and spend interfaces and makes compute/storage reality honest,
7. current source enforces the manifest-root derivation contract and canonical enum vocabulary defined here,
8. current tests fail closed on public/private root misclassification, anchor receipt drift, payment-observation drift, compute/storage reality drift, and mode-specific finalization drift,
9. generated V23 proof and draft-readiness artifacts exist,
10. and `ENGI_SPEC_V23_PROVEN.md` is generated from real source behavior rather than from hand-authored aspiration.
