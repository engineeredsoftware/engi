/**
 * Discovery Phase - Deliverables Pipeline
 * 
 * Second phase that deeply understands requirements and plans approach:
 * 1. Comprehends all attachments (including Figma extraction)
 * 2. Filters and selects relevant files (parallel)
 * 3. Understands requirements with type awareness
 * 4. Researches approach and performs language analysis (parallel)
 * 5. Plans implementation strategy
 * 6. Assesses complexity for validation phase
 */

import { createPhaseRunner, PhaseConfig } from '@bitcode/pipelines-generics';

/**
 * Discovery phase configuration with parallel execution groups
 */
const discoveryPhaseConfig: PhaseConfig = {
  phaseName: 'discovery',
  sequence: [
    { agent: 'discovery:gather-context' },
    { agent: 'discovery:understand-requirements' },
    { agent: 'discovery:research-approach' },
    { agent: 'discovery:plan-implementation' },
    { agent: 'discovery:assess-complexity' }
  ],
  allowShortCircuit: false
};

/**
 * Create the discovery phase runner
 */
export const runDiscoveryPhase = createPhaseRunner(discoveryPhaseConfig);

/**
 * Discovery phase agent registration
 * Called after setup phase to register discovery agents
 */
export function registerDiscoveryAgents(agentRegistry: any): void {
  // File selection (parallel)
  agentRegistry.registerAgent(
    'discovery:deliverable-pipeline-select-files-parallel-agent',
    () => import('../agents/discovery/deliverable-pipeline-select-files-parallel-agent').then(m => m.default)
  );
  // Understand requirements
  agentRegistry.registerAgent(
    'discovery:deliverable-pipeline-understand-requirements-agent',
    () => import('../agents/discovery-agents').then(m => m.DeliverablesPipelineDiscoveryPhaseUnderstandRequirementsAgent)
  );
  // Research approach
  agentRegistry.registerAgent(
    'discovery:deliverable-pipeline-research-approach-agent',
    () => import('../agents/discovery-agents').then(m => m.DeliverablesPipelineDiscoveryPhaseResearchApproachAgent)
  );
  // Plan implementation
  agentRegistry.registerAgent(
    'discovery:deliverable-pipeline-plan-implementation-agent',
    () => import('../agents/discovery-agents').then(m => m.DeliverablesPipelineDiscoveryPhasePlanImplementationAgent)
  );
  // Assess complexity
  agentRegistry.registerAgent(
    'discovery:deliverable-pipeline-assess-complexity-agent',
    () => import('../agents/discovery-agents').then(m => m.DeliverablesPipelineDiscoveryPhaseAssessComplexityAgent)
  );
}
