/**
 * AgentPromptsRegistry - Prompt registry for agent executions
 *
 * Manages prompt registration and hierarchical lookup for agents.
 * Prompts are resolved up the execution tree for reuse.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical prompt management for agents
 * pattern: registry-with-execution-context
 */
import { RegistryImpl } from '@bitcode/registry';
import { Execution } from '@bitcode/execution-generics';
/**
 * AgentPromptsRegistry - Hierarchical prompt registry for agents
 *
 * Wraps the base PromptRegistry with execution-aware resolution.
 * Prompts can be registered at any level and resolved upward.
 */
export declare class AgentPromptsRegistry extends RegistryImpl<any> {
    private readonly execution;
    private baseRegistry;
    constructor(execution: Execution, baseRegistry?: RegistryImpl<any>);
    /**
     * Register a prompt at this execution level
     *
     * Prompts are stored with path-based keys for hierarchical lookup.
     * Example keys:
     * - "agent:plan" - Planning prompt
     * - "agent:refine" - Refinement prompt
     * - "tool:execute" - Tool execution prompt
     */
    registerPrompt(key: string, prompt: any, priority?: number): void;
    /**
     * Get prompt by walking up the execution hierarchy
     *
     * Searches from current level up through parents.
     * This enables prompt inheritance and specialization.
     */
    getPrompt(key: string): any | undefined;
    /**
     * Get prompt with fallback pattern
     *
     * Try multiple keys in order, returning first match.
     * Useful for graceful degradation to generic prompts.
     */
    getPromptWithFallback(keys: string[]): any | undefined;
    /**
     * Get all prompts available in hierarchy
     */
    getUsablePrompts(): Record<string, any>;
    /**
     * Set the wrapped base registry
     */
    setBaseRegistry(registry: RegistryImpl<any>): void;
}
