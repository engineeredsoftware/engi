# Bitcode Spec V28 Parity Matrix

## Status

- Version: `V28`
- V28 state: draft target parity matrix opened
- Current canonical/latest target: `V27`
- Prior canonical anchor: `BITCODE_SPEC_V27.md`
- Prior generated proof appendix: `BITCODE_SPEC_V27_PROVEN.md`
- Generated structured artifact inventory: `.bitcode/v28-gate-1-draft-opening-proof.json`; V28 spec-family and canonical-input reports are planned generated artifacts
- Source parity state: first-gate draft parity opened
- State: draft target parity matrix opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V27`
- Scope: source-to-spec parity for V28 commercial application MVP QA over V27 tokenomics and crypto-commercial rails
- Spec companion: `BITCODE_SPEC_V28.md`
- Notes companion: `BITCODE_SPEC_V28_NOTES.md`
- Delta companion: `BITCODE_SPEC_V28_DELTA.md`
- Generated proof appendix: none until V28 promotion

This matrix records the initial V28 source audit.
It separates V27-implemented primitive truth from V28 commercial application MVP QA work and later-version deferrals.

## Purpose

The V28 parity matrix keeps commercial application MVP QA tied to exact source surfaces.
It prevents draft work from claiming V28 closure when only V27 primitives exist.

## Audit Basis

Fresh audit inputs:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V27.md`
- `BITCODE_SPEC_V27_DELTA.md`
- `BITCODE_SPEC_V27_NOTES.md`
- `BITCODE_SPEC_V27_PARITY_MATRIX.md`
- `BITCODE_SPEC_V27_PROVEN.md`
- `BITCODE_SPEC_V28_NOTES.md`
- `protocol-demonstration/src/canon-posture.js`
- `protocol-demonstration/data/state.json`
- `protocol-demonstration/HOST_CAPABILITIES.json`
- `packages/btd/src/constants.ts`
- `packages/btd/src/supply.ts`
- `packages/btd/src/measuremint.ts`
- `packages/btd/src/semantic-volume.ts`
- `packages/btd/src/range.ts`
- `packages/btd/src/receipts.ts`
- `packages/btd/src/replay.ts`
- `packages/btd/src/allocation.ts`
- `packages/btd/src/access.ts`
- `packages/btd/src/ancestry.ts`
- `packages/btd/src/revenue.ts`
- `packages/btd/src/wallet.ts`
- `packages/btd/src/bitcoin-fees.ts`
- `packages/btd/src/bitcoin-provider.ts`
- `packages/btd/src/ledger-anchor.ts`
- `packages/btd/src/exchange.ts`
- `packages/btd/src/terminal-journal.ts`
- `packages/btd/src/reconciliation.ts`
- `packages/btd/src/deployment-lanes.ts`
- `packages/btd/src/telemetry.ts`
- `packages/btd/src/upgrade.ts`
- `packages/api/src/routes/btd-crypto.ts`
- `uapi/app/api/btd/*`
- `uapi/app/application/*`
- `uapi/app/exchange/*`
- `uapi/app/btd/[assetPackId]/page.tsx`
- `uapi/app/auxillaries/*`
- `uapi/app/executions/*`
- `uapi/components/base/bitcode/btd/*`
- `internal-docs/BITCODE_TERMINAL_OPERATOR_EXPERIENCE.md`
- `internal-docs/BITCODE_FRONTEND_ARCHITECTURE.md`
- `internal-docs/BITCODE_AUXILLARIES_READINESS.md`
- `internal-docs/BITCODE_EXCHANGE_DATABASE.md`
- `internal-docs/INTEGRATIONS.md`

No `_legacy/` source is active source truth.

Audit query classes:

- active canonical pointer and draft target posture;
- V27 promoted tokenomics and crypto rails;
- Terminal, Application, Exchange, Auxillaries, executions, BTD route, auth/readiness, and BTD component discovery;
- wallet, BTC fee, PSBT, signer, finality, ledger, journal, reconciliation, telemetry, upgrade, migration, AssetPack range, licensed read, Need, Fit, and organization readiness searches;
- route versioning scan under `uapi/app/api`.

