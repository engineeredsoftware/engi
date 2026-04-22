/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing basic web search with automatic scraping"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "basic_usage", "test": "Does '{{content}}' demonstrate simple search and scrape? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Does '{{content}}' represent a typical research use case? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Research recent AI developments: searchWebTool({ query: "artificial intelligence breakthroughs 2024", options: { limit: 10, tbs: "qdr:m" } })' as PromptPart;