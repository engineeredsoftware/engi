/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for code refactoring tool (organize imports)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refactor_signal", "test": "Does '{{content}}' signal refactoring? Rate 0-1", "score": 0.5 },
 *   { "name": "operation_specificity", "test": "Does '{{content}}' indicate organizing imports? Rate 0-1", "score": 0.5 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';
export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLNAME: PromptPart =
  'Organize Imports Tool' as PromptPart;
