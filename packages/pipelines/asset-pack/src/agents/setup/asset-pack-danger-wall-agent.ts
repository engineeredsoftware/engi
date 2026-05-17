/**
 * Bitcode Read Risk Admission Agent - Setup Phase Admission Check
 * 
 * Retained AssetPack pipeline wrapper that adds short-circuit signaling when
 * Bitcode risk admission blocks the next phase.
 */

import {
  BitcodeReadRiskAdmissionResultSchema,
  bitcodeReadRiskAdmissionAgent,
  quickBitcodeReadRiskAdmissionAgent,
} from '@bitcode/generic-agents-danger-wall';
import { ShortCircuitSignal } from '@bitcode/execution-generics';
import { z } from 'zod';
import { resolveWrittenAssetTypeFromExecution } from '../../semantic-resolution';
import { shouldUseAssetPackPtrr } from '../../runtime-inference-policy';

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

type BitcodeReadRiskAdmissionResult = z.infer<typeof BitcodeReadRiskAdmissionResultSchema>;

function objectValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function normalizeRiskAdmissionResult(rawResult: unknown): BitcodeReadRiskAdmissionResult {
  const rawRecord = objectValue(rawResult);
  const candidates = [
    rawResult,
    rawRecord?.output,
    rawRecord?.finalOutput,
    rawRecord?.processedResult,
  ];

  for (const candidate of candidates) {
    const parsed = BitcodeReadRiskAdmissionResultSchema.safeParse(candidate);
    if (parsed.success) return parsed.data;
  }

  const observedKeys = rawRecord ? Object.keys(rawRecord).sort() : [];
  return {
    finalAssessment: {
      safe: false,
      maxSeverity: 'high',
      confidence: 0,
      verdict: {
        approved: false,
        reason: 'Risk admission did not return a typed final assessment.',
        flags: ['risk-admission-output-missing-final-assessment'],
        recommendations: [
          'Block setup until risk admission returns a schema-valid final assessment.',
          observedKeys.length
            ? `Observed top-level output keys: ${observedKeys.join(', ')}.`
            : 'No object-shaped risk admission output was returned.',
        ],
      },
      auditTrail: [
        {
          check: 'Risk admission output shape',
          result: false,
          details: [
            'Danger-wall requires a schema-valid finalAssessment before setup can continue.',
          ],
          severity: 'high',
        },
      ],
    },
    riskInsights: {
      riskProfile: 'Blocked because risk admission output was not schema-valid.',
      threatLevel: 'high',
      riskRecommendations: ['Repair the risk-admission output contract before continuing.'],
      proofObligations: ['Persist the malformed output shape as readiness evidence.'],
      admissionBoundary: 'Setup cannot continue without typed risk-admission evidence.',
    },
    readAlignment: {
      alignmentScore: 0,
      readSafeToMeasure: false,
      assetPackSafeToSynthesize: false,
      deliveryMechanismSafeToAttempt: false,
    },
    recommendations: ['Return no-worthy-fit or blocked-readiness evidence instead of crashing.'],
    nextSteps: ['Repair risk-admission output normalization.'],
    success: false,
    validationMessage: 'Risk admission output missing finalAssessment',
  };
}

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
  const result = shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_DANGER_WALL_USE_PTRR')
    ? await bitcodeReadRiskAdmissionAgent(riskInput, execution)
    : await quickBitcodeReadRiskAdmissionAgent(riskInput, execution);
  const riskAdmissionResult = normalizeRiskAdmissionResult(result);
  try {
    execution.store('setup/danger-wall', 'rawResult', result);
    execution.store('setup/danger-wall', 'result', riskAdmissionResult);
    execution.store('setup/risk-admission', 'rawResult', result);
    execution.store('setup/risk-admission', 'result', riskAdmissionResult);
  } catch {}
  
  const isBlocked = !riskAdmissionResult.finalAssessment.safe ||
                     riskAdmissionResult.finalAssessment.maxSeverity === 'critical' ||
                     riskAdmissionResult.finalAssessment.maxSeverity === 'high';
  
  if (isBlocked) {
    return {
      result: riskAdmissionResult,
      signal: {
        type: 'SHORT_CIRCUIT' as const,
        reason: `Bitcode risk admission blocked setup: ${riskAdmissionResult.finalAssessment.verdict.reason}`,
        refundType: 'full' as const,
        confidence: riskAdmissionResult.finalAssessment.confidence,
        metadata: {
          phase: 'setup',
          agent: 'bitcode-read-risk-admission',
          severity: riskAdmissionResult.finalAssessment.maxSeverity,
          flags: riskAdmissionResult.finalAssessment.verdict.flags
        }
      } as ShortCircuitSignal
    };
  }
  
  return riskAdmissionResult;
}
