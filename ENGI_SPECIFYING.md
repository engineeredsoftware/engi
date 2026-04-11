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

> A promoted `ENGI_SPEC_VN.md` must itself be a full-system, full-reimplementability, full-auditability specification. An implementer, reviewer, operator, or auditor must be able to derive the current ENGI system behavior, contracts, artifacts, proofs, tests, promotion gates, accepted boundaries, and generated canon requirements from that version's canonical file family alone, without using older specs, source code, parity ledgers, or generated artifacts to recover missing whole-system meaning omitted from `SPEC`.

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

## 1.1 Drafting Input Rule

When drafting a new version, the minimum canonical input set is:
1. the current pointed `SPEC`,
2. the current generated `_PROVEN_`,
3. the current parity matrix,
4. the current canonical structured `.engi/vN-*` artifacts,
5. and any canon-named realization or adjunct documents required by the active spec family.

Optional notes may still be useful for local working context, but they are not required canonical inputs and must not override canonical files.

This rule exists because ENGI canon is no longer carried only by hand-authored prose.
Generated appendices, generated structured artifacts, and parity ledgers are now part of the depended-on canonical input surface for future version drafting.

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

`SPEC` is the primary bearer of that derivability.
`SPEC_DELTA`, `SPEC_PARITY_MATRIX`, `_PROVEN_`, and generated `.engi/vN-*` artifacts are required canonical supports, but they do not excuse a main spec that omits whole-system meaning.

## 2.1 `SPEC`-Alone Completeness

`SPEC` must stand on its own as the complete description of the current ENGI system.

That means `SPEC` itself must be:
- full-system,
- full re-implementability,
- full auditability,
- full operator-truth,
- full proof-obligation,
- full generated-canon,
- and full promotion-derivability.

The supporting canonical family then adds:
- `SPEC_DELTA` for version-local decisions and refinements,
- `SPEC_PARITY_MATRIX` for source/generated/test/promotion truth,
- `_PROVEN_` for generated proof rendering,
- and `.engi/vN-*` for generated structured evidence.

Those supporting files may sharpen, evidence, or operationalize canon.
They must not be required to supply omitted system semantics that the main `SPEC` failed to restate.

## 2.2 Derivability Requirements

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

## 2.3 No Silent Outsourcing

`SPEC` must not outsource whole-system meaning to:
- `SPEC_DELTA`,
- `SPEC_PARITY_MATRIX`,
- generated `_PROVEN_`,
- generated `.engi/vN-*` artifacts,
- source code,
- test files,
- earlier specs,
- or conversation history.

Those surfaces may confirm, materialize, or validate the spec.
They may not be the only place where current canonical behavior is defined.

If a current rule is only recoverable by inspecting:
- a parity row,
- a generated JSON report,
- a proof appendix section,
- a test assertion,
- or an older version file,

then the current `SPEC` is incomplete.

## 2.4 No Silent Inheritance

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

## 2.5 Precision Over Compression

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

## 2.6 Totality Requires Named Coverage Carriers

Full-system totality is not satisfied by having the right high-level section names.

A promoted `SPEC` must make omission visible through named, appendix-grade coverage carriers.
At minimum, the main `SPEC` must contain, directly or through appendices:
- a canonical type and surface catalog,
- a subsystem totality and derivability matrix,
- a proof family closure catalog,
- a generated artifact contract catalog,
- a current-version generated artifact family inventory or an explicit no-new-family statement,
- a validation and checking gate catalog,
- a current canonical source map,
- and an accepted boundary ledger.

Those carriers are not optional density improvements.
They are how the spec proves that it has not silently dropped part of the system.

If a current subsystem, artifact family, proof family, gate, principal class, branch mode, scenario class, or source-bearing implementation surface exists in canon but has no row or inventory entry in the current `SPEC`, the current `SPEC` is incomplete.

## 2.7 Total Precision Requires Exhaustive Enumerability

Total precision means that the major canonical sets are enumerable from the spec rather than inferred from repo memory.

At minimum, the current `SPEC` must enumerate where applicable:
- subsystem coverage items,
- canonical objects and emitted artifacts,
- proof families, members, and theorem ids,
- proof-family proof artifact paths, replay step ids, witness artifact paths, and current source-bearing generators,
- generated artifact families and stable paths,
- the active version's own generated artifact paths, ids, and generators when that version emits them,
- generated-artifact check commands or validating gates for each current canonical artifact family,
- validation commands and what each command proves,
- current source-bearing implementation paths,
- projection principals,
- branch modes,
- scenario ids or scenario classes,
- and accepted boundaries.

If a reviewer would need to open source or generated JSON just to discover what is in one of those current canonical sets, the spec is not yet precise enough.

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

If the active version introduces a new generated artifact family, promotion must:
- generate it,
- check it,
- and validate it again as part of the newly pointed canonical input family before promotion is considered complete.

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

