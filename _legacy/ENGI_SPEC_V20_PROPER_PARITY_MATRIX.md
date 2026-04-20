# ENGI Spec V20 Proper Parity Matrix

## Status

- Scope: non-canonical parity ledger for the V20 historical full-canon reconstruction
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROPER_DELTA.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible-canon reports, active canonical `.engi/v20-*` operator-quality reports, and `ENGI_SPEC_V20_PROVEN.md`
- Current canonical/latest target: `V20`
- Source parity state: the reconstruction, the generalized spec-family checker, and the current V20 canonical inputs are being used together to harden V21 specifying
- V20_PROPER state: historical full-canon reconstruction drafting is in progress for specifying validation; this family remains non-canonical
- Primary implementation surfaces to audit for this pass: `ENGI_SPECIFYING.md`, `ENGI_SPEC_V20_PROPER.md`, `ENGI_SPEC_V20_PROPER_DELTA.md`, `ENGI_SPEC_V20_PROPER_PARITY_MATRIX.md`, `scripts/check-engi-spec-family.mjs`, and `ENGI_SPEC_V20_PROVEN.md`

## Purpose

This matrix records whether the V20 historical reconstruction is:
- actually full-canon,
- actually sourced from V20 canon only,
- and actually strict enough to validate the new specifying standard.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPECIFYING.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-contract-change-ledger.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-deterministic-replay-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-negative-proof-mutation-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-proof-member-semantic-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-state-machine-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-theorem-evidence-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v19-volatility-inventory.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-operator-acceptance-transcript.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-visual-regression-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-accessibility-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-performance-budget-report.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-projection-quality-smoke-matrix.json`
- `/Users/garrettmaring/Developer/ENGI/.engi/v20-quality-summary.json`
- `/Users/garrettmaring/Developer/ENGI/scripts/check-engi-spec-family.mjs`

## V20_PROPER implementation matrix

| Area | Current source truth | V20_PROPER implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Non-canonical reconstruction posture | `ENGI_SPEC.txt` remains pointed at `V20` and no `V20_PROPER` promotion path exists | `V20_PROPER` must stay explicitly non-canonical | status blocks and delta text state non-canonical reconstruction posture | closed |
| V20-only source discipline | V20 hand-authored canon plus V20/V19 generated canon exist as reconstruction inputs | `V20_PROPER` must derive only from those inputs | no V21 generated artifact names or V21 appendix names appear in the family | substantially advanced |
| Full-system restatement | original V20 hand-authored `SPEC` is focus-shaped and incomplete | `V20_PROPER` must restate V20 as a whole system | `V20_PROPER` now contains whole-system sections and appendices A-K | implemented |
| Proof-family closure carrier | V20 `_PROVEN_` already contains the authoritative nine-family inventory | `V20_PROPER` must restate that inventory in the main `SPEC` | Appendix B carries exact proof-family inventory plus exact member ids, theorem ids, replay-step groupings, theorem-by-theorem closure readings, member-closure criteria, minimum artifact/replay binding sets, verdict-shape carriers, and fail-closed conditions | implemented |
| Generated-artifact closure carrier | V20 generated canon is split across `_PROVEN_` and `.engi/v19-*`/`.engi/v20-*` | `V20_PROPER` must restate artifact family inventory, shared fields, artifact-specific fields, and generated-appendix rendered-content/fail-closed posture | Appendix C carries the exact generated-artifact inventory and generated appendix contract | implemented |
| Scenario/workflow cross-product carrier | V20 transcript, visual, and run matrix surfaces already define current cross-products | `V20_PROPER` must restate those axes explicitly | Appendix I carries scenario inventory, flow inventory, and required cross-products | implemented |
| Fail-closed posture carrier | V20 canon already materially depends on invalid deposit, no-survivor, projection, and settlement failure semantics | `V20_PROPER` must restate those postures directly | Appendix J carries explicit fail-closed rows | implemented |
| Source-bearing deliverable/artifact carrier | V20 canon depends on branch/proof/runtime artifacts but original prose scatters them | `V20_PROPER` must restate deliverables and emitted artifacts in one place | Appendix K carries branch/runtime and promotion artifacts | implemented |
| Full-canon checker support | checker was previously V21-only | checker must validate `V20_PROPER` as a second strict profile | generalized profile support is being added in source | implemented |
| Future-truth rejection | V20 reconstruction could silently borrow V21-specific artifact families | checker must reject V21-specific import phrases in `V20_PROPER` | `V20_PROPER` profile declares forbidden future phrases | implemented |

## V20_PROPER implementation checklist

| Area | Required V20_PROPER result | Current judgment |
| --- | --- | --- |
| Full `SPEC` structure | Whole-system section set exists | implemented |
| Appendix carriers | A-K appendices exist and are populated | implemented |
| V20-only artifact inventory | V19/V20 generated artifacts are restated directly | implemented |
| Future-truth exclusion | no V21 generated artifact names are imported | implemented |
| Generalized checker | spec-family checker accepts `V20_PROPER` | implemented |
| Canonical-input dependence | reconstruction visibly depends on real V20 canon inputs | implemented |

## V20_PROPER accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| Reconstruction remains non-canonical | it exists to validate specifying, not replace V20 history | reopen only if a future metaspec version formalizes canonical historical rewrites |
| No `V20_PROPER` generated appendix | the purpose is to validate hand-authored full-canon structure against existing V20 generated canon | reopen if specifying later requires generated historical-reconstruction outputs |
| Source-basis citations remain conservative | only clearly V20-canon-named source surfaces are cited directly | reopen if more source-bearing basis must be recovered from V20 canon inputs |

## V20_PROPER completion condition

The reconstruction pass is useful only when:
1. `V20_PROPER` can pass the generalized spec-family checker,
2. the file family remains free of V21-specific artifact imports,
3. the reconstruction is materially fuller than `ENGI_SPEC_V20.md`,
4. V21 specifying can point to it as a second structural validation target,
5. and any failure exposed by reconstructing V20 feeds back into `ENGI_SPECIFYING.md` or V21 rather than being left undocumented.
