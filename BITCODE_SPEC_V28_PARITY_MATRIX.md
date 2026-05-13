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
- Scope: source-to-spec parity for V28 commercial Protocol implementation, Terminal MVP QA, MCP API/ChatGPT App MVP, BTD/testnet/ledgerization, and demonstration-to-commercial boundary work over V27 tokenomics and crypto-commercial rails. Exchange and website Conversations are deferred beyond V35.
- Spec companion: `BITCODE_SPEC_V28.md`
- Notes companion: `BITCODE_SPEC_V28_NOTES.md`
- Delta companion: `BITCODE_SPEC_V28_DELTA.md`
- Generated proof appendix: none until V28 promotion

This matrix records the initial V28 source audit.
It separates V27-implemented primitive truth from V28 commercial Protocol/Terminal MVP QA work and later-version deferrals.

## Purpose

The V28 parity matrix keeps commercial Protocol/Terminal MVP QA tied to exact source surfaces.
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
- `uapi/app/terminal/*`
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
- Terminal, Auxillaries, executions, BTD route, MCP API, ChatGPT App, auth/readiness, and BTD component discovery;
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

## Staging-Testnet Minimal Commercial Parity Matrix

This table is the active V28 QA map for the real deployed staging-testnet path.
It links manual screenshots, console logs, server logs, Supabase SQL checks, and source audit findings to the protocol surface that must close before V28 promotion.

