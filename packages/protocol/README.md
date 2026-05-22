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

- active/draft canon posture (`V32` active, `V33` draft after V32 promotion);
- spec-family and canonical-input validation helpers;
- canon-posture drift reporting;
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

This is the `V32` active, `V33` draft after V32 promotion posture accepted by
V32 Gate 10.
V33 Gate 1 treats this package as promotion-critical runtime posture.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V32` active, `V33` draft while V33 gates are in flight.
V33 Gate 10 will promote this package posture by rewriting those same runtime
carriers to `V33` active, `V34` draft and regenerating the V33 generated
appendix plus `.bitcode/v33-*` promotion artifacts.

The package boundary is enforced by `packages/protocol` tests, the UAPI
commercial protocol boundary test, and V33 gate checks.
