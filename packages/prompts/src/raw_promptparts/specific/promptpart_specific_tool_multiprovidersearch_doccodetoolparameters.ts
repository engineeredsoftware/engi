/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter specification for multi-provider search tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' include all required and optional parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "type_specification", "test": "Are parameter types and constraints clearly specified? Rate 0-1", "score": 0.50 },
 *   { "name": "provider_options", "test": "Are provider selection options clearly explained? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPARAMETERS: PromptPart = 
  'query: string (required) - Search query text; urlAttachments: string[] (optional) - URLs to include in search context; options: object (optional) - Provider preferences, urgency level, result limits, timeout settings' as PromptPart;