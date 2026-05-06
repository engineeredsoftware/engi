# Bitcode Spec V27 Notes

## Status

- Scope: non-canonical future-version notes for Bitcode `$BTD` tokenomics.
- Active canonical pointer: `BITCODE_SPEC.txt` -> `V26`.
- Draft target: `V27`.
- Primary V27 focus: formal `$BTD` tokenomics.
- Adjacent future implementation focus: Terminal mint/acquire flows, Exchange purchase/trading flows, and external-interface expansion remain V28+ work unless a V27 tokenomics invariant requires an earlier implementation witness.

These notes do not promote V27 and do not reopen V26.
They record the tokenomics handoff that V26 intentionally deferred after proving the commercial Bitcode baseline.

The source research memo that seeded this file contained external citation handles and prior-work references.
Those references must be rebound to durable primary sources before any V27 normative specification is promoted.
Until then, this file is an internal specification note, not a cited public paper.

## Executive Summary

V27 should formalize `$BTD` as a capped, non-fungible, proof-backed source-share registry rather than as a generic token launch.

Bitcode already frames Source Shares as measured technical intelligence moving through:

1. Give source.
2. Express or measure a Need.
3. Fit source to that Need.
4. Prove provenance, dedupe, admissibility, and value.
5. Settle contribution and rights.
6. Issue `$BTD` only after closure.
7. Route owner reads, licensed reads, revenue, proof, and audit through Exchange state.

The strongest V27 formalization is:

> `$BTD` is a finite non-fungible registry of source-measurement-backed cells, minted only when source becomes fit to a Need, proves out, and settles into an AssetPack.

Each AssetPack should occupy exactly one contiguous range of `$BTD` cells.
The individual cell preserves provenance and non-fungibility.
The contiguous range becomes the main commercial unit.

This preserves four critical distinctions:

- BTC pays fees.
- `$BTD` is not a fungible spend token.
- `$BTD` records non-fungible AssetPack share/read-right holdings plus measured Bitcode content amount.
- Exchange settlement and licensed-read flows are the primary commercial economics, not optional third-party marketplace royalties.

V27 should make this a protocol law across spec, package, proof, database, receipt, and UI surfaces.

## Normative Core For V27

V27 should open from the following core law:

```text
One $BTD = one unique cell in a finite global Bitcode source-share registry.
One AssetPack = one contiguous range of $BTD cells.
Minting occurs only at Need -> Fit -> Prove -> Settle closure.
Licensed reads, not optional marketplace royalties, are the main recurring revenue source.
Ancestor participation is evidence-based, not age-based.
```

The hard supply cap is already present in `packages/btd/src/index.ts` as:

```ts
export const BTD_MAX_MINTABLE_SUPPLY = 21_000_000 as const;
```

V27 must turn that currently staged invariant into complete tokenomics law:

- package constant,
- protocol receipt invariant,
- proof artifact invariant,
- Exchange database invariant,
- UI disclosure invariant,
- replay invariant,
- and failure invariant when a mint would exceed the cap.

## Version Split

V27 owns the tokenomics law.

V28+ owns larger product implementations that rely on that law:

- Terminal Need submission and future Fit-driven `$BTD` mint posture.
- Exchange existing-`$BTD` purchase and market-reading posture.
- Wallet/provider signing breadth.
- Optional liquidity wrappers, slices, or secondary market exposure.
- Third-party interface propagation after Protocol and Exchange semantics are stable.

V27 should still specify enough implementation hooks for those later versions, but it must not block on a full Exchange marketplace.
The V27 closure standard should be: supply, mint, range, receipt, access, replay, and proof invariants are exact enough that Terminal and Exchange can safely build on them in later versions.

## Repo Grounding And Enforcement Surfaces

The V26 repository already contains reliable anchors for formal `$BTD` tokenomics:

