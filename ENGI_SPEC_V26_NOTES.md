# ENGI Spec V26 Notes

## Status

- Scope: notes-only V26 draft opening for work deferred from first-gate V25 closure and promotion
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- V26 state: notes-only draft opening; V26 main, delta, and parity files are intentionally not started yet

## Notes-only draft rule

V26 begins here as notes only.

That means:
- V25 remains the only active canonical system specification.
- V26 does not yet define review acceptance, promotion acceptance, or a full draft-target spec family.
- V26 may collect deferred items, reopen conditions, and candidate workstreams that were intentionally out of first-gate V25 scope.
- V26 must not be treated as active system truth until a full V26 file family is deliberately drafted later.

## Deferred from V25

The following items were not first-gate V25 work and should be treated as V26 candidates instead of retroactively widening V25:

- Bitcoin execution hardening beyond V25’s first-gate closure, including deeper operator-grade reality for live topology, credential rotation, and long-run observation policy across Bitcoin mainchain, repeated-read payment, and sidechain execution.
- GitHub interface hardening beyond V25’s first-gate closure, including richer real mutation sequencing, installation lifecycle management, and multi-application operational posture.
- Compute and storage hardening beyond V25’s first-gate closure, including deeper auditability of container image lineage, execution provenance, publication retention, and longer-run reconciliation policy.
- Cross-interface reconciliation and drift posture that goes beyond current first-gate V25 continuity and telemetry closure.
- Build/process refinements that improve operator ergonomics, CI/CD signal quality, and promotion automation beyond what V25 needed to close.
- Rename follow-on cleanup where compatibility carriers intentionally remained stable in V25.

These belong in V26 because they are relevant from V25 but were not first-gate V25 requirements.

## Candidate V26 workstreams

### 1. Bitcoin and sidechain operational hardening

Candidate V26 work:
- deepen live Bitcoin operator posture,
- deepen repeated-read payment execution posture,
- deepen sidechain operator policy and recovery posture,
- and strengthen long-run observation, reconciliation, and drift handling for Bitcoin-facing execution.

### 2. GitHub operational hardening

Candidate V26 work:
- richer GitHub App lifecycle handling,
- installation churn and permission drift handling,
- mutation sequencing and reconciliation expansion,
- and stronger telemetry around real GitHub execution.

### 3. Compute and storage operational hardening

Candidate V26 work:
- container image and execution lineage expansion,
- stronger storage publication and retrieval reconciliation,
- and more explicit operator-grade runtime provenance across compute and storage.

### 4. Build/process and conformance refinement

Candidate V26 work:
- improve build/process ergonomics beyond V25’s first-gate enforcement,
- expand CI/CD presentation and containerized conformance signal,
- and refine local-vs-containerized validation without weakening fail-closed posture.

### 5. Compatibility follow-on cleanup

Candidate V26 work:
- reevaluate whether V25-stable compatibility carriers should remain stable,
- including `.engi/*`,
- repo-local `ENGI_SPEC_*`,
- and other internal ENGI-prefixed carriers that V25 intentionally kept stable to preserve momentum.

## Non-goals during V25 closure

The following are non-goals while closing and promoting V25:

- drafting a full V26 main specification,
- drafting a V26 delta file,
- drafting a V26 parity matrix,
- widening V25 into a second feature release,
- or treating V26 notes as current canonical truth.

## Reopen conditions

Reopen V26 from notes-only posture into a full draft family only when:

1. deferred Bitcoin, GitHub, compute, storage, or build/process work is concrete enough to justify a full-canon V26 draft,
2. the intended V26 center is explicit rather than a loose backlog,
3. and opening the full V26 family will not destabilize the promoted V25 closure.
