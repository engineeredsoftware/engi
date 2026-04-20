# ENGI Spec V19

## Status

- Scope: V19 accepted first-gate specification for reproducible canon, deterministic replay, canonical promotion hardening, and negative proof mutation coverage after V18 generated proof closure
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_NOTES.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_SYSTEM_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V18_PROVEN.md`
- Current generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V19_PROVEN.md`
- Current canonical/latest target: `V19`
- Last fully realized canonical target preserved in source: `V19`
- V19 state: canonical promotion prep is complete; source implementation, generated V19 appendix/artifacts, generator check mode, full verification, and `ENGI_SPEC.txt` pointer advancement are aligned for the V19 canonical commit
- Current realization basis for this pass: `engi-demo`

## Drafting and acceptance state

V19 first-gate specification and source implementation are complete for canonical promotion prep.

The word `draft` in this file family means the combined specification and source implementation are still work in progress until canonical promotion.
Specification drafting and implementation remain co-located because implementation can reveal missing precision, infeasible contracts, or stronger canonical wording.
Those discoveries must update this spec, notes, and parity matrix before source closure is claimed.

This file is no longer in that draft state for V19 first-gate scope.
The generated proof appendix and structured artifacts were produced by the canonical promotion workflow from proof-source commit `221e718ea34c904e3d4413dfc470feab38fca673`.

## Version executive summary

V19 begins after V18 closed generated positive proof exhaustiveness.

V18 proved that ENGI can derive, execute, and report:
- `720` proof-member semantic cells,
- `912` theorem-evidence cells,
- `200` state-machine cells,
- and a generated `_PROVEN_` appendix summarizing those matrices from executable proof data.

V19 must not reopen that positive-proof baseline unless deterministic replay or mutation testing exposes a concrete proof category gap.

The V19 job is reproducible canon.
It turns canonical proof generation and promotion from a manually sequenced release practice into a replayable, auditable, fail-closed workflow.

The central V19 question is:
- can ENGI prove that the same source, canonical inputs, proof-source commit, and replay context regenerate byte-identical canonical proof and matrix artifacts?

## Canonical ENGI executive summary

ENGI remains a proof-bearing operating system for engineering assetizing.

The canonical chain is:
1. deposited assets enter through typed depositing surfaces,
2. a need is measured and expressed as prompt/inference-owned requirements,
3. assets are evaluated, verified, selected, and materialized,
4. branch artifacts and proof artifacts are emitted,
5. identity, authorization, and projection policy constrain what each principal can see,
6. source-to-shares settlement records exact contribution and accounting consequences,
7. proof bundles, witness manifests, replay catalogs, generated matrices, and generated appendices make the result auditable.

V19 does not change that product identity.
It changes the release and replay standard required before a canonical bump can be trusted.

## V19 inheritance rule

V19 inherits V18 as a closed positive-proof base.

That means:
- `ENGI_SPEC.txt` advances to `V19` only after V19 source implementation and generated appendix promotion are complete,
- `ENGI_SPEC_V18_PROVEN.md` remains the prior generated proof appendix,
- `ENGI_SPEC_V19_PROVEN.md` is the current generated proof appendix for V19 canonical promotion prep,
- V18's `1832` generated matrix cells are accepted as the positive-proof baseline,
- V19 mutation matrices are negative-proof coverage and do not increase the V18 positive matrix count,
- V19 should not add proof families unless determinism, promotion, or mutation checks reveal a missing contract category,
- and V19 must treat `_PROVEN_` as generated-only release output, not as manually authored specification prose.

## V19 accepted first-gate decisions

V19 accepts the following implementation decisions:

1. V19 centers reproducible canon, not new subsystem semantics.
2. Deterministic replay is the first blocking gate.
3. Canonical promotion must become one command or one scriptable workflow with checkable output.
4. Generated proof output must be byte-stable for the same proof-source commit and replay context.
5. Matrix artifacts must be materialized as generated, checkable, committed structured outputs during canonical promotion.
6. V18's positive proof matrices must be re-materialized under V19 as inherited baseline artifacts, not counted as new V19 positive-proof scope.
7. Negative proof mutation matrices must prove fail-closed behavior through representative mutation coverage and must list omitted full cross-products explicitly.
8. Contract-change ledgers must be generated rather than inferred manually from prose diffs.
9. The V16/V17/V18 proof-source commit convention is preserved; V19 adds promotion automation around it rather than replacing it with self-referential commit generation.
10. Source-level projection security matrices are out of V19 first-gate scope unless implementation changes projection policy.
11. Changed-projection-policy mutation remains required as proof/disclosure alignment coverage, but it must not expand into a full source projection-security matrix.
12. UX quality canon is deferred beyond V19.

## V19 first-gate acceptance

