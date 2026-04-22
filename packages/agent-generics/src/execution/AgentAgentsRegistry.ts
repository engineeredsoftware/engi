/**
 * AgentAgentsRegistry - Agent registry for agent executions
 * 
 * Manages sub-agent registration and dynamic selection for agents.
 * Enables agents to delegate work to other agents dynamically.
 * 
 * @doc-code
 * type: registry
 * purpose: Dynamic sub-agent delegation for agents
 * pattern: registry-based-agent-composition
 */

import { RegistryImpl } from '@bitcode/registry';
import { Agent } from '../types';
import { Execution } from '@bitcode/execution-generics/Execution';

/**
 * ExecutionAgent - Agent that can be bound to execution context
 * 
 * Wraps base Agent with execution binding capability.
 */
export interface ExecutionAgent<TInput = any, TOutput = any> extends Agent<TInput, TOutput> {
  bindExecution?(execution: Execution): this;
}

/**
 * AgentAgentsRegistry - Dynamic agent registry for sub-agent delegation
 * 
 * Stores agent instances and provides hierarchical lookup.
 * Agents can delegate to sub-agents registered at any level.
 * 
 * Example usage:
 * - Register base: registry.registerAgent('validation', validationAgent)
 * - Register specialized: registry.registerAgent('validation:security', securityValidationAgent)
 * - Delegate with fallback: registry.getAgentWithFallback(['validation:security', 'validation'])
 */
export class AgentAgentsRegistry extends RegistryImpl<ExecutionAgent> {
  private readonly execution: Execution;
  
  constructor(execution: Execution) {
    super();
    this.execution = execution;
  }

  /**
   * Check if an agent key exists at this level
   */
  hasAgentHere(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Ensure that required agent keys exist in the hierarchy
   */
  ensureAgents(keys: string[], options?: { throw?: boolean }): string[] {
    const missing: string[] = [];
    for (const key of keys) {
      const agent = this.getAgent(key);
      if (!agent) missing.push(key);
    }
    if (missing.length && options?.throw) {
      throw new Error(`Missing required agents: ${missing.join(', ')}`);
    }
    return missing;
  }
  
  /**
   * Register an agent with optional priority
   * 
   * Path examples:
   * - "analysis" - Base analysis agent
   * - "analysis:code" - Code-specific analysis agent
   * - "analysis:security" - Security analysis agent
   * - "refinement:comprehensive" - Comprehensive refinement
   * - "validation:unit-test" - Unit test validation
   */
  registerAgent<TInput, TOutput>(
    path: string,
    agent: ExecutionAgent<TInput, TOutput>,
    priority: number = 0
  ): void {
    this.set(path, agent as any, priority);
  }
  
  /**
   * Get agent by key with execution binding
   * Walks up hierarchy to find best match
   */
  getAgent(key: string): ExecutionAgent | undefined {
    // Try exact match first
    let agent = this.get(key);
    if (agent) {
      return agent.bindExecution ? agent.bindExecution(this.execution) : agent;
    }
    
    // Walk up parent chain looking for agents
    let current = this.execution.parent;
    while (current) {
      // Check if parent has agents registry
      if ('agents' in current && current.agents instanceof AgentAgentsRegistry) {
        agent = (current.agents as AgentAgentsRegistry).get(key);
        if (agent) {
          return agent.bindExecution ? agent.bindExecution(this.execution) : agent;
        }
      }
      current = current.parent;
    }
    
    return undefined;
  }
  
  /**
   * Get agent with fallback pattern
   * 
   * Example: Try "analysis:security", fall back to "analysis"
   * This enables specialization with graceful degradation.
   */
  getAgentWithFallback(keys: string[]): ExecutionAgent | undefined {
    for (const key of keys) {
      const agent = this.getAgent(key);
      if (agent) return agent;
    }
    return undefined;
  }
  
  /**
   * Get all agents matching a pattern
   * 
   * Example: getAgentsByPattern("analysis:*") returns all analysis variants
   */
  getAgentsByPattern(pattern: string): Record<string, ExecutionAgent> {
    const agents: Record<string, ExecutionAgent> = {};
    const regex = this.patternToRegex(pattern);
    
    // Collect from entire hierarchy
    const collectFromExecution = (exec: Execution) => {
      if (exec.parent) {
        collectFromExecution(exec.parent);
      }
      
      // Add agents from this level if it has a registry
      if ('agents' in exec && exec.agents instanceof AgentAgentsRegistry) {
        const registry = exec.agents as AgentAgentsRegistry;
        const paths = registry.getPaths();
        for (const path of paths) {
          if (regex.test(path)) {
            const agent = registry.get(path);
            if (agent) {
              agents[path] = agent;
            }
          }
        }
      }
    };
    
    collectFromExecution(this.execution);
    
    return agents;
  }
  
  /**
   * Get all agents available in hierarchy
   */
  getUsableAgents(): Record<string, ExecutionAgent> {
    const agents: Record<string, ExecutionAgent> = {};
    
    // Collect from entire hierarchy (bottom-up so children override parents)
    const collectFromExecution = (exec: Execution) => {
      if (exec.parent) {
        collectFromExecution(exec.parent);
      }
      
      // Add agents from this level if it has a registry
      if ('agents' in exec && exec.agents instanceof AgentAgentsRegistry) {
        const registry = exec.agents as AgentAgentsRegistry;
        const paths = registry.getPaths();
        for (const path of paths) {
          const agent = registry.get(path);
          if (agent) {
            agents[path] = agent;
          }
        }
      }
    };
    
    collectFromExecution(this.execution);
    
    return agents;
  }
  
  /**
   * Delegate to an agent with automatic execution tracking
   * 
   * Creates a child execution for the delegated agent and tracks results.
   */
  async delegateToAgent<TInput, TOutput>(
    agentKey: string,
    input: TInput
  ): Promise<TOutput> {
    const agent = this.getAgent(agentKey);
    if (!agent) {
      throw new Error(`Agent not found: ${agentKey}`);
    }
    
    // Create child execution for delegation
    const childExec = this.execution.child(`delegate:${agentKey}`);
    
    // Track delegation
    childExec.store('delegation', 'agentKey', agentKey);
    childExec.store('delegation', 'input', input as any);
    childExec.store('delegation', 'startTime', Date.now());
    
    try {
      // Execute the agent
      const result = await agent(input, childExec);
      
      // Track success
      childExec.store('delegation', 'result', result);
      childExec.store('delegation', 'status', 'success');
      childExec.store('delegation', 'endTime', Date.now());
      
      return result;
    } catch (error) {
      // Track failure
      childExec.store('delegation', 'error', error instanceof Error ? error.message : String(error));
      childExec.store('delegation', 'status', 'failed');
      childExec.store('delegation', 'endTime', Date.now());
      
      throw error;
    }
  }
  
  /**
   * Convert simple glob pattern to regex
   */
  private patternToRegex(pattern: string): RegExp {
    // Escape special regex chars except * and ?
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    // Convert * to .* and ? to .
    const regexStr = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
    return new RegExp(`^${regexStr}$`);
  }
}
