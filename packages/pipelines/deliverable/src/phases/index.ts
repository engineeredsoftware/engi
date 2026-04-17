/**
 * Deliverable Pipeline Phases
 * 
 * Implements the 5 SDIVS phases using generic agents.
 */

import { type PhaseDelegator, createAgentExecutor } from '@bitcode/pipelines-generics';
import { Executor, sequential, parallel } from '@bitcode/execution-generics';
import { deliverablesPipelineSetupPhaseExecutor } from './setup';
import { registerDiscoveryAgents } from './discovery';
import { registerImplementationAgentsForType } from './implementation';
import { registerValidationAgentsForType } from './validation';
import { registerShippingAgentsForType } from './shipping';
import type {
  DeliverableInput,
  DeliverableOutput as DeliverablePhaseOutput,
} from '../types/PipelineSchemas';

type SetupOutput = DeliverableInput;
type DiscoveryOutput = DeliverableInput;
type ImplementationOutput = DeliverablePhaseOutput;
type ValidationOutput = DeliverablePhaseOutput;

// ==================== SETUP PHASE ====================

/**
 * Setup Phase - Repository analysis, context preparation, and safety checks
 * Now includes danger-wall before proceeding to iteration
 */
// Use the Setup phase runner (executor pattern)
export const setupPhase = deliverablesPipelineSetupPhaseExecutor as unknown as PhaseDelegator<DeliverableInput, SetupOutput>;

// ==================== DISCOVERY PHASE ====================

/**
 * Discovery Phase - Research and approach planning
 */
// Disable other phases during bring-up (no-op delegators)
export const discoveryPhase: PhaseDelegator<SetupOutput, DiscoveryOutput> = (async (input, execution) => {
  try { registerDiscoveryAgents((execution as any).agents); } catch {}
  const exec: Executor<any, any> = sequential(
    createAgentExecutor('discovery:gather-context'),
    createAgentExecutor('discovery:understand-requirements'),
    createAgentExecutor('discovery:research-approach'),
    createAgentExecutor('discovery:plan-implementation'),
    createAgentExecutor('discovery:assess-complexity')
  );
  return await exec(input, execution);
}) as unknown as PhaseDelegator<SetupOutput, DiscoveryOutput>;

// ==================== IMPLEMENTATION PHASE ====================

/**
 * Implementation Phase - Dynamic execution based on deliverable type
 * Determined by setup phase, executes appropriate agent sequence:
 * - Code Change: Divide → Conquer → Correct pattern
 * - Code Review: Review agent
 * - Design Document: Create issue agent
 * - Design Review: Comment on issue agent
 */
export const implementationPhase: PhaseDelegator<DiscoveryOutput, ImplementationOutput> = (async (input, execution) => {
  const deliverableType = (execution as any).findUp?.('pipeline', 'deliverableType') || (execution as any).get?.('pipeline','deliverableType') || 'code-change';
  try { registerImplementationAgentsForType(deliverableType, (execution as any).agents); } catch {}

  if (deliverableType === 'code-change') {
    // 1) Divide
    const divide = createAgentExecutor('implementation:deliverable-pipeline-divide-code-change-agent');
    const divideOut = await divide(input, execution);
    const files: any[] = (divideOut?.filesToChange || []);

    // 2) Conquer in parallel (dynamic)
    const makeConquerExec = (f: any): Executor<any, any> => async (_in, exec) => {
      const c = createAgentExecutor('implementation:deliverable-pipeline-conquer-file-agent');
      return await c({
        filePath: f.filePath,
        changeType: f.changeType,
        purpose: f.purpose,
        dependencies: f.dependencies,
        estimatedComplexity: f.estimatedComplexity,
        fileContext: null
      }, exec);
    };
    const conquer = parallel(...files.map(makeConquerExec));
    const conquerResults = files.length ? await conquer(divideOut, execution) : [];

    // 3) Correct
    const correct = createAgentExecutor('implementation:deliverable-pipeline-correct-code-change-agent');
    return await correct({
      allFileResults: conquerResults,
      originalDivision: divideOut,
      validationCriteria: (execution as any).get?.('discovery','validationCriteria')
    }, execution);
  }

  if (deliverableType === 'code-change-review') {
    const review = createAgentExecutor('implementation:deliverable-pipeline-review-code-change-agent');
    return await review(input, execution);
  }
  if (deliverableType === 'design-document') {
    const createDoc = createAgentExecutor('implementation:deliverable-pipeline-create-design-document-agent');
    return await createDoc(input, execution);
  }
  if (deliverableType === 'design-document-review') {
    const reviewDoc = createAgentExecutor('implementation:deliverable-pipeline-review-design-document-agent');
    return await reviewDoc(input, execution);
  }
  throw new Error(`Unknown deliverable type: ${deliverableType}`);
}) as unknown as PhaseDelegator<DiscoveryOutput, ImplementationOutput>;

