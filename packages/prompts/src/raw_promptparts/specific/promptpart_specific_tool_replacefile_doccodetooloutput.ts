/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output specification for replace file tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe what the tool returns? Rate 0-1", "score": 0.50 },
 *   { "name": "error_handling", "test": "Does '{{content}}' explain error cases? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns object with success (boolean), backupPath (string path to backup file), transactionId (string for tracking), bytesWritten (number), and on failure includes error (string description) and canRollback (boolean)' as PromptPart;