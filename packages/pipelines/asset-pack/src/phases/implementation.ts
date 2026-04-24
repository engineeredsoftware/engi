/**
 * Implementation Phase - AssetPack Pipeline
 *
 * The live implementation orchestration now lives in `phases/index.ts`.
 * This file remains as a thin AssetPack compatibility carrier for older
 * imports and for agent registration keyed to written-asset route names.
 */

import { createPhaseRunner, type AgentStep, type PhaseConfig } from '@bitcode/pipelines-generics';
import { normalizeWrittenAssetType } from '../semantic-resolution';

function createImplementationSequence(writtenAssetType: string): AgentStep[] {
  switch (normalizeWrittenAssetType(writtenAssetType)) {
    case 'code-change':
      // Dynamic divide/conquer/correct execution is handled in phases/index.ts.
      return [];
    case 'code-change-review':
      return [{ agent: 'implementation:asset-pack-review-code-change-agent' }];
    case 'design-document':
      return [{ agent: 'implementation:asset-pack-create-design-document-agent' }];
    case 'design-document-review':
      return [{ agent: 'implementation:asset-pack-review-design-document-agent' }];
    default:
      throw new Error(`Unknown written-asset type: ${writtenAssetType}`);
  }
}

export function createImplementationPhaseConfig(writtenAssetType: string): PhaseConfig {
  return {
    phaseName: 'implementation',
    sequence: createImplementationSequence(writtenAssetType),
    allowShortCircuit: false
  };
}

export function runImplementationPhase(writtenAssetType: string) {
  return createPhaseRunner(createImplementationPhaseConfig(writtenAssetType));
}

export function registerImplementationAgentsForType(
  writtenAssetType: string,
  agentRegistry: any
): void {
  switch (normalizeWrittenAssetType(writtenAssetType)) {
    case 'code-change':
      agentRegistry.registerAgent(
        'implementation:asset-pack-divide-code-change-agent',
        () => import('../agents/implementation/asset-pack-divide-code-change-agent').then(m => m.default)
      );
      agentRegistry.registerAgent(
        'implementation:asset-pack-conquer-file-agent',
        () => import('../agents/implementation/asset-pack-conquer-file-agent').then(m => m.default)
      );
      agentRegistry.registerAgent(
        'implementation:asset-pack-correct-code-change-agent',
        () => import('../agents/implementation/asset-pack-correct-code-change-agent').then(m => m.default)
      );
      break;
    case 'code-change-review':
      agentRegistry.registerAgent(
        'implementation:asset-pack-review-code-change-agent',
        () => import('../agents/implementation/asset-pack-review-code-change-agent').then(m => m.default)
      );
      break;
    case 'design-document':
      agentRegistry.registerAgent(
        'implementation:asset-pack-create-design-document-agent',
        () => import('../agents/implementation/asset-pack-create-design-document-agent').then(m => m.default)
      );
      break;
    case 'design-document-review':
      agentRegistry.registerAgent(
        'implementation:asset-pack-review-design-document-agent',
        () => import('../agents/implementation/asset-pack-review-design-document-agent').then(m => m.default)
      );
      break;
    default:
      throw new Error(`Unknown written-asset type for implementation: ${writtenAssetType}`);
  }
}
