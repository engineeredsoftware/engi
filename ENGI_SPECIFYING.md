# ENGI Specifying

Status: complete V21 draft standard for ENGI system specifying
Scope: canonical system-specification requirements, full-canon structure, delta discipline, parity discipline, generated artifact requirements, proof appendix rules, promotion gates, and content-quality standards for future ENGI versions
Supersedes: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
Applies to:
- future canonical ENGI system specification versions,
- future canonical promotion commits,
- generated `_PROVEN_` appendices,
- generated `.engi/vN-*` canonical artifacts,
- system parity matrices,
- version deltas,
- and realization/demo documents when they are referenced by system canon

This file is the one complete specifying standard.
Historical guides and prior specs remain evidence of evolution, but they are not parallel specifying authorities.

---

# 1. Purpose and Authority

ENGI specifying exists so a correct implementation, audit, generated proof appendix, and canonical promotion can be derived from the current specification family without reconstructing missing meaning from source code, older specs, or conversation history.

The central rule is:

> A promoted `ENGI_SPEC_VN.md` must be complete and precise enough that an implementer, reviewer, operator, or auditor can derive the current ENGI system behavior, contracts, artifacts, proofs, tests, promotion gates, accepted boundaries, and generated canon requirements from that version's canonical file family alone.

This standard defines how to write that family.
It does not define ENGI product semantics by itself.
Product semantics live in the active `ENGI_SPEC_VN.md`.
This file defines the required shape, quality bar, and release discipline for such specs.

The priority order for specifying truth is:
1. `ENGI_SPEC.txt`
2. the pointed `ENGI_SPEC_VN.md`
3. `ENGI_SPEC_VN_DELTA.md`
4. `ENGI_SPEC_VN_PARITY_MATRIX.md`
5. generated `ENGI_SPEC_VN_PROVEN.md`
6. generated `.engi/vN-*` artifacts
7. named realization/demo specs and adjunct docs, only where the active spec family explicitly references them

Older versioned specs are historical.
They may be cited for provenance, but the active `SPEC` must not require them for current semantic recovery.

---

# 2. First Principle: Complete Implementation Derivability

The first principle of `SPEC` is complete and precise implementation derivability.

A reader should be able to derive:
- canonical domain objects,
- runtime state shape,
- artifact shapes,
- proof-family obligations,
- proof object and witness requirements,
- generated artifact contracts,
- deterministic replay and check-mode behavior,
- operator workflows,
- projection/disclosure behavior,
- source-to-shares and accounting invariants,
- failure semantics,
- validation gates,
- and canonical promotion behavior

from the active spec family.

## 2.1 Derivability Requirements

Each normative system claim must answer, directly or by a nearby table:
1. What object, behavior, invariant, or artifact is required?
2. What inputs does it consume?
3. What outputs does it produce?
4. What fields, ids, enums, schemas, or typed structures are canonical?
5. What is deterministic and what is inferred, external, policy-derived, or boundary-modeled?
6. What proves it?
7. What generated or runtime artifact carries the evidence?
8. What tests or promotion gates fail if it drifts?
9. What source or realization surface currently implements it?
10. What accepted boundary remains, if any?

If a section cannot answer those questions, it is not implementation-derivable enough.

## 2.2 No Silent Inheritance

A promoted `SPEC` may inherit prior canon as history, but not as an implementation dependency.

Allowed:
- "V21 preserves V20 operator-quality canon" followed by a complete restatement of the current operator-quality requirements.
- "This rule originated in V16" followed by the current rule in full.
- referencing prior generated artifacts as provenance.

Not allowed:
- "See V16 for proof-family details" as the only current proof-family definition.
- "V20 behavior remains unchanged" without restating the current behavior needed for implementation.
- relying on older notes or matrices to recover accepted boundaries.

If a rule matters for current canon, it belongs in the current `SPEC`.

## 2.3 Precision Over Compression

Short specs are acceptable only when the system is actually small or the version's full current canon is otherwise fully captured.
For ENGI, a full canon spec will usually be large.

Compression is not a virtue when it removes:
- contract fields,
- artifact names,
- member inventories,
- theorem catalogs,
- test gates,
- generated output requirements,
- failure semantics,
- or implementation references.

The spec may use appendices to keep the top-level path readable, but the full derivable material must still exist in the file.

