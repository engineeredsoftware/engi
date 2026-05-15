/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search strategy"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "source_strategy", "test": "Prioritizes authoritative source classes and bounded scope", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_SEARCH_STRATEGY: PromptPart =
  'Plan source classes, domain filters, date filters, and query variants that prefer primary or official sources, record volatility, and avoid broad scraping beyond the active Bitcode read-synthesis question.' as PromptPart;
