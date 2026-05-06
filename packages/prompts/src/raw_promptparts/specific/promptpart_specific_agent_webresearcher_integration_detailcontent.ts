/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web research integration boundary"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "integration_boundary", "test": "Separates discovery-phase web research from downstream authority", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT: PromptPart =
  `Integrates as admitted discovery-phase need-synthesis support:
- consumes web-search and content tools only for source-attributed external evidence needed by need synthesis
- feeds context into need-comprehension, third-party interface planning, proof-gap question formation, and AssetPack synthesis
- preserves stable web-researcher names only as import and package wrappers
- does not own mutation, delivery mechanism selection, proof generation, canonical need interpretation, or live Exchange/Terminal product semantics` as PromptPart;
