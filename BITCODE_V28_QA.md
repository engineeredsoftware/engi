# Bitcode V28 QA Ledger

## Purpose

This ledger records collaborative human QA for V28 commercial application MVP hardening.
It stays synchronized as manual QA proceeds and separates V28 MVP closure from later deepening versions.

V28 is not a marketing-page review.
V28 focuses on whether the commercial application functions are coherent, readable, navigable, and honest over the V27 `$BTD` and crypto-commercial canon.

## Session Header

| Field | Value |
| --- | --- |
| Date | 2026-05-08 |
| Latest resume | 2026-05-09 |
| Mock app URL | `http://127.0.0.1:3000` |
| Testnet-readiness app URL | `http://127.0.0.1:3001` when a second dev server is running |
| Server mode | dual-lane QA: deterministic mock first, then testnet/live-readiness |
| Active canon pointer | `BITCODE_SPEC.txt` -> `V27` |
| Draft target | `V28` |
| Manual QA focus | natural operator progression plus docs-sequenced validation |
| Marketing page status | intentionally de-scoped except for navigation-entry regressions |

## V28 MVP Scope

V28 closes when the commercial app can be used and understood at MVP level across the major product surfaces:

| Surface | V28 MVP expectation | Later deepening |
| --- | --- | --- |
| Identity and authentication | Auth/profile/menu/notifications are reachable, legible, and do not block application orientation. | V31 deepens account, team, multi-sig, role, recovery, and organization controls. |
| Terminal | Activity ledger, selected detail, Give/Need/Fit/proof/readiness/range signals are readable and route-stable at MVP level. | V29 deepens full Terminal transactions, wallet recovery, BTC lifecycle, journal diff, and reconciliation. |
| Exchange | Exchange route, activity search/table/detail, BTD intent entry, and range disclosure work without homepage redirects or false market depth. | V30 deepens order book, bid/ask/buy/sell/settle history, wrappers, disputes, and revenue routes. |
| Auxillaries | Profile, Connects, Interfaces, and BTD panes are contained, selectable, legible, and free of active old orbital shell collision. | V31 deepens settings, provider readiness, diagnostics, policies, accessibility, and recovery flows. |
| Conversations | Conversation route functions as a Bitcode write/interface surface and returns to Terminal cleanly. | V33 deepens ChatGPT App and API-facing conversational interfaces. |
| API/interfaces/docs | Docs and interface pages explain current MVP behavior without claiming final MCP/ChatGPT/API commercial depth. | V33 deepens MCP API, ChatGPT App, and non-website interfaces; V35 deepens documentation. |
| Provation/testing | E2E coverage proves current MVP route/readability/user-flow stability. | V32 deepens provation and regression breadth. |
| Deployment/telemetry | Dev/testnet readiness is honest; value-bearing mainnet is not silently enabled. | V34 deepens deployment; V35 deepens telemetry and operational documentation. |

## V28 QA Directionality

Manual QA now proceeds on two coordinated tracks instead of isolated surface review.
Every finding should be assigned to the track that revealed it and then mapped back to the owning product surface.
Every pass runs in two environment lanes:

| Lane | Purpose | Expected V28 result |
| --- | --- | --- |
| Mock | Deterministic happy-path and modeled blocked-state validation with `NEXT_PUBLIC_MASTER_MOCK_MODE=true` and provider mocks enabled. | Product behavior, copy, route state, and console cleanliness can be judged without external wallet, GitHub, broadcaster, or database volatility. |
| Testnet-readiness | Same user path with public mock flags disabled and `NEXT_PUBLIC_BITCODE_ENV=testnet`. | The app must stay navigable and honest: live-ready capabilities work when credentials/providers exist, missing credentials surface as blocked readiness, and no value-bearing mainnet behavior is silently enabled. |

The testnet-readiness lane is not a substitute for V34 deployment hardening.
For V28, it exists to catch false-positive mock success, disabled-route regressions, and unclear readiness states while the commercial MVP is still being shaped.

### Track 1: Natural Operator Progression

This track follows the order a reasonable first commercial user would experience before they understand the whole system.
It intentionally starts with prerequisites because unclear readiness blocks every later judgment.

| Step | User progression | V28 MVP questions | Primary surfaces | Later-version boundary |
| --- | --- | --- | --- | --- |
| 1A | Connect wallet, GitHub, identity/profile, and required provider prerequisites. | Can the user see what is connected, what is mocked/testnet, what is missing, and what actions remain blocked? | Auxillaries, nav/profile, Terminal readiness, BTD widget | V31 deepens account/provider recovery; V34 deepens deployment/runtime readiness. |
| 1B | Perform the fastest simple Need and read the Fit/settlement/delivery result. | Can a user express or select a Need, trigger the simplest path, and read back Fit, proof, AssetPack, BTD/BTC, and delivery state without guessing? | Terminal, Exchange activity detail, BTD range pages | V29 deepens Terminal transaction choreography; V30 deepens Exchange market detail. |
| 1C | Perform the fastest simple Give and read the earning/settlement result. | Can a user contribute source, see admissibility/readiness, and understand what was earned or why earning is blocked/staged? | Terminal Give, Auxillaries Connects, Exchange activity detail, BTD settlement reads | V29 deepens Give workflows; V30 deepens sale/bid/ask/settlement history. |

