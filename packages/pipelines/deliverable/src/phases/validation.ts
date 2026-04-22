import { createPhaseRunner, PhaseConfig } from '@bitcode/pipelines-generics';
import { registerValidationAgentsForType as registerAgents } from '../agents/validation-agents';
import { normalizeWrittenAssetType } from '../semantic-resolution';

/**
 * Validation phase configuration placeholder.
 * The actual execution composition for validation lives in phases/index.ts
 * where three validators run in parallel followed by ready-to-ship.
 */
const validationPhaseConfig: PhaseConfig = {
  phaseName: 'validation',
  sequence: [
    { agent: 'validation:deliverable-pipeline-ready-to-ship-agent' }
  ],
  allowShortCircuit: true
};

export const runValidationPhase = createPhaseRunner(validationPhaseConfig);

/**
 * Register validation agents (delegates to the canonical agents module).
 */
export function registerValidationAgentsForType(writtenAssetType: string, agentRegistry: any): void {
  registerAgents(normalizeWrittenAssetType(writtenAssetType), agentRegistry);
}
