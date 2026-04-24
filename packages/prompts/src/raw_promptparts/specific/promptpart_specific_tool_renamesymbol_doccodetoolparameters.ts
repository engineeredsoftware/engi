/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter documentation for rename symbol tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly explain each parameter and its purpose? Rate 0-1" },
 *   { "name": "usage_guidance", "test": "Does '{{content}}' provide enough context for correct parameter usage? Rate 0-1" },
 *   { "name": "type_indication", "test": "Are parameter types and formats clear from '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLPARAMETERS: PromptPart = 
  'filePath: absolute path to the file containing the symbol; position: line and column location of the symbol to rename; newName: the new name for the symbol (must be valid identifier); atomic: boolean for atomic operation mode (true for all-or-nothing); validateReferences: boolean to check all references before renaming' as PromptPart;