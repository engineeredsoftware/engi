/**
 * Setup Phase - Declarative PhaseRunner (Executor pattern)
 *
 * Pure “sequence and save”: agents run, the stack stores execution state.
 * Returns the original input unchanged; downstream phases read from stores.
 */

import { Executor } from '@bitcode/execution-generics';
import { createPhaseRunner, type PhaseConfig } from '@bitcode/pipelines-generics';

const setupPhaseConfig: PhaseConfig = {
  phaseName: 'setup',
  sequence: [
    { agent: 'setup:asset-pack-clone-vcs-repository-agent' },
    { agent: 'setup:asset-pack-setup-plan-agent' },
    { agent: 'setup:parallel-context-bootstrap', parallel: [
      { agent: 'setup:asset-pack-comprehend-need-agent' },
      // Optional when available:
      // { agent: 'setup:asset-pack-initialize-lsp-agent' }
    ]},
    { agent: 'setup:asset-pack-danger-wall-agent' },
    // Initialize MCPs tools once during setup
    { agent: 'setup:asset-pack-initialize-mcps-tools-agent' }
  ],
  allowShortCircuit: true
};

const runSetupPhase = createPhaseRunner(setupPhaseConfig);

export const assetPackSetupPhaseExecutor: Executor<any, any> = async (input, execution) => {
  await runSetupPhase(input, execution);
  // PhaseRunner returns PhaseResult; pipeline expects input forward. Use stores for state.
  return input;
};

/**
 * Setup phase agent registration
 * Called at pipeline initialization to register all setup agents
 */
export function registerSetupAgents(agentRegistry: any): void {
  // Import and register all setup phase agents
  // First sequence, clone
  agentRegistry.registerAgent(
    'setup:asset-pack-clone-vcs-repository-agent',
    () => import('../agents/setup/asset-pack-clone-vcs-repository-agent').then(m => m.default)
  );

  // Second sequence, init lsp and comprehend need
  agentRegistry.registerAgent(
    'setup:asset-pack-initialize-lsp-agent',
    () => import('../agents/setup/asset-pack-initialize-lsp-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:asset-pack-setup-plan-agent',
    () => import('../agents/setup/asset-pack-setup-plan-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:asset-pack-comprehend-need-agent',
    () => import('../agents/setup/asset-pack-comprehend-need-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:asset-pack-comprehend-need-definition-agent',
    () => import('../agents/setup/asset-pack-comprehend-need-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:asset-pack-danger-wall-agent',
    () => import('../agents/setup/asset-pack-danger-wall-agent').then(m => m.default)
  );

  // Initialize MCPs tools
  agentRegistry.registerAgent(
    'setup:asset-pack-initialize-mcps-tools-agent',
    () => import('../agents/setup/asset-pack-initialize-mcps-tools-agent').then(m => m.default)
  );
}
