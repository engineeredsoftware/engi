import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is assessment accurate?", "score": 0.34 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable?", "score": 0.33 },
 *   { "name": "gap_identification", "test": "Does it identify gaps?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_REFINE_ASSESSMENT: PromptPart = 
  'Assess security posture by evaluating: vulnerability severity distribution, risk exposure metrics, compliance coverage percentage, security control effectiveness, remediation complexity estimates, residual risk calculations' as PromptPart;