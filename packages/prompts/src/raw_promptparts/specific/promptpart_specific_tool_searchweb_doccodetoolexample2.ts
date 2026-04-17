/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing localized search with language and country"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "localization_demo", "test": "Does '{{content}}' demonstrate language and country filtering? Rate 0-1" },
 *   { "name": "regional_search", "test": "Does '{{content}}' show region-specific search capabilities? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Localized news search: searchWebTool({ query: "climate change policies", options: { lang: "fr", country: "FR", limit: 5, tbs: "qdr:w" } })' as PromptPart;