---

# 3. Canonical File Family

Beginning with V21, the required hand-authored system-spec file family is:

1. `ENGI_SPEC_VN.md`
   The complete current system canon.

2. `ENGI_SPEC_VN_DELTA.md`
   The version-local delta, decision record, implementation-revealed refinement record, accepted boundary ledger, and canonical commit-message input.

3. `ENGI_SPEC_VN_PARITY_MATRIX.md`
   The system parity matrix across spec claims, source implementation, generated artifacts, tests, operator surfaces, promotion gates, accepted boundaries, and known debt.

Generated canonical artifacts are required separately when applicable:

4. `ENGI_SPEC_VN_PROVEN.md`
   The generated-only proof appendix for the canonical version.

5. `.engi/vN-*`
   Generated structured artifacts required by the version's proof, promotion, quality, replay, matrix, or contract-change canon.

The root pointer is:

6. `ENGI_SPEC.txt`
   The only active canonical pointer.

## 3.1 Renamed Files

For V21+:
- `NOTES` becomes `DELTA`.
- `SYSTEM_PARITY_MATRIX` becomes `PARITY_MATRIX`.
- `TEMPLATEGUIDE` becomes `SPECIFYING`.

Historical files with older names remain valid history, not current naming precedent.

Compatibility stubs may remain at old paths, but they must not contain a second complete guide.

## 3.2 Optional File Families

Optional adjunct files may exist when justified:
- `ENGI_SPEC_VN_NOTES.md` for non-canonical iterative working notes during drafting and implementation,
- `ENGI_SPEC_VN_INFORMATION_AUDIT.md` for density recovery or historical coverage audits,
- realization or demo specs under their realization roots,
- realization implementation matrices,
- host capability documents,
- architecture maps,
- API docs,
- or generated reports not promoted as canonical artifacts.

Optional files must be named by the active spec family if they are parity-bearing.
Unreferenced adjunct docs are not canonical.

## 3.3 Optional Non-Canonical Notes

`ENGI_SPEC_VN_NOTES.md` may exist as the only sanctioned non-canonical working document for a version.

Its purpose is to let spec authors take notes during iterative development without turning every observation into canon.
It may be committed freely during WIP passes.

Notes may contain:
- early scoping thoughts,
- recommended centers,
- candidate acceptance axes,
- rejected or unresolved options,
- implementation sequencing ideas,
- transient findings,
- rough pass results,
- questions for later tightening,
- and reminders to update canonical files.

Notes must not contain canonical knowledge that is absent from the canonical file family.

The rule is:
- if a claim is intended to survive as current ENGI truth, it must be promoted into `SPEC`;
- if it is a version-local decision, accepted boundary, implementation-revealed refinement, or canonical commit-message input, it must be promoted into `SPEC_DELTA`;
- if it is source/generated/test/promotion parity truth, it must be promoted into `SPEC_PARITY_MATRIX`;
- if it is generated proof or report truth, it must be generated into `_PROVEN_` or `.engi/vN-*`.

Notes are therefore useful for drafting, but invalid as citation for canonical behavior.
An implementer or auditor must be able to ignore notes entirely and still derive current canon from `SPEC`, `SPEC_DELTA`, `SPEC_PARITY_MATRIX`, and generated canon.

## 3.4 Generated-Only Files

Generated files are not authored.
They may be previewed during drafting, but canonical generated files are committed only as part of canonical promotion or an explicitly accepted canonical regeneration commit.

Generated files must have:
- deterministic replay context,
- proof-source commit,
- generator id,
- version,
- worktree state,
- generated-at value fixed by canonical replay context or classified as noncanonical preview,
- artifact inventory,
- and check mode.

---

# 4. Canonical Status and Versioning

`ENGI_SPEC.txt` is the only active canonical pointer.

Rules:
1. A version file does not become canonical because it exists.
2. A version becomes active canon only when `ENGI_SPEC.txt` points to it in a canonical promotion commit.
3. A canonical promotion commit must include the active spec family and required generated artifacts for that version.
4. The active spec family must not contain stale draft language after promotion.
5. Prior versions remain preserved as historical records.
6. A generated appendix must identify the proof-source commit whose surfaces it rendered.

## 4.1 Status Block Requirements

