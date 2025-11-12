/**
 * PipelineLLMRegistry - LLM registry for pipeline executions
 * 
 * Manages LLM configuration and hierarchical lookup for pipelines.
 * LLMs can be configured at any level and resolved upward.
 * 
 * @doc-code
 * type: registry
 * purpose: Hierarchical LLM management for pipelines
 * pattern: registry-with-execution-tracking
 */

import { RegistryImpl } from '@engi/registry';
import { LLM, LLMConfig, LLMInput, LLMOutput, LLMRegistry } from '@engi/llm-generics';
import { Execution } from '@engi/execution-generics';

/**
 * PipelineLLMRegistry - Hierarchical LLM configuration registry
 * 
 * Stores LLM configurations in the execution tree.
 * When getting an LLM, walks up the hierarchy to find configuration.
 */
export class PipelineLLMRegistry extends RegistryImpl<LLMConfig> {
  private readonly execution: Execution;
  private llmRegistry: LLMRegistry;
  
  constructor(execution: Execution, llmRegistry?: LLMRegistry) {
    super();
    this.execution = execution;
    // Use provided registry or create new one
    this.llmRegistry = llmRegistry || new LLMRegistry();
  }
  
  /**
   * Get the default LLM by walking up hierarchy for 'default' config
   */
  getDefaultLLM(): LLM {
    try {
      const hierarchy = this.getExecutionPath();
      const baseLLM = this.llmRegistry.getLLM(hierarchy);
      return this.wrapWithExecutionTracking(baseLLM);
    } catch (error) {
      // Emit debug event if enabled
      try {
        if (process.env.ENGI_DEBUG_REGISTRIES === '1') {
          this.execution.store('registry', 'debug', {
            registry: 'llms',
            action: 'getDefaultLLM_error',
            error: error instanceof Error ? error.message : String(error),
            executionPath: this.getExecutionPath()
          } as any);
        }
      } catch {}
      throw error;
    }
  }
  
  /**
   * Get LLM by specific key
   */
  getLLM(key: string): LLM | undefined {
    try {
      let config: LLMConfig | undefined;
      let current: Execution | undefined = this.execution;
      while (current && !config) {
        if ('llms' in current && current.llms instanceof PipelineLLMRegistry) {
          config = (current.llms as PipelineLLMRegistry).get(key);
        }
        current = current.parent;
      }
      if (!config) {
        if (process.env.ENGI_DEBUG_REGISTRIES === '1') {
          this.execution.store('registry', 'debug', {
            registry: 'llms',
            action: 'config_miss',
            key,
            executionPath: this.getExecutionPath()
          } as any);
        }
        return undefined;
      }
      const path = this.getExecutionPath().join(':');
      this.llmRegistry.configure(path, config);
      const baseLLM = this.llmRegistry.getLLM(this.getExecutionPath());
      return this.wrapWithExecutionTracking(baseLLM);
    } catch (error) {
      if (process.env.ENGI_DEBUG_REGISTRIES === '1') {
        try {
          this.execution.store('registry', 'debug', {
            registry: 'llms',
            action: 'getLLM_error',
            key,
            error: error instanceof Error ? error.message : String(error),
            executionPath: this.getExecutionPath()
          } as any);
        } catch {}
      }
      throw error;
    }
  }
  
  /**
   * Wrap an LLM with execution tracking
   */
  private wrapWithExecutionTracking(llm: LLM): LLM {
    return async (input: LLMInput): Promise<LLMOutput> => {
      // Create child execution for this LLM call
      const model = input.config?.model || 'unknown';
      const llmExec = this.execution.child(`llm:${model}`);
      
      // Track execution
      const startTime = Date.now();
      llmExec.store('llm', 'startTime', startTime);
      llmExec.store('llm', 'messages', input.messages);
      llmExec.store('llm', 'config', input.config);
      
      try {
        // Call the base LLM
        const output = await llm(input);

        // Provider-agnostic normalization: ensure metadata.stopReason exists
        try {
          const meta: any = (output as any).metadata || {};
          if (!meta.stopReason) {
            const mapped = meta.finishReason || meta.stop_reason || meta?.providerResponse?.finishReason || meta?.providerResponse?.finish_reason;
            (output as any).metadata = { ...meta, stopReason: mapped || 'unknown' };
          }
        } catch {}
        
        // Track success
        llmExec.store('llm', 'response', output.content);
        llmExec.store('llm', 'usage', output.usage);
        llmExec.store('llm', 'status', 'success');
        llmExec.store('llm', 'duration', Date.now() - startTime);
        
        return output;
      } catch (error) {
        // Track failure
        llmExec.store('llm', 'error', error instanceof Error ? error.message : String(error));
        llmExec.store('llm', 'status', 'failed');
        llmExec.store('llm', 'duration', Date.now() - startTime);
        
        throw error;
      }
    };
  }
  
  /**
   * Get execution path for hierarchy
   */
  private getExecutionPath(): string[] {
    const path: string[] = [];
    let current: Execution | undefined = this.execution;
    
    while (current) {
      path.unshift(current.id);
      current = current.parent;
    }
    
    return path;
  }
  
  /**
   * Set the wrapped LLM registry
   */
  setLLMRegistry(registry: LLMRegistry): void {
    this.llmRegistry = registry;
  }
}
