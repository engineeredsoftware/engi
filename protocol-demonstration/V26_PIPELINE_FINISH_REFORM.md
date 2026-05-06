# V26 Pipeline Finish Reform

## Status

- Scope: supplementary V26 reform note for phased Bitcode agentic pipelines
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Companion: `protocol-demonstration/V26_SHIPPABLE_REFORM.md`
- Purpose: prevent non-Bitcode `Ship` / `Shipping` language from owning broad Bitcode pipeline completion semantics

## Rule

The broad final phase of a phased Bitcode agentic pipeline is `Finish`.

`Shipping` may not remain the broad phase name because V26 reserves `Delivering` for a narrower operation: providing AssetPacks or AssetPackPartials to third-party tools and destinations.

Therefore:

- `SDIVF` is the canonical retained phased pipeline implementation:
  `Setup -> [Discovery -> Implementation -> Validation]* -> Finish`.
- `SDIVS` is reform history and may not remain as an active generic pipeline API.
- `Finish` owns saving results, preserving useful Need/AssetPack state, completing summaries, and invoking Delivering when the run needs a third-party destination.
- `Delivering` owns connected-interface Shippables. V26 commercial behavior admits GitHub pull requests only; issue/review/comment/Jira or other destination branches are V27+ design space.
- `Shippable` is the noun for what Finish delivers; `Deliverable` is non-Bitcode residue used only as a trace word or literal migration-boundary identifier, not a current payload or reusable infrastructure field.
- Former names, compatibility wrappers, and any remaining old filesystem labels are trace inputs only; after their Bitcode replacement exists they must be removed rather than counted as V26 closure evidence.

## Pipeline Naming

Bitcode pipelines should be named by the exact need they satisfy.

Examples:

- `MeasureNeedPipeline`
- `FindFittingSettlementPipeline`
- exact domain-specific Bitcode need pipelines

The AssetPack package is the active corridor for written-asset synthesis and destination delivery. It is not the primary abstraction for every Bitcode agentic pipeline, and `packages/pipelines/deliverable` is no longer an active filesystem owner.

## Implementation Requirements

Active source must satisfy the following:

- Public generic pipeline factories expose canonical `factorySDIVFPipeline`, `factorySDIVFExecutorPipeline`, `factoryPipelineWithDIVFinishLoop`, `factorySDIVFPhaseDelegators`, and `SDIVFPhase`.
- `packages/pipelines-generics` must not expose `SDIVS` / `shipping` factories, phase enums, primitive phase aliases, or filesystem names.
- Runtime execution metadata should store `pipeline.pattern = "SDIVF"` and final phase state as `phase.current = "finish"` for canonical paths.
- Metrics, streaming completion, prompt registries, and primitive phase mappers in `packages/pipelines-generics` must use `finish` only.
- The retained AssetPack corridor must execute `assetPackPhases.finish` through `finish:*` agent keys and must not register `shipping:*` phase aliases in active AssetPack phase/tool registries.
- Finish agents may reuse non-Bitcode Ship implementation ideas only after their prompts, descriptions, execution stores, and summaries describe Bitcode Need, AssetPack, WrittenAsset, proof evidence, AssetPack completion, and PR Delivering semantics.
- AssetPack postprocess and reread must use `finish/asset_pack_completion` and `finish` stores directly; retained `shipping` or `finish/final_work_summary` store fallbacks are reform residue rather than current AssetPack behavior.
- Former `Ship`, `Shipping`, `ReadyToShip`, `FinalizeShipment`, and `Deliverable` names must be removed from active implementation once the precise `Finish` / `Delivering` / `AssetPack completion` replacement is present.

## Former-Name Discipline

Former-name trace flags may be used during reform only to identify the exact Bitcode replacement surface.
They are not a durable architecture and they are not retained V26 behavior.

Full V26 closure requires no former, compatibility-only, historical, or unspecified broad-pipeline names to remain as canonical truth.
Filesystem names and code names must converge on the precise Bitcode objects they implement: `Finish`, `Delivering`, `Need`, `AssetPack`, `AssetPackPartial`, and exact pipeline purposes such as `MeasureNeed` or `FindFittingSettlement`.

## Proof Requirement

This reform is a fifth-gate blocker because it is a precise example of the retained-system-to-Bitcode reform pattern:

- retain useful modularity;
- rename only after semantic ownership is clear;
- add canonical aliases before destructive filesystem moves;
- remove compatibility wrappers from reusable primitives once active callers have canonical paths;
- prove the subtle distinction with source-backed tests.

Fifth-gate cannot claim closure while broad pipeline completion is still taught as Shipping or while Delivering is confused with the whole pipeline's finalization responsibility.
