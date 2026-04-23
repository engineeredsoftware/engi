import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need-first written-asset / asset-pack execution: agent deliverablespipeline clonevcsrepository try details"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "detail_concreteness", "test": "Details specify concrete execution actions", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_TRY_DETAILS: PromptPart =
  'Use the deliverables clone tool with computed parameters; return success status, repository coordinates, and workspace path' as PromptPart;
