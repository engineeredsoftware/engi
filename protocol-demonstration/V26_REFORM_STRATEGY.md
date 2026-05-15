# V26 Reform Strategy

## Status

- Scope: reform-generic supplementary strategy for active V26 implementation work
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Purpose: keep retained reuse useful without letting retained corridors silently define Bitcode meaning

## Canonical rule

Broad V26 reform is not naming cleanup.
It is corridor-by-corridor first-principals analysis of what Bitcode actually requires, followed by the minimum change set that implements exactly that meaning and no more.
In V26, that work shapes the Bitcode protocol together with the commercial infrastructure until the repository can read as one full-repository-as-proven-products canon rather than a protocol core wrapped by unreformed product carriers.

Every retained corridor must therefore be classified before it is edited:
- `direct-product`
  The corridor is a live Bitcode product owner.
- `ingress-or-support`
  The corridor is admitted because Bitcode still needs it as infrastructure, parsing, prompt injection, transport, or realization support.
- `compatibility-only`
  The corridor survives as a transitional naming/path/export wrapper while the live semantics have already moved elsewhere.
- `reference-only`
  The corridor may remain readable and reusable for reform work, but it is not allowed to own live Bitcode behavior.
- `cut`
  The corridor is experimental, intentionally non-Bitcode, or outside Bitcode and should be removed from live registration and archived under `_legacy/` when its ideas still matter.

## Successful tactics now demonstrated in V26

- `classify before reuse`
  Reuse only after the corridor is named as direct-product, support, compatibility, reference, or cut.
- `mirror before rename`
  Add semantic mirrors before destructive renames so continuity survives across stores, APIs, UI reread, and proof generation.
- `public boundary before rollout`
  Expose honest package subpaths and dependency declarations before letting consumers depend on the corridor.
- `server-owned admission before UI optimism`
  Readiness, signing, repository anchoring, and similar transactional preconditions must be enforced where the server can actually know the truth.
- `reread normalization before redesign`
  Retained readers must project Bitcode semantics from persisted rows instead of forcing the UI to reconstruct meaning ad hoc.
- `local compile honesty before closure claims`
  Any corridor claimed active must clear its honest local typecheck/runtime boundary rather than hiding behind broader monorepo success.
- `proof witness per corridor`
  Each significant reform should land a source-bearing witness so the strategy remains auditable instead of narrative-only.
- `protocol gate before downstream fit`
  When a synthesized Read controls asset fitting or settlement, make the review boundary explicit in source and artifacts before downstream selection proceeds.

## Representative V26 successes

- `doc-comment` and `doc-code`
  The base abstractions remain admitted build-time support because Bitcode still needs tool prompt injection, while plugins/examples/developing corridors are explicitly bounded as reference-only.
- `prompt` and execution boundaries
  Active inference carriers now consume `PromptPart`, `Prompt`, `PromptExecution`, `Execution`, and `ExecutionPrompt` through public Bitcode package seams instead of repo-relative reach-through. Retained PTRR agents that still run in the asset-pack corridor must also provide concrete system and plan/try/refine/retry Prompt registries; descriptions and compatibility registry IDs are labels, not sufficient prompt carriers.
- `shippable` reform
  The retained corridor is now explicitly interpreted as asset-pack written-asset synthesis inside a Bitcode agentic pipeline-run corridor: each run satisfies a `read`, synthesizes stable written assets / asset-packs, stores Exchange-rereadable evidence in Finish, and delivers only connected-interface Shippables when a delivery mechanism is requested. `read`, `writtenAssetType`, `writtenAssets`, `readSatisfactionCriteria`, `shippables`, delivery-mechanism mirrors, and asset-pack snapshots are progressively carried alongside compatibility `deliverable*` fields, with registry-bearing runtime hydration on bare-execution entry, canonical `comprehend-read` module paths on the live setup corridor, semantic failure telemetry that survives route catch paths, local Prompt/PromptPart carriers on retained design/digest/validation PTRR agents, and an honest package-local typecheck boundary through the remaining retained support graph.
- `read-comprehension` prompt reform
  The generic tool package is now a canonical read-comprehension package and removes noncanonical tool, prompt, primitive, schema, and raw PromptPart owners once read-first owners exist. Its individually defined tools, DocCode prompts, raw PromptParts, README, primitive outputs, direct workspace dependencies, TypeScript-only source, and no-emit package-local typecheck describe and verify Bitcode Read comprehension, written-asset requirements, asset-pack context, proof obligations, and delivery-mechanism limits. `ReadComprehensionToolset` is only a collection surface, and `packages/generic-agents/read-comprehension` is the separate TypeScript-only setup/pre-danger-wall PTRR agent that registers and composes those tools before risk admission.
- `simple-system-text-search` prompt reform
  The retained grep-backed tool remains useful only as repository-evidence support. Its active prompt ownership now moves through `BitcodeRepositoryEvidenceSearchDocCodeToolPrompt`, while old `simpleSystemTextSearch` / `SYSTEMTEXTSEARCH` names remain compatibility carriers whose content must describe read measurement, source-grounding, proof inspection, and AssetPack planning rather than broad codebase intelligence.
