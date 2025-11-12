import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-refine
 * intent: "Define quality criteria for selection: authority, recency, consistency, and source diversity"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Criteria are measurable and actionable", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly guides refinement step", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_QUALITY_CRITERIA: PromptPart =
  'Prioritize sources by authority (peer-reviewed, official documentation), recency, cross-source consistency, and domain reputation. Remove duplicates and weak sources.' as PromptPart;