// ==================== VALIDATION PHASE ====================

/**
 * Validation Phase - Quality checks and completion verification
 * Danger-wall has been moved to Setup phase
 */
export const validationPhase: PhaseDelegator<ImplementationOutput, ValidationOutput> = (async (input, execution) => {
  const deliverableType = (execution as any).findUp?.('pipeline', 'deliverableType') || (execution as any).get?.('pipeline','deliverableType') || 'code-change';
  try { registerValidationAgentsForType(deliverableType, (execution as any).agents); } catch {}
  // Build implementation validator by type
  // Implementation validator agent is type‑specific but writes to the same store
  // (validation/implementation:issues) for cohesive downstream consumption.
  // Mapping (four deliverable types):
  //  - 'code-change'           → 'validation:validate-implementation-phase-code-change'
  //  - 'code-change-review'    → 'validation:validate-implementation-phase-code-change-review'
  //  - 'design-document'       → 'validation:validate-implementation-phase-design-document'
  //  - 'design-document-review'→ 'validation:validate-implementation-phase-design-document-review'
  const implKey = (
    deliverableType === 'code-change' ? 'validation:validate-implementation-phase-code-change'
    : deliverableType === 'code-change-review' ? 'validation:validate-implementation-phase-code-change-review'
    : deliverableType === 'design-document' ? 'validation:validate-implementation-phase-design-document'
    : 'validation:validate-implementation-phase-design-document-review'
  );

  const parallelValidators = parallel(
    createAgentExecutor('validation:validate-last-iterations-validation-phase'),
    createAgentExecutor('validation:validate-discovery-phase'),
    createAgentExecutor(implKey)
  );
  // Validators return only { issues: string[] } and also write issues into stores:
  //  - validation/last:issues
  //  - validation/discovery:issues
  //  - validation/implementation:issues
  // The final ready-to-ship agent reads from these stores to decide.
  // Sequential: validators → ready-to-instruct → wait (if needed) → ready-to-ship
  const readyToInstruct = createAgentExecutor('validation:deliverable-pipeline-ready-to-instruct');
  const readyToShip = createAgentExecutor('validation:deliverable-pipeline-ready-to-ship-agent');

  // Wait for instruction if confidence < threshold
  const waitIfNeeded = async (input: any, exec: any) => {
    const selfInstruct = exec.get('validation', 'selfInstruction');

    if (selfInstruct && selfInstruct.confidence < 0.8) {
      const { waitForInstruction } = await import('@bitcode/pipelines-generics');

      return waitForInstruction({
        confidence: selfInstruct.confidence
      })(input, exec);
    }

    return input;  // High confidence, proceed immediately
  };

  const exec: Executor<any, any> = sequential(
    parallelValidators as any,
    readyToInstruct,  // Generates selfInstructConfidence
    waitIfNeeded,     // Pauses if confidence < 0.8
    readyToShip       // Final go/no-go
  );
  return await exec(input, execution);
}) as unknown as PhaseDelegator<ImplementationOutput, ValidationOutput>;

// ==================== SHIPPING PHASE ====================

/**
 * Shipping Phase - PR creation and delivery
 */
export const shippingPhase: PhaseDelegator<ValidationOutput, DeliverablePhaseOutput> = (async (input, execution) => {
  const deliverableType = (execution as any).findUp?.('pipeline', 'deliverableType') || (execution as any).get?.('pipeline','deliverableType') || 'code-change';
  try { registerShippingAgentsForType(deliverableType, (execution as any).agents); } catch {}
  const exec: Executor<any, any> = sequential(
    createAgentExecutor('shipping:deliverable-pipeline-ship-agent'),
    createAgentExecutor('shipping:final-work-summary')
  );
  return await exec(input, execution);
}) as unknown as PhaseDelegator<ValidationOutput, DeliverablePhaseOutput>;

// ==================== EXPORT ALL PHASES ====================

export const deliverablePhases = {
  setup: setupPhase,
  discovery: discoveryPhase,
  implementation: implementationPhase,
  validation: validationPhase,
  shipping: shippingPhase,
};
