/**
 * Design Phase - PRODUCT.md Iteration
 *
 * User-gated iteration on PRODUCT.md specification.
 * Agent proposes changes, user reviews diff, provides feedback.
 * When satisfied, user clicks "Ready to Develop" → transition to Develop phase.
 */

import { createPhaseRunner } from '@engi/pipelines-generics';

export const designPhase = createPhaseRunner({
  phaseName: 'design',
  sequence: [
    {
      agent: 'design:iterate-product-md',
      description: 'Iterating on PRODUCT.md specification',
      input: {
        requirements: '{{input.requirements}}',
        currentProductMd: '{{file:.ai/PRODUCT.md}}',
        userFeedback: '{{design.feedback}}'
      }
    }
  ],
  allowShortCircuit: false,
  parallelizationStrategy: 'sequential'
});
