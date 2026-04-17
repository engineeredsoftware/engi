/**
 * Danger Wall Agent - Setup Phase Safety Check
 * 
 * Deliverable Pipeline - Danger Wall Agent wrapper that adds short-circuit signaling
 * for deliverables pipeline. Signals full refund if dangerous content detected.
 */

import { dangerWallAgent } from '@bitcode/generic-agents-danger-wall';
import { ShortCircuitSignal } from '@bitcode/execution-generics';
import { z } from 'zod';

/**
 * Extended output schema with short-circuit signal
 */
const DangerWallWithSignalSchema = z.object({
  result: z.any(), // The normal danger wall output
  signal: z.object({
    type: z.literal('SHORT_CIRCUIT').optional(),
    reason: z.string().optional(),
    refundType: z.enum(['full', 'partial']).optional(),
    confidence: z.number().optional()
  }).optional()
});

/**
 * Danger wall agent wrapper with short-circuit capability
 */
export default async function dangerWallWithShortCircuit(input: any, execution: any) {
  // Execute the generic danger wall agent
  const result = await dangerWallAgent(input, execution);
  
  // Check if content is dangerous
  const isDangerous = !result.finalAssessment.safe || 
                     result.finalAssessment.maxSeverity === 'critical' ||
                     result.finalAssessment.maxSeverity === 'high';
  
  // If dangerous, return with short-circuit signal
  if (isDangerous) {
    return {
      result,
      signal: {
        type: 'SHORT_CIRCUIT' as const,
        reason: `Dangerous content detected: ${result.finalAssessment.verdict.reason}`,
        refundType: 'full' as const, // Full refund for safety violations
        confidence: result.finalAssessment.confidence,
        metadata: {
          phase: 'setup',
          agent: 'danger-wall',
          severity: result.finalAssessment.maxSeverity,
          flags: result.finalAssessment.verdict.flags
        }
      } as ShortCircuitSignal
    };
  }
  
  // Safe content, return normal result
  return result;
}
