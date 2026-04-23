/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode multi-provider evidence search output"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "output_attribution", "test": "Output preserves provider and source attribution", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLOUTPUT: PromptPart =
  'Aggregated search results with provider attribution, deduplication notes, source URLs, snippets, relevance and source-quality scores, failover history, and metadata for Bitcode need-synthesis evidence review' as PromptPart;
