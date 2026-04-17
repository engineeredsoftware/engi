/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing basic web search query"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "basic_usage", "test": "Does '{{content}}' demonstrate simple search usage? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Does '{{content}}' represent a typical search use case? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Basic search: search({ query: "machine learning best practices 2024" })' as PromptPart;