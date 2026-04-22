/**
 * AgentToolsRegistry - Tool registry for agent executions
 *
 * Manages tool registration and hierarchical lookup for agents.
 * Tools can be registered at any level and resolved upward.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical tool management for agents
 * pattern: registry-with-execution-binding
 */
import { RegistryImpl } from '@bitcode/registry';
import { Tool } from '@bitcode/tools-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
/**
 * ExecutionTool - Tool that integrates with execution context
 *
 * Extends base Tool with execution binding and automatic tracking.
 */
export declare abstract class ExecutionTool<T extends (...args: any[]) => any = (...args: any[]) => any> extends Tool<T> {
    protected execution?: Execution;
    /**
     * Bind this tool to an execution context
     */
    bindExecution(execution: Execution): this;
    /**
     * Execute with automatic execution tracking
     */
    execute(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
}
/**
 * AgentToolsRegistry - Hierarchical tool registry for agents
 *
 * Stores tool instances and provides hierarchical lookup.
 * When getting a tool, walks up execution hierarchy to find it.
 */
export declare class AgentToolsRegistry extends RegistryImpl<ExecutionTool> {
    private readonly execution;
    private allowedKeys?;
    constructor(execution: Execution);
    /**
     * Restrict accessible tools to the provided keys at this level.
     * When restricted, getTool will not fall back to parents for other keys.
     */
    restrictTo(keys: string[]): void;
    /**
     * Check if a tool is available at this level
     */
    hasToolHere(key: string): boolean;
    /**
     * Ensure that required tools exist somewhere in the hierarchy
     * Returns list of missing tools; optionally throws
     */
    ensureTools(keys: string[], options?: {
        throw?: boolean;
    }): string[];
    /**
     * Register a tool instance
     */
    registerTool(key: string, tool: ExecutionTool, priority?: number): void;
    /**
     * Register a tool class by instantiating it
     */
    registerToolClass<T extends ExecutionTool>(key: string, ToolClass: new () => T, priority?: number): void;
    /**
     * Get a tool by walking up the execution hierarchy
     */
    getTool(key: string): ExecutionTool | undefined;
    /**
     * Get tool with fallback pattern
     *
     * Try multiple keys in order, returning first match.
     * Useful for tool specialization with graceful degradation.
     */
    getToolWithFallback(keys: string[]): ExecutionTool | undefined;
    /**
     * Get all tools available in hierarchy
     */
    getUsableTools(): Record<string, ExecutionTool>;
}
