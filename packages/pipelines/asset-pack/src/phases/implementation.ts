/**
 * Implementation Phase - AssetPack Pipeline
 *
 * The live implementation orchestration now lives in `phases/index.ts`.
 * This helper exposes the same canonical Read-to-AssetPack synthesis sequence
 * for direct phase-runner imports.
 */

import { createPhaseRunner, type AgentStep, type PhaseConfig } from '@bitcode/pipelines-generics';
import type { SynthesizeAssetPacksMode } from '../synthesize-asset-packs';

function createImplementationSequence(_assetPackWrittenAssetType: string): AgentStep[] {
  return [{ agent: 'implementation:ReadFitsFindingSynthesisAssetPackSynthesisAgent' }];
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

export function registerImplementationAgents(
  agentRegistry: any,
  // mode drives conditional registration: deposit registers the AP-patch
  // synthesis agent (writes code edits), read keeps the fits-synthesis agent.
  // Both currently share the synthesis agent; deposit variant lands in a later chunk.
  _mode?: SynthesizeAssetPacksMode,
): void {
  agentRegistry.registerAgent(
    'implementation:ReadFitsFindingSynthesisAssetPackSynthesisAgent',
    () => import('../agents/implementation/read-fits-finding-synthesis-asset-pack-synthesis-agent').then(m => m.default)
  );
}
