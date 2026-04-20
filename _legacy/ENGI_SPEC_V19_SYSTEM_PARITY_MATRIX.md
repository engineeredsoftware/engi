# ENGI Spec V19 System Parity Matrix

## Status

- Scope: V19 accepted first-gate reproducible-canon source parity ledger
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- Prior parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_SYSTEM_PARITY_MATRIX.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- Current generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Current canonical/latest target: `V19`
- Last fully realized canonical target preserved in source: `V19`
- V19 state: canonical promotion prep is complete; source implementation, generated V19 appendix/artifacts, generator check mode, full verification, and `ENGI_SPEC.txt` pointer advancement are aligned for the V19 canonical commit
- Primary implementation surface to audit for this pass: `engi-demo`

## Purpose

This file records the V19 parity ledger between the reproducible-canon specification and current repository truth.

V18 closed generated positive proof exhaustiveness.
V19 starts from the release-hardening debt that remains after proof matrices exist:
- deterministic canonical replay,
- volatile-field inventory,
- canonical promotion command,
- generated matrix artifact materialization,
- negative proof mutation coverage,
- contract-change ledger generation,
- and accepted boundaries for projection-security and UX quality gates.

## Interpretation rule

The correct V19 reading is:
- `V19` is the active canonical/latest target in the prepared canonical commit,
- V18 remains the prior canonical anchor,
- V18's `1832` generated positive proof cells remain accepted,
- V19 source implementation concentrated on reproducible generation and fail-closed mutation behavior,
- and generated `_PROVEN_` output remains a canonical-promotion artifact, not a manually authored draft file.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/scripts/generate-engi-proven.mjs`
- `/Users/garrettmaring/Developer/ENGI/scripts/promote-engi-canon.mjs`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/proven-generator.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v19-canon.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v18-matrices.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/need-measurement.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/proven-generator.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/proof-member-matrix.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/theorem-evidence-matrix.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/state-machine.integration.test.js`

---

## V19 implementation matrix