Every `ENGI_SPEC_VN.md` must begin with a status block that states:
- version,
- active pointer status,
- prior canonical anchor,
- current canonical target,
- proof-source commit if promoted,
- generated appendix path,
- generated structured artifact inventory,
- implementation basis,
- source parity state,
- promotion state,
- and accepted realization/demo basis.

The companion `DELTA` and `PARITY_MATRIX` must repeat the same status truth.

## 4.2 Draft Language Rule

The word `draft` means the combined specification and source implementation are work in progress.
Drafting may include source implementation because implementation often reveals missing specification precision.

Once a version is promoted:
- the `SPEC` must not say promotion is pending,
- the `DELTA` must not say source implementation is still open unless that is an accepted post-promotion boundary,
- the parity matrix must not mark required first-gate rows as pending,
- and generated artifacts must not claim dirty-preview state.

Stale status language is a canonical defect.

---

# 5. Full `SPEC` Required Structure

The `SPEC` is the complete current canon.
It is not release notes.

Required top-level structure:

1. Status
2. Version executive summary
3. Canonical ENGI executive summary
4. Source-of-truth hierarchy
5. System goals, non-goals, and design principles
6. Whole operator chain
7. System architecture and layer boundaries
8. Canonical domain model
9. Subsystem canon
10. Proof canon
11. Generated canon
12. Validation canon
13. Promotion canon
14. Accepted boundaries and reopen conditions
15. Completion condition
16. Appendices

The exact heading names may vary, but every promoted full spec must cover these responsibilities.

## 5.1 Version Executive Summary

The version executive summary states:
- why this version exists,
- what it changes,
- what it preserves,
- what it explicitly does not change,
- what prior version it follows,
- what acceptance decisions define this version,
- what implementation or proof surfaces were added,
- and what the canonical promotion means.

This is version context, not the whole product definition.

## 5.2 Canonical ENGI Executive Summary

The canonical ENGI summary states what ENGI is now.

It must summarize:
- product/system identity,
- deposited asset flow,
- need measurement,
- fit/evaluation/verification,
- branch materialization,
- proof and witness closure,
- identity and authority,
- projection/disclosure boundaries,
- source-to-shares settlement,
- generated canonical artifacts,
- and operator/reviewer experience.

This summary should remain stable unless product semantics change.

## 5.3 Source-of-Truth Hierarchy

The spec must state the source-of-truth hierarchy for:
- spec files,
- delta files,
- parity matrix,
- generated proof appendix,
- generated structured artifacts,
- source code,
- tests,
- demo/realization docs,
- host capability docs,
- and historical specs.

It must define what wins when prose, source, tests, and generated outputs disagree.

## 5.4 Whole Operator Chain

The spec must describe the full ENGI chain in order:
1. deposit assets,
2. measure need,
3. declare prompt/inference ownership,
4. recall candidates,
5. rank and verify candidates,
6. select/materialize branch artifacts,
7. emit proof and witness artifacts,
8. apply identity/authority and projection policy,
9. compute source-to-shares,
10. settle journal/accounting effects,
11. generate proof appendix and structured artifacts,
12. present operator/reviewer/buyer/public surfaces.

If any step is modeled rather than executed, the spec must say so explicitly.

---

# 6. Required Subsystem Coverage

Every full `SPEC` must cover the whole system, not only the current version's focus.

Minimum subsystem coverage:
1. repo supply and depositing,
2. needing and measured demand,
3. prompt/inference/evaluator ownership,
4. depositing-to-needing fit,
5. recall and ranking,
6. verification decisions,
7. selection and materialization,
8. branch artifacts and deliverables,
9. identity, authority, signing, and policy,
10. sensitive data and confidentiality flows,
11. projection, disclosure, and redaction,
12. proof families, members, theorems, witnesses, and replay,
13. settlement, source-to-shares, journals, and exact accounting,
14. telemetry, persistence, state, and failure semantics,
15. host/runtime capability truth,
16. operator experience and pedagogy,
17. validation and test stack,
18. generated artifacts and canonical promotion.

## 6.1 Required Section Schema

