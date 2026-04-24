# Bitcode Need Risk Admission Agent

## Overview

This package admits the retained `danger-wall` path as a Bitcode risk-admission agent.
It is not an autonomous security product, content-moderation product, generic monitoring layer, or generic policy engine.
Its V26 role is to decide whether a Bitcode need, candidate written assets, AssetPack intent, proof-gap evidence, likely execution outcome, and delivery mechanism are safe enough to continue into the next measured pipeline phase.

The compatibility package name remains `@bitcode/generic-agents-danger-wall`.
The active semantic owner is `bitcodeNeedRiskAdmissionAgent`; `dangerWall`, `quickDangerWall`, `dangerWallAgent`, `quickDangerWallAgent`, and `DANGER_WALL_AGENT.dangerCheck` remain compatibility aliases for retained imports.

## Canonical V26 Boundary

- Inputs are need-first: `need`, `assetPackIntent`, `writtenAssetType`, `writtenAssets`, `repositoryEvidence`, `externalEvidence`, and `deliveryMechanism`.
- Output is an admission decision for the next Bitcode phase, not proof closure and not final AssetPack acceptance.
- The agent may flag unsafe mutation, private-data exposure, proof/evidence gaps, likely execution failure, delivery-mechanism mismatch, and AssetPack scope mismatch.
- Canonical need interpretation, repository mutation, stable written-asset creation, proof generation, and third-party delivery remain owned by downstream Bitcode systems.
- `danger-wall` names are compatibility carriers only; prompt content and schemas must speak Bitcode risk admission.

## Prompt Structure

Prompt implementations stay local to the package usage site and compose through Registry-backed prompt primitives:

- `src/prompts/agent-prompt-danger-wall.ts` carries the agent-level prompt registry.
- `src/prompts/system-prompt-dangerwall.ts` carries the system prompt registry.
- `src/prompts/{plan,try,refine,retry}-prompt-dangerwall.ts` carry PTRR step prompt registries.
- `packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_*` retain compatibility filenames, but their content is V26 Bitcode need-risk-admission content.
- Generic generation and failsafe PromptParts remain reusable base layers; the specific PromptParts define this agent's implementation semantics.

## Agent Variations

- `bitcodeNeedRiskAdmissionAgent`: PTRR admission variation for need, AssetPack, proof-gap, and delivery-boundary review.
- `quickBitcodeNeedRiskAdmissionAgent`: single-step admission pass for already bounded low-impact inputs.
- `dangerWall*` exports and `DANGER_WALL_AGENT`: compatibility aliases only.

## Verification

The V26 proof family checks this package through:

- `protocol-demonstration/test/v26-danger-wall-agent-compatibility.test.js`
- `protocol-demonstration/test/v26-inference-implementation-records.test.js`
- `.bitcode/prompt-system-totality-proof.json`
- `.bitcode/inference-implementation-records-proof.json`