| Area | Current source truth | V19 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Root canon posture | `ENGI_SPEC.txt` points to `V19`; V19 docs, generated appendix, and generated artifacts are present in canonical promotion prep | V19 must advance the root pointer only after replay, mutation, promotion, ledger, and generated appendix work is complete | Promotion generated and checked V19 output, then advanced `ENGI_SPEC.txt` to `V19` | closed |
| V18 positive proof baseline | V18 generated `720` member cells, `912` theorem cells, and `200` state-machine cells; V18 `_PROVEN_` records all as passing | V19 must inherit those as the positive-proof base and avoid reopening proof families without concrete evidence | V19 spec and notes cite `1832` as inherited baseline | closed for draft posture |
| `_PROVEN_` generated-only rule | `scripts/generate-engi-proven.mjs` writes/checks generated appendices and refuses dirty worktrees unless `--allow-dirty` is provided | V19 must preserve generated-only appendices and add replay/promotion gates around generation | Generator owns V19 markdown plus artifacts; canonical files are written only by generator/promotion | closed |
| Replay context source | CLI defaults `generatedAt` to the canonical commit recorded-at timestamp and canonical promotion records `worktreeState=clean` explicitly even while generated files are being written pre-commit | V19 must make replay context explicit and prevent preview volatility from entering canonical output | Replay report records fixed `generatedAt`, proof-source commit, commit recorded-at, and worktree state; post-commit clean check mode remains byte-current | closed |
| Parsed completion timestamp stability | Parsed completion envelopes use a deterministic fixed timestamp in `need-measurement.js` after V18 hardening | V19 must generalize this lesson into a scanner/inventory rather than relying on one patched field | Volatility scanner reports parsed envelope timestamps as `context-bound` or `canonical-stable` | closed |
| Artifact inventory ordering | V18 proof data preserved witness digest inventory order from runtime artifact emission | V19 must normalize digest inventories by path before volatility scanning, replay comparison, and generated artifact materialization | Canonical proof data emits path-sorted artifact digest inventories and scanner records them as `canonical-stable` | closed |
| Deterministic replay test | Generator check mode compares one generated output against an existing file; there is no explicit two-run byte equality test | V19 must generate twice from the same replay context and compare bytes before promotion | `test:deterministic-replay` emits a passing replay report and verifies full output/artifact byte equality | closed |
| Volatile field inventory | No structured scanner inventories generated output fields for wall-clock, environment, order, path, or random drift | V19 must inventory canonical proof and matrix artifacts and classify volatility | `test:volatility` passes with zero canonical blocking findings and fails closed on timestamp/random fixtures | closed |
| Promotion command | Current promotion is handled by one scriptable workflow instead of manual sequencing | V19 must provide one canonical promotion entrypoint with dry-run/check behavior and commit-body output | `promote:canon` ran typecheck, targeted tests, full tests, generator write/check, and diff hygiene successfully | closed |
| Full matrix JSON materialization | V18 matrix builders return JSON-compatible data and `_PROVEN_` renders summaries; full matrix JSON files were not committed as canonical artifacts | V19 must commit generated structured artifacts for inherited positive matrices plus replay, volatility, mutation, and contract ledger reports | Generator wrote all seven deterministic `.engi/v19-*` artifact paths during canonical promotion prep | closed |
| Negative mutation coverage | `proven-generator.test.js` has targeted fail-closed tests for proof-family catalog drift and missing witness digest | V19 must add a generated mutation matrix covering accepted mutation classes with classified expected failures | `test:negative-mutation-matrix` reports 10 rejected representative cells and zero unexpected passes/errors | closed |
| Mutation cross-product totality | No current mutation matrix defines axes or omitted permutations | V19 accepts representative first-gate mutation coverage with an explicit omitted-cross-product ledger | Mutation matrix records `coverageMode=representative-first-gate`, generated required cells, omitted full cross-products, and reopen conditions | closed |
| Contract-change ledger | V18-to-V19 changes are currently inferable from docs and diffs only | V19 must generate a structured ledger for proof families, members, theorems, replay steps, witness paths, matrices, counts, and boundaries | `test:contract-ledger` verifies generated V18-to-V19 matrix/artifact/promotion deltas | closed |
| Source-level projection security matrix | V17 browser matrix covers every scenario, branch mode, and projection principal; V18 accepted no source duplication | V19 excludes a full source-level projection matrix unless implementation changes projection policy; changed-projection-policy mutation remains narrower proof/disclosure alignment coverage | V19 parity records inherited V17 browser proof and no projection-policy source change, or promotes a source matrix if projection policy changes | accepted boundary |
| UX quality canon | Visual, accessibility, and performance gates remain deferred from V18 | V19 excludes UX quality gates unless implementation creates an operator-usability regression | UX quality remains a V20+ candidate with no V19 blocking gate | accepted boundary |
| `_PROVEN_` V19 rendering | Generator renders V19 replay, volatility, mutation, materialization, and ledger summaries from executable data | V19 must render replay, volatility, mutation, materialization, and ledger summaries from executable data before V19 promotion | `ENGI_SPEC_V19_PROVEN.md` was generated and immediate check mode passed | closed |

---

## V19 first-gate checklist

The V19 first gate is implementation-complete only when every required row below is closed.

