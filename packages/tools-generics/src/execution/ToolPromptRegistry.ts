/**
 * ToolPromptRegistry - Prompt registry for tool executions
 * 
 * Manages prompt registration and hierarchical lookup for tools.
 * Prompts are used for formatting tool inputs/outputs for LLM interactions.
 * 
 * @doc-code
 * type: registry
 * purpose: Hierarchical prompt management for tools
 * pattern: registry-with-execution-context
 */

import { RegistryImpl } from '@engi/registry';
import { Execution } from '@engi/execution-generics';

/**
 * ToolPromptRegistry - Hierarchical prompt registry for tools
 * 
 * Wraps the base PromptRegistry with execution-aware resolution.
 * Prompts can be registered at any level and resolved upward.
 * 
 * Tool prompts typically include:
 * - Input formatting prompts
 * - Output formatting prompts
 * - Error handling prompts
 * - Validation prompts
 */
export class ToolPromptRegistry extends RegistryImpl<any> {
  private readonly execution: Execution;
  private promptRegistry: PromptRegistry;
  
  constructor(execution: Execution, promptRegistry?: PromptRegistry) {
    super();
    this.execution = execution;
    // Use provided registry or create new one
    this.promptRegistry = promptRegistry || new PromptRegistry();
  }
  
  /**
   * Register a prompt at this execution level
   * 
   * Prompts are stored with path-based keys for hierarchical lookup.
   * Example keys:
   * - "tool:input" - Input formatting prompt
   * - "tool:output" - Output formatting prompt
   * - "tool:error" - Error handling prompt
   * - "tool:validation" - Validation prompt
   * - "tool:description" - Tool description prompt
   */
  registerPrompt(key: string, prompt: any, priority: number = 0): void {
    this.set(key, prompt, priority);
  }
  
  /**
   * Get prompt by walking up the execution hierarchy
   * 
   * Searches from current level up through parents.
   * This enables prompt inheritance and specialization.
   */
  getPrompt(key: string): any | undefined {
    // Try this registry first
    let prompt = this.get(key);
    if (prompt) {
      return prompt;
    }
    
    // Walk up parent chain looking for prompt
    let current = this.execution.parent;
    while (current) {
      // Check if parent has prompts registry
      if ('prompts' in current && current.prompts instanceof ToolPromptRegistry) {
        prompt = (current.prompts as ToolPromptRegistry).get(key);
        if (prompt) {
          return prompt;
        }
      }
      current = current.parent;
    }
    
    return undefined;
  }
  
  /**
   * Get prompt with fallback pattern
   * 
   * Try multiple keys in order, returning first match.
   * Useful for graceful degradation to generic prompts.
   * 
   * Example: Try "tool:vcs:input" then "tool:input"
   */
  getPromptWithFallback(keys: string[]): any | undefined {
    for (const key of keys) {
      const prompt = this.getPrompt(key);
      if (prompt) return prompt;
    }
    return undefined;
  }
  
  /**
   * Get all prompts available in hierarchy
   */
  getUsablePrompts(): Record<string, any> {
    const prompts: Record<string, any> = {};
    
    // Collect from entire hierarchy (bottom-up so children override parents)
    const collectFromExecution = (exec: Execution) => {
      if (exec.parent) {
        collectFromExecution(exec.parent);
      }
      
      // Add prompts from this level if it has a registry
      if ('prompts' in exec && exec.prompts instanceof ToolPromptRegistry) {
        const registry = exec.prompts as ToolPromptRegistry;
        const paths = registry.getPaths();
        for (const path of paths) {
          const prompt = registry.get(path);
          if (prompt) {
            prompts[path] = prompt;
          }
        }
      }
    };
    
    collectFromExecution(this.execution);
    
    return prompts;
  }
  
  /**
   * Format tool input using registered prompts
   * 
   * Uses the tool:input prompt to format tool parameters
   * for LLM understanding.
   */
  formatInput(toolName: string, input: any): string {
    const prompt = this.getPromptWithFallback([
      `tool:${toolName}:input`,
      'tool:input'
    ]);
    
    if (!prompt) {
      // Default formatting if no prompt found
      return JSON.stringify(input, null, 2);
    }
    
    // Use prompt to format input
    if (typeof prompt === 'function') {
      return prompt(toolName, input);
    }
    
    return prompt.replace('{{toolName}}', toolName)
                 .replace('{{input}}', JSON.stringify(input, null, 2));
  }
  
  /**
   * Format tool output using registered prompts
   * 
   * Uses the tool:output prompt to format tool results
   * for LLM understanding.
   */
  formatOutput(toolName: string, output: any): string {
    const prompt = this.getPromptWithFallback([
      `tool:${toolName}:output`,
      'tool:output'
    ]);
    
    if (!prompt) {
      // Default formatting if no prompt found
      return JSON.stringify(output, null, 2);
    }
    
    // Use prompt to format output
    if (typeof prompt === 'function') {
      return prompt(toolName, output);
    }
    
    return prompt.replace('{{toolName}}', toolName)
                 .replace('{{output}}', JSON.stringify(output, null, 2));
  }
  
  /**
   * Format tool error using registered prompts
   * 
   * Uses the tool:error prompt to format tool errors
   * for LLM understanding.
   */
  formatError(toolName: string, error: Error): string {
    const prompt = this.getPromptWithFallback([
      `tool:${toolName}:error`,
      'tool:error'
    ]);
    
    if (!prompt) {
      // Default formatting if no prompt found
      return `Tool ${toolName} failed: ${error.message}`;
    }
    
    // Use prompt to format error
    if (typeof prompt === 'function') {
      return prompt(toolName, error);
    }
    
    return prompt.replace('{{toolName}}', toolName)
                 .replace('{{error}}', error.message)
                 .replace('{{stack}}', error.stack || '');
  }
  
  /**
   * Set the wrapped prompt registry
   */
  setPromptRegistry(registry: PromptRegistry): void {
    this.promptRegistry = registry;
  }
}