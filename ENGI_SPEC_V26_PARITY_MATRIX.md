# ENGI Spec V26 Parity Matrix

## Status

- Scope: V26 draft parity ledger for Bitcode productionizing hardening, demonstration-to-application integration, application-facing UI replacement, interface hardening, and package-first repository refurbishment
- Current canonical/latest target: `V25`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; V26 generated artifact families are not opened yet
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Source parity state: V26 is not yet implemented; this ledger records the draft target against the current V25-era source split
- V26 state: active draft family opened; parity truth is draft-target-only until V26 implementation lands

## Purpose

This file records the current parity gap between:
- active V25 canon and source truth,
- the opened V26 productionizing target,
- the intended Bitcode application-surface ownership model,
- and the intended package-first repository ownership model.

## Audit basis

This draft ledger is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/server.js`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/page.tsx`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/(root)/components/MarketingLandingPage.tsx`
- `/Users/garrettmaring/Developer/ENGI/uapi/app/(root)/components/MarketingEmbeddedDemoSection.tsx`
- `/Users/garrettmaring/Developer/ENGI/uapi/components/base/README.md`
- `/Users/garrettmaring/Developer/ENGI/packages/github/README.md`

## V26 draft implementation matrix

| Area | Current source truth | V26 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Canonical file family presence | `ENGI_SPEC_V26.md`, `_DELTA`, `_PARITY_MATRIX`, and `_NOTES` now exist while `ENGI_SPEC.txt` still points to `V25` | V26 requires an opened draft family without overclaiming promotion | V26 file family exists and explicitly keeps V25 active | implemented |
| Version center | V25 is rename-complete canon; V26 is now opened around productionizing hardening | V26 must be explicit that it centers integration, hardening, UI replacement, and organizational refurbishment | V26 main spec and companions define that center directly | implemented |
| Active-canon discipline | current source and pointer still treat `V25` as active | V26 must preserve V25 as active truth until promotion | pointer remains `V25` and V26 does not overclaim runtime truth | implemented |
| Demonstration-to-application integration | current source now routes from marketing into `/application`, and Bitcode has an application-owned entry page rather than an embedded homepage demo | V26 requires a first-class application page for the Bitcode operator experience | app-native route exists and homepage no longer depends on an embedded or standalone demo | partially implemented |
| Embedded marketing demo removal | current marketing no longer includes `MarketingEmbeddedDemoSection` or standalone-primary launch CTAs | V26 removes embedded-demo dependency from the target posture | homepage no longer contains the embedded-demo section or standalone-primary CTA posture | implemented |
| Execution route ownership | current source now has non-legacy `/executions` and `/executions/[runId]` pages backed by active app-route files rather than only component surfaces | V26 requires operator workspace and run-detail routes to be application-owned | active app-route files exist for execution workspace and run-detail surfaces | partially implemented |
| Application-facing UI replacement | current Bitcode operator UI is still owned by `engi-demo/public/index.html` and `engi-demo/public/app.js` | V26 preserves operator UX but replaces demo-owned UI with application-facing components | full-page Bitcode surface is composed from `uapi/app/*` and `uapi/components/base/*` | draft-target |
| Component-library convergence | current app already defines canonical base-component ownership under `uapi/components/base/*` | V26 must use the canonical component libraries as the long-term owner of the Bitcode operator surface | recovered and new shared components live in the canonical base libraries | draft-target |
| Legacy component intake discipline | `_legacy/` exists but remains non-canonical | V26 may recover legacy components only by normalizing them into current component ownership patterns | no live application surface depends directly on `_legacy/` paths | draft-target |
| Package-first Bitcode system ownership | current Bitcode system logic remains concentrated in `engi-demo/src/*` and especially `src/engi-demo.js` | V26 must move Bitcode system implementations into package-owned surfaces | package-owned Bitcode domain layers replace demo-local primary ownership | draft-target |
| Package extraction matrix | V26 main spec now defines an explicit extraction matrix from `engi-demo` to package/app owners | V26 must keep extraction ownership explicit rather than opportunistic | extraction matrix stays current and implementation follows it | implemented as draft target |
| GitHub convergence | current repo already has `packages/github`, while demo-local V24 code still carries major GitHub live-interface responsibility | V26 must converge GitHub production behavior onto `packages/github` and related API/app owners | demo-local GitHub ownership is reduced to fixtures or removed; package/API ownership is primary | draft-target |
| API/runtime re-homing | current standalone demo server still owns major Bitcode route composition | V26 must re-home Bitcode API composition into `packages/api` and application-owned route surfaces | standalone demo server is no longer the primary owner of Bitcode route behavior | draft-target |
| Auth and wallet productionization | current repo has MetaMask and auth groundwork but not full production-hardening closure | V26 must refine auth and connecting-wallet posture to production readiness | wallet verification and production auth flow are explicit, tested, and app-native | draft-target |
| External-interface hardening | current repo already has V23/V24 live-interface modeling and fail-closed tests concentrated in demo-local code | V26 must keep and strengthen those guarantees under package/app ownership | live-interface hardening surfaces exist outside demo-local concentration and still fail closed | draft-target |
| Telemetry and reconciliation hardening | current repo already models telemetry and reconciliation under demo-local V24 surfaces | V26 must preserve and strengthen telemetry/reconciliation under package/app ownership | telemetry and reconciliation remain exhaustive after ownership migration | draft-target |
| Marketing refurbishment | current marketing still speaks in embedded-demo and demonstration-video terms | V26 requires marketing copy/layout that routes toward the full-page application posture | homepage/referral surfaces route users into the application rather than embedding it | draft-target |
| Organizational refurbishment | current repo still diverges from the fuller package-first architecture it advertises | V26 must realign the repository to the older fuller architectural pattern | primary Bitcode ownership sits in packages and app routes rather than demo-local concentration | draft-target |
| Documentation parity | current demo docs and host-capability docs still contain stale V15/V24-era language | V26 must refresh docs to match the new ownership model and active draft center | README, host/runtime docs, and route docs stop describing obsolete demo posture | draft-target |
| Generated evidence posture | active generated proof appendix remains V25 and no V26 generated family exists yet | V26 must eventually define its own generated evidence and proof appendix when implementation matures | V26 `_PROVEN_` and generated artifact families exist only after closure work lands | not started |

## V26 draft implementation checklist

| Area | Required V26 result | Current judgment |
| --- | --- | --- |
| File family | V26 main, delta, parity, and notes files exist | implemented |
| Version center | V26 explicitly centers productionizing hardening | closed |
| Active-canon discipline | V25 remains active throughout V26 drafting | implemented |
| Demo-to-app rule | Bitcode becomes a first-class application page | draft-target |
| Embedded-demo removal | homepage no longer depends on an embedded demo | draft-target |
| UI replacement rule | demonstration UX is preserved while demonstration UI is replaced | closed as draft rule |
| Package extraction | Bitcode system implementations move into `packages/` ownership | draft-target |
| Existing package convergence | GitHub, auth, and API ownership converge onto existing packages where appropriate | draft-target |
| Wallet/auth hardening | production wallet connection and auth posture are explicit | draft-target |
| External hardening | GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation are hardened under new ownership | draft-target |
| Organizational refurbishment | repo ownership realigns to the fuller architecture instead of micro-app integration | draft-target |
| Documentation refresh | stale demo/host posture docs are updated | draft-target |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| V26 does not promote itself while V25 remains active | current canonical truth must remain singular | Reopen only when V26 promotion is deliberate |
| V26 preserves the Bitcode operator UX chain while replacing the UI implementation | the UX already encodes useful operator truth; the implementation ownership is the problem | Reopen only if a later draft intentionally changes operator ordering |
| `_legacy/` remains migration input only | legacy code is not active truth | Reopen only for explicit forward-port migration work |
| Existing package owners should be reused where they already fit | V26 should reduce architectural drift, not proliferate redundant packages | Reopen only when current package ownership is demonstrably unsuitable |

## Completion condition

This parity file is complete for the V26 draft-opening pass only when:
1. V25-active discipline is explicit,
2. V26’s four workstreams are represented,
3. the demo-to-application rule is represented,
4. the UI-replacement rule is represented,
5. package extraction and existing-package convergence are represented,
6. auth/wallet and external-interface hardening are represented,
7. organizational refurbishment is represented as a first-class workstream,
8. and the difference between implemented draft scaffolding and not-yet-implemented source closure is explicit.
