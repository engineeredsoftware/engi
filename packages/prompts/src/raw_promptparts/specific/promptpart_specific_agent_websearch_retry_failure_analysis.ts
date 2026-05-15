/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search failure analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "gap_visibility", "test": "Makes failed or insufficient search evidence explicit", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_RETRY_FAILURE_ANALYSIS: PromptPart =
  'Classify failures as missing primary sources, stale sources, conflicting sources, inaccessible URLs, provider failure, over-broad query scope, or lack of read relevance; do not hide evidence gaps.' as PromptPart;
