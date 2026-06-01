# Bitcode Spec V46 Parity Matrix

## Status

- Version: `V46`
- V46 state: draft opening; V46 parity work is not yet audited and Gate 1 only establishes the draft roadmap and validation boundary
- Current canonical/latest target: `V45`
- Prior canonical anchor: `BITCODE_SPEC_V45.md`
- Prior generated proof appendix: `BITCODE_SPEC_V45_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v46-spec-family-report.json` and `.bitcode/v46-canonical-input-report.json`; later V46 gates must authorize proof-family, rehearsal, promotion-readiness, and generated proof appendix artifacts before they become required V46 evidence
- Source parity state: V46 source parity has not been audited; Gate 1 opens the draft-target roadmap and validation boundary only
- Notes companion: `BITCODE_SPEC_V46_NOTES.md`
- Spec companion: `BITCODE_SPEC_V46.md`
- Delta companion: `BITCODE_SPEC_V46_DELTA.md`
- Scope: V46 draft parity matrix for commercial protocol comprehension, public/operator explanation, source-safe interface claims, and proof-readable launch posture over promoted V45 knowledge commoditization law
- Last fully realized canonical target preserved in source: `V45`

## Purpose

This matrix opens V46 parity work. It is intentionally draft-only: it records
the initial audit surface that later V46 gates must turn into source-grounded
implementation, proof, documentation, interface, and rehearsal rows. The
current authority remains V45.

Draft judgment vocabulary:

- `draft-required`: V46 must specify and later audit this area.
- `implemented prerequisite`: V45 source already contains material that V46 may
  reuse or clarify, but V46 has not yet audited it for closure.
- `accepted boundary`: V45 law remains active and must not be weakened.
- `pending`: V46 has not yet accepted a parity or implementation gate.

## Audit basis

Gate 1 audit inputs are `BITCODE_SPEC.txt`, `BITCODE_SPEC_V45.md`,
`BITCODE_SPEC_V45_DELTA.md`, `BITCODE_SPEC_V45_NOTES.md`,
`BITCODE_SPEC_V45_PARITY_MATRIX.md`, `BITCODE_SPEC_V45_PROVEN.md`,
`BITCODE_SPEC_V46.md`, `BITCODE_SPEC_V46_DELTA.md`,
`BITCODE_SPEC_V46_NOTES.md`, this draft parity matrix, `SPECIFICATIONS_ROADMAP.md`,
branch/workflow rules, and the existing product surfaces named by V45:
`/deposit`, `/read`, `/packs`, API/MCP, ChatGPT App, Bitcode Chat, public docs,
landing page, proof roots, ledger/database/storage readback, wallet/provider
receipts, and repository delivery receipts.

## Source Evidence Map

Gate 1 does not claim source closure. Later V46 parity gates must inspect the
source files and generated artifacts that implement or explain each row.

| Evidence area | Current source evidence | Audit reading |
| --- | --- | --- |
| Active canon posture | `BITCODE_SPEC.txt`, `BITCODE_SPEC_V45.md`, `BITCODE_SPEC_V45_PROVEN.md`, spec-family and canon-posture checkers | V45 is active canon; V46 is draft target only. |
| Product routes | `/deposit`, `/read`, `/packs`, and `/exchange` compatibility redirect | V46 must make route claims commercially legible without source leakage or stale Exchange-first framing. |
| Reading and deposit pipelines | Reading, Finding Fits, AssetPack preview, settlement, deposit option, and admission packages named by V45 | V46 may clarify comprehension and claim boundaries, but implementation parity is pending. |
| Interfaces | API/MCP, ChatGPT App, Bitcode Chat, package consumers, public docs, and landing page | V46 must decide which statements are protocol-authoritative and how each surface exposes proof readback. |
| Proof and operations | Generated proof appendices, `.bitcode` artifacts, workflows, ledger/database/storage readback, wallet/provider receipts, repository receipts | V46 must keep proof-backed state advancement clear to non-operator readers. |

## V46 Implementation Matrix

