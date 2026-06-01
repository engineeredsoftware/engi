# Bitcode Spec V46 Delta

## Status

- Version: `V46`
- V46 state: draft opening; V46 is the active draft target over promoted V45 canon
- Current canonical/latest target: `V45`
- Prior canonical anchor: `BITCODE_SPEC_V45.md`
- Prior generated proof appendix: `BITCODE_SPEC_V45_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v46-spec-family-report.json` and `.bitcode/v46-canonical-input-report.json`; later V46 gates must authorize proof-family, rehearsal, promotion-readiness, and generated proof appendix artifacts before they become required V46 evidence
- Source parity state: V46 source parity has not been audited; Gate 1 opens the draft-target roadmap and validation boundary only
- Notes companion: `BITCODE_SPEC_V46_NOTES.md`
- Spec companion: `BITCODE_SPEC_V46.md`
- Parity companion: `BITCODE_SPEC_V46_PARITY_MATRIX.md`
- Scope: V46 draft delta for commercial protocol comprehension, public/operator explanation, source-safe interface claims, and proof-readable launch posture over promoted V45 knowledge commoditization law
- Last fully realized canonical target preserved in source: `V45`

## Why V46 exists

V45 made Bitcode's knowledge commoditization law explicit: AssetPack is the
commodity, BTD is Need-relative weighted scalar knowledge-volume whose settled
form carries rights, BTC is settlement money, source-to-shares routes
contributor compensation, and proof-backed readback advances state. V46 exists
to make that law commercially legible across public, operator, product,
machine, and conversational surfaces without weakening source-safety or
overstating live value-bearing posture.

## Accepted V46 decisions

- V45 remains active canon while V46 is drafted.
- V46 opens as a specification-first version; Gate 1 is roadmap/spec-family
  opening only.
- V46 focuses on external protocol comprehension and launch-facing claim
  readiness before it authorizes implementation changes.
- Public docs, landing copy, `/packs`, `/read`, `/deposit`, API/MCP, ChatGPT
  App, and Bitcode Chat must explain the same protocol law with source-safe
  boundaries.
- Investor or pitch material may inform wording, but it is not protocol law
  unless reconciled into the formal V46 specification family.
- All V46 work must preserve V45's source-safe preview, BTC finality before
  source unlock, BTD rights, proof readback, repair, and value-bearing mainnet
  blocks.

## Explicitly deferred

- V46 does not replace V45 until a later promotion workflow validates and
  advances `BITCODE_SPEC.txt`.
- Gate 1 does not authorize runtime behavior, schema changes, route changes,
  settlement behavior, proof-family artifacts, source-safe rehearsal artifacts,
  or promotion-readiness artifacts.
- Value-bearing mainnet operation remains deferred.
- Generated V46 proof appendix material remains future work until a proof or
  promotion gate makes it current.

## Accepted Pre-Implementation Sequence

1. Open the V46 draft family over active V45 and validate draft posture.
2. Specify commercial protocol comprehension atoms in small gates.
3. Consolidate accepted atoms into the formal V46 specification family.
4. Audit implementation parity from the formal V46 family.
5. Group implementation, proof, interface, rehearsal, and documentation work
   by accepted parity gaps.
6. Close promotion readiness only after all scoped gates are green.
7. Promote V46 only through the maintained promotion workflow.

## Gate 1: V46 Commercial Protocol Comprehension Roadmap Opening

Gate 1 closes when the V46 spec family exists as draft material over active
V45, the roadmap names the V46 focus and tentative gates, the branch/check
contract is present, CI knows how to validate active V45 plus draft V46, and no
V46 file claims promoted authority.

## Gate 2: Protocol Comprehension Object Model And Claim Taxonomy

Gate 2 adds `V46ProtocolComprehensionObjectModel` as a source-safe generated
artifact at `.bitcode/v46-protocol-comprehension-object-model.json`. It
formalizes the object vocabulary and claim taxonomy that every public,
product, operator, API/MCP, ChatGPT App, Bitcode Chat, telemetry, and
investor-facing surface must use when explaining Bitcode.

Accepted Gate 2 decisions:

- AssetPack, BTD, BTC, Finding Fits, source-safe preview, quote, settlement,
  rights transfer, delivery, compensation, proof, repair, and interface claims
  are distinct comprehension objects.
- Every explanation is an `InterfaceClaim` with a category, authority source,
  disclosure boundary, required evidence class, and forbidden interpretation.
- Claim categories are `protocol-law`, `product-guidance`,
  `operator-evidence`, `investor-framing`, `telemetry-observability`,
  `preview-claim`, `quote-claim`, `settlement-claim`, `rights-claim`,
  `delivery-claim`, `compensation-claim`, and `repair-claim`.
- Claim authority is evidence-specific: generated proof, ledger readback,
  database projection, object storage root, wallet/provider receipt,
  repository delivery receipt, telemetry, interface guidance, and public
  education do not have interchangeable authority.
- Gate 2 is still specification/proof metadata work. It does not authorize
  route, API, settlement, delivery, or value-bearing mainnet behavior changes.

## Commit-Body Direction

V46 commit bodies should name the gate class, protocol law or interface claim
being clarified, validation command, source-safety posture, and whether the
change is specification-only, parity-only, proof-only, interface-only,
implementation, rehearsal, or promotion work.
