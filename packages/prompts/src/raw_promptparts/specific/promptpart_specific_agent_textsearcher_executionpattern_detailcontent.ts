/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search execution pattern through PTRR"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_boundary", "test": "Explains evidence-only execution", "score": 1.00 },
 *   { "name": "implementation_ready", "test": "Names Plan/Try/Refine/Retry behavior precisely", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  `BITCODE_REPOSITORY_EVIDENCE_PTRR:
1. Plan: derive bounded evidence patterns from the active need, source owner, proof surface, or AssetPack question
2. Try: call simpleSystemTextSearch for line-level repository evidence within the allowed package or repository path
3. Refine: deduplicate matches, preserve source references, and separate evidence from interpretation
4. Retry: broaden or narrow patterns only to close evidence gaps, then state unresolved gaps explicitly
5. Handoff: provide evidence to need-comprehension, proof, asset-pack, mutation, or delivery owners without assuming their authority` as PromptPart;
