/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing location-based search with custom scraping"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "location_search", "test": "Does '{{content}}' demonstrate location-based search? Rate 0-1" },
 *   { "name": "scrape_options", "test": "Does '{{content}}' show custom scraping configuration? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Location-based tech events: searchWebTool({ query: "tech conferences", options: { location: "San Francisco", limit: 15, scrapeOptions: { formats: ["markdown", "links"] } } })' as PromptPart;