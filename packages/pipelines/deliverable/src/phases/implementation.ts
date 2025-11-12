/**
 * Implementation Phase - Deliverables Pipeline
 * 
 * Third phase that executes the actual work based on deliverable type:
 * - Code Change: Divide → Conquer (parallel) → Correct
 * - Code Change Review: Review code change
 * - Design Document: Create design document
 * - Design Document Review: Review design document
 */

import { createPhaseRunner, PhaseConfig, AgentStep } from '@engi/pipelines-generics';
import { PipelineExecution } from '@engi/pipelines-generics';
import { ExecutionAccumulator } from '@engi/execution-generics';

/**
 * Create dynamic implementation sequence based on deliverable type
 */
function createImplementationSequence(
  deliverableType: string,
  execution: PipelineExecution
): AgentStep[] {
  switch (deliverableType) {
    case 'code-change':
      return createCodeChangeSequence(execution);
      
    case 'code-change-review':
      return [{ 
        agent: 'implementation:deliverable-pipeline-review-code-change-agent',
        description: 'Reviewing code change',
        input: {
          codeChange: '{{discovery.target}}',
          reviewCriteria: '{{discovery.criteria}}'
        }
      }];
      
    case 'design-document':
      return [{ 
        agent: 'implementation:deliverable-pipeline-create-design-document-agent',
        description: 'Creating design document',
        input: {
          requirements: '{{discovery.requirements}}',
          research: '{{discovery.research}}'
        }
      }];
      
    case 'design-document-review':
      return [{ 
        agent: 'implementation:deliverable-pipeline-review-design-document-agent',
        description: 'Reviewing design document',
        input: {
          document: '{{discovery.target}}',
          reviewCriteria: '{{discovery.criteria}}'
        }
      }];
      
    default:
      throw new Error(`Unknown deliverable type: ${deliverableType}`);
  }
}

/**
 * Create code change sequence with Divide|Conquer|Correct pattern
 * This is the CORE value proposition - parallel file conquest
 */
function createCodeChangeSequence(execution: PipelineExecution | ExecutionAccumulator): AgentStep[] {
  const sequence: AgentStep[] = [];
  
  // Step 1: DIVIDE - Determine all files to change
  sequence.push({
    agent: 'implementation:deliverable-pipeline-divide-code-change-agent',
    description: 'Dividing work into atomic file operations',
    input: {
      requirements: '{{discovery.requirements}}',
      approach: '{{discovery.approach}}',
      codebaseAnalysis: '{{setup.codebase}}'
    }
  });
  
  // Step 2: CONQUER - Process files in parallel
  // Dynamic parallelization based on divide results
  sequence.push({
    agent: 'implementation:conquer-files-parallel',
    description: 'Conquering files in parallel',
    parallel: true,
    dynamicParallelization: {
      source: 'implementation:deliverable-pipeline-divide-code-change-agent',
      field: 'filesToChange',
      agentTemplate: 'implementation:deliverable-pipeline-conquer-file-agent',
      inputMapper: (file: any) => ({
        filePath: file.filePath,
        changeType: file.changeType,
        purpose: file.purpose,
        dependencies: file.dependencies,
        estimatedComplexity: file.estimatedComplexity,
        fileContext: '{{context.forFile}}'
      })
    }
  });
  
  // Step 3: CORRECT - Validate and fix all changes
  sequence.push({
    agent: 'implementation:deliverable-pipeline-correct-code-change-agent',
    description: 'Correcting and validating all changes',
    input: {
      allFileResults: '{{implementation:conquer-files-parallel.results}}',
      originalDivision: '{{implementation:deliverable-pipeline-divide-code-change-agent}}',
      validationCriteria: '{{discovery.validationCriteria}}'
    }
  });
  
  return sequence;
}

/**
 * Implementation phase configuration (dynamically created)
 */
export function createImplementationPhaseConfig(
  deliverableType: string,
  execution: PipelineExecution | ExecutionAccumulator
): PhaseConfig {
  return {
    phaseName: 'implementation',
    sequence: createImplementationSequence(deliverableType, execution),
    allowShortCircuit: false, // Implementation doesn't short-circuit
    parallelizationStrategy: 'dynamic', // For Conquer phase
    maxParallelAgents: 10 // Limit parallel file processing
  };
}

/**
 * Create the implementation phase runner
 * Note: This is dynamic based on deliverable type
 */
export function runImplementationPhase(
  deliverableType: string
) {
  return async (input: any, execution: PipelineExecution) => {
    const config = createImplementationPhaseConfig(deliverableType, execution);
    const runner = createPhaseRunner(config);
    return await runner(input, execution);
  };
}

/**
 * Register implementation agents based on deliverable type
 * Called after setup determines the type
 */
export function registerImplementationAgentsForType(
  deliverableType: string,
  agentRegistry: any
): void {
  switch (deliverableType) {
    case 'code-change':
      // Register Divide|Conquer|Correct agents with correct file paths
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
      // TODO: Create design document agent
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-create-design-document-agent',
        () => import('../agents/implementation/deliverable-pipeline-create-design-document-agent').then(m => m.default)
      );
      break;
      
    case 'design-document-review':
      // TODO: Create design review agent
      agentRegistry.registerAgent(
        'implementation:deliverable-pipeline-review-design-document-agent',
        () => import('../agents/implementation/deliverable-pipeline-review-design-document-agent').then(m => m.default)
      );
      break;
      
    default:
      throw new Error(`Unknown deliverable type for implementation: ${deliverableType}`);
  }
}