For V21+, those status lines should use stable literal labels so source-side checks can validate them mechanically.
At minimum, the hand-authored canonical file family should expose:
- `Current canonical/latest target`,
- `Canonical proof-source commit` when the version is promoted,
- `Prior canonical anchor`,
- `Prior generated proof appendix` where one exists,
- `Generated structured artifact inventory`,
- `Source parity state`,
- and `Vn state`.

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

`SPEC_DELTA`, `SPEC_PARITY_MATRIX`, generated `_PROVEN_`, and generated `.engi/vN-*` artifacts are required companion surfaces, but they do not lower the main-spec responsibility.
If the whole system cannot be re-implemented or audited from `SPEC`, the version is structurally incomplete even when the companion files are strong.

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
The appendices are required totality carriers, not optional overflow.

V21+ source-side spec-family checkers are expected to validate this structure at least coarsely.
If a promoted `SPEC` is missing whole-system sections such as architecture, domain model, subsystem canon, proof canon, generated canon, validation canon, promotion canon, or accepted boundaries, the checker should be allowed to fail the version before promotion.

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

## 5.5 Totality Carrier Requirement

The top-level sections make the reading path clear.
They do not by themselves satisfy full-system totality.

Every promoted `SPEC` must also contain explicit appendix-grade carriers that let an auditor check for omission.
For V21+ those carriers must, at minimum, cover:
- canonical type and surface inventory,
- subsystem totality and derivability,
- proof family closure,
- an exact proof-family inventory matrix,
- generated artifact contracts,
- an exact generated-artifact inventory matrix,
- validation gates,
- current canonical source surfaces,
- and accepted boundaries.

When the version is changing specifying, promotion, or operator-quality canon directly, the appendix-grade carriers must also include:
- a canonical file-family and promotion contract catalog,
- and an operator surface and quality contract catalog.

Source-side structural checkers may validate the presence of those carriers and of required family or artifact subsections inside them.

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

## 6.3 Subsystem Totality Matrix

Every full `SPEC` must contain a subsystem totality and derivability matrix, either as its own section or as an appendix-grade equivalent.

Each row must identify:
- subsystem or concern,
- canonical objects, contracts, or emitted artifacts,
- proof-family or closure basis,
- generated or runtime evidence surfaces,
- validating tests or commands,
- current source-bearing implementation paths,
- and accepted boundary or reopen condition if applicable.

This matrix exists so omission is mechanically visible.
If one of the minimum subsystem coverage items in Section 6 has no row, the `SPEC` is structurally incomplete.

## 6.4 Cross-Product, Fail-Closed, and Deliverable Coverage

Whole-system derivability also requires explicit coverage of the system's current cross-products, fail-closed posture, and emitted deliverables.

Every full `SPEC` must therefore make the following visible in appendix-grade carriers or section-equivalent matrices:
- realization profiles to scenario-family coverage,
- current scenario ids to branch-mode coverage where branch mode changes proof, settlement, visibility, or operator meaning,
- projection principals to disclosure/projection coverage,
- operator workflow stages to surfaced truths and emitted evidence,
- fail-closed contract and error postures across the major subsystems,
- and current source-bearing deliverables/artifacts plus their generators, consumers, and fail-closed meaning.

If the current system depends on one of those cross-products or deliverables and the `SPEC` does not enumerate it explicitly, the `SPEC` is still density-incomplete even if its top-level sections look whole.

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

In addition to per-family prose, the appendix-grade proof carrier must include an exact inventory matrix whose rows enumerate:
- proof family id,
- proof artifact path,
- member ids,
- theorem ids,
- replay step ids,
- witness artifact paths,
- and current source-bearing implementation basis.

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

The normalized minimum per-family detail block should therefore make the following directly recoverable in the main `SPEC`:
- what the family proves,
- how current closure is carried in source and artifacts,
- the current member verdict shape,
- the current theorem-to-replay-step grouping,
- the generated-artifact and validating-test bindings,
- and the fail-closed conditions that would reopen the family.

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

Those bindings are not complete unless the current `SPEC` makes the exact family-to-artifact relationship recoverable without opening generated JSON or older specs.

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

The spec should normally define generated artifacts at two levels:
1. shared common fields across the artifact family,
2. and artifact-specific fields, counts, cells, steps, checks, summaries, or inventories.

If generated artifacts share common fields in runtime truth but the spec only names them generically, the artifact family is underspecified.

The spec must also distinguish clearly between:
- inherited generated artifact families still depended on by current canon,
- and the current version's own generated artifact family, if any.

If the current version emits version-local generated artifacts, `SPEC` must enumerate their stable paths, ids, roles, and source-bearing generators.
If it intentionally emits none, `SPEC` must say that explicitly rather than leaving the current-version artifact posture implicit.

