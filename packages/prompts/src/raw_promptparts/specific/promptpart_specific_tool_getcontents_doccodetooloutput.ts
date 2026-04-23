/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Bitcode source content retrieval output"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "output_boundary", "test": "Output remains cited source evidence", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLOUTPUT: PromptPart =
  'Retrieved source content in requested format, URL, title, description, author or publication metadata when available, extracted links, and success/error status for Bitcode evidence review' as PromptPart;
