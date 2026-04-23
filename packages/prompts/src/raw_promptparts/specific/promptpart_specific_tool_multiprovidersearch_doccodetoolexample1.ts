/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode multi-provider evidence search example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "evidence_example", "test": "Example uses providers for Bitcode evidence coverage", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLEXAMPLE1: PromptPart =
  'Bitcode multi-provider evidence search: { query: "official settlement proof verification interface requirements", options: { sourceScope: "primary-first", maxResults: 10 } }' as PromptPart;
