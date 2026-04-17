/**
 * ExecutionLLMRegistry - Registry for LLM configurations
 * 
 * Parallel to ExecutionPrompt, provides hierarchical LLM management.
 * LLMs can be configured at any execution level and resolved upward.
 */

import { RegistryImpl } from '@bitcode/registry';
import { LLM, LLMConfig, LLMInput, LLMOutput, LLMRegistry } from '@bitcode/llm-generics';
import { Execution } from '../Execution';

/**
 * ExecutionLLMRegistry - Hierarchical LLM configuration registry
 * 
 * Stores LLM configurations in the execution tree.
 * When getting an LLM, walks up the hierarchy to find configuration.
 * 
 * This wraps the llm-generics LLMRegistry to provide execution-aware lookup.
 */
export class ExecutionLLMRegistry extends RegistryImpl<LLMConfig> {
  private llmRegistry: LLMRegistry;
  
  constructor(llmRegistry?: LLMRegistry) {
    super();
    // Use provided registry or create new one
    this.llmRegistry = llmRegistry || new LLMRegistry();
  }
  
  /**
   * Get the default LLM by walking up hierarchy for 'default' config
   * 
   * This is the primary way to get an LLM - looks for 'default' config
   * and creates an LLM with execution tracking.
   */
  getDefaultLLM(execution: Execution): LLM {
    // Collect hierarchy path
    const hierarchy = execution.getPath();
    
    // Get LLM from wrapped registry
    const baseLLM = this.llmRegistry.getLLM(hierarchy);
    
    // Wrap with execution tracking; prompt overlays are applied at agent layer
    return this.wrapWithExecutionTracking(baseLLM, execution);
  }
  
  /**
   * Get LLM by specific key
   * 
   * Looks for specific key in hierarchy, useful for specialized LLMs.
   */
  getLLM(key: string, execution: Execution): LLM | undefined {
    // Walk up hierarchy looking for config
    let config: LLMConfig | undefined;
    let current: Execution | undefined = execution;
    
    while (current && !config) {
      config = current.llms.get(key);
      current = current.parent;
    }
    
    if (!config) {
      return undefined;
    }
    
    // Configure the registry with this config
    const path = execution.getPath().join(':');
    this.llmRegistry.configure(path, config);
    
    // Get LLM from registry
    const baseLLM = this.llmRegistry.getLLM(execution.getPath());
    
    // Wrap with execution tracking
    return this.wrapWithExecutionTracking(baseLLM, execution);
  }
  
  /**
   * Wrap an LLM with execution tracking
   * 
   * This adds automatic execution tracking to any LLM call.
   */
  private wrapWithExecutionTracking(llm: LLM, execution: Execution): LLM {
    return async (input: LLMInput): Promise<LLMOutput> => {
      // Create child execution for this LLM call
      const model = input.config?.model || 'unknown';
      const llmExec = execution.child(`llm:${model}`);
      
      // Track execution
      const startTime = Date.now();
      llmExec.store('execution', 'start_time', startTime);
      llmExec.store('input', 'messages', input.messages);
      llmExec.store('input', 'config', input.config);
      
      try {
        // Call the base LLM
        const output = await llm(input);
        
        // Track success
        llmExec.store('output', 'content', output.content);
        llmExec.store('output', 'usage', output.usage);
        llmExec.store('execution', 'status', 'success');
        llmExec.store('execution', 'duration', Date.now() - startTime);
        
        return output;
      } catch (error) {
        // Track failure
        llmExec.store('output', 'error', error instanceof Error ? error.message : String(error));
        llmExec.store('execution', 'status', 'failed');
        llmExec.store('execution', 'duration', Date.now() - startTime);
        
        throw error;
      }
    };
  }
  
  /**
   * Set the wrapped LLM registry
   * 
   * Allows injection of a configured LLMRegistry with providers.
   */
  setLLMRegistry(registry: LLMRegistry): void {
    this.llmRegistry = registry;
  }
}
