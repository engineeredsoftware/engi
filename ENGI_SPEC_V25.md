# ENGI Spec V25

## Status

- Scope: V25 canonical system specification for a simple but full project rename from ENGI to Bitcode, including denomination rename from NGI to BTD, after V24 external-realization canon
- Current canonical/latest target: `V25`
- Canonical proof-source commit: `db25cc83898c6c7b7df1130033ecd3737cfc04cd`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; `ENGI_SPEC_V25_PROVEN.md` is the active generated proof appendix for V25
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_NOTES.md`
- Companion delta file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_DELTA.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PARITY_MATRIX.md`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Source parity state: V25 source-side Bitcode/BTD rename closure, brand-aware generated evidence, runtime/demo/site rename alignment, and promotion-time rename preparation are canonicalized in the promoted V25 file family
- Draft posture source: `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js` keeps `ACTIVE_CANON_VERSION = 'V25'` and `DRAFT_TARGET_VERSION = 'V26'`
- V25 state: canonical promotion complete; V25 is the active Bitcode rename canon and runtime, API, browser shell, tests, demo-local docs, and generated canon are aligned
- Last fully realized canonical target preserved in source: `V25`

## Drafting and acceptance state

V25 is intentionally narrow in architecture and medium-risk in naming scope.
It is not centered on new economics, new proof architecture, or new external-interface classes.
V25 is centered on a simple but full rename of the project from `ENGI` to `Bitcode`, plus a denomination rename from `NGI` to `BTD`.

That narrowness is important.
The version must remain full-system in carrier shape, but simple in semantic delta:
- current V24 behavior remains the system baseline,
- external-realization, proof, settlement, disclosure, and fail-closed posture remain V24-equivalent unless explicitly restated otherwise,
- and V25 succeeds only if the rename is complete enough that the active system no longer presents itself as ENGI and the active denomination no longer presents itself as NGI except where historical provenance or compatibility disclosures must remain visible.

## Version executive summary

V25 renames the project and system identity from `ENGI` to `Bitcode`, and renames the active share and settlement denomination from `NGI` to `BTD`.

This is a rename-first version with semantic invariance.
That means:
- the operating chain proven in V24 remains the operating chain in V25,
- the external-realization contract proven in V24 remains the external-realization contract in V25,
- the proof-bearing, fail-closed, auditable, and exact-accounting posture remains intact,
- and the majority of V25 work is renaming system-facing, operator-facing, generated, emitted, and build-facing surfaces without accidentally changing what the system does.

The success condition is therefore not “new behavior.”
The success condition is “full rename without semantic drift.”

## Canonical Bitcode executive summary

In V25, the system currently known as ENGI is renamed to Bitcode.
The denomination currently known as NGI is renamed to BTD.

Bitcode remains:
1. a proof-bearing operating system for engineering assetizing,
2. a system that ingests authenticated repo supply and candidate deposits,
3. a system that derives measured need from benchmark, parser, and repo reality,
4. a system that makes deposit-to-need fit explicit before deeper closure,
5. a system that selects, verifies, and materializes asset packs,
6. a system that projects disclosure by principal,
7. a system that settles consequence through exact source-to-shares accounting and BTD-denominated consequence surfaces,
8. a system that binds public and private proof surfaces through commitment scopes,
9. a system that binds external execution through Bitcoin, sidechain, compute, storage, GitHub, and repeated-read receipts,
10. a system that emits generated reports and branch artifacts for audit,
11. and a system that fails closed when proof, policy, settlement, disclosure, or promotion truth drift.

V25 therefore is not a category shift.
It is the same system under a new project identity.

## Rename and invariance rule

Promoted V25 must satisfy both of these conditions simultaneously:

1. Full rename:
   - current system-facing naming moves from `ENGI` to `Bitcode`,
   - operator-facing and buyer-facing copy moves from `ENGI` to `Bitcode`,
   - generated proof/report headings move from `ENGI` to `Bitcode`,
   - active denomination naming moves from `NGI` to `BTD`,
   - and active public, API, demo, and runtime presentation must no longer self-identify as ENGI except for historical provenance or compatibility disclosures.
   - the promoted rename target is that any active public or operator surface no longer presents itself as ENGI.
   - the promoted rename target is that any active denomination-bearing surface no longer presents itself as NGI.

2. Semantic invariance:
   - V25 must not silently change proof obligations, settlement logic, disclosure posture, external-interface contract, or fail-closed behavior merely because names changed,
   - and any rename-induced interface break must be explicitly cataloged, bridged, and tested rather than smuggled in as a side effect.

