/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research PTRR steps"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_boundary", "test": "Keeps PTRR steps as auxiliary evidence gathering and handoff", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST: PromptPart =
  `Plan: derive bounded source classes and queries from the active Bitcode need or proof gap
Try: collect source-attributed external findings with admitted search/content tools
Refine: classify source quality, volatility, contradictions, and relevance
Retry: adjust source/query scope only to resolve evidence gaps and state remaining uncertainty
Finish handoff: pass auxiliary context to downstream Bitcode owners without claiming mutation, delivery, or proof closure` as PromptPart;
