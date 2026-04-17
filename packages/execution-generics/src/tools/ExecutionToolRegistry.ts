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
export abstract class ExecutionTool<T extends ToolFunction = ToolFunction> extends Tool<T> {
  protected execution?: Execution;
  
  /**
   * Bind this tool to an execution context
   */
  bindExecution(execution: Execution): this {
    this.execution = execution;
    return this;
  }
  
  /**
   * Execute the tool with automatic execution tracking
   */
  async execute(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    if (!this.execution) {
      // No execution context, fall back to base behavior
      return super.execute(...args);
    }
    
    // Create child execution for this tool invocation
    const toolName = this.constructor.name;
    const toolExec = this.execution.child(`tool:${toolName}`);
    
    // Track execution
    const startTime = Date.now();
    toolExec.store('execution', 'tool', toolName);
    toolExec.store('execution', 'start_time', startTime);
    toolExec.store('input', 'args', args);
    
    try {
      const result = await this.use(...args);
      
      // Track success
      toolExec.store('output', 'result', result);
      toolExec.store('execution', 'status', 'success');
      toolExec.store('execution', 'duration', Date.now() - startTime);
      
      return result;
    } catch (error) {
      // Track failure
      toolExec.store('output', 'error', error instanceof Error ? error.message : String(error));
      toolExec.store('execution', 'status', 'failed');
      toolExec.store('execution', 'duration', Date.now() - startTime);
      
      throw error;
    }
  }
}

/**
 * ExecutionToolRegistry - Hierarchical tool registry
 * 
 * Stores tool instances (not classes) and provides hierarchical lookup.
 * When getting a tool, walks up execution hierarchy to find it.
 */
export class ExecutionToolRegistry extends RegistryImpl<ExecutionTool> {
  constructor() {
    super();
  }
  
  /**
   * Register a tool class by instantiating it
   * 
   * This is a convenience method - you can also register instances directly.
   */
  registerToolClass<T extends ExecutionTool>(
    key: string,
    ToolClass: new () => T,
    priority: number = 0
  ): void {
    const instance = new ToolClass();
    this.set(key, instance as any, priority);
  }
  
  /**
   * Get a tool by walking up the execution hierarchy
   * 
   * First checks this registry, then walks up parent chain.
   * Returns tool bound to the execution context.
   */
  getTool(key: string, execution: Execution): ExecutionTool | undefined {
    // Try this registry first
    let tool = this.get(key);
    if (tool) {
      return tool.bindExecution(execution);
    }
    
    // Walk up parent chain
    let current = execution.parent;
    while (current && !tool) {
      tool = current.tools.get(key);
      current = current.parent;
    }
    
    return tool ? tool.bindExecution(execution) : undefined;
  }
  
  /**
   * Get all tools available in hierarchy
   * 
   * Returns map of all tools from this level and all parents.
   * Used for UsableTools in type evolution.
   */
  getUsableTools(execution: Execution): Record<string, ExecutionTool> {
    const tools: Record<string, ExecutionTool> = {};
    
    // Collect from entire hierarchy (bottom-up so children override parents)
    const collectFromExecution = (exec: Execution) => {
      if (exec.parent) {
        collectFromExecution(exec.parent);
      }
      
      // Add tools from this level - get all paths and their values
      const paths = exec.tools.getPaths();
      for (const path of paths) {
        const tool = exec.tools.get(path);
        if (tool) {
          tools[path] = tool;
        }
      }
    };
    
    collectFromExecution(execution);
    
    return tools;
  }
}