V25 must therefore be strict about rename completeness and strict about non-rename drift.

## Why V25 exists

### 1. The project identity now lags the realized system

V24 promoted the external-realization canon to closure.
The system is now more operationally complete, more externally legible, and more infrastructure-shaped than earlier versions.
V25 exists because the project identity is now changing.

### 2. Partial renames are operationally dangerous

For a system with:
- emitted branch artifacts,
- proof families,
- generated reports,
- live external interfaces,
- build gates,
- and principal-scoped disclosure,
a partial rename is worse than no rename.

V25 must therefore define a complete rename matrix instead of leaving naming drift to opportunistic cleanup.

### 3. Rename work must still be full-canon work

V25 cannot be a thin “search and replace” note.
Because names appear in:
- canonical specs,
- generated appendices,
- emitted artifact namespaces,
- API responses,
- demo and website copy,
- environment variables,
- build hooks,
- validation tools,
- and external-interface receipts,
the rename must be specified as a whole-system version.

## V25 rename surface catalog

### 1. System and product naming

V25 must rename:
- the system name,
- operator-facing and buyer-facing labels,
- active demo and website headings,
- README and marketing posture where they describe the current system,
- generated proof/report titles,
- and the active denomination name from NGI to BTD.

### 2. Artifact and namespace naming

V25 must explicitly decide and implement the naming treatment for:
- emitted artifact namespaces such as `.engi/*`,
- generated report paths such as `.engi/v25-*`,
- proof/report textual headings,
- and any canonical identifiers whose prefix currently encodes ENGI.

### 3. Runtime, API, and UI naming

V25 must explicitly decide and implement the naming treatment for:
- runtime posture strings,
- API summary labels,
- demo shell headings and guidance,
- website copy,
- any user-visible references to ENGI in execution summaries, receipts, or error states,
- and any user-visible references to NGI in settlement, ledger, or denomination surfaces.

### 4. Build, process, and quality naming

V25 must explicitly decide and implement the naming treatment for:
- spec-quality hook output,
- promotion script messaging,
- generated appendix rendering,
- commit-body guidance,
- and CI or CD messaging that currently names ENGI as the current system.

### 5. Compatibility and migration naming

V25 must explicitly define:
- whether historical `.engi/*` paths remain accepted temporarily,
- whether `ENGI_SPEC_V25*` filenames remain as repo-local drafting and tooling carriers even if the project-facing identity becomes Bitcode,
- how ENGI historical references remain available for provenance without confusing the active product identity,
- and how NGI historical references remain available for provenance without confusing the active denomination identity.

## V25 generated canon

### Exact generated-artifact inventory matrix

Promoted V25 must emit and classify:
- `ENGI_SPEC_V25_PROVEN.md`
- `.engi/v25-spec-family-report.json`
- `.engi/v25-canonical-input-report.json`
- `.engi/v25-canon-posture-drift-report.json`

Those artifacts remain repo-local and `.engi/*`-scoped in V25 even while the active public identity becomes Bitcode and the active denomination becomes BTD.

### Minimum generated appendix rendered contents

The V25 generated appendix must render:
- aggregate proof verdict,
- exact per-family member inventory,
- exact per-family theorem inventory,
- exact replay-step inventories and theorem bindings,
- witness artifact inventories,
- generated artifact inventories,
- scenario and run coverage matrices,
- proof-source commit,
- and explicit BTD-denominated rename closure language where V25 changes current-facing naming.

### Canonical regeneration and fail-closed posture

