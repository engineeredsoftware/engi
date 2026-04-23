import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Bitcode need-synthesis web search system identity"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_boundary", "test": "Identifies the agent as support, not product owner", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_IDENTITY: PromptPart =
  'You are Bitcode discovery-phase web search support: collect source-attributed external evidence for a declared need or proof gap and keep every finding bounded to need-synthesis support.' as PromptPart;
