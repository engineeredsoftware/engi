/**
 * PipelineAgentRegistry - Agent registry for pipeline executions
 *
 * Manages agent registration and dynamic selection for pipelines.
 * Replaces the old variations pattern with registry-based selection.
 *
 * @doc-code
 * type: registry
 * purpose: Dynamic agent selection for pipelines
 * pattern: registry-based-polymorphism
 */
import { RegistryImpl } from '@bitcode/registry';
import { Agent } from '@bitcode/agent-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
/**
 * ExecutionAgent - Agent that can be bound to execution context
 *
 * Wraps base Agent with execution binding capability.
 */
export interface ExecutionAgent<TInput = any, TOutput = any> extends Agent<TInput, TOutput> {
    bindExecution?(execution: Execution): this;
}
/**
 * PipelineAgentRegistry - Dynamic agent registry for pipelines
 *
 * Stores agent instances and provides hierarchical lookup.
 * Agents are selected dynamically based on runtime conditions.
 *
 * Example usage:
 * - Register base agent: registry.registerAgent('vcs', vcsAgent)
 * - Register specialized: registry.registerAgent('vcs:pr', vcsPRAgent, 10)
 * - Get with fallback: registry.getAgentWithFallback(['vcs:pr', 'vcs'])
 */
export declare class PipelineAgentRegistry extends RegistryImpl<ExecutionAgent> {
    private readonly execution;
    constructor(execution: Execution);
    /**
     * Register an agent with optional priority
     *
     * Path examples:
     * - "vcs" - base VCS agent
     * - "vcs:pr" - PR-specific VCS agent
     * - "vcs:issue" - Issue-specific VCS agent
     * - "implementation:pr" - PR implementation agent
     * - "validation:comprehensive" - Comprehensive validation
     */
    registerAgent<TInput, TOutput>(path: string, agent: ExecutionAgent<TInput, TOutput>, priority?: number): void;
    /**
     * Get agent by key with execution binding
     * Walks up hierarchy to find best match
     */
    getAgent(key: string): ExecutionAgent | undefined;
    /**
     * Get agent with fallback pattern
     *
     * Example: Try "vcs:pr", fall back to "vcs"
     * This enables specialization with graceful degradation.
     */
    getAgentWithFallback(keys: string[]): ExecutionAgent | undefined;
    /**
     * Get all agents matching a pattern
     *
     * Example: getPattern("vcs:*") returns all VCS variants
     */
    getAgentsByPattern(pattern: string): Record<string, ExecutionAgent>;
    /**
     * Convert simple glob pattern to regex
     */
    private patternToRegex;
}
