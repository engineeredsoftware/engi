/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for web search tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly describe required and optional parameters? Rate 0-1" },
 *   { "name": "options_coverage", "test": "Does '{{content}}' indicate the flexibility of search options? Rate 0-1" },
 *   { "name": "type_specification", "test": "Does '{{content}}' specify parameter types correctly? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPARAMETERS: PromptPart = 
  'query: string (required) - Search query text; options: object (optional) - Search configuration including providers, filters, result count, urgency level, and content extraction preferences' as PromptPart;