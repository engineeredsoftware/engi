# @bitcode/protocol

Formal Bitcode protocol package for commercial source.

V29 Gate 8 makes this package the package-native boundary for canonical helpers
that were originally ported from the standalone `protocol-demonstration`
witness. Commercial scripts, API/runtime code, and workflow checks must import
canon posture, spec-family checks, canonical-input checks, canon-drift checks,
and proven-generation helpers from `@bitcode/protocol` or
`packages/protocol/src/index.js`.

They must not import `protocol-demonstration/src/*`. The demonstration remains
a standalone minimal witness and may still be executed or cited by proof
inventories, but it is not a commercial runtime implementation dependency.

Current exported commercial helpers include:

- active/draft canon posture (`V28` active, `V29` draft during V29 work);
- spec-family and canonical-input validation helpers;
- canon-posture drift reporting;
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

V29 Gate 10 treats this package as promotion-critical runtime posture.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V28` active, `V29` draft during gate work, then be
rewritten by promotion automation to `V29` active, `V30` draft.

The package boundary is enforced by `packages/protocol` tests, the UAPI
commercial protocol boundary test, and `check:v29-gate8`.
