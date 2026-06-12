export interface DPPhaseDelegation {
    id: string;
    run_id: string;
    phase_name: string;
    started_at?: string | null;
    completed_at?: string | null;
    status?: string | null;
    input_data?: unknown;
    output_data?: unknown;
    error_data?: unknown;
}
export type DPPhaseDelegationInsert = Omit<DPPhaseDelegation, 'id'> & {
    id?: string;
};
export interface DPAgentStep {
    id: string;
    phase_delegation_id: string;
    agent_name: string;
    step_type: string;
    started_at?: string | null;
    completed_at?: string | null;
    status?: string | null;
    input_data?: unknown;
    output_data?: unknown;
    error_data?: unknown;
}
export type DPAgentStepInsert = Omit<DPAgentStep, 'id'> & {
    id?: string;
};
export interface DPGeneration {
    id: string;
    run_id?: string | null;
    phase_delegation_id?: string | null;
    agent_step_id?: string | null;
    substep_id?: string | null;
    model_provider?: string | null;
    model_name?: string | null;
    messages?: unknown;
    response?: unknown;
    created_at?: string | null;
}
export type DPGenerationInsert = Omit<DPGeneration, 'id'> & {
    id?: string;
};
export interface DPToolExec {
    id: string;
    agent_step_id?: string | null;
    substep_id?: string | null;
    tool_name?: string | null;
    tool_input?: unknown;
    tool_output?: unknown;
    tool_error?: unknown;
    created_at?: string | null;
}
export type DPToolExecInsert = Omit<DPToolExec, 'id'> & {
    id?: string;
};