Each major subsystem section must include:
- purpose,
- normative requirements,
- canonical terms,
- canonical data structures or schemas,
- algorithms or derivation rules,
- invariants,
- proof obligations,
- emitted artifacts,
- generated artifact impact,
- failure semantics,
- operator meaning,
- source references,
- validating tests,
- parity matrix references,
- accepted boundaries.

Sections may group related items, but none of those responsibilities may disappear.

## 6.2 Canonical Structures

Canonical structures should be written with enough precision to implement.

Acceptable forms:
- TypeScript-like type definitions,
- tables of required fields,
- JSON shape examples,
- algorithm steps,
- invariant lists,
- artifact inventories,
- state transition tables,
- proof verdict schemas.

Unacceptable forms:
- only prose labels,
- vague "etc." where fields are required,
- unstated enum cases,
- unowned ids,
- field names only found in source,
- or generated artifact shapes only visible by opening committed JSON.

---

# 7. Proof-Family Spec Pattern

V16's strongest reusable pattern is the proof-family section.
Future full specs must keep that rigor but update it with V18/V19/V20 generated-canon expectations.

Each proof family section must include:
1. family purpose,
2. canonical terms,
3. family obligations,
4. membership rules,
5. explicit exclusions,
6. canonical structures,
7. proof object schema,
8. verdict schema,
9. member inventory,
10. member closure criteria,
11. theorem catalog,
12. theorem binding,
13. witness artifact binding,
14. replay step binding,
15. generated artifact binding,
16. runtime source references,
17. test gates,
18. failure modes,
19. accepted boundaries,
20. completion condition.

## 7.1 Family Questions

Every proof-family section must answer:
- What can this family prove?
- How does it prove it?
- What exactly is proven today?
- Which members are included?
- Which members are excluded and why?
- Which theorem obligations are checked?
- What proof object fields carry verdicts?
- What artifacts and witnesses carry evidence?
- What replay steps make the proof auditable?
- What generated outputs summarize or materialize the proof?
- What tests fail when the family drifts?

## 7.2 Member Closure

A member is closed only when:
- it has stable id and family assignment,
- its truth surface is named,
- its proof verdict can fail on family-specific obligations,
- its artifacts and witnesses are bound,
- its replay steps are named,
- its downstream consumers are declared,
- its generated appendix rendering includes it,
- and its test matrix or predicate covers it.

## 7.3 Theorem Closure

A theorem is closed only when:
- it has a stable theorem id,
- it maps to one or more explicit verdict axes,
- it has required evidence paths,
- it names witness and replay bindings,
- it is represented in generated artifacts,
- it is summarized in `_PROVEN_`,
- and a test can fail on missing or insufficient evidence.

## 7.4 Proof Generated Artifacts

For each proof family, the spec must state which generated artifacts consume or summarize the family.

Examples:
- proof-member semantic matrices,
- theorem-evidence matrices,
- state-machine matrices,
- deterministic replay reports,
- volatility inventories,
- negative mutation matrices,
- contract-change ledgers,
- operator quality summaries,
- `_PROVEN_` sections.

---

# 8. Generated Canon Requirements

Generated canon is now part of ENGI system specifying.

The spec must define:
- generated file names,
- generator entrypoints,
- generator ids,
- proof-source commit convention,
- replay context,
- deterministic sorting,
- volatility policy,
- check mode,
- artifact digest strategy,
- generated summary fields,
- and canonical commit inclusion rules.

## 8.1 `_PROVEN_`

`ENGI_SPEC_VN_PROVEN.md` is generated only.
It must never be manually edited as prose.

It must render:
- version,
- output path,
- proof-source commit,
- generator id,
- generated-at value,
- worktree state,
- aggregate proof result,
- proof family inventory,
- member inventory,
- theorem inventory,
- witness and replay bindings,
- generated artifact inventory,
- matrix summaries,
- failure and accepted exclusion summaries,
- and any version-specific generated reports.

It must fail check mode when stale.

## 8.2 Structured `.engi` Artifacts

Every canonical generated JSON artifact must have:
- stable filename,
- stable `reportId` or `matrixId`,
- version,
- proof-source commit,
- generator id,
- replay context,
- deterministic ordering,
- pass/fail fields,
- blocking failure inventory,
- accepted exclusion inventory,
- and no unclassified volatile fields.

The spec must define whether an artifact is:
- proof matrix,
- quality report,
- replay report,
- volatility inventory,
- mutation matrix,
- contract ledger,
- promotion report,
- or other canonical generated output.

