# ENGI Spec V20 Notes

## Status

- Scope: accepted V20 draft notes for operator-quality canon after V19 reproducible proof promotion
- Prior canonical target: `V19`
- Current canonical/latest target: `V19`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Current V20 state: draft implementation pass in progress; source implementation and generator support are implemented, generated quality artifacts plus generated appendix are pending canonical promotion output, and pointer advancement remains pending
- Draft spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Draft parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md`

## Recommended V20 center

V20 should focus on operator-quality canon.

V17 proved that ENGI can be operated through real browser workflows.
V18 proved generated positive proof exhaustiveness.
V19 proved reproducible canonical proof generation and promotion.

The next useful question is not another proof-family expansion.
The next useful question is whether ENGI's human-facing shell makes the proof-bearing system reviewable without source inspection.

## Accepted specification axes

1. Operator acceptance transcript
   V20 should generate a structured transcript from executable browser workflows.
   The transcript should prove that a reviewer can follow deposit, need, fit, verification, proof, projection, source-to-shares, settlement, and `_PROVEN_` references.

2. Visual regression budget
   V20 should add screenshot or deterministic DOM/geometry visual signatures for required operator states.
   The gate should fail when required panels disappear, order drifts, layout hides controls, or projection/version posture becomes invisible.

3. Accessibility budget
   V20 should add keyboard, focus, label, role, live-region, contrast, reduced-motion, and landmark checks.
   This should start from deterministic DOM assertions and may later add a pinned accessibility engine.

4. Performance budget
   V20 should report local deterministic budgets for initial load, scenario switch, projection switch, branch creation, proof rendering, surface toggles, and reset.
   Budgets are prototype review budgets, not production SLOs.

5. Projection-quality smoke matrix
   V20 should run representative public, reviewer, buyer, and internal UI quality checks so quality gates do not normalize private-artifact leaks.
   This is narrower than the deferred full source-level projection-security matrix.

6. Version-posture correction
   Current browser copy still presents the shell as `Canonical V16`.
   V20 should correct visible posture so active canon (`V19`), draft target (`V20`), and inherited V16/V17/V18/V19 proof surfaces are legible.

7. Promotion generalization
   V20 should generalize the V19 canonical promotion command enough to run V20.
   It should not become a broad release framework unless that is the lowest-risk implementation path.

8. Deterministic quality artifact semantics
   V20 quality reports must preserve V19's reproducible-canon discipline.
   Live performance measurements may decide pass/fail, but canonical generated artifacts must record normalized timing classes and replay context rather than volatile raw timing samples.

## Baseline V20 acceptance decisions

- Accept operator-quality canon as V20's center.
- Do not introduce new proof families unless quality implementation reveals a missing proof category.
- Keep V19's reproducible-canon discipline and generated-only appendix rule.
- Treat V17's `64`-cell browser matrix as inherited workflow/projection canon.
- Layer quality assertions over representative and high-risk browser states rather than multiplying visual/accessibility/performance checks across every inherited cell.
- Treat full mutation cross-products as V21+ or reopen-triggered work.
- Treat full source-level projection-security matrix as out of scope unless projection policy changes.
- Require generated V20 quality reports and `_PROVEN_` summary sections.

## Accepted first-gate decisions

- V20 first gate includes visual, accessibility, and performance budgets.
- V20 first gate includes an executable operator acceptance transcript.
- V20 first gate includes a projection-quality smoke matrix for all four principals.
- V20 first gate includes generated structured quality artifacts under `.engi/v20-*`.
- V20 first gate includes V20 `_PROVEN_` rendering from generated quality data.
- V20 first gate includes promotion command support for `--version V20`.
- V20 first gate includes exact inherited V19 preservation commands, not a prose-only inherited gate.
- V20 first gate requires generated report replay context fields: generator id, worktree state, quality runner id, browser context, viewport, color scheme, reduced motion, locale, timezone, and fixture seed.
- V20 first gate does not include full mutation cross-products or full source-level projection-security matrix unless a recorded reopen condition is triggered.

## First-gate boundary closure

Required in the first gate:
- version-posture correction,
- operator acceptance transcript,
- visual regression report,
- accessibility report,
- performance budget report,
- projection-quality smoke matrix,
- quality summary report,
- generated V20 `_PROVEN_` rendering,
- and V20 promotion support.

Minimum transcript/quality states:
- seeded shell posture,
- targeted branch run,
- normalization branch run,
- public privacy-boundary projection,
- reviewer privacy-boundary projection,
- buyer targeted projection,
- internal privacy-boundary projection,
- invalid deposit error,
- no-survivor conflict and reset recovery,
- and generated appendix/report reference discovery.

Excluded from the first gate:
- full mutation cross-products,
- full source-level projection-security matrix,
- broad visual redesign,
- production deployment SLOs,
- external assistive-technology certification,
- and new proof families unless implementation reveals a proof gap.

## First implementation path

1. Add V20 report schemas and quality artifact names.
2. Correct version-posture copy and expose active canon/draft target in the browser shell.
3. Add operator acceptance transcript generation over existing E2E flows.
4. Add deterministic accessibility assertions for the seeded shell and targeted branch flow.
5. Add deterministic report replay context fields before report check mode is wired into `_PROVEN_`.
6. Add projection-quality smoke checks for public, reviewer, buyer, and internal states.
7. Add visual signature or screenshot report generation.
8. Add local performance budget measurement and report generation with normalized canonical timing classes.
9. Add quality summary aggregation.
10. Wire V20 reports into `_PROVEN_` generation.
11. Generalize `promote:canon` to V20.
12. Regenerate V20 docs/parity if implementation reveals budget or report-shape adjustments.

## Implementation pass results

- V20 report builders are implemented in `engi-demo/src/canonical/v20-quality.js`.
- V20 generated artifacts are `.engi/v20-operator-acceptance-transcript.json`, `.engi/v20-visual-regression-report.json`, `.engi/v20-accessibility-report.json`, `.engi/v20-performance-budget-report.json`, `.engi/v20-projection-quality-smoke-matrix.json`, and `.engi/v20-quality-summary.json`.
- V20 quality reports use fixed replay context fields and deterministic normalized timing classes; they do not store raw elapsed milliseconds.
- V20 visual regression currently uses deterministic DOM/geometry signatures, with screenshot comparison explicitly deferred until local CI screenshot stability is pinned.
- Browser posture is corrected to `V19 active canon / V20 operator-quality draft` and exposes generated appendix/report references.
- V20 `_PROVEN_` generation renders inherited V19 proof closure plus V20 quality report sections and emits only `.engi/v20-*` artifacts for V20.
- `promote:canon` accepts `--version V20` and exposes the inherited V19 gates, six V20 quality gates, full test suite, generated write/check, and diff check.
- The `npm --prefix engi-demo run test:e2e` gate owns browser listener coverage; `npm --prefix engi-demo test` runs the serial non-E2E suite so canonical promotion does not duplicate localhost listener setup through test discovery.

## V20 success condition

V20 is complete when the operator-facing ENGI shell is not only behaviorally demonstrable, but generated-report provable as legible, accessible, visually stable, performant within local budgets, projection-safe under quality review, and canonically promotable through generated `_PROVEN_`.
