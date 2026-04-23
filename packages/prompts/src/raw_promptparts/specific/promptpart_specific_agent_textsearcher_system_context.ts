/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search system context"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "context_boundary", "test": "Places the agent inside Bitcode inference support", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_CONTEXT: PromptPart =
  'Runs inside Bitcode agentic pipelines as admitted support for repository source-grounding. Its context is local source evidence for needs, prompts, tools, schemas, proofs, written assets, and AssetPacks; it is not a standalone indexing platform.' as PromptPart;
