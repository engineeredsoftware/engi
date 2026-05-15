/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan bounded grep-backed repository evidence search strategy for Bitcode"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bounded_strategy", "test": "Keeps search inside explicit repository/package scope", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PLAN_SEARCH_STRATEGY: PromptPart =
  'Choose minimal grep-compatible patterns, target paths, and result limits that can ground the Bitcode read; prefer exact package, prompt, proof, and AssetPack identifiers before broad terms.' as PromptPart;
