/**
 * PipelineExecution - Full-featured execution for pipelines
 *
 * Extends PromptExecution to add tool, LLM, and agent registries.
 * This is the complete execution context for pipeline operations.
 *
 * @doc-code
 * type: execution
 * purpose: Provide complete registry set for pipeline execution
 * pattern: registry-aggregation
 */
import { Execution } from '@bitcode/execution-generics/Execution';
import { PipelinePromptRegistry } from './PipelinePromptRegistry';
import { PipelineToolRegistry } from './PipelineToolRegistry';
import { PipelineLLMRegistry } from './PipelineLLMRegistry';
import { PipelineAgentRegistry } from './PipelineAgentRegistry';
export type PipelineExecutionPosture = 'live' | 'reference' | 'support';
export type PipelineExecutionFamily = 'ad_hoc' | 'asset_pack' | 'quick' | 'custom';
export interface PipelineExecutionLineage {
    pipelineName: string;
    family: PipelineExecutionFamily;
    posture: PipelineExecutionPosture;
    admittedSurface: string;
}
export declare function inferPipelineExecutionLineage(name: string): PipelineExecutionLineage;
/**
 * PipelineExecution - Complete execution context for pipelines
 *
 * Provides all four registries needed for pipeline operations:
 * - prompts (for prompt management)
 * - tools (for tool registration and lookup)
 * - llms (for LLM configuration and selection)
 * - agents (for agent registration and dynamic selection)
 */
export declare class PipelineExecution extends Execution {
    readonly prompts: PipelinePromptRegistry;
    readonly tools: PipelineToolRegistry;
    readonly llms: PipelineLLMRegistry;
    readonly agents: PipelineAgentRegistry;
    readonly lineage: PipelineExecutionLineage;
    constructor(id: string, parent?: Execution, lineage?: PipelineExecutionLineage);
    /**
     * Override child to maintain PipelineExecution type
     */
    child(id: string): PipelineExecution;
}
/**
 * Factory function for creating pipeline executions
 */
export declare function createPipelineExecution(id: string, parent?: Execution, lineage?: PipelineExecutionLineage): PipelineExecution;
