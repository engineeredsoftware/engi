import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need-first written-asset / asset-pack execution: agent deliverablespipeline clonevcsrepository refine details"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "detail_concreteness", "test": "Details specify concrete refinement actions", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_REFINE_DETAILS: PromptPart =
  'Handle fallback refs, shallow/complete clone toggles, and workspace path corrections; ensure idempotency' as PromptPart;