### Track 2: Docs-Sequenced Product Validation

This track follows the public docs order so the application can be checked against how Bitcode teaches itself.
The objective is not marketing critique; it is whether docs, routes, labels, controls, and visible state agree at MVP depth.

| Docs sequence | Public docs route(s) | Product validation focus | Expected V28 disposition |
| --- | --- | --- | --- |
| 00 Start Here | `/docs/what-is-bitcode`, `/docs/source-shares` | Can a new user connect Source Shares, Exchange, Terminal, Protocol, Give, Need, and Read to what the app actually shows? | V28 fixes contradictions; deeper explanatory polish can move to V35. |
| 01 Exchange And Terminal | `/docs/exchange`, `/docs/terminal`, `/docs/terminal-actions`, `/docs/read-results` | Does Exchange own master-detail and Terminal own bounded Give/Need/operator actions with expected readbacks? | V28 blocker when product/docs disagree about ownership or action consequences. |
| 02 Operator Modes | `/docs/auxillaries`, `/docs/conversations`, `/docs/configuration` | Do Auxillaries, Conversations, and configuration/readiness copy match the visible app and fail-closed states? | V28 fixes MVP confusion; V31/V33 deepen feature sets. |
| 03 Protocol And Proof | `/docs/protocol-v26`, `/docs/proofs`, `/docs/settlement-btd` | Do proof, settlement, BTD, BTC, owner/licensed read, and fail-closed claims match visible reads and V27 law? | V28 fixes overclaims and missing MVP proof posture; V32/V35 deepen provation/docs. |
| 04 Commercial Interfaces | `/docs/commercial-interfaces`, `/docs/mcp-api`, `/docs/chatgpt-app` | Are API/MCP/ChatGPT/interface claims honest about MVP readiness and where users verify results? | V28 fixes false commercial claims; V33 owns full interface finalization. |

## Reordered QA Roadmap

Use this roadmap for the interactive workshop from here forward.
Each pass should be small enough to produce actionable screenshots, console observations, and route-state notes before implementation.

| Pass | Track | Scope | Stop condition |
| --- | --- | --- | --- |
| 3A | Natural progression 1A | Wallet, GitHub, profile, notifications, nav balance, Auxillaries Connects/Profile/BTD readiness. | Mock passes deterministic readiness; testnet-readiness either works live or records precise blocked provider/credential states; no console errors. |
| 3B | Natural progression 1B | Simplest Need path: select/express Need, run or inspect fastest Fit path, read settlement/delivery/result state. | User can explain what happened, where it landed in Exchange, what is mocked, and what remains staged in testnet-readiness. |
| 3C | Natural progression 1C | Simplest Give path: attach or select source, run/inspect Give flow, read earning/settlement state. | User can explain what source was contributed, how it was measured, and whether earning/BTD posture is live, mocked, or blocked. |
| 4A | Docs sequence 00 | Docs overview and Source Shares against nav, Terminal, Exchange, BTD widget. | Contradictions between docs and product are logged in both lanes. |
| 4B | Docs sequence 01 | Exchange and Terminal docs against the actual Exchange master-detail and Terminal action/read flows. | Ownership of product patterns is clear in mock and still honest when live/testnet dependencies are absent. |
| 4C | Docs sequence 02 | Auxillaries, Conversations, and Configuration docs against app modes. | MVP readiness and fail-closed states are honest in both lanes. |
| 4D | Docs sequence 03 | Protocol/proof/settlement docs against visible proof, BTD, BTC, and access-policy reads. | No public docs overclaim proof/source/license/payment behavior; testnet-readiness exposes missing ledger/signer/broadcaster posture plainly. |
| 4E | Docs sequence 04 | Commercial Interfaces, MCP/API, and ChatGPT App docs against available routes/interface claims. | Interface claims are staged honestly for V33 and do not imply unavailable live integrations. |

## Running Manual QA Findings

### 2026-05-07 Pass 1: Big-Picture Identity/Auth And Auxillaries Entry

| Check | Result | Notes |
| --- | --- | --- |
| Top nav shows Exchange, Terminal, Docs, BTC, and BTD | pass | Notifications, profile menu dropdown, and logo/page indicator are present. |
| Auxillaries opens from application entry | pass | Overlay opens and panes are selectable. |
| Console after initial pass | pass | No console errors reported by manual QA. |
| Old orbital shell conflict | pass | No old orbital shell was visible in this pass. |
| Marketing page review | de-scoped | V28 manual QA now focuses on application functionality, not marketing-page critique. |

