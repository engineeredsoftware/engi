/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing advanced search with options"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "options_demo", "test": "Does '{{content}}' demonstrate search configuration options? Rate 0-1" },
 *   { "name": "provider_selection", "test": "Does '{{content}}' show provider preference settings? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Configured search: search({ query: "TypeScript performance optimization", options: { providers: ["exa", "perplexity"], limit: 20, extractContent: true } })' as PromptPart;