| Path | Current or future role | V27 tokenomics invariant |
| --- | --- | --- |
| `BITCODE_SPEC_V26.md` | Active V26 canon | Records that full `$BTD` tokenomics are later-version work |
| `BITCODE_SPEC_V26_DELTA.md` | Active V26 reform ledger | Records deferred tokenomics and compatibility-carrier constraints |
| `BITCODE_SPEC_V26_NOTES.md` | Active V26 notes | Records V27 `$BTD` tokenomics as future focus |
| `BITCODE_SPEC_V26_PARITY_MATRIX.md` | Active V26 parity | Provides the model for V27 parity checks |
| `BITCODE_SPEC_V27_NOTES.md` | This draft note | Tokenomics handoff and design constraints |
| `packages/btd/README.md` | Human package contract | Non-fungible AssetPack share/read-right semantics |
| `packages/btd/src/index.ts` | Current package surface | `BTD_MAX_MINTABLE_SUPPLY`, BTC fee basis, measured `$BTD`, fungible-mutation rejection |
| `packages/btd/src/plans.ts` | Future bundle posture | V28 reference bundles must not imply V26 checkout or fungible token sale |
| `.bitcode/source-to-shares-fifth-gate-proof.json` | Existing proof artifact | Future minted range roots, source roots, measurement roots, and allocation roots |
| `internal-docs/BITCODE_EXCHANGE_DATABASE.md` | Exchange schema target | Supply state, ranges, cells, receipts, licenses, ancestry, revenue routes |
| `uapi/components/base/bitcode/btd/*` | Current UI posture | BTC fee asset vs non-fungible `$BTD` holding/read-right disclosure |
| `uapi/app/[token]/page.tsx` or successor route | Future token/range route | Owner-read, licensed-read, range boundaries, supply remaining, legal-right disclosure |

If exact current files are missing for receipt schemas, proof modules, treasury models, or Exchange tables, V27 should add narrow files rather than scattering tokenomics logic through existing broad modules.

Recommended exact additions:

| Path | Purpose |
| --- | --- |
| `packages/btd/src/constants.ts` | Supply cap, quantization constants, default split constants |
| `packages/btd/src/supply.ts` | Canonical supply-state machine and cap checks |
| `packages/btd/src/range.ts` | Contiguous AssetPack range allocation and overlap prevention |
| `packages/btd/src/allocation.ts` | Contributor weight calculation and largest-remainder allocation |
| `packages/btd/src/ancestor.ts` | Ancestor-edge schema, confidence thresholds, and decay logic |
| `packages/btd/src/access.ts` | Owner-read vs licensed-read policy evaluation |
| `packages/btd/src/receipts.ts` | Mint receipts, ancestor receipts, and revenue-route receipts |
| `protocol-demonstration/test/btd-range-mint.spec.ts` | Mint path, cap, and range-overlap tests |
| `protocol-demonstration/test/btd-allocation.spec.ts` | Deterministic allocation and conservation tests |
| `protocol-demonstration/test/btd-access-rights.spec.ts` | Owner/licensed/unauthorized read tests |
| `protocol-demonstration/test/btd-ancestor-routing.spec.ts` | Dependency-edge and revenue-routing tests |
| `protocol-demonstration/test/btd-dedupe.spec.ts` | Duplicate-source remint prevention tests |
| `protocol-demonstration/test/btd-exhaustion.spec.ts` | Post-cap refit-only behavior |
| `protocol-demonstration/test/btd-replay.spec.ts` | Receipt replay reconstructs identical supply state |
| `supabase/migrations/<timestamp>_btd_registry.sql` | Canonical SQL schema and DB-level uniqueness/check constraints |

## Comparative Design Lessons To Rebind Before V27 Promotion

The research seed memo pointed at several external design families.
V27 should rebind these to primary sources before using them normatively:

