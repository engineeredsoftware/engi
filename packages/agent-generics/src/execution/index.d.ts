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
import { Execution } from '@bitcode/execution-generics';
import { ExecutionPrompt } from '@bitcode/execution-generics';
export { AgentExecution, createAgentExecution } from './AgentExecution';
export { AgentPromptsRegistry } from './AgentPromptsRegistry';
export { AgentToolsRegistry, ExecutionTool } from './AgentToolsRegistry';
export { AgentLLMsRegistry } from './AgentLLMsRegistry';
export { AgentAgentsRegistry } from './AgentAgentsRegistry';
export type { ExecutionAgent } from './AgentAgentsRegistry';
/**
 * StepExecution - Standard execution for PTRR steps
 * Plan, Try, Refine, or Retry operations
 */
export declare class StepExecution extends Execution {
    readonly prompt: ExecutionPrompt;
    constructor(id: string, parent?: Execution);
    child(id: string): StepExecution;
    get llms(): any;
    get tools(): any;
    get agents(): any;
}
/**
 * SubStepExecution - Execution for the 7 substeps
 * The atomic operations of PTRR architecture
 */
export declare class SubStepExecution extends Execution {
    readonly prompt: ExecutionPrompt;
    constructor(id: string, parent?: Execution);
    child(id: string): SubStepExecution;
    get llms(): any;
    get tools(): any;
    get agents(): any;
}
export declare class FailsafeExecution extends SubStepExecution {
}
export declare class GenerationExecution extends SubStepExecution {
}
/**
 * Create step execution
 */
export declare function factoryStepExecution(step: string, parent: Execution): StepExecution;
/**
 * Create substep execution
 */
export declare function factorySubStepExecution(substep: string, parent: Execution): SubStepExecution;
export declare const factoryGenerationExecution: typeof factoryStepExecution;
export declare const factoryFailsafeExecution: typeof factorySubStepExecution;
