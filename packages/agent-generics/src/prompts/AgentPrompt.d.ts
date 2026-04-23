/**
 * Agent Prompt - Minimal prompt for agent-level context
 *
 * AgentPrompt is intentionally minimal: it contains only what applies
 * to every LLM call within the agent. Progressive specificity is achieved
 * through the Bitcode Registry-backed prompt hierarchy: Agent -> Step -> SubStep.
 *
 * Tools are NOT part of prompts - they're declared at agent level and
 * their doc-code-tool prompts are automatically included when available.
 *
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Provide minimal agent-level context that applies to all LLM calls"
 * current_version: "BITCODE_V26_AGENT_PROMPT_REGISTRY.1"
 */
import { Prompt } from '@bitcode/prompts/prompt';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
export interface AgentPromptConfig {
    name: PromptPart;
    identity: PromptPart;
}
/**
 * AgentPrompt - Minimal agent-level prompt
 *
 * This class is intentionally minimal. Agent prompts should contain
 * ONLY information relevant to EVERY LLM call within the agent.
 * More specific context is added through step and substep prompts.
 */
export declare class AgentPrompt extends Prompt {
    constructor(config: AgentPromptConfig);
    /**
     * Get the agent name
     */
    getName(): PromptPart;
    /**
     * Get the agent identity
     */
    getIdentity(): PromptPart;
}
