import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Select Files Parallel agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.37 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.36 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Select files in parallel by: spawning concurrent file scanners with pattern matching, performing parallel content analysis and scoring, applying distributed filtering criteria, aggregating results from multiple workers, ranking files by relevance scores, optimizing selection for minimal set coverage, handling large-scale file systems efficiently' as PromptPart;