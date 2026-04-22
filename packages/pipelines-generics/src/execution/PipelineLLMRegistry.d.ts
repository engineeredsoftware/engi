/**
 * PipelineLLMRegistry - LLM registry for pipeline executions
 *
 * Manages LLM configuration and hierarchical lookup for pipelines.
 * LLMs can be configured at any level and resolved upward.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical LLM management for pipelines
 * pattern: registry-with-execution-tracking
 */
import { RegistryImpl } from '@bitcode/registry';
import { LLM, LLMConfig, LLMRegistry } from '@bitcode/llm-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
/**
 * PipelineLLMRegistry - Hierarchical LLM configuration registry
 *
 * Stores LLM configurations in the execution tree.
 * When getting an LLM, walks up the hierarchy to find configuration.
 */
export declare class PipelineLLMRegistry extends RegistryImpl<LLMConfig> {
    private readonly execution;
    private llmRegistry;
    constructor(execution: Execution, llmRegistry?: LLMRegistry);
    /**
     * Get the default LLM by walking up hierarchy for 'default' config
     */
    getDefaultLLM(): LLM;
    /**
     * Get LLM by specific key
     */
    getLLM(key: string): LLM | undefined;
    /**
     * Wrap an LLM with execution tracking
     */
    private wrapWithExecutionTracking;
    /**
     * Get execution path for hierarchy
     */
    private getExecutionPath;
    /**
     * Set the wrapped LLM registry
     */
    setLLMRegistry(registry: LLMRegistry): void;
}
