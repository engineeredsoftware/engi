/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode source content retrieval metadata example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "metadata_example", "test": "Example preserves metadata for source quality", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLEXAMPLE3: PromptPart =
  'Example 3 - Retrieve vendor source with metadata: getContents({ url: "https://vendor.example.com/changelog", format: "markdown", options: { includeMetadata: true, extractLinks: true } })' as PromptPart;
