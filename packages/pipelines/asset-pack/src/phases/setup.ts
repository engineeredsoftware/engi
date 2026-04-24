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
    { agent: 'setup:deliverable-pipeline-clone-vcs-repository-agent' },
    { agent: 'setup:deliverable-setup-plan-agent' },
    { agent: 'setup:parallel-context-bootstrap', parallel: [
      { agent: 'setup:deliverable-pipeline-comprehend-need-agent' },
      // Optional when available:
      // { agent: 'setup:deliverable-pipeline-initialize-lsp-agent' }
    ]},
    { agent: 'setup:deliverable-pipeline-danger-wall-agent' },
    // Initialize MCPs tools once during setup
    { agent: 'setup:deliverable-pipeline-initialize-mcps-tools-agent' }
  ],
  allowShortCircuit: true
};

const runSetupPhase = createPhaseRunner(setupPhaseConfig);

export const deliverablesPipelineSetupPhaseExecutor: Executor<any, any> = async (input, execution) => {
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
    'setup:deliverable-pipeline-clone-vcs-repository-agent',
    () => import('../agents/setup/deliverable-pipeline-clone-vcs-repository-agent').then(m => m.default)
  );

  // Second sequence, init lsp and comprehend need
  agentRegistry.registerAgent(
    'setup:deliverable-pipeline-initialize-lsp-agent',
    () => import('../agents/setup/deliverable-pipeline-initialize-lsp-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:deliverable-setup-plan-agent',
    () => import('../agents/setup/deliverable-pipeline-setup-plan-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:deliverable-pipeline-comprehend-need-agent',
    () => import('../agents/setup/deliverable-pipeline-comprehend-need-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:deliverable-pipeline-comprehend-need-definition-agent',
    () => import('../agents/setup/deliverable-pipeline-comprehend-need-agent').then(m => m.default)
  );
  agentRegistry.registerAgent(
    'setup:deliverable-pipeline-danger-wall-agent',
    () => import('../agents/setup/deliverable-pipeline-danger-wall-agent').then(m => m.default)
  );

  // Initialize MCPs tools
  agentRegistry.registerAgent(
    'setup:deliverable-pipeline-initialize-mcps-tools-agent',
    () => import('../agents/setup/initialize-mcps-tools-agent').then(m => m.default)
  );
}