- `text-searcher` agent reform
  The retained agent wrapper remains useful only as the PTRR layer above repository-evidence search. Its active export is `bitcodeRepositoryEvidenceSearcher`; old `textSearcher`, `quickTextSearcher`, `SIMPLE_TEXT_SEARCH_AGENT`, and `TEXTSEARCHER` PromptPart names remain compatibility carriers whose content must describe evidence-only support rather than old search-engine, task-analysis, or indexing-product semantics.
- `web-researcher` agent reform
  The retained agent wrapper remains useful only as discovery-phase web research for Bitcode read synthesis. Its active export is `bitcodeReadSynthesisWebResearcher`; `bitcodeExternalEvidenceResearcher`, old `webResearcherAgent`, `WEB_RESEARCH_AGENT`, and `WEBRESEARCHER` PromptPart names remain compatibility carriers whose content must describe source-attributed read-synthesis/proof-question/interface/AssetPack context rather than old scraping, task-analysis, or enterprise data-extraction product semantics.
- `web-search` agent/tool reform
  The retained lower-level search agent and tool package remain useful only under the same discovery-phase read-synthesis corridor. Their active export is `bitcodeReadSynthesisWebSearch`; old `webSearch`, `quickWebSearch`, `WEBSEARCH`, `WEB_SEARCH`, `WEBSEARCHTOOL`, `WEBSEARCH_DOCCODE`, `GETCONTENTS_DOCCODE`, and `MULTIPROVIDERSEARCH_DOCCODE` names remain compatibility carriers whose content must describe source-attributed external evidence, source-quality review, volatility, proof-boundary warnings, and downstream read/proof/AssetPack handoff rather than generic search-platform ownership.
- `danger-wall` agent reform
  The retained agent wrapper remains useful only as Bitcode read/AssetPack risk-admission support before a retained pipeline phase proceeds. Its active export is `bitcodeReadRiskAdmissionAgent`; old `dangerWall`, `quickDangerWall`, `DANGER_WALL_AGENT`, and `DANGERWALL` PromptPart names remain compatibility carriers whose content must describe unsafe mutation, private-data exposure, proof/evidence gap, likely-failing execution, AssetPack scope, delivery-mechanism mismatch, and manual-review admission boundaries rather than old generic security, content-safety, or monitoring-product semantics.
- `Read review and quantized fit-quality reform`
  The active protocol runtime now emits `.bitcode/read-review.json` between read measurement and fit search, supports accept/reject/remeasure-with-feedback outcomes, exposes the same boundary through app-owned `/api/read-review`, and keeps explicit non-accept decisions from being bypassed by branch materialization. The native Bitcode Terminal read-scenario controls now present and record those decisions before fit search, while the accepted source-to-shares focus carries into settlement preview. The commercial API route now has a focused dual SPEC-IMPL parity test against the protocol runtime so low-level Bitcode behavior drives production behavior rather than being restated as a route-local mock, including accepted branch materialization carrying `.bitcode/source-to-shares.json`, present-fit settlement review, and quantized fit-quality receipt proof through `/api/make-bitcode-branch`. The same slice makes fit quality a quantized objective contract that appears in `.bitcode/source-to-shares.json`, the present-fit-for-settlement-review surface, settlement AssetPack receipts, and `settlement_source_to_shares.quantized_fit_quality_receipting`. The Bitcode Terminal now reads those as first-class closure panels too: Read review appears before verification, and settlement shows the objective contract, source-to-shares ref, receipt refs, fit-quality hash, and quality rows instead of treating them as raw artifact-only evidence.
- `field-intelligence`
  A clearly experimental non-Bitcode corridor was removed from live Bitcode and documented only under `_legacy/field-intelligence`.
  Active retained-package proof no longer admits `packages/orm/src/queries/field-intelligence.ts`, and active prompt exports no longer admit `promptpart_specific_fielddoc_intelligencecontext_detailcontent`.

## Generic repurposing rule

A rename is justified only when the behavior already matches the new Bitcode meaning.
For example, `comprehend-task -> comprehend-read` is the right class of repurposing only when the step is truly measuring, structuring, or validating Bitcode read semantics rather than preserving a generic task-management abstraction under a new label.

Bitcode therefore prefers:
- reuse when the retained abstraction is already the right primitive
- repurposing when the retained abstraction becomes correct after explicit semantic boundary work
- removal when the retained abstraction is not actually needed or would keep non-Bitcode product logic alive

## Current reform needs

- deeper phase/agent/runtime internals still use non-Bitcode names or branching logic even after boundary mirrors exist
- retained readers and writers still sometimes collapse back to compatibility keys instead of rereading semantic `read`, `writtenAssetType`, `writtenAssets`, and asset-pack structure
- some admitted corridors still read honest local compile/runtime boundaries before they can count as fifth-gate-credible
- browser/runtime/proof closure still has to verify whole flows, not only static source presence
- package-by-package kept/cut/reference decisions still read to continue until no retained corridor survives as silent live product ownership

## Reform ordering rule

For any retained corridor that still matters to V26, the implementation order is:
1. classify the corridor
2. decide keep, repurpose, or cut
3. add semantic mirrors and public boundaries
4. update write paths and reread paths together
5. add local compile/runtime verification and proof witnesses
6. only then rename aggressively or remove the compatibility shell

## Non-goal

This supplement does not authorize speculative cleanup.
It exists to keep V26 reform precise enough that retained density can be reused where optimal, repurposed where correct, and removed where Bitcode does not actually read it.
