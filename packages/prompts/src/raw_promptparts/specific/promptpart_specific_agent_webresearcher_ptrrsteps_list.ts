/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web research PTRR steps"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_boundary", "test": "Keeps PTRR steps as discovery-phase evidence gathering and handoff", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST: PromptPart =
  `Plan: derive bounded source classes and queries from the active Bitcode need-synthesis question
Try: collect source-attributed external findings with admitted search/content tools for discovery-phase synthesis
Refine: classify source quality, volatility, contradictions, and relevance
Retry: adjust source/query scope only to resolve evidence gaps and state remaining uncertainty
Finish handoff: pass auxiliary context to downstream Bitcode owners without claiming mutation, delivery, or proof closure` as PromptPart;
