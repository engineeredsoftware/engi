/**
 * ExecutionToolRegistry - Registry for execution-aware tools
 *
 * Parallel to ExecutionPrompt, provides hierarchical tool management.
 * Tools can be registered at any execution level and resolved upward.
 */
import { RegistryImpl } from '@bitcode/registry';
import { Tool, ToolFunction } from '@bitcode/tools-generics';
import { Execution } from '../Execution';
/**
 * ExecutionTool - Tool that integrates with execution context
 *
 * Extends base Tool with execution binding and automatic tracking.
 * When executed, creates child execution for tracking.
 */
export declare abstract class ExecutionTool<T extends ToolFunction = ToolFunction> extends Tool<T> {
    protected execution?: Execution;
    /**
     * Bind this tool to an execution context
     */
    bindExecution(execution: Execution): this;
    /**
     * Execute the tool with automatic execution tracking
     */
    execute(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
}
/**
 * ExecutionToolRegistry - Hierarchical tool registry
 *
 * Stores tool instances (not classes) and provides hierarchical lookup.
 * When getting a tool, walks up execution hierarchy to find it.
 */
export declare class ExecutionToolRegistry extends RegistryImpl<ExecutionTool> {
    constructor();
    /**
     * Register a tool class by instantiating it
     *
     * This is a convenience method - you can also register instances directly.
     */
    registerToolClass<T extends ExecutionTool>(key: string, ToolClass: new () => T, priority?: number): void;
    /**
     * Get a tool by walking up the execution hierarchy
     *
     * First checks this registry, then walks up parent chain.
     * Returns tool bound to the execution context.
     */
    getTool(key: string, execution: Execution): ExecutionTool | undefined;
    /**
     * Get all tools available in hierarchy
     *
     * Returns map of all tools from this level and all parents.
     * Used for UsableTools in type evolution.
     */
    getUsableTools(execution: Execution): Record<string, ExecutionTool>;
}
