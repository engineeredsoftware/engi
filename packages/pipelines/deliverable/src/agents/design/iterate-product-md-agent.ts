/**
 * Iterate PRODUCT.md Agent (Design Phase)
 *
 * User-gated iteration on PRODUCT.md specification.
 * Reads requirements, proposes PRODUCT.md changes, user reviews and provides feedback.
 */

import { factoryAgentWithPTRR } from '@engi/agent-generics';
import { z } from 'zod';

const IterateProductMdInputSchema = z.object({
  requirements: z.string(),
  currentProductMd: z.string().optional(),
  userFeedback: z.string().optional()
});

const IterateProductMdOutputSchema = z.object({
  productMdDraft: z.string(),
  changes: z.array(z.object({
    section: z.string(),
    change: z.string(),
    reason: z.string()
  })),
  completeness: z.number().min(0).max(1),
  openQuestions: z.array(z.string()),
  readyToImplement: z.boolean(),
  useTools: z.array(z.object({
    name: z.string(),
    input: z.any()
  })).optional()
});

export const IterateProductMdAgent = factoryAgentWithPTRR<
  z.infer<typeof IterateProductMdInputSchema>,
  z.infer<typeof IterateProductMdOutputSchema>
>({
  name: 'design-iterate-product-md',
  description: 'Iterates on PRODUCT.md specification based on requirements and user feedback',

  outputSchema: IterateProductMdOutputSchema,

  tools: ['Write', 'Edit'], // Can edit .ai/PRODUCT.md

  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 5000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export default IterateProductMdAgent;
