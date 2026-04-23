/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Describes line-level repository evidence output for Bitcode inference support"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "output_completeness", "test": "Does '{{content}}' describe all possible search output formats? Rate 0-1", "score": 0.50 },
 *   { "name": "format_clarity", "test": "Are output formats clearly explained and structured? Rate 0-1", "score": 0.50 },
 *   { "name": "context_richness", "test": "Does the output provide sufficient context for analysis? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLOUTPUT: PromptPart = 
  'Array of repository evidence matches containing relative file path, zero-based line number, matched line text, and caller-selected evidence pattern context' as PromptPart;