## Judgment Legend

- `implemented baseline`: present from V27 and suitable as a V28 starting point.
- `partial`: present but not Terminal-productized enough for V28 closure.
- `gap`: required by V28 and not yet implemented at the product/source level.
- `deferred`: intentionally owned by a later version.
- `closed`: satisfied for the current V28 draft-opening gate.

## Gate 1 Parity

| Requirement | Source evidence | Judgment |
| --- | --- | --- |
| Active canon remains V27 during V28 draft opening | `BITCODE_SPEC.txt` contains `V27` | closed |
| Runtime draft target moves to V28 | `protocol-demonstration/src/canon-posture.js` now declares V27 active canon and V28 draft target | closed |
| Static demo state mirrors V28 draft target | `protocol-demonstration/data/state.json` and `HOST_CAPABILITIES.json` now report V27 active / V28 draft | closed |
| BTD registry snapshots report the current posture | `packages/api/src/routes/btd-crypto.ts` reports V27 active / V28 draft | closed |
| V28 SPEC family exists as draft | `BITCODE_SPEC_V28.md`, DELTA, NOTES, and PARITY exist | closed |
| UAPI implementation routes remain unversioned | `find uapi/app/api -path '*v[0-9]*' -print` returns empty | closed |
| V28 does not claim PROVEN before closure | no `BITCODE_SPEC_V28_PROVEN.md` is created in Gate 1 | closed |

## V28 Implementation Parity

## V28 implementation matrix

