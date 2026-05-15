/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-plan
 * intent: "Bitcode read-synthesis web research plan analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "planning_boundary", "test": "Analyzes the read-synthesis question before selecting external sources", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PLAN_RESEARCH_ANALYSIS: PromptPart =
  'Identify the discovery-phase Bitcode read-synthesis question, proof-gap question, third-party interface concern, source owner, or AssetPack planning concern that requires external context; record why web research is needed before searching.' as PromptPart;
