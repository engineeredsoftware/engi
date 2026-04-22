/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for code refactoring tool (rename symbol)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refactor_signal", "test": "Does '{{content}}' signal refactoring? Rate 0-1", "score": 0.5 },
 *   { "name": "operation_specificity", "test": "Does '{{content}}' indicate renaming symbols? Rate 0-1", "score": 0.5 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLNAME: PromptPart =
  'Rename Symbol Tool' as PromptPart;
