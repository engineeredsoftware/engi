/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example usage of multi-provider search tool - basic search"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear, practical example? Rate 0-1", "score": 0.50 },
 *   { "name": "parameter_demonstration", "test": "Does the example show proper parameter usage? Rate 0-1", "score": 0.50 },
 *   { "name": "real_world_applicability", "test": "Is this a realistic use case? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Basic multi-provider search: { query: "TypeScript async error handling best practices", options: { urgency: "normal", maxResults: 10 } }' as PromptPart;