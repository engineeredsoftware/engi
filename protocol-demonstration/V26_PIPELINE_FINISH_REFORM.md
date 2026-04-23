# V26 Pipeline Finish Reform

## Status

- Scope: supplementary V26 reform note for phased Bitcode agentic pipelines
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Companion: `protocol-demonstration/V26_DELIVERABLE_REFORM.md`
- Purpose: prevent old-world `Ship` / `Shipping` language from owning broad Bitcode pipeline completion semantics

## Rule

The broad final phase of a phased Bitcode agentic pipeline is `Finish`.

`Shipping` may not remain the broad phase name because V26 reserves `Delivering` for a narrower operation: providing AssetPacks or AssetPackPartials to third-party tools and destinations.

Therefore:

- `SDIVF` is the canonical retained phased pipeline implementation:
  `Setup -> [Discovery -> Implementation -> Validation]* -> Finish`.
- `SDIVS` is a deprecated compatibility spelling only.
- `Finish` owns saving results, preserving useful Need/AssetPack state, completing summaries, and invoking Delivering when the run needs a third-party destination.
- `Delivering` owns connected-interface output such as GitHub pull requests, Jira comments, issue comments, reviews, or similar destination-specific mechanisms.
- `Deliverable` remains compatibility naming for old public corridors and wrapper payloads, not the general pipeline category.
- Deprecated names, compatibility wrappers, and old filesystem labels are tactical fifth-gate aids, not V26 closure evidence.

## Pipeline Naming

Bitcode pipelines should be named by the exact need they satisfy.

Examples:

- `MeasureNeedPipeline`
- `FindFittingSettlementPipeline`
- exact domain-specific Bitcode need pipelines

The retained `deliverable` package is a compatibility corridor for asset-pack written-asset synthesis and destination delivery. It is not the primary abstraction for every Bitcode agentic pipeline.

## Implementation Requirements

Active source must satisfy the following:

- Public generic pipeline factories expose canonical `factorySDIVFPipeline`, `factorySDIVFExecutorPipeline`, `factoryPipelineWithDIVFinishLoop`, `factorySDIVFPhaseDelegators`, and `SDIVFPhase`.
- Deprecated `SDIVS` / `shipping` factories may remain only as wrappers that map their final phase to canonical `finish`.
- Runtime execution metadata should store `pipeline.pattern = "SDIVF"` and final phase state as `phase.current = "finish"` for canonical paths.
- Metrics, streaming completion, prompt registries, and primitive phase mappers must understand `finish` first and tolerate `shipping` only as a migration alias.
- The retained deliverable corridor must execute `deliverablePhases.finish` through `finish:*` agent keys, while registering `shipping:*` aliases only for promptpart and caller compatibility.
- Finish agents may reuse old-world Ship implementations only after their prompts, descriptions, execution stores, and summaries describe Bitcode Need, AssetPack, WrittenAsset, proof evidence, and Delivering semantics.
- Postprocess and reread should prefer `finish/final_work_summary` and `finish` stores, then fall back to old `shipping` stores during the V26 migration.
- Deprecated `Ship`, `Shipping`, `ReadyToShip`, `FinalizeShipment`, and `Deliverable` compatibility names must always point to a more precise canonical replacement and a later-gate removal condition.

## Deprecation Discipline

Deprecation flags can be used during fifth-gate when they prevent unnecessary breakage while the precise Bitcode surface lands.
They are not a durable architecture.

Full V26 closure requires no deprecated, backwards-compatible, legacy, or unspecified broad-pipeline names to remain as canonical truth.
Filesystem names and code names must converge on the precise Bitcode objects they implement: `Finish`, `Delivering`, `Need`, `AssetPack`, `AssetPackPartial`, and exact pipeline purposes such as `MeasureNeed` or `FindFittingSettlement`.

## Proof Requirement

This reform is a fifth-gate blocker because it is a precise example of the Engi-to-Bitcode migration pattern:

- retain useful modularity;
- rename only after semantic ownership is clear;
- add canonical aliases before destructive filesystem moves;
- preserve compatibility wrappers where live callers still depend on them;
- prove the subtle distinction with source-backed tests.

Fifth-gate cannot claim closure while broad pipeline completion is still taught as Shipping or while Delivering is confused with the whole pipeline's finalization responsibility.
