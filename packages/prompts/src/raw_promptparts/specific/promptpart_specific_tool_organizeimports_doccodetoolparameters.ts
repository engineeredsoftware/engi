/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Key parameters for organize imports tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Are the key parameters clearly described in '{{content}}'? Rate 0-1" },
 *   { "name": "file_targeting", "test": "Is file targeting parameter mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "configuration_options", "test": "Are configuration options like sort style and grouping mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLPARAMETERS: PromptPart = 
  'filePath (target file), sortStyle (import ordering), removeUnused (cleanup unused), groupByType (grouping strategy)' as PromptPart;