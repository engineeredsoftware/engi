/**
 * Agent Factories - Factory functions for agents
 *
 * These factories create agent executors that implement
 * the PTRR pattern with 7 substeps.
 *
 * @doc-code
 * type: agent-factories
 * purpose: Create type-safe agent executors
 * pattern: factory-functions
 */
import { Executor } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import { Agent, AgentStep } from '../types';
import { z } from 'zod';
export type BitcodePTRRStepName = 'plan' | 'try' | 'refine' | 'retry';
export type BitcodePTRRPromptValue = any;
export type BitcodePTRRStepPromptCarrier = BitcodePTRRPromptValue | (() => BitcodePTRRPromptValue);
export type BitcodePTRRStepPromptRegistry = {
    plan: BitcodePTRRStepPromptCarrier;
    try: BitcodePTRRStepPromptCarrier;
    refine: BitcodePTRRStepPromptCarrier;
    retry: BitcodePTRRStepPromptCarrier;
};
type BitcodePTRRPrimaryPromptCarrier = {
    prompt: BitcodePTRRPromptValue;
    stepPrompts: BitcodePTRRStepPromptRegistry;
    prompts?: never;
};
type BitcodePTRRCompactPromptCarrier = {
    prompt?: never;
    stepPrompts?: never;
    prompts: BitcodePTRRStepPromptRegistry & {
        system: BitcodePTRRPromptValue;
    };
};
export type BitcodePTRRPromptCarrier = BitcodePTRRPrimaryPromptCarrier | BitcodePTRRCompactPromptCarrier;
export type BitcodePTRRFactoryConfig<TOutput> = BitcodePTRRPromptCarrier & {
    name: string;
    description?: string;
    outputSchema: z.ZodType<TOutput>;
    tools?: any[];
    requiredTools?: string[];
    enforceLLM?: boolean;
    plan?: {
        chunkThreshold?: number;
    };
    try?: {
        chunkThreshold?: number;
        enableParallelChunks?: boolean;
    };
    refine?: {
        maxAttempts?: number;
    };
    retry?: {
        maxAttempts?: number;
        backoff?: number;
    };
};
/**
 * Create an Agent - Builds an executor that sequences PTRR steps
 */
export declare function factoryAgent<TInput = any, TOutput = any>(config: {
    name: string;
    description?: string;
    steps: AgentStep<any, any>[];
}): Agent<TInput, TOutput>;
/**
 * Create Agent with PTRR Steps - Creates a complete agent implementation
 *
 * This factory creates an Agent that implements the full PTRR pattern.
 * Agents are executors that sequence PTRR steps with 7 substeps.
 */
export declare function factoryAgentWithPTRR<TInput, TOutput>(config: BitcodePTRRFactoryConfig<TOutput>): Agent<TInput, TOutput>;
/**
 * Create Agent with Single Step - Creates a minimal agent implementation
 *
 * This factory creates an Agent with a single execution step.
 * For simple agents that don't need full PTRR.
 */
export declare function factoryAgentWithSingleStep<TInput, TOutput>(config: {
    name: string;
    description?: string;
    execute: (input: TInput, execution: Execution) => Promise<TOutput>;
}): Agent<TInput, TOutput>;
/**
 * factoryAgentWithGenerations - Preferred ergonomic: pass Generations directly.
 * Back-compat: also sets 'steps' to the same array.
 */
export declare function factoryAgentWithGenerations<TInput, TOutput>(config: {
    name: string;
    description?: string;
    generations: AgentStep<any, any>[];
}): Agent<TInput, TOutput>;
/**
 * factoryAgentWithPTRRGenerations - Same as factoryAgentWithPTRR but accepts
 * generationPrompts instead of stepPrompts. Internally maps to PTRR factories.
 */
export declare function factoryAgentWithPTRRGenerations<TInput, TOutput>(config: {
    name: string;
    description?: string;
    outputSchema: z.ZodType<TOutput>;
    prompt: BitcodePTRRPromptValue;
    generationPrompts: BitcodePTRRStepPromptRegistry;
    tools?: any[];
    requiredTools?: string[];
    enforceLLM?: boolean;
    plan?: {
        chunkThreshold?: number;
    };
    try?: {
        chunkThreshold?: number;
        enableParallelChunks?: boolean;
    };
    refine?: {
        maxAttempts?: number;
    };
    retry?: {
        maxAttempts?: number;
        backoff?: number;
    };
}): Agent<TInput, TOutput>;
export {};
/**
 * factoryQuickAgent - Preferred minimal agent for simple, single-step behaviors.
 *
 * This formalizes the "QuickAgent" concept: an executor with a name/description
 * that does not orchestrate PTRR. It wraps a single typed executor and uses
 * standard AgentExecution/StepExecution for consistent statefulness.
 *
 * Note: factoryAgentWithSingleStep remains for compatibility; this is the
 * canonical name to use going forward.
 */
export declare function factoryQuickAgent<TInput, TOutput>(config: {
    name: string;
    description?: string;
    execute: (input: TInput, execution: Execution) => Promise<TOutput>;
}): Executor<TInput, TOutput>;
