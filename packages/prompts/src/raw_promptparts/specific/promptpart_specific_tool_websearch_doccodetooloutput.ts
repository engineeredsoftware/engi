/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for web search tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly describe the results array structure? Rate 0-1" },
 *   { "name": "metadata_inclusion", "test": "Does '{{content}}' mention provider and scoring metadata? Rate 0-1" },
 *   { "name": "completeness", "test": "Does '{{content}}' cover all key output fields? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLOUTPUT: PromptPart = 
  'Array of search results containing title, url, snippet, relevance score, source provider, timestamp, and enriched metadata with content extraction when requested' as PromptPart;