/**
 * Finish Phase - AssetPack Pipeline
 * 
 * Final phase that saves the run result and performs Delivering when requested:
 * 1. Provide AssetPacks/AssetPackPartials to third-party destinations
 * 2. Gather metrics from all phases
 * 3. Generate human-readable final response
 * 4. Finalize pipeline execution
 */

import { createPhaseRunner, PhaseConfig } from '@bitcode/pipelines-generics';

/**
 * Create Finish sequence based on written-asset type.
*
  * TODO: this isn't modern executor/execution pattern (registry keys fine mostly but not seeing functional componsition of the exeuctors of these agents.
  * TODO: very last agent should be a FinalWorkSummary agent which is a special Quick agent implementation (seeing definition(s), 'stepless'). however quick still have 1 step/stepless they still run the 3 Failsafes to ultimately get output
 */
function createFinishSequence(_writtenAssetType: string): any[] {
  // Exactly two agents: Deliver (PTRR) then FinalWorkSummary (Quick).
  return [
    { agent: 'finish:deliver-asset-pack-to-destination-agent' },
    { agent: 'finish:final-work-summary' }
  ];
}

/**
 * Finish phase configuration.
 */
export function createFinishPhaseConfig(writtenAssetType: string): PhaseConfig {
  return {
    phaseName: 'finish',
    sequence: createFinishSequence(writtenAssetType),
    allowShortCircuit: false // Finish never short-circuits
  };
}

/**
 * Create the Finish phase runner.
 */
export function runFinishPhase(writtenAssetType: string) {
  return createPhaseRunner(createFinishPhaseConfig(writtenAssetType));
}

/**
 * Register Finish agents based on written-asset type.
 * Called after validation phase.
 */
export function registerFinishAgentsForType(
  _writtenAssetType: string,
  agentRegistry: any
): void {
  // Register canonical Finish agents first; retained shipping keys remain
  // compatibility aliases for callers that have not moved to Finish naming.
  agentRegistry.registerAgent(
    'finish:deliver-asset-pack-to-destination-agent',
    () => import('../agents/finish/deliver-asset-pack-to-destination-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'finish:final-work-summary',
    () => import('../agents/finish/final-work-summary-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'shipping:deliverable-pipeline-ship-agent',
    () => import('../agents/finish/deliver-asset-pack-to-destination-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'shipping:final-work-summary',
    () => import('../agents/finish/final-work-summary-agent').then(m => m.default)
  );
}

export const createShippingPhaseConfig = createFinishPhaseConfig;
export const runShippingPhase = runFinishPhase;
export const registerShippingAgentsForType = registerFinishAgentsForType;
