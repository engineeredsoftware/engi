/**
 * Short Circuit Signal - Pipeline termination primitive
 * 
 * Enables agents to signal pipeline termination with automatic refund handling.
 * This is a deliverables-pipeline specific pattern but implemented as a 
 * generic execution primitive for elegant composition.
 */

import { z } from 'zod';

/**
 * Short circuit signal that agents can return to terminate pipeline
 */
export interface ShortCircuitSignal {
  type: 'SHORT_CIRCUIT';
  reason: string;
  refundType: 'full' | 'partial';
  confidence: number;
  metadata?: {
    phase?: string;
    agent?: string;
    iterationCount?: number;
    [key: string]: any;
  };
}

/**
 * Zod schema for short circuit signal validation
 */
export const ShortCircuitSignalSchema = z.object({
  type: z.literal('SHORT_CIRCUIT'),
  reason: z.string(),
  refundType: z.enum(['full', 'partial']),
  confidence: z.number().min(0).max(1),
  metadata: z.record(z.any()).optional()
});

/**
 * Agent output wrapper that can include optional signals
 */
export interface AgentOutput<T> {
  result: T;
  signal?: ShortCircuitSignal;
}

/**
 * Type guard to check if output has short circuit signal
 */
export function hasShortCircuitSignal<T>(
  output: T | AgentOutput<T>
): output is AgentOutput<T> {
  return (
    typeof output === 'object' &&
    output !== null &&
    'signal' in output &&
    (output as any).signal?.type === 'SHORT_CIRCUIT'
  );
}

/**
 * Short circuit error thrown when signal detected
 */
export class ShortCircuitError extends Error {
  public readonly code = 'SHORT_CIRCUIT';
  
  constructor(
    public readonly signal: ShortCircuitSignal
  ) {
    super(`Pipeline short-circuit: ${signal.reason}`);
    this.name = 'ShortCircuitError';
  }
  
  /**
   * Whether this is a full refund (vs partial)
   */
  get isFullRefund(): boolean {
    return this.signal.refundType === 'full';
  }
  
  /**
   * Get refund percentage based on type
   */
  get refundPercentage(): number {
    return this.isFullRefund ? 1.0 : 0.5;
  }
}