/**
 * Implementation Phase - AssetPack Pipeline
 *
 * The live implementation orchestration now lives in `phases/index.ts`.
 * This helper exposes the same canonical Need-to-AssetPack synthesis sequence
 * for direct phase-runner imports.
 */

import { createPhaseRunner, type AgentStep, type PhaseConfig } from '@bitcode/pipelines-generics';

function createImplementationSequence(_assetPackWrittenAssetType: string): AgentStep[] {
  return [{ agent: 'implementation:asset-pack-synthesize-artifacts-agent' }];
}

export function createImplementationPhaseConfig(assetPackWrittenAssetType: string): PhaseConfig {
  return {
    phaseName: 'implementation',
    sequence: createImplementationSequence(assetPackWrittenAssetType),
    allowShortCircuit: false
  };
}

export function runImplementationPhase(assetPackWrittenAssetType: string) {
  return createPhaseRunner(createImplementationPhaseConfig(assetPackWrittenAssetType));
}

export function registerImplementationAgentsForType(
  _assetPackWrittenAssetType: string,
  agentRegistry: any
): void {
  registerImplementationAgents(agentRegistry);
}

export function registerImplementationAgents(agentRegistry: any): void {
  agentRegistry.registerAgent(
    'implementation:asset-pack-synthesize-artifacts-agent',
    () => import('../agents/implementation/asset-pack-synthesize-artifacts-agent').then(m => m.default)
  );
}
