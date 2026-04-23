/**
 * PIPELINES-GENERICS - Pipeline Execution Primitives
 *
 * This package provides the foundational abstractions for building
 * pipelines. Pipelines are Executors that sequence PhaseDelegators.
 * PhaseDelegators are Executors that delegate to Agents.
 *
 * These are reusable orchestration primitives. Retained orchestration families
 * such as SDIVF and meta-phase flows remain reference patterns unless they are
 * explicitly repurposed into Bitcode-owned behavior.
 *
 * Core Concepts:
 * - Pipeline: Top-level Executor orchestrating phases (EE)
 * - PhaseDelegator: Executor that delegates work to Agents
 * - SDIVF: retained setup/discovery/implementation/validation/finish reference family
 *
 * @doc-code
 * type: package
 * category: pipeline-primitives
 * pattern: executor-composition
 */
export { type Pipeline, PipelineExecution, type PhaseDelegator, PhaseDelegation, factoryPipelineExecution, factoryPhaseDelegation } from './execution/pipeline-types';
export { type PipelineExecutionLineage, type PipelineExecutionFamily, type PipelineExecutionPosture, inferPipelineExecutionLineage } from './execution/PipelineExecution';
export { factoryPipeline, factoryPipelineWithDIVFinishLoop, factoryPipelineWithDIVLoop } from './pipeline-factory';
export { factoryQuickPipeline, type QuickPhase } from './quick-pipeline';
export { factoryPhaseDelegator, factorySequentialPhaseDelegator, factoryParallelPhaseDelegator, factorySDIVFPhaseDelegators, factorySDIVSPhaseDelegators, SDIVFPhase, SDIVSPhase } from './phases/phase-factory';
export { factorySDIVFPipeline, factorySDIVSPipeline, type SDIVFConfig, type SDIVSConfig } from './phases/sdivs-factory';
export { factorySDIVFExecutorPipeline, factorySDIVSExecutorPipeline, type SDIVFExecutorConfig, type SDIVSExecutorConfig } from './phases/sdivs-factory';
export { enablePipelineStreaming, createStreamingExecution, emitPhaseTransition, emitAgentActivity, emitToolUsage, type PipelineStreamConfig } from './streaming/pipeline-stream-integration';
export { PipelinePrompt } from './prompts/PipelinePrompt';
export { computePipelineMetrics } from './execution/Metrics';
export { descendExecution, resumeDescriptorFromEvent } from './execution/resume';
export { createAgentExecutor } from './execution/agent-executor';
export { isExecutionDebugEnabled, enableExecutionDebug, debugWrapExecutorStep } from './execution/debug';
export type { MetaPhase, PhaseLower, PhaseTitle, StepLower, StepTitle, MetaStep, SubStep, ExecutionState } from './types/primitives';
export { toPhaseLower, toPhaseTitle, toStepLower, isMetaStep, isSubStep } from './types/primitives';
export * from './gate-system';
export { createGuidedPipelineExecution, storeGateState, getCurrentGate, getGateState, transitionToNextGate, gatePreprocess, isCollaborativeGate, getSelfInstructThreshold, type GateExecutionContext } from './execution/route-pipeline-execution';
export { waitForInstruction, calculateInstructionTimeout } from './executors/wait-for-instruction';
export type { DPPhaseDelegation, DPPhaseDelegationInsert, DPAgentStep, DPAgentStepInsert, DPGeneration, DPGenerationInsert, DPToolExec, DPToolExecInsert } from './types/db';
export { createPhaseRunner, type PhaseConfig, type AgentStep } from './execution/PipelineExecutor';
