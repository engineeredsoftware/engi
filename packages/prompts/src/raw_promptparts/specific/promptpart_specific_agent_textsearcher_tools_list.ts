/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search tool list"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_boundary", "test": "Names only admitted evidence support tooling", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TOOLS_LIST: PromptPart =
  `- simpleSystemTextSearch: grep-backed repository-evidence search returning relative file path, zero-based line, and matched text
- Prompt/Agent registries: carry generic generation/failsafe PromptParts plus specific repository-evidence PromptParts
- Downstream Bitcode owners: consume evidence for need comprehension, proof generation, AssetPack synthesis, file mutation, or delivery without delegating their authority to this agent` as PromptPart;
