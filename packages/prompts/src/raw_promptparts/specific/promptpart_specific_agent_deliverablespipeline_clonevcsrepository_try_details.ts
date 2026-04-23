import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "TRY details for Deliverables Clone VCS Repository agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "detail_concreteness", "test": "Details specify concrete execution actions", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_TRY_DETAILS: PromptPart =
  'Use the deliverables clone tool with computed parameters; return success status, repository coordinates, and workspace path' as PromptPart;
