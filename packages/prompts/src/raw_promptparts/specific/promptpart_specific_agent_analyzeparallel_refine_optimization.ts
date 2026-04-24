import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Analyze Parallel agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine optimization effective?", "score": 0.32 },
 *   { "name": "refine_clarity", "test": "Is refine optimization clear?", "score": 0.31 },
 *   { "name": "refine_completeness", "test": "Is refine optimization complete?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_REFINE_OPTIMIZATION: PromptPart = 
  'Refine parallel analysis by: optimizing worker distribution, improving synchronization efficiency, enhancing detection accuracy, reducing false positives, accelerating aggregation, expanding coverage scope' as PromptPart;