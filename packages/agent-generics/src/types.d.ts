/**
 * Agent Generics Types - Core interfaces and enums
 *
 * This file contains all the type definitions for the agent-generics package.
 * Agents organize Actions, Actions sequence Steps, Steps sequence GenerationSteps.
 */
export type { PreparedContext } from '@bitcode/context';
import { Executor } from '@bitcode/execution-generics';
import { Tool } from '@bitcode/tools-generics';
/**
 * Agent Variation Steps - The four fundamental steps
 * Plan-Try-Refine-Retry: The methodology for intelligent execution
 */
export declare enum AgentVariationStep {
    PLAN = "plan",// Focus: (NO TOOLS) Plan the optimal 'Try'
    TRY = "try",// Focus: Attempt primary agent's objective
    RETRY = "retry",// Focus: Re-attempt given obvious 'Try' failures
    REFINE = "refine"
}
/**
 * FailsafeMetaSubStep - Parent executions handling EXACTLY three concerns:
 * 1. CONTEXT SIGNAL/NOISE - PrepareConciseContext filters and prepares
 * 2. BIG INPUT - ChunkThenSum handles input that exceeds token limits
 * 3. CONVERSATIONSUTPUT - StitchUntilComplete handles output that exceeds token limits
 *
 * CRITICAL: Each runs the EXACT SAME generation sequence as children
 */
export declare enum FailsafeMetaSubStep {
    PREPARE_CONCISE_CONTEXT = "prepare_concise_context",// CONTEXT SIGNAL/NOISE handling
    CHUNK_THEN_SUM = "chunk_then_sum",// BIG INPUT handling  
    STITCH_UNTIL_COMPLETE = "stitch_until_complete"
}
/**
 * GenerationSubMetaSubStep - The EXACT sequence run by EVERY failsafe
 * ALWAYS runs: Reason → Judge → StructuredOutput (sequential, no conditionals)
 *
 * This is the intelligence production sequence: think, judge the thinking, format results
 */
export declare enum GenerationSubMetaSubStep {
    REASON = "reason",// Step 1: Apply reasoning and logic (first thinking step)
    JUDGE = "judge",// Step 2: Judge the quality of the reasoning (second thinking step)
    STRUCTURED_OUTPUT = "structured_output"
}
/**
 * The complete PTRR substep architecture - EXACTLY 7 substeps per step
 * 3 FailsafeMetaSubSteps + 3 GenerationSubMetaSubSteps + 1 Tool execution
 */
export interface PTRRSubStepArchitecture {
    failsafeMetaSubSteps: [
        FailsafeMetaSubStep.PREPARE_CONCISE_CONTEXT,
        FailsafeMetaSubStep.CHUNK_THEN_SUM,
        FailsafeMetaSubStep.STITCH_UNTIL_COMPLETE
    ];
    generationSubMetaSubSteps: [
        GenerationSubMetaSubStep.REASON,
        GenerationSubMetaSubStep.JUDGE,
        GenerationSubMetaSubStep.STRUCTURED_OUTPUT
    ];
    toolExecution: 'tools_execution';
    total: 7;
}
/**
 * Failsafe execution context - what each failsafe handles
 */
export interface FailsafeContext {
    [FailsafeMetaSubStep.PREPARE_CONCISE_CONTEXT]: {
        purpose: 'CONTEXT SIGNAL/NOISE';
        input: 'Raw execution context from pipeline root';
        output: 'PreparedContext[] - single or chunked';
    };
    [FailsafeMetaSubStep.CHUNK_THEN_SUM]: {
        purpose: 'BIG INPUT';
        input: 'PreparedContext[] from previous step';
        output: 'Processed result (chunked parallel or single)';
    };
    [FailsafeMetaSubStep.STITCH_UNTIL_COMPLETE]: {
        purpose: 'CONVERSATIONSUTPUT';
        input: 'Potentially truncated output';
        output: 'Complete validated output matching schema';
    };
}
/**
 * Agent - Executor that sequences PTRR steps
 *
 * Agents are Executors that implement intelligence through
 * the PTRR (Plan-Try-Refine-Retry) pattern with 7 substeps.
 * No more variations - agents are selected from registries dynamically.
 *
 * Execution hierarchy: Agent → Step → SubStep
 */
export interface Agent<TInput = any, TOutput = any> extends Executor<TInput, TOutput> {
    readonly name: string;
    readonly description?: string;
    readonly steps: AgentStep<any, any>[];
    readonly generations?: AgentGeneration<any, any>[];
}
/**
 * AgentStep - A StepExecutor that sequences GenerationSteps
 *
 * Steps orchestrate GenerationSteps (the 7 sequences + tools)
 */
export interface AgentStep<TInput = any, TOutput = any> extends Executor<TInput, TOutput> {
    readonly type: AgentVariationStep;
    readonly description?: string;
}
/**
 * StepExecutor - Typed alias for step executors (input → output)
 * Used by AgentStep and default step implementations.
 */
export type StepExecutor<TInput = any, TOutput = any> = Executor<TInput, TOutput>;
/**
 * AgentGeneration - Preferred alias for AgentStep. A Generation is a typed
 * executor (input → output) that may be composed by PTRR failsafes and tools
 * postprocess. AgentStep remains for backward compatibility.
 */
export type AgentGeneration<TInput = any, TOutput = any> = AgentStep<TInput, TOutput>;
/**
 * QuickAgent - Minimal agent for simple, single-step behaviors.
 *
 * Unlike canonical PTRR Agents, QuickAgents don’t own PTRR step orchestration
 * and typically wrap a single typed executor. Use for simple setup/utility
 * behaviors where full PTRR is unnecessary.
 */
export interface QuickAgent<TInput = any, TOutput = any> extends Executor<TInput, TOutput> {
    readonly name: string;
    readonly description?: string;
    readonly kind: 'quick-agent';
}
export interface Chunk {
    id: string;
    content: string;
    dependencies: string[];
}
export interface Reasoning {
    analysis: string;
    steps: string[];
    conclusion: string;
    confidence: number;
    useTools?: UseTool[];
    toolsCombinator?: string;
}
export interface Judgment {
    quality: number;
    issues: string[];
    suggestions: string[];
    approved: boolean;
}
export interface UseTool {
    tool: Tool;
    name: string;
    input: any;
    reason: string;
}
export type UseTools = UseTool[];
export interface UsedTool {
    tool: string;
    input?: any;
    output?: any;
    error?: string;
}
export type UsedTools = UsedTool[];
