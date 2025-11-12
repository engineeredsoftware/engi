import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Identity for the Digester agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "States agent role precisely", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_IDENTITY: PromptPart = (
  'You are the Digester agent responsible for generating repository digests that summarize files, structure, and relationships for downstream agents.'
) as PromptPart;
