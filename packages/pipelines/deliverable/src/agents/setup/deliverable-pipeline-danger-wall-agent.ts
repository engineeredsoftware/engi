/**
 * Bitcode Need Risk Admission Agent - Setup Phase Admission Check
 * 
 * Retained deliverable pipeline wrapper that adds short-circuit signaling when
 * Bitcode risk admission blocks the next phase.
 */

import { bitcodeNeedRiskAdmissionAgent } from '@bitcode/generic-agents-danger-wall';
import { ShortCircuitSignal } from '@bitcode/execution-generics';
import { z } from 'zod';

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
  const result = await bitcodeNeedRiskAdmissionAgent(input, execution);
  
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
          agent: 'bitcode-need-risk-admission',
          severity: result.finalAssessment.maxSeverity,
          flags: result.finalAssessment.verdict.flags
        }
      } as ShortCircuitSignal
    };
  }
  
  return result;
}
