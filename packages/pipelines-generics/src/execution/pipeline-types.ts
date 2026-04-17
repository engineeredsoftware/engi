/**
 * Pipeline Execution Types - Clean pipeline-specific execution
 * 
 * Pipeline/PipelineExecution - The EE pair for top-level pipeline orchestration
 * PhaseDelegator/PhaseDelegation - The Executor/Execution pair for phase delegation to agents
 */

import { Executor, Execution } from '@bitcode/execution-generics';
import { PipelineExecution as PipelineExecutionBase } from './PipelineExecution';

// Re-export the new PipelineExecution
export { PipelineExecution } from './PipelineExecution';

// ==================== PIPELINE (EE) ====================
/**
 * Pipeline - The top-level Executor that sequences Phases
 * Uses the new PipelineExecution with all registries
 */
export type Pipeline<TInput = any, TOutput = any> = 
  (input: TInput, execution: PipelineExecutionBase) => Promise<TOutput>;

// ==================== PHASE DELEGATOR ====================
/**
 * PhaseDelegator - An Executor that delegates work to Agents
 * Coordinates agent execution within a pipeline phase
 */
export type PhaseDelegator<TInput = any, TOutput = any> = Executor<TInput, TOutput>;

/**
 * PhaseDelegation - Execution state for phase delegation
 * Tracks which agents were delegated to and their results
 * Just uses base Execution since it gets registries from parent PipelineExecution
 */
export class PhaseDelegation extends Execution {
  constructor(id: string, parent?: Execution) {
    super(id, parent);
  }
}

// ==================== FACTORY FUNCTIONS ====================
/**
 * Create a pipeline execution
 */
export function factoryPipelineExecution(name: string, parent?: Execution): PipelineExecutionBase {
  return new PipelineExecutionBase(`pipeline:${name}`, parent);
}

/**
 * Create phase delegation execution
 */
export function factoryPhaseDelegation(phase: string, parent: Execution): PhaseDelegation {
  return new PhaseDelegation(`phase:${phase}`, parent);
}