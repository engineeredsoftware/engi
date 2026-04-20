# ENGI Spec V22 Parity Matrix

## Status

- Scope: V22 canonical parity ledger for runtime/operator drift-detection hardening
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v22-spec-family-report.json`, `.engi/v22-canonical-input-report.json`, and `.engi/v22-canon-posture-drift-report.json`; `ENGI_SPEC_V22_PROVEN.md` is the active generated proof appendix for V22
- Current canonical/latest target: `V22`
- Canonical proof-source commit: `5c3410df386022bb3f7c9c102c60724be46fe1c1`
- Last fully realized canonical target preserved in source: `V22`
- Source parity state: V22 source-side runtime/demo canon-posture drift detection, generated drift artifacts, promotion-time runtime preparation, and inherited proof/operator closure are canonicalized; parity truth is aligned with the promoted V22 file family
- V22 state: canonical promotion complete; parity truth, runtime posture truth, and generated canon are aligned for V22
- Primary implementation surfaces to audit for this pass: `engi-demo/src/engi-demo.js`, `engi-demo/src/demo-shell-state.js`, `engi-demo/server.js`, `engi-demo/public/index.html`, `engi-demo/public/app.js`, `engi-demo/README.md`, current test stack, and current V19/V20/V21 generated artifacts

## Purpose

This file records the early V22 parity ledger between:
- promoted V21 system/specifying canon,
- the current ENGI runtime and demo shell,
- the current demo-local documentation posture,
- the current proof/operator closure baseline,
- and the next implementation-derivable work that V22 should execute.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/demo-shell-state.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/server.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/index.html`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/README.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/e2e.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v20-quality.js`

---

## V22 implementation matrix

| Area | Current source truth | V22 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Active canon posture in runtime | `engi-demo/src/canon-posture.js` now defines active-canon and draft-target runtime posture, and `engi-demo/src/engi-demo.js` plus `engi-demo/src/demo-shell-state.js` derive from it | V22 requires one executable posture source instead of scattered literals | runtime-owned canon posture surface exists and `publicState().specVersion` derives from it | implemented |
| Policy/version reference posture | policy/version reference truth now derives from the same runtime posture source instead of a stale V19/V20 literal | V22 requires policy/version posture to align with runtime posture | policy/version reference is derived from the same runtime canon posture source | implemented |
| Browser title and hero posture | `engi-demo/public/index.html` and `engi-demo/public/app.js` now render generic shell scaffolding plus runtime-owned canon posture | V22 requires browser shell copy to reflect current canon truth | browser title, hero copy, and summary/status messaging reflect the runtime-owned canon posture | implemented |
| API posture | `/api/state` now exposes current `specVersion` and `canonPosture` from the same seeded runtime source | V22 requires API posture to reflect current canon truth | API tests assert current runtime posture from one canonical source | implemented |
| Test posture | `canon-posture`, `core`, `api`, and `e2e` tests now derive/assert current canon posture rather than stale V19/V20 strings | V22 requires tests to fail on canon-truth drift | tests derive/assert the new canon posture surface | implemented |
| Demo README posture | `engi-demo/README.md` now describes the demo as V21 active canon / V22 system draft | V22 requires demo-local docs to reflect current ENGI truth | README is aligned with active canon and current demo/runtime capabilities | implemented |
| Operator explainer vocabulary | `engi-demo/public/app.js` no longer presents visible V15 posture language and no longer carries legacy `V15 §...` explainer anchors in source | V22 should remove stale operator pedagogy language that contradicts active canon | visible explainer prose uses current ENGI/current canon language and current-canon footer chips are sourced from current topical canon references | implemented |
| Runtime/system richness | Current runtime already materializes deposit -> need -> fit -> verification -> branch -> proof -> settlement -> projection | V22 should preserve current system richness rather than redesigning it in the first pass | V22 first gate accepts the current runtime/system richness as baseline and confines change to canon-truth drift closure rather than subsystem reinvention | accepted boundary |
| Operator shell surface breadth | `public/app.js` already renders broad branch/proof/settlement/policy artifacts and operating surfaces | V22 should build on this shell rather than replace it | V22 first gate accepts the current operator shell breadth as baseline while posture and grouping are hardened for current-canon truth | accepted boundary |
| Canon-truth coupling to promotion | runtime/demo posture now couples to the active pointer through `engi-demo/src/canon-posture.js`, `scripts/check-engi-canon-posture-drift.mjs`, `.engi/v22-canon-posture-drift-report.json`, and `scripts/prepare-engi-runtime-canon-promotion.mjs` | V22 must make runtime/demo drift fail closed through executable validation and promotion-time preparation | pre-promotion drift check, promotion-time runtime preparation, generated drift artifact, and post-promotion drift check are all implemented in source | implemented |
| V20 deferred projection matrix | Active canon still records `full-source-projection-security-matrix-deferred` as an accepted boundary | V22 first gate must explicitly defer or close this boundary | V22 first gate explicitly defers projection-matrix expansion beyond current representative smoke | accepted boundary |
| V20 deferred mutation cross-product | Active canon still records `full-mutation-cross-product-deferred` as an accepted boundary | V22 first gate must explicitly defer or close this boundary | V22 first gate explicitly defers mutation-cross-product expansion beyond current representative mutation coverage | accepted boundary |
| V20 deferred screenshot stability | Active canon still records `screenshot-stability-deferred` as an accepted boundary | V22 first gate must explicitly defer or close this boundary | V22 first gate explicitly defers screenshot-backed visual closure beyond current deterministic DOM/geometry signatures | accepted boundary |
| V21 specifying inheritance | V21 now provides strong full-canon/spec-family rules and should not be reopened without cause | V22 must inherit V21 specifying as baseline, not re-center on metaspecing | V22 implementation centers on system work; specifying changes only if blocked by concrete contradiction | accepted boundary |
| Historical validation surfaces | `V20_PROPER` exists as a non-canonical full-canon reconstruction and active `V21` canon exists | V22 should continue using both surfaces where V21-era specifying validation remains relevant | V22 drafts and later promotion checks still keep both surfaces available where needed | accepted boundary |

---

## V22 implementation checklist

| Area | Required V22 result | Current judgment |
|---|---|---|
| V22 version center | V22 is explicitly system-facing rather than specifying-facing | closed |
| Runtime canon posture | one executable source of truth defines active canon posture for runtime/demo use | implemented |
| API/browser/test alignment | API state, browser copy, and tests all derive from that same canon posture | implemented |
| Demo doc alignment | README and demo-local narrative reflect current canon and current implementation | implemented |
| Promotion/runtime drift guard | future canonical promotions cannot leave runtime/demo posture behind silently | implemented |
| Operator pedagogy truth-alignment | visible explainer prose and current-canon footer chips stop narrating stale V15 posture | implemented |
| First-pass system preservation | V22 preserves current deposit/need/fit/proof/settlement/projection semantics while fixing truth drift | closed |
| Drift-detection artifact family | V22 emits and validates a version-local canon-posture drift report in addition to inherited specifying artifacts | implemented |
| Runtime promotion preparation | V22 promotion rewrites runtime/demo posture before post-promotion validation | implemented |
| Second-pass proof/operator decision | V22 explicitly defers the inherited V20 projection/mutation/screenshot boundaries beyond this version's first gate | closed |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
|---|---|---|
| No V22 metaspec recentering | V21 already completed first-gate specifying work; V22 should spend its first pass on ENGI itself | Reopen only if current implementation exposes a concrete blocker in `ENGI_SPECIFYING.md` or V21 spec structure |
| No first-pass subsystem redesign | current runtime and shell already carry the whole ENGI chain; the more urgent defect is canon-truth drift | Reopen if runtime truth-alignment work exposes a deeper structural subsystem contradiction |
| V20 deferred boundaries remain deferred beyond V22 first gate | projection matrix, mutation cross-products, and screenshot stability stay explicit accepted boundaries after V22 drift closure | Reopen when a later version chooses second-pass proof/operator work |

## completion condition

This parity file is first-gate complete for V22 only when:
1. every canon-posture row is implemented or explicitly accepted as a bounded non-V22 concern,
2. the executable canon posture source is chosen and recorded,
3. README/runtime/API/browser/test drift is implemented and checked,
4. `.engi/v22-canon-posture-drift-report.json` is part of the V22 generated artifact family,
5. promotion-time runtime posture preparation is implemented,
6. the V20 deferred proof/operator boundaries are explicitly deferred beyond V22 first gate,
7. and the V22 `SPEC` is dense enough to satisfy the current full-canon checker contract.
