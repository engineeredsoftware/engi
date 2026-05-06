/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Search techniques for Bitcode repository evidence"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "technique_precision", "test": "Names grep-backed techniques suitable for source-grounding", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TRY_SEARCH_TECHNIQUES: PromptPart =
  'Prefer exact Bitcode identifiers, stable filenames, prompt constants, schema fields, proof artifact names, and AssetPack terms. Use regex only when it improves evidence recall without obscuring file/line traceability.' as PromptPart;
