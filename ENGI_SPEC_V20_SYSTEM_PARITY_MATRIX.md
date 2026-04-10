# ENGI Spec V20 System Parity Matrix

## Status

- Scope: V20 draft operator-quality source parity ledger
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V20_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- Prior parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_SYSTEM_PARITY_MATRIX.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Current canonical/latest target: `V19`
- Last fully realized canonical target preserved in source: `V19`
- V20 state: draft specification in progress; source implementation, generated quality artifacts, generated appendix, and pointer advancement are pending
- Primary implementation surface to audit for this pass: `engi-demo`

## Purpose

This file records the V20 parity ledger between the operator-quality specification and current repository truth.

V19 closed reproducible canonical proof promotion.
V20 starts from the quality debt that remains after proof generation is trustworthy:
- version-posture clarity,
- operator acceptance transcript,
- visual regression budget,
- accessibility budget,
- performance budget,
- projection-quality smoke matrix,
- generated quality reports,
- V20 `_PROVEN_` rendering,
- and promotion support beyond the V19-only path.

## Interpretation rule

The correct V20 reading is:
- `V19` remains the active canonical/latest target,
- V20 is the next draft implementation target,
- V17's browser matrix remains accepted workflow/projection canon,
- V18's `1832` generated positive proof cells remain accepted,
- V19's reproducible-canon promotion remains accepted,
- V20 source implementation must concentrate on operator-quality proof surfaces,
- and generated V20 quality reports plus `_PROVEN_` output remain canonical-promotion artifacts, not manually authored draft files.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V17_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/index.html`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/styles.css`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/e2e.test.js`
- `/Users/garrettmaring/Developer/ENGI/scripts/promote-engi-canon.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/generate-engi-proven.mjs`

---

## V20 implementation matrix

| Area | Current source truth | V20 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Root canon posture | `ENGI_SPEC.txt` points to `V19`; V19 generated appendix and `.engi/v19-*` artifacts are present | V20 must remain draft until quality reports, V20 appendix, promotion, and pointer advancement are complete | V20 docs state V19 remains current canon and no V20 pointer advancement has occurred | closed for draft posture |
| Browser version posture | Browser title and copy still say `Canonical V16`; JS constants still expose `CANON_VERSION_LABEL = 'V16'` and `CANON_OPERATOR_LABEL = 'canonical V16'` | V20 must distinguish active canon `V19`, draft target `V20`, and inherited historical surfaces without misleading operators | Browser tests assert visible active canon, draft target, and inherited surface labels | open |
| Inherited workflow/projection canon | V17 E2E covers `8 x 2 x 4 = 64` browser scenario/branch/principal cells with exact projection inventories | V20 should inherit this as workflow/projection behavior and add quality gates over representative/high-risk states | V20 reports reference inherited V17 matrix and do not duplicate all quality checks across every cell unless reopened | accepted baseline |
| Inherited positive proof canon | V18/V19 generated artifacts record `1832` inherited positive proof cells | V20 must preserve this proof baseline and avoid proof-family churn unless quality implementation reveals a proof gap | V20 `_PROVEN_` summarizes inherited proof closure | accepted baseline |
| Inherited reproducible-canon promotion | V19 promotion command and generator produce clean replay-context generated output | V20 must preserve deterministic generation and generated-only appendix discipline | V20 generated reports and appendix pass check mode | open |
| Operator acceptance transcript | Browser tests assert many workflow facts but do not emit a structured operator-readable transcript artifact | V20 must generate `.engi/v20-operator-acceptance-transcript.json` from executable browser flows | Transcript records required steps, extracted values, pass/fail, elapsed times, and inherited-canon dependencies | open |
| Visual regression budget | No screenshot or deterministic visual signature budget exists; E2E asserts text/order but not rendered layout stability | V20 must generate `.engi/v20-visual-regression-report.json` for required operator states | Report passes with zero blocking visual drift or records accepted screenshot deferral with DOM/geometry signatures | open |
| Accessibility budget | HTML has labels and focusable controls, but no automated accessibility budget checks exist | V20 must generate `.engi/v20-accessibility-report.json` covering labels, focus, keyboard flow, live status, landmarks, contrast, reduced motion, and selected-state semantics | Accessibility report passes with zero blocking failures | open |
| Performance budget | E2E records elapsed test durations only as test runner output; no operator operation budget report exists | V20 must generate `.engi/v20-performance-budget-report.json` for initial load, scenario/projection switch, branch creation, proof rendering, surface toggles, and reset | Performance report passes hard budgets or updates spec/parity before closure | open |
| Quality report determinism | V19 generator check mode proves canonical bytes must be stable; V20 quality reports would become stale if raw wall-clock samples enter committed artifacts | V20 must record normalized timing classes, pass/fail, budgets, and fixed replay context instead of raw volatile timing samples in canonical artifacts | Generated quality reports pass check mode from clean replay context | open |
| Projection-quality smoke matrix | Existing browser matrix proves projection behavior; no quality-specific report proves quality checks avoid forbidden private artifacts | V20 must generate `.engi/v20-projection-quality-smoke-matrix.json` for public, reviewer, buyer, and internal representative states | Matrix proves quality checks pass without private leakage or forbidden artifact dependence | open |
| Quality summary | No V20 quality aggregate exists | V20 must generate `.engi/v20-quality-summary.json` aggregating operator, visual, accessibility, performance, and projection-quality reports | Summary passes only when every blocking quality gate passes | open |
| V20 `_PROVEN_` rendering | Generator supports V19 reproducible-canon sections but no V20 quality sections | V20 must render inherited proof closure plus V20 quality report summaries | `ENGI_SPEC_V20_PROVEN.md` generated and check mode passes | open |
| Promotion command | `promote:canon` is V19-specific and rejects other versions | V20 must support `--version V20` or provide an accepted equivalent command with visible gates | Dry-run and full promotion run show V20 quality gates and generated report checks | open |
| Full source projection-security matrix | V17 browser matrix and V19 changed-policy mutation remain accepted; no V20 policy change exists yet | V20 excludes full source projection-security matrix unless implementation changes projection policy | Boundary remains accepted or reopens if projection source changes | accepted boundary |
| Full mutation cross-products | V19 representative mutation matrix remains accepted | V20 excludes full mutation cross-products unless quality implementation reveals mutation-class variance | Boundary remains accepted or reopens on unexpected mutation behavior | accepted boundary |

---

## V20 first-gate checklist

The V20 first gate is implementation-complete only when every required row below is closed.

| Gate | Required source behavior | Required artifact or command | Required judgment |
|---|---|---|---|
| Version posture | Browser and reports distinguish active canon, draft target, and inherited historical surfaces | Browser assertions plus quality summary | required |
| Operator transcript | Generate structured transcript from executable browser workflows | `.engi/v20-operator-acceptance-transcript.json` | required |
| Visual regression | Check stable visual states through screenshots or DOM/geometry signatures | `.engi/v20-visual-regression-report.json` | required |
| Accessibility | Check keyboard, focus, labels, roles, live status, contrast, reduced motion, landmarks, and selected-state semantics | `.engi/v20-accessibility-report.json` | required |
| Performance | Measure local operation budgets and classify pass/fail | `.engi/v20-performance-budget-report.json` | required |
| Projection-quality smoke | Run quality checks over representative public/reviewer/buyer/internal states without leaking private artifacts | `.engi/v20-projection-quality-smoke-matrix.json` | required |
| Quality summary | Aggregate every blocking quality gate | `.engi/v20-quality-summary.json` | required |
| Generated appendix | Render V20 quality reports and inherited proof closure from executable data | `ENGI_SPEC_V20_PROVEN.md` | required at canonical promotion |
| Promotion command | Run the full canonical V20 sequence or fail closed before canonical mutation | `npm run promote:canon -- --version V20 --commit <proof-source-commit>` or accepted equivalent | required |

The first gate excludes full mutation cross-products, full source-level projection-security matrix, broad redesign, production SLOs, and external accessibility certification unless a recorded reopen condition is triggered during implementation.

## V20 required workstreams

| Workstream | Required artifact or command | Current status | Required V20 judgment |
|---|---|---|---|
| Version posture | browser copy plus assertion coverage | current browser still labels shell as `Canonical V16` | required |
| Operator transcript | `v20-operator-acceptance-transcript` | absent | required |
| Visual regression | `v20-visual-regression-report` | absent | required |
| Accessibility | `v20-accessibility-report` | absent | required |
| Performance | `v20-performance-budget-report` | absent | required |
| Projection-quality smoke | `v20-projection-quality-smoke-matrix` | absent | required |
| Quality summary | `v20-quality-summary` | absent | required |
| V20 `_PROVEN_` rendering | generated V20 appendix with quality report summaries | absent | required |
| Promotion command | V20 promotion support | V19-only command exists | required |
| Source projection security | inherited V17 browser proof plus no V20 projection-policy source change, or promoted source matrix if policy changes | inherited browser proof present | accepted boundary |
| Mutation expansion | V19 representative mutation matrix | inherited mutation proof present | accepted boundary |

## V20 quality report artifact shapes

Required generated artifact names:
- `.engi/v20-operator-acceptance-transcript.json`
- `.engi/v20-visual-regression-report.json`
- `.engi/v20-accessibility-report.json`
- `.engi/v20-performance-budget-report.json`
- `.engi/v20-projection-quality-smoke-matrix.json`
- `.engi/v20-quality-summary.json`

Common report fields:
- `version`,
- `reportId`,
- `generatedAt`,
- `proofSourceCommit`,
- `generatorId`,
- `worktreeState`,
- `qualityRunnerId`,
- `browserContext`,
- `viewport`,
- `colorScheme`,
- `reducedMotion`,
- `locale`,
- `timezone`,
- `fixtureSeed`,
- `passed`,
- `blockingFailureCount`,
- `acceptedExclusionCount`,
- `scenarioIds`,
- `branchModes`,
- `projectionPrincipals`,
- and deterministic digest inventory for nested snapshots or signatures.

Canonical quality artifacts must not contain raw wall-clock timing samples, dirty-preview state, random ids, unstable local paths, or unclassified browser/environment variance.
Live measurements may fail tests, but committed reports must store deterministic pass/fail, normalized timing class, budget, and replay context.

## V20 visual state matrix

Required visual states:

| Visual state | Required coverage | First-gate judgment |
|---|---|---|
| Initial seeded shell | Hero, controls, summary, panel order, status, and version posture visible | required |
| Targeted branch run | Deposit, need, fit, ranked candidates, branch artifacts, settlement, and ledger/proof surfaces visible | required |
| Normalization branch run | Source-to-shares, settlement participation, zero-credit participation, and profile composition visible | required |
| Public privacy-boundary projection | Public proof metadata visible; private proof/source artifacts absent | required |
| Reviewer privacy-boundary projection | Proof review surfaces visible; raw files and authorization decisions absent | required |
| Buyer targeted projection | Buyer-authorized non-source artifacts visible; raw files absent | required |
| Internal privacy-boundary projection | Raw source and authorization details visible | required |
| Invalid deposit error | Error status visible; seeded state remains unchanged | required |
| No-survivor conflict | Conflict status visible; reset recovery remains visible | required |
| Generated appendix/report reference | UI or report reference makes generated canon artifacts discoverable | required |

## V20 accessibility matrix

| Accessibility concern | Required check | First-gate judgment |
|---|---|---|
| Control names | Buttons, selects, inputs, textareas, info badges, and mode toggles have accessible names | required |
| Form labeling | Each form control has a label or equivalent programmatic name | required |
| Keyboard operation | Keyboard-only path can select scenario/projection/branch mode, deposit or run branch, switch surface mode, and reset | required |
| Focus order | Focus follows operator workflow order from global controls through panels | required |
| Focus visibility | Focus is visually apparent for every interactive control | required |
| Status announcements | Status changes are announced through live-region or equivalent status contract | required |
| Landmarks/sections | Header, main, and major panels are semantically navigable | required |
| Toggle state | Visual/raw mode toggles expose selected state | required |
| Contrast | Text and controls meet accepted local contrast threshold | required |
| Reduced motion | Nonessential transitions are disabled or bounded under reduced-motion preference | required |
| Projection safety | Accessibility checks do not require hidden/private artifacts for lower-privilege projections | required |

The accepted local contrast threshold is WCAG AA: `4.5:1` for normal text, `3:1` for large text, and `3:1` for actionable non-text UI and focus indicators against adjacent colors.
Disabled controls are exempt only when they are not required to complete an accepted operator flow.

## V20 performance matrix

| Operation | Initial V20 budget | First-gate judgment |
|---|---:|---|
| Initial seeded shell ready | 1500ms | required |
| Scenario switch summary update | 500ms | required |
| Projection switch summary update | 500ms | required |
| Targeted branch creation | 5000ms | required |
| Normalization branch creation | 7000ms | required |
| Proof-family catalog render after branch | 1000ms | required |
| Raw/visual surface mode toggle | 250ms | required |
| Reset to ready state | 1500ms | required |
| Full quality suite duration | report-only until implementation records stable local baseline | accepted boundary |

If implementation reveals a budget is unrealistic under deterministic local browser execution, the spec and parity matrix must be updated before closure is claimed.

Canonical performance reports must store normalized elapsed class rather than raw elapsed milliseconds.
Accepted first-gate classes are `within-budget`, `over-budget`, and `telemetry-only`.

## V20 accepted boundaries

| Boundary | Rationale | Reopen condition |
|---|---|---|
| Full mutation cross-product deferred | V20 is quality canon; V19 representative mutation already proves fail-closed classes | Quality report mutation or generator behavior varies by member, theorem, scenario, branch, principal, or artifact path |
| Full source projection-security matrix deferred | V17 browser projection matrix remains accepted and V20 does not intentionally change projection policy | Projection policy source changes or quality checks reveal projection leak behavior |
| Broad redesign deferred | V20 quality is proof-readability and operability, not aesthetic replacement | Existing layout cannot satisfy visual/accessibility/performance budgets without redesign |
| Production SLOs deferred | V20 budgets are deterministic local review budgets | Deployment or hosted production path becomes canonical |
| External accessibility certification deferred | First gate can use deterministic DOM assertions | Local assertions are insufficient to prove required accessibility concerns |

## V20 debt collection method

V20 parity debt must be collected through seven audits:

1. Version-posture audit
   Compare visible browser copy and reports against active canon, draft target, and inherited surfaces.

2. Operator transcript audit
   Drive proof-bearing workflows and record step-by-step visible operator truth.

3. Visual audit
   Compare screenshots or deterministic visual signatures for required states.

4. Accessibility audit
   Verify names, labels, focus, keyboard flow, live status, landmarks, contrast, reduced motion, and selected states.

5. Performance audit
   Measure local operation latencies against budgets and record report-only suite duration.

6. Projection-quality audit
   Run quality checks against public, reviewer, buyer, and internal representative states without private leaks.

7. Promotion audit
   Generate V20 reports, render V20 `_PROVEN_`, run check mode, and keep canonical promotion fail-closed.

## V20 implementation guide

The source-side work should proceed in this order.

| Phase | Required source change | Required tests | Required parity update |
|---|---|---|---|
| 1. Report schemas | Add V20 quality report builders, artifact names, and replay context fields | Unit tests for stable report shapes and no raw volatile fields | Record exact generated artifact fields |
| 2. Version posture | Update browser copy/constants and tests for active canon/draft target/inherited surfaces | Browser assertion for visible version posture | Close browser version row |
| 3. Operator transcript | Emit structured transcript from required browser workflows | Transcript test verifies required step ids, extracted values, appendix/report reference discovery, and inherited-canon dependencies | Record transcript shape and required flows |
| 4. Accessibility | Add deterministic accessibility assertions | Accessibility test fails on missing names/labels/focus/status/toggle state | Record accepted accessibility budget |
| 5. Projection quality | Add public/reviewer/buyer/internal smoke matrix | Projection-quality test verifies no forbidden artifact dependence | Record smoke matrix cells |
| 6. Visual regression | Add screenshots or DOM/geometry signatures | Visual report test catches missing panel/order/visibility drift | Record screenshot or signature mode |
| 7. Performance budgets | Instrument local operator operations and normalize canonical timing classes | Performance report test enforces hard budgets without committing raw volatile timings | Record any implementation-adjusted budget |
| 8. Quality summary | Aggregate quality reports | Summary test fails when any blocking report fails | Record aggregate pass/fail rule |
| 9. V20 `_PROVEN_` rendering | Add V20 quality sections to generator | Generator write/check passes for V20 proof-source commit | Mark appendix rendering pending until promotion |
| 10. Promotion support | Generalize promotion command for V20 | Dry-run test shows V20 gate plan | Close promotion row only after full gate passes |

## V20 canonical verification gate

The V20 canonical commit must not be prepared until these commands or their accepted replacements are green:
- `npm --prefix engi-demo run typecheck`
- `npm --prefix engi-demo run test:unit`
- `npm --prefix engi-demo run test:integration`
- `npm --prefix engi-demo run test:e2e`
- `npm --prefix engi-demo run test:proof-member-matrix`
- `npm --prefix engi-demo run test:theorem-evidence-matrix`
- `npm --prefix engi-demo run test:state-machine`
- `npm --prefix engi-demo run test:deterministic-replay`
- `npm --prefix engi-demo run test:volatility`
- `npm --prefix engi-demo run test:negative-mutation-matrix`
- `npm --prefix engi-demo run test:contract-ledger`
- `npm --prefix engi-demo run test:v20-operator-transcript`
- `npm --prefix engi-demo run test:v20-accessibility`
- `npm --prefix engi-demo run test:v20-visual`
- `npm --prefix engi-demo run test:v20-performance`
- `npm --prefix engi-demo run test:v20-projection-quality`
- `npm --prefix engi-demo run test:v20-quality-summary`
- `npm --prefix engi-demo test`
- `node scripts/generate-engi-proven.mjs --version V20 --commit <canonical-source-commit> --worktree-state clean --output ENGI_SPEC_V20_PROVEN.md --allow-dirty`
- `node scripts/generate-engi-proven.mjs --version V20 --commit <canonical-source-commit> --worktree-state clean --output ENGI_SPEC_V20_PROVEN.md --check --allow-dirty`
- `git diff --check`

The final command set may be wrapped by the canonical promotion command, but the wrapper must make every gate visible.

## V20 completion condition

The V20 pass is complete when:

1. the spec, notes, and parity matrix agree that V20 is operator-quality canon,
2. version posture is truthful in the running browser shell,
3. operator acceptance transcript generation is implemented and green,
4. visual regression report generation is implemented and green or explicitly bounded,
5. accessibility report generation is implemented and green,
6. performance budget report generation is implemented and green or explicitly adjusted through parity,
7. projection-quality smoke matrix generation is implemented and green,
8. quality summary generation is implemented and green,
9. V20 `_PROVEN_` rendering summarizes quality reports and inherited proof closure from executable data,
10. full verification is green,
11. and `ENGI_SPEC_V20_PROVEN.md` is generated as part of canonical V20 promotion prep.
