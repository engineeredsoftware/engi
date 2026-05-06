# Bitcode Need-Synthesis Web Research Agent

## Overview

This package admits the retained `web-researcher` path as a Bitcode need-synthesis web research agent for the discovery phase.
It is not an autonomous web-scraping product, task-analysis product, citation manager, browser-automation system, proof engine, or Exchange/Terminal product owner.
Its V26 role is to collect bounded, source-attributed external context while a Bitcode need is being synthesized, so downstream Bitcode agents can measure the need, form proof-gap questions, understand third-party integration constraints, and plan AssetPack or written-asset work.

The support package name remains `@bitcode/generic-agents-web-research`.
The active semantic owner is `bitcodeNeedSynthesisWebResearcher`; `bitcodeExternalEvidenceResearcher`, `webResearcherAgent`, `webResearcherPrompt`, `webResearcherStepPrompts`, and `WEB_RESEARCH_AGENT.researchWeb` remain stable support carriers for existing imports.

## Canonical V26 Boundary

- Inputs remain query-shaped for stable callers, but the owning semantic field is the Bitcode `need` and the canonical phase is `discoveryPhase: "need-synthesis"`.
- External findings are auxiliary evidence; they can support need measurement and proof-gap investigation but cannot close proof by themselves.
- The agent may use admitted web-search tools to collect titles, URLs, snippets, source class, source quality, publication metadata, and unresolved gaps.
- The agent must prefer primary, official, repository, standard, paper, or vendor-owned sources before commentary.
- File mutation, proof generation, delivery mechanisms, canonical need interpretation, and live product state changes remain owned by their respective Bitcode tools, pipelines, proofs, and products.

## Prompt Structure

Prompt implementations stay local to the package usage site and compose through Registry-backed prompt primitives:

- `src/prompts/agent-prompt-web-researcher.ts` carries the agent-level prompt registry.
- `src/prompts/system-prompt-web-researcher.ts` carries the system-level support prompt registry.
- `src/prompts/{plan,try,refine,retry}-prompt-web-researcher.ts` carry PTRR step prompt registries.
- `src/schemas.ts` owns the source-attributed input, intermediate PTRR, and final result contracts.
- Runtime `.js` mirrors under `src/` remain aligned with the TypeScript source because this retained package still has generated-JavaScript compatibility consumers.
- `packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_*` retains stable filenames, but its content is V26 Bitcode need-synthesis web research content.
- Generic generation and failsafe PromptParts remain reusable base layers; the specific PromptParts define this agent's implementation semantics.

## Agent Variation

- `bitcodeNeedSynthesisWebResearcher`: PTRR discovery-phase web research variation for source-attributed need-synthesis context.
- `bitcodeExternalEvidenceResearcher`: stable alias that names the output artifact type, not the agent purpose.
- `webResearcherAgent`: stable alias only.
- `WEB_RESEARCH_AGENT.researchWeb`: stable object shape only.

## Verification

The V26 proof family checks this package through:

- `protocol-demonstration/test/v26-web-researcher-agent-compatibility.test.js`
- `protocol-demonstration/test/v26-prompt-system-boundary.test.js`
- `protocol-demonstration/test/v26-inference-implementation-records.test.js`
- `.bitcode/prompt-space-completeness-proof.json`
- `.bitcode/inference-implementation-records-proof.json`
