/**
 * AgentLLMsRegistry - LLM registry for agent executions
 *
 * Manages LLM configuration and hierarchical lookup for agents.
 * LLMs can be configured at any level and resolved upward.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical LLM management for agents
 * pattern: registry-with-execution-tracking
 */
import { RegistryImpl } from '@bitcode/registry';
import { LLM, LLMConfig, LLMRegistry } from '@bitcode/llm-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
/**
 * AgentLLMsRegistry - Hierarchical LLM configuration registry for agents
 *
 * Stores LLM configurations in the execution tree.
 * When getting an LLM, walks up the hierarchy to find configuration.
 * Wraps LLM calls with automatic execution tracking.
 */
export declare class AgentLLMsRegistry extends RegistryImpl<LLMConfig> {
    private readonly execution;
    private llmRegistry;
    constructor(execution: Execution, llmRegistry?: LLMRegistry);
    /**
     * Check if a config key is configured in this level
     */
    hasConfigHere(key?: string): boolean;
    /**
     * Find a config by walking up the execution hierarchy
     */
    findConfigInHierarchy(key?: string): LLMConfig | undefined;
    /**
     * Ensure a default config exists; optionally throw or just return boolean
     */
    ensureDefaultConfigured(options?: {
        throw?: boolean;
    }): boolean;
    /**
     * Register an LLM configuration at this level
     *
     * Keys can be:
     * - "default" - Default LLM for this agent
     * - "fast" - Fast model for quick operations
     * - "powerful" - More capable model for complex tasks
     * - Custom keys for specific use cases
     */
    registerLLMConfig(key: string, config: LLMConfig, priority?: number): void;
    /**
     * Get the default LLM by walking up hierarchy for 'default' config
     */
    getDefaultLLM(): LLM;
    /**
     * Get LLM by specific key
     */
    getLLM(key: string): LLM | undefined;
    /**
     * Get LLM with fallback pattern
     *
     * Try multiple keys in order, returning first match.
     * Example: Try "fast" then fall back to "default"
     */
    getLLMWithFallback(keys: string[]): LLM | undefined;
    /**
     * Wrap an LLM with execution tracking
     */
    private wrapWithExecutionTracking;
    /**
     * Get execution path for hierarchy
     */
    private getExecutionPath;
    /**
     * Get all LLM configs available in hierarchy
     */
    getUsableLLMConfigs(): Record<string, LLMConfig>;
    /**
     * Set the wrapped LLM registry
     */
    setLLMRegistry(registry: LLMRegistry): void;
}