| Area | Required V46 result | Current judgment | Source-grounded finding | Closure gate |
| --- | --- | --- | --- | --- |
| Commercial protocol comprehension | Explain Bitcode as knowledge commoditization without reducing BTD to a read-right or AssetPack to raw source | draft-required | V45 law is precise but launch-facing surfaces need a shared claim taxonomy and readback language. | Gate 2 |
| Claim taxonomy | Separate protocol law, product guidance, operator evidence, investor framing, telemetry, preview, quote, settlement, rights, delivery, compensation, and repair claims | implemented prerequisite | Gate 2 owns package-backed `V46ProtocolComprehensionObjectModel`, deterministic `.bitcode/v46-protocol-comprehension-object-model.json`, object rows, claim rows, evidence-specific authority ids, disclosure boundary ids, forbidden claim collapse ids, source-safe generated artifact freshness, protocol tests, docs, and workflow wiring. | Gate 2 |
| Public and operator docs | Public docs, landing copy, README/operator docs, and route help stay accurate, source-safe, and non-overclaiming | draft-required | Existing docs inherit V45 law but need V46 claim-boundary audit. | Gate 3 |
| Product route comprehension | `/packs`, `/read`, and `/deposit` expose low-detail default UX with expandable proof and consistent commercial terms | implemented prerequisite | V43-V45 product routes exist; V46 must audit copy, state labels, and proof readback against commercial comprehension. | Gate 4 |
| Machine and conversation interfaces | API/MCP, ChatGPT App, Bitcode Chat, and package consumers expose the same claim boundaries as website routes | draft-required | Prior interface parity exists, but V46 needs launch-facing readback contracts. | Gate 5 |
| Proof readback explanation | Users and operators can understand why proof, ledger, database, storage, wallet/provider, and repository receipts have different authority | draft-required | V45 requires proof-backed state advancement; V46 must make it externally legible. | Gate 6 |
| Local interface rehearsal | A source-safe local rehearsal verifies docs/routes/interfaces explain the protocol without exposing unpaid source | pending | No V46 rehearsal is authorized in Gate 1. | Gate 7 |
| Promotion readiness | V46 can promote only after all accepted comprehension, parity, proof, interface, rehearsal, and source-safety gates close | accepted boundary | V45 remains active canon until a future promotion workflow advances the pointer. | Gate 8 |

## V46 Implementation Checklist

| Area | Required V46 result | Current judgment | Source-grounded finding | Closure gate |
| --- | --- | --- | --- | --- |
| Active pointer truth | `BITCODE_SPEC.txt` remains V45 during V46 draft work | accepted boundary | Gate 1 preserves active V45 / draft V46 posture. | Gate 1 |
| Draft files | V46 SPEC, DELTA, NOTES, and PARITY files exist and name draft posture | draft-required | Gate 1 creates and validates the draft family. | Gate 1 |
| CI posture | Gate and canon workflows validate active V45 plus draft V46 when V46 files exist | draft-required | Gate 1 wires the checker into workflows. | Gate 1 |
| Source safety | No V46 explanatory surface may expose protected source, unpaid AssetPack source, raw prompts, raw responses, credentials, or wallet-private material | accepted boundary | V45 source-safety law remains binding. | Gate 2+ |
| Value-bearing mainnet | V46 launch comprehension work must not imply value-bearing mainnet authority | accepted boundary | V45 value-bearing mainnet block remains binding. | Gate 2+ |
| Implementation scope | Runtime work begins only after formal specification and parity gates authorize it | accepted boundary | Gate 1 is roadmap/spec/checking only. | Gate 4+ |
| Protocol comprehension object model | V46 explanation surfaces share object ids, claim categories, claim authority ids, disclosure boundaries, and forbidden interpretation ids | implemented prerequisite | `V46ProtocolComprehensionObjectModel` binds AssetPack, BTD, BTC, preview, quote, settlement, rights, delivery, compensation, proof, repair, and InterfaceClaim rows without source-bearing payloads. | Gate 2 |

## Grouped Closure Gates

The V46 draft-opening plan groups work into eight provisional gates:

1. Commercial Protocol Comprehension Roadmap Opening.
2. Protocol Comprehension Object Model And Claim Taxonomy.
3. Public Docs, Landing, And Operator Claim Boundaries.
4. `/packs`, `/read`, And `/deposit` Comprehension UX Readback.
5. API/MCP, ChatGPT App, And Bitcode Chat Claim Contracts.
6. Proof Readback And Source-Safe Operator Explanation.
7. Local Interface Comprehension Rehearsal.
8. Promotion Readiness And Canonical Promotion.

Later V46 gates may split these rows if specification work reveals a safer or
more maintainable closure order.

## Accepted boundaries

- V45 is active canon while V46 is draft target.
- Gate 1 does not authorize runtime behavior changes.
- V46 public or product comprehension may simplify language but must not
  simplify protocol law.
- AssetPack remains the commodity, BTD remains Need-relative scalar
  knowledge-volume and settled rights, BTC remains settlement money, and proof
  readback remains state authority.
- Source-safe preview is not source disclosure; quote is not payment; payment
  observation is not finality; database projection is not ledger truth when it
  conflicts with stronger readback.

## Completion condition

V46 Gate 1 is complete when the V46 draft spec family, roadmap, package script,
Gate 1 checker, and CI workflow hooks validate active V45 plus draft V46 and
the gate branch is committed, pushed, and pull-requested into `version/v46`.