V25 regeneration must fail closed when:
- `ENGI_SPEC_V25_PROVEN.md` does not match the active generated proof appendix truth,
- `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, or `.engi/v25-canon-posture-drift-report.json` are missing,
- active runtime, API, UI, generated evidence, or build/process surfaces no longer present themselves as Bitcode,
- active settlement and ledger surfaces no longer present themselves as BTD,
- any active public or operator surface no longer presents itself as ENGI,
- any active denomination-bearing surface no longer presents itself as NGI,
- or rename work silently changes proof, settlement, disclosure, or external-interface semantics.

## V25 accepted drafting decisions

V25 accepts the following decisions:

1. V25 is a rename-first version rather than a new architecture version.
2. The rename target is `Bitcode`.
3. V25 must remain a full-system specification rather than a delta shell.
4. V25 must preserve V24 proof, settlement, disclosure, external-realization, and fail-closed semantics unless an explicit new semantic change is stated.
5. V25 must define a complete rename matrix across system, runtime, API, UI, docs, generated evidence, emitted artifacts, and build/process surfaces.
6. V25 must not permit partial rename drift between hand-authored canon, generated canon, source, demo, website, and build tooling.
7. Historical provenance may still mention ENGI where needed, but active product posture must identify as Bitcode after promotion.
8. V25 must include explicit compatibility and migration rules for any renamed artifact paths, API surfaces, environment variables, or generated outputs.
9. The repo-local spec drafting family may remain `ENGI_SPEC_V25*` during draft and implementation work so existing spec-quality tooling stays stable; promoted V25 must explicitly state the treatment of that file-family naming.
10. V25 renames the active economic denomination from `NGI` to `BTD`.
11. V25 must preserve V24 settlement semantics while changing denomination naming, so BTD is treated as a naming and interface migration rather than a tokenomic redesign.

## Recommended narrowing defaults for V25

The current draft recommends the following defaults so V25 stays simple while still being a meaningful rename version:

1. Active product and system identity rename fully to Bitcode.
2. Active denomination naming renames fully from NGI to BTD.
3. Internal compatibility carriers remain unchanged in V25 unless there is a strong reason to widen scope:
   - emitted artifact namespace remains `.engi/*`,
   - repo-local spec family remains `ENGI_SPEC_V25*`,
   - internal script and tool names may remain ENGI-prefixed where they are implementation carriers rather than product identity.
4. Historical provenance continues to mention ENGI and NGI where needed, but current user-facing posture must identify as Bitcode and BTD.

These defaults give V25 a clean center:
- rename the project completely at active system/product surfaces,
- rename the denomination completely at active current-facing settlement and ledger surfaces,
- avoid widening the version into an emitted-namespace or repo-tooling migration unless explicitly chosen,
- and preserve semantic invariance from V24.

## V25 source-of-truth hierarchy

Current truth order during V25 drafting is:
1. `ENGI_SPEC.txt`
2. `ENGI_SPEC_V24.md`
3. `ENGI_SPEC_V24_DELTA.md`
4. `ENGI_SPEC_V24_PARITY_MATRIX.md`
5. `ENGI_SPEC_V24_PROVEN.md`
6. active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v24-*` artifacts
7. current source and tests explicitly referenced by active V24 canon
8. `ENGI_SPEC_V24_NOTES.md`
9. this V25 draft family
10. historical prior specs

## Review acceptance criteria

V25 draft review is complete only when:
1. V24 remains the active canon and V25 does not overclaim promotion.
2. V25 is explicit that it is a simple but full rename version.
3. V25 is explicit that semantic invariance is the default rule.
4. The rename surface catalog covers system, artifact, API, UI, docs, generated evidence, and build/process surfaces.
5. The draft distinguishes rename completeness from behavioral change.
6. Compatibility and migration expectations are explicit rather than implied.
7. The treatment of repo-local spec filenames versus promoted product identity is explicit.
8. The treatment of BTD as the promoted denomination naming is explicit.
9. The draft records a recommended narrowing posture for compatibility carriers instead of leaving scope ambiguous.

## Promotion acceptance criteria

V25 may promote only when:
1. active product and system naming is Bitcode across runtime, demo, website, generated evidence, and current docs,
2. active denomination naming is BTD across settlement, ledger, runtime, demo, generated evidence, and current docs,
3. stale ENGI-facing and NGI-facing copy is removed from active surfaces except where historical provenance is intentionally preserved,
4. emitted artifact namespaces, generated artifact names, API surfaces, and internal tooling carriers have explicit implemented treatment,
5. compatibility bridges and migration notes are implemented and tested where rename breaks otherwise occur,
6. strict spec-quality, rename-conformance, and regression checks pass,
7. V25 generated evidence exists,
8. and V25 proves rename completeness without semantic drift from V24.

## Explicitly deferred

Still explicitly deferred beyond initial V25 draft:
- any new economic or settlement redesign,
- any new external-interface architecture beyond V24,
- any rename-driven weakening of fail-closed posture,
- and any attempt to smuggle unrelated feature work into the rename version.

## Commit-body direction

The eventual V25 canonical commit body should describe:
- full project rename from ENGI to Bitcode,
- full denomination rename from NGI to BTD,
- rename-complete treatment across runtime, API, UI, docs, emitted artifacts, generated evidence, and build/process surfaces,
- compatibility and migration rules for renamed interfaces and namespaces,
- explicit semantic invariance from V24,
- and generated V25 evidence proving rename closure.
