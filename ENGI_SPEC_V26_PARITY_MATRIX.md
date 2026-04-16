# ENGI Spec V26 Parity Matrix

## Status

- Scope: V26 draft parity ledger for Bitcode productionizing hardening, first-gate application migration, second-gate application-facing refit, interface hardening, and package-first repository refurbishment
- Current canonical/latest target: `V25`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; V26 preview artifacts remain `.engi/v26-spec-family-report.json`, `.engi/v26-canonical-input-report.json`, and `ENGI_SPEC_V26_PROVEN.md`
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- Source parity state: V26 first-gate source closure is now materially implemented while second-gate application-facing refit and later hardening remain open
- V26 state: active draft family opened; parity truth remains draft-target-only until promotion

## Purpose

This file records the current parity gap between:
- active V25 canon and current source truth,
- landed first-gate V26 source changes,
- the still-open second-gate V26 target,
- and the intended longer-term package-first ownership model.

## Audit basis

This ledger is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/src/canon-posture.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/public/styles.css`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/server.js`
- `/Users/garrettmaring/Developer/ENGI/packages/bitcode/test/*`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/application/page.tsx`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/application/ApplicationPageClient.tsx`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/application/first-gate-styles/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/state/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/deposits/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/make-bitcode-branch/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/make-engi-branch/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/reset/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/bitcoin-demonstration-service/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/orbitals/data/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/v24/external-realization/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/api/v24/executors/[interfaceId]/route.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/lib/bitcode-app-context.ts`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/(root)/components/MarketingLandingPage.tsx`
- `/Users/garrettmaring/Developer/ENGI/uapi/components/base/README.md`
- `/Users/garrettmaring/Developer/ENGI/packages/github/README.md`

## V26 implementation matrix

| Area | Current source truth | V26 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Canonical file family presence | `ENGI_SPEC_V26.md`, `_DELTA`, `_PARITY_MATRIX`, `_NOTES`, and preview `_PROVEN_` exist while `ENGI_SPEC.txt` still points to `V25` | V26 requires an opened draft family without overclaiming promotion | V26 file family exists and explicitly keeps V25 active | implemented |
| Active-canon discipline | source pointer and spec automation still treat `V25` as active | V26 must preserve V25 as active truth until promotion | pointer remains `V25`; V26 artifacts remain draft/preview | implemented |
| First-gate route ownership | `/application` is now the app-owned Bitcode carrier | V26 first-gate requires an application-native full-page route | `uapi/app/application/*` exists and marketing routes into it | implemented |
| Embedded marketing demo removal | homepage no longer embeds the demo or treats it as standalone-primary | V26 must remove the embedded-homepage posture | homepage no longer depends on `MarketingEmbeddedDemoSection` or localhost demo CTA posture | implemented |
| `engi-demo/` removal | the top-level `engi-demo/` directory is gone | V26 first-gate requires removing the standalone directory owner | no `engi-demo/` source directory remains in the tree | implemented |
| First-gate package ownership | former demo runtime/shell/test surfaces now live in `packages/bitcode` | V26 first-gate requires package-backed ownership before deeper refit | `packages/bitcode/{src,public,test,server.js}` now carries the preserved shell/runtime contract | implemented |
| First-gate shell preservation | `/application` now renders the preserved deterministic shell markup and mounts the preserved shell behavior from `packages/bitcode/public/app.js` | V26 first-gate must keep UX/content/interaction/state contract effectively intact while ownership moves | `uapi/app/application/ApplicationPageClient.tsx` hosts the preserved shell contract and package JS boot path | implemented |
| Second-gate application experience | the preserved shell still uses the carried-forward shell DOM/CSS/JS contract | V26 second-gate must replace preserved shell implementation with more native application-facing composition | sections migrate onto `uapi/components/base/*` and route-local React composition without changing Bitcode semantics | drafted |
| App-owned JSON contract | `/api/state`, `/api/deposits`, `/api/make-bitcode-branch`, `/api/make-engi-branch`, `/api/reset`, `/api/bitcoin-demonstration-service`, `/api/orbitals/data`, and V24 routes now resolve through `uapi/app/api/*` | V26 first-gate must remove standalone HTTP ownership | preserved shell APIs are now served by app-owned Next routes | implemented |
| Shared runtime bridge | `uapi/lib/bitcode-app-context.ts` now bridges app route handlers into the package-owned context | V26 requires app/runtime composition to be explicit and centralized | app-owned routes share one package-owned context bridge | implemented |
| Execution route ownership | `/executions` and `/executions/[runId]` remain app-owned routes | V26 requires operator workspace and run-detail routes to be application-owned | active app-route files exist for execution workspace and run-detail surfaces | substantially advanced |
| Orbital route ownership | `/orbitals/*` routes remain app-owned and settings-oriented | V26 requires orbital deep links to be application-owned settings surfaces | active app-route files exist and default to account/login-first posture | substantially advanced |
| Orbital settings rehabilitation | ringed orbital overlay is preserved while signed-in usage behaves like settings navigation | V26 requires orbital to become the actual settings owner without discarding the overlay shell | ring-shell preserved; save actions and settings posture restored | substantially advanced |
| Bitcode rename follow-on cleanup in touched surfaces | touched settings/auth/application surfaces continue to drop lingering ENGI-facing wording | V26 must keep tightening Bitcode-facing naming as rehabilitation continues | active touched user-facing surfaces no longer leak obvious ENGI naming except compatibility carriers | substantially advanced |
| Package splitting beyond first-gate | `packages/bitcode` is currently the consolidated first-gate owner | V26 later expects more deliberate subsystem package boundaries where useful | longer-term package seams are explicit and justified rather than trapped in one reservoir | drafted |
| Existing package convergence | `packages/github`, `packages/auth`, and `packages/api` still exist as future convergence owners | V26 should reuse existing package owners where that fit is real | GitHub/auth/API responsibility is pulled farther out of the first-gate Bitcode package over time | drafted |
| Auth account management | connected account management and unlinking now live in app-owned settings surfaces and routes | V26 requires account-provider management to be app-owned rather than demo-local or client-only | supported provider connect/disconnect flows live in orbitals and app auth routes | substantially advanced |
| Wallet productionization | wallet remains staged rather than overclaimed | V26 requires a production-ready connecting-wallet posture | wallet verification and action binding become explicit and tested | drafted |
| External-interface hardening | V23/V24 external-realization logic now lives under `packages/bitcode` first-gate ownership and app-owned route carriage | V26 must keep and strengthen fail-closed guarantees under the new ownership model | live-interface hardening remains intact while package/app owners replace standalone-demo owners | substantially advanced |
| Telemetry and reconciliation hardening | first-gate preserves those carriers; deeper hardening remains open | V26 must preserve and strengthen telemetry/reconciliation under package/app ownership | telemetry and reconciliation remain exhaustive after later refit and splitting | drafted |
| Organizational refurbishment | the repo is now materially closer to package-first architecture because the standalone directory owner is gone | V26 requires repo ownership to realign to the fuller architecture it advertises | primary Bitcode ownership sits in packages and app routes instead of a top-level demo directory | substantially advanced |
| Documentation parity | V26 draft docs are being updated to reflect first-gate file structure and second-gate remainder | V26 docs must stop describing the current source as if `engi-demo/` still owned it | V26 docs show `packages/bitcode`, `uapi/app/application`, and app-owned API routes explicitly | substantially advanced |
| Generated evidence posture | V26 preview `_PROVEN_` exists; active generated proof remains V25 | V26 must eventually define promoted generated evidence aligned to the first-gate and second-gate source | V26 `_PROVEN_` and `.engi/v26-*` remain preview/draft until promotion | substantially advanced |

