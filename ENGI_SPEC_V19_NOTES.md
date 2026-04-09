# ENGI Spec V19 Notes

## Status

- Scope: draft recommendations for the next specification after V18 generated proof closure
- Prior canonical target: `V18`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- Current V19 state: notes only; no V19 canonical pointer, spec file, parity matrix, or source implementation yet

## Recommended V19 center

V19 should focus on canonical replay determinism and promotion hardening.

V18 proved that ENGI can generate and execute proof-member, theorem-evidence, and state-machine matrices from runtime proof truth.
It also exposed the next sharper requirement: once more proof surfaces become digested, latent nondeterminism becomes canonical debt.
The `.engi/eval-manifest.json` digest instability from volatile parsed-completion timestamps is the representative V19 lesson.

The V19 question should be:

Can ENGI prove that the same source, same canonical inputs, and same proof-source commit always regenerate the same canonical appendix and matrix artifacts?

## Primary specification potentialities

1. Deterministic canonical replay
   V19 should require every canonical proof run to be hermetic and replay-stable.
   Digested proof artifacts must not include wall-clock timestamps, process-order drift, random ids, filesystem-order drift, locale drift, environment drift, or unstated runtime inputs.

2. Canonical promotion command
   V19 should specify one promotion workflow that advances `ENGI_SPEC.txt`, regenerates `ENGI_SPEC_VN_PROVEN.md`, runs typecheck, targeted matrix tests, full tests, generator check mode, and diff hygiene, and emits the canonical commit message body.
   This removes manual sequencing as a canonical risk.

3. Generated matrix artifact materialization
   V18 generates matrix data and renders summaries into `_PROVEN_`.
   V19 should decide whether the full generated matrix artifacts are written as canonical structured JSON, so all cells are inspectable without reverse-engineering markdown.

4. Negative proof mutation matrices
   V19 should add generated fail-closed tests that mutate proof inputs and require deterministic rejection.
   Initial mutation classes should include missing digest, corrupted replay step, dropped theorem verdict, mutated member payload, changed projection policy, missing witness path, and changed matrix axis.

5. Source-level projection security matrix
   V17 proved projection behavior through browser operator coverage.
   V19 can add source-level projection-policy assertions across scenario, branch mode, and principal to prove policy visibility directly below the UI.

6. Canonical diff and contract-change ledger
   V19 should generate a version-to-version delta covering proof families, member ids, theorem ids, replay steps, witness artifacts, digest counts, matrix counts, and accepted boundary changes.
   The goal is to make contractual changes explicit before a canonical bump.

7. Deferred UX quality canon
   Visual regression, accessibility, and performance budgets remain valid future canon.
   They should not displace deterministic replay unless V19 is intentionally scoped as a production-quality UX release.

## Recommended V19 acceptance decisions

- Accept reproducible canon as V19's center.
- Do not introduce new proof families unless determinism or mutation testing reveals a missing category.
- Treat V18's `1832` generated matrix cells as the closed positive-proof baseline.
- Treat V19 mutation matrices as negative-proof coverage, not as additions to the V18 positive matrix count.
- Keep `_PROVEN_` generated-only and require check mode to be stable immediately after generation.
- Preserve the V16/V17/V18 proof-source commit convention unless V19 explicitly replaces it with self-referential canonical commit generation.

## First implementation path

1. Inventory all volatile fields in canonical proof artifacts.
2. Add a deterministic replay test that runs `_PROVEN_` generation twice and requires byte-identical output.
3. Add a proof-artifact volatility scanner for timestamps, random-looking ids, unsorted collections, and environment-derived values.
4. Add a promotion command or script that executes the canonical bump sequence.
5. Add negative mutation matrix builders after replay determinism is green.
6. Decide whether full matrix JSON artifacts become committed canonical outputs or generated side artifacts.
7. Only then consider source-level projection-security matrices or UX quality gates.

## V19 success condition

V19 is complete when canonical promotion is reproducible, generated proof output is byte-stable, mutation coverage proves fail-closed behavior, and contractual deltas are generated rather than inferred from manual review.
