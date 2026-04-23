/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web research execution pattern through PTRR"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_boundary", "test": "Names discovery-phase need-synthesis Plan/Try/Refine/Retry behavior", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  `BITCODE_NEED_SYNTHESIS_WEB_RESEARCH_PTRR:
1. Plan: translate the active need-synthesis question into bounded source classes, query terms, and source-quality expectations
2. Try: collect source-attributed external findings through admitted search and content tools for discovery-phase need synthesis
3. Refine: deduplicate findings, classify source quality, separate evidence from canonical need interpretation, and record volatility
4. Retry: adjust query/source scope only to close evidence gaps, then state unresolved gaps explicitly
5. Handoff: pass auxiliary context to need-comprehension, proof, interface, or AssetPack owners without assuming their authority` as PromptPart;
