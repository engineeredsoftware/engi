/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan which Bitcode need, proof, prompt, tool, schema, or AssetPack terms require source evidence"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "evidence_planning", "test": "Plans source-grounding patterns from Bitcode semantics", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PLAN_CONTENT_ANALYSIS: PromptPart =
  'Identify the Bitcode need, source owner, proof surface, prompt registry, tool boundary, schema, or AssetPack term that requires repository evidence; record why each pattern is needed before running search.' as PromptPart;
