import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode Terminal conversation Try step purpose"
 * current_version: "BITCODE_V26_CONVERSATION_AGENT_PROMPTPART.1"
 * versions: []
 * benchmarks: [
 *   { "name": "step_specificity", "test": "Does the PromptPart specify the Try role?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONVERSATIONAGENT_PTRRTRY_PURPOSE: PromptPart =
  'Generate the Bitcode Terminal response with repository-aware reasoning, cited context, and explicit pipeline trigger candidates when needed.' as PromptPart;
