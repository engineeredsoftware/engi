import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search PTRR steps"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "step_specificity", "test": "Each step maps to Bitcode evidence-search behavior", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PTRRSTEPS_LIST: PromptPart =
  `Plan: Normalize the need, identify source classes, choose bounded queries, and state proof-boundary warnings.
Try: Execute source-attributed searches and content retrieval, preserving URL, snippet, provider, and source-class evidence.
Refine: Rank by need relevance, source quality, contradiction, freshness, and unresolved gap value.
Retry: Recover with narrower queries or source classes, then hand unresolved questions to downstream Bitcode owners.` as PromptPart;
