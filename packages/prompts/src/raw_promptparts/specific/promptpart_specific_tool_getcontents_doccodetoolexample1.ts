/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode source content retrieval documentation example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "source_example", "test": "Example retrieves a cited source for evidence", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLEXAMPLE1: PromptPart =
  'Example 1 - Retrieve official source: getContents({ url: "https://docs.example.org/protocol/settlement", format: "markdown", options: { includeMetadata: true } })' as PromptPart;
