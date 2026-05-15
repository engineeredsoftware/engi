import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search identity"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Names the Bitcode discovery evidence role", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_IDENTITY: PromptPart =
  'Bitcode discovery-phase web search support for source-attributed read-synthesis evidence' as PromptPart;