The V19 first gate is the complete source implementation of reproducible canon.

It is satisfied only when these required surfaces exist and are green:

| Gate surface | Required V19 result |
|---|---|
| Deterministic replay | Two independent generations from the same replay context produce byte-identical `_PROVEN_` markdown and byte-identical committed generated JSON artifacts. |
| Volatility inventory | Canonical proof artifacts contain no `blocking-volatile` findings and classify all preview/context-bound fields. |
| Canonical promotion command | `npm run promote:canon -- --version V19 --commit <proof-source-commit>` runs the full promotion sequence or fails closed before mutating canonical files. |
| Positive matrix materialization | V18's inherited `1832` positive proof cells are emitted as V19 generated structured artifacts and referenced by V19 `_PROVEN_`. |
| Negative mutation matrix | Representative mutation cells execute for every required mutation class with zero unexpected passes and an omitted-cross-product ledger. |
| Contract-change ledger | A generated V18-to-V19 ledger names proof, artifact, matrix, boundary, and promotion-contract deltas. |
| Generated appendix | `ENGI_SPEC_V19_PROVEN.md` is generated only by the canonical generator and passes immediate check mode. |

The first gate explicitly does not include:
- a full source-level projection security matrix, unless V19 implementation changes projection policy,
- visual regression budgets,
- accessibility budgets,
- runtime performance budgets,
- full mutation cross-products across every proof member, theorem, scenario, branch, principal, and artifact path,
- or any new proof family not revealed by determinism or mutation failure.

These are not ambiguous residual tasks.
They are accepted V19 boundaries with reopen conditions recorded in the parity matrix.

## V19 determinism standard

V19 closure requires ENGI to distinguish deterministic proof truth from accidental local run state.

Canonical proof and matrix artifacts must not depend on:
- wall-clock timestamps unless they are explicitly fixed by the replay context,
- random ids,
- filesystem traversal order,
- object insertion order from unstable inputs,
- locale-specific sorting,
- unstated environment variables,
- machine-specific absolute paths except where the spec names them as local workspace references,
- process ids,
- temporary directory names,
- or dirty-worktree preview state when the artifact is claimed as canonical.

Every generated canonical artifact must have a replay context that names:
- canonical version,
- proof-source commit,
- proof-source commit recorded-at timestamp,
- generated-at timestamp or deterministic replacement,
- worktree state,
- generator id,
- scenario axis,
- branch-mode axis,
- principal axis where relevant,
- and any accepted environment inputs.

If a field is intentionally volatile in preview mode, V19 must ensure that field cannot silently enter canonical output.

## V19 deterministic replay gate

V19 must add an explicit replay gate that generates canonical output twice from the same inputs and compares the bytes.

The replay gate must:
- run from the same version label,
- run from the same proof-source commit,
- use the same replay context,
- write to isolated temporary outputs or in-memory buffers,
- compare the generated markdown bytes,
- compare generated structured matrix artifact bytes if those artifacts are materialized,
- fail with the first differing artifact path and digest,
- and record the replay result in a structured report.

Required replay artifact shape:

| Field | Requirement |
|---|---|
| `reportId` | Stable id, expected `v19-deterministic-replay-report`. |
| `version` | Version label used for replay, expected `V19` during V19 promotion. |
| `proofSourceCommit` | Commit used for canonical proof data. |
| `generatorId` | Generator id reported by `_PROVEN_`. |
| `runCount` | Number of generation attempts compared, expected `2` for the first gate. |
| `artifactComparisons` | Deterministically ordered list of generated outputs compared by path, digest, and byte equality. |
| `volatileFieldFindings` | Structured volatility warnings or errors found during scan. |
| `passed` | `true` only when every compared artifact is byte-identical and no blocking volatility is found. |
| `failureReason` | Empty when passed; otherwise names the first replay or volatility failure. |

## V19 volatile field inventory

V19 must inventory all fields that can enter generated canonical proof output.

The initial inventory must cover:
- `_PROVEN_` header fields,
- proof-run metadata,
- parsed completion envelope metadata,
- witness manifest digests,
- replay catalog entries,
- proof-family summaries,
- member summaries,
- theorem summaries,
- V18 matrix summaries,
- state-machine matrix cells,
- runtime coverage report entries,
- generated artifact digest maps,
- and future materialized matrix JSON artifacts.

The volatility scanner must classify each finding as:
- `canonical-stable`: safe to digest and commit,
- `preview-volatile`: allowed only outside canonical promotion,
- `context-bound`: stable only because the replay context fixes it,
- or `blocking-volatile`: must fail canonical promotion.

## V19 canonical promotion workflow

V19 must specify and implement a canonical promotion workflow that removes manual sequencing as a release risk.