## 8.3 Volatility Policy

Canonical generated artifacts must not include:
- raw wall-clock measurements,
- random ids,
- process ids,
- temporary paths,
- dirty-preview state,
- locale-dependent sorting,
- filesystem-order dependence,
- or local absolute paths unless explicitly classified as canonical workspace references.

If a field can vary, it must be:
- fixed by replay context,
- normalized into a deterministic class,
- excluded from canonical artifacts,
- or marked as preview-only and blocked from promotion.

---

# 9. `SPEC_DELTA` Requirements

`ENGI_SPEC_VN_DELTA.md` is the version-local decision and change record.
It is not the system canon.

It must include:
- status,
- prior canonical anchor,
- current version target,
- reason for the version,
- accepted decisions,
- rejected alternatives where relevant,
- implementation-revealed refinements,
- changed contracts,
- generated artifact changes,
- test and promotion changes,
- accepted boundaries,
- reopen conditions,
- source-side implementation sequence,
- promotion notes,
- and canonical commit-message source material.

The delta must not be the only place a current system rule is specified.
If the rule remains current canon after promotion, it must also appear in `SPEC`.

---

# 10. `SPEC_PARITY_MATRIX` Requirements

`ENGI_SPEC_VN_PARITY_MATRIX.md` is the source/spec/generated-artifact parity ledger.

Each row must include:
- area,
- layer,
- spec requirement,
- current source truth,
- generated artifact truth where relevant,
- validating tests or commands,
- closure signal,
- judgment,
- accepted boundary or reopen condition if not fully closed.

Recommended layer labels:
- `system`,
- `realization`,
- `operator`,
- `proof`,
- `generated-artifact`,
- `promotion`,
- `test`,
- `documentation`,
- `accepted-boundary`.

## 10.1 Judgment Language

Allowed judgments:
- `closed`,
- `implemented; promotion pending`,
- `spec closed; source gap`,
- `generated artifact pending`,
- `accepted boundary`,
- `reopened`,
- `blocked`,
- `deprecated`,
- `historical only`.

Forbidden judgments:
- `closed` when source is missing,
- `closed` when generated artifacts are pending,
- `closed` when promotion status is stale,
- or ambiguous "done enough" language.

## 10.2 Promotion Status Rows

The parity matrix must include rows for:
- pointer status,
- file-family completeness,
- stale draft language,
- generated `_PROVEN_`,
- generated `.engi` artifacts,
- test gates,
- promotion command,
- canonical commit message body,
- and accepted boundaries.

---

# 11. Promotion Requirements

Canonical promotion is part of system specifying.

A promotion workflow must:
1. start from a clean source commit unless explicitly running preview mode,
2. resolve a proof-source commit,
3. run required typecheck gates,
4. run required unit tests,
5. run required integration tests,
6. run required E2E tests,
7. run proof matrix tests,
8. run generated artifact tests,
9. run version-specific gates,
10. check file-family completeness,
11. check stale status language,
12. advance `ENGI_SPEC.txt`,
13. generate `ENGI_SPEC_VN_PROVEN.md`,
14. generate required `.engi/vN-*` artifacts,
15. run generated check mode,
16. run `git diff --check`,
17. emit canonical commit message body,
18. and fail closed before pointer mutation if preconditions fail.

If pointer mutation must occur before generation because the generator reads `ENGI_SPEC.txt`, the promotion command must fail closed and immediately check generated output after mutation.

## 11.1 Commit Message Body

The canonical commit message body must be derivable from:
- version,
- proof-source commit,
- delta accepted decisions,
- parity closure rows,
- generated artifact inventory,
- validation gates,
- and accepted boundaries.

The body must not claim closure that the parity matrix does not support.

---

# 12. Validation Requirements

Every full spec must define the validation stack.

Minimum layers:
1. unit tests,
2. integration tests,
3. E2E/browser tests when operator behavior is canonical,
4. generated matrix tests,
5. deterministic replay tests,
6. volatility tests,
7. negative mutation tests,
8. contract ledger tests,
9. generated artifact check mode,
10. promotion dry-run or full promotion gate.

The spec must state:
- what each layer proves,
- what it does not prove,
- which artifacts it emits,
- and which accepted boundaries remain.

