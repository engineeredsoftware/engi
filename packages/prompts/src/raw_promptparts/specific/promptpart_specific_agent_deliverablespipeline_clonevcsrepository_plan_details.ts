import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need-first written-asset / asset-pack execution: agent deliverablespipeline clonevcsrepository plan details"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "detail_concreteness", "test": "Details specify concrete planning actions", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_PLAN_DETAILS: PromptPart =
  'Decide provider call shape, branch/ref, and workspace path expectations; prepare fallback refs and shallow clone options' as PromptPart;
