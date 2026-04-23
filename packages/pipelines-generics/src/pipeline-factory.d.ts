/**
 * Pipeline Factory - Creates Pipeline Executors that sequence Phases
 *
 * Pipelines are the top-level Executors that orchestrate the entire
 * SDIVF phase sequence. They are just sequential executors of phases.
 */
import { Executor } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import { PhaseDelegator } from './phases/phase-factory';
/**
 * Pipeline - The top-level Executor that sequences Phases
 */
export type Pipeline<TInput = any, TOutput = any> = Executor<TInput, TOutput>;
/**
 * Create a Pipeline that sequences Phases
 */
export declare function factoryPipeline<TInput, TOutput>(name: string, phases: PhaseDelegator<any, any>[]): Pipeline<TInput, TOutput>;
/**
 * Create a Pipeline with DIV iteration loop
 *
 * The DIV (Discovery-Implementation-Validation) loop can iterate
 * multiple times until validation passes or max iterations reached.
 */
export declare function factoryPipelineWithDIVFinishLoop<TInput, TOutput>(name: string, config: {
    setup: PhaseDelegator<TInput, any>;
    discovery: PhaseDelegator<any, any>;
    implementation: PhaseDelegator<any, any>;
    validation: PhaseDelegator<any, any>;
    finish: PhaseDelegator<any, TOutput>;
    maxIterations?: number;
    validationPredicate?: (result: any, execution: Execution) => boolean;
}): Pipeline<TInput, TOutput>;
/**
 * Deprecated compatibility wrapper for the old shipping-named DIV-loop helper.
 */
export declare function factoryPipelineWithDIVLoop<TInput, TOutput>(name: string, config: {
    setup: PhaseDelegator<TInput, any>;
    discovery: PhaseDelegator<any, any>;
    implementation: PhaseDelegator<any, any>;
    validation: PhaseDelegator<any, any>;
    shipping: PhaseDelegator<any, TOutput>;
    maxIterations?: number;
    validationPredicate?: (result: any, execution: Execution) => boolean;
}): Pipeline<TInput, TOutput>;
