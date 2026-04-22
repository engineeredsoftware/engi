/**
 * PipelinePromptRegistry - Prompt registry for pipeline executions
 *
 * Manages prompt registration and hierarchical lookup for pipelines.
 * Prompts are resolved up the execution tree for reuse.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical prompt management for pipelines
 * pattern: registry-with-execution-context
 */
import { RegistryImpl } from '@bitcode/registry';
import { Execution } from '@bitcode/execution-generics';
/**
 * PipelinePromptRegistry - Hierarchical prompt registry for pipelines
 *
 * Wraps the base PromptRegistry with execution-aware resolution.
 * Prompts can be registered at any level and resolved upward.
 */
export declare class PipelinePromptRegistry extends RegistryImpl<any> {
    private readonly execution;
    private baseRegistry;
    constructor(execution: Execution, baseRegistry?: RegistryImpl<any>);
    /**
     * Register a prompt at this execution level
     *
     * Prompts are stored with path-based keys for hierarchical lookup.
     * Example keys:
     * - "pipeline:setup" - Setup phase prompt
     * - "pipeline:discovery" - Discovery phase prompt
     * - "pipeline:implementation" - Implementation phase prompt
     * - "pipeline:validation" - Validation phase prompt
     * - "pipeline:shipping" - Shipping phase prompt
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
     * Check if a prompt exists anywhere in the hierarchy
     */
    hasPrompt(key: string): boolean;
    /**
     * Get all prompts at this level (not including parents)
     */
    getAllLocalPrompts(): Map<string, any>;
}
