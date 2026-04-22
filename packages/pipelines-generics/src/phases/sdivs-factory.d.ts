/**
 * Retained SDIVS reference pipeline factory with built-in DIV iteration
 *
 * Creates the retained Setup-[Discovery-Implementation-Validation]*-Shipping
 * pattern with automatic iteration support.
 *
 * This file survives as a reference orchestration family for Bitcode pipeline
 * porting and admissibility work. It is not itself the proof of current
 * Bitcode-native pipeline canon.
 */
import { Executor } from '@bitcode/execution-generics';
import { PhaseDelegator } from './phase-factory';
import { PipelineExecution } from '../execution/pipeline-types';
import { Pipeline } from '../pipeline-factory';
export interface SDIVSConfig<TInput = any, TOutput = any> {
    setup: PhaseDelegator<TInput, any>;
    discovery: PhaseDelegator<any, any>;
    implementation: PhaseDelegator<any, any>;
    validation: PhaseDelegator<any, any>;
    shipping: PhaseDelegator<any, TOutput>;
    readyToIterate?: Executor<any, boolean>;
    readyToShip?: Executor<any, boolean>;
    maxIterations?: number;
    iterationStrategy?: 'sequential' | 'adaptive';
    initialize?: (execution: PipelineExecution, input: TInput) => void | Promise<void>;
}
/**
 * Create a retained SDIVS reference pipeline with built-in DIV iteration
 *
 * Pattern: Setup -> [Discovery -> Implementation -> Validation]* -> Shipping
 *
 * The DIV loop iterates until:
 * 1. Validation passes (readyToShip returns true)
 * 2. Max iterations reached
 * 3. Error occurs (handled gracefully)
 */
export declare function factorySDIVSPipeline<TInput, TOutput>(name: string, config: SDIVSConfig<TInput, TOutput>): Pipeline<TInput, TOutput>;
export interface SDIVSExecutorConfig<TInput = any, TOutput = any> {
    setup: Executor<TInput, any>;
    discovery?: Executor<any, any>;
    implementation?: Executor<any, any>;
    validation?: Executor<any, any>;
    shipping?: Executor<any, TOutput>;
    maxIterations?: number;
    preprocess?: Executor<TInput, TInput>;
    iterationPreprocess?: Executor<any, any>;
    postprocess?: Executor<TOutput, TOutput>;
}
/**
 * factorySDIVSExecutorPipeline - Build a complete retained SDIVS reference
 * pipeline as a pure Executor using execution-generics composition. This mirrors the intended
 * [preprocess] -> Setup -> [Discovery → Implementation → Validation]* -> Shipping -> [postprocess]
 * pattern without requiring call-site abstractions.
 */
export declare function factorySDIVSExecutorPipeline<TInput, TOutput>(name: string, cfg: SDIVSExecutorConfig<TInput, TOutput>): Executor<TInput, TOutput>;