- Bitcoin: terminal scarcity, deterministic issuance, and invalidity of over-cap issuance.
- ERC-20: useful contrast for why pure fungible balances are the wrong base ontology.
- ERC-721: unique asset identity.
- ERC-1155: mixed fungible, non-fungible, and semi-fungible token-type management.
- ERC-2309: consecutive transfer event semantics as a close analogue for contiguous AssetPack ranges.
- ERC-4907: split owner/user roles as an analogue for owner-read vs licensed-read.
- ERC-3525: slot/value semi-fungibility as a possible wrapper layer, not the base `$BTD` cell model.
- EIP-2981: royalty signaling is not enough because payment depends on marketplace behavior.
- Filecoin: issuance should follow provable utility rather than mere arrival, with proof, collateral, and slashing as anti-game design inspiration.
- NFTX-like vault patterns: liquidity wrappers can improve tradability but collapse individual provenance and should stay above the canonical cell/range layer.
- Story-like ancestry graphs: derivative relationships and license-bound revenue routing are closer to Bitcode's knowledge-economy claim than age-based royalties.
- NFT licensing literature: token ownership does not automatically transfer copyright or broad IP rights; access and derivative rights must be explicit.

V27 should not copy any external token standard wholesale.
It should internalize the relevant lessons into Bitcode's own Protocol, Exchange, and proof architecture.

## Proposed Data Model

V27 should start from typed source-share cells and AssetPack ranges.

```ts
export type BtdTokenId = number;

export interface BtdSupplyState {
  maxSupply: 21_000_000;
  totalMinted: number;
  nextTokenId: BtdTokenId;
  exhaustionPolicy: 'refit-only';
  exhaustedAtExchangeSequence?: bigint;
}

export interface BtdCell {
  tokenId: BtdTokenId;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  sourceMeasurementId: string;
  sourceManifestRoot: string;
  measurementReceiptRoot: string;
  proofRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
}

export interface AssetPackRange {
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  normalizedBitcodeVolume: bigint;
  needId: string;
  fitReceiptRoot: string;
  proofRoot: string;
  sourceManifestRoot: string;
  settlementJournalRoot: string;
  dedupeReceiptRoot: string;
  mintedAtExchangeSequence: bigint;
}

export interface BtdMintReceipt {
  kind: 'btd.asset_pack_mint';
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  totalMintedBefore: number;
  totalMintedAfter: number;
  maxSupply: 21_000_000;
  sourceManifestRoot: string;
  proofRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
}
```

The mint receipt must be unusually explicit because Bitcode's trust proposition is auditable reconstruction rather than trust in a black-box token balance.

Minimum receipt fields:

- `assetPackId`
- `rangeStart`
- `rangeEndExclusive`
- `tokenCount`
- `totalMintedBefore`
- `totalMintedAfter`
- `maxSupply`
- `sourceManifestRoot`
- `proofRoot`
- `exchangeReceiptRoot`
- `accessPolicyId`
- `accessPolicyHash`

## Lifecycle

V27 should make issuance downstream of proof and settlement.
Source deposit or Need discovery alone must not mint `$BTD`.

```text
Give source plus context
  -> Need is measured
  -> Fit evaluates utility, quality, valence, provenance, and dedupe
  -> Proof validates provenance, dedupe, admissibility, and replay
  -> Settlement allocates contributors, rights, policy, and revenue posture
  -> Mint one contiguous AssetPack range
  -> Owner reads and licensed reads route through Exchange state
```

Normative issuance rule:

```text
Source deposit does not mint $BTD.
Need discovery does not mint $BTD.
Candidate fit does not mint $BTD.
Uncommitted proof does not mint $BTD.
Only proof-backed Need-Fit settlement mints $BTD.
```

## Quantity, Allocation, And Revenue

V27 should separate supply quantity from quality-weighted allocation.

Quantity rule:

```ts
tokenCount = Math.floor(normalizedBitcodeVolume / QUANTIZATION_Q);
require(tokenCount >= 1);
require(totalMinted + tokenCount <= 21_000_000);
```

Default starting value:

```ts
export const BTD_QUANTIZATION_Q = 1_000n;
```

