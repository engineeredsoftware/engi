import { Prompt } from '@bitcode/prompts/prompt';
import { hierarchicalFormatter } from '@bitcode/prompts/formatters';
import { PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_IDENTITY_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_system_conversationsproduct_identity_corestatement';
import { PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_system_conversationsproduct_capabilities_list';
import { PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_USAGE_GUIDANCE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_system_conversationsproduct_usage_guidance';

/**
 * @doc-comment-developing-promptdevelopment
 * domain: system
 * intent: "Conversations product system prompt assembled from PromptParts"
 * current_version: "BITCODE_V26_CONVERSATION_SYSTEM_PROMPT_REGISTRY.1"
 * versions: []
 * benchmarks: [
 *   { "name": "hierarchy_enforced", "test": "Does the prompt require identity/capabilities/usage? Rate 0-1", "score": 0.95 },
 *   { "name": "registry_purity", "test": "Does it only compose PromptParts from the specific namespace? Rate 0-1", "score": 0.94 }
 * ]
 *
 * Minimal registry-based system prompt for Conversations surfaces.
 */
export class ConversationSystemPrompt extends Prompt {
  constructor() {
    super();

    this.set('system:identity', PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_IDENTITY_CORESTATEMENT);
    this.set('system:capabilities', PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_CAPABILITIES_LIST);
    this.set('system:usage', PROMPTPART_SPECIFIC_SYSTEM_CONVERSATIONSPRODUCT_USAGE_GUIDANCE);

    this.require('system:identity');
    this.require('system:capabilities');
    this.require('system:usage');
    this.requireHierarchy();
  }

  formatStructured(): string {
    return super.format(hierarchicalFormatter);
  }
}

export const CONVERSATION_SYSTEM_PROMPT = new ConversationSystemPrompt();
