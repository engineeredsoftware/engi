/**
 * QuickPipeline - Minimal pipeline wrapper around a single "QuickPhase".
 *
 * Intent: formalize non-SDIVF pipelines that consist of a single executor
 * (often an agent sequence or loop) without introducing phase semantics.
 * Phase is SDIVF-specific; QuickPipeline has no phases.
 */
import type { Executor } from '@bitcode/execution-generics';
import type { Pipeline } from './pipeline-factory';
export type QuickPhase<TInput = any, TOutput = any> = Executor<TInput, TOutput>;
export interface QuickPipelineConfig<TInput = any, TOutput = any> {
    phase: QuickPhase<TInput, TOutput>;
    initialize?: (execution: any, input: TInput) => void | Promise<void>;
}
export declare function factoryQuickPipeline<TInput = any, TOutput = any>(name: string, cfg: QuickPipelineConfig<TInput, TOutput>): Pipeline<TInput, TOutput>;
