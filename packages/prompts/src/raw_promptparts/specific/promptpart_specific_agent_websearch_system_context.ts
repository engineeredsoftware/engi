import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Bitcode read-synthesis web search system context"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "context_boundary", "test": "Places web search inside Bitcode discovery support", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_CONTEXT: PromptPart =
  'Operate inside a parent Bitcode inference run as discovery-phase support. Web search may enrich read synthesis with source-attributed external evidence, but downstream Bitcode owners decide canonical read semantics, proof closure, mutations, delivery mechanisms, and product behavior.' as PromptPart;