Open V28 issue from this pass:

| Issue | Severity | V28 disposition |
| --- | --- | --- |
| Auxillaries selector cards render `lane ready` / `lane active` as visible prose. These should become clearer readiness/active indicators rather than text labels. | medium | V28 MVP polish blocker for Auxillaries shell quality. |
| Auxillaries overlay and panes need minor hierarchy, legibility, spacing, and border cleanup. | medium | V28 MVP polish blocker if it impairs commercial readability; deeper settings expansion remains V31. |

Evidence:

- Screenshots supplied in chat for nav/balance/profile-menu/notifications at approximately 2026-05-07 09:41-09:42.
- Auxillaries overlay screenshot supplied in chat at approximately 2026-05-07 09:42 showing contained panes selectable, no old orbitals, and the `connection lane ready` / `identity lane active` wording issue.

### 2026-05-07 Pass 2: Terminal Big-Picture Orientation

| Check | Result | Notes |
| --- | --- | --- |
| Terminal reads as the primary operator surface | pass for V28 MVP | Acceptable at current V28 depth. Deeper Terminal clarity and operational polish belong to V29 unless a finding blocks basic V28 use. |
| Exchange owns master-detail, not Terminal | fail | The current Terminal copy/architecture overstates master-detail. V28 must reserve the master-detail concept for Exchange: master = searchable activity table across Exchange/all-vs-own activity, detail = selected activity state. |
| Terminal activity table focuses Terminal results | partial | Terminal should show results of Give/Need/closure activity using the shared activity table, but limited and framed around recent Terminal activity rather than whole-Exchange master state. |
| Activity ledger, selected activity detail, and support panels | partial | Support panels are broadly acceptable, but Terminal organization needs MVP cleanup before deeper manual QA can judge the dense surface confidently. |
| Give / Need / Fit / proof / AssetPack / BTC / BTD concepts | pending deeper manual check | Need to verify that concepts are visible enough for MVP while not claiming V29 transaction depth. |
| Activity search, row selection, and detail tabs | pending deeper manual check | Need to verify route stability, selected context, no confusing state transitions, and that shared table behavior feels Terminal-scoped on Terminal and Exchange-wide on Exchange. |
| Clickable affordance and dead-click audit | fail | Some Terminal objects appear clickable without action, while others click correctly. V28 must fix known dead targets and distinguish clickable controls from static badges/chips consistently. |
| Dense Terminal organization | partial | Density is expected, but V28 MVP must improve grouping and visual hierarchy enough that the Terminal is digestible before V29 deepens workflows. |
| Console after Terminal pass | pass | No console errors reported by manual QA. |

Open V28 issues from this pass:

| Issue | Severity | V28 disposition |
| --- | --- | --- |
| Terminal incorrectly presents itself as the master-detail surface. Exchange should own master-detail. | high | V28 blocker. Correct product architecture, copy, tests, and visible labels so Terminal is a Give/Need operator surface with recent activity results; Exchange is the market-wide master-detail surface. |
| Terminal activity table should be shared infrastructure but scoped/framed to recent Terminal activity and executed Give/Need results. | high | V28 blocker for MVP comprehension. Deeper Terminal transaction flow remains V29. |
| Some Terminal click targets do not visibly perform an action, and static capsules can look too similar to clickable controls. | high | V28 blocker until known no-op jump targets and control/static styling are audited and corrected. |
| Terminal density and grouping are not yet digestible enough to judge deeper behavior confidently. | medium | V28 MVP polish blocker for organization only; full Terminal workflow polish is V29. |
| Active `orbitals` naming remains in source/UI/test carriers around Auxillaries. | medium | V28 cleanup target for active commercial surfaces. Redirect-only `/orbitals/*` compatibility can remain documented as compatibility until explicitly removed, but active UX copy, mock helpers, tests, and component names should converge on Auxillaries where touched. |
| Exchange selected activity detail must be complete enough for QAing activity-system reality. | high | V28 blocker for Exchange MVP. Master = searchable table of all activity types; detail = selected activity facts including table columns plus relevant non-column facts and payload/proof/history paths. |
| Source code must not be explicitly versioned or gate-named. | high | V28 blocker for touched source. `AGENTS.md` now records that implementation source is implicitly versioned to active canon/current gate; Terminal runtime stylesheet files/routes/classes/tests were renamed from explicit gate names to `demonstration-witness-*` / `bitcode-demonstration-witness-*`. |

Implemented after Pass 2, pending next manual QA confirmation:

