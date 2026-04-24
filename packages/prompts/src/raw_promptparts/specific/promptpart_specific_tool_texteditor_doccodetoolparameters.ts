/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters description for text editor tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' describe all essential parameters? Rate 0-1", "score": 0.50 },
 *   { "name": "operation_types", "test": "Does '{{content}}' clearly list available operation types? Rate 0-1", "score": 0.50 },
 *   { "name": "transaction_support", "test": "Does '{{content}}' explain transaction ID usage? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPARAMETERS: PromptPart = 
  'filePath: string (required) - Absolute path to file; operation: "create" | "update" | "delete" | "replace" | "append" | "prepend" | "search_replace" - Operation type; content: string (conditional) - Content for operation; position: number (optional) - Line number for insertions; pattern: string (optional) - Search pattern for replacements; transactionId: string (optional) - Transaction ID for multi-file operations' as PromptPart;