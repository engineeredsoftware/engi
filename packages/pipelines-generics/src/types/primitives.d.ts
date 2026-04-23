export type Gate = 'Design' | 'Develop' | 'Digest';
export type MetaPhase = Gate;
export type PhaseLower = 'setup' | 'discovery' | 'implementation' | 'validation' | 'finish' | 'shipping';
export type PhaseTitle = 'Setup' | 'Discovery' | 'Implementation' | 'Validation' | 'Finish' | 'Shipping';
export type StepLower = 'plan' | 'try' | 'refine' | 'retry';
export type StepTitle = 'Plan' | 'Try' | 'Refine' | 'Retry';
export type MetaStep = 'prepare_concise_context' | 'chunk_then_sum' | 'stitch_until_complete';
export type SubStep = 'reason' | 'judge' | 'structured_output';
/**
 * Execution State - Canonical representation for streaming and UI
 *
 * Represents the current position in the execution hierarchy:
 * Gate → Phase → Agent → Step → Failsafe → Generation
 */
export interface ExecutionState {
    gate?: Gate;
    phase: PhaseTitle;
    agent?: string;
    step?: StepTitle;
    failsafe?: MetaStep;
    generation?: SubStep;
}
export declare function toPhaseLower(p?: string): PhaseLower | undefined;
export declare function toPhaseTitle(p?: string): PhaseTitle | undefined;
export declare function toStepLower(step?: string): StepLower | undefined;
export declare function isMetaStep(v: any): v is MetaStep;
export declare function isSubStep(v: any): v is SubStep;