The exact normalized Bitcode volume scalar is still an open V27 protocol question.
It must settle whether the scalar is byte-like, token-like, semantic-chunk-like, or another canonical unit.

Quality should determine allocation and revenue weighting, not mint inflation.

Default contributor weighting:

```ts
weight_i =
  volume_i ** 1.0 *
  fit_i ** 1.0 *
  quality_i ** 1.0 *
  provenance_i ** 0.75 *
  novelty_i ** 0.5 *
  antiNoise_i ** 1.0;

allocation_i = HareNiemeyer(tokenCount, weight_i);
```

Required properties:

- allocation sums exactly to `tokenCount`;
- allocation is deterministic under receipt replay;
- allocation cannot over-mint;
- negative, NaN, infinite, or unbounded weights fail closed;
- quality does not create new supply.

Default licensed-read revenue split:

```ts
R_direct = 0.80 * R;
R_ancestor = 0.12 * R;
R_treasury = 0.08 * R;
```

This split is tunable.
The structure is not optional: direct holders, proven ancestors, and protocol/proof treasury must be explicit settlement categories.

## Access Rights

V27 must define `$BTD` as a source-share/read-right instrument without implying broader legal rights than the policy grants.

Recommended default model:

- `$BTD` holders receive durable owner-read and audit rights for the owned cell or range, subject to the AssetPack access policy.
- Licensed readers can buy scoped, metered, time-bound, or policy-bound read access without acquiring `$BTD`.
- Licensed-read revenue routes to current holders, proven ancestors when admitted, and protocol/proof/treasury accounts.
- Holding `$BTD` does not automatically transfer copyright, broad derivative rights, redistribution rights, or commercial rights unless the immutable access policy explicitly says so.

Each AssetPack range must carry:

- `accessPolicyId`
- `accessPolicyHash`
- policy URI or storage pointer
- owner-read terms
- licensed-read terms
- derivative-use terms
- redistribution/confidentiality terms
- dispute/takedown posture

V27 UI copy must not promise "copyright ownership", "dividends", "guaranteed royalties", or price appreciation unless those claims are legally and protocol-enforced.

## Market Units

V27 should define three layers:

| Unit | Meaning | Primary use | V27 posture |
| --- | --- | --- | --- |
| Cell | One unique `$BTD` registry entry | Provenance, audit, exact accounting | canonical non-fungible base |
| Range | One contiguous AssetPack block | Primary ownership, settlement, transfer, and read-right unit | primary commercial unit |
| Slice | Optional wrapper over part of a range or pooled ranges | Liquidity, financing, delegated revenue rights | V28+ wrapper only |

The base layer must remain non-fungible.
Any later fungible or semi-fungible exposure must be a wrapper over cells/ranges, not a replacement for them.

## Exhaustion Policy

V27 should prefer `refit-only` after the 21,000,000 cap is reached.

```text
After totalMinted reaches 21,000,000:
  no new cells mint;
  future Need-Fit value can still route through existing cells;
  refit, lineage, licensing, and wrapper economics can continue;
  the finite registry remains finite.
```

Rejected policies:

- silently lifting the cap;
- burn-to-mint as the default;
- governance-based post-cap inflation;
- age-based rent to old token IDs after exhaustion.

## Ancestry Finding

Ancestry is not necessary to define `$BTD`.
It is necessary only if Bitcode wants the stronger claim that later technology pays earlier knowledge because later knowledge proves it stands on that earlier knowledge.

Final V27 framing:

> Ancestry is unnecessary as a core token primitive, but necessary as an attribution/proof primitive if Bitcode wants protocol-level intergenerational knowledge rewards.

Therefore:

- ancestry must not affect mint count;
- ancestry must not affect AssetPack range length;
- ancestry must not reward lower token IDs;
- ancestry must not be claimable as speculative pre-mint entitlement;
- ancestry may affect licensed-read revenue routing, proof graph, dedupe, derivative classification, teaching-value attribution, reputation, search, and ranking.

