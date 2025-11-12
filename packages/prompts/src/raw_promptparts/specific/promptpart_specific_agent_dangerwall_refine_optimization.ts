import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step optimization for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_effectiveness", "test": "Does it optimize effectively?", "score": 0.35 },
 *   { "name": "refinement_depth", "test": "Are refinements comprehensive?", "score": 0.34 },
 *   { "name": "improvement_quality", "test": "Are improvements meaningful?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_REFINE_OPTIMIZATION: PromptPart = 
  'Refine security analysis by: correlating vulnerabilities across components, prioritizing risks by exploitability and impact, identifying defense-in-depth opportunities, suggesting security hardening measures, validating remediation effectiveness, enhancing threat detection coverage' as PromptPart;