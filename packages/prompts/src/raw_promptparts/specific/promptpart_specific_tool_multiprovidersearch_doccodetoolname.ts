/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for multi-provider search tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_identification_precision", "test": "Given the tool name '{{content}}', can an LLM immediately understand this is for multi-provider search? Rate 0-1", "score": 0.50 },
 *   { "name": "naming_convention_compliance", "test": "Does '{{content}}' follow the established tool naming pattern? Rate 0-1", "score": 0.50 },
 *   { "name": "provider_diversity_clarity", "test": "Does '{{content}}' clearly indicate support for multiple search providers? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLNAME: PromptPart = 
  'Multi-Provider Search Tool' as PromptPart;