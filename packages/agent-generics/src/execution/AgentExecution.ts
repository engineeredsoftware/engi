/**
 * AgentExecution - Execution class with all registries for agents
 * 
 * Extends base Execution with domain-specific registries:
 * - prompts: Prompt registry for agent LLM interactions
 * - tools: Tool registry for agent tool usage
 * - llms: LLM registry for agent LLM configuration
 * - agents: Agent registry for sub-agent delegation
 * 
 * This provides agents with full access to all registries,
 * enabling complex multi-agent orchestration and tool usage.
 * 
 * @doc-code
 * type: execution
 * purpose: Agent execution with full registry support
 * pattern: layered-registry-execution
 */

import { Execution } from '@bitcode/execution-generics';
import { ExecutionPrompt } from '@bitcode/execution-generics';
import type { PromptPart } from '@bitcode/prompts';
import { AgentPromptsRegistry } from './AgentPromptsRegistry';
import { AgentToolsRegistry } from './AgentToolsRegistry';
import { AgentLLMsRegistry } from './AgentLLMsRegistry';
import { factoryLLMRegistryWithProviders } from '@bitcode/generic-llms';
import { AgentAgentsRegistry } from './AgentAgentsRegistry';

/**
 * AgentExecution - Agent-level execution with all registries
 * 
 * Provides agents with:
 * - Prompt management for LLM interactions
 * - Tool access for external operations
 * - LLM configuration for model selection
 * - Sub-agent delegation for complex workflows
 * 
 * This is the execution type used by Agent executors.
 */
export class AgentExecution extends Execution {
  readonly prompt: ExecutionPrompt;
  readonly prompts: AgentPromptsRegistry;
  readonly tools: AgentToolsRegistry;
  readonly llms: AgentLLMsRegistry;
  readonly agents: AgentAgentsRegistry;
  
  constructor(id: string, parent?: Execution) {
    super(id, parent);
    
    // Initialize execution-level prompt
    this.prompt = new ExecutionPrompt();
    // Satisfy ExecutionPrompt root requirements
    this.prompt.set('generic_system', ' ' as PromptPart);
    this.prompt.set('specific_execution', ' ' as PromptPart);

    // Initialize all 4 registries for agent use
    this.prompts = new AgentPromptsRegistry(this);
    this.tools = new AgentToolsRegistry(this);
    this.llms = new AgentLLMsRegistry(this);
    // Initialize LLM registry with providers and a global default
    try {
      const llmRegistry = factoryLLMRegistryWithProviders();
      // Resolve defaults from environment with safe fallbacks
      const provider = (process.env.ENGI_LLM_PROVIDER || 'openai').toLowerCase();
      const model = process.env.ENGI_LLM_MODEL || 'o3-mini';
      if (typeof (llmRegistry as any).setDefaultProvider === 'function') {
        (llmRegistry as any).setDefaultProvider(provider);
      }
      // Configure global defaults at '*' so all executions inherit
      llmRegistry.configure('*', { model });
      this.llms.setLLMRegistry(llmRegistry);
      // Also register an agent-level presence config for GA-1 enforcement
      this.llms.registerLLMConfig('default', { model });
    } catch (e) {
      // Defer errors; hard enforcement will throw if truly missing at execution
    }
    this.agents = new AgentAgentsRegistry(this);
  }
  
  /**
   * Create a child AgentExecution
   * 
   * Maintains registry hierarchy through execution tree.
   * Child agents can access parent registries.
   */
  child(id: string): AgentExecution {
    if (this.children.has(id)) {
      return this.children.get(id) as AgentExecution;
    }
    return new AgentExecution(`${this.id}/${id}`, this);
  }
}

/**
 * Factory function for creating agent executions
 */
export function createAgentExecution(agentName: string, parent?: Execution): AgentExecution {
  return new AgentExecution(`agent:${agentName}`, parent);
}
