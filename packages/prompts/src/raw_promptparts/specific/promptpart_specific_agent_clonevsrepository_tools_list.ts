import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define tools used by VCS clone agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_coverage", "test": "Lists all necessary VCS tools?", "score": 0.94 },
 *   { "name": "accuracy", "test": "Correct tool names and purposes?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVSREPOSITORY_TOOLS_LIST: PromptPart = 
  'vcs-clone for repository cloning, vcs-checkout for branch selection, vcs-verify for integrity checks, file-system for local path management' as PromptPart;