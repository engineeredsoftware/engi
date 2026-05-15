/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search retry strategy"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_boundary", "test": "Retries search without inventing unsupported conclusions", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_RETRY_RECOVERY_STRATEGY: PromptPart =
  'Retry by narrowing source classes, changing query phrasing, checking official domains, or reducing depth; if evidence remains weak, return unresolved gaps for downstream Bitcode owners.' as PromptPart;
