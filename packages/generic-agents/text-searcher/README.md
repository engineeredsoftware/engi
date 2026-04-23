# Bitcode Repository Evidence Search Agent

## Overview

This package admits the retained `text-searcher` path as a Bitcode repository-evidence search agent.
It is not an autonomous search product, task-analysis product, semantic-search engine, or content-indexing system.
Its V26 role is to orchestrate bounded grep-backed evidence collection so downstream Bitcode agents can measure a need, inspect source/proof owners, and ground AssetPack or written-asset planning.

The compatibility package name remains `@bitcode/generic-agents-text-search`.
The active semantic owner is `bitcodeRepositoryEvidenceSearcher`; `textSearcher`, `quickTextSearcher`, and `SIMPLE_TEXT_SEARCH_AGENT` remain compatibility aliases for old imports.

## Canonical V26 Boundary

- Inputs remain query-shaped for compatibility, but the query represents a need-grounding evidence pattern.
- Output matches are evidence snippets, not conclusions and not proof closure by themselves.
- The agent may use `simpleSystemTextSearch` as the only admitted repository-evidence tool.
- File mutation, proof generation, delivery mechanisms, and canonical need interpretation remain owned by their respective Bitcode tools, pipelines, and proof generators.

## Prompt Structure

Prompt implementations stay local to the package usage site and compose through Registry-backed prompt primitives:

- `src/prompts/agent-prompt-text-searcher.ts` carries the agent-level prompt registry.
- `src/prompts/system-prompt-text-searcher.ts` carries the system-level support prompt registry.
- `src/prompts/{plan,try,refine,retry}-prompt-text-searcher.ts` carry PTRR step prompt registries.
- `packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_*` and `promptpart_specific_agent_text_searcher_*` retain compatibility filenames, but their content is V26 Bitcode repository-evidence search content.
- Generic generation and failsafe PromptParts remain reusable base layers; the specific PromptParts define this agent's implementation semantics.

## Agent Variations

- `bitcodeRepositoryEvidenceSearcher`: PTRR evidence-search variation for source-grounded repository investigation.
- `quickBitcodeRepositoryEvidenceSearcher`: single-step grep-backed variation for bounded evidence lookups.
- `textSearcher`, `quickTextSearcher`, and `SIMPLE_TEXT_SEARCH_AGENT`: compatibility aliases only.

## Verification

The V26 proof family checks this package through:

- `protocol-demonstration/test/v26-text-searcher-agent-compatibility.test.js`
- `protocol-demonstration/test/v26-prompt-system-boundary.test.js`
- `protocol-demonstration/test/v26-inference-implementation-records.test.js`
- `.bitcode/prompt-space-completeness-proof.json`
- `.bitcode/inference-implementation-records-proof.json`