| Area | Current source evidence | Judgment | Gate owner |
| --- | --- | --- | --- |
| Commercial application MVP route QA | `/`, `/application`, `/exchange`, `/auxillaries/*`, `/btd/[assetPackId]`, conversations, and the public `/docs` article map are covered by `uapi/tests/e2e/commercial-mvp*.spec.ts`; `pnpm -C uapi run test:e2e:commercial-mvp` passes with 50 laptop-project tests covering route readability, stitched navigation, Terminal and Exchange URL-addressable filters, filter reset, Exchange-intent preservation, BTD data-share consent persistence, BTD range disclosure, conversations, and responsive checks | closed for expanded automated commercial MVP E2E proof | Gate 2 |
| Signed-in BTD balance widget uses V28 commercial semantics | `uapi/components/base/bitcode/btd/btd-tracker.tsx`, `uapi/components/base/bitcode/layout/nav.tsx`, `uapi/hooks/useUserData.ts`, `packages/api/src/routes/auxillaries-contract.ts`, `protocol-demonstration/test/v28-commercial-mvp-qa.test.js`, manual QA screenshots May 6 2026 | closed | Gate 2 |
| Exchange BTD widget landing stays at top-level Exchange entry | `uapi/app/exchange/ExchangePageClient.tsx`, `uapi/tests/exchangePageClient.test.tsx`, `protocol-demonstration/test/v28-commercial-mvp-qa.test.js` | closed for current micro-interface | Gate 2 |
| Auxillaries old orbital shell conflicts removed from active contained tabs-left experience | May 7 manual QA reports no active old orbital shell collision and selectable panes; `BITCODE_V28_QA.md` records remaining V28 polish for visible `lane ready` / `lane active` prose, hierarchy, legibility, spacing, and border cleanup | partial; old orbital conflict appears closed, Auxillaries shell polish remains pending | Gate 2 |
| Active Auxillaries naming avoids `orbitals` residue | `uapi/config/featureFlags.ts`, `uapi/lib/mock-review-mode.ts`, `uapi/app/application/ApplicationOpenAuxillariesButton.tsx`, `uapi/components/base/bitcode/layout/user-menu.tsx`, and related tests now use Auxillaries naming; redirect-only `/orbitals/*` compatibility and inert stylesheet carriers remain bounded as compatibility/styling until separately removed | partial; active touched names closed, remaining CSS/compatibility carriers tracked for later cleanup | Gate 2 |
| Terminal big-picture operator orientation | `uapi/app/application/ApplicationTransactionWorkspace.tsx`, `uapi/app/application/ApplicationTerminalMvpMap.tsx`, `uapi/components/base/bitcode/execution/BitcodeTransactionsOverview.tsx`, and `uapi/tests/e2e/commercial-mvp.terminal.spec.ts` now frame Terminal as recent/scoped Give/Need activity plus selected result, not Exchange master-detail; bare `/application` no longer auto-mutates during public nav while explicit route context remains addressable | partial; architectural correction, route-stability fixes, and known digest action no-ops implemented, next manual QA must judge digestibility | Gate 2 / Gate 3 |
| Exchange MVP activity/search/detail/range-acquisition readiness | `uapi/app/exchange/ExchangePageClient.tsx`, `uapi/app/application/ApplicationTransactionWorkspace.tsx`, `uapi/app/application/ApplicationTransactionDetailSurface.tsx`, `/btd/[assetPackId]`, and `uapi/tests/e2e/commercial-mvp.btd-exchange.spec.ts` now bind Exchange to a master table/search/filter pane plus named selected detail pane with table facts, non-column facts, payload, proof, AssetPack, and history paths | closed for V28 Exchange master-detail MVP; V30 owns deeper market mechanics | Gate 2 |
| Terminal wallet connection and signer-session review | `packages/btd/src/wallet.ts`; profile and wallet API readiness helpers | implemented prerequisite | Gate 3 |
| BTC fee PSBT handoff and finality display | `packages/btd/src/bitcoin-fees.ts`, `bitcoin-provider.ts`, `/api/btd/btc-fee-transaction` | implemented prerequisite | Gate 3 |
| Need review before Fit review | application/executions Need components and internal Terminal notes | implemented prerequisite | Gate 3 |
| semantic-volume and measuremint display | `semantic-volume.ts`, `measuremint.ts`, mint draft route | implemented prerequisite | Gate 3 |
| access policy id/hash shown before commitment | V27 access primitives and `/btd/[assetPackId]` disclosure route | implemented prerequisite | Gate 3 |
| AssetPack range detail from registry state | `range.ts`, registry route, `/btd/[assetPackId]` | implemented prerequisite | Gate 4 |
| owner-read/licensed-read/denied branches | `access.ts`, read-access route, licensed-read revenue route | implemented prerequisite | Gate 4 |
| Terminal journal rows as transaction detail | `terminal-journal.ts`, terminal-journal route | implemented prerequisite | Gate 5 |
| ledger/database reconciliation as operator read | `reconciliation.ts`, reconciliation route | implemented prerequisite | Gate 5 |
| organization holdings and read-license usage from registry | organization BTD models plus V27 registry docs | pending | Gate 6 |
| MCP authorization based on range/read-license/policy truth | MCP holding-gate work remains aggregate-compatibility oriented | pending | Gate 6 |
| access-policy legal templates | policy id/hash exists; full templates not complete | pending | Gate 6 |
| deployment lanes and telemetry surfaced in Terminal | `deployment-lanes.ts`, `telemetry.ts`, deployment-readiness route | implemented prerequisite | Gate 7 |
| migration/type refresh visible as readiness | V27 migration exists; generated type refresh is deferred | pending | Gate 7 |
| GitHub-only provider readiness disclosed | `internal-docs/INTEGRATIONS.md` shows GitHub implemented and broader providers incomplete | implemented prerequisite | Gate 7 |

## V28 implementation checklist

