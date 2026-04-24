/**
 * AssetPack Pipeline Phases
 * 
 * Implements the 5 canonical SDIVF phases using generic agents.
 */

import { type PhaseDelegator, createAgentExecutor } from '@bitcode/pipelines-generics';
import { Executor, sequential, parallel } from '@bitcode/execution-generics';
import { assetPackSetupPhaseExecutor } from './setup';
import { registerDiscoveryAgents } from './discovery';
import { registerImplementationAgentsForType } from './implementation';
import { registerValidationAgentsForType } from './validation';
import { registerFinishAgentsForType } from './finish';
import { resolveWrittenAssetTypeFromExecution } from '../semantic-resolution';
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
 * Setup Phase - repository context, need comprehension, and risk admission.
 * The retained danger-wall slot is now Bitcode need/AssetPack admission before iteration.
 */
// Use the Setup phase runner (executor pattern)
export const setupPhase = assetPackSetupPhaseExecutor as unknown as PhaseDelegator<DeliverableInput, SetupOutput>;

// ==================== DISCOVERY PHASE ====================

/**
 * Discovery Phase - Research and approach planning
 */
// Disable other phases during bring-up (no-op delegators)
export const discoveryPhase: PhaseDelegator<SetupOutput, DiscoveryOutput> = (async (input: DeliverableInput, execution: any) => {
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
 * Implementation Phase - Dynamic execution based on written-asset type
 * Determined by setup phase, executes appropriate agent sequence:
 * - Code Change: Divide → Conquer → Correct pattern
 * - Code Review: Review agent
 * - Design Document: Create issue agent
 * - Design Review: Comment on issue agent
 */
export const implementationPhase: PhaseDelegator<DiscoveryOutput, ImplementationOutput> = (async (input: any, execution: any) => {
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  try { registerImplementationAgentsForType(writtenAssetType, (execution as any).agents); } catch {}

  if (writtenAssetType === 'code-change') {
    // 1) Divide
    const divide = createAgentExecutor('implementation:asset-pack-divide-code-change-agent');
    const divideOut = await divide(input, execution);
    const files: any[] = (divideOut?.filesToChange || []);

    // 2) Conquer in parallel (dynamic)
    const makeConquerExec = (f: any): Executor<any, any> => async (_in, exec) => {
      const c = createAgentExecutor('implementation:asset-pack-conquer-file-agent');
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
    const correct = createAgentExecutor('implementation:asset-pack-correct-code-change-agent');
    return await correct({
      allFileResults: conquerResults,
      originalDivision: divideOut,
      validationCriteria: (execution as any).get?.('discovery','validationCriteria')
    }, execution);
  }

  if (writtenAssetType === 'code-change-review') {
    const review = createAgentExecutor('implementation:asset-pack-review-code-change-agent');
    return await review(input, execution);
  }
  if (writtenAssetType === 'design-document') {
    const createDoc = createAgentExecutor('implementation:asset-pack-create-design-document-agent');
    return await createDoc(input, execution);
  }
  if (writtenAssetType === 'design-document-review') {
    const reviewDoc = createAgentExecutor('implementation:asset-pack-review-design-document-agent');
    return await reviewDoc(input, execution);
  }
  throw new Error(`Unknown written-asset type: ${writtenAssetType}`);
}) as unknown as PhaseDelegator<DiscoveryOutput, ImplementationOutput>;

// ==================== VALIDATION PHASE ====================

/**
 * Validation Phase - Quality checks and completion verification
 * Danger-wall has been moved to Setup phase
 */
export const validationPhase: PhaseDelegator<ImplementationOutput, ValidationOutput> = (async (input: any, execution: any) => {
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  try { registerValidationAgentsForType(writtenAssetType, (execution as any).agents); } catch {}
  // Build implementation validator by type
  // Implementation validator agent is type‑specific but writes to the same store
  // (validation/implementation:issues) for cohesive downstream consumption.
  // Mapping (four deliverable types):
  //  - 'code-change'           → 'validation:validate-implementation-phase-code-change'
  //  - 'code-change-review'    → 'validation:validate-implementation-phase-code-change-review'
  //  - 'design-document'       → 'validation:validate-implementation-phase-design-document'
  //  - 'design-document-review'→ 'validation:validate-implementation-phase-design-document-review'
  const implKey = (
    writtenAssetType === 'code-change' ? 'validation:validate-implementation-phase-code-change'
    : writtenAssetType === 'code-change-review' ? 'validation:validate-implementation-phase-code-change-review'
    : writtenAssetType === 'design-document' ? 'validation:validate-implementation-phase-design-document'
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
  // The final ReadyToFinish agent reads from these stores to decide.
  // Sequential: validators -> ready-to-instruct -> wait (if needed) -> ReadyToFinish
  const readyToInstruct = createAgentExecutor('validation:asset-pack-ready-to-instruct');
  const readyToFinish = createAgentExecutor('validation:asset-pack-ready-to-finish-agent');

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
    readyToFinish     // Final go/no-go before Finish
  );
  return await exec(input, execution);
}) as unknown as PhaseDelegator<ImplementationOutput, ValidationOutput>;

// ==================== FINISH PHASE ====================

/**
 * Finish Phase - save the pipeline result and optionally Deliver AssetPacks /
 * AssetPackPartials to connected third-party destinations.
 */
export const finishPhase: PhaseDelegator<ValidationOutput, DeliverablePhaseOutput> = (async (input: any, execution: any) => {
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  try { registerFinishAgentsForType(writtenAssetType, (execution as any).agents); } catch {}
  const exec: Executor<any, any> = sequential(
    createAgentExecutor('finish:deliver-asset-pack-to-destination-agent'),
    createAgentExecutor('finish:final-work-summary')
  );
  return await exec(input, execution);
}) as unknown as PhaseDelegator<ValidationOutput, DeliverablePhaseOutput>;

// ==================== EXPORT ALL PHASES ====================

export const assetPackPhases = {
  setup: setupPhase,
  discovery: discoveryPhase,
  implementation: implementationPhase,
  validation: validationPhase,
  finish: finishPhase,
};
