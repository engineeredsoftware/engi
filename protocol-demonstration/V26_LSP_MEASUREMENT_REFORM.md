# V26 LSP Measurement Reform

## Status

- Scope: supplementary V26 reform note for retained Language Server Protocol infrastructure
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Companion: `protocol-demonstration/V26_REFORM_STRATEGY.md`
- Purpose: prevent old-world LSP language from surviving as generic code-navigation infrastructure instead of Bitcode static-measurement evidence

## Rule

Retained LSP infrastructure is admitted into Bitcode when it measures repository code facts for a Bitcode Need or AssetPack decision.

LSP is not a product surface, not a parallel code-editing product, and not a generic old-world "intelligence suite" in canonical V26.
It is a static-measurement evidence carrier that can produce replayable symbol, definition, reference, diagnostic, path, config, and type-context facts.

Therefore:

- `bitcode.lsp.measure-need-static.v26` is the canonical measurement role for the retained LSP corridor.
- LSP-derived facts feed `NeedDescriptor.staticMeasurements`, `measurementProvenance`, `.bitcode/measurement-receipts.json`, candidate ranking, AssetPack fit, and proof replay.
- PromptParts and DocCodeTool prompts must explain LSP through Need measurement, AssetPack evidence, and proof replay rather than generic "intelligent code operations."
- Old names may appear only as trace inputs when they point at a more precise canonical measurement role.
- Full V26 closure may not leave former, compatibility-only, historical, or unspecified LSP filesystem/code names as canonical truth.

## Implementation Requirements

Active source must satisfy the following:

- `protocol-demonstration/src/bitcode-demo.js` emits an `lsp-need-static-measurement` receipt with `toolId = "bitcode.lsp.measure-need-static.v26"`.
- `protocol-demonstration/src/canonical/need-measurement.js` includes LSP measurement provenance and exposes `lspMeasurement` inside static Need measurements.
- `packages/lsp/src/index.ts` describes LSP as Bitcode static-measurement infrastructure for Need/AssetPack evidence.
- `packages/generic-tools/lsp-query/src/prompts/*` and the retained LSP raw PromptParts describe LSP as replayable measurement infrastructure.
- LSP raw PromptParts must not retain generic old-world wording such as "code intelligence", "code navigation", "intelligence suite", "development workflows", or false "guaranteed success" promises.
- Compatibility handles in filenames or exported constants are admitted only when their doc-comment intent, content, and dynamic test coverage bind them to `bitcode.lsp.measure-need-static.v26`; full V26 closure requires canonical filesystem and code names for active LSP measurement surfaces.
- Any former-name alias that becomes part of an active API surface must be paired with a canonical replacement name and a removal condition in the specification or test surface.

## Former-Name Discipline

Former-name trace flags are acceptable only as reform discovery aids while canonical names land.
They are not closure evidence or retained V26 behavior.

Sixth-, seventh-, and eighth-gate work aggressively eliminated former names, compatibility-only labels, compatibility-only filesystem paths, and unspecified behavior until the active repository became fully Bitcode-specified by both filesystem and code names.