| Parity area | Source evidence | Current V28 judgment | Closure evidence required |
| --- | --- | --- | --- |
| BTC/D identity and wallet-backed session | `uapi/app/api/wallet/_shared.ts`, `uapi/app/api/wallet/authenticate/route.ts`, `uapi/app/api/wallet/oauth/authorization-code/route.ts`, `uapi/app/api/wallet/oauth/token/route.ts`, `uapi/app/api/wallet/oauth/userinfo/route.ts`, `uapi/lib/bitcoin-wallet-client.ts`, `uapi/lib/bitcode-wallet-local.ts`, `packages/btd/src/wallet.ts`, `packages/btd/src/bitcoin-provider.ts`, `supabase/migrations/003_user_connections_provider_scope.sql` | partial | Live staging-testnet wallet connect with Xverse or Leather, signed challenge proof, top-chrome identity hydration, Wallet pane provider/address/balance readout, Supabase auth/session projection, sign-out clearing, and SQL evidence in `auth.users`, `user_connections`, and `user_profiles`. |
| GitHub App and repository source scope | `uapi/app/api/vcs/_shared.ts`, `uapi/app/api/vcs/[provider]/callback/route.ts`, `uapi/app/api/vcs/[provider]/setup/route.ts`, `uapi/app/api/vcs/[provider]/repositories/route.ts`, `packages/api/src/vcs/github-service.ts`, Auxillaries Externals pane, `supabase/migrations/001_v26_production.sql` `user_connections` and `vcs_repositories` | partial | GitHub App install/callback returns to Externals, installation/user state is stored under provider-scoped connection data, repositories appear for Give/Need source scope, and SQL evidence confirms `user_connections.provider='github'` plus `vcs_repositories` rows. |
| PSQL/Supabase data reality | `supabase/migrations/001_v26_production.sql`, `002_v27_btd_crypto_registry.sql`, `003_user_connections_provider_scope.sql`, `internal-docs/BITCODE_EXCHANGE_DATABASE.md` | partial | Staging database has all required auth/profile/connection/repository/BTD registry/journal/telemetry tables, RLS posture does not hide required user-scoped reads, and QA SQL queries match Terminal/Wallet/Externals UI state. |
| Fit-finding | `uapi/app/terminal/TerminalGiveNeedWorkbench.tsx`, `TerminalNeedScenarioPanel.tsx`, `terminal-give-need-workbench.ts`, `terminal-need-scenarios.ts`, `packages/protocol/src/canonical/*`, `protocol-demonstration/src/*` reference witness | partial | Terminal simplest Need produces or reads Fit candidates, review decision, qualities, rejection/block reasons, source roots, proof/dedupe roots, and visible readiness state without relying on demonstration runtime imports. |
| AssetPack synthesis and deterministic pipeline configuration | `internal-docs/ASSETPACK_EXECUTION.md`, `packages/protocol/src/canonical/run-artifacts.js`, `packages/btd/src/semantic-volume.ts`, `measuremint.ts`, `range.ts`, `receipts.ts`, `replay.ts`, `uapi/app/api/btd/mint-draft/route.ts`, Terminal AssetPack components | partial with blocker | Staging Need/Fit path creates or reads AssetPack evidence, semantic volume, measuremint/range or zero-cell receipt, and access-policy hash using protocol-specified model/pipeline configuration. Any broad user model-selection UI that can affect ledgerized synthesis must be removed or scoped to non-ledgerized conversation UX. |
| Ledgerized journal and ledger anchors | `packages/btd/src/terminal-journal.ts`, `ledger-anchor.ts`, `reconciliation.ts`, `uapi/app/api/btd/terminal-journal/route.ts`, `asset-pack-ledger-anchor/route.ts`, `ledger-database-reconciliation/route.ts`, `supabase/migrations/002_v27_btd_crypto_registry.sql` | partial | Terminal shows journal rows for Need/Fit/AssetPack/BTC fee/anchor/reconciliation events, ledger anchor or blocked-readiness state is explicit, and SQL evidence in `btd_terminal_journal_entries`, `btd_asset_pack_ledger_anchors`, and reconciliation repair tables matches the UI. |
| BTC fee and testnet ledger path | `packages/btd/src/bitcoin-fees.ts`, `bitcoin-provider.ts`, `uapi/app/api/btd/btc-fee-transaction/route.ts`, wallet client code | partial | Testnet path prepares fee state, uses wallet-controlled signing/PSBT or named blocked-readiness receipt, records no server custody, and writes/readbacks `btc_fee_transactions` where a fee receipt is produced. |
| Pipeline runtime deployment reality | `uapi/app/api/executions/*`, `uapi/app/api/external-realization/route.ts`, `uapi/app/api/make-bitcode-branch/route.ts`, `internal-docs/DEPLOYMENT.md`, `internal-docs/ASSETPACK_EXECUTION.md`, Terminal execution/readback components | partial | Staging logs show the runtime lane selected, external realization or branch creation readiness is honest, source writes are blocked or performed by configured GitHub App authority, and Terminal state identifies runtime/deployment blockers instead of falling back to mock success. |
| Telemetry, logging, and Sentry/alerting | `uapi/lib/bitcode-qa-telemetry.ts`, `uapi/lib/bitcode-server-telemetry.ts`, `uapi/app/api/client-error/route.ts`, `packages/btd/src/telemetry.ts`, `packages/protocol/src/telemetry.js`, `btd_crypto_telemetry_events` migration | partial | Client/server verbose logs cover wallet, GitHub, Terminal Need/Give, Fit, AssetPack, ledger, and database sync; staging captures warnings/errors without leaking secrets; Sentry/alert sink readiness is documented or explicitly blocked for V35 deepening. |
| MCP API and ChatGPT App parity | `packages/mcp`, `packages/chatgptapp`, UAPI MCP/ChatGPT App entrypoints, docs routes | partial | MCP and ChatGPT App MVP read the same wallet, GitHub, access-policy, AssetPack, journal, and proof posture as Terminal and fail closed when prerequisites are absent. |
| Legacy residue awareness and cleaning | source scans for retired workspace routes, `orbitals` carriers, broad model-selection UI, Exchange/website Conversations links, versioned route families | partial | Active V28 paths have no versioned route/source naming, no retired workspace route, no active old orbital shell, no Exchange/Conversations dependency for V28 closure, and no user-driven ledgerized model selection. Deferred compatibility carriers are named and scoped. |

## V28 implementation matrix

