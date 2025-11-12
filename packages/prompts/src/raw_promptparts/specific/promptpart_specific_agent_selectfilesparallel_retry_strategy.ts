import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Select Files Parallel agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Is retry strategy effective?", "score": 0.30 },
 *   { "name": "retry_clarity", "test": "Is retry strategy clear?", "score": 0.29 },
 *   { "name": "retry_completeness", "test": "Is retry strategy complete?", "score": 0.28 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: sequential fallback, partial selection, approximate matching, cached results, reduced parallelism, simplified patterns' as PromptPart;