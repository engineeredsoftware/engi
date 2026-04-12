# ENGI Spec V22 Delta

## Status

- Scope: V22 canonical delta for post-V21 ENGI runtime/proof/operator realignment
- Current canonical/latest target: `V21`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V21_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v21-spec-family-report.json`, and `.engi/v21-canonical-input-report.json`
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_NOTES.md`
- Source parity state: V22 first-pass runtime/demo canon-posture implementation is landed; deeper operator-pedagogy and deferred proof/operator closure work remain open
- V22 state: draft implementation underway; no V22 promotion claim is made here

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

Remaining V22 work on this axis is narrower:
- deeper operator/explainer vocabulary cleanup,
- and any additional promotion/runtime coupling beyond pointer-backed runtime tests.

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
7. V22 should then decide which of the V20 deferred proof/operator boundaries to close after canon-truth alignment.
8. V22 should continue treating active V21 canon and `V20_PROPER` as useful validation surfaces where V21-era specifying checks still apply.

## Explicitly deferred

Still open in early V22 drafting:
- whether runtime canon posture should be derived from the canonical pointer, a dedicated source module, a generated posture artifact, or a combination,
- whether V22 should emit a new version-local generated artifact family,
- and which of the three V20 deferred proof/operator boundaries should be accepted into V22 after the truth-alignment pass.

## Pre-Implementation Sequence

The accepted early V22 sequence is:

1. finish the current audit across V16-V21 and current source,
2. draft the V22 full-system center and initial workstreams,
3. identify every stale canon-posture surface in runtime/demo/docs/tests,
4. decide and implement the executable canon posture source,
5. realign runtime/API/browser/README/test posture to the active canon,
6. tighten operator/explainer surfaces and add any further validation needed so future canon promotions cannot leave runtime/demo posture behind,
7. then choose and execute the next proof/operator closure work from the V20 deferred boundary set,
8. and only after that densify the V22 full spec into promoted full-canon form.

## Commit-Body Direction

The eventual V22 canonical commit body should describe:
- executable canon-truth realignment across runtime, API, browser shell, tests, and demo-local docs,
- the exact source surface chosen to own active-canon posture,
- any new V22 generated artifact family needed to fail closed on runtime/demo promotion drift,
- and whichever deferred proof/operator closure work from V20 becomes implemented in V22.
