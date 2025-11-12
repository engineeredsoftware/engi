import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment criteria for Clone VCS Repository agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_completeness", "test": "Does it cover all critical assessment areas?", "score": 0.45 },
 *   { "name": "metric_specificity", "test": "Are metrics specific and measurable?", "score": 0.44 },
 *   { "name": "improvement_identification", "test": "Does it identify improvement paths?", "score": 0.43 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_REFINE_ASSESSMENT: PromptPart = 
  'Assess clone execution results by measuring: transfer speed against baseline benchmarks, object integrity through checksum verification, authentication latency and token refresh patterns, submodule synchronization completeness, local repository size versus remote, network retry frequency and failure patterns, post-clone hook execution success rates' as PromptPart;