| Fix | Verification state |
| --- | --- |
| Exchange master-detail now uses the table/search/filter pane as master and a named selected activity detail pane as detail. | Focused Playwright Exchange spec passes; full commercial MVP E2E suite passes. |
| Exchange selected detail keeps table facts and non-column facts visible through the identity/payload card on every focus. | Focused Playwright Exchange spec checks Activity id, lens, participant, ownership, repository, branch, proof posture, closure focus, measured BTD, BTC fee basis, and detail tabs. |
| Terminal no longer claims master-detail; it presents recent/scoped activity plus selected result. | Focused Playwright Terminal spec passes after copy/structure update. |
| Terminal adds compact operator lanes for Recent activity, Give, Need, and Closure. | Focused Playwright Terminal spec checks the lane map. |
| Terminal digest actions now change selected detail focus before scrolling, closing the visible no-op class found in QA. | Focused Playwright Terminal spec clicks `Open proof detail` and verifies `transactionDetail=proofs`. |
| `/terminal` is the canonical Terminal route and the prior generic workspace route is fully retired. | Unit and E2E route expectations now point to `/terminal`; active source scans verify the prior generic workspace route is absent rather than retained as a compatibility route. |
| Active demonstration witness stylesheet source uses unversioned names. | `uapi/app/terminal/demonstration-witness-*`, `bitcode-demonstration-witness-root`, and `bitcode-demonstration-witness-stylesheet` replace the explicit gate-named stylesheet route carriers. |
| Static overview badges are quieter than actionable chips/buttons. | Requires next manual visual confirmation. |
| Active touched Auxillaries names moved from orbitals to Auxillaries in mock-mode envs, component callbacks, and commercial tests. | Source search is clean for active renamed identifiers; no route compatibility artifact is retained for the retired generic workspace. |
| Conversations split-pane source selector tolerates missing or variant repository payloads and no longer crashes the route during commercial QA. | `commercial-mvp.conversations-docs.spec.ts` passes 3-repeat focused verification and the full commercial MVP suite. |
| Conversations streaming no longer aborts itself on ordinary rerenders, so the assistant response bubble completes in split-pane fullscreen QA. | Focused Conversations E2E passes; full commercial MVP E2E passes. |
| Direct `/conversations` fullscreen exit returns deterministically to `/terminal`. | Focused Conversations E2E passes; full commercial MVP E2E passes. |
| Bare Terminal route no longer auto-mutates its URL during load, while explicit route context and user selections still remain URL-addressable. | Public stitched navigation route spec passes 5-repeat focused verification and the full commercial MVP suite. |
| Terminal transaction search keeps the typed value stable while URL-backed filter state updates. | Focused Terminal activity-search E2E passes; full commercial MVP E2E passes. |
| Retired generic workspace route/import/runtime compatibility artifacts are absent from commercial source scans. | Source scans show no active retired route, generic workspace subtree, or retired-shell runtime names outside explicit historical spec notes and framework error patterns. |
| Protocol-demonstration client-entry, public mount globals, UAPI demonstration witness mocks, and demonstration state title use demonstration vocabulary rather than retired shell vocabulary. | Runtime/API scans show no retired shell names across active demonstration entrypoints. |
| Standalone demonstration is not a commercial runtime dependency. | `@bitcode/protocol` is the commercial dependency, UAPI source/tests no longer import `@bitcode/protocol-demonstration`, Terminal witness routes read `packages/protocol/public`, `protocol-demonstration` is outside `pnpm-workspace.yaml`, and bidirectional boundary tests are added. |
| Embedded demonstration witness no longer overwrites the commercial `/terminal` document title. | Dual-lane Playwright smoke found `/terminal` rendering with the browser title `Bitcode Demonstration`; the protocol witness bundle now skips `document.title` updates when mounted under the commercial witness host attribute, while standalone demonstration can keep its own title. |

### 2026-05-08 Pass 3A Setup: Dual Environment Lanes