| Area | Current source evidence | Judgment | Gate owner |
| --- | --- | --- | --- |
| Protocol/Terminal MVP route QA | `/`, `/terminal`, `/auxillaries/*`, `/btd/[assetPackId]`, MCP API, ChatGPT App, and the public `/docs` article map are the V28 route QA scope; prior Exchange and website Conversations E2E coverage is now historical/deferred and must not be required for V28 closure; the prior generic workspace route is fully retired and redirects to `/terminal` | partial; existing E2E suite must be narrowed or split so V28 proof excludes Exchange and website Conversations while retaining Terminal/Protocol/Auxillaries/BTD/MCP/ChatGPT coverage | Gate 2 |
| Signed-in BTD balance widget uses V28 commercial semantics | `uapi/components/base/bitcode/btd/btd-tracker.tsx`, `uapi/components/base/bitcode/layout/nav.tsx`, `uapi/hooks/useUserData.ts`, `packages/api/src/routes/auxillaries-contract.ts`, `protocol-demonstration/test/v28-commercial-mvp-qa.test.js`, manual QA screenshots May 6 2026 | closed | Gate 2 |
| BTD balance widget opens wallet-owned Wallet auxillary state | `uapi/components/base/bitcode/btd/btd-tracker.tsx`, `uapi/components/base/bitcode/layout/nav.tsx`, `protocol-demonstration/test/v28-commercial-mvp-qa.test.js` | updated for May 9 QA: connected wallet identity replaces Exchange-oriented acquisition, and clicking opens the Wallet auxillary pane while Exchange acquisition is deferred beyond V35 | Gate 2 |
| Auxillaries old orbital shell conflicts removed from active contained tabs-left experience | May 7 manual QA reports no active old orbital shell collision and selectable panes; May 9 manual QA found unauthenticated non-mock `Connect Wallet` still opening the old shell, initial Profile scroll instability, duplicate selector titles, visible Save buttons, Wallet pane hierarchy/overflow/activity gaps, notification footer clutter, and inconsistent mock/non-mock prerequisite posture. Source now routes all portal overlays through the contained shell, removes selector lane-label duplication, moves overlay controls top-right, removes visible auxillary Save buttons in favor of autosave, stabilizes first-open Profile scroll, removes the notification footer Auxillaries launcher, reserves selector hover headroom, makes Bitcoin wallet identity the first required Wallet action, makes GitHub second for Give/Need repository scope in Externals, makes email optional Profile posture, promotes BTD/BTC stat hierarchy, moves stat explanations to tooltips/accessibility labels, and keeps the shared Terminal/Protocol activity table grammar in the Wallet pane. | partial; source fixes landed, automated smoke confirms non-mock contained shell parity, next manual QA must confirm visual/runtime closure in staging-testnet | Gate 2 |
| Wallet-first Bitcoin authentication | `uapi/app/auxillaries/components/AuxillariesWalletPane.tsx`, `uapi/app/auxillaries/components/AuxillariesSurface.tsx`, `uapi/app/api/wallet/authenticate/route.ts`, `uapi/lib/bitcoin-wallet-client.ts`, `uapi/lib/bitcode-wallet-local.ts`, `uapi/tests/bitcoinWalletClient.test.ts`, `uapi/tests/e2e/commercial-mvp.auxillaries.spec.ts`, `supabase/migrations/003_user_connections_provider_scope.sql`, `uapi/tests/api/walletAuthenticateRoute.test.ts` | partial; implemented and unit-tested for Bitcoin-provider admission, Xverse/Sats Connect priority, Leather direct-provider support, provider-specific Wallet actions, payment/auth address distinction, and persistence posture, with local staging fallback when backend auth is unavailable. Browser smoke with a stubbed Leather provider verifies the click path calls `getAddresses` and `signMessage`. Contained Auxillaries suppresses progressive onboarding completion during Wallet connection and does not call onboarding persistence. Pending live staging-testnet QA with Xverse Testnet4, Leather testnet, provider-constraint migration, and GitHub connection credentials. MetaMask's Ethereum provider is explicitly rejected for this Bitcoin identity path. | Gate 2 / Gate 3 |
| Active Auxillaries naming avoids `orbitals` residue | `uapi/config/featureFlags.ts`, `uapi/lib/mock-review-mode.ts`, `uapi/app/terminal/TerminalOpenAuxillariesButton.tsx`, `uapi/components/base/bitcode/layout/user-menu.tsx`, and related tests now use Auxillaries naming; redirect-only `/orbitals/*` compatibility and inert stylesheet carriers remain bounded as compatibility/styling until separately removed | partial; active touched names closed, remaining CSS/compatibility carriers tracked for later cleanup | Gate 2 |
| Standalone demonstration and commercial protocol source are separated | `packages/protocol` is the formal commercial protocol package; `uapi/package.json` depends on `@bitcode/protocol`; `pnpm-workspace.yaml` no longer includes `protocol-demonstration`; `uapi/tests/protocolCommercialBoundary.test.ts` and `protocol-demonstration/test/v28-boundary-separation.test.js` lock no commercial imports from the standalone demonstration and no demonstration runtime imports from commercial packages/UAPI | partial; V28 keeps this as an active closure area because remaining demonstration-derived behavior needed by commercial Terminal/MCP/ChatGPT must live in packages/UAPI, not runtime imports from `protocol-demonstration/` | Gate 2 / Gate 8 |
| Terminal big-picture operator orientation | `/terminal`, `uapi/app/terminal/TerminalTransactionWorkspace.tsx`, `uapi/app/terminal/TerminalMvpMap.tsx`, `uapi/components/base/bitcode/execution/BitcodeTransactionsOverview.tsx`, and `uapi/tests/e2e/commercial-mvp.terminal.spec.ts` now frame Terminal as recent/scoped Give/Need activity plus selected result, not Exchange master-detail; bare `/terminal` no longer auto-mutates during public nav while explicit route context remains addressable, and the old Terminal route redirects without becoming a canonical product route | partial; architectural correction, route-stability fixes, and known digest action no-ops implemented, next manual QA must judge digestibility | Gate 2 / Gate 3 |
| Source names remain implicitly versioned to active canon | `AGENTS.md`, `uapi/app/terminal/demonstration-witness-scoped-styles/route.ts`, `uapi/app/terminal/demonstration-witness-styles/route.ts`, `uapi/app/terminal/demonstration-witness-scoped-styles/route.ts`, `uapi/app/terminal/demonstration-witness-styles/route.ts`, `uapi/app/terminal/demonstration-witness-theme-overrides.ts`, and `uapi/tests/demonstrationWitnessScopedStylesRoute.test.ts` replace explicit gate-named stylesheet route/source carriers with precise unversioned demonstration-witness names | closed for touched active UAPI demonstration witness stylesheet source | Gate 2 |
| Exchange product scope | `uapi/app/exchange/*` and Exchange-specific E2E coverage exist from earlier V28 work | deferred beyond V35; V28 must disable/hide Exchange in QA and must not require Exchange route/product behavior for closure | V36+ |
| Website Conversations product scope | `uapi/app/conversations/*` and Conversations-specific E2E coverage exist from earlier V28 work | deferred beyond V35; V28 must disable/hide website Conversations in QA and must not require Conversations route/product behavior for closure | V36+ |
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
| MCP authorization based on range/read-license/policy truth | MCP holding-gate work remains aggregate-compatibility oriented | pending; retained in V28 MVP scope | Gate 6 |
| ChatGPT App authorization based on range/read-license/policy truth | ChatGPT App MVP parity must use the same registry-derived access posture as MCP and Terminal | gap; retained in V28 MVP scope | Gate 6 |
| Deterministic model posture for ledgerized synthesis | `uapi/app/auxillaries/components/AuxillariesInterfacesPane.tsx` and `uapi/app/auxillaries/components/models/GlobalModelSelection.tsx` still expose broad user-driven model preferences; V28 SPEC now forbids user-selected models for Fit, AssetPack, semantic measurement, measuremint, proof, journal, and settlement paths | gap; remove, hide, or scope model selection to non-ledgerized conversation UX before promotion | Gate 3 / Gate 8 |
| access-policy legal templates | policy id/hash exists; full templates not complete | pending | Gate 6 |
| deployment lanes and telemetry surfaced in Terminal | `deployment-lanes.ts`, `telemetry.ts`, deployment-readiness route | implemented prerequisite | Gate 7 |
| migration/type refresh visible as readiness | V27 migration exists; generated type refresh is deferred | pending | Gate 7 |
| GitHub-only provider readiness disclosed | `internal-docs/INTEGRATIONS.md` shows GitHub implemented and broader providers incomplete | implemented prerequisite | Gate 7 |
| BTD-AssetPack testnet minting and ledgerized synthetic measurement | V27 package primitives exist for measuremint, range, receipts, ledger anchors, Terminal journal, and reconciliation | partial; V28 must prove realistic testnet or testnet-readiness flow with synthetic measurement, BTD-AssetPack mint/read state, journal rows, ledger anchors or blocked ledger readiness, and projection/reconciliation readback | Gate 3 / Gate 5 / Gate 7 |
| Taproot/BNB/Binance research posture | current V28 sources center Bitcoin wallet/PSBT/Taproot-compatible providers; no BSC/opBNB/BEP-20/Binance Web3 Wallet BTD deployment artifact is bound | deferred; V28 documents Bitcoin/Taproot-first testnet posture and records BSC/opBNB/Binance/BitVM bridge pilots as future bridge/distribution work unless proof-bound artifacts are added | Gate 7 / V36+ |

