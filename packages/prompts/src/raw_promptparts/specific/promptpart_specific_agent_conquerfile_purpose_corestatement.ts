import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of conquer file agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "file_focus", "test": "Focuses on single file changes?", "score": 0.96 },
 *   { "name": "implementation_quality", "test": "Produces quality code?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute file-specific changes maintaining code quality, style consistency, and functional correctness within isolated file scope' as PromptPart;