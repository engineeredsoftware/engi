/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Bitcode read-synthesis web search tool capabilities"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "source_traceability", "test": "Capabilities require source-attributed evidence", "score": 1.00 },
 *   { "name": "bitcode_boundary", "test": "Capabilities stay subordinate to read synthesis", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLCAPABILITIES: PromptPart =
  'Source-attributed web search, authoritative-source preference, optional provider comparison, URL intelligence for query targeting, snippets for evidence review, and source-quality metadata for Bitcode discovery-phase read synthesis' as PromptPart;
