import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Analyze Parallel agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan strategy effective?", "score": 0.35 },
 *   { "name": "plan_clarity", "test": "Is plan strategy clear?", "score": 0.34 },
 *   { "name": "plan_completeness", "test": "Is plan strategy complete?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_PLAN_STRATEGY: PromptPart = 
  'Plan parallel analysis by determining: worker allocation strategies, module partitioning criteria, synchronization requirements, result aggregation methods, resource distribution patterns, concurrency limits' as PromptPart;