| Gate | Required source behavior | Required artifact or command | Required judgment |
|---|---|---|---|
| Replay determinism | Generate twice from the same replay context and compare bytes | `.engi/v19-deterministic-replay-report.json` | required |
| Volatility inventory | Classify stable, preview-volatile, context-bound, and blocking-volatile fields | `.engi/v19-volatility-inventory.json` | required |
| Promotion command | Run the full canonical bump sequence or fail closed before canonical mutation | `npm run promote:canon -- --version V19 --commit <proof-source-commit>` | required |
| Positive matrix materialization | Emit inherited positive proof matrices under V19 artifact names | `.engi/v19-proof-member-semantic-matrix.json`, `.engi/v19-theorem-evidence-matrix.json`, `.engi/v19-state-machine-matrix.json` | required |
| Negative mutation coverage | Execute representative fail-closed mutation cells and record omitted cross-products | `.engi/v19-negative-proof-mutation-matrix.json` | required |
| Contract-change ledger | Generate V18-to-V19 proof/artifact/matrix/boundary deltas | `.engi/v19-contract-change-ledger.json` | required |
| Generated appendix | Render V19 replay, volatility, mutation, materialization, and ledger summaries from executable data | `ENGI_SPEC_V19_PROVEN.md` | required at canonical promotion |

The first gate excludes full source projection security, UX budgets, and full mutation cross-products unless a recorded reopen condition is triggered during implementation.

## V19 required workstreams

| Workstream | Required artifact or command | Current status | Required V19 judgment |
|---|---|---|---|
| Deterministic replay | `v19-deterministic-replay-report` | generated and checked | required |
| Volatility scan | `v19-volatility-inventory` or equivalent report section | generated and checked | required |
| Canonical promotion | one documented command/script with dry-run/check mode | executed successfully for V19 canonical promotion prep | required |
| Matrix materialization | committed generated JSON artifacts for positive matrices and V19 reports | generated and ready for canonical commit | required |
| Negative mutation matrix | `v19-negative-proof-mutation-matrix` | generated and checked | required |
| Contract-change ledger | `v19-contract-change-ledger` | generated and checked | required |
| Source projection security | inherited V17 browser proof plus no V19 projection-policy source change, or promoted source matrix if policy changes | inherited browser proof present | accepted boundary |
| UX quality | no V19 quality gate; preserve as V20+ work | absent | accepted boundary |

## V19 first-gate mutation matrix

The first V19 mutation matrix must cover the following classes.

| Mutation class | Existing coverage | Required V19 coverage | First-gate judgment |
|---|---|---|---|
| `missing-digest` | Targeted missing `.engi/prompt-family-registry.json` witness digest test | Generated cells for required digest-backed artifact classes | required |
| `proof-family-catalog-drift` | Targeted drifted member id test | Generated cells for family, member, and theorem catalog drift | required |
| `corrupted-replay-step` | No generated mutation coverage | Replay step id and payload corruption must fail closed | required |
| `dropped-theorem-verdict` | Positive theorem matrix proves presence but does not mutate absence | Dropping a theorem verdict must fail with a classified missing-verdict error | required |
| `mutated-member-payload` | Positive member matrix proves predicates but does not mutate payloads | Family-specific payload mutation must fail the expected predicate | required |
| `changed-projection-policy` | Browser projection matrix proves visible inventories | Narrow mutation must prove proof/disclosure artifact mismatch fails closed without requiring a full source projection matrix | required |
| `missing-witness-path` | Digest test partially overlaps | Missing path and missing digest must be separate error classes | required |
| `changed-matrix-axis` | Positive matrices assert counts | Scenario, branch, principal, member, theorem, or family axis drift must fail closed | required |
| `unsorted-artifact-inventory` | Deterministic order is implicit in builders/renderers | Unstable order must normalize deterministically or fail if order is semantic | required |
| `volatile-timestamp` | One parsed timestamp issue has been patched | Wall-clock canonical drift must be detected by volatility scan and replay comparison | required |

## Mutation permutation ledger

V19 accepts representative first-gate mutation coverage rather than full mutation cross-products.

Candidate axes:
- mutation class,
- seeded scenario,
- branch mode,
- proof family,
- member id,
- theorem id,
- artifact path,
- replay step id,
- projection principal where projection policy is involved,
- and committed generated artifact materialization mode.

