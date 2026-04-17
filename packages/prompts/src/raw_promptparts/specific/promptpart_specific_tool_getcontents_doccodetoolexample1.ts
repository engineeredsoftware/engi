/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing basic content extraction"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "basic_usage", "test": "Does '{{content}}' demonstrate simple URL content extraction? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Does '{{content}}' represent a typical documentation retrieval? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Extract documentation page: getContents({ url: "https://docs.example.com/api/guide", format: "markdown" })' as PromptPart;