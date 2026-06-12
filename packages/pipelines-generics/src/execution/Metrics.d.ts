import type { Execution } from '@bitcode/execution-generics/Execution';
export interface PhaseMetric {
    duration: number;
    agentsExecuted: number;
    tokensUsed: number;
}
export interface PipelineMetrics {
    totalDuration: number;
    agentsExecuted: number;
    tokensUsed: number;
    phaseDurations: Record<string, number>;
    phases: Record<string, PhaseMetric>;
}
export declare function computePipelineMetrics(pipelineExec: Execution): PipelineMetrics;
