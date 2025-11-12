import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Initialize LSP agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is assessment accurate?", "score": 0.34 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable?", "score": 0.33 },
 *   { "name": "gap_identification", "test": "Does it identify gaps?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_REFINE_ASSESSMENT: PromptPart = 
  'Assess initialization success by evaluating: connection stability metrics, feature availability coverage, response time benchmarks, diagnostic accuracy rates, resource utilization levels, error frequency patterns' as PromptPart;