## V28 implementation checklist

| Area | Required V28 result | Judgment |
| --- | --- | --- |
| Draft family | SPEC, DELTA, NOTES, PARITY exist | closed |
| Canon posture | V27 active / V28 draft in source posture carriers | closed |
| Routes | unversioned UAPI route scan passes | closed |
| Commercial Protocol/Terminal QA | primary route, auth, Auxillaries, BTD range, Terminal, MCP/ChatGPT App, docs article map, responsive health, URL-addressable Terminal filters, consent persistence, and stitched navigation/interaction E2E coverage | partial; needs E2E and QA command narrowing after Exchange/Conversations deferral |
| Auxillaries shell | contained tabs-left active experience without orbital layout collision, no visible auxillary Save buttons, stable first-open pane scroll, top-right overlay controls, no notification-footer Auxillaries launcher, Wallet-first authentication, Externals-second source-provider order, Externals rendering from wallet identity before optional email/Supabase persistence, optional Profile email-third posture, consistent mock/non-mock pane order, and Wallet pane BTD activity/table readability | pending manual reconfirmation after Wallet/Externals rename and ownership fixes |
| Exchange MVP | no longer part of V28 | deferred beyond V35 |
| Terminal master-detail correction | Terminal must present itself as a Give/Need operator surface with recent/scoped activity results while Exchange owns the searchable master-detail activity table and selected detail | closed pending next manual QA confirmation |
| Terminal clickable affordance | Known no-op or ambiguous click targets must be fixed, and clickable controls must be visually distinguishable from static badges/chips | partial; digest detail buttons and static overview badges corrected, broader manual pass remains |
| Exchange selected activity detail completeness | no longer part of V28 | deferred beyond V35 |
| Conversations route QA | no longer part of V28 | deferred beyond V35 |
| Terminal wallet | wallet and signer-session UX built over V27 primitives | pending |
| Terminal BTC fees | PSBT/finality UX built over V27 primitives | pending |
| Terminal Need/Fit | Need, Fit, semantic volume, measuremint, policy UX | pending |
| Terminal range/read | AssetPack range and read-right detail | pending |
| Terminal journal/reconcile | journal diff and repair detail | pending |
| Terminal operations | telemetry, lanes, upgrade, migration readiness | pending |

