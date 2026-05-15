/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search try directives"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "collection_precision", "test": "Directs evidence collection without overreach", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart =
  'Execute only the planned queries that serve the active Bitcode read; record title, URL, snippet, provider, source class, and why each finding matters for read synthesis.' as PromptPart;
