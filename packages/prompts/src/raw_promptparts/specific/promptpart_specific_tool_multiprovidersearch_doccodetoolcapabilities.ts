/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode multi-provider evidence search capabilities"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "provider_boundary", "test": "Provider orchestration is scoped to evidence coverage", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLCAPABILITIES: PromptPart =
  'Provider comparison, failover, result deduplication, source attribution, source-class coverage, URL attachment targeting, and source-quality metadata for Bitcode discovery-phase need-synthesis evidence' as PromptPart;