## Later-Version Deferrals

| Finding | Current disposition |
| --- | --- |
| Broad Exchange market depth, high-volume order book, wrappers, third-party market routing, and Exchange MVP/deepening | deferred beyond V35 |
| Website Conversations interface, conversation stream UI, and Conversations-to-Terminal workflow | deferred beyond V35 |
| Deeper Terminal transaction operation beyond MVP QA | deferred to V29 |
| Auxillaries expansion beyond active-shell cleanup | deferred to V31 |
| Bitbucket, GitLab, Azure DevOps, generic Git, webhook abstraction, and provider feature detection | deferred to the later product version that owns the affected commercial surface unless V28 commercial-app QA requires a narrow readiness hook |
| MCP API and ChatGPT App MVP | retained in V28 |
| Interface maturation beyond the V28 MCP API and ChatGPT App MVP | deferred to V33 |
| Deeper provation and testing | deferred to V32 |
| Deeper deployment | deferred to V34 |
| Deeper telemetry and documenting | deferred to V35 |
| Value-bearing mainnet launch | blocked until explicit operational approval root |

## accepted boundaries

- V28 is commercial Protocol/Terminal MVP first.
- V29 owns deeper Terminal workflows.
- V30 is reserved for Protocol/BTD hardening discovered during V28/V29.
- V31 owns deeper Auxillaries.
- V32 owns deeper provation and testing.
- V33 owns deeper Interfaces.
- V34 owns deeper Deployment.
- V35 owns deeper telemetry and documenting.
- V36+ owns deeper Exchange and website Conversations.
- value-bearing mainnet launch remains separately gated.

## completion condition

V28 parity closes when every V28 implementation matrix row is `closed` or explicitly `deferred`, the V28 proof appendix exists, required tests/builds pass, and `BITCODE_SPEC.txt` is promoted only at final V28 closure.

## V28 Proof Expectations

Before V28 promotion:

- `BITCODE_SPEC_V28_PROVEN.md` must be generated or manually bound to accepted proof artifacts.
- package/API/ORM/protocol-demonstration tests must pass.
- Terminal UI tests or Playwright checks must cover wallet, BTC fee, Need/Fit, range, read-right, journal, reconciliation, and operational health flows.
- the V28 commercial-MVP E2E runner must pass serially with deterministic Terminal, Auxillaries, BTD, MCP API, and ChatGPT App readiness mocks; Exchange and website Conversations suites must be split or excluded from V28 proof.
- commercial provider packages must declare the runtime SDK bindings they require directly, so dev-server provider module-resolution warnings are not normalized as QA noise.
- `pnpm -C uapi build` must pass.
- `find uapi/app/api -path '*v[0-9]*' -print | sort` must remain empty.
- `git diff --check` must pass.
