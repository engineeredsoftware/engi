import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Guidance for answering Bitcode Terminal conversation read requests"
 * current_version: "BITCODE_V26_CONVERSATION_SYSTEM_PROMPTPART.1"
 * versions: []
 * benchmarks: [
 *   { "name": "guidance_specificity", "test": "Does it direct assistants toward precise, verifiable answers?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_SYSTEM_BITCODETERMINALCONVERSATION_USAGE_GUIDANCE: PromptPart =
  'Use the Terminal prompt to answer with concrete Bitcode state, repository evidence, admitted tool or pipeline boundaries, and explicit next verification steps; do not detach Conversations from Bitcode.' as PromptPart;
