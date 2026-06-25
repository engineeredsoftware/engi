import { createPhaseRunner, PhaseConfig } from '@bitcode/pipelines-generics';
import { registerValidationAgentsForType as registerAgents } from '../agents/validation-agents';
import { AssetPackWrittenAssetType } from '../types/AssetPackWrittenAssetType';
import type { SynthesizeAssetPacksMode } from '../synthesize-asset-packs';

/**
 * Validation phase configuration placeholder.
 * The actual execution composition for validation lives in phases/index.ts
 * where three validators run in parallel followed by the AssetPack
 * ReadyToFinish agent that gates the canonical Finish phase.
 */
const validationPhaseConfig: PhaseConfig = {
  phaseName: 'validation',
  sequence: [
    { agent: 'validation:asset-pack-ready-to-finish-agent' }
  ],
  allowShortCircuit: true
};

export const runValidationPhase = createPhaseRunner(validationPhaseConfig);

/**
 * Register validation agents (delegates to the canonical agents module).
 */
export function registerValidationAgentsForType(
  writtenAssetType: string,
  agentRegistry: any,
  // mode drives conditional registration: deposit validates synthesized AP
  // patches for deposit review; read validates fits artifacts. Shared for now.
  _mode?: SynthesizeAssetPacksMode,
): void {
  registerAgents(writtenAssetType || AssetPackWrittenAssetType.ReadSatisfactionAssetPack, agentRegistry);
}
