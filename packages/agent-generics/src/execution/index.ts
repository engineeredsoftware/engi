/**
 * Agent Execution Types - Execution classes for agent hierarchy
 * 
 * These execution types properly belong in agent-generics as they represent
 * the agent execution hierarchy with full registry support.
 * 
 * Hierarchy:
 * - AgentExecution: Agent-level execution with all 4 registries
 * - StepExecution: Step-level execution (Plan/Try/Refine/Retry)
 * - SubStepExecution: SubStep-level execution (7 substeps)
 */

import { Execution } from '@engi/execution-generics';
import { ExecutionPrompt } from '@engi/execution-generics';
import type { PromptPart } from '@engi/prompts';

// Re-export the new AgentExecution and registries
export { AgentExecution, createAgentExecution } from './AgentExecution';
export { AgentPromptsRegistry } from './AgentPromptsRegistry';
export { AgentToolsRegistry, ExecutionTool } from './AgentToolsRegistry';
export { AgentLLMsRegistry } from './AgentLLMsRegistry';
export { AgentAgentsRegistry } from './AgentAgentsRegistry';
export type { ExecutionAgent } from './AgentAgentsRegistry';

// ==================== GENERATION LEVEL ====================
/**
 * StepExecution - Standard execution for PTRR steps
 * Plan, Try, Refine, or Retry operations
 */
export class StepExecution extends Execution {
  readonly prompt: ExecutionPrompt;
  constructor(id: string, parent?: Execution) {
    super(id, parent);
    this.prompt = new ExecutionPrompt();
    // Satisfy ExecutionPrompt root requirements
    this.prompt.set('generic_system', ' ' as PromptPart);
    this.prompt.set('specific_execution', ' ' as PromptPart);
  }

  // Ensure children remain StepExecution instances so registry proxy getters
  // are preserved throughout the hierarchy.
  child(id: string): StepExecution {
    if (this.children.has(id)) {
      return this.children.get(id) as StepExecution;
    }
    return new StepExecution(`${this.id}/${id}`, this);
  }

  // Proxy registries from nearest AgentExecution ancestor
  get llms(): any {
    let cur: any = this.parent;
    while (cur && !('llms' in cur)) cur = cur.parent;
    return cur?.llms;
  }
  get tools(): any {
    let cur: any = this.parent;
    while (cur && !('tools' in cur)) cur = cur.parent;
    return cur?.tools;
  }
  get agents(): any {
    let cur: any = this.parent;
    while (cur && !('agents' in cur)) cur = cur.parent;
    return cur?.agents;
  }
}

// ==================== FAILSAFE LEVEL ====================
/**
 * SubStepExecution - Execution for the 7 substeps
 * The atomic operations of PTRR architecture
 */
export class SubStepExecution extends Execution {
  readonly prompt: ExecutionPrompt;
  constructor(id: string, parent?: Execution) {
    super(id, parent);
    this.prompt = new ExecutionPrompt();
    // Satisfy ExecutionPrompt root requirements
    this.prompt.set('generic_system', ' ' as PromptPart);
    this.prompt.set('specific_execution', ' ' as PromptPart);
  }

  // Preserve SubStepExecution type for children, so getters keep working
  child(id: string): SubStepExecution {
    if (this.children.has(id)) {
      return this.children.get(id) as SubStepExecution;
    }
    return new SubStepExecution(`${this.id}/${id}`, this);
  }

  // Proxy registries from nearest AgentExecution ancestor
  get llms(): any {
    let cur: any = this.parent;
    while (cur && !('llms' in cur)) cur = cur.parent;
    return cur?.llms;
  }
  get tools(): any {
    let cur: any = this.parent;
    while (cur && !('tools' in cur)) cur = cur.parent;
    return cur?.tools;
    
  }
  get agents(): any {
    let cur: any = this.parent;
    while (cur && !('agents' in cur)) cur = cur.parent;
    return cur?.agents;
  }
}

// Semantic specializations to make the hierarchy explicit
export class FailsafeExecution extends SubStepExecution {}
export class GenerationExecution extends SubStepExecution {}

// ==================== FACTORY FUNCTIONS ====================
/**
 * Create step execution
 */
export function factoryStepExecution(step: string, parent: Execution): StepExecution {
  return new StepExecution(`gen:${step}`, parent);
}

/**
 * Create substep execution
 */
export function factorySubStepExecution(substep: string, parent: Execution): SubStepExecution {
  return new SubStepExecution(`failsafe:${substep}`, parent);
}

// Preferred factory aliases (Generation-first naming)
export const factoryGenerationExecution = factoryStepExecution;
export const factoryFailsafeExecution = factorySubStepExecution;
