# ENGI Spec V25 Parity Matrix

## Status

- Scope: V25 draft parity ledger for a simple but full project rename from `ENGI` to `Bitcode` and denomination rename from `NGI` to `BTD`
- Current canonical/latest target: `V24`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v24-spec-family-report.json`, `.engi/v24-canonical-input-report.json`, and `.engi/v24-canon-posture-drift-report.json`; `ENGI_SPEC_V24_PROVEN.md` is the active generated proof appendix for V24
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V24`
- V25 state: draft parity ledger opened; V24 remains active while V25 defines rename-complete closure

## Purpose

This file records the draft parity ledger between:
- active V24 canon,
- the intended Bitcode rename target,
- the current runtime and generated surfaces,
- and the still-open rename decisions that must close before promotion.

## V25 draft implementation matrix

| Area | Current source truth | V25 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Canonical file family presence | V24 active family exists; no V25 family existed before this draft opening | V25 requires a full draft file family while V24 remains active | V25 spec, delta, parity, and notes files exist | specified |
| Version center | V24 centers external realization | V25 centers full project rename to Bitcode without semantic drift | V25 main spec defines rename-first invariance posture | specified |
| Full-system rewrite discipline | V24 repaired no-silent-inheritance discipline | V25 must remain full-system even though the version change is “just” a rename | promoted V25 may not depend semantically on V24 for current truth | specified |
| System and product naming | active system identity is ENGI | active project/system identity becomes Bitcode | active surfaces present Bitcode as the current identity | specified |
| Denomination naming | active denomination identity is NGI | active denomination identity becomes BTD | active settlement and ledger surfaces present BTD as the current denomination | specified |
| Artifact namespace naming | active emitted namespace is `.engi/*` | V25 must explicitly implement and test the treatment of artifact namespace naming | namespace treatment is explicit and consistent | specified |
| Generated evidence naming | active proof appendix and generated reports use ENGI-facing headings and V24 artifact names | V25 must explicitly implement and test generated naming treatment | generated headings and report paths match promoted V25 truth | specified |
| Runtime and API naming | runtime/API summaries still use ENGI-facing copy in places | V25 must rename active runtime/API identity surfaces to Bitcode | active runtime/API naming is rename-complete | specified |
| Demo and website naming | active demonstration and website posture are ENGI-facing | V25 must rename active UI copy to Bitcode | public/operator surfaces identify as Bitcode | specified |
| Build and process naming | spec-quality, promotion, and CI/CD messaging are ENGI-facing | V25 must rename process-facing copy where it describes the current system | build/process messaging is rename-aligned | specified |
| Semantic invariance | V24 proof, settlement, disclosure, and external-interface behavior are active truth | V25 must preserve V24 semantics unless explicit change is declared | regression suite proves rename without behavioral drift | specified |
| Compatibility and migration | no V25 rename bridges exist yet | V25 must explicitly define compatibility and migration for renamed paths and interfaces | rename bridges and migration notes are implemented where needed | specified |
| Recommended narrowing posture | V25 draft currently opens several possible rename depths | V25 should default to renaming active current-facing identity while keeping internal compatibility carriers stable unless explicitly widened | draft records a recommended default for `.engi/*`, `ENGI_SPEC_*`, and `NGI` treatment | specified |
| Generated evidence | V24 `_PROVEN_` and `.engi/v24-*` reports exist | V25 requires its own generated evidence proving rename closure | `ENGI_SPEC_V25_PROVEN.md` and required `.engi` or successor reports exist | specified |
| Canon promotion | `ENGI_SPEC.txt` points to `V24` | V25 promotes only after rename closure is proven | pointer, canon posture, and generated evidence all align | specified |

## V25 draft implementation checklist

| Area | Required V25 result | Current judgment |
| --- | --- | --- |
| Draft family | V25 draft file family exists | specified |
| Rename center | V25 is explicit that it is rename-first | specified |
| Semantic invariance | V25 preserves V24 behavior by default | specified |
| Rename matrix | V25 enumerates all required rename surfaces | specified |
| Namespace treatment | V25 opens artifact namespace treatment explicitly | specified |
| Denomination treatment | V25 explicitly renames NGI to BTD while preserving V24 settlement semantics | specified |
| Narrowing defaults | V25 records the default scope-narrowing recommendation for compatibility carriers | specified |
| Compatibility rules | V25 requires explicit compatibility and migration policy | specified |
| Promotion gate | V25 requires rename-complete generated evidence before activation | specified |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| V25 is not a new architecture version | the version center is rename completeness, not new behavior | Reopen only if explicit semantic change is intentionally added |
| V25 may preserve some ENGI historical references for provenance | historical audit and prior-version references remain legitimate | Reopen only if provenance treatment becomes user-confusing or legally insufficient |
| Repo-local draft filenames may remain `ENGI_SPEC_V25*` during drafting | spec-quality and promotion tooling are still built around the existing file-family convention | Reopen when deciding final promoted file-family treatment |
| `.engi/*` may remain stable in V25 | keeping the internal emitted namespace stable keeps the version rename-first instead of namespace-migration-first | Reopen only if a stronger namespace rename requirement is chosen deliberately |

## Completion condition

This parity file is complete for V25 only when:
1. every rename surface is represented,
2. semantic invariance is represented as a closure condition,
3. compatibility and migration are represented as closure conditions,
4. namespace and denomination treatment are explicit,
5. generated V25 evidence exists,
6. and the promotion gate is satisfied rather than implied.
