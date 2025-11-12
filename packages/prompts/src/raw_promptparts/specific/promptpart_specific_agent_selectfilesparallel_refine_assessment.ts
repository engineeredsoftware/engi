import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Select Files Parallel agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine assessment effective?", "score": 0.31 },
 *   { "name": "refine_clarity", "test": "Is refine assessment clear?", "score": 0.30 },
 *   { "name": "refine_completeness", "test": "Is refine assessment complete?", "score": 0.29 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_REFINE_ASSESSMENT: PromptPart = 
  'Assess selection quality by evaluating: precision and recall metrics, coverage completeness, performance benchmarks, relevance scores, efficiency ratios, scalability metrics' as PromptPart;