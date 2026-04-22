/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for search web tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "search_features", "test": "Does '{{content}}' cover search capabilities like filtering and localization? Rate 0-1" },
 *   { "name": "scraping_integration", "test": "Does '{{content}}' explain automatic content extraction from results? Rate 0-1" },
 *   { "name": "configuration_options", "test": "Does '{{content}}' mention time-based and location-based search options? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Web search with automatic content extraction from results, time-based filtering for recent content, language and country-specific localization, location-based search parameters, configurable result limits, integrated scraping workflow, full page content retrieval, and combined search-scrape operation for efficient information gathering' as PromptPart;