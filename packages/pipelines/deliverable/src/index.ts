/**
 * Deliverable Pipeline
 *
 * DDD gate router using Guided Pipeline Execution.
 * Routes to Design/Develop/Digest gates based on execution.get('gate', 'current').
 */

import { Executor, Execution } from '@bitcode/execution-generics';
import { factorySDIVSExecutorPipeline, createGuidedPipelineExecution, gatePreprocess } from '@bitcode/pipelines-generics';
import { deliverablePhases } from './phases';
import { initializeDeliverablePipeline } from './preprocess';
import { normalizeDeliverableOutput, buildDeliverablePostprocessedResult } from './postprocess';
import { DeliverableType } from './types/DeliverableType';

// ==================== FACTORIES ====================

const DEFAULT_DELIVERABLE_TYPE = DeliverableType.CodeChange;

function inferDeliverableType(input: any): DeliverableType {
  const candidate =
    input?.deliverableType ||
    input?.deliverable?.type ||
    input?.type ||
    input?.classification;
  if (typeof candidate === 'string') {
    const normalized = candidate.toLowerCase();
    if (normalized.includes('review')) {
      return normalized.includes('design')
        ? DeliverableType.DesignDocumentReview
        : DeliverableType.CodeChangeReview;
    }
    if (normalized.includes('design')) {
      return DeliverableType.DesignDocument;
    }
    if (normalized.includes('code')) {
      return DeliverableType.CodeChange;
    }
  }
  return DEFAULT_DELIVERABLE_TYPE;
}

function storePreprocessedSnapshot(execution: Execution, processedInput: any, deliverableType: DeliverableType) {
  const definitionOfDone =
    processedInput?.definitionOfDone ||
    processedInput?.task ||
    '';
  const repo = processedInput?.repository || {};
  const snapshot = {
    definitionOfDone,
    repository: {
      url: repo.url || null,
      owner: repo.owner || null,
      name: repo.name || repo.repo || null,
      branch: repo.branch || null,
    },
    deliverableType,
    requirements: processedInput?.requirements || null,
    config: {
      computeEnabled: !!execution.get('config', 'computeEnabled'),
      multiAgentEnabled: !!execution.get('config', 'multiAgentEnabled'),
    },
  };

  try {
    execution.store('route/preprocessed', 'deliverables', snapshot);
  } catch {}
}

function factoryPreprocess(): Executor<any, any> {
  return async (input, execution) => {
    await initializeDeliverablePipeline(execution as any);

    // Apply gate preprocessing
    const processedInput = gatePreprocess(input, execution);

    const deliverableType = inferDeliverableType(processedInput);
    try { processedInput.deliverableType = deliverableType; } catch {}
    execution.store('pipeline', 'input', processedInput);
    execution.store('pipeline', 'deliverableType', deliverableType);
    storePreprocessedSnapshot(execution, processedInput, deliverableType);
    return processedInput;
  };
}

function factoryIterationPreprocess(): Executor<any, any> {
  return async (input, execution) => {
    // Apply gate preprocessing for each iteration
    const processedInput = gatePreprocess(input, execution);

    // Fetch latest instructions
    const { supabaseAdmin } = await import('@bitcode/supabase');
    const { data: instructions } = await supabaseAdmin
      .from('instructions')
      .select('*')
      .eq('execution_id', execution.id)
      .order('created_at', { ascending: true });

    if (instructions?.length) {
      const normalizedInstructions = instructions.map((i: any) => ({
        id: i.id,
        createdAt: i.created_at,
        content: i.content,
      }));
      execution.store('instructions', 'list', normalizedInstructions);
      input.userInstructions = normalizedInstructions.map((i: any) => {
        try { return JSON.parse(i.content); } catch { return { text: i.content }; }
      });
    }

    // Process attachments
    const attachments = execution.get('attachments', 'list') || [];
    if (Array.isArray(attachments) && attachments.length > 0) {
      const enhancements = attachments.map((a: any) => ({
        title: a?.title || a?.name || 'Context',
        content: String(a?.content || a?.output || '')
      })).filter(e => e.content);

      execution.store('context', 'enhancements', enhancements);
    }

    const iter = Number(execution.get('pipeline', 'currentIteration') || 0);
    execution.store('pipeline', `iteration:${iter}`, {
      preprocessedAt: new Date().toISOString(),
      attachmentCount: Array.isArray(attachments) ? attachments.length : 0,
      instructionCount: Array.isArray(input.userInstructions) ? input.userInstructions.length : 0,
    });

    return input;
  };
}

function factoryPostprocess(): Executor<any, any> {
  return async (output, execution) => {
    const norm = normalizeDeliverableOutput(output, execution);
    const snapshot = buildDeliverablePostprocessedResult(execution, norm);
    execution.store('postprocessed', 'result', snapshot as any);
    return output;
  };
}

function factoryDevelopPhase(): Executor<any, any> {
  const maxIterations = 3;
  const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';

  return factorySDIVSExecutorPipeline('develop', {
    preprocess: factoryPreprocess(),
    setup: isTest ? (async x => x) : deliverablePhases.setup,
    discovery: isTest ? (async x => x) : deliverablePhases.discovery,
    implementation: isTest ? (async x => x) : deliverablePhases.implementation,
    validation: isTest ? (async x => x) : deliverablePhases.validation,
    shipping: isTest ? (async () => ({
      success: true,
      deliverable: { prUrl: 'https://github.com/test/repo/pull/1' },
      artifacts: { filesCreated: [], filesModified: [], testsAdded: 1, testsPassing: 1, documentation: [] },
      metrics: { duration: 0, tokensUsed: 0, creditsUsed: 0, confidence: 1, phases: {} },
      summary: 'test'
    })) : deliverablePhases.shipping,
    maxIterations,
    iterationPreprocess: factoryIterationPreprocess(),
    postprocess: factoryPostprocess()
  });
}

// ==================== DDD GATE ROUTER ====================

/**
 * Main deliverable pipeline with Guided gate execution
 * Routes execution through Design → Develop → Digest gates
 */
export const deliverablePipeline: Executor<any, any> = createGuidedPipelineExecution({
  Design: async (input, execution) => {
    const { designPhase } = await import('./phases/design');
    return designPhase(input, execution);
  },
  Develop: factoryDevelopPhase(),
  Digest: async (input, execution) => {
    const { digestPhase } = await import('./phases/digest');
    return digestPhase(input, execution);
  }
});

// ==================== EXPORTS ====================

export * from './phases';
export * from './types/DeliverableType';
export default deliverablePipeline;
export const runSDIVSPipeline = deliverablePipeline;
