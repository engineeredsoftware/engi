# V26 Deliverable Reform

## Status

- Scope: supplementary V26 reform note for the retained `packages/pipelines/deliverable/*` corridor
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Purpose: keep the old-world `deliverable` family legible while making Bitcode's actual semantic ownership precise
- Generic strategy companion: `protocol-demonstration/V26_REFORM_STRATEGY.md`

## Rule

`deliverable` is not the primary Bitcode concept.
Within V26, `deliverable` survives only as a retained compatibility path/name where that reuse still accelerates the productization program.

The canonical Bitcode concepts are:
- `need`
  The measured or expressed target the system is trying to satisfy.
- `asset pack`
  The Bitcode-owned bundle/selection/materialization structure for source-bearing output.
- `written asset`
  A third-party-facing realized artifact emitted from an asset pack through a connected interface.

Examples of `written asset` forms include:
- a pull request
- an issue
- a review
- a comment

## Required mapping

The retained `packages/pipelines/deliverable/*` corridor is therefore interpreted as:
- `deliverable pipeline`
  compatibility-only path naming for an asset-pack written-asset synthesis corridor
- `deliverableType`
  compatibility-only retained field naming for written-asset kind
- `comprehend-task`
  old-world step naming that must be repurposed to `comprehend-need`
- `definitionOfDone`
  a retained input field that currently acts as one compatibility carrier for expressed need, acceptance shape, and written-asset expectation

## V26 reform requirement

While the path/package may remain `deliverable` during V26 for compatibility and implementation-speed reasons:
- spec text must teach `asset pack` and `written asset` as the Bitcode semantics
- comments, descriptions, and exported aliases inside the retained corridor should prefer `comprehend need` over `comprehend task` where behavior is truly about need understanding
- execution stores and postprocessed artifacts should mirror compatibility keys with semantic `need`, `writtenAssetType`, and asset-pack-shaped snapshots so later-gate reform can remove the retained names without losing continuity
- internal phase, validation, shipping, and reread logic should resolve semantic `writtenAssetType` and `need` first so the retained corridor shapes live protocol behavior through Bitcode's commercial infrastructure rather than silently recentering old-world `deliverableType` logic
- setup/bootstrap entry points and prompt ports should prefer canonical `comprehend-need` module paths and discovery carriers should admit semantic `need` / `writtenAssetType` directly, with `deliverable-pipeline-comprehend-need-agent` acting as the active setup owner while retained `comprehend-task` / `deliverableType` modules remain only as compatibility shells
- retained discovery outputs should mirror compatibility `deliverables` / `definitionOfDone` fields with semantic `writtenAssets` / `needSatisfactionCriteria` so downstream Bitcode reread and later-gate renaming do not have to recover meaning from old-world labels alone
- retained corridor entry initialization must also hydrate a registry-bearing pipeline execution context when callers still enter through a bare `Execution`, so the commercial runtime remains phase/agent/prompt/tool legible instead of depending on hidden `PipelineExecution` assumptions
- the retained package itself must clear an honest local typecheck boundary through the MCP/VCS/prompt/search support graph it still traverses, so runtime proof and asset-pack semantics are backed by a truthful source boundary rather than broad monorepo success alone
- new-world semantic aliases should be added before broad destructive renames
- old names may remain as compatibility aliases until later-gate convergence removes the corridor entirely

## Non-goal

This supplement does not claim that the retained corridor is already the final Bitcode-native implementation.
It only defines how the retained family must be interpreted and repurposed during V26 so that compatibility reuse does not silently overwrite Bitcode meaning.
