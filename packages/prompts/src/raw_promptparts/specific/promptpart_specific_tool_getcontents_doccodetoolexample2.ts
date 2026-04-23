/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode source content retrieval constrained example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "constraint_example", "test": "Example scopes retrieval to evidence inspection", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLEXAMPLE2: PromptPart =
  'Example 2 - Retrieve source text for evidence review: getContents({ url: "https://standards.example.org/api", format: "text", options: { timeout: 10000, extractLinks: true } })' as PromptPart;