| Lane | URL | Smoke result | Notes |
| --- | --- | --- | --- |
| Mock | `http://127.0.0.1:3000/terminal` | renders HTTP 200 | Deterministic mock server remains the first pass lane. Initial automated smoke exposed a mocked `/api/vcs/github/repositories` 404 while the server was warming; follow-up smoke after the witness-title boundary fix showed no internal 404s. |
| Testnet-readiness | `http://127.0.0.1:3001/terminal` | renders HTTP 200 after cold compile | Server runs with public mock flags disabled and `NEXT_PUBLIC_BITCODE_ENV=testnet`; missing live credentials/providers are expected to appear as blocked readiness, not success. |
| Both | `/terminal` browser title | pass | Follow-up smoke confirms both lanes keep the commercial `Bitcode Terminal` document title after the embedded witness title guard. |
| Both | 2026-05-08 dev-server restart for Pass 3A | pass | Mock server restarted on `3000`; testnet-readiness server restarted on `3001`; curl and Playwright smoke confirm `/terminal` HTTP 200, `Bitcode Terminal` title, no page errors, and no non-HMR internal 404s after reload. |
| Vercel deployment build | pass after fix | Latest deployment failed because the formal `@bitcode/protocol` package exported `packages/protocol/src/index.js`, but the runtime JS source files under `packages/protocol/src/**` were still ignored as generic TS build output and therefore absent from clean Vercel clones. V28 now unignores the protocol package runtime JS and package-boundary tests, verifies required runtime files are present and not ignored, and clean-repro builds pass after those files are present. |
| Mock top chrome during 1A | pass | Manual reconfirmation on 2026-05-08 accepted the fixed mock balance, notification, and profile posture. V28 now treats master mock mode as sufficient for auxillaries mock data in client and server code, explicitly exposes public mock flags through Next config, and revalidates stale module-level user data on new mount so lane transitions cannot keep anonymous/zero cached data. |
| Dual-lane dev artifact isolation | pass | Manual reconfirmation on 2026-05-08 accepted the mock/testnet-readiness separation. V28 QA servers use lane-specific `NEXT_DIST_DIR` values so public mock env compilation is isolated per lane. |
| Mock Terminal data classification | pass | Manual QA clarified that the currently visible Terminal data is mock data because the operator is in the mock lane. This evidence remains mock-lane evidence only, not testnet-readiness evidence. |
| Testnet-readiness Terminal baseline | pass | Port `3001` API returns anonymous/empty readiness rather than mock profile/repos/balances, and browser verification renders `Bitcode Terminal` with `Connect Wallet`, no mock profile strings, no mock balances, and no product console/page errors. |

### 2026-05-09 Pass 3A Resume: Wallet Extension And Provider Prerequisites

This pass resumes natural progression `1A` with both lanes already running.
Mock still establishes the expected stable prerequisite posture first.
The non-mock lane then checks the real wallet-extension path, or records precisely where the commercial MVP still exposes only staged/manual wallet identity.

| Lane | URL | Status at resume | Pass intent |
| --- | --- | --- | --- |
| Mock | `http://127.0.0.1:3000/terminal` | HTTP 200 | Reconfirm that top chrome, Auxillaries Profile, Connects, and BTD wallet posture remain deterministic after the deployment-build fix. |
| Non-mock/testnet-readiness | `http://127.0.0.1:3001/terminal` | HTTP 200 | Validate real prerequisite order: Connect Wallet, identity/auth state, wallet-extension prompt if available, GitHub connection posture, and fail-closed Terminal readiness. |

V28 distinction for this pass:

| Finding type | V28 action |
| --- | --- |
| A visible `Connect Wallet` control opens an account/access pane but does not invoke a wallet extension or clearly say wallet-extension signing is staged. | V28 MVP bug: label/copy/action mismatch must be fixed before continuing deeper QA. |
| A wallet extension prompt appears and connection succeeds, but BTC/BTD/top-chrome/Auxillaries/Profile/BTD panes do not reflect the connected address or readiness. | V28 MVP bug: connected identity and readiness state are not coherent. |
| A wallet extension prompt appears but fails because testnet provider/network/permission is absent, while the app reports the blocker clearly and remains usable. | Acceptable V28 blocked-readiness outcome; V29/V34 may deepen live wallet and deployment operations. |
| Source truth confirms wallet-provider signing is intentionally staged and only manual wallet identity is active. | V28 must make that explicit wherever `Connect Wallet` appears; actual extension integration becomes a near-term V29/V34-boundary requirement unless the user elevates it into V28. |

Manual evidence requested for this pass:

- screenshots of mock and non-mock top chrome before interaction;
- screenshots of the non-mock `Connect Wallet` result, including any extension prompt or staged-state copy;
- screenshots of Auxillaries Profile wallet identity and `$BTD` wallet posture after the attempted connection;
- console errors and network errors after each lane;
- answer whether any wallet-extension permission prompt appeared, which wallet extension/provider it was, which network/account was selected, and whether the app changed state after approval/cancel/failure.

Manual findings from 2026-05-09:

