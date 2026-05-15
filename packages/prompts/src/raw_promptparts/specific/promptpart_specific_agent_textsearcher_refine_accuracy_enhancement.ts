/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Refine Bitcode repository evidence accuracy without overclaiming"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "accuracy_boundary", "test": "Improves evidence quality without claiming proof", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_REFINE_ACCURACY_ENHANCEMENT: PromptPart =
  'Improve evidence quality by removing duplicates, keeping exact file and line references, separating direct matches from inferred relevance, and marking unresolved gaps for downstream Bitcode proof or read-comprehension owners.' as PromptPart;
