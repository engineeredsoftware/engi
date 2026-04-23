/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-plan
 * intent: "Bitcode external-evidence research plan analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "planning_boundary", "test": "Analyzes the need before selecting external sources", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PLAN_RESEARCH_ANALYSIS: PromptPart =
  'Identify the Bitcode need, proof gap, third-party interface question, source owner, or AssetPack planning concern that requires external context; record why external evidence is needed before searching.' as PromptPart;
