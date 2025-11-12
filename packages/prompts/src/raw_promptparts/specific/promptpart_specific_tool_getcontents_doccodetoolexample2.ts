/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing HTML extraction with options"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "format_demo", "test": "Does '{{content}}' demonstrate HTML format extraction? Rate 0-1" },
 *   { "name": "options_usage", "test": "Does '{{content}}' show additional options configuration? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Extract with custom headers: getContents({ url: "https://app.example.com/content", format: "html", options: { headers: { "Authorization": "Bearer token" }, timeout: 10000 } })' as PromptPart;