// Pipeline DB type aliases built from ORM Database types (SoT: migrations)
// SRP: schemas in migrations → types in orm → aliases here for primitives

import type { Tables, Insertable } from '@bitcode/orm';

export type DPPhaseDelegation = Tables<'deliverables_pipeline_phase_delegations'>;
export type DPPhaseDelegationInsert = Insertable<'deliverables_pipeline_phase_delegations'>;

export type DPAgentStep = Tables<'deliverables_pipeline_agent_steps'>;
export type DPAgentStepInsert = Insertable<'deliverables_pipeline_agent_steps'>;

export type DPGeneration = Tables<'deliverables_pipeline_generations'>;
export type DPGenerationInsert = Insertable<'deliverables_pipeline_generations'>;

export type DPToolExec = Tables<'deliverables_pipeline_tool_executions'>;
export type DPToolExecInsert = Insertable<'deliverables_pipeline_tool_executions'>;

