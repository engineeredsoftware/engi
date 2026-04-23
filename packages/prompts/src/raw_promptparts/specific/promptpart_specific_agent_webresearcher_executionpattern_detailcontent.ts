/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research execution pattern through PTRR"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_boundary", "test": "Names evidence-only Plan/Try/Refine/Retry behavior", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  `BITCODE_EXTERNAL_EVIDENCE_PTRR:
1. Plan: translate the active need or proof gap into bounded source classes, query terms, and source-quality expectations
2. Try: collect source-attributed external findings through admitted search and content tools
3. Refine: deduplicate findings, classify source quality, separate evidence from interpretation, and record volatility
4. Retry: adjust query/source scope only to close evidence gaps, then state unresolved gaps explicitly
5. Handoff: pass auxiliary context to need-comprehension, proof, interface, or AssetPack owners without assuming their authority` as PromptPart;
