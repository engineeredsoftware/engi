/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for replace file tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_identification_precision", "test": "Given the tool name '{{content}}', can an LLM immediately understand this is for replacing entire file contents? Rate 0-1", "score": 0.50 },
 *   { "name": "naming_convention_compliance", "test": "Does '{{content}}' follow the established tool naming pattern (verb-noun or domain-action)? Rate 0-1", "score": 0.50 },
 *   { "name": "disambiguation_clarity", "test": "Can '{{content}}' be clearly distinguished from edit/modify/update operations? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLNAME: PromptPart = 
  'Replace File Tool' as PromptPart;