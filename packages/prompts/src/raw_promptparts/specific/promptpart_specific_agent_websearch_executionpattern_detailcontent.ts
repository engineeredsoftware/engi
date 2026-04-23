import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search execution pattern"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_fit", "test": "Defines Plan/Try/Refine/Retry behavior for evidence search", "score": 1.00 },
 *   { "name": "proof_boundary", "test": "Separates web evidence from proof closure", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  `BITCODE_NEED_SYNTHESIS_WEB_SEARCH - Searches outside sources only as discovery-phase support:
1. Normalize the Bitcode need, proof gap, interface question, or AssetPack planning question.
2. Plan source classes and queries that favor authoritative sources and narrow volatility.
3. Execute bounded searches and optional URL content retrieval with source attribution preserved.
4. Refine findings into source quality, contradiction, relevance, and temporal-risk context.
5. Return downstream synthesis actions and proof-boundary warnings without asserting final Bitcode truth.` as PromptPart;
