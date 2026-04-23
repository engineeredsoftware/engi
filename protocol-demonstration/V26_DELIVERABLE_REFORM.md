# V26 Deliverable Reform

## Status

- Scope: supplementary V26 reform note for the retained `packages/pipelines/deliverable/*` corridor
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Purpose: keep the old-world `deliverable` family legible while making Bitcode's actual semantic ownership precise
- Generic strategy companion: `protocol-demonstration/V26_REFORM_STRATEGY.md`
- Pipeline phase companion: `protocol-demonstration/V26_PIPELINE_FINISH_REFORM.md`

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
- the live Bitcode meaning is a need-satisfying agentic pipeline run, not a product concept named `deliverable`
- each run synthesizes stable written assets / asset-packs first
- the canonical broad final phase is now `Finish`; old `Shipping` phase names may remain only as compatibility aliases while source migrates to `SDIVF`
- `Delivering` is the narrower Finish subresponsibility that provides AssetPacks or AssetPackPartials to third-party tools and destinations
- the Finish phase may then emit `deliverables` only as connected-interface delivery mechanisms such as `Deliverable.GitHubPullRequest`, `Deliverable.JiraComment`, or similar wrappers around the stable asset-pack output
- spec text must teach `asset pack` and `written asset` as the Bitcode semantics
- comments, descriptions, and exported aliases inside the retained corridor should prefer `comprehend need` over `comprehend task` where behavior is truly about need understanding
- execution stores and postprocessed artifacts should mirror compatibility keys with semantic `need`, `writtenAssetType`, and asset-pack-shaped snapshots so later-gate reform can remove the retained names without losing continuity
- internal phase, validation, Finish/Delivering, and reread logic should resolve semantic `writtenAssetType` and `need` first so the retained corridor shapes live protocol behavior through Bitcode's commercial infrastructure rather than silently recentering old-world `deliverableType` logic
- read routes, workspace-run summaries, mock reread projections, and active UI detail surfaces should prefer semantic `writtenAssets` for Bitcode-owned summary and file-change meaning, then fall back through `deliveryMechanism` and only finally compatibility `deliverables`, while PR/review/comment/issue surfaces remain shipping wrappers
- the operator-facing executions header and the retained `/api/deliverables` route should teach this corridor as asset-pack synthesis plus Finish/Delivering mechanisms even while their compatibility names remain in place
- the retained `/api/deliverables` streamed completion payload should emit semantic `writtenAssets`, `deliveryMechanism`, `need`, `writtenAssetType`, and `assetPack` aliases alongside compatibility `actions` / `deliverables`, so client convergence does not depend on reread-only recovery
- the retained `/api/deliverables` route should also dual-store route-preprocess snapshots and completion metadata under semantic `assetPackWrittenAsset` / `need` / `assetPack` / `writtenAssetType` aliases, so route entry, persistence, and reread all carry Bitcode-owned meaning even while the public route name remains compatibility-only
- retained `/api/deliverables` telemetry, notifications, and email-subject copy should keep compatibility identifiers only as wrappers; payloads and user-facing wording should explicitly describe Bitcode `asset-pack run` semantics and emit semantic event aliases / `assetPack` / `need` / `writtenAssetType` data
- retained email-template filenames and promptpart identifiers should also remain compatibility wrappers only; rendered copy and prompt content should describe asset-pack runs, written-asset synthesis, and Delivering delivery mechanisms rather than teaching `deliverable` as the primary Bitcode object
- retained raw promptparts and promptpart-generation scripts should likewise describe the corridor in asset-pack-run, need-satisfaction, written-asset, and delivery-wrapper terms, even when compatibility filenames and identifiers still include `deliverable`; this includes phase-purpose, setup-comprehension, finish-finalization, deliverables-system, implementation-divider, create-code-change, PR-packaging, create-pull-request, ready-to-ship, code-change-readiness, and code-change-review-readiness promptparts, which should no longer teach PR-first, deployment-ceremony-first, or GA-1-first semantics where Bitcode now requires need-first asset-pack synthesis plus delivery wrappers
- all retained deliverable-family raw PromptPart doc-comment metadata must move to Bitcode-native intent and version language across agent, phase, pipeline, tool, setup, discovery, implementation, validation, and shipping compatibility files; `Agent semantic unit`, `Define purpose of ... deliverables`, `Adds Deliverables-specific ...`, and `Canonical deliverables ...` metadata strings may not survive as active metadata even when filenames remain compatibility wrappers
- retained deliverable substep PromptParts such as `*_substep_reason`, `*_substep_prepare_concise_context`, `*_substep_chunk_then_sum`, `*_substep_tools_execution`, `*_substep_structured_output`, `*_substep_stitch_until_complete`, and `*_substep_judge` must no longer use generic old-world agent phrasing; each substep must explicitly carry Bitcode need, written-asset, asset-pack, proof-evidence, delivery-wrapper, and execution-history reread semantics appropriate to its role
- retained raw PromptPart TypeScript files, generated declaration metadata, and runtime JavaScript carry-through must remain parseable and content-equivalent after broad reform, so malformed benchmark score metadata or stale runtime PromptPart strings cannot preserve old-world behavior after canonical source text has moved
- retained deliverable substep doc-comment metadata must also be reauthored as Bitcode metadata: `current_version` may not carry GA1 lineage, and each `intent` must describe the need-first written-asset / asset-pack / proof / delivery-wrapper role rather than only restating old compatibility file names
- setup/bootstrap entry points and prompt ports should prefer canonical `comprehend-need` module paths, `COMPREHENDNEED` base PromptParts, and deliverable-corridor `DELIVERABLESETUPCOMPREHENDNEED` PromptParts; discovery carriers should admit semantic `need` / `writtenAssetType` directly, with `deliverable-pipeline-comprehend-need-agent` acting as the active setup owner while retained `comprehend-task` / `DELIVERABLESETUPCOMPREHENDTASK` / `deliverableType` modules remain only as compatibility shells or wrappers
- retained maintenance/audit scripts that operate on this corridor must resolve active paths from the repository root, inspect current raw PromptPart locations, and teach `comprehend-need` / asset-pack-run semantics instead of hard-coded old-world checkouts or `comprehend-task` ownership
- retained repair, generation, and export-verification scripts must use the active `raw_promptparts` filesystem, `PROMPTPART_*` constants, portable shell/Python path resolution, and Bitcode asset-pack prompt semantics instead of the removed `raw/specific` prompt tree or old-world `@engi` import expectations
- retained discovery outputs should mirror compatibility `deliverables` / `definitionOfDone` fields with semantic `writtenAssets` / `needSatisfactionCriteria` so downstream Bitcode reread and later-gate renaming do not have to recover meaning from old-world labels alone
- retained corridor entry initialization must also hydrate a registry-bearing pipeline execution context when callers still enter through a bare `Execution`, so the commercial runtime remains phase/agent/prompt/tool legible instead of depending on hidden `PipelineExecution` assumptions
- the retained package itself must clear an honest local typecheck boundary through the MCP/VCS/prompt/search support graph it still traverses, so runtime proof and asset-pack semantics are backed by a truthful source boundary rather than broad monorepo success alone
- new-world semantic aliases should be added before broad destructive renames
- old names may remain as compatibility aliases until later-gate convergence removes the corridor entirely
- `SDIVS` / `shipping` compatibility APIs must forward to `SDIVF` / `finish` behavior rather than preserving old broad Shipping semantics
- tactical deprecated exports remain admissible only when they are explicitly marked as compatibility aliases and are paired with precise canonical Bitcode names; full V26 closure requires removing these aliases rather than treating compatibility as canon

## Non-goal

This supplement does not claim that the retained corridor is already the final Bitcode-native implementation.
It only defines how the retained family must be interpreted and repurposed during V26 so that compatibility reuse does not silently overwrite Bitcode meaning.
