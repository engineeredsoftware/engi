import { Execution } from '@bitcode/execution-generics';
export declare function logLLMSubstepStart(execution: Execution, sequence: string, systemPrompt: string, userPrompt: string, combinedPrompt: string, llmConfig?: {
    model?: string;
    provider?: string;
}): Promise<void>;
export declare function logLLMSubstepSuccess(execution: Execution, sequence: string, output: {
    content?: string;
    usage?: any;
    metadata?: any;
}, combinedPrompt: string): Promise<void>;
export declare function logLLMSubstepError(execution: Execution, sequence: string, err: unknown, durationMs?: number): void;
export declare function logFailsafeEvent(execution: Execution, failsafe: 'prepare-context' | 'chunk-then-sum' | 'stitch-until-complete', data: Record<string, any>): void;
export declare function logStepTrace(stepExec: Execution, stepName: string): void;
export declare function shouldDebugStopAfterFirstReason(substepExec: Execution, sequence: string): boolean;
export declare function shouldDebugStopAfterFirstStructuredOutput(substepExec: Execution, sequence: string): boolean;
export declare function logToolStart(execution: Execution, tool: string, inputPreview?: any): void;
export declare function logToolSuccess(execution: Execution, tool: string, outputPreview?: any): void;
export declare function logToolError(execution: Execution, tool: string, err: unknown): void;
export declare function logStepStart(stepExec: Execution, stepName: string): void;
export declare function logStepError(stepExec: Execution, stepName: string, err: unknown, durationMs?: number): void;
