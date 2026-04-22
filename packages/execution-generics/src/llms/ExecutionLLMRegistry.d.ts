/**
 * ExecutionLLMRegistry - Registry for LLM configurations
 *
 * Parallel to ExecutionPrompt, provides hierarchical LLM management.
 * LLMs can be configured at any execution level and resolved upward.
 */
import { RegistryImpl } from '@bitcode/registry';
import { LLM, LLMConfig, LLMRegistry } from '@bitcode/llm-generics';
import { Execution } from '../Execution';
/**
 * ExecutionLLMRegistry - Hierarchical LLM configuration registry
 *
 * Stores LLM configurations in the execution tree.
 * When getting an LLM, walks up the hierarchy to find configuration.
 *
 * This wraps the llm-generics LLMRegistry to provide execution-aware lookup.
 */
export declare class ExecutionLLMRegistry extends RegistryImpl<LLMConfig> {
    private llmRegistry;
    constructor(llmRegistry?: LLMRegistry);
    /**
     * Get the default LLM by walking up hierarchy for 'default' config
     *
     * This is the primary way to get an LLM - looks for 'default' config
     * and creates an LLM with execution tracking.
     */
    getDefaultLLM(execution: Execution): LLM;
    /**
     * Get LLM by specific key
     *
     * Looks for specific key in hierarchy, useful for specialized LLMs.
     */
    getLLM(key: string, execution: Execution): LLM | undefined;
    /**
     * Wrap an LLM with execution tracking
     *
     * This adds automatic execution tracking to any LLM call.
     */
    private wrapWithExecutionTracking;
    /**
     * Set the wrapped LLM registry
     *
     * Allows injection of a configured LLMRegistry with providers.
     */
    setLLMRegistry(registry: LLMRegistry): void;
}
