/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Key parameters for move symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Are the key parameters clearly described in '{{content}}'? Rate 0-1" },
 *   { "name": "file_specification", "test": "Are source and target file parameters mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "symbol_identification", "test": "Is symbol name parameter mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLPARAMETERS: PromptPart = 
  'sourceFile (current location), targetFile (destination), symbolName (symbol to move), updateImports (automatic import fixes)' as PromptPart;