| Lane | Check | Result | V28 disposition |
| --- | --- | --- | --- |
| Mock | Top chrome | pass | Balance/nav/profile chrome is acceptable. Notification dropdown needs text wrapping and legibility polish. |
| Mock | Auxillaries Profile initial scroll | fail | Profile pane is not scrollable on first open but becomes scrollable after switching panes. V28 blocker because prerequisite settings must be reachable on first open. |
| Mock | Auxillaries save model | fail | Visible Save buttons remain in Profile, $BTD, and Interfaces. V28 must use autosave for auxillary edits and remove explicit save buttons from the contained application experience. |
| Mock | Auxillaries selector cards | fail | Cards duplicate the pane title through a top lane label plus centered title. V28 should keep the centered pane name and top-right state indicator only. |
| Mock | Auxillaries controls/layout | fail | Close and Sign Out controls should read as top-right overlay controls, not left-edge controls. The selector-side self-explainer text is unnecessary. |
| Mock | $BTD pane stats | partial | Text overflows in balance and identity cards; BTD/BTC balances need stronger visual emphasis. |
| Mock | $BTD activity | missing | The $BTD pane should include the shared Exchange/Terminal activity table filtered for the user's BTD-relevant owned packs, Exchange trades, Gives, and Needs. |
| Mock | Console | pass | Manual QA reports clean console. |
| Non-mock/testnet-readiness | Top chrome | pass | Non-mock chrome is acceptable before interaction. |
| Non-mock/testnet-readiness | Connect Wallet entry | fail | `Connect Wallet` opens the broken legacy late-orbital onboarding shell. V28 blocker: all unauthenticated auxillaries portal entry must use the new contained Auxillaries shell and honest staged/live wallet copy. |

Implemented after the 2026-05-09 findings, pending manual reconfirmation:

| Fix | Verification state |
| --- | --- |
| Notification dropdown wraps title/message text in a wider, more legible two-column layout without breaking item actions, and the redundant bottom `Open Auxillaries fullscreen` link is removed. | Notification unit test updated; production build passes; next manual top-chrome pass should judge visual fit. |
| Auxillaries contained portal, including unauthenticated `Connect Wallet`, uses the contained Auxillaries surface and suppresses the old ring-background onboarding shell. | Browser smoke on `3001` confirms `.auxillaries-bitcode-surface.orbital-system-application`, selector order `Connects`, `Interfaces`, `Profile`, `$BTD`, zero old login/account ring backgrounds, and no page/console errors. |
| Profile, Interfaces, and BTD panes autosave changes and no longer expose visible auxillary Save/Continue buttons in the contained application experience. | Unit tests cover BTD and Interfaces autosave; focused Auxillaries E2E checks no visible `$BTD` Save button. |
| Auxillaries selector cards remove duplicate top lane titles, keep state as a top-right visual indicator with accessible state metadata, and reserve enough top padding for hover lift without clipping the first card border. | Focused Auxillaries E2E still passes route-card and pane-tab navigation; selector hover padding is source-fixed for next manual confirmation. |
| Overlay controls are aligned as top-right close/sign-out controls and the selector-side self-explainer copy is removed. | Production build passes; next manual Auxillaries pass should judge spacing. |
| First-open Profile scrolling is stabilized by forcing the contained Auxillaries surface out of global `content-visibility:auto` intrinsic sizing. | Non-mock browser smoke scrolls the Profile pane on first portal open; next mock manual pass should confirm the originally reported first-render case. |
| BTD/BTC statistics use a hierarchy matching the QA direction: large BTD balance row, sub-stat row for owned AssetPacks and BTC in wallet, then compact identity/policy cards. | Typecheck, focused unit tests, focused Auxillaries E2E, and production build pass; next manual BTD pane pass should judge vibrancy/legibility. |
| Auxillaries stat-card explanatory prose is no longer adjacent to user values; each explanation is carried by tooltip/accessible label on the value card. | BTD pane tests updated to query tooltip/aria descriptions rather than visible prose. |
| BTD pane includes the shared Exchange activity table for BTD-relevant activity and keeps connected-repository consent tests scoped to their own table. | Focused Auxillaries E2E passes all 10 tests. |
| Non-mock prerequisite posture is narrowed to MetaMask wallet authentication and GitHub repository connection for V28. | Browser smoke on `3001` confirms Profile contains MetaMask and GitHub, does not expose Google as a prerequisite, and keeps the same contained Auxillaries shell/order as mock. |

### 2026-05-08 Pass 3A: Auxillaries Profile And Connects Readiness

| Check | Result | Notes |
| --- | --- | --- |
| Auxillaries overlay opens and pane selection works | pass | Manual QA confirmed the overlay opens and panes remain selectable. |
| Inner pane scrolling | fixed | Manual QA found the contained pane could not scroll down. V28 now constrains the overlay shell height, keeps the pane as the scroll container, and verifies the active pane can advance `scrollTop` with `overflowY:auto`. |
| Selector card state rendering | fixed | Manual QA found raw `laneactive` / `laneready` text. V28 replaces visible state prose with active/ready/locked visual indicators and keeps state available through `aria-label`, `title`, and `data-state` for accessibility and tests. |
| Mock profile fields | fixed | Manual QA confirmed email but found display name and bio missing. V28 now hydrates async initial profile props into local editable state and mock data supplies display name, bio, and company posture. |
| Connected repositories | pass | Manual QA confirmed mocked connected repos; browser verification confirms `Connected Repositories (3)` and `bitcode/economic-ledger` render in Connects. |
| BTD/BTC first-load posture | fixed | Manual QA found the top-right widget flashing anonymous zero-state before hydrated values. V28 now surfaces a compact `Reading wallet` posture while fresh lane-specific user data is loading or revalidating stale cached zero-state. |
| Fullscreen overlay viewport fit | fixed | Manual QA found a bottom gap approximately the height of the navigation/chrome after opening Auxillaries fullscreen from Terminal. V28 now lets the overlay shell fill the available viewport height and anchors the shell to the bottom edge while keeping overlay overflow hidden. |
| Profile scroll quality | fixed | Manual QA found Profile auxillary scrolling technically worked but felt poor. V28 now constrains the right pane as a true `height:100%` scroll container, prevents selector/pane grid-row overflow, and tightens Profile vertical rhythm so lower wallet/access/provider controls stay reachable in the contained pane. |
| Auxillaries menu icon | fixed | Manual QA found the account-menu Auxillaries entry had lost the more elegant animated solar-system cue from the late-Engi era. V28 restores the visual language as an Auxillaries-named animated solar icon without reverting product copy or route naming to Orbitals. |
| Console/page errors | pass | Manual QA reported none; focused browser verification reports no product console messages and no page errors. |

