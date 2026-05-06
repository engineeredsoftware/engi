/* AUTO-GENERATED FROM supabase/migrations (AssetPack pipeline storage tables). */
/* Some physical table names are retained storage identifiers; generated types expose AssetPack names. */
import { z } from 'zod';

export const AssetPackPipelineAgentStepsPhysicalTable = 'deliverable_pipeline_agent_steps' as const;

export interface AssetPackPipelineAgentSteps {
  id: string;
  phase_delegation_id: string;
  agent_name: string;
  step_type: string;
  status: string;
  input_data: any;
  output_data: any;
  error_data: any;
  started_at: string;
  completed_at: string;
  created_at: string;
}
export const AssetPackPipelineAgentStepsSchema = z.object({
  id: z.string(),
  phase_delegation_id: z.string(),
  agent_name: z.string(),
  step_type: z.string(),
  status: z.string(),
  input_data: z.any(),
  output_data: z.any(),
  error_data: z.any(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
});

export const AssetPackPipelineEventsPhysicalTable = 'deliverable_pipeline_events' as const;

export interface AssetPackPipelineEvents {
  id: string;
  run_id: string;
  event_type: string;
  event_data: any;
  phase: string;
  agent_name: string;
  created_at: string;
}
export const AssetPackPipelineEventsSchema = z.object({
  id: z.string(),
  run_id: z.string(),
  event_type: z.string(),
  event_data: z.any(),
  phase: z.string(),
  agent_name: z.string(),
  created_at: z.string(),
});

export const AssetPackPipelineGeneratedAssetsPhysicalTable = 'deliverable_pipeline_generated_assets' as const;

export interface AssetPackPipelineGeneratedAssets {
  id: string;
  run_id: string;
  user_id: string;
  asset_type: string;
  asset_name: string;
  asset_url: string;
  asset_data: any;
  created_at: string;
}
export const AssetPackPipelineGeneratedAssetsSchema = z.object({
  id: z.string(),
  run_id: z.string(),
  user_id: z.string(),
  asset_type: z.string(),
  asset_name: z.string(),
  asset_url: z.string(),
  asset_data: z.any(),
  created_at: z.string(),
});

export const AssetPackPipelineGenerationsPhysicalTable = 'deliverable_pipeline_generations' as const;

export interface AssetPackPipelineGenerations {
  id: string;
  run_id: string;
  phase_delegation_id: string;
  agent_step_id: string;
  substep_id: string;
  model_provider: string;
  model_name: string;
  messages: any;
  response: any;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cost: number;
  latency_ms: number;
  created_at: string;
}
export const AssetPackPipelineGenerationsSchema = z.object({
  id: z.string(),
  run_id: z.string(),
  phase_delegation_id: z.string(),
  agent_step_id: z.string(),
  substep_id: z.string(),
  model_provider: z.string(),
  model_name: z.string(),
  messages: z.any(),
  response: z.any(),
  input_tokens: z.number(),
  output_tokens: z.number(),
  total_tokens: z.number(),
  cost: z.number(),
  latency_ms: z.number(),
  created_at: z.string(),
});

export const AssetPackPipelineOtfInstructionsPhysicalTable = 'deliverable_pipeline_otf_instructions' as const;

export interface AssetPackPipelineOtfInstructions {
  id: string;
  run_id: string;
  instruction_type: string;
  instruction_data: any;
  is_processed: boolean;
  processed_at: string;
  created_at: string;
}
export const AssetPackPipelineOtfInstructionsSchema = z.object({
  id: z.string(),
  run_id: z.string(),
  instruction_type: z.string(),
  instruction_data: z.any(),
  is_processed: z.boolean(),
  processed_at: z.string(),
  created_at: z.string(),
});

export const AssetPackPipelinePhaseDelegationsPhysicalTable = 'deliverable_pipeline_phase_delegations' as const;

export interface AssetPackPipelinePhaseDelegations {
  id: string;
  run_id: string;
  phase_name: string;
  status: string;
  input_data: any;
  output_data: any;
  error_data: any;
  started_at: string;
  completed_at: string;
  created_at: string;
}
export const AssetPackPipelinePhaseDelegationsSchema = z.object({
  id: z.string(),
  run_id: z.string(),
  phase_name: z.string(),
  status: z.string(),
  input_data: z.any(),
  output_data: z.any(),
  error_data: z.any(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
});

export const AssetPackPipelineRunsPhysicalTable = 'deliverable_pipeline_runs' as const;

export interface AssetPackPipelineRuns {
  id: string;
  user_id: string;
  deliverable_id: string;
  status: string;
  pipeline_type: string;
  config: any;
  input_data: any;
  output_data: any;
  error_data: any;
  total_tokens: number;
  total_cost: number;
  duration_ms: number;
  started_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  items: any;
  context: any;
  pipeline_run_id: string;
}
export const AssetPackPipelineRunsSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  deliverable_id: z.string(),
  status: z.string(),
  pipeline_type: z.string(),
  config: z.any(),
  input_data: z.any(),
  output_data: z.any(),
  error_data: z.any(),
  total_tokens: z.number(),
  total_cost: z.number(),
  duration_ms: z.number(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  items: z.any(),
  context: z.any(),
  pipeline_run_id: z.string(),
});

export const AssetPackPipelineSubstepsPhysicalTable = 'deliverable_pipeline_substeps' as const;

export interface AssetPackPipelineSubsteps {
  id: string;
  agent_step_id: string;
  substep_type: string;
  substep_index: number;
  status: string;
  input_data: any;
  output_data: any;
  error_data: any;
  started_at: string;
  completed_at: string;
  created_at: string;
}
export const AssetPackPipelineSubstepsSchema = z.object({
  id: z.string(),
  agent_step_id: z.string(),
  substep_type: z.string(),
  substep_index: z.number(),
  status: z.string(),
  input_data: z.any(),
  output_data: z.any(),
  error_data: z.any(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
});

export const AssetPackPipelineToolExecutionsPhysicalTable = 'deliverable_pipeline_tool_executions' as const;

export interface AssetPackPipelineToolExecutions {
  id: string;
  substep_id: string;
  agent_step_id: string;
  tool_name: string;
  tool_input: any;
  tool_output: any;
  tool_error: any;
  execution_time_ms: number;
  created_at: string;
}
export const AssetPackPipelineToolExecutionsSchema = z.object({
  id: z.string(),
  substep_id: z.string(),
  agent_step_id: z.string(),
  tool_name: z.string(),
  tool_input: z.any(),
  tool_output: z.any(),
  tool_error: z.any(),
  execution_time_ms: z.number(),
  created_at: z.string(),
});
