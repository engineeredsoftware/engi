/**
 * Deliverable Pipeline - Comprehend Need Agent (Setup compatibility corridor)
 *
 * Retained compatibility agent that comprehends the expressed need,
 * attachments, and implied written-asset expectation, returning a normalized
 * classification used by downstream phases.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { Prompt } from '@bitcode/prompts/prompt';
import { z } from 'zod';
import { DeliverableType } from '../../types/DeliverableType';

// Deliverable prompts (append semantics)
import {
  DP_COMPREHEND_NEED_SYSTEM_PROMPT,
  DP_COMPREHEND_NEED_PLAN_PROMPT,
  DP_COMPREHEND_NEED_TRY_PROMPT,
  DP_COMPREHEND_NEED_REFINE_PROMPT,
  DP_COMPREHEND_NEED_RETRY_PROMPT,
} from '../prompts/deliverable-pipeline-comprehend-task-agent-prompts';

// -------------------- Schemas --------------------

const DeliverableTypeEnum = z.nativeEnum(DeliverableType);

const ComprehendNeedInputSchema = z.object({
  definitionOfDone: z.string().describe('Compatibility carrier for the expressed Bitcode need / acceptance shape'),
  attachments: z.array(z.any()).optional().default([]).describe('User-provided attachments'),
  repository: z.object({
    url: z.string(),
    branch: z.string().optional()
  }).optional(),
});

const ComprehendNeedOutputSchema = z.object({
  // GA-1 minimal final output fields (primary contract)
  dod_analysis: z.string().optional().describe('Compatibility field for concise analysis of the expressed need'),
  comprehended_multimodal_attachments: z.array(z.object({
    name: z.string().optional(),
    comprehension: z.string().optional(),
  })).default([]),
  deliverable_types: z.array(DeliverableTypeEnum).default([]),

  // Back-compat/extended fields for richer UI and downstream agents
  deliverableType: z.union([
    DeliverableTypeEnum,
    z.array(DeliverableTypeEnum).nonempty()
  ]).optional().describe('Compatibility field for written-asset classification inferred from the need and attachments'),
  comprehension: z.object({
    intent: z.string().optional(),
    goals: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    constraints: z.array(z.string()).default([]),
    successCriteria: z.array(z.string()).default([]),
  }).optional(),
  entities: z.object({
    files: z.array(z.string()).default([]),
    concepts: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
  }).optional(),
  attachmentsComprehension: z.array(z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    summary: z.string().optional(),
    metadata: z.record(z.any()).optional()
  })).default([]),
});

// -------------------- Prompts --------------------
/**
 * @doc-comment-developing-promptdevelopment
 * domain: pipeline
 * intent: "Deliverables compatibility corridor – Comprehend Need prompt composition (system/plan/try/refine/retry)"
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
  m.merge(DP_COMPREHEND_NEED_SYSTEM_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();

const planPrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_NEED_PLAN_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();
const tryPrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_NEED_TRY_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();
const refinePrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_NEED_REFINE_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();
const retryPrompt = (() => {
  const m = new Prompt();
  m.merge(DP_COMPREHEND_NEED_RETRY_PROMPT);
  m.require('pipeline').require('phase');
  return m;
})();

// -------------------- Agent --------------------

export const DeliverablePipelineComprehendNeedAgent = factoryAgentWithPTRR<
  z.infer<typeof ComprehendNeedInputSchema>,
  z.infer<typeof ComprehendNeedOutputSchema>
>({
  name: 'deliverable-pipeline-comprehend-need-agent',
  description: 'Comprehend the expressed need and infer compatible written-asset kinds',
  outputSchema: ComprehendNeedOutputSchema as z.ZodType<z.infer<typeof ComprehendNeedOutputSchema>>,

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

// Wrapper export that stores classification into execution state
export async function runComprehendNeedAgent(input: any, execution: any) {
  const out = await DeliverablePipelineComprehendNeedAgent(input, execution);
  try {
    const types = Array.isArray(out?.deliverable_types)
      ? out?.deliverable_types
      : (Array.isArray(out?.deliverableType) ? out?.deliverableType : (out?.deliverableType ? [out?.deliverableType] : []));
    if (types && types.length) {
      execution.store('setup', 'deliverableType', types);
      execution.store('setup', 'writtenAssetType', types);
      execution.store('setup/deliverable-type', 'type', types);
      execution.store('setup/written-asset-type', 'type', types);
    }

    if (out?.dod_analysis) execution.store('setup/dod', 'analysis', out.dod_analysis);
    if (out?.comprehension) {
      execution.store('setup/dod', 'comprehension', out.comprehension);
      execution.store('setup/task', 'comprehension', out.comprehension);
      execution.store('setup/need', 'comprehension', out.comprehension);
    }
    if (out?.entities) {
      execution.store('setup/task', 'entities', out.entities);
      execution.store('setup/need', 'entities', out.entities);
    }
    if (out?.attachmentsComprehension) execution.store('setup/dod', 'attachmentsComprehension', out.attachmentsComprehension);
    if (out?.comprehended_multimodal_attachments)
      execution.store('setup/dod', 'attachmentsComprehension', out.comprehended_multimodal_attachments);
  } catch {}
  return out;
}

export const DeliverablePipelineComprehendDoDAgent = DeliverablePipelineComprehendNeedAgent;
export default runComprehendNeedAgent;
