import type { Execution } from '@bitcode/execution-generics/Execution';
export interface ExecutionTraceNode {
    id: string;
    type: 'agent' | 'step' | 'substep' | 'execution';
    path: string[];
    namespaces: Record<string, Record<string, any>>;
    prompt?: {
        formatted?: string;
    };
    children: ExecutionTraceNode[];
}
export declare function collectExecutionTrace(root: Execution): ExecutionTraceNode;
export declare function collectAgentTrace(agentExecution: Execution): ExecutionTraceNode;
export interface ExecutionTraceSummary {
    nodeCount: number;
    namespaceCount: number;
    stepIds: string[];
    substepIds: string[];
}
export declare function summarizeExecutionTrace(trace: ExecutionTraceNode): ExecutionTraceSummary;
export declare function extractFirstProviderModel(trace: ExecutionTraceNode): {
    provider?: string;
    model?: string;
};
