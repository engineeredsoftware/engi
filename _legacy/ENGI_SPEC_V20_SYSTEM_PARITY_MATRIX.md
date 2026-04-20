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
| Browser version posture | Browser title, hero copy, status language, API `specVersion`, and report context distinguish `V19` active canon from `V20` operator-quality draft while naming inherited `V16/V17/V18/V19` surfaces | V20 must distinguish active canon `V19`, draft target `V20`, and inherited historical surfaces without misleading operators | Browser/API assertions plus V20 quality summary assert visible active canon, draft target, inherited surface labels, and generated appendix/report references | implemented; canonical promotion pending |
| Inherited workflow/projection canon | V17 E2E covers `8 x 2 x 4 = 64` browser scenario/branch/principal cells with exact projection inventories | V20 should inherit this as workflow/projection behavior and add quality gates over representative/high-risk states | V20 reports reference inherited V17 matrix and do not duplicate all quality checks across every cell unless reopened | accepted baseline |
| Inherited positive proof canon | V18/V19 generated artifacts record `1832` inherited positive proof cells | V20 must preserve this proof baseline and avoid proof-family churn unless quality implementation reveals a proof gap | V20 `_PROVEN_` summarizes inherited proof closure | accepted baseline |
| Inherited reproducible-canon promotion | V20 generator preserves inherited V19 deterministic replay, volatility, negative mutation, contract ledger, and generated-only appendix discipline while emitting only `.engi/v20-*` new artifacts | V20 must preserve deterministic generation and generated-only appendix discipline | V20 generated reports render from clean replay context and V20 promotion dry-run exposes inherited V19 gates before pointer advancement | implemented; full promotion run pending |
| Operator acceptance transcript | `buildV20OperatorAcceptanceTranscript` emits `.engi/v20-operator-acceptance-transcript.json` from required workflow summaries and generated evidence refs | V20 must generate `.engi/v20-operator-acceptance-transcript.json` from executable browser flows | `test:v20-operator-transcript` verifies required flow ids, step ids, appendix/report reference discovery, pass/fail, and inherited-canon dependencies without raw elapsed samples | implemented |
| Visual regression budget | `buildV20VisualRegressionReport` emits deterministic DOM/geometry signatures for required states and records screenshot stability as an accepted first-gate deferral | V20 must generate `.engi/v20-visual-regression-report.json` for required operator states | `test:v20-visual` verifies all required visual states, signature digests, zero blocking drift, and accepted screenshot deferral | implemented |
| Accessibility budget | Browser shell exposes status live-region, focus-visible styling, reduced-motion bounds, and surface-mode tab selected state; report builder records deterministic accessibility checks | V20 must generate `.engi/v20-accessibility-report.json` covering labels, focus, keyboard flow, live status, landmarks, contrast, reduced motion, and selected-state semantics | `test:v20-accessibility` verifies labels/names/focus/live status/landmarks/toggles/contrast/reduced-motion/projection-safety checks with zero blocking failures | implemented |
| Performance budget | `buildV20PerformanceBudgetReport` records deterministic budgets and normalized timing classes only; raw test runner durations remain noncanonical telemetry | V20 must generate `.engi/v20-performance-budget-report.json` for initial load, scenario/projection switch, branch creation, proof rendering, surface toggles, and reset | `test:v20-performance` verifies operation budgets, normalized classes, report-only suite duration, and absence of raw timing fields | implemented |
| Quality report determinism | V20 quality report builders use fixed replay context fields and normalized classes; generated artifact tests reject dirty-preview state, local paths, and raw timing fields | V20 must record normalized timing classes, pass/fail, budgets, and fixed replay context instead of raw volatile timing samples in canonical artifacts | V20 generator stdout renders deterministic V20 sections; generated check mode remains a canonical-promotion step | implemented; generated file check pending promotion |
| Projection-quality smoke matrix | `buildV20ProjectionQualitySmokeMatrix` emits public/reviewer/buyer/internal smoke cells and records inherited V17 `64`-cell browser matrix | V20 must generate `.engi/v20-projection-quality-smoke-matrix.json` for public, reviewer, buyer, and internal representative states | `test:v20-projection-quality` verifies every principal and rejects forbidden artifact dependence | implemented |
| Quality summary | `buildV20QualitySummary` aggregates operator, visual, accessibility, performance, and projection-quality reports plus inherited V19 proof closure | V20 must generate `.engi/v20-quality-summary.json` aggregating operator, visual, accessibility, performance, and projection-quality reports | `test:v20-quality-summary` passes only when every blocking quality gate passes and inherited V19 proof counts remain `1832`/`10` | implemented |
| V20 `_PROVEN_` rendering | Generator renders `## V20 Operator Quality Reports`, inherited V19 closure, quality report summaries, visual/accessibility/performance/projection sections, and emits only `.engi/v20-*` artifacts for V20 | V20 must render inherited proof closure plus V20 quality report summaries | V20 stdout generation renders `2583` lines with V20 quality sections; `ENGI_SPEC_V20_PROVEN.md` write/check remains canonical-promotion output | implemented; generated file pending promotion |
| Promotion command | `promote:canon` accepts `--version V20`, runs inherited V19 gates, six V20 quality gates, serial non-E2E full suite after the standalone E2E gate, generated write/check, and diff check | V20 must support `--version V20` or provide an accepted equivalent command with visible gates | `npm run promote:canon -- --version V20 --commit HEAD --dry-run` shows full V20 gate plan | implemented; full promotion pending |
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
| Version posture | browser copy plus assertion coverage | implemented as `V19 active canon / V20 operator-quality draft` with inherited `V16/V17/V18/V19` posture | required; canonical pointer pending |
| Operator transcript | `v20-operator-acceptance-transcript` | implemented in `buildV20OperatorAcceptanceTranscript`; tested by `test:v20-operator-transcript` | required |
| Visual regression | `v20-visual-regression-report` | implemented as deterministic DOM/geometry signatures with screenshot deferral recorded | required |
| Accessibility | `v20-accessibility-report` | implemented with deterministic checks and source-side live-region/focus/tab semantics | required |
| Performance | `v20-performance-budget-report` | implemented with budgets and normalized timing classes only | required |
| Projection-quality smoke | `v20-projection-quality-smoke-matrix` | implemented for public/reviewer/buyer/internal representative cells | required |
| Quality summary | `v20-quality-summary` | implemented with inherited V19 proof closure and all V20 quality reports | required |
| V20 `_PROVEN_` rendering | generated V20 appendix with quality report summaries | implemented in generator; canonical file generation pending promotion | required |
| Promotion command | V20 promotion support | implemented; dry-run exposes full V20 gate sequence, `test:e2e` owns browser listener coverage, and `test` runs the serial non-E2E suite to avoid duplicate localhost listener variance | required |
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
