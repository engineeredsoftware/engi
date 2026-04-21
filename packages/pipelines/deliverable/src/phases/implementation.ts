/**
 * Implementation Phase - Deliverables Pipeline
 *
 * The live implementation orchestration now lives in `phases/index.ts`.
 * This file remains as a thin compatibility carrier for older imports and
 * for agent registration keyed to the retained deliverable route names.
 */

import { createPhaseRunner, type AgentStep, type PhaseConfig } from '@bitcode/pipelines-generics';

function createImplementationSequence(deliverableType: string): AgentStep[] {
  switch (deliverableType) {
    case 'code-change':
      // Dynamic divide/conquer/correct execution is handled in phases/index.ts.
      return [];
    case 'code-change-review':
      return [{ agent: 'implementation:deliverable-pipeline-review-code-change-agent' }];
    case 'design-document':
      return [{ agent: 'implementation:deliverable-pipeline-create-design-document-agent' }];
    case 'design-document-review':
      return [{ agent: 'implementation:deliverable-pipeline-review-design-document-agent' }];
    default:
      throw new Error(`Unknown deliverable type: ${deliverableType}`);
  }
}

export function createImplementationPhaseConfig(deliverableType: string): PhaseConfig {
  return {
    phaseName: 'implementation',
    sequence: createImplementationSequence(deliverableType),
    allowShortCircuit: false
  };
}

export function runImplementationPhase(deliverableType: string) {
  return createPhaseRunner(createImplementationPhaseConfig(deliverableType));
}

export function registerImplementationAgentsForType(
  deliverableType: string,
  agentRegistry: any
): void {
  switch (deliverableType) {
    case 'code-change':
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-divide-code-change-agent',
        () => import('../agents/implementation/deliverable-pipeline-divide-code-change-agent').then(m => m.default)
      );
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-conquer-file-agent',
        () => import('../agents/implementation/deliverable-pipeline-conquer-file-agent').then(m => m.default)
      );
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-correct-code-change-agent',
        () => import('../agents/implementation/deliverable-pipeline-correct-code-change-agent').then(m => m.default)
      );
      break;
    case 'code-change-review':
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-review-code-change-agent',
        () => import('../agents/implementation/deliverable-pipeline-review-code-change-agent').then(m => m.default)
      );
      break;
    case 'design-document':
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-create-design-document-agent',
        () => import('../agents/implementation/deliverable-pipeline-create-design-document-agent').then(m => m.default)
      );
      break;
    case 'design-document-review':
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-review-design-document-agent',
        () => import('../agents/implementation/deliverable-pipeline-review-design-document-agent').then(m => m.default)
      );
      break;
    default:
      throw new Error(`Unknown deliverable type for implementation: ${deliverableType}`);
  }
}
