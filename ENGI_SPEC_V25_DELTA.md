# ENGI Spec V25 Delta

## Status

- Scope: V25 canonical delta for a simple but full project rename from ENGI to Bitcode and denomination rename from NGI to BTD after V24 external-realization canon
- Current canonical/latest target: `V25`
- Canonical proof-source commit: `db25cc83898c6c7b7df1130033ecd3737cfc04cd`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; `ENGI_SPEC_V25_PROVEN.md` is the active generated proof appendix for V25
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V24`
- Source parity state: V25 source-side Bitcode/BTD rename closure, brand-aware generated evidence, runtime/demo/site rename alignment, and promotion-time rename preparation are canonicalized; this delta records the V24-to-V25 closure
- V25 state: canonical promotion complete; V25 rename canon is active and this delta records the promoted Bitcode/BTD closure set

## Why V25 exists

V24 closed:
- real external interfacing,
- exhaustive telemetry,
- build-process enforcement,
- generated proof closure,
- and full-canon conformance repair.

That leaves a simpler next move:
- rename the project and current system identity from ENGI to Bitcode,
- rename the current denomination identity from NGI to BTD,
- preserve V24 behavior,
- and make the rename complete enough that active system surfaces no longer present a mixed identity.

## Findings that drive V25

### 1. The rename must be treated as system work, not cosmetic work

Names now appear in:
- current canonical specs,
- generated appendices,
- emitted artifact namespaces,
- runtime posture and API summaries,
- demo and website copy,
- README and investor-facing docs,
- build-process messaging,
- and external-interface receipts.

V25 therefore must define and implement a rename matrix, not a loose cleanup.

### 2. Rename completeness and semantic invariance must both be enforced

V25 fails if:
- ENGI remains the active public-facing name on current surfaces after promotion,
- or the rename accidentally changes proof, settlement, disclosure, or external-interface behavior.

### 3. Compatibility must be explicit

If V25 changes:
- emitted artifact paths,
- generated artifact names,
- API shapes,
- or environment/config naming,
then the migration and compatibility rule must be written, implemented, and tested.

## Accepted V25 drafting decisions

The accepted V25 drafting decisions are:

1. V25 is rename-first.
2. The rename target is Bitcode.
3. The denomination rename target is BTD.
4. V24 remains the active behavioral baseline during drafting.
5. Rename completeness and semantic invariance are both required.
6. Repo-local spec tooling may continue to use the `ENGI_SPEC_V25*` file-family during drafting and implementation.
7. The rename treatment for `.engi/*` and generated report names must be made explicit before promotion.

## Recommended default closure for V25

The current draft recommends the narrowest promotion-safe closure:
- rename active product/system identity to Bitcode,
- rename active denomination identity to BTD,
- keep `.engi/*` as the internal emitted namespace in V25 unless later migration value is explicit,
- keep `ENGI_SPEC_V25*` as the repo-local spec file family,
- keep ENGI-prefixed script/tool names where they are internal carriers rather than current product posture,
- and avoid widening into an emitted-namespace or repo-tooling rename unless later migration value is explicit.

This preserves the “simple but full rename” center:
- full rename at active current-facing surfaces,
- full denomination rename at active current-facing settlement and ledger surfaces,
- explicit compatibility at internal carriers,
- no accidental widening into a denomination or namespace migration version.

## Planned delta surface

The V24-to-V25 delta is expected to include:
- system and product naming,
- denomination naming,
- artifact and namespace naming,
- generated evidence naming,
- API and UI naming,
- build/process and quality gate naming,
- compatibility and migration rules,
- and any explicit treatment of denomination naming.

## Explicitly deferred

V25 does not open:
- a new external-interface architecture,
- a new proof architecture,
- a new settlement model,
- or a rename-driven feature expansion.

## Draft implementation sequence

The planned V25 sequencing is:

1. draft the V25 file family,
2. enumerate the complete rename matrix,
3. decide namespace and denomination treatment,
4. implement active-surface rename closure,
5. implement compatibility bridges where rename breaks existing paths,
6. add rename-conformance tests and generated evidence coverage,
7. and promote only after rename completeness and semantic invariance are both proven.