## Current first-gate file structure

| Owner | Current file structure | Role |
| --- | --- | --- |
| `packages/bitcode` | `src/*`, `public/*`, `server.js`, `test/*` | preserved first-gate runtime, shell, styling, proof, and validation owner |
| `uapi/app/application` | `page.tsx`, `layout.tsx`, `ApplicationPageClient.tsx`, `first-gate-styles/route.ts` | first-class Bitcode application route carrier |
| `uapi/app/api` | `state`, `deposits`, `make-bitcode-branch`, `make-engi-branch`, `reset`, `bitcoin-demonstration-service`, `orbitals/data`, `v24/external-realization`, `v24/executors/[interfaceId]` | app-owned JSON contract for the preserved first-gate shell and preserved settings aggregation |
| `uapi/lib` | `bitcode-app-context.ts` | shared bridge into the package-owned Bitcode context |

## V26 checklist

| Area | Required V26 result | Current judgment |
| --- | --- | --- |
| File family | V26 main, delta, parity, notes, and preview proven files exist | implemented |
| First-gate route migration | Bitcode runs as an app-native full-page route | implemented |
| First-gate package migration | former standalone directory ownership is gone and replaced by package/app owners | implemented |
| First-gate API migration | preserved shell JSON contract is app-owned | implemented |
| Second-gate application experience | preserved shell is replaced with deeper app-facing component composition | drafted |
| Orbital settings rehabilitation | orbitals behave like the real settings owner while preserving the ring overlay shell | substantially advanced |
| Wallet/auth hardening | production wallet connection and auth posture are explicit | substantially advanced |
| External hardening | GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation are hardened under the new ownership model | drafted |
| Documentation refresh | active V26 docs show the new file structure precisely | substantially advanced |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| V26 does not promote itself while V25 remains active | current canonical truth must remain singular | Reopen only when V26 promotion is deliberate |
| First-gate preserves the Bitcode operator UX chain | first-gate is an ownership migration gate, not a semantic rewrite gate | Reopen only if source proves exact preservation impossible |
| Second-gate remains separate from first-gate | deeper application experience work should not destabilize the preserved migration carrier prematurely | Reopen only if second-gate work becomes necessary for first-gate correctness |
| `_legacy/` remains non-canonical | legacy code is not active truth | Reopen only for explicit forward-port migration work |

## Completion condition

This parity file is complete for the current V26 pass only when:
1. V25-active discipline is explicit,
2. first-gate file structure is explicit,
3. first-gate implementation status is explicit,
4. second-gate remaining work is explicit,
5. auth/wallet and interface-hardening remainder is explicit,
6. organizational refurbishment is represented as first-class work,
7. and the difference between draft-target-only work and landed first-gate source truth is explicit.
