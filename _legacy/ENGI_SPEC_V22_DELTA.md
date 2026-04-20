# ENGI Spec V22 Delta

## Status

- Scope: V22 canonical delta for runtime/operator drift-detection hardening after V21 specifying canon
- Current canonical/latest target: `V22`
- Canonical proof-source commit: `5c3410df386022bb3f7c9c102c60724be46fe1c1`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v22-spec-family-report.json`, `.engi/v22-canonical-input-report.json`, and `.engi/v22-canon-posture-drift-report.json`; `ENGI_SPEC_V22_PROVEN.md` is the active generated proof appendix for V22
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_NOTES.md`
- Source parity state: V22 source-side runtime/demo canon-posture drift detection, generated drift artifacts, promotion-time runtime preparation, and inherited proof/operator closure are canonicalized; this delta records the V21-to-V22 closure
- V22 state: canonical promotion complete; V22 system-facing canon is active and this delta records the promoted drift-detection closure set

## Why V22 exists

V21 finished first-gate specifying canon.

That shifts the next version question away from:
- file-family shape,
- full-canon structure,
- and promotion wording discipline

toward:
- ENGI's own runtime truth,
- operator shell truth,
- proof/operator closure sequencing,
- and current implementation drift from the active canon.

V22 exists because the active system is stronger than its runtime/demo posture currently admits.
The running demo still self-identifies in V19/V20-draft terms, and repo-facing demo docs still self-identify in V15 terms, even though the active canon is V21 and the actual implemented system includes V17/V18/V19/V20 closure work.

## Findings that drive V22

### 1. Runtime/demo version posture is stale

That first defect has now been materially closed:
- `engi-demo/src/canon-posture.js` now owns active/draft/demo canon posture,
- `engi-demo/src/engi-demo.js`, `engi-demo/src/demo-shell-state.js`, browser shell surfaces, and tests derive from that source,
- and `engi-demo/README.md` now reflects current canon posture.

Remaining V22 work on this axis is now narrower:
- deeper operator/explainer refinement after first-gate closure,
- and any later version work beyond V22 first gate.

### 2. The actual implementation already carries a richer system

Current ENGI source already includes:
- seeded repo-authenticated inventory and scenario corpus,
- deterministic need measurement,
- fit/ranking/verification separation,
- branch and artifact materialization,
- principal-scoped projection,
- proof bundle and witness/replay surfaces,
- exact source-to-shares settlement,
- operator-quality surfaces,
- and layered validation.

V22 should therefore align truth before inventing new major semantics.

### 3. The next deeper closure targets are already named

V20 left explicit accepted boundaries for:
- full source/projection security matrix expansion,
- full mutation cross-product expansion,
- and screenshot stability promotion.

V22 can now decide whether those become actual in-version implementation targets.

## Accepted V22 decisions

The current accepted V22 drafting decisions are:

1. V22 is system-facing rather than specifying-facing.
2. The first V22 implementation target is executable canon-truth alignment across runtime, API, browser shell, tests, and demo docs.
3. V22 should preserve V21 as the semantic/specifying baseline unless implementation reveals a concrete blocker.
4. A single runtime-owned canon posture surface should replace scattered version literals. This is now implemented through `engi-demo/src/canon-posture.js`.
5. API `specVersion`, browser title/copy, operator status text, README/demo docs, and test expectations should derive from the same canon posture source. This first-pass alignment is now implemented.
6. Stale V15/V19/V20 runtime/demo posture is a V22 source defect, not an accepted boundary.
7. V22 first gate should make drift detection foundational through a generated drift artifact and promotion-time runtime/demo posture preparation. This is now implemented through `.engi/v22-canon-posture-drift-report.json`, `scripts/check-engi-canon-posture-drift.mjs`, and `scripts/prepare-engi-runtime-canon-promotion.mjs`.
8. V22 explicitly defers the V20 projection-matrix, mutation-cross-product, and screenshot-stability boundaries beyond V22 first gate rather than leaving them undecided.
9. V22 should continue treating active V21 canon and `V20_PROPER` as useful validation surfaces where V21-era specifying checks still apply.

## Explicitly deferred

Still explicitly deferred beyond V22 first gate:
- projection-matrix expansion beyond current representative quality smoke,
- mutation cross-product expansion beyond current representative mutation coverage,
- and screenshot-backed visual closure beyond current deterministic DOM/geometry signatures.

## Pre-Implementation Sequence

The accepted V22 first-gate closeout sequence is:

1. finish the current audit across V16-V21 and current source,
2. draft the V22 full-system center and initial workstreams,
3. identify every stale canon-posture surface in runtime/demo/docs/tests,
4. decide and implement the executable canon posture source,
5. realign runtime/API/browser/README/test posture to the active canon,
6. add generated/runtime drift detection so future canon promotions cannot leave runtime/demo posture behind,
7. add promotion-time runtime/demo posture preparation so promoted active-canon truth can move with the pointer,
8. explicitly defer the V20 deferred proof/operator boundary set beyond V22 first gate,
9. densify the V22 full spec into first-gate full-canon form,
10. and then make V22 ready for canonical promotion.

## Commit-Body Direction

The eventual V22 canonical commit body should describe:
- executable canon-truth realignment across runtime, API, browser shell, tests, and demo-local docs,
- the exact source surface chosen to own active-canon posture,
- the V22 canon-posture drift report and promotion-time runtime posture preparation path,
- and the explicit V22 first-gate decision to defer the inherited V20 projection/mutation/screenshot boundaries beyond this version.
