import { Executor } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import { SubStepExecution } from '../execution';
import { z } from 'zod';
import { PreparedContext, Reasoning, UseTool, Judgment, UsedTool } from '../types';
/**
 * Factory for Failsafe SubStep Executions
 */
export declare function factoryAgentFailsafeSubStepExecution(name: string, execution: Execution): SubStepExecution;
/**
 * Factory for Generation SubStep Executions
 */
export declare function factoryAgentGenerationSubStepExecution(name: string, execution: Execution): SubStepExecution;
/**
 * Factory for Tools SubStep Execution
 */
export declare function factoryAgentToolSubStepExecution(execution: Execution): SubStepExecution;
/**
 * PrepareConciseContext - Parent execution that prepares context
 *
 * CRITICAL: This is a PARENT execution that:
 * 1. Finds the greatest-grandparent execution to get full context
 * 2. Determines if chunking is needed based on token limits
 * 3. Returns array of prepared contexts if chunking required
 * 4. Runs generation substeps as children
 */
export declare function factoryPrepareConciseContext<T>(generationSubSteps: Executor<any, any>[]): Executor<T, T & {
    preparedContexts: PreparedContext[];
}>;
/**
 * ChunkThenSum - Parent execution that handles large inputs
 *
 * CRITICAL: This is a PARENT execution that:
 * 1. Checks if input was chunked by PrepareConciseContext
 * 2. If chunked: runs generation substeps in parallel/sequential per chunk, then sums
 * 3. If not chunked: runs generation substeps once without chunking prompts
 * 4. Always engages generation sequence regardless of chunking
 */
export declare function factoryChunkThenSum<T extends {
    preparedContexts: PreparedContext[];
}>(generationSubSteps: Executor<any, any>[], options?: {
    parallel?: boolean;
}): Executor<T, T & {
    processedResult: any;
}>;
/**
 * StitchUntilComplete - Parent execution that handles token limit overflows
 *
 * CRITICAL: This is a PARENT execution that:
 * 1. Checks if output hit the token limit (output length === max tokens)
 * 2. If truncated: recursively calls generation substeps to continue/stitch
 * 3. Continues until complete structured output is achieved
 * 4. Validates final output matches expected schema
 */
export declare function factoryStitchUntilComplete<T>(generationSubSteps: Executor<any, any>[], outputSchema?: z.ZodType<any>): Executor<T, T & {
    finalOutput: any;
}>;
/**
 * Judge - Generation substep that evaluates quality
 * CRITICAL: This is a CHILD execution that runs within failsafe parents
 */
export declare function factoryJudge<T>(): Executor<T, T & {
    judgment: Judgment;
}>;
/**
 * Reason - Generation substep that applies logical reasoning
 * CRITICAL: This is a CHILD execution that runs within failsafe parents
 */
export declare function factoryReason<T>(): Executor<T, T & {
    reasoning: Reasoning;
}>;
/**
 * StructuredOutput - Generation substep that produces formatted output
 * CRITICAL: This is a CHILD execution that runs within failsafe parents
 */
export declare function factoryStructuredOutput<T, TSchema>(schema: z.ZodType<TSchema>): Executor<T, T & {
    output: TSchema;
}>;
/**
 * ToolsExecution - Executes tools selected by reasoning
 * Part of the 7-substep PTRR architecture (not a numbered substep itself)
 */
export declare function factoryToolsExecution<T extends {
    output?: {
        useTools?: UseTool[];
    };
}>(): Executor<T, T & {
    usedTools: UsedTool[];
}>;
/**
 * Validation - validates output against caller-supplied expectations.
 * Core PTRR agents should prefer schema validation inside StructuredOutput.
 */
export declare function factoryValidation<T>(validators?: Array<(input: T) => boolean | Promise<boolean>>): Executor<T, T & {
    validation: {
        passed: boolean;
        errors: string[];
    };
}>;
