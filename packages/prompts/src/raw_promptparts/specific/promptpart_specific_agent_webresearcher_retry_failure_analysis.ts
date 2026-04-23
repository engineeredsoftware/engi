/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-retry
 * intent: "Bitcode external-evidence research retry failure analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "failure_boundary", "test": "Treats missing external evidence as explicit gaps", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_FAILURE_ANALYSIS: PromptPart =
  'Analyze evidence misses as scoped gaps: wrong source class, overly broad or narrow query, missing primary owner, inaccessible source, stale publication window, or contradictory external context. Do not invent evidence.' as PromptPart;
