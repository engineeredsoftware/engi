import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Analyze Parallel agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine assessment effective?", "score": 0.31 },
 *   { "name": "refine_clarity", "test": "Is refine assessment clear?", "score": 0.30 },
 *   { "name": "refine_completeness", "test": "Is refine assessment complete?", "score": 0.29 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_REFINE_ASSESSMENT: PromptPart = 
  'Assess analysis quality by evaluating: coverage completeness percentage, detection accuracy rates, performance speedup metrics, resource utilization efficiency, false positive ratios, scalability factors' as PromptPart;