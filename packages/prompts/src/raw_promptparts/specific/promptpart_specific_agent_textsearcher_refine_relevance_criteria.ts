/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Refine relevance criteria for Bitcode repository evidence"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "relevance_boundary", "test": "Ranks matches by Bitcode source-grounding value", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_REFINE_RELEVANCE_CRITERIA: PromptPart =
  'Prioritize matches that name the active Bitcode need, prompt registry, proof file, package owner, schema field, written asset, AssetPack, or delivery-mechanism boundary; deprioritize generic wording without source ownership value.' as PromptPart;
