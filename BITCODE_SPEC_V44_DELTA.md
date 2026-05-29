# Bitcode Spec V44 Delta

## Status

- Version: `V44`
- V44 state: draft Gate 5 Depositor earnings supply opportunity work over promoted V43
- Current canonical/latest target: `V43`
- Prior canonical anchor: `BITCODE_SPEC_V43.md`
- Prior generated proof appendix: `BITCODE_SPEC_V43_PROVEN.md`
- Generated structured artifact inventory: Gate 2 adds deterministic `.bitcode/v44-economic-domain-model.json`; Gate 3 adds deterministic `.bitcode/v44-packs-portfolio-market-intelligence.json`; Gate 4 adds deterministic `.bitcode/v44-reading-budget-quote-policy.json`; Gate 5 adds deterministic `.bitcode/v44-depositor-earnings-supply-opportunities.json`
- Source parity state: Gate 5 binds package-backed Depositor earning supply intelligence, `/deposit` route/UI projections, docs, workflow, package script, checker, and protocol/package/UAPI tests
- Notes companion: `BITCODE_SPEC_V44_NOTES.md`
- Delta companion: `BITCODE_SPEC_V44_DELTA.md`
- Parity companion: `BITCODE_SPEC_V44_PARITY_MATRIX.md`
- Scope: delta from V43 product-route/agentic-depositing canon to V44 scaled engineering economy operation
- Last fully realized canonical target preserved in source: `V43`

## Why V44 exists

V43 made the product routes intelligible: AssetPacks in through `/deposit`,
AssetPacks out through `/read`, and PackActivity inspection through `/packs`.
V44 exists because an enterprise-grade Bitcode network must operate at scale:
many departments, budgets, repositories, deposit options, Reads, Fits, quotes,
settlements, contributors, compensation statements, and repair states.

## Accepted V44 decisions

- Treat scaled economic operation as the next draft target over V43.
- Keep V43 route law: `/packs`, `/read`, and `/deposit` remain the default
  product surfaces.
- Name every economic field as estimate, quote, observed payment, final
  settlement, contributor allocation, delivery, or repair state.
- Keep source-safety stronger than UX convenience.
- Keep value-bearing mainnet blocked until a later explicit launch version.
- Bind Gate 2 economic contracts in package code before route/API/UI surfaces
  consume portfolio, quote, settlement, compensation, governance, or repair
  objects.

## V44 gate plan

1. Gate 1 Scaled Engineering Economy Roadmap Opening.
2. Gate 2 Economic Domain Model And Receipt Taxonomy.
3. Gate 3 Packs Portfolio Search And Market Intelligence.
4. Gate 4 Reading Budget, Quote Policy, And Procurement Governance.
5. Gate 5 Depositor Earnings, ROI, And Supply Opportunity Intelligence.
6. Gate 6 BTD/BTC Accounting And Contributor Compensation Statements.
7. Gate 7 Organization Policy, Approval, And Wallet Authority.
8. Gate 8 Enterprise Product UX For Economic Operation.
9. Gate 9 Scaled Local/Staging Network Rehearsal.
10. Gate 10 Promotion Readiness.

## Explicitly deferred

V44 Gate 1 defers implementation of portfolio dashboards, economic statement
APIs, budget policy engines, compensation statement materialization, governance
runtime enforcement, scaled rehearsal scripts, and V44 promotion workflow until
their owning gates.

V44 Gate 2 closes the source-safe economic domain model and receipt taxonomy
only. It does not implement route dashboards, quote engines, settlement
observation, compensation payout execution, organization wallet authority, or
scaled rehearsals.

V44 Gate 3 closes `/packs` portfolio and market intelligence over the existing
PackActivity source-safe API. It does not implement quote approval, payment
observation, contributor payouts, wallet authority, or scaled rehearsals.

V44 Gate 4 closes `/read` budget and quote governance around source-safe
AssetPack previews. It does not observe payment, transfer BTD rights, execute
contributor payouts, or admit value-bearing mainnet operation.

V44 Gate 5 closes `/deposit` depositor earning and supply opportunity
intelligence over source-safe deposit options. It does not execute payout,
mint BTD, disclose protected source, or convert estimated compensation ranges
into final settlement truth.

## Pre-Implementation Sequence

1. Open V44 spec family, roadmap, checker, package script, workflow posture,
   and documentation.
2. Implement economic domain model and receipt taxonomy for source-safe
   portfolio, quote, statement, governance, and repair objects.
3. Extend `/packs` into portfolio analytics, search, and market intelligence.
4. Add Reading budget policy, quote policy, and procurement governance.
5. Add deposit revenue, demand, ROI, and supply opportunity readback.
6. Add BTD/BTC/source-to-shares compensation statements and reconciliation.
7. Add organization policy, approval, spend authority, and wallet authority.
8. Rehearse scaled many-pack local/staging-testnet economic operation.
9. Polish enterprise economy UX and operator dashboards.
10. Close V44 promotion readiness and prepare active V44 / draft V45 posture.

## Validation direction

Gate 1 validates with `pnpm run check:v44-gate1`. Gate 2 validates with
`pnpm run generate:v44-economic-domain-model`,
`pnpm run check:v44-economic-domain-model`, and `pnpm run check:v44-gate2`.
Gate 3 validates with
`pnpm run generate:v44-packs-portfolio-market-intelligence`,
`pnpm run check:v44-packs-portfolio-market-intelligence`, and
`pnpm run check:v44-gate3`.
Gate 4 validates with `pnpm run generate:v44-reading-budget-quote-policy`,
`pnpm run check:v44-reading-budget-quote-policy`, and
`pnpm run check:v44-gate4`.
Gate 5 validates with
`pnpm run generate:v44-depositor-earnings-supply-opportunities`,
`pnpm run check:v44-depositor-earnings-supply-opportunities`, and
`pnpm run check:v44-gate5`.
Shared draft posture validates with
`node scripts/check-bitcode-spec-family.mjs --version V44 --mode draft --current-target V43`,
`node scripts/check-bitcode-canon-posture-drift.mjs --active-canon V43 --draft-target V44`,
and `git diff --check`.

## Commit-Body Direction

V44 commit bodies should name the closed gate, generated artifacts or proof
surfaces touched, source-safety posture, validation commands, accepted
boundaries, and any deferred economic implementation work. They should not use
temporary `wip` wording for closed gate work.
