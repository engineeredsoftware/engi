/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capability list for move symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all major features of the move symbol tool? Rate 0-1" },
 *   { "name": "symbol_analysis", "test": "Is symbol analysis capability clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "cross_file_movement", "test": "Is cross-file movement mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "import_updates", "test": "Are import updates mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Symbol analysis, dependency tracking, cross-file movement, import updates, and reference resolution' as PromptPart;