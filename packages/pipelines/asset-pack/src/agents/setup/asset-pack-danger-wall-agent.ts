/**
 * Bitcode Read Risk Admission Agent - Setup Phase Admission Check
 * 
 * Retained AssetPack pipeline wrapper that adds short-circuit signaling when
 * Bitcode risk admission blocks the next phase.
 */

import {
  bitcodeReadRiskAdmissionAgent,
  quickBitcodeReadRiskAdmissionAgent,
} from '@bitcode/generic-agents-danger-wall';
import { ShortCircuitSignal } from '@bitcode/execution-generics';
import { z } from 'zod';
import { resolveWrittenAssetTypeFromExecution } from '../../semantic-resolution';

/**
 * Extended output schema with short-circuit signal.
 */
const DangerWallWithSignalSchema = z.object({
  result: z.any(), // The Bitcode risk-admission output
  signal: z.object({
    type: z.literal('SHORT_CIRCUIT').optional(),
    reason: z.string().optional(),
    refundType: z.enum(['full', 'partial']).optional(),
    confidence: z.number().optional()
  }).optional()
});

/**
 * Bitcode risk-admission wrapper with short-circuit capability.
 */
export default async function dangerWallWithShortCircuit(input: any, execution: any) {
  const riskAdmissionInput = execution?.get?.('setup/read-comprehension', 'riskAdmissionInput');
  const readModel = execution?.get?.('setup/read', 'model');
  const readComprehension = execution?.get?.('setup/read', 'comprehension');
  const riskInput = {
    ...input,
    ...riskAdmissionInput,
    read:
      riskAdmissionInput?.read ??
      input?.read ??
      input?.expressedRead ??
      input?.definitionOfRead ??
      readModel?.expressed_read ??
      readComprehension?.intent ??
      '',
    assetPackIntent:
      riskAdmissionInput?.assetPackIntent ??
      input?.assetPackIntent ??
      'Setup-phase AssetPack synthesis candidate',
    writtenAssetType:
      riskAdmissionInput?.writtenAssetType ??
      resolveWrittenAssetTypeFromExecution(execution),
    writtenAssetRequest:
      riskAdmissionInput?.writtenAssetRequest ??
      execution?.get?.('setup', 'writtenAssetRequest'),
    deliveryMechanism:
      riskAdmissionInput?.deliveryMechanism ??
      input?.deliveryMechanism,
    repositoryEvidence:
      riskAdmissionInput?.repositoryEvidence ??
      execution?.get?.('setup/read-comprehension', 'toolEvidence')
  };
  const result = process?.env?.BITCODE_ASSET_PACK_DANGER_WALL_USE_PTRR === '1'
    ? await bitcodeReadRiskAdmissionAgent(riskInput, execution)
    : await quickBitcodeReadRiskAdmissionAgent(riskInput, execution);
  try {
    execution.store('setup/danger-wall', 'result', result);
    execution.store('setup/risk-admission', 'result', result);
  } catch {}
  
  const isBlocked = !result.finalAssessment.safe ||
                     result.finalAssessment.maxSeverity === 'critical' ||
                     result.finalAssessment.maxSeverity === 'high';
  
  if (isBlocked) {
    return {
      result,
      signal: {
        type: 'SHORT_CIRCUIT' as const,
        reason: `Bitcode risk admission blocked setup: ${result.finalAssessment.verdict.reason}`,
        refundType: 'full' as const,
        confidence: result.finalAssessment.confidence,
        metadata: {
          phase: 'setup',
          agent: 'bitcode-read-risk-admission',
          severity: result.finalAssessment.maxSeverity,
          flags: result.finalAssessment.verdict.flags
        }
      } as ShortCircuitSignal
    };
  }
  
  return result;
}
