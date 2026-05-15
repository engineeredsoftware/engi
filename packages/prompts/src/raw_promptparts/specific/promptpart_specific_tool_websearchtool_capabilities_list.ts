import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode web search tool capabilities PromptPart"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_boundary", "test": "Capabilities are source-evidence support only", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCHTOOL_CAPABILITIES_LIST: PromptPart =
  `- Search external sources for a declared Bitcode read or proof gap
- Prefer authoritative sources and preserve source attribution
- Filter by domain, date, provider, and source class when needed
- Return snippets, URLs, metadata, and evidence-use notes
- Hand unresolved source gaps to downstream Bitcode read and proof owners` as PromptPart;