The generated-artifact appendix must also include an exact inventory matrix whose rows enumerate:
- stable artifact path,
- stable id,
- artifact-family classification,
- canonical role,
- source-bearing generator or emitting entrypoint,
- primary validating command or check mode,
- and promotion-time inclusion posture.

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
- `drafted`,
- `implemented`,
- `substantially advanced`,
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

`drafted`, `implemented; promotion pending`, and `substantially advanced` are draft-phase judgments.
They are useful before canonical promotion, but they are not acceptable closure language for a promoted required row.

For promoted versions, required parity rows must no longer use transitional judgments such as:
- `drafted`,
- `implemented; promotion pending`,
- `spec closed; source gap`,
- `generated artifact pending`,
- `blocked`,
- `reopened`,
- or `substantially advanced`.

Those are draft-phase or reopening judgments.
A promoted parity matrix must either record `closed`, `accepted boundary`, `deprecated`, or `historical only` as appropriate.

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

For promoted-mode repository checks, the parity matrix should also expose a machine-readable implementation checklist table so status closure is not inferred only from prose.

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
12. prepare the hand-authored file family for promoted status truth,
13. advance `ENGI_SPEC.txt`,
14. generate `ENGI_SPEC_VN_PROVEN.md`,
15. generate required `.engi/vN-*` artifacts,
16. run generated check mode,
17. validate the newly pointed canonical input family after generation,
18. run `git diff --check`,
19. emit canonical commit message body,
20. and fail closed before pointer mutation if preconditions fail.

The preconditions are not limited to filenames.
Promotion-time checks may and should validate:
- required full-spec sections in `SPEC`,
- required decision/change sections in `DELTA`,
- required parity sections in `PARITY_MATRIX`,
- consistent status truth across the hand-authored family,
- and absence of stale promoted-status language.

If pointer mutation must occur before generation because the generator reads `ENGI_SPEC.txt`, the promotion command must fail closed and immediately check generated output after mutation.
That post-mutation validation must include any new current-version generated artifact family.

If the hand-authored family still truthfully points at the prior canonical target during draft mode, the promotion workflow must include a dedicated preparation step that rewrites the hand-authored status truth to the promoted posture before post-mutation validation runs.

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

A full `SPEC` must include appendices or appendix-equivalent sections for:
- canonical type and surface catalog,
- subsystem totality and derivability matrix,
- proof family closure catalog,
- generated artifact contract catalog,
- validation and checking gate catalog,
- current canonical source map,
- scenario, workflow, and cross-product contract catalog,
- fail-closed contract and error posture matrix,
- source-bearing deliverable and artifact contract catalog,
- accepted boundaries or an accepted-boundary ledger.

Depending on the version, it should also include:
- inference and evaluator contract detail,
- member and theorem catalogs,
- artifact and deliverable contracts,
- scenario and workflow matrices,
- test coverage expansions,
- and promotion checklists.

When specifying/promotion canon is a direct version focus, appendices should additionally carry:
- exact file-family responsibility matrices,
- status-truth schema tables,
- promotion phase matrices,
- and canonical commit-body derivation inputs.

When operator-quality canon is active or inherited as depended-on current truth, appendices should additionally carry:
- operator transcript flow inventories,
- visual state inventories,
- accessibility check inventories,
- performance operation inventories,
- and projection-quality principal matrices or equivalent inventories.

Appendices are canonical.
They are not loose notes.
They must contain current inventories and matrices, not placeholder prose about future appendices.

---

# 18. Full-Spec Completion Checklist

A full ENGI `SPEC` is structurally complete only when:
1. the current system can be understood without reading older specs,
2. implementation contracts are precise enough to build from,
3. generated artifacts are named and shaped,
4. subsystem totality is carried by explicit coverage matrices or catalogs,
5. proof families, members, and theorems are closed or explicitly bounded,
6. test gates are named,
7. promotion gates are named,
8. source references are parity-bearing,
9. operator surfaces are specified where canonical,
10. accepted boundaries have reopen conditions,
11. `DELTA` contains version-local decisions only,
12. `PARITY_MATRIX` honestly records source/generated/test/promotion truth,
13. `_PROVEN_` is generated and checkable when promoted,
14. `.engi/vN-*` artifacts are generated and checkable when required,
15. stale draft language is absent after promotion,
16. required appendix-grade coverage carriers exist and are populated with current canon,
17. scenario/workflow/principal/branch cross-products are explicit where current canon depends on them,
18. fail-closed contract posture is cataloged rather than implied,
19. source-bearing deliverables and artifacts are enumerated with generators and consumers,
20. and `ENGI_SPEC.txt` points to the promoted version only in the same commit that includes required generated canon.

If any item fails, the version may still be a useful draft, but it is not a complete canonical system specification.