---

# 13. Operator and Pedagogy Requirements

Operator-facing surfaces are canonical when they carry product truth.

The spec must define:
- required operator workflow order,
- required visible concepts,
- labels and explainers that carry canonical meaning,
- projection posture,
- generated appendix/report discoverability,
- visual/raw/JSON dual surfaces,
- accessibility requirements,
- performance budgets when relevant,
- and quality report requirements when relevant.

Pedagogy is correctness when operator misunderstanding would distort review, proof interpretation, settlement interpretation, or disclosure judgment.

---

# 14. System-vs-Realization Separation

System canon and realization/demo canon must remain separate.

The system spec defines:
- universal ENGI semantics,
- invariants,
- proof obligations,
- generated canon,
- promotion requirements,
- and implementation derivability targets.

Realization docs define:
- current demo ordering,
- current UI shell,
- current persistence details,
- current host/runtime setup,
- current implementation gaps,
- and realization-local matrices.

A demo may realize canon.
A demo must not silently define canon.

If current source only exists under a demo directory, the spec must still distinguish:
- current implementation location,
- canonical system expectation,
- and future non-demo implementation portability.

---

# 15. Content Quality Requirements

A full spec must be:
- complete,
- precise,
- implementation-derivable,
- source-grounded,
- generated-artifact-aware,
- testable,
- auditable,
- organized,
- and honest about boundaries.

## 15.1 Required Precision

Use exact:
- ids,
- filenames,
- field names,
- enum cases,
- counts,
- matrix dimensions,
- artifact paths,
- command names,
- test names,
- generator names,
- proof family names,
- theorem ids,
- member ids,
- projection principals,
- branch modes,
- scenario ids.

Avoid:
- vague "etc.",
- unbounded "similar",
- unexplained "current behavior",
- unnamed generated artifacts,
- prose-only proofs,
- hidden source assumptions.

## 15.2 Source References

Source references must be parity-bearing.
They should identify:
- file,
- function or builder,
- generated output path,
- test entrypoint,
- and whether the surface is system, realization, generated, or operator-facing.

## 15.3 Boundary Honesty

Accepted boundaries are allowed.
Silent boundaries are not.

Every accepted boundary must include:
- boundary id or name,
- reason,
- scope,
- reopen condition,
- and parity matrix row.

---

# 16. Organization Requirements

The spec should be organized for both fast understanding and deep audit.

Required organization principles:
1. top-level reading path explains ENGI before deep appendices,
2. subsystem sections are schema-consistent,
3. appendices hold exhaustive catalogs,
4. generated artifact requirements are grouped and cross-referenced,
5. proof-family sections share a common pattern,
6. source references are deliberate,
7. status truth is repeated consistently across the file family,
8. delta and parity do not contradict the spec,
9. historical provenance is separated from current requirements.

---

# 17. Appendix Architecture

A full `SPEC` should normally include appendices or appendix-equivalent sections for:
- canonical type/schema catalog,
- inference and evaluator contracts,
- proof family obligations,
- member and theorem catalogs,
- artifact and deliverable contracts,
- generated artifact contracts,
- scenario and workflow matrices,
- test coverage,
- promotion checklist,
- spec-to-source map,
- accepted boundaries.

Appendices are canonical.
They are not loose notes.

---

# 18. Full-Spec Completion Checklist

A full ENGI `SPEC` is structurally complete only when:
1. the current system can be understood without reading older specs,
2. implementation contracts are precise enough to build from,
3. generated artifacts are named and shaped,
4. proof families, members, and theorems are closed or explicitly bounded,
5. test gates are named,
6. promotion gates are named,
7. source references are parity-bearing,
8. operator surfaces are specified where canonical,
9. accepted boundaries have reopen conditions,
10. `DELTA` contains version-local decisions only,
11. `PARITY_MATRIX` honestly records source/generated/test/promotion truth,
12. `_PROVEN_` is generated and checkable when promoted,
13. `.engi/vN-*` artifacts are generated and checkable when required,
14. stale draft language is absent after promotion,
15. and `ENGI_SPEC.txt` points to the promoted version only in the same commit that includes required generated canon.

If any item fails, the version may still be a useful draft, but it is not a complete canonical system specification.
