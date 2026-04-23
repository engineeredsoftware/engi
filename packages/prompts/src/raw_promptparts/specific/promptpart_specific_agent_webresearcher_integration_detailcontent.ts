/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research integration boundary"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "integration_boundary", "test": "Separates auxiliary external evidence from downstream authority", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT: PromptPart =
  `Integrates as admitted auxiliary-input support:
- consumes web-search and content tools only for source-attributed external evidence
- feeds context into need-comprehension, third-party interface planning, proof-gap review, and AssetPack synthesis
- preserves compatibility web-researcher names only as import and package wrappers
- does not own mutation, delivery mechanism selection, proof generation, canonical need interpretation, or live Exchange/Terminal product semantics` as PromptPart;
