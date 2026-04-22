/**
 * PipelineToolRegistry - Tool registry for pipeline executions
 *
 * Manages tool registration and hierarchical lookup for pipelines.
 * Tools can be registered at any level and resolved upward.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical tool management for pipelines
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
 * PipelineToolRegistry - Hierarchical tool registry for pipelines
 *
 * Stores tool instances and provides hierarchical lookup.
 * When getting a tool, walks up execution hierarchy to find it.
 */
export declare class PipelineToolRegistry extends RegistryImpl<ExecutionTool> {
    private readonly execution;
    constructor(execution: Execution);
    /**
     * Register a tool instance at this level
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
     * Get all tools available in hierarchy
     */
    getUsableTools(): Record<string, ExecutionTool>;
}
