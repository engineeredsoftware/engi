/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search integration boundary"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "source_grounding", "test": "Integrates search evidence with Bitcode proof and AssetPack systems", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_INTEGRATION_DETAILCONTENT: PromptPart =
  `Integrates as admitted support:
- consumes the simpleSystemTextSearch tool and its repository-evidence DocCode prompt
- feeds source-grounding context into need-comprehension, AssetPack evidence corridors, proof, and AssetPack synthesis agents
- preserves compatibility text-searcher names only as import and package wrappers
- does not own mutation, delivery mechanism selection, proof generation, canonical need interpretation, or live Exchange/Terminal product semantics` as PromptPart;
