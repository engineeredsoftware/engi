/**
 * ReadyToFinish Agent - Final Validation Phase Decision
 * 
 * Compatibility-named final go/no-go decision before the canonical Finish phase.
 * Can short-circuit with partial refund if not production-ready.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { NS_EXEC_DELIVERABLE_VALIDATION_RTS } from '@bitcode/execution-generics';
import { ShortCircuitSignal } from '@bitcode/execution-generics';
import { getDeliverablePipelineToolsForAgent } from '../../tools';
import { z } from 'zod';
import {
  createDeliverablesPipelineValidationPhaseReadyToFinishAgentPrompt,
  DeliverablesPipelineValidationPhaseReadyToFinishAgentPromptSteps
} from '../prompts/ready-to-ship-prompt';

/**
 * Input schema - aggregates ALL validation results
 */
const ReadyToFinishInputSchema = z.object({
  // Discovery validation results
  discoveryValidation: z.object({
    valid: z.boolean(),
    confidence: z.number(),
    issues: z.array(z.string())
  }),

  // Implementation validation results
  implementationValidation: z.object({
    valid: z.boolean(),
    confidence: z.number(),
    issues: z.array(z.string())
  }),

  // Meta-validation results
  metaValidation: z.object({
    valid: z.boolean(),
    confidence: z.number(),
    issues: z.array(z.string())
  }),

  // Type-specific readiness
  typeReadiness: z.object({
    ready: z.boolean(),
    confidence: z.number(),
    blockers: z.array(z.string())
  }),

  // Overall quality metrics
  qualityMetrics: z.object({
    codeQuality: z.number().optional(),
    testCoverage: z.number().optional(),
    documentationQuality: z.number().optional(),
    performanceScore: z.number().optional()
  })
});

/**
 * Output schema with optional short-circuit signal
 */
const ReadyToFinishOutputSchema = z.object({
  ready: z.boolean(),
  confidence: z.number(),

  // Detailed assessment
  assessment: z.object({
    productionReady: z.boolean(),
    qualityLevel: z.enum(['excellent', 'good', 'acceptable', 'poor']),
    riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
    recommendation: z.string()
  }),

  // Issues and blockers
  criticalIssues: z.array(z.string()),
  warnings: z.array(z.string()),
  suggestions: z.array(z.string()),

  // Metrics summary
  metrics: z.object({
    overallScore: z.number(),
    validationScore: z.number(),
    qualityScore: z.number(),
    readinessScore: z.number()
  }),

  // Short-circuit signal if not ready
  signal: z.object({
    type: z.literal('SHORT_CIRCUIT').optional(),
    reason: z.string().optional(),
    refundType: z.enum(['full', 'partial']).optional(),
    confidence: z.number().optional()
  }).optional()
});

/**
 * ReadyToFinish Agent - PTRR Implementation
 */
export type Input = z.infer<typeof ReadyToFinishInputSchema>;
export type Output = z.infer<typeof ReadyToFinishOutputSchema>;

const readyToFinishAgent = factoryAgentWithPTRR<
  z.infer<typeof ReadyToFinishInputSchema>,
  z.infer<typeof ReadyToFinishOutputSchema>
>({
  tools: getDeliverablePipelineToolsForAgent('deliverable-pipeline-ready-to-ship-agent'),
  name: 'deliverable-pipeline-ready-to-ship-agent',
  description: 'Final validation and Finish readiness assessment',

  prompt: createDeliverablesPipelineValidationPhaseReadyToFinishAgentPrompt(),
  stepPrompts: DeliverablesPipelineValidationPhaseReadyToFinishAgentPromptSteps,

  outputSchema: ReadyToFinishOutputSchema,

  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

/**
 * Export wrapper that adds short-circuit logic
 */
export default async function readyToFinishWithShortCircuit(input: any, execution: any) {
  // Prepare input from validation stores (issues-only contract)
  const di: string[] = (execution.get('validation/discovery', 'issues') as string[]) || [];
  const ii: string[] = (execution.get('validation/implementation', 'issues') as string[]) || [];
  const li: string[] = (execution.get('validation/last', 'issues') as string[]) || [];

  const finishInput = {
    discoveryValidation: {
      valid: di.length === 0,
      confidence: 0.5,
      issues: di
    },
    implementationValidation: {
      valid: ii.length === 0,
      confidence: 0.5,
      issues: ii
    },
    metaValidation: {
      valid: li.length === 0,
      confidence: 0.5,
      issues: li
    },
    typeReadiness: {
      ready: di.length === 0 && ii.length === 0,
      confidence: 0.5,
      blockers: [...(di || []), ...(ii || [])].slice(0, 10)
    },
    qualityMetrics: {}
  };

  // Execute the agent
  const result = await readyToFinishAgent(finishInput, execution);

  // Define critical failure thresholds
  const QUALITY_THRESHOLD = 0.5;
  const CONFIDENCE_THRESHOLD = 0.6;
  const CRITICAL_RISK = result.assessment.riskLevel === 'critical';
  const POOR_QUALITY = result.assessment.qualityLevel === 'poor';
  const LOW_CONFIDENCE = result.confidence < CONFIDENCE_THRESHOLD;
  const LOW_QUALITY = result.metrics.overallScore < QUALITY_THRESHOLD;

  // Check if we should short-circuit
  const shouldShortCircuit =
    !result.ready ||
    CRITICAL_RISK ||
    POOR_QUALITY ||
    LOW_CONFIDENCE ||
    LOW_QUALITY ||
    result.criticalIssues.length > 0;

  if (shouldShortCircuit) {
    // Persist readiness signal for header rendering
    try {
      /**
       * Store ReadyToFinish decision for header rendering.
       * Type: Output (structured agent output)
       */
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'approved', false);
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'assessment', result.assessment as Output['assessment']);
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'confidence', result.confidence as Output['confidence']);
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'result', result as Output);
    } catch {}
    // Build comprehensive reason
    const reasons = [];
    if (!result.ready) reasons.push('Not ready to finish');
    if (CRITICAL_RISK) reasons.push('Critical risk level');
    if (POOR_QUALITY) reasons.push('Poor quality assessment');
    if (LOW_CONFIDENCE) reasons.push(`Low confidence (${result.confidence.toFixed(2)})`);
    if (LOW_QUALITY) reasons.push(`Low quality score (${result.metrics.overallScore.toFixed(2)})`);
    if (result.criticalIssues.length > 0) {
      reasons.push(`Critical issues: ${result.criticalIssues.slice(0, 3).join(', ')}`);
    }

    return {
      result,
      signal: {
        type: 'SHORT_CIRCUIT' as const,
        reason: reasons.join('; '),
        refundType: 'partial' as const, // Partial refund since validation work was done
        confidence: result.confidence,
        metadata: {
          phase: 'validation',
          agent: 'deliverable-pipeline-ready-to-ship-agent',
          qualityLevel: result.assessment.qualityLevel,
          riskLevel: result.assessment.riskLevel,
          criticalIssues: result.criticalIssues,
          metrics: result.metrics
        }
      } as ShortCircuitSignal
    };
  }

  // Ready to Finish.
  try {
    /**
     * Store ReadyToFinish decision for header rendering.
     * Type: Output (structured agent output)
     */
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'approved', true);
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'timestamp', new Date().toISOString());
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'assessment', result.assessment as Output['assessment']);
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'confidence', result.confidence as Output['confidence']);
    execution.store(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'result', result as Output);
  } catch {}

  return result;
}
