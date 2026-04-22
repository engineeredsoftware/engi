/**
 * Agent Step Prompt - Minimal prompt for step-level context
 *
 * AgentStepPrompt adds step-specific context (Plan/Try/Refine/Retry)
 * to the agent-level prompt. Still minimal - only the purpose of the step.
 *
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Provide step-specific purpose that applies to all substeps"
 * current_version: "GA1.50.0"
 */
import { Prompt } from '@bitcode/prompts';
import type { PromptPart } from '@bitcode/prompts';
export interface AgentStepPromptConfig {
    purpose: PromptPart;
}
/**
 * AgentStepPrompt - Minimal step-level prompt
 *
 * Adds only the step purpose. This applies to all substeps
 * within this PTRR step.
 */
export declare class AgentStepPrompt extends Prompt {
    constructor(config: AgentStepPromptConfig);
    /**
     * Get the step purpose
     */
    getPurpose(): PromptPart;
}