The promotion workflow must, at minimum:
1. confirm the target version label,
2. confirm the proof-source commit,
3. confirm the worktree policy for canonical versus preview generation,
4. run typecheck,
5. run targeted proof/matrix tests,
6. run full tests,
7. run deterministic replay,
8. run the volatility scanner,
9. generate or check materialized matrix artifacts if V19 accepts them,
10. generate the version `_PROVEN_` file,
11. immediately run `_PROVEN_` check mode,
12. run diff hygiene,
13. emit the canonical commit message body,
14. and refuse to mark the promotion complete if any step fails.

The documented release entrypoint is:
- `npm run promote:canon -- --version V19 --commit <proof-source-commit>`

Supporting commands may exist, but this command is the V19 canonical promotion interface.

The canonical command must not silently:
- infer a different version than the operator requested,
- use a dirty worktree for canonical output,
- generate `_PROVEN_` with one commit and check it against another,
- skip matrix tests,
- skip deterministic replay,
- or update `ENGI_SPEC.txt` without a matching generated proof appendix.

## V19 matrix artifact materialization

V18 generated matrix data and rendered matrix summaries into `_PROVEN_`.
V19 accepts full generated structured artifact materialization as canonical promotion output.

The canonical artifacts must include:
- `.engi/v19-proof-member-semantic-matrix.json`,
- `.engi/v19-theorem-evidence-matrix.json`,
- `.engi/v19-state-machine-matrix.json`,
- `.engi/v19-negative-proof-mutation-matrix.json`,
- `.engi/v19-deterministic-replay-report.json`,
- `.engi/v19-volatility-inventory.json`,
- and `.engi/v19-contract-change-ledger.json`.

The positive proof matrix artifacts are inherited V18 baseline proof surfaces rendered under the V19 artifact namespace.
They must preserve the V18 positive matrix totals:
- `720` proof-member semantic cells,
- `912` theorem-evidence cells,
- and `200` state-machine cells.

Those `1832` inherited positive cells are not new V19 proof scope.
They are required so V19 replay, appendix generation, contract-change ledgering, and artifact inspectability operate over complete structured data.

Every materialized artifact must be:
- generated, not manually edited,
- deterministically sorted,
- schema-versioned,
- digestible,
- referenced by `_PROVEN_`,
- and checked by the promotion workflow.

The generated artifacts must be committed with the canonical V19 bump.

## V19 negative proof mutation matrix

V19 must add negative-proof coverage that mutates proof inputs and requires deterministic rejection.

The mutation matrix is not a replacement for positive proof matrices.
It proves that canonical proof machinery fails closed when evidence is missing, corrupted, inconsistent, or contractually incompatible.

Initial required mutation classes:

| Mutation class | Contract being proven |
|---|---|
| `missing-digest` | Witness-manifest digest references are required for keyed artifacts. |
| `proof-family-catalog-drift` | Family, member, theorem, and replay catalogs must not drift across canonical runs. |
| `corrupted-replay-step` | Theorem replay steps must match the replay catalog and evidence payload. |
| `dropped-theorem-verdict` | Every canonical theorem must have a verdict for every run. |
| `mutated-member-payload` | Proof-family member payloads must preserve family-specific predicates. |
| `changed-projection-policy` | Projection policy and disclosure outputs must remain aligned. |
| `missing-witness-path` | Required witness paths must exist and be digest-backed. |
| `changed-matrix-axis` | Matrix axes must match canonical scenario, branch, principal, family, member, and theorem catalogs. |
| `unsorted-artifact-inventory` | Artifact inventories must normalize to deterministic order or fail if order carries semantics. |
| `volatile-timestamp` | Canonical generated outputs must reject wall-clock volatility not fixed by replay context. |

Required mutation artifact shape:

| Field | Requirement |
|---|---|
| `matrixId` | Stable id, expected `v19-negative-proof-mutation-matrix`. |
| `version` | Version label used for mutation execution. |
| `sourceRunCount` | Number of canonical runs used as mutation basis. |
| `mutationClassCount` | Number of mutation classes executed. |
| `coverageMode` | Expected `representative-first-gate` for V19. |
| `cellCount` | Total mutation cells generated. |
| `rejectedCellCount` | Number of cells that failed closed as expected. |
| `unexpectedPassCells` | Cells where a mutation was incorrectly accepted. |
| `unexpectedErrorCells` | Cells that failed for an unclassified reason. |
| `acceptedExclusions` | Explicitly accepted mutation exclusions, expected empty for first V19 gate unless the parity matrix names them. |
| `omittedCrossProducts` | Full mutation permutations intentionally not executed in V19, with rationale and reopen condition. |
| `cells` | Deterministically ordered mutation cells with mutation coordinates, expected error class, actual error class, and supporting evidence. |

