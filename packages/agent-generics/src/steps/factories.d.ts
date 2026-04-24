/**
 * Step Factories - PTRR pattern implementation with EXACTLY 7 substeps
 *
 * CRITICAL ARCHITECTURE:
 * Each PTRR Step runs EXACTLY the same sequence:
 * 3 FailsafeMetaSubSteps (parents) each running 3 GenerationSubMetaSubSteps (children) + Tools
 *
 * The 7-substep sequence:
 * 1. PrepareConciseContext (CONTEXT SIGNAL/NOISE) → Reason→Judge→StructuredOutput
 * 2. ChunkThenSum (BIG INPUT) → Reason→Judge→StructuredOutput
 * 3. StitchUntilComplete (CONVERSATIONSUTPUT) → Reason→Judge→StructuredOutput
 * 4. Tool execution (AFTER all failsafes, conditional on reasoning + judgment output)
 */
import { Executor } from '@bitcode/execution-generics';
import { AgentStep } from '../types';
type StepExecutor<TInput = any, TOutput = any> = Executor<TInput, TOutput>;
import { AgentVariationStep } from '../types';
import { z } from 'zod';
/**
 * Plan Step Factory - analyzes the Need and creates an execution plan.
 *
 * Uses failsafe parent architecture:
 * 1. PrepareConciseContext (parent) -> runs Reason-Judge-StructuredOutput (children)
 * 2. ChunkThenSum (parent) -> handles any chunking needed
 * 3. StitchUntilComplete (parent) -> ensures complete output
 */
export declare function factoryPlanStep<TInput, TOutput>(outputSchema: z.ZodType<TOutput>, config?: {
    prompt?: any;
    tools?: any[];
    chunkThreshold?: number;
}): AgentStep<TInput, TOutput>;
/**
 * Try Step Factory - Attempts to execute the plan
 *
 * Uses failsafe parent architecture:
 * 1. PrepareConciseContext -> analyzes what's needed
 * 2. ChunkThenSum -> processes input (chunked or single)
 * 3. StitchUntilComplete -> ensures we got everything
 * 4. Tool execution -> runs AFTER failsafes if reasoning requested tools
 */
export declare function factoryTryStep<TInput, TOutput>(outputSchema: z.ZodType<TOutput>, options?: {
    enableParallelChunks?: boolean;
    prompt?: any;
    tools?: any[];
    chunkThreshold?: number;
}): AgentStep<TInput, TOutput>;
/**
 * Refine Step Factory - Improves upon previous attempt
 *
 * Uses failsafe parent architecture focused on improvement:
 * 1. PrepareConciseContext -> includes previous attempt + judgment
 * 2. ChunkThenSum -> processes improvements
 * 3. StitchUntilComplete -> ensures refined output is complete
 */
export declare function factoryRefineStep<TInput, TOutput>(outputSchema: z.ZodType<TOutput>, options?: {
    prompt?: any;
    tools?: any[];
    maxAttempts?: number;
}): AgentStep<TInput, TOutput>;
/**
 * Retry Step Factory - Complete retry with fresh approach
 *
 * Uses failsafe parent architecture with retry wrapper:
 * Each retry attempt runs the full failsafe sequence
 */
export declare function factoryRetryStep<TInput, TOutput>(outputSchema: z.ZodType<TOutput>, options?: {
    maxAttempts?: number;
    backoff?: number;
    prompt?: any;
    tools?: any[];
}): AgentStep<TInput, TOutput>;
/**
 * Create a PTRR step based on type
 */
export declare function factoryStep<TInput, TOutput>(type: AgentVariationStep, outputSchema: z.ZodType<TOutput>, options?: any): StepExecutor<TInput, TOutput>;
/**
 * PTRR Action Factory - Full PTRR cycle as a single executor
 */
export declare function factoryPTRRAction<TInput, TOutput>(config: {
    outputSchema: z.ZodType<TOutput>;
    maxRefinements?: number;
    enableRetry?: boolean;
    chunkThreshold?: number;
}): AgentStep<TInput, TOutput>;
export {};
