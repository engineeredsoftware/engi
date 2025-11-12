/**
 * ToolExecution - Execution class with prompt registry for tools
 * 
 * Extends base Execution with domain-specific registry:
 * - prompts: Prompt registry for tool-LLM interactions
 * 
 * Tools need prompts for formatting inputs/outputs and error messages
 * when being called by agents through LLMs.
 * 
 * @doc-code
 * type: execution
 * purpose: Tool execution with prompt support
 * pattern: layered-registry-execution
 */

import { Execution } from '@engi/execution-generics';
import { ToolPromptRegistry } from './ToolPromptRegistry';

/**
 * ToolExecution - Tool-level execution with prompt registry
 * 
 * Provides tools with:
 * - Prompt management for LLM-tool interactions
 * - Execution tracking for tool usage
 * - Hierarchical prompt resolution
 * 
 * This is the execution type used by Tool executors.
 */
export class ToolExecution extends Execution {
  readonly prompts: ToolPromptRegistry;
  
  constructor(id: string, parent?: Execution) {
    super(id, parent);
    
    // Initialize prompt registry for tool use
    this.prompts = new ToolPromptRegistry(this);
  }
  
  /**
   * Create a child ToolExecution
   * 
   * Maintains registry hierarchy through execution tree.
   * Child tools can access parent prompts.
   */
  child(id: string): ToolExecution {
    if (this.children.has(id)) {
      return this.children.get(id) as ToolExecution;
    }
    return new ToolExecution(`${this.id}/${id}`, this);
  }
}

/**
 * Factory function for creating tool executions
 */
export function createToolExecution(toolName: string, parent?: Execution): ToolExecution {
  return new ToolExecution(`tool:${toolName}`, parent);
}