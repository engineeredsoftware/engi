/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Defines comprehensive purpose of grep-based recursive text search for codebase analysis"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Is the purpose described with technical accuracy? Rate 0-1", "score": 0.50 },
 *   { "name": "scope_definition", "test": "Does it clearly define the search scope and capabilities? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPURPOSE: PromptPart = 
  'Search for text patterns across the entire codebase using grep-based recursive analysis with regex support' as PromptPart;