Automated verification for this slice:

- `pnpm -C uapi exec jest --runInBand tests/useUserDataHydration.test.tsx tests/btdTrackerLoading.test.tsx tests/auxillariesWorkspacePanels.test.tsx tests/featureFlagsMockMode.test.ts`: pass.
- `pnpm -C uapi exec playwright test tests/e2e/commercial-mvp.auxillaries.spec.ts --project=laptop --workers=1`: 10 passed, including the Terminal fullscreen Auxillaries viewport/scroll assertion and contained portal-entry regression.
- Focused browser verification on the mock lane: raw lane text count `0`, state indicator count `4`, Profile display name `Avery Mercer`, Profile bio `Reviewing the Bitcode commercial surface in deterministic mock mode.`, shell bottom gap `0`, pane bottom overflow `0`, pane `scrollTop` advances, explicit auxillary Save buttons are removed in favor of autosave, Connects repos present, no product console/page errors.

Deferred to V31 from this pass:

| Finding | V31 disposition |
| --- | --- |
| Auxillaries pane hierarchy, spacing, border polish, readiness recovery, and account/provider diagnostics can deepen beyond the V28 MVP shell. | V31 owns full Auxillaries deepening after V28 proves the contained shell, pane selectability, mocked prerequisites, and fail-closed readiness posture. |

Ignored during this setup smoke: Google Analytics network aborts in headless Playwright.
They are external telemetry noise, not product readiness evidence.

Automated verification after this implementation pass:

- `pnpm -C uapi exec tsc --noEmit --pretty false`: pass after the May 9 Auxillaries/Profile/BTD/notification refinements.
- `pnpm -C uapi exec jest --runInBand tests/orbitalsBTDPane.test.tsx tests/notificationsWidget.test.tsx tests/orbitalsInterfacesPane.test.tsx`: 9 passed after the BTD hierarchy, tooltip, notification-footer, and autosave assertions.
- `START_STORYBOOK=false pnpm -C uapi exec playwright test tests/e2e/commercial-mvp.auxillaries.spec.ts --project=laptop --workers=1`: 10 passed after contained shell and pane-state refinements.
- `pnpm -C uapi run build`: pass after the May 9 QA fixes; the prior clean-clone Vercel module-resolution failure remains fixed locally.
- Playwright non-mock browser smoke after the May 9 patch: `Connect Wallet` opens the contained Auxillaries shell, selector order is `Connects`, `Interfaces`, `Profile`, `$BTD`, old-ring count is `0`, Google prerequisite copy is absent, MetaMask and GitHub are present, no visible Save/Continue buttons remain, Profile first-open scroll advances, and no console/page errors occur.
- `pnpm -C uapi exec tsc --noEmit --pretty false`: pass after the formal protocol package split.
- `pnpm -C uapi run test:e2e:commercial-mvp`: 50 passed after Conversations streaming, Conversations exit, and Terminal transaction-search stabilization.
- `npm --prefix protocol-demonstration run test:integration`: 58 passed after standalone demonstration/package-boundary cleanup.
- `npm --prefix protocol-demonstration run test:v27-crypto`: 9 passed after standalone demonstration/package-boundary cleanup.
- `npm --prefix protocol-demonstration run test:v28-commercial-mvp-qa`: 8 passed after adding the boundary-separation checks.
- `pnpm -C uapi exec jest --runInBand tests/demonstrationWitnessMount.test.tsx tests/demonstrationWitnessScopedStylesRoute.test.ts tests/terminalPreservedShellSurface.test.tsx tests/terminalShellBridge.test.tsx tests/marketingLandingPage.test.tsx tests/api/needReviewProtocolParity.test.ts tests/api/bitcodeAppContextOptions.test.ts tests/protocolCommercialBoundary.test.ts`: 18 passed after the formal protocol package split.
- `node --test --test-force-exit protocol-demonstration/test/v28-boundary-separation.test.js`: 2 passed after the formal package split.
- `pnpm -C packages/protocol test`: 2 passed after the formal package split and protocol runtime-source deployment fix.
- `pnpm -C packages/protocol run typecheck`: pass after adding the formal package typecheck config.
- `pnpm -C uapi exec jest --runInBand tests/protocolCommercialBoundary.test.ts`: 5 passed after adding the formal protocol deployment-source boundary check.
- `pnpm -C uapi exec jest --runInBand tests/useUserDataHydration.test.tsx tests/featureFlagsMockMode.test.ts tests/protocolCommercialBoundary.test.ts`: 11 passed after the mock top-chrome cache/flag fix, JavaScript companion parity check, and protocol package resolver check.
- Playwright dual-lane browser verification after lane-specific `NEXT_DIST_DIR` restart: mock lane shows `0.042 BTC`, `1,200 BTD`, mock review state, reviewer profile, and populated notifications; testnet-readiness lane shows no mock balances, no mock review state, and the Connect Wallet prerequisite controls; both lanes have no product console/page errors.

