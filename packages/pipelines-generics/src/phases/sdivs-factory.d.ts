/**
 * Retained SDIVF reference pipeline factory with built-in DIV iteration
 *
 * Creates the retained Setup-[Discovery-Implementation-Validation]*-Finish
 * pattern with automatic iteration support. Finish is the broad final phase:
 * save the run result, preserve useful Need/AssetPack state, and optionally
 * deliver AssetPacks or AssetPackPartials to third-party destinations.
 *
 * SDIVS survives here only as a deprecated compatibility spelling for callers
 * that still pass a `shipping` executor.
 */
import { Executor } from '@bitcode/execution-generics';
import { PhaseDelegator } from './phase-factory';
import { PipelineExecution } from '../execution/pipeline-types';
import { Pipeline } from '../pipeline-factory';
interface SDIVBaseConfig<TInput = any> {
    setup: PhaseDelegator<TInput, any>;
    discovery: PhaseDelegator<any, any>;
    implementation: PhaseDelegator<any, any>;
    validation: PhaseDelegator<any, any>;
    readyToIterate?: Executor<any, boolean>;
    maxIterations?: number;
    iterationStrategy?: 'sequential' | 'adaptive';
    initialize?: (execution: PipelineExecution, input: TInput) => void | Promise<void>;
}
export interface SDIVFConfig<TInput = any, TOutput = any> extends SDIVBaseConfig<TInput> {
    finish: PhaseDelegator<any, TOutput>;
    readyToFinish?: Executor<any, boolean>;
}
export interface SDIVSConfig<TInput = any, TOutput = any> extends SDIVBaseConfig<TInput> {
    shipping: PhaseDelegator<any, TOutput>;
    readyToShip?: Executor<any, boolean>;
}
/**
 * Create a retained SDIVF reference pipeline with built-in DIV iteration.
 *
 * Pattern: Setup -> [Discovery -> Implementation -> Validation]* -> Finish
 *
 * The DIV loop iterates until:
 * 1. Validation passes (readyToFinish returns true)
 * 2. Max iterations reached
 * 3. Error occurs (handled gracefully)
 */
export declare function factorySDIVFPipeline<TInput, TOutput>(name: string, config: SDIVFConfig<TInput, TOutput>): Pipeline<TInput, TOutput>;
/**
 * Deprecated compatibility wrapper for old SDIVS callers.
 */
export declare function factorySDIVSPipeline<TInput, TOutput>(name: string, config: SDIVSConfig<TInput, TOutput>): Pipeline<TInput, TOutput>;
export interface SDIVFExecutorConfig<TInput = any, TOutput = any> {
    setup: Executor<TInput, any>;
    discovery?: Executor<any, any>;
    implementation?: Executor<any, any>;
    validation?: Executor<any, any>;
    finish?: Executor<any, TOutput>;
    maxIterations?: number;
    preprocess?: Executor<TInput, TInput>;
    iterationPreprocess?: Executor<any, any>;
    postprocess?: Executor<TOutput, TOutput>;
}
export interface SDIVSExecutorConfig<TInput = any, TOutput = any> extends Omit<SDIVFExecutorConfig<TInput, TOutput>, 'finish'> {
    shipping?: Executor<any, TOutput>;
}
/**
 * factorySDIVFExecutorPipeline - Build a complete retained SDIVF reference
 * pipeline as a pure Executor using execution-generics composition. This mirrors the intended
 * [preprocess] -> Setup -> [Discovery -> Implementation -> Validation]* -> Finish -> [postprocess]
 * pattern without requiring call-site abstractions.
 */
export declare function factorySDIVFExecutorPipeline<TInput, TOutput>(name: string, cfg: SDIVFExecutorConfig<TInput, TOutput>): Executor<TInput, TOutput>;
/**
 * Deprecated compatibility wrapper for old SDIVS executor callers.
 */
export declare function factorySDIVSExecutorPipeline<TInput, TOutput>(name: string, cfg: SDIVSExecutorConfig<TInput, TOutput>): Executor<TInput, TOutput>;
export {};
