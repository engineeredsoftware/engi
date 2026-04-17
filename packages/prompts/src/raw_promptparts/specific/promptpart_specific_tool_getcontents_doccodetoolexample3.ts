/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing plain text extraction for analysis"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "text_extraction", "test": "Does '{{content}}' demonstrate plain text format usage? Rate 0-1" },
 *   { "name": "analysis_scenario", "test": "Does '{{content}}' represent a text analysis use case? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Extract article for analysis: getContents({ url: "https://blog.example.com/tech-trends-2024", format: "text", options: { includeMetadata: true, extractLinks: true } })' as PromptPart;