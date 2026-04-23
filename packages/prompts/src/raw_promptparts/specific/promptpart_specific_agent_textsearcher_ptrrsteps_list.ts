/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search PTRR steps"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_precision", "test": "Maps each PTRR step to Bitcode evidence support", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PTRRSTEPS_LIST: PromptPart =
  `Plan: derive source-evidence patterns from the active Bitcode need or AssetPack question
Try: run bounded simpleSystemTextSearch calls inside the allowed repository/package path
Refine: deduplicate and classify matches as source-grounding evidence, gaps, or ambiguity
Retry: adjust patterns only to resolve evidence gaps and state remaining uncertainty
Finish handoff: pass evidence to downstream Bitcode owners without claiming mutation, delivery, or proof closure` as PromptPart;
