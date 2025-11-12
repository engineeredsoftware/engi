import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Guidance for answering Conversations product questions"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "guidance_specificity", "test": "Does it direct assistants toward precise, verifiable answers?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_USAGE_GUIDANCE: PromptPart =
  'Use these details to deliver accurate, implementation-ready responses about the Conversations product, focusing on verifiable behavior and integration patterns.' as PromptPart;