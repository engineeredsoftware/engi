import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for codebase analysis agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.96 },
 *   { "name": "specificity", "test": "Specific to analysis tasks?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_IDENTITY: PromptPart = 
  'Codebase architect specializing in structure and pattern analysis' as PromptPart;