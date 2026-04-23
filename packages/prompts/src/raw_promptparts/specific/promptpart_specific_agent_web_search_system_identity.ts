/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search system identity compatibility PromptPart"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Defines the web_search compatibility role as Bitcode support", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEB_SEARCH_SYSTEM_IDENTITY: PromptPart =
  'Bitcode discovery-phase web search support for source-attributed need-synthesis evidence.' as PromptPart;
