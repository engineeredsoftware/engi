import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define tools used by file selection agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_coverage", "test": "Lists all file selection tools?", "score": 0.94 },
 *   { "name": "accuracy", "test": "Correct tool purposes?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_TOOLS_LIST: PromptPart = 
  'file-pick for relevance selection, file-filter for exclusion, lsp-query for dependency analysis, ast-parser for structure understanding' as PromptPart;