The contradiction that makes ancestry conditionally necessary:

1. If later packs pay old packs only because they are earlier, the protocol rewards an early-mint lottery.
2. If later packs pay no old packs, the "standing on the shoulders of giants" economic claim disappears.
3. If later packs pay old packs because of citations, tags, or claimed dependency, the protocol has recreated ancestry under another name.

Therefore any protocol-level intergenerational knowledge reward needs a proof-bearing dependency relation.
It does not have to be named "ancestry", but it has the function of ancestry.

## Safe Ancestry Module

V27 should specify ancestry as a late-bound Exchange relation, not a supply primitive.

```ts
export interface BtdAncestorEdge {
  parentAssetPackId: string;
  childAssetPackId: string;
  edgeKind:
    | 'implementation_dependency'
    | 'proof_dependency'
    | 'source_reuse'
    | 'conceptual_dependency'
    | 'teaching_dependency'
    | 'citation_only';
  evidenceRoot: string;
  reviewerReceiptRoot?: string;
  confidence: number;
  timelessness: number;
  depth: number;
  createdAfterChildFit: true;
  conflictDisclosure: string[];
}
```

The critical invariant is:

```ts
createdAfterChildFit === true;
```

Safe ordering:

```text
source becomes fit
  -> AssetPack is admitted
  -> child pack proves dependency evidence
  -> reviewer/proof receipts evaluate dependency
  -> ancestor edge is created
  -> future revenue routing may include the edge
```

Unsafe ordering:

```text
claim ancestry first
  -> mint speculative foundational packs
  -> pressure future packs to route value through them
```

Default ancestry routing:

```ts
ancestorWeight_j =
  confidence_j *
  timelessness_j *
  decay(depth_j);

decay(d) = 1 / (1 + d) ** 2;
```

Suggested default:

```ts
export const MIN_ANCESTOR_CONFIDENCE = 0.25;
```

Weak edges may be recorded but must not receive revenue.

## Ancestry Attack Surface

V27 must not implement ancestry naively.

Attack classes:

- foundational squatting;
- premature specifying;
- citation cartel or reciprocal-loop routing;
- dependency laundering through controlled intermediates;
- over-fragmentation into many micro-packs;
- popularity feedback loops;
- ancestor spam;
- claimant/reviewer conflict of interest.

Minimum mitigations:

- no reward for abstract breadth alone;
- no ancestry reward at mint time;
- require concrete evidence of implementation, proof, source reuse, or review-confirmed teaching dependency;
- detect reciprocal loops;
- discount closed citation clusters;
- require external corroboration for paid edges;
- separate claimant from verifier;
- apply diminishing returns across repeated edges among the same parties;
- trace the full dependency DAG;
- discount recently created controlled intermediates;
- apply dedupe and compression penalties;
- enforce minimum contribution thresholds;
- separate "cited" from "necessary";
- weight by proof receipts rather than social popularity.

## Code-Level Invariants

V27 must repeat a small rigid rule set across spec, packages, receipts, database, proofs, and UI:

| Invariant | Required expression |
| --- | --- |
| hard cap | `totalMinted + tokenCount <= 21_000_000` |
| Need-Fit-only issuance | mint fails before proof-backed settlement |
| range contiguity | `rangeStart === previous.nextTokenId` |
| range validity | `rangeEndExclusive > rangeStart` |
| no overlap | no two AssetPack ranges overlap |
| one pack, one block | a minted AssetPack cannot mint another primary range |
| allocation conservation | `sum(allocations) === tokenCount` |
| explicit access policy | every minted range has immutable `accessPolicyId` and `accessPolicyHash` |
| owner/licensed separation | owner-read and licensed-read are distinct policy branches |
| replay determinism | receipts reconstruct identical supply, allocation, and routing state |
| no fungible spend semantics | `$BTD` cannot be debited as a currency balance |
| treasury separation | treasury can hold, route, distribute, escrow, and report, but cannot mint |
| ancestry non-supply | ancestor edges cannot increase mint count |
| post-cap refit only | exhaustion routes value through existing cells without new cells |

Recommended package-level expressions:

```ts
assert(state.totalMinted + mintCount <= BTD_MAX_MINTABLE_SUPPLY);
assert(range.start === state.nextTokenId);
assert(range.endExclusive > range.start);
assert(!assetPack.alreadyMinted);
assert(sum(allocations) === tokenCount);
assert(ownerRead || validLicense);
assert(edge.confidence >= MIN_ANCESTOR_CONFIDENCE);
```

## Exchange Database Targets

V27 should specify or create Exchange tables equivalent to:

- `btd_supply_state`
- `btd_asset_pack_ranges`
- `btd_cells`
- `btd_mint_receipts`
- `btd_ownership_events`
- `btd_read_licenses`
- `btd_ancestor_edges`
- `btd_revenue_routes`

Database constraints must include:

- unique `token_id`;
- unique `asset_pack_id` for primary ranges;
- no overlapping primary ranges;
- `range_start < range_end_exclusive`;
- `total_minted <= 21000000`;
- receipt roots are not nullable after committed mint;
- access policy hash is not nullable after committed mint;
- ownership events cannot create negative holdings;
- licensed reads cannot imply ownership transfer.

## Demonstration Test Matrix

V27 should add a compact but high-leverage proof/test matrix:

| Test file | Minimal cases |
| --- | --- |
| `protocol-demonstration/test/btd-range-mint.spec.ts` | successful mint after settlement; failure before proof; cap exceed failure; non-overlap enforcement |
| `protocol-demonstration/test/btd-allocation.spec.ts` | deterministic weights; largest-remainder conservation; no negative or overflow allocations |
| `protocol-demonstration/test/btd-access-rights.spec.ts` | owner-read succeeds; licensed read succeeds within term; expired or unauthorized read fails |
| `protocol-demonstration/test/btd-ancestor-routing.spec.ts` | direct dependency pays; weak edge records but does not pay; depth decay is deterministic |
| `protocol-demonstration/test/btd-dedupe.spec.ts` | duplicate normalized source cannot remint without new derivative justification |
| `protocol-demonstration/test/btd-exhaustion.spec.ts` | post-cap refit routes value but does not mint new cells |
| `protocol-demonstration/test/btd-replay.spec.ts` | receipt replay reconstructs identical supply state, allocations, and ancestor payouts |

## Tunable Defaults

V27 may begin with these defaults while clearly marking which values are immutable:

| Parameter | Default | Tunability |
| --- | --- | --- |
| `BTD_MAX_MINTABLE_SUPPLY` | `21_000_000` | immutable after launch |
| `BTD_QUANTIZATION_Q` | `1_000` normalized-volume units | tunable before launch |
| `DIRECT_READ_SPLIT` | `80%` | tunable by settlement policy |
| `ANCESTOR_POOL_SPLIT` | `12%` | tunable by settlement policy |
| `TREASURY_SPLIT` | `8%` | tunable by settlement policy |
| `MIN_ANCESTOR_CONFIDENCE` | `0.25` | tunable by proof policy |
| `ANCESTOR_DECAY` | `1/(1+d)^2` | tunable by proof policy |
| `DISPUTE_WINDOW` | `30 days` | legal/ops decision |
| `DISPUTE_HOLDBACK` | `10%` of newly allocated cells or revenue | legal/ops decision |

Only the hard cap should be treated as terminal tokenomics law at launch.

## Anti-Game Layer

V27 should adopt a proof-and-review discipline closer to utility-proof systems than to permissive NFT minting culture:

- dedupe receipts prevent the same normalized source from minting twice;
- derivative contribution must prove a genuinely new abstraction, implementation, teaching value, or fit;
- source-right assertions are challengeable;
- reviewers and provers are reputation-weighted;
- high-impact provers or ancestry claims may be bonded;
- newly allocated value may carry a dispute holdback;
- weak ancestor edges are recorded but unpaid;
- age-based premiums are prohibited;
- broad foundational claims need concrete downstream dependency evidence.