| Area | Required V28 result | Judgment |
| --- | --- | --- |
| Draft family | SPEC, DELTA, NOTES, PARITY exist | closed |
| Canon posture | V27 active / V28 draft in source posture carriers | closed |
| Routes | unversioned UAPI route scan passes | closed |
| Commercial app QA | primary route, auth, Auxillaries, Exchange, BTD range, conversations, docs article map, responsive health, URL-addressable filters, consent persistence, and stitched navigation/interaction E2E coverage | closed for expanded automated commercial MVP E2E baseline |
| Auxillaries shell | contained tabs-left active experience without orbital layout collision | pending |
| Exchange MVP | activity/search/detail/range-acquisition route readiness | closed for master-detail MVP |
| Terminal master-detail correction | Terminal must present itself as a Give/Need operator surface with recent/scoped activity results while Exchange owns the searchable master-detail activity table and selected detail | closed pending next manual QA confirmation |
| Terminal clickable affordance | Known no-op or ambiguous click targets must be fixed, and clickable controls must be visually distinguishable from static badges/chips | partial; digest detail buttons and static overview badges corrected, broader manual pass remains |
| Exchange selected activity detail completeness | selected Exchange activity detail exposes all table facts plus relevant non-column activity facts and payload paths for activity-system QA | closed for V28 MVP |
| Conversations route QA | fullscreen split-pane writing mode, docs route handoff, route-local source selectors, and mock stream boundaries must avoid app crashes and unauthenticated console noise | closed for V28 MVP automated baseline |
| Terminal wallet | wallet and signer-session UX built over V27 primitives | pending |
| Terminal BTC fees | PSBT/finality UX built over V27 primitives | pending |
| Terminal Need/Fit | Need, Fit, semantic volume, measuremint, policy UX | pending |
| Terminal range/read | AssetPack range and read-right detail | pending |
| Terminal journal/reconcile | journal diff and repair detail | pending |
| Terminal operations | telemetry, lanes, upgrade, migration readiness | pending |

## Later-Version Deferrals

| Finding | Current disposition |
| --- | --- |
| Broad Exchange market depth, high-volume order book, wrappers, and third-party market routing | deferred to V30 beyond V28 Exchange MVP QA |
| Deeper Terminal transaction operation beyond MVP QA | deferred to V29 |
| Auxillaries expansion beyond active-shell cleanup | deferred to V31 |
| Bitbucket, GitLab, Azure DevOps, generic Git, webhook abstraction, and provider feature detection | deferred to the later product version that owns the affected commercial surface unless V28 commercial-app QA requires a narrow readiness hook |
| MCP API, ChatGPT App, and non-Auxillaries non-website application interface maturation beyond registry-derived access checks | deferred to V33 |
| Deeper provation and testing | deferred to V32 |
| Deeper deployment | deferred to V34 |
| Deeper telemetry and documenting | deferred to V35 |
| Value-bearing mainnet launch | blocked until explicit operational approval root |

## accepted boundaries

- V28 is commercial-application-MVP-first.
- V29 owns deeper Terminal workflows.
- V30 owns deeper Exchange.
- V31 owns deeper Auxillaries.
- V32 owns deeper provation and testing.
- V33 owns deeper Interfaces.
- V34 owns deeper Deployment.
- V35 owns deeper telemetry and documenting.
- value-bearing mainnet launch remains separately gated.

## completion condition

V28 parity closes when every V28 implementation matrix row is `closed` or explicitly `deferred`, the V28 proof appendix exists, required tests/builds pass, and `BITCODE_SPEC.txt` is promoted only at final V28 closure.

## V28 Proof Expectations

Before V28 promotion:

- `BITCODE_SPEC_V28_PROVEN.md` must be generated or manually bound to accepted proof artifacts.
- package/API/ORM/protocol-demonstration tests must pass.
- Terminal UI tests or Playwright checks must cover wallet, BTC fee, Need/Fit, range, read-right, journal, reconciliation, and operational health flows.
- `pnpm -C uapi run test:e2e:commercial-mvp` must pass serially with deterministic Auxillaries and Conversations mock APIs.
- commercial provider packages must declare the runtime SDK bindings they require directly, so dev-server provider module-resolution warnings are not normalized as QA noise.
- `pnpm -C uapi build` must pass.
- `find uapi/app/api -path '*v[0-9]*' -print | sort` must remain empty.
- `git diff --check` must pass.
