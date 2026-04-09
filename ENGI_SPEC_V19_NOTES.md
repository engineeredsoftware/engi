# ENGI Spec V19 Notes

## Status

- Scope: accepted V19 first-gate draft notes for reproducible canon after V18 generated proof closure
- Prior canonical target: `V18`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- Current V19 state: first-gate acceptance baseline specified; specification and source implementation remain co-located draft work until canonical promotion; no V19 canonical pointer, generated appendix, or source implementation yet
- Draft spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19.md`
- Draft parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_SYSTEM_PARITY_MATRIX.md`

## Recommended V19 center

V19 should focus on canonical replay determinism and promotion hardening.

V18 proved that ENGI can generate and execute proof-member, theorem-evidence, and state-machine matrices from runtime proof truth.
It also exposed the next sharper requirement: once more proof surfaces become digested, latent nondeterminism becomes canonical debt.
The `.engi/eval-manifest.json` digest instability from volatile parsed-completion timestamps is the representative V19 lesson.

The V19 question should be:

Can ENGI prove that the same source, same canonical inputs, and same proof-source commit always regenerate the same canonical appendix and matrix artifacts?

## Accepted specification axes

1. Deterministic canonical replay
   V19 should require every canonical proof run to be hermetic and replay-stable.
   Digested proof artifacts must not include wall-clock timestamps, process-order drift, random ids, filesystem-order drift, locale drift, environment drift, or unstated runtime inputs.

2. Canonical promotion command
   V19 should specify one promotion workflow that advances `ENGI_SPEC.txt`, regenerates `ENGI_SPEC_VN_PROVEN.md`, runs typecheck, targeted matrix tests, full tests, generator check mode, and diff hygiene, and emits the canonical commit message body.
   This removes manual sequencing as a canonical risk.

3. Generated matrix artifact materialization
   V18 generates matrix data and renders summaries into `_PROVEN_`.
   V19 accepts writing full generated matrix artifacts as canonical structured JSON, so all cells are inspectable without reverse-engineering markdown.

4. Negative proof mutation matrices
   V19 should add generated fail-closed tests that mutate proof inputs and require deterministic rejection.
   Initial mutation classes must include missing digest, corrupted replay step, dropped theorem verdict, mutated member payload, changed projection policy, missing witness path, changed matrix axis, unsorted artifact inventory, and volatile timestamp.

5. Source-level projection security matrix
   V17 proved projection behavior through browser operator coverage.
   V19 records source-level projection-policy assertions as an accepted boundary unless implementation changes projection policy.

6. Canonical diff and contract-change ledger
   V19 must generate a version-to-version delta covering proof families, member ids, theorem ids, replay steps, witness artifacts, digest counts, matrix counts, and accepted boundary changes.
   The goal is to make contractual changes explicit before a canonical bump.

7. Deferred UX quality canon
   Visual regression, accessibility, and performance budgets remain valid future canon.
   They should not displace deterministic replay unless V19 is intentionally scoped as a production-quality UX release.

## Baseline V19 acceptance decisions

- Accept reproducible canon as V19's center.
- Do not introduce new proof families unless determinism or mutation testing reveals a missing category.
- Treat V18's `1832` generated matrix cells as the closed positive-proof baseline.
- Treat V19 mutation matrices as negative-proof coverage, not as additions to the V18 positive matrix count.
- Keep `_PROVEN_` generated-only and require check mode to be stable immediately after generation.
- Preserve the V16/V17/V18 proof-source commit convention and wrap it with promotion automation.

## Accepted first-gate decisions

- Full matrix JSON artifacts are committed canonical files generated during promotion.
- The V18 positive proof matrices are re-materialized under V19 as inherited baseline artifacts; their `1832` cells do not become new V19 positive-proof scope.
- The first negative mutation matrix uses representative fail-closed coverage and must list omitted full cross-products with reopen conditions.
- Source-level projection security is not promoted into V19 unless implementation changes projection policy; V17 browser proof remains inherited projection canon.
- Changed-projection-policy mutation remains required as narrower proof/disclosure alignment coverage.
- The canonical promotion command preserves the proof-source commit convention and wraps it with deterministic replay, volatility, materialization, tests, generator write/check, diff hygiene, and commit-body output.
- The canonical promotion command is `npm run promote:canon -- --version V19 --commit <proof-source-commit>`.
- UX quality budgets remain deferred beyond V19 unless implementation creates an operator-usability regression.

## First-gate boundary closure

The V19 first gate covers reproducible canon only.

Required in the first gate:
- deterministic replay report,
- volatility inventory,
- committed generated positive matrix artifacts under V19 names,
- representative negative mutation matrix,
- generated contract-change ledger,
- canonical promotion command,
- generated V19 `_PROVEN_` rendering and check mode.

Excluded from the first gate:
- full mutation cross-products,
- full source-level projection security matrix,
- visual regression budgets,
- accessibility budgets,
- runtime performance budgets,
- and new proof families unless determinism or mutation testing reveals a concrete missing category.

## First implementation path

1. Inventory all volatile fields in canonical proof artifacts.
2. Add a deterministic replay test that runs `_PROVEN_` generation twice and requires byte-identical output.
3. Add a proof-artifact volatility scanner for timestamps, random-looking ids, unsorted collections, and environment-derived values.
4. Add a promotion command or script that executes the canonical bump sequence.
5. Add negative mutation matrix builders after replay determinism is green.
6. Add committed generated matrix JSON artifacts for inherited positive matrices and V19 replay/volatility/mutation/ledger reports.
7. Preserve source-level projection-security and UX quality as accepted boundaries unless implementation changes reopen them.

## V19 success condition

V19 is complete when canonical promotion is reproducible, generated proof output is byte-stable, mutation coverage proves fail-closed behavior, and contractual deltas are generated rather than inferred from manual review.
