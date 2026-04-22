export interface DataStream {
    writeData(chunk: string | object): Promise<void>;
    flush?(): Promise<void>;
}
import type { MetaPhase, PhaseTitle, StepTitle, MetaStep, SubStep, ExecutionState as PipelineExecutionState } from '@bitcode/pipelines-generics';
export type ExecutionPhase = PhaseTitle;
export type ExecutionStep = StepTitle;
export type FailsafeStep = MetaStep;
export type GenerationStep = SubStep;
export type { MetaPhase };
export type ExecutionState = PipelineExecutionState;
export interface ToolUseMessage {
    toolName: string;
    args?: any;
    result?: any;
    error?: string;
    duration?: number;
    metadata?: Record<string, any>;
}
export interface GenerationMessage {
    model?: string;
    input: any;
    output?: any;
    error?: string;
    tokens?: {
        promptTokens?: number;
        completionTokens?: number;
        totalTokens?: number;
    };
    metadata?: Record<string, any>;
}
export interface FileDiff {
    path: string;
    action: 'created' | 'modified' | 'deleted';
    linesAdded?: number;
    linesRemoved?: number;
    oldContent?: string;
    newContent?: string;
    language?: string;
}
export interface FileTreeChange {
    filesCreated: number;
    filesModified: number;
    filesDeleted: number;
    totalLinesAdded: number;
    totalLinesRemoved: number;
    files: FileDiff[];
}
export interface StreamMessage {
    type: 'generation' | 'tool-use' | 'error' | 'completion' | 'thinking' | 'file-diff';
    executionState?: ExecutionState;
    progress?: 'in-progress' | 'success' | 'warning' | 'error';
    message: string;
    detail?: string;
    result?: any;
    duration?: number;
    correlationId?: string;
    timestamp?: string;
    metadata?: object;
    fileDiff?: FileDiff;
    fileTree?: FileTreeChange;
}
export declare function writeStreamMessage(dataStream: DataStream | undefined, message: StreamMessage): Promise<void>;
export declare function writeStreamError(dataStream: DataStream | undefined, error: Error | string, correlationId?: string): Promise<void>;
export declare function writeStreamWarning(dataStream: DataStream | undefined, message: string, detail?: string, metadata?: object, correlationId?: string): Promise<void>;
export declare function writeStreamToolUse(dataStream: DataStream | undefined, toolUse: ToolUseMessage, executionState?: ExecutionState, correlationId?: string): Promise<void>;
/**
 * Stream a generation event (LLM/AI model invocation).
 * Aligned with modern agent architecture terminology.
 */
export declare function writeStreamGeneration(dataStream: DataStream | undefined, call: GenerationMessage & {
    purpose?: string;
    [key: string]: any;
}, executionState?: ExecutionState, correlationId?: string): Promise<void>;
/**
 * Stream a *chain-of-thought* fragment so that UIs can surface the model's
 * reasoning process without polluting the main result channel.
 */
export declare function writeStreamThinking(dataStream: DataStream | undefined, text: string, executionState?: ExecutionState, correlationId?: string): Promise<void>;
