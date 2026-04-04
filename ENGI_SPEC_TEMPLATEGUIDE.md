# ENGI Spec Template Guide

Status: canonical drafting guide for future ENGI `_VN_` spec releases
Scope: file-family expectations, section schema patterns, density requirements, pedagogy requirements, appendix architecture, parity conventions, and version-status rules for full enriched ENGI specs
Applies to:
- future canonical ENGI `_VN_` spec files,
- associated `_VN_` notes files,
- associated implementation matrices,
- and any parity-bearing adjunct documents referenced as part of canon

Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V14.md`

---

# 1. Purpose

This guide extracts and formalizes the V13 structure and formality rules into a reusable drafting standard for all future enriched ENGI specs.

Its job is not to redesign ENGI.
Its job is to define how future versions should write ENGI canon so that:
- whole-system understanding is recoverable from the docs,
- source/spec parity is deliberate rather than accidental,
- later design truth is preserved,
- earlier useful explicitness is restored where needed,
- and the canonical ENGI file family stays coherent across versions.

The core guide rule is:

> A full enriched ENGI spec release MUST be written so that an implementer, reviewer, operator, or auditor can recover the operating model, formal structures, artifact contracts, proof obligations, host/runtime truth, validation expectations, and parity boundaries without reverse-engineering the repository from source alone.

---

# 2. Canonical status and versioning rules

Every serious ENGI versioned spec release MUST distinguish:
1. the current canonical/latest target,
2. the last fully realized canon,
3. the currently preserved structural drafting standard when that is relevant,
4. and the current implementation target or baseline when source realization lags the newest formalization.

The versioning rules are:
1. `ENGI_SPEC.txt` is the only canonical pointer.
2. A newer `_VN_` file does not become canonical merely because it exists.
3. Prior versions MUST remain preserved.
4. If the pointer target differs from the last fully realized canon, that split MUST be stated explicitly in the main spec, notes file, and implementation matrix.
5. A spec MUST NOT imply that pointer status automatically means full source realization.

Required terminology:
- `current canonical/latest target`
  The version named by `ENGI_SPEC.txt`.
- `last fully realized canon`
  The newest version whose semantics and implementation baseline are already fully realized and stable enough to act as the preserved design anchor.
- `structural drafting standard`
  The version whose primary role was to define spec-file formality and structure rather than to fully rewrite the whole product canon.

If a version preserves older semantic anchors for trace continuity, it MUST explain:
- why those anchors are being preserved,
- which implementation or operator surfaces depend on them,
- and whether the preservation is semantic or merely traceability-oriented.

---

# 3. Canonical file-family expectations

A full enriched ENGI release SHOULD normally include the following file family:

1. `ENGI_SPEC_VN.md`
   The canonical full spec.
2. `ENGI_SPEC_VN_NOTES.md`
   The version-local drafting rationale, interpretation notes, numbering decisions, and clarification record.
3. `engi-demo/SPEC_VN_IMPLEMENTATION_MATRIX.md`
   The parity ledger between the versioned spec and current repository truth.
4. `ENGI_SPEC_VN_INFORMATION_AUDIT.md`
   Required when a version is materially recovering lost density, parity, or conceptual coverage from earlier canon.
5. optional parity-bearing adjunct files
   Examples include host capability documents, architecture maps, or other structured reference artifacts that the canonical spec relies on directly.

File-family rules:
1. The spec file is the authoritative product/system/design artifact.
2. The notes file is where drafting posture, preserve/restore decisions, numbering choices, and version-local interpretation guidance live.
3. The implementation matrix is where parity, accepted boundaries, and remaining lag are recorded plainly.
4. If adjunct files are used as canonical parity surfaces, the spec MUST name them explicitly and the matrix MUST judge whether they are aligned.
5. Notes and matrix MUST repeat the same pointer/latest-target vs last-fully-realized-canon interpretation as the main spec.

The implementation matrix is not optional bookkeeping for a serious release.
It is the ledger that separates:
- true parity closure,
- intentionally modeled boundaries,
- and still-open repo/documentation lag.

## 3.1 Matrix honesty and closure language

The implementation matrix MUST be willing to describe partial closure precisely.

Preferred judgment language includes:
- `closed`
- `spec closed; source gap`
- `substantially advanced`
- `adjunct-doc lag`
- `accepted boundary`
- `low-risk follow-up`

Matrix-honesty rules:
1. A row MUST NOT be marked `closed` merely because the spec now defines the topic well if the current source still lacks the named builder, artifact, receipt, or witness surface the spec relies on.
2. If the spec is formally complete but source realization still trails, the matrix SHOULD say so explicitly rather than compressing everything into binary open/closed language.
3. If adjunct docs are ahead or behind the matrix's previous assumption, the matrix MUST be corrected to the current repo truth rather than preserving stale review language.
4. False closure is worse than explicit debt because it hides where the next realization work actually belongs.

---

# 4. Executive summary drafting rules

Every full enriched ENGI spec SHOULD use an explicit executive-summary split:
1. `Version executive summary`
2. `Canonical ENGI executive summary`

These two summaries serve different jobs and MUST NOT be collapsed into one blurred opening.

## 4.1 Version executive summary

The version executive summary explains the current drafting pass as a versioned event.
It SHOULD state:
- why this version exists,
- what prior version or guide it is realizing or correcting,
- what it newly strengthens or restores,
- what it deliberately does not redesign,
- whether it is the current canonical/latest target,
- whether a different version remains the last fully realized canon,
- and what interpretive nuance a reader must keep in mind for this pass.

Version-summary rules:
1. It SHOULD mention the current pointer state if that matters.
2. It SHOULD mention the last fully realized canon if that differs from the pointer target.
3. It SHOULD mention the structural drafting standard if the version is implementing one.
4. It SHOULD summarize newly restored explicitness and newly tightened parity surfaces.
5. It MUST avoid replacing the product definition of ENGI with version bookkeeping alone.

## 4.2 Canonical ENGI executive summary

The canonical ENGI executive summary explains what ENGI is, independent of why the current draft exists.
It SHOULD state:
- the product/system identity,
- the canonical operator chain,
- the main subsystem families,
- the central design principles,
- and the canonical closure path from need through proof and settlement.

Canonical-summary rules:
1. It MUST read as the summary of ENGI itself, not as release notes.
2. It SHOULD remain stable across nearby versions unless the actual product design changes.
3. It SHOULD not be overloaded with version-status bookkeeping.
4. It SHOULD make the operating chain legible before deep appendices are needed.

---

# 5. Whole-ENGI design coverage expectations

A full enriched ENGI spec is expected to cover the whole system, not just the hottest current subsystem.

Minimum whole-system coverage includes:
1. versioning, source-of-truth hierarchy, and file-family interpretation,
2. product goals, non-goals, and design principles,
3. repo supply and depositing,
4. needing and measured demand,
5. depositing-to-needing fit as a first-class relation,
6. demonstration profiles and profile semantics,
7. operator ordering, pedagogy, and explainer parity,
8. artifact-kind-native interaction, recall, ranking, verification, and materialization,
9. identity, authorization, signing, and authority transitions,
10. proof model, proof obligations, and witness closure,
11. settlement, source-to-shares, journal diff, and accounting invariants,
12. boundary realism, projection, disclosure, and redaction,
13. telemetry, persistence, failure semantics, and validation,
14. host capabilities, execution environments, containerization, and boundary-program truth,
15. appendices that make the above material exhaustive enough to audit.

Coverage rules:
1. If a subsystem is intentionally modeled rather than executed, the spec MUST still cover it as boundary truth.
2. If a subsystem is intentionally out of scope for the current profile, the spec MUST say so explicitly rather than omitting it silently.
3. Whole-system coverage MAY still preserve a clear fast path, but the deep path MUST exist somewhere in the file family.

---

# 6. Canonical section-schema patterns

For each major subsystem section, the default expectation is:
1. role or purpose,
2. normative requirements,
3. canonical structures, types, or schemas,
4. invariants, obligations, or theorem-style checks,
5. operator meaning,
6. current source/parity references,
7. appendix references where exhaustive detail lives.

This pattern SHOULD be applied consistently rather than only to selected sections.

Allowed section enrichments include:
- current implementation reading,
- boundary interpretation,
- current completion condition,
- acceptance criteria for parity,
- or configuration/host truth when the subsystem depends on execution environment facts.

Section-schema rules:
1. A reader SHOULD be able to understand the subsystem by reading one section top to bottom.
2. Deep appendix material SHOULD extend the main section, not replace it.
3. If stable semantic numbering matters for source/UI/test traceability, later versions SHOULD preserve that numbering or provide an explicit remapping table.
4. A section SHOULD avoid jumping directly from informal overview to raw schemas without stating role and requirements first.

---

# 7. Density requirements

Density is a requirement for a full enriched ENGI spec, not a side effect.

The spec SHOULD be dense enough to carry:
- whole-system coverage,
- precise formal structures,
- explicit obligations and invariants,
- scenario/example material,
- parity references,
- and sufficient explanation to avoid reverse-engineering from source alone.

Density rules:
1. Thousands of lines are acceptable when that is what full coverage requires.
2. Compression is not a virtue when it drops canonical detail.
3. Density should come from coverage, schemas, examples, appendices, and parity references.
4. Density SHOULD NOT come from redundant restatement or shapeless prose.
5. If a topic is important enough to be canonical, it SHOULD usually be explicit enough to quote or audit directly from the spec.

---

# 8. Pedagogy requirements

The canonical ENGI spec must teach the system while formalizing it.

Pedagogical requirements:
1. The opening path SHOULD make the operator chain legible before deep internals.
2. Major sections SHOULD begin with a concise purpose statement.
3. Formal structures SHOULD be followed by an operator-meaning explanation when interpretation matters.
4. Fast-path understanding and deep-path auditability SHOULD coexist.
5. Cross-references to appendices SHOULD be explicit so the reader knows where to go deeper.
6. Scenario/example material SHOULD demonstrate both targeted and normalization-heavy system behavior where those profiles exist.
7. UI explainers, tooltips, visual/raw dual renderings, and similar operator-experience surfaces MUST be treated as canonical when correctness depends on how operators interpret them.

Pedagogy is not separate from rigor.
In ENGI, pedagogy is part of correctness whenever misunderstanding the system would distort operator or reviewer judgment.

---

# 9. Code/source reference conventions

Full enriched ENGI specs MUST use deliberate source-reference conventions.

Preferred reference form:
- repo-relative file path,
- function or builder name where meaningful,
- emitted artifact or operator surface,
- validating test entrypoint where available,
- optional line reference only when stable and actually useful.

Examples:
- `engi-demo/src/engi-demo.js -> buildDepositingSurface(...)`
- `engi-demo/public/app.js -> renderDepositingSurfaceVisual(...)`
- `engi-demo/test/e2e.test.js -> browser ordering validates canonical operator chain`

Reference rules:
1. Source references are parity-bearing, not ornamental citations.
2. References SHOULD let a reader locate the current implementation of a spec concept.
3. References SHOULD also help a reader locate the artifact-producing path and validating tests where relevant.
4. UI and explainer surfaces MUST be referenced when operator correctness depends on them.
5. Host capability and configuration adjunct docs SHOULD be referenced when the spec treats them as canonical execution-truth surfaces.

A full enriched spec SHOULD include a dedicated spec-to-source parity appendix.

---

# 10. Appendix architecture

Appendices are part of canonical ENGI design, not optional overflow.

The default appendix set for a full enriched spec is:
- Appendix A — precise type and schema appendix
- Appendix B — evaluator and inference appendix
- Appendix C — proof obligations and witness appendix
- Appendix D — artifact and deliverables appendix
- Appendix E — scenario and example appendix
- Appendix F — test coverage appendix
- Appendix G — spec-to-source parity appendix

When a version is doing major information recovery, a separate information-audit file SHOULD also be considered.

Each appendix SHOULD follow an internal pattern:
1. scope or purpose,
2. canonical structures or obligation catalog,
3. invariants, rules, or completeness conditions,
4. current source references,
5. examples, traceability notes, or coverage notes where relevant.

Appendix rules:
1. Appendices SHOULD be internally structured rather than dumped as loose notes.
2. Appendix material SHOULD be exhaustive enough to support audit and implementation.
3. Appendix claims that matter for parity SHOULD be reflected in the implementation matrix.
4. When an appendix defines a stronger normative model than the current source fully emits, the file family SHOULD include an explicit current-implementation reading or parity-delta note rather than implying hidden closure.

---

# 11. Special handling requirements

Certain ENGI areas require more than ordinary subsystem prose.
They require dedicated appendix architecture and explicit drafting standards.

## 11.1 Inference and evaluator contracts

For inference/evaluator material, a full enriched spec MUST define:
- every inference-bearing or evaluator-bearing moment,
- stable evaluator or program ids,
- mode classification such as deterministic/static, inferred, hybrid, or policy-derived,
- prompt template identity and version when prompts are involved,
- prompt contracts and completeness expectations,
- context injectables and whether they are rendered or non-rendered,
- owned output fields or receipt families,
- output schemas and parsable completion contracts where relevant,
- downstream artifacts or consumers,
- telemetry, failure, and hand-off rules,
- and stand-in vs live boundary truth.

Inference/evaluator rules:
1. The spec MUST distinguish deterministic/static results from inferred or hybrid results.
2. Prompt-bearing surfaces MUST state exact owned outputs, not just general intent.
3. Parsable completion rules MUST say what happens on malformed output.
4. Downstream deterministic system responsibilities MUST remain explicit.

## 11.2 Proofs, witnesses, and theorem obligations

For proof material, a full enriched spec MUST define:
- proof families,
- family definitions,
- subsystem obligations,
- witness structures,
- proof object shapes,
- theorem catalog or invariant catalog,
- witness-manifest closure rules,
- and the relation between private proof closure, bounded public proof, disclosure proof, and settlement closure.

Proof rules:
1. Proof MUST be treated as a family of obligations, not as one vague bundle.
2. Each major subsystem SHOULD map to explicit proof families or obligations.
3. The theorem catalog SHOULD identify what exact checks are expected to hold.
4. Witness-manifest closure MUST explain how proof-relevant artifacts are digested or represented.

## 11.3 Test coverage

For validation material, a full enriched spec MUST define:
- unit coverage,
- API coverage,
- browser e2e coverage,
- scenario-family coverage,
- proof and settlement coverage,
- projection/disclosure coverage,
- adversarial and malformed-input coverage,
- and operator-experience parity coverage where interpretation matters.

Browser e2e validation is canonical when the operator story depends on ordered UI understanding.

## 11.4 Spec-to-source parity

For parity material, a full enriched spec MUST define:
- primary implementation files,
- builder/function maps,
- artifact-producing paths,
- validating test entrypoints,
- UI parity surfaces,
- accepted boundaries,
- and any adjunct canonical documents that materially affect interpretation.

Accepted boundaries MUST be stated explicitly and MUST NOT be mistaken for silent parity failure.

## 11.5 Operator-experience parity surfaces

Explainers, tooltips, spec references, visual/raw dual surfaces, ordered panels, and similar operator-experience material are canonical when they carry product truth rather than ornamental UX.

When operator-experience surfaces are canonical, the spec SHOULD define:
- what concepts they explain,
- what formal artifacts they summarize,
- what spec sections they trace to,
- what contradictions are forbidden,
- and how tests or parity review confirm the surfaces stay aligned.

## 11.6 Host capabilities and execution truth

When host/runtime truth matters, a full enriched spec MUST define:
- the role host capability truth plays in ENGI correctness,
- host capability categories,
- bootstrap, furnishing, and configuration expectations,
- containerization expectations,
- telemetry and safety expectations,
- and the relation between host execution, static-analysis measurement truth, proof-program truth, and remote-program boundaries.

The minimum host capability category set SHOULD include:
- runtime programs,
- machine-local programs,
- static-analysis programs,
- proof programs,
- remote-program boundaries.

Host-truth rules:
1. Machine-local presence MUST NOT be conflated with core-path requirement.
2. Static-analysis measurement truth MUST say whether evidence came from in-process logic, subprocess execution, upstream evidence, or remote systems.
3. Proof-program presence MUST NOT be confused with live proof-program execution.
4. Containerization MUST be described as an execution configuration, not as implied production readiness.
5. Human-readable and structured host capability documents SHOULD stay aligned with the canonical spec status when they are referenced by the spec.

## 11.7 Settlement and exact accounting closure

For settlement/accounting material, a full enriched spec MUST define:
- source-to-shares derivation inputs and scoring weights,
- contribution entries and clipping decisions,
- normalization method and tie-break policy,
- raw shares and settled shares,
- settlement participation versus positive credit,
- zero-credit or zero-point participation semantics,
- micro-unit allocation,
- journal entries and journal diff structure,
- exact accounting invariants,
- and proof linkage between source-to-shares, participation, accounting precision, settlement proof, and journal closure.

Settlement/accounting rules:
1. The spec MUST distinguish selected assets, settlement-participating assets, positively credited assets, and zero-credit participants when those sets can differ.
2. Zero-credit or zero-point participation MUST stay explicit rather than being erased from previews, participation artifacts, or journal reasoning.
3. Clipping, normalization, and tie-break behavior MUST be replayable from declared receipts or deterministic traces.
4. Debit/credit conservation and non-negative balance expectations MUST be stated as exact invariants, not vague accounting intent.
5. If current source uses a concrete label such as `zero-credit` for a broader semantic idea such as zero-point participation, the spec SHOULD state that equivalence explicitly rather than forcing the reader to infer it.

---

# 12. Drafting rules for preserving later design truth while restoring earlier explicitness

This guide preserves the V13 rule for conflicts between old explicitness and newer design truth:

> Preserve the newer design truth and restore explicitness around that newer truth rather than reverting to obsolete structure or semantics.

Practical implications:
1. Use older dense versions to recover clarity, schemas, obligations, examples, and appendix richness.
2. Do not use older versions to pull ENGI back toward superseded product centers or stale framing.
3. If a later version established a better operator chain or subsystem identity, explicitness recovery must wrap that later truth.
4. Trace continuity MAY preserve older numbering or labels when current source/UI/test surfaces depend on them, but that preservation must be explained explicitly.
5. A longer spec is acceptable if the added material clarifies real obligations, parity, or system understanding.

---

# 13. Drafting checklist

A future full enriched ENGI release is in good structural shape when all of the following are true:
1. the file family is complete and internally coherent,
2. the main spec separates the version executive summary from the canonical ENGI executive summary,
3. pointer/latest-target vs last-fully-realized-canon status is explicit wherever relevant,
4. whole-ENGI design coverage is present,
5. major sections follow a disciplined schema pattern,
6. appendices are structured and complete,
7. inference/evaluator contracts are explicit,
8. proof families, subsystem obligations, witness structures, and theorem checks are explicit,
9. test coverage expectations include browser e2e and operator-experience parity where canonical,
10. spec-to-source references are deliberate and parity-bearing,
11. host capability and execution-truth surfaces are explicit when relevant,
12. source-to-shares, zero-credit participation, journal invariants, and exact accounting closure are explicit when relevant,
13. notes and implementation matrix agree with the main spec,
14. prior versions remain preserved,
15. accepted boundaries are explicit rather than hidden,
16. the implementation matrix uses honest closure language rather than premature `closed` judgments.

This guide is the cross-version drafting standard.
Individual `_VN_` specs remain the product/system canon for their own release, but they SHOULD now be written against this guide rather than rediscovering the structure each time.
