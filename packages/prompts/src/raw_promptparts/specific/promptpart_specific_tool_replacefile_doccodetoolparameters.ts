/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter specification for replace file tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Are all parameters clearly specified with types? Rate 0-1", "score": 0.50 },
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' include all necessary parameters? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPARAMETERS: PromptPart = 
  'EditCommandParams with required fields: filePath (string) - absolute path to file to replace, newContent (string) - complete new content for the file, transactionId (string, optional) - for multi-file atomic operations' as PromptPart;