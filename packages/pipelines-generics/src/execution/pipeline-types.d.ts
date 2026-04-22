/**
 * Pipeline Execution Types - Clean pipeline-specific execution
 *
 * Pipeline/PipelineExecution - The EE pair for top-level pipeline orchestration
 * PhaseDelegator/PhaseDelegation - The Executor/Execution pair for phase delegation to agents
 */
import { Executor } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import { PipelineExecution as PipelineExecutionBase, type PipelineExecutionLineage } from './PipelineExecution';
export { PipelineExecution } from './PipelineExecution';
/**
 * Pipeline - The top-level Executor that sequences Phases
 * Uses the new PipelineExecution with all registries
 */
export type Pipeline<TInput = any, TOutput = any> = (input: TInput, execution: PipelineExecutionBase) => Promise<TOutput>;
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
export declare class PhaseDelegation extends Execution {
    constructor(id: string, parent?: Execution);
}
/**
 * Create a pipeline execution
 */
export declare function factoryPipelineExecution(name: string, parent?: Execution, lineage?: PipelineExecutionLineage): PipelineExecutionBase;
/**
 * Create phase delegation execution
 */
export declare function factoryPhaseDelegation(phase: string, parent: Execution): PhaseDelegation;