Required V19 first-gate stance:
- require at least one generated representative cell per mutation class,
- require high-risk classes to cross scenario and branch mode where the mutation target varies by run,
- require catalog-axis drift to cover family, member, theorem, scenario, and branch axes,
- require changed-projection-policy mutation as proof/disclosure alignment coverage without promoting a full projection matrix,
- record all omitted full cross-products in the generated mutation matrix before implementation is marked closed.

Omitted full cross-products accepted for V19:

| Omitted permutation | Reason | Reopen condition |
|---|---|---|
| Every mutation class across every proof family member | Representative fail-closed class coverage is the V19 target; full member cross-product would multiply inherited V18 positive cells without new release determinism value | A member-payload mutation passes unexpectedly or failure classification varies by member class |
| Every mutation class across every theorem id | V18 theorem evidence matrix already proves positive theorem coverage; V19 needs mutation-class fail-closed coverage first | A theorem mutation passes unexpectedly or replay-step validation varies by theorem group |
| Every mutation class across every artifact path | Artifact path population is large and partly redundant once digest/path classes are sampled by required artifact categories | Missing-path, missing-digest, or artifact-inventory mutation has path-specific behavior |
| Every mutation class across every scenario and branch mode | Required only where mutation target varies by run; otherwise replay determinism and positive matrices cover the run axes | A mutation result differs by scenario or branch mode |
| Projection mutation across every principal | Full projection behavior is inherited from V17 browser proof; V19 changed-projection-policy mutation is limited to proof/disclosure alignment | Projection policy source changes or public/reviewer/buyer/internal visibility changes |
| Mutation under every materialization mode | V19 accepts committed materialized artifacts as the only canonical mode | A side-artifact or preview-only materialization mode is introduced |

## V19 accepted boundaries

| Boundary | Rationale | Reopen condition |
|---|---|---|
| Full mutation cross-product deferred | Negative proof value comes first from fail-closed class coverage; exhaustive mutation can explode across artifact paths and theorem/member ids | A mutation class has run-specific behavior, escapes representative coverage, or becomes canonical release blocker |
| Source-level projection security inherited from V17 browser matrix | V17 already covered exact operator-visible projection inventories for every scenario/branch/principal cell | Projection policy implementation changes or a projection bug escapes browser coverage |
| UX quality deferred | V19's highest-risk gap is release reproducibility and fail-closed proof generation | V19 implementation creates an operator-usability regression or V20 promotes quality canon |

## V19 debt collection method

V19 parity debt must be collected through six audits:

1. Replay audit
   Generate canonical proof outputs twice from the same replay context and compare bytes.

2. Volatility audit
   Scan proof and matrix artifacts for timestamps, random ids, environment-derived values, filesystem-order drift, and preview-only fields.

3. Promotion audit
   Replace manual canonical bump sequencing with a single checkable command.

4. Materialization audit
   Generate and check committed structured JSON artifacts for inherited positive matrices and V19 reports.

5. Mutation audit
   Generate negative proof cells and require every accepted mutation to fail closed with classified error output.

6. Contract-change audit
   Generate a V18-to-V19 ledger so version deltas are explicit before pointer advancement.

## V19 implementation guide

The source-side work should proceed in this order.

| Phase | Required source change | Required tests | Required parity update |
|---|---|---|---|
| 1. Replay context | Add a deterministic replay context helper shared by generator, tests, and promotion command | Unit test fixed replay context construction | Mark timestamp/context rows closed only after all generator entrypoints use it |
| 2. Deterministic replay | Add two-run byte comparison for `_PROVEN_` and accepted structured artifacts | Replay test fails on intentionally volatile output | Record replay artifact shape and pass criteria |
| 3. Inventory ordering | Normalize proof artifact and digest inventory ordering before report generation | Volatility test records canonical-stable path ordering | Record ordering normalization as an implementation-discovered V19 requirement |
| 4. Volatility scanner | Add scanner over generated data/markdown/artifacts | Scanner test catches wall-clock timestamp and random-id fixtures | Record classified findings and accepted preview-only fields |
| 5. Promotion command | Add canonical promotion script with dry-run/check mode | Script-level test or documented dry-run execution covers gate ordering | Record command name, required gates, and refusal behavior |
| 6. Matrix materialization | Implement committed generated JSON artifact generation | Artifact check mode verifies deterministic JSON | Close materialization only after generated artifacts are referenced by `_PROVEN_` and committed during promotion |
| 7. Mutation matrix | Add generated fail-closed mutation matrix builders | Mutation test reports accepted cell count and zero unexpected passes | Record mutation classes, omitted permutations, and reopen conditions |
| 8. Contract ledger | Add generated V18-to-V19 contract-change ledger | Ledger test detects known fixture deltas | Record generated ledger path and `_PROVEN_` integration |
| 9. V19 `_PROVEN_` rendering | Add V19 sections for replay, volatility, mutation, materialization, and ledger summaries | Generator write/check passes for V19 proof-source commit | Mark appendix rendering closed only at canonical promotion prep |

Canonical required artifact names:
- `.engi/v19-deterministic-replay-report.json`
- `.engi/v19-volatility-inventory.json`
- `.engi/v19-negative-proof-mutation-matrix.json`
- `.engi/v19-contract-change-ledger.json`
- `.engi/v19-proof-member-semantic-matrix.json`
- `.engi/v19-theorem-evidence-matrix.json`
- `.engi/v19-state-machine-matrix.json`

Canonical required test entrypoints:
- `engi-demo/test/deterministic-replay.test.js`
- `engi-demo/test/volatility-inventory.test.js`
- `engi-demo/test/negative-proof-mutation-matrix.test.js`
- `engi-demo/test/contract-change-ledger.test.js`

Canonical required package scripts:
- `test:deterministic-replay`
- `test:volatility`
- `test:negative-mutation-matrix`
- `test:contract-ledger`
- `promote:canon`

The canonical promotion command is:
- `npm run promote:canon -- --version V19 --commit <proof-source-commit>`

## V19 canonical verification gate

The V19 canonical commit must not be prepared until these commands or their accepted replacements are green:
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
- `npm --prefix engi-demo test`
- `node scripts/generate-engi-proven.mjs --version V19 --commit <canonical-source-commit> --worktree-state clean --output ENGI_SPEC_V19_PROVEN.md --allow-dirty`
- `node scripts/generate-engi-proven.mjs --version V19 --commit <canonical-source-commit> --worktree-state clean --output ENGI_SPEC_V19_PROVEN.md --check --allow-dirty`
- `git diff --check`

The final command set may be wrapped by the canonical promotion command, but the wrapper must make every gate visible.

## V19 completion condition

The V19 pass is complete when:

1. the spec, notes, and parity matrix agree that V19 is reproducible canon,
2. deterministic replay produces byte-identical generated outputs from the same replay context,
3. the volatility scanner has no blocking canonical findings,
4. the promotion command executes the canonical bump sequence and fails closed on missing gates,
5. matrix artifact materialization is implemented or explicitly bounded,
6. negative proof mutation coverage rejects every accepted mutation cell,
7. a generated contract-change ledger records V18-to-V19 deltas,
8. V19 `_PROVEN_` rendering summarizes replay, volatility, mutation, materialization, and ledger proof from executable data,
9. full verification is green,
10. and `ENGI_SPEC_V19_PROVEN.md` is generated as part of canonical V19 promotion prep.

Completion recorded for this pass: `npm run promote:canon -- --version V19 --commit HEAD` resolved proof-source commit `221e718ea34c904e3d4413dfc470feab38fca673`, ran every required gate, generated and checked `ENGI_SPEC_V19_PROVEN.md`, generated all seven `.engi/v19-*` structured artifacts, and advanced `ENGI_SPEC.txt` to `V19`.
