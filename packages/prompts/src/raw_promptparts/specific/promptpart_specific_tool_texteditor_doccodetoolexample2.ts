/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example showing multi-file transaction operation"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "transaction_demonstration", "test": "Does '{{content}}' clearly show transaction usage? Rate 0-1", "score": 0.50 },
 *   { "name": "multi_file_scenario", "test": "Does '{{content}}' illustrate multi-file coordination? Rate 0-1", "score": 0.50 },
 *   { "name": "atomic_operation", "test": "Does '{{content}}' emphasize atomic nature of transactions? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Multi-file refactoring with transaction: const txId = await beginTransactionTool(); await textEditorTool({ filePath: "/src/index.ts", operation: "replace", content: newContent, transactionId: txId }); await textEditorTool({ filePath: "/tests/index.test.ts", operation: "update", content: updatedTests, transactionId: txId }); await commitTransactionTool({ transactionId: txId })' as PromptPart;