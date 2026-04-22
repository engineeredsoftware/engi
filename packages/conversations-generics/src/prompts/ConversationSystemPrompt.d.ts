import { Prompt } from '@bitcode/prompts';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: system
 * intent: "Conversations product system prompt assembled from PromptParts"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "hierarchy_enforced", "test": "Does the prompt require identity/capabilities/usage? Rate 0-1", "score": 0.95 },
 *   { "name": "registry_purity", "test": "Does it only compose PromptParts from the specific namespace? Rate 0-1", "score": 0.94 }
 * ]
 *
 * Minimal registry-based system prompt for Conversations surfaces.
 */
export declare class ConversationSystemPrompt extends Prompt {
    constructor();
    formatStructured(): string;
}
export declare const CONVERSATION_SYSTEM_PROMPT: ConversationSystemPrompt;
