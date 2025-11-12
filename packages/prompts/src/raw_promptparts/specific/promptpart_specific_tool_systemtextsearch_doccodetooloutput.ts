/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Describes structured output format for text search results with context information"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_completeness", "test": "Does '{{content}}' describe all possible search output formats? Rate 0-1", "score": 0.50 },
 *   { "name": "format_clarity", "test": "Are output formats clearly explained and structured? Rate 0-1", "score": 0.50 },
 *   { "name": "context_richness", "test": "Does the output provide sufficient context for analysis? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLOUTPUT: PromptPart = 
  'Array of search results containing: file path, line number, line content, and match context' as PromptPart;