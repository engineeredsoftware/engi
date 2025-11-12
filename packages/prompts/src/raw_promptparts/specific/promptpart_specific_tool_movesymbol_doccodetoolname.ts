/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for code refactoring tool (move symbol)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refactor_signal", "test": "Does '{{content}}' signal refactoring? Rate 0-1", "score": 0.5 },
 *   { "name": "operation_specificity", "test": "Does '{{content}}' indicate moving symbols? Rate 0-1", "score": 0.5 }
 * ]
 */

import { PromptPart } from '@engi/prompts';
export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLNAME: PromptPart =
  'Move Symbol Tool' as PromptPart;
