# ENGI Spec V25 Parity Matrix

## Status

- Scope: V25 canonical parity ledger for a simple but full project rename from ENGI to Bitcode and denomination rename from NGI to BTD
- Current canonical/latest target: `V25`
- Canonical proof-source commit: `db25cc83898c6c7b7df1130033ecd3737cfc04cd`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; `ENGI_SPEC_V25_PROVEN.md` is the active generated proof appendix for V25
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Source parity state: V25 source-side Bitcode/BTD rename closure, brand-aware generated evidence, runtime/demo/site rename alignment, and promotion-time rename preparation are canonicalized; parity truth is aligned with the promoted V25 file family
- V25 state: canonical promotion complete; parity truth, runtime posture truth, rename closure, and generated canon are aligned for V25
- Last fully realized canonical target preserved in source: `V25`

## Purpose

This file records the canonical parity ledger between:
- active V25 canon,
- the promoted Bitcode/BTD rename target,
- the current runtime, generated evidence, and build-process surfaces,
- and the accepted compatibility boundaries that remain intentionally stable in V25.

## V25 implementation matrix (formerly V25 draft implementation matrix)

| Area | Current source truth | V25 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Canonical file family presence | V25 active family exists and V26 is the next draft target | V25 requires the full promoted file family plus a matching V26 draft opening | V25 spec, delta, parity, notes, and `_PROVEN_` files exist and canon posture points to `V26` next | implemented |
| Version center | V24 centered external realization | V25 centers full project rename to Bitcode without semantic drift | V25 main spec defines rename-first invariance posture and promoted rename closure | implemented |
| Full-system rewrite discipline | V25 main spec restates current whole-system canon under Bitcode branding | V25 must remain full-system even though the version change is rename-first | promoted V25 does not depend semantically on V24 for current truth | implemented |
| System and product naming | active current-facing system identity is Bitcode in runtime, API, demo, and website surfaces | V25 requires Bitcode as the active product/system label | active current-facing surfaces present Bitcode as the current identity | implemented |
| Denomination naming | active current-facing denomination identity is BTD across settlement and ledger surfaces | V25 requires BTD as the active denomination label | active settlement and ledger surfaces present BTD as the current denomination | implemented |
| Artifact namespace naming | internal emitted namespace remains `.engi/*` by deliberate compatibility choice | V25 must make namespace treatment explicit rather than implicit | namespace treatment is explicit, stable, and tested | implemented |
| Generated evidence naming | active proof appendix and generated reports are V25-local and Bitcode-facing where current-facing | V25 must implement and test generated naming treatment | generated headings and report paths match promoted V25 truth | implemented |
| Runtime and API naming | runtime/API summaries and active labels are Bitcode/BTD-aware | V25 must rename active runtime/API identity surfaces to Bitcode and BTD | active runtime/API naming is rename-complete | implemented |
| Demo and website naming | active demonstration and website posture are Bitcode-facing | V25 must rename active UI copy to Bitcode | public/operator surfaces identify as Bitcode | implemented |
| Build and process naming | spec-quality, promotion, and CI/CD messaging are Bitcode-facing where they describe the current system | V25 must rename process-facing current-system copy without destabilizing tooling carriers | build/process messaging is rename-aligned | implemented |
| Semantic invariance | V24 proof, settlement, disclosure, and external-interface behavior remain active truth under the rename | V25 must preserve V24 semantics unless explicit change is declared | regression suite proves rename without behavioral drift | implemented |
| Compatibility and migration | V25 keeps `.engi/*`, `ENGI_SPEC_*`, and ENGI-prefixed internal tooling carriers stable by design | V25 must state compatibility and migration policy explicitly | compatibility boundaries and migration notes are implemented and explicit | implemented |
| Recommended narrowing posture | V25 intentionally chose the medium-risk rename-first path rather than a full namespace migration | V25 should rename active current-facing identity while keeping selected internal compatibility carriers stable | promoted V25 records and implements that narrowing choice | implemented |
| Generated evidence | `ENGI_SPEC_V25_PROVEN.md` and `.engi/v25-*` reports exist | V25 requires its own generated evidence proving rename closure | V25 `_PROVEN_` and generated reports exist and pass promoted checks | implemented |
| Canon promotion | `ENGI_SPEC.txt` points to `V25` and canon posture is `V25`/`V26` | V25 promotes only after rename closure is proven | pointer, canon posture, and generated evidence all align | implemented |

## V25 implementation checklist (formerly V25 draft implementation checklist)

| Area | Required V25 result | Current judgment |
| --- | --- | --- |
| File family | V25 promoted file family exists | implemented |
| Rename center | V25 is explicit that it is rename-first | closed |
| Semantic invariance | V25 preserves V24 behavior by default | implemented |
| Rename matrix | V25 enumerates all required rename surfaces | implemented |
| Namespace treatment | V25 makes artifact namespace treatment explicit | implemented |
| Denomination treatment | V25 renames NGI to BTD while preserving V24 settlement semantics | implemented |
| Narrowing defaults | V25 records and implements the compatibility-carrier narrowing choice | implemented |
| Compatibility rules | V25 states explicit compatibility and migration policy | implemented |
| Generated evidence | V25 `_PROVEN_` and generated reports exist | implemented |
| Promotion gate | V25 rename-complete generated evidence exists before activation | implemented |

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