## Legal And Product Disclosures

V27 must settle legal vocabulary before public tokenomics launch.

The access-right matrix should distinguish at least:

- owner-read;
- audit-read;
- licensed-read;
- derivative-use;
- commercial-use;
- no-redistribution;
- confidentiality;
- copyright assignment, if any;
- source takedown;
- dispute process;
- policy versioning;
- immutable policy hash.

UI must show:

- AssetPack range;
- minted from Need-Fit settlement;
- normalized volume;
- owner-read/licensed-read/no-read posture;
- ancestry routes when present;
- supply remaining;
- access policy hash;
- legal-rights summary.

Public copy must avoid claiming:

- `$BTD` is a fee token;
- `$BTD` is a fungible currency;
- holding `$BTD` automatically grants copyright;
- secondary royalties are guaranteed;
- price appreciation is promised;
- treasury routing is the same as dividends.

## Open Questions

V27 must answer these before promotion:

1. What exactly is normalized Bitcode volume?
2. Is the quantization scalar byte-like, token-like, semantic-chunk-like, or another canonical unit?
3. What minimum pack size should avoid dust and over-fragmentation?
4. What legal rights does `$BTD` convey, and which rights require a separate license?
5. How are source-right disputes filed, bonded, reviewed, and resolved?
6. How strong should the anti-game layer be at launch?
7. Which reviewer/prover roles need reputation or bond requirements?
8. Should any secondary trading be native in V27, or deferred entirely to V28+?
9. Should wrapper slices exist in V27 tests only, or be postponed until the base range registry has live evidence?
10. How does post-cap refit-only value routing work when a new Need depends on an exhausted registry?

## Implementation Priority

The correct implementation order is:

1. Hard cap and supply state.
2. Contiguous range allocator.
3. Mint receipt schema.
4. Replay proof for supply, allocation, and ranges.
5. Exchange database constraints.
6. Access policy and licensed-read evaluation.
7. Owner-read and licensed-read UI disclosure.
8. Direct-holder revenue routing.
9. Ancestry edge schema and unpaid proof graph.
10. Paid ancestry routing only after attack mitigations are proven.
11. Optional wrapper/slice/liquidity structures only after the canonical registry works.

Starting with marketplace liquidity before registry law exists would invert the Bitcode model.
V27 must first prove what is being traded, read, licensed, and settled.

## Working Definition

> `$BTD` is Bitcode's finite 21,000,000-cell non-fungible source-share registry. Each cell is minted only at proof-backed Need-Fit settlement. Each AssetPack occupies a contiguous `$BTD` range whose length is derived from normalized Bitcode volume. Holding `$BTD` grants source-share owner-read/audit rights for the associated cell or range under an immutable access policy, while licensed reads route revenue to current holders and, when proven after child fit, knowledge ancestors through Exchange receipts.

## V27 Closure Target

V27 should be closable only when all of the following are true:

- SPEC, DELTA, NOTES, PARITY, and PROVEN files exist for V27.
- `BTD_MAX_MINTABLE_SUPPLY` is a package, proof, receipt, DB, and UI invariant.
- AssetPack range minting is the only canonical issuance path.
- Need-Fit settlement is the only mint admission point.
- `$BTD` is rejected as a fungible spend token everywhere.
- owner-read and licensed-read are distinct and tested.
- the canonical receipt replay reconstructs supply state and allocation state.
- Exchange database constraints fail closed on overflow, overlap, missing policy, and duplicate mint.
- ancestry is specified as a non-supply late-bound module.
- post-cap refit-only policy is specified.
- UI surfaces disclose BTC fee asset, non-fungible `$BTD`, access rights, range, supply remaining, and policy hash.
- V28+ Terminal and Exchange hooks are specified without requiring full V28/V29 product breadth inside V27.

