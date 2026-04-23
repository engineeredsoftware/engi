import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Purpose for Deliverables Clone VCS Repository agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_concreteness", "test": "Specifies concrete responsibilities", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_SYSTEM_PURPOSE: PromptPart =
  'Clone provider repositories reliably, set a workspace path, and persist minimal metadata required for SDIVS Discovery' as PromptPart;
