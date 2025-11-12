import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "RETRY details for Deliverables Clone VCS Repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "detail_concreteness", "test": "Details specify concrete recovery actions", "score": 0.50.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_RETRY_DETAILS: PromptPart =
  'Apply alternative refs, provider-specific adjustments, or reduced scope; ensure final status and metadata are recorded' as PromptPart;
