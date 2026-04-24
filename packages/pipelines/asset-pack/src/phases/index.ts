/**
 * AssetPack Pipeline Phases
 * 
 * Implements the 5 canonical SDIVF phases using generic agents.
 */

import { type PhaseDelegator, createAgentExecutor } from '@bitcode/pipelines-generics';
import { Executor, sequential, parallel } from '@bitcode/execution-generics';
import { assetPackSetupPhaseExecutor } from './setup';
import { registerDiscoveryAgents } from './discovery';
import { registerImplementationAgents } from './implementation';
import { registerValidationAgentsForType } from './validation';
import { registerFinishAgentsForType } from './finish';
import {
  resolveDeliveryMechanismTemplateFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from '../semantic-resolution';
import type {
  AssetPackInput,
  AssetPackOutput,
} from '../types/PipelineSchemas';

type SetupOutput = AssetPackInput;
type DiscoveryOutput = AssetPackInput;
type ImplementationOutput = AssetPackOutput;
type ValidationOutput = AssetPackOutput;

// ==================== SETUP PHASE ====================

/**
 * Setup Phase - repository context, need comprehension, and risk admission.
 * Danger-wall performs Bitcode Need/AssetPack admission before iteration.
 */
// Use the Setup phase runner (executor pattern)
export const setupPhase = assetPackSetupPhaseExecutor as unknown as PhaseDelegator<AssetPackInput, SetupOutput>;

// ==================== DISCOVERY PHASE ====================

/**
 * Discovery Phase - Research and approach planning
 */
// Disable other phases during bring-up (no-op delegators)
export const discoveryPhase: PhaseDelegator<SetupOutput, DiscoveryOutput> = (async (input: AssetPackInput, execution: any) => {
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
 * Implementation Phase - canonical AssetPack synthesis-artifact production.
 *
 * Pull request, review, issue, and comment labels are Finish delivery-mechanism
 * templates. They do not choose implementation behavior.
 */
export const implementationPhase: PhaseDelegator<DiscoveryOutput, ImplementationOutput> = (async (input: any, execution: any) => {
  try { registerImplementationAgents((execution as any).agents); } catch {}
  const synthesize = createAgentExecutor('implementation:asset-pack-synthesize-artifacts-agent');
  return await synthesize(input, execution);
}) as unknown as PhaseDelegator<DiscoveryOutput, ImplementationOutput>;

// ==================== VALIDATION PHASE ====================

/**
 * Validation Phase - Quality checks and completion verification
 * Danger-wall has been moved to Setup phase
 */
export const validationPhase: PhaseDelegator<ImplementationOutput, ValidationOutput> = (async (input: any, execution: any) => {
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  try { registerValidationAgentsForType(writtenAssetType, (execution as any).agents); } catch {}

  const parallelValidators = parallel(
    createAgentExecutor('validation:validate-last-iterations-validation-phase'),
    createAgentExecutor('validation:validate-discovery-phase'),
    createAgentExecutor('validation:validate-asset-pack-synthesis-artifacts')
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
export const finishPhase: PhaseDelegator<ValidationOutput, AssetPackOutput> = (async (input: any, execution: any) => {
  const deliveryMechanismTemplate = resolveDeliveryMechanismTemplateFromExecution(execution);
  try { registerFinishAgentsForType(deliveryMechanismTemplate, (execution as any).agents); } catch {}
  const exec: Executor<any, any> = sequential(
    createAgentExecutor('finish:deliver-asset-pack-to-destination-agent'),
    createAgentExecutor('finish:final-work-summary')
  );
  return await exec(input, execution);
}) as unknown as PhaseDelegator<ValidationOutput, AssetPackOutput>;

// ==================== EXPORT ALL PHASES ====================

export const assetPackPhases = {
  setup: setupPhase,
  discovery: discoveryPhase,
  implementation: implementationPhase,
  validation: validationPhase,
  finish: finishPhase,
};
