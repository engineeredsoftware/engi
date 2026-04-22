import { Execution } from '@bitcode/execution-generics';
export interface ResumeDescriptor {
    path: string[];
    state?: {
        phase?: string;
        agent?: string;
        step?: string;
        failsafe?: string;
        generation?: string;
    };
}
/**
 * Descend an Execution to a specific nested node by path segments.
 * Creates children as needed.
 */
export declare function descendExecution(execution: Execution, path: string[]): Execution;
/**
 * Build a resume descriptor from a stream event message emitted by ExecutionStreamAdapter.
 * Expects `executionPath` and optionally `executionState` fields.
 */
export declare function resumeDescriptorFromEvent(event: any): ResumeDescriptor;
