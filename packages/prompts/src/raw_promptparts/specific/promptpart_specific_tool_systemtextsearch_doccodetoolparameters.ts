/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Specifies required and optional parameters for text search operations with regex support"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' specify all required text search parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_accuracy", "test": "Are parameter types and requirements accurate? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_guidance", "test": "Do parameters provide clear implementation guidance? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPARAMETERS: PromptPart = 
  'pattern: string (required) - Search pattern or regex; directory: string (optional) - Target directory path; caseSensitive: boolean (optional) - Case sensitivity flag; limit: number (optional) - Maximum results' as PromptPart;