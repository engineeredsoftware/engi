import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of parallel analysis agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parallel_efficiency", "test": "Enables parallel analysis?", "score": 0.95 },
 *   { "name": "analysis_depth", "test": "Deep file analysis?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_PURPOSE_CORESTATEMENT: PromptPart = 
  'Parallel deep analysis of selected files extracting structure, dependencies, patterns, and semantic relationships with research insights' as PromptPart;