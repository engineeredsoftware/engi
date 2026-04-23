/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility-named system role for Bitcode repository-evidence search"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "compatibility_precision", "test": "Compatibility filename carries canonical Bitcode role", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXT_SEARCHER_SYSTEM_ROLE: PromptPart =
  'Provide repository source-grounding to downstream Bitcode need-comprehension, proof, AssetPack, mutation, and delivery owners without assuming their authority.' as PromptPart;
