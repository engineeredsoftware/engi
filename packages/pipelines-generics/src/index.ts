/**
 * PIPELINES-GENERICS - Pipeline Execution Primitives
 * 
 * This package provides the foundational abstractions for building
 * pipelines. Pipelines are Executors that sequence PhaseDelegators.
 * PhaseDelegators are Executors that delegate to Agents.
 * 
 * Core Concepts:
 * - Pipeline: Top-level Executor orchestrating phases (EE)
 * - PhaseDelegator: Executor that delegates work to Agents
 * - SDIVS: Setup, Discovery, Implementation, Validation, Shipping
 * 
 * @doc-code
 * type: package
 * category: pipeline-primitives
 * pattern: executor-composition
 */

// Pipeline and PhaseDelegator types
export {
  type Pipeline,
  PipelineExecution,
  type PhaseDelegator,
  PhaseDelegation,
  factoryPipelineExecution,
  factoryPhaseDelegation
} from './execution/pipeline-types';

// Pipeline factories
export {
  factoryPipeline,
  factoryPipelineWithDIVLoop
} from './pipeline-factory';

// Quick pipeline (single QuickPhase, no phases semantics)
export {
  factoryQuickPipeline,
  type QuickPhase
} from './quick-pipeline';

// Phase factories and SDIVS
export {
  factoryPhaseDelegator,
  factorySequentialPhaseDelegator,
  factoryParallelPhaseDelegator,
  factorySDIVSPhaseDelegators,
  SDIVSPhase
} from './phases/phase-factory';

// SDIVS Pipeline factory
export {
  factorySDIVSPipeline,
  type SDIVSConfig
} from './phases/sdivs-factory';
export {
  factorySDIVSExecutorPipeline,
  type SDIVSExecutorConfig
} from './phases/sdivs-factory';

// Streaming integration for real-time pipeline updates
export {
  enablePipelineStreaming,
  createStreamingExecution,
  emitPhaseTransition,
  emitAgentActivity,
  emitToolUsage,
  type PipelineStreamConfig
} from './streaming/pipeline-stream-integration';

// Pipeline Prompt (EE)
export { PipelinePrompt } from './prompts/PipelinePrompt';

// Metrics
export { computePipelineMetrics } from './execution/Metrics';
export { descendExecution, resumeDescriptorFromEvent } from './execution/resume';

// Minimal agent→executor adapter for composition
export { createAgentExecutor } from './execution/agent-executor';
export { isExecutionDebugEnabled, enableExecutionDebug, debugWrapExecutorStep } from './execution/debug';

// Canonical primitive types and mappers (DB + Streams SSOT)
export type {
  MetaPhase,
  PhaseLower,
  PhaseTitle,
  StepLower,
  StepTitle,
  MetaStep,
  SubStep,
  ExecutionState
} from './types/primitives';
export { toPhaseLower, toPhaseTitle, toStepLower, isMetaStep, isSubStep } from './types/primitives';

// Gate system (Design → Develop → Digest) sequencing
export * from './gate-system';

// Guided Pipeline Execution - Gate guidance layer
export {
  createGuidedPipelineExecution,
  storeGateState,
  getCurrentGate,
  getGateState,
  transitionToNextGate,
  gatePreprocess,
  isCollaborativeGate,
  getSelfInstructThreshold,
  type GateExecutionContext
} from './execution/route-pipeline-execution';

// Execution utilities
export { waitForInstruction, calculateInstructionTimeout } from './executors/wait-for-instruction';

// Pipeline DB aliases (built from ORM types)
export type {
  DPPhaseDelegation,
  DPPhaseDelegationInsert,
  DPAgentStep,
  DPAgentStepInsert,
  DPGeneration,
  DPGenerationInsert,
  DPToolExec,
  DPToolExecInsert
} from './types/db';

// Legacy exports for backward compatibility
export {
  createPhaseRunner,
  type PhaseConfig,
  type AgentStep
} from './execution/PipelineExecutor';
