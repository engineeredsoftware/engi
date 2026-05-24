# @bitcode/protocol

Formal Bitcode protocol package for commercial source.

V29 Gate 8 made this package the package-native boundary for canonical helpers
that were originally ported from the standalone `protocol-demonstration`
witness. Commercial scripts, API/runtime code, and workflow checks must import
canon posture, spec-family checks, canonical-input checks, canon-drift checks,
and proven-generation helpers from `@bitcode/protocol` or
`packages/protocol/src/index.js`.

They must not import `protocol-demonstration/src/*`. The demonstration remains
a standalone minimal witness and may still be executed or cited by proof
inventories, but it is not a commercial runtime implementation dependency.

Current exported commercial helpers include:

- active/draft canon posture (`V34` active, `V35` draft after V34 promotion);
- spec-family and canonical-input validation helpers;
- canon-posture drift reporting;
- `DocumentationSurfaceCatalog` helpers for V35 documentation surface proof;
- `TelemetryTaxonomyCatalog` helpers for V35 source-safe event family and redaction posture proof;
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

This is the `V34` active, `V35` draft after V34 promotion posture accepted by
V34 Gate 10 and opened by V35 Gate 1.
V35 Gate 1 treats this package as promotion-critical runtime posture.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V34` active, `V35` draft while V35 gates are in flight.
V35 Gate 2 adds the source-safe documentation surface catalog through
`buildDocumentationSurfaceCatalog` and
`.bitcode/v35-documentation-surface-catalog.json`.
V35 Gate 3 adds the source-safe telemetry taxonomy catalog through
`buildTelemetryTaxonomyCatalog` and
`.bitcode/v35-telemetry-taxonomy-catalog.json`.
Later V35 gates add documentation QA, dashboard/runbook, incident, onboarding,
rollout, interface integration, and promotion-readiness helpers without importing
`protocol-demonstration/src/*`.

V35 Gate 10 closes the package/runtime promotion boundary: until promotion this
package remains `V34` active, `V35` draft, and the V35 promotion workflow then
rewrites the package posture to `V35` active, `V36` draft only after promotion
validations and generated proof output pass.

The package boundary is enforced by `packages/protocol` tests, the UAPI
commercial protocol boundary test, and V35 gate checks.
