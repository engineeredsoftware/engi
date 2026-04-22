/**
 * Shipping Phase - Deliverables Pipeline
 * 
 * Final phase that ships the deliverable:
 * 1. Type-specific shipping (create PR, submit review, etc.)
 * 2. Gather metrics from all phases
 * 3. Generate human-readable final response
 * 4. Finalize pipeline execution
 */

import { createPhaseRunner, PhaseConfig } from '@bitcode/pipelines-generics';

/**
 * Create shipping sequence based on deliverable type
*
  * TODO: this isn't modern executor/execution pattern (registry keys fine mostly but not seeing functional componsition of the exeuctors of these agents.
  * TODO: very last agent should be a FinalWorkSummary agent which is a special Quick agent implementation (seeing definition(s), 'stepless'). however quick still have 1 step/stepless they still run the 3 Failsafes to ultimately get output
 */
function createShippingSequence(_writtenAssetType: string): any[] {
  // Exactly two agents: Ship (PTRR) then FinalWorkSummary (Quick)
  return [
    { agent: 'shipping:deliverable-pipeline-ship-agent' },
    { agent: 'shipping:final-work-summary' }
  ];
}

/**
 * Shipping phase configuration
 */
export function createShippingPhaseConfig(writtenAssetType: string): PhaseConfig {
  return {
    phaseName: 'shipping',
    sequence: createShippingSequence(writtenAssetType),
    allowShortCircuit: false // Shipping never short-circuits
  };
}

/**
 * Create the shipping phase runner
 */
export function runShippingPhase(writtenAssetType: string) {
  return createPhaseRunner(createShippingPhaseConfig(writtenAssetType));
}

/**
 * Register shipping agents based on deliverable type
 * Called after validation phase
 */
export function registerShippingAgentsForType(
  _writtenAssetType: string,
  agentRegistry: any
): void {
  // Register Ship agent and Final work summary (common for all types)
  agentRegistry.registerAgent(
    'shipping:deliverable-pipeline-ship-agent',
    () => import('../agents/shipping/deliverable-pipeline-ship-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'shipping:final-work-summary',
    () => import('../agents/shipping/deliverable-pipeline-final-work-summary-agent').then(m => m.default)
  );
}
