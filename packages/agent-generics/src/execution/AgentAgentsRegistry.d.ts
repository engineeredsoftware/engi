/**
 * AgentAgentsRegistry - Agent registry for agent executions
 *
 * Manages sub-agent registration and dynamic selection for agents.
 * Enables agents to delegate work to other agents dynamically.
 *
 * @doc-code
 * type: registry
 * purpose: Dynamic sub-agent delegation for agents
 * pattern: registry-based-agent-composition
 */
import { RegistryImpl } from '@bitcode/registry';
import { Agent } from '../types';
import { Execution } from '@bitcode/execution-generics';
/**
 * ExecutionAgent - Agent that can be bound to execution context
 *
 * Wraps base Agent with execution binding capability.
 */
export interface ExecutionAgent<TInput = any, TOutput = any> extends Agent<TInput, TOutput> {
    bindExecution?(execution: Execution): this;
}
/**
 * AgentAgentsRegistry - Dynamic agent registry for sub-agent delegation
 *
 * Stores agent instances and provides hierarchical lookup.
 * Agents can delegate to sub-agents registered at any level.
 *
 * Example usage:
 * - Register base: registry.registerAgent('validation', validationAgent)
 * - Register specialized: registry.registerAgent('validation:security', securityValidationAgent)
 * - Delegate with fallback: registry.getAgentWithFallback(['validation:security', 'validation'])
 */
export declare class AgentAgentsRegistry extends RegistryImpl<ExecutionAgent> {
    private readonly execution;
    constructor(execution: Execution);
    /**
     * Check if an agent key exists at this level
     */
    hasAgentHere(key: string): boolean;
    /**
     * Ensure that required agent keys exist in the hierarchy
     */
    ensureAgents(keys: string[], options?: {
        throw?: boolean;
    }): string[];
    /**
     * Register an agent with optional priority
     *
     * Path examples:
     * - "analysis" - Base analysis agent
     * - "analysis:code" - Code-specific analysis agent
     * - "analysis:security" - Security analysis agent
     * - "refinement:comprehensive" - Comprehensive refinement
     * - "validation:unit-test" - Unit test validation
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
     * Example: Try "analysis:security", fall back to "analysis"
     * This enables specialization with graceful degradation.
     */
    getAgentWithFallback(keys: string[]): ExecutionAgent | undefined;
    /**
     * Get all agents matching a pattern
     *
     * Example: getAgentsByPattern("analysis:*") returns all analysis variants
     */
    getAgentsByPattern(pattern: string): Record<string, ExecutionAgent>;
    /**
     * Get all agents available in hierarchy
     */
    getUsableAgents(): Record<string, ExecutionAgent>;
    /**
     * Delegate to an agent with automatic execution tracking
     *
     * Creates a child execution for the delegated agent and tracks results.
     */
    delegateToAgent<TInput, TOutput>(agentKey: string, input: TInput): Promise<TOutput>;
    /**
     * Convert simple glob pattern to regex
     */
    private patternToRegex;
}