V19 accepts representative mutation coverage for the first gate.
Full mutation cross-product coverage is deferred unless a representative mutation exposes run-specific behavior, branch-specific behavior, or projection-policy instability.
The mutation matrix must name omitted cross-products, why they are omitted, and what reopens them.

## V19 contract-change ledger

V19 must generate a version-to-version contract-change ledger.

The ledger must compare V18 against V19 and report:
- proof family ids,
- proof member ids,
- theorem ids,
- replay step ids,
- witness artifact paths,
- required artifact paths,
- generated matrix ids,
- generated matrix counts,
- artifact digest counts,
- accepted boundaries,
- source implementation gaps,
- and canonical promotion command behavior.

The ledger must separate:
- additive changes,
- removed changes,
- renamed changes,
- semantic changes,
- acceptance-boundary changes,
- and generated-artifact shape changes.

Manual prose can explain the ledger, but must not be the ledger source of truth.

## V19 source-level projection security boundary

V17 proved projection behavior through the browser operator matrix.
V18 accepted that browser coverage as the first closed projection baseline.

V19 does not add a full source-level projection security matrix in its first gate.
Projection proof remains inherited from the V17 browser matrix unless V19 implementation changes projection policy.

If projection policy changes during V19 implementation, a source-level projection matrix must be promoted and must cover:
- every seeded scenario,
- both branch modes,
- every projection principal,
- projection artifact inventory,
- redaction class,
- disclosure verdict,
- bounded-public proof behavior,
- and no unauthorized artifact leakage.

The required `changed-projection-policy` mutation is narrower.
It proves that proof/disclosure artifact mismatch fails closed; it does not replace the inherited V17 projection proof surface.

## V19 UX quality boundary

Visual regression, accessibility budgets, and runtime performance budgets remain valid future canon.

They are not V19 requirements because V19's highest-risk release problem is reproducible canonical proof output, not operator-shell quality.
They remain V20+ work unless a V19 implementation regression directly affects operator usability.

## V19 source-side implementation sequence

The required V19 implementation sequence is:

1. Add deterministic replay context construction and remove remaining implicit canonical generation inputs.
2. Add a volatility inventory/scanner over generated proof and matrix artifacts.
3. Normalize canonical proof inventory ordering before volatility scanning and artifact digesting.
4. Add a deterministic replay test or script that compares two generation attempts byte-for-byte.
5. Add a canonical promotion command or script with explicit dry-run/check behavior.
6. Implement committed generated matrix artifact materialization.
7. Add negative proof mutation matrix builders and fail-closed tests.
8. Add a generated contract-change ledger between V18 and V19.
9. Wire new V19 reports into `_PROVEN_` rendering only after the reports are generated from executable data.
10. Regenerate `ENGI_SPEC_V19_PROVEN.md` only during canonical V19 promotion.

## V19 non-goals

V19 should not:
- manually edit generated `_PROVEN_` files,
- use a generated appendix as evidence unless check mode passes immediately after generation,
- expand proof families without a determinism or mutation-discovered gap,
- treat representative mutation coverage as permanent full coverage without a recorded boundary,
- replace V17 browser projection canon with a source matrix unless projection-security scope is explicitly promoted,
- make UX quality gates block deterministic replay unless the version is intentionally rescoped,
- or advance `ENGI_SPEC.txt` before source implementation, replay, mutation, promotion, and generated appendix gates are green.

## V19 completion condition

V19 is complete when:

1. V19 docs define reproducible canon as the version focus.
2. The system parity matrix records every V19 implementation requirement, accepted boundary, source status, and canonical promotion boundary.
3. Deterministic replay generates byte-identical proof and accepted matrix artifacts from the same proof-source commit.
4. The volatility scanner finds no blocking canonical volatility.
5. The canonical promotion command runs the complete promotion sequence and fails closed on omitted gates.
6. Matrix artifact materialization is implemented or explicitly rejected with an inspectability alternative.
7. The negative proof mutation matrix executes all accepted mutation cells and rejects every mutation as expected.
8. The generated contract-change ledger reports V18-to-V19 deltas.
9. `_PROVEN_` rendering includes V19 deterministic replay, mutation, materialization, and ledger summaries derived from executable data.
10. `ENGI_SPEC_V19_PROVEN.md` is regenerated, not manually edited, as part of the canonical V19 commit.
11. `ENGI_SPEC.txt` is advanced to `V19` only in the same canonical commit that includes the regenerated V19 proof appendix.

Completion recorded for this pass: the canonical promotion workflow generated `ENGI_SPEC_V19_PROVEN.md`, generated all seven `.engi/v19-*` structured artifacts, checked the appendix, and advanced `ENGI_SPEC.txt` to `V19` for the V19 canonical commit.