Deferred to V29 from this pass:

| Finding | V29 disposition |
| --- | --- |
| Terminal prose clarity can improve while maintaining technical accuracy. | V29 Terminal-focused version should rewrite and refine Terminal copy, explainers, labels, and read/write guidance as part of deeper Terminal workflows. |
| Terminal transaction sequencing, dense workflow hierarchy, and deeper Give/Need/Fit/settlement ergonomics need a dedicated version. | V29 owns full Terminal workflow deepening after V28 fixes MVP architecture and obvious clickability/organization problems. |

## Current QA Queue

1. Natural progression 1A in Mock lane, then Testnet-readiness lane.
2. Natural progression 1B in Mock lane, then Testnet-readiness lane.
3. Natural progression 1C in Mock lane, then Testnet-readiness lane.
4. Docs sequence 00-04 in Mock lane, then Testnet-readiness lane where the route depends on live/provider state.

## Environment Lane Commands

Mock lane dev server:

```sh
NEXT_PUBLIC_MASTER_MOCK_MODE=true \
NEXT_DIST_DIR=.next-v28-mock \
NEXT_PUBLIC_ENABLE_MOCKS=true \
NEXT_PUBLIC_MOCK_USER_AUXILLARIES=true \
NEXT_PUBLIC_MOCK_USER_AUXILLARIES_SCENARIO=demo \
NEXT_PUBLIC_MOCK_SCENARIO=demo \
NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS=true \
NEXT_PUBLIC_MOCK_GITHUB_REPOS=true \
NEXT_PUBLIC_MOCK_GITHUB_BRANCHES=true \
NEXT_PUBLIC_MOCK_GITHUB_COMMITS=true \
NEXT_PUBLIC_MOCK_CHAT_STREAM=true \
NEXT_PUBLIC_MOCK_CHAT_SCENARIO=demo \
pnpm -C uapi dev:remote
```

Testnet-readiness lane dev server:

```sh
NEXT_PUBLIC_BITCODE_ENV=testnet \
NEXT_DIST_DIR=.next-v28-testnet \
NEXT_PUBLIC_MASTER_MOCK_MODE=false \
NEXT_PUBLIC_ENABLE_MOCKS=false \
NEXT_PUBLIC_MOCK_USER_AUXILLARIES=false \
NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS=false \
NEXT_PUBLIC_MOCK_GITHUB_REPOS=false \
NEXT_PUBLIC_MOCK_GITHUB_BRANCHES=false \
NEXT_PUBLIC_MOCK_GITHUB_COMMITS=false \
NEXT_PUBLIC_MOCK_CHAT_STREAM=false \
NEXT_PUBLIC_DISABLE_EXCHANGE_LINK=false \
NEXT_PUBLIC_DISABLE_AUXILLARIES=false \
NEXT_PUBLIC_DISABLE_CREATE_ACCOUNT=false \
pnpm -C uapi exec next dev --hostname 127.0.0.1 -p 3001
```

When the testnet-readiness lane lacks wallet, GitHub, Supabase, signer, BTC broadcaster, or ledger observer credentials, the expected V28 behavior is explicit blocked readiness.
It is not acceptable for that lane to silently show a mocked success state.

## Issue Template

```md
### Title

### Surface
Identity/Auth / Terminal / Exchange / Auxillaries / BTD / Conversations / Docs/API / Deployment

### Environment Lane
Mock / Testnet-readiness

### Expected V28 MVP Behavior

### Actual Behavior

### Evidence
- URL:
- Screenshot:
- Console/network:
- Route/query state:

### V28 vs Later-Version Disposition
V28 blocker / V28 polish / V29+ deferred

### Notes
```
