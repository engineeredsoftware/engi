/**
 * AgentPromptsRegistry - Prompt registry for agent executions
 * 
 * Manages prompt registration and hierarchical lookup for agents.
 * Prompts are resolved up the execution tree for reuse.
 * 
 * @doc-code
 * type: registry
 * purpose: Hierarchical prompt management for agents
 * pattern: registry-with-execution-context
 */

import { RegistryImpl } from '@engi/registry';
import { Execution } from '@engi/execution-generics';

/**
 * AgentPromptsRegistry - Hierarchical prompt registry for agents
 * 
 * Wraps the base PromptRegistry with execution-aware resolution.
 * Prompts can be registered at any level and resolved upward.
 */
export class AgentPromptsRegistry extends RegistryImpl<any> {
  private readonly execution: Execution;
  private baseRegistry: RegistryImpl<any>;
  
  constructor(execution: Execution, baseRegistry?: RegistryImpl<any>) {
    super();
    this.execution = execution;
    // Use provided registry or create new one
    this.baseRegistry = baseRegistry || new RegistryImpl<any>();
  }
  
  /**
   * Register a prompt at this execution level
   * 
   * Prompts are stored with path-based keys for hierarchical lookup.
   * Example keys:
   * - "agent:plan" - Planning prompt
   * - "agent:refine" - Refinement prompt
   * - "tool:execute" - Tool execution prompt
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
      if ('prompts' in current && current.prompts instanceof AgentPromptsRegistry) {
        prompt = (current.prompts as AgentPromptsRegistry).get(key);
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
      if ('prompts' in exec && exec.prompts instanceof AgentPromptsRegistry) {
        const registry = exec.prompts as AgentPromptsRegistry;
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
   * Set the wrapped base registry
   */
  setBaseRegistry(registry: RegistryImpl<any>): void {
    this.baseRegistry = registry;
  }
}