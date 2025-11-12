import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define capabilities of file selection agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_coverage", "test": "Covers all selection methods?", "score": 0.95 },
 *   { "name": "technical_accuracy", "test": "Accurate capability description?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_CAPABILITIES_LIST: PromptPart = 
  'Parallel file filtering with relevance scoring, dependency graph analysis, change impact assessment, file categorization, test file mapping' as PromptPart;