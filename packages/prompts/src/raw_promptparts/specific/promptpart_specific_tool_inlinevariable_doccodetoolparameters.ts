/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Key parameters for inline variable tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Are the key parameters clearly described in '{{content}}'? Rate 0-1" },
 *   { "name": "file_targeting", "test": "Is file targeting parameter mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "position_specification", "test": "Is variable position parameter mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLPARAMETERS: PromptPart = 
  'filePath (target file), position (variable position), validateReferences (safety check), preserveComments (comment handling)' as PromptPart;