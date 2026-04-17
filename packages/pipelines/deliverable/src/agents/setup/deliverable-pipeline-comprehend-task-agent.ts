/**
 * Deliverable Pipeline - Comprehend DoD Agent (Setup)
 *
 * deliverable-specific agent that comprehends the definition of done (DoD),
 * attachments, and determines the deliverable type, returning a normalized
 * classification used by downstream phases.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts';
import { z } from 'zod';
import { DeliverableType } from '../../types/DeliverableType';

// Deliverable prompts (append semantics)
import {
  DP_COMPREHEND_TASK_SYSTEM_PROMPT,
  DP_COMPREHEND_TASK_PLAN_PROMPT,
  DP_COMPREHEND_TASK_TRY_PROMPT,
  DP_COMPREHEND_TASK_REFINE_PROMPT,
  DP_COMPREHEND_TASK_RETRY_PROMPT,
} from '../prompts/deliverable-pipeline-comprehend-task-agent-prompts';

// -------------------- Schemas --------------------

const DeliverableTypeEnum = z.nativeEnum(DeliverableType);

const ComprehendDoDInputSchema = z.object({
  definitionOfDone: z.string().describe('User definition of done'),
  attachments: z.array(z.any()).optional().default([]).describe('User-provided attachments'),
  repository: z.object({
    url: z.string(),
    branch: z.string().optional()
  }).optional(),
});

const ComprehendDoDOutputSchema = z.object({
  // GA-1 minimal final output fields (primary contract)
  dod_analysis: z.string().optional().describe('Concise analysis of the DoD'),
  comprehended_multimodal_attachments: z.array(z.object({
    name: z.string().optional(),
    comprehension: z.string().optional(),
  })).optional().default([]),
  deliverable_types: z.array(DeliverableTypeEnum).optional().default([]),

  // Back-compat/extended fields for richer UI and downstream agents
  deliverableType: z.union([
    DeliverableTypeEnum,
    z.array(DeliverableTypeEnum).nonempty()
  ]).optional().describe('Classification inferred from DoD and attachments (single or multiple)'),
  comprehension: z.object({
    intent: z.string().optional(),
    goals: z.array(z.string()).optional().default([]),
    requirements: z.array(z.string()).optional().default([]),
    constraints: z.array(z.string()).optional().default([]),
    successCriteria: z.array(z.string()).optional().default([]),
  }).optional(),
  entities: z.object({
    files: z.array(z.string()).optional().default([]),
    concepts: z.array(z.string()).optional().default([]),
    technologies: z.array(z.string()).optional().default([]),
  }).optional(),
  attachmentsComprehension: z.array(z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    summary: z.string().optional(),
    metadata: z.record(z.any()).optional()
  })).optional().default([]),
});

// -------------------- Prompts --------------------
/**
 * @doc-comment-developing-promptdevelopment
 * domain: pipeline
 * intent: "Deliverables – Comprehend Task agent prompts composition (system/plan/try/refine/retry)"
 * current_version: "GA1.50.0"
 * dependencies: { }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

// No generic base to merge; use deliverables overlays directly
const systemPrompt: Prompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_TASK_SYSTEM_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();

const planPrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_TASK_PLAN_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();
const tryPrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_TASK_TRY_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();
const refinePrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_TASK_REFINE_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();
const retryPrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_TASK_RETRY_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();

// -------------------- Agent --------------------

export const DeliverablePipelineComprehendDoDAgent = factoryAgentWithPTRR<
  z.infer<typeof ComprehendDoDInputSchema>,
  z.infer<typeof ComprehendDoDOutputSchema>
>({
  name: 'deliverable-pipeline-comprehend-dod-agent',
  description: 'Comprehend definition of done (DoD) and select deliverable type',
  outputSchema: ComprehendDoDOutputSchema,

  prompt: systemPrompt,
  stepPrompts: {
    plan: () => planPrompt,
    try: () => tryPrompt,
    refine: () => refinePrompt,
    retry: () => retryPrompt
  },

  // Use deliverable wrapper tools for multimodal comprehension (images, pdf, audio, video)
  tools: [
    'deliverable-pipeline-multimodal-processing-tool',
    'deliverable-pipeline-image-comprehension-tool',
    'deliverable-pipeline-pdf-comprehension-tool',
    'deliverable-pipeline-audio-comprehension-tool',
    'deliverable-pipeline-video-comprehension-tool'
  ],

  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 2500 },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

// Wrapper default export that stores classification into execution state
export default async function runComprehendDoDAgent(input: any, execution: any) {
  const out = await DeliverablePipelineComprehendDoDAgent(input, execution);
  try {
    const types = Array.isArray(out?.deliverable_types)
      ? out?.deliverable_types
      : (Array.isArray(out?.deliverableType) ? out?.deliverableType : (out?.deliverableType ? [out?.deliverableType] : []));
    if (types && types.length) execution.store('setup', 'deliverableType', types);

    if (out?.dod_analysis) execution.store('setup/dod', 'analysis', out.dod_analysis);
    if (out?.comprehension) execution.store('setup/dod', 'comprehension', out.comprehension);
    if (out?.attachmentsComprehension) execution.store('setup/dod', 'attachmentsComprehension', out.attachmentsComprehension);
    if (out?.comprehended_multimodal_attachments)
      execution.store('setup/dod', 'attachmentsComprehension', out.comprehended_multimodal_attachments);
  } catch {}
  return out;
}
