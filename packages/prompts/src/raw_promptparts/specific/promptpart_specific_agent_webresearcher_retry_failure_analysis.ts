/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-retry
 * intent: "Bitcode read-synthesis web research retry failure analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "failure_boundary", "test": "Treats missing discovery evidence as explicit read-synthesis gaps", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_FAILURE_ANALYSIS: PromptPart =
  'Analyze evidence misses as scoped read-synthesis gaps: wrong source class, overly broad or narrow query, missing primary owner, inaccessible source, stale publication window, or contradictory external context. Do not invent evidence.' as PromptPart;
