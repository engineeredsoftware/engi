/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web research tool list"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_boundary", "test": "Names only admitted discovery source tools", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TOOLS_LIST: PromptPart =
  `- search: source-attributed external search returning titles, URLs, snippets, metadata, and provider evidence for read synthesis
- searchWithUrlIntelligence: URL-aware external search used only to narrow evidence scope
- multiProviderSearch: multi-source external evidence collection with provider and result metadata
- getContents: bounded URL content retrieval for source context
- Downstream Bitcode owners: consume discovery evidence for read synthesis, proof review, interface planning, AssetPack synthesis, mutation, or delivery without delegating their authority to this agent` as PromptPart;
