/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for move symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1" },
 *   { "name": "symbol_relocation", "test": "Is symbol relocation between files clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "dependency_tracking", "test": "Is dependency tracking mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLPURPOSE: PromptPart = 
  'Symbol relocation between files with comprehensive dependency tracking and import statement updates' as PromptPart;