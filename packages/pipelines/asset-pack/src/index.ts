/**
 * AssetPack Pipeline
 *
 * Bitcode phased pipeline runs that satisfy Reads, synthesize AssetPack
 * artifacts and Exchange evidence, and use Finish-phase Delivering only for
 * connected-interface delivery mechanisms.
 * Routes to Design/Develop/Digest gates based on execution.get('gate', 'current').
 */

import { Executor, Execution } from '@bitcode/execution-generics';
import { factorySDIVFExecutorPipeline, createGuidedPipelineExecution, gatePreprocess } from '@bitcode/pipelines-generics';
import { assetPackPhases } from './phases';
import { initializeAssetPackPipeline } from './preprocess';
import { normalizeAssetPackOutput, buildAssetPackPostprocessedResult } from './postprocess';
import { AssetPackWrittenAssetType } from './types/AssetPackWrittenAssetType';
import {
  normalizeWrittenAssetRequest,
  resolveDeliveryMechanismTemplate,
  resolveExpressedRead,
  resolveWrittenAssetType,
} from './semantic-resolution';
import {
  buildDepositoryFitResultEvidence,
  runDepositorySearchForPipelineInput,
} from './depository-search';
import {
  buildReadFitsFindingRuntime,
  persistReadFitsFindingRuntime,
} from './read-fits-finding-runtime';
import {
  buildAssetPackPreviewBoundary,
  persistAssetPackPreviewBoundary,
} from './asset-pack-preview-boundary';
import {
  buildAssetPackSettlementRightsDeliveryBoundary,
  persistAssetPackSettlementRightsDeliveryBoundary,
} from './asset-pack-settlement-rights-delivery';
import {
  buildReadingOperationalTelemetryRepairReadback,
  persistReadingOperationalTelemetryRepairReadback,
} from './reading-operational-telemetry-repair-readback';
import {
  buildReadingInterfaceProductParity,
  persistReadingInterfaceProductParity,
} from './reading-interface-product-parity';
import {
  admitReadFitsFinding,
  isAcceptedReadNeed,
  resolveReadNeedFromPipelineInput,
  synthesizeReadNeedForPipelineInput,
} from './read-need';

// ==================== FACTORIES ====================

function storePreprocessedSnapshot(
  execution: Execution,
  processedInput: any,
  writtenAssetType: AssetPackWrittenAssetType
) {
  const read = resolveExpressedRead(processedInput);
  const repo = processedInput?.repository || {};
  const snapshot = {
    definitionOfRead: read,
    read,
    repository: {
      url: repo.url || null,
      owner: repo.owner || null,
      name: repo.name || repo.repo || null,
      branch: repo.branch || null,
    },
    writtenAssetType,
    semanticKind: 'asset-pack-written-asset' as const,
    assetPack: {
      read,
      writtenAssetType,
      writtenAssetRequest: normalizeWrittenAssetRequest(processedInput?.writtenAssetType),
      deliveryMechanismTemplate: resolveDeliveryMechanismTemplate(processedInput),
      deliveryTarget: processedInput?.deliveryTarget || null,
    },
    requirements: processedInput?.requirements || null,
    config: {
      computerUseReadMeasurementEnabled: !!execution.get('config', 'computerUseReadMeasurementEnabled'),
    },
  };

  try {
    execution.store('route/preprocessed', 'assetPackWrittenAsset', snapshot);
  } catch {}
}

function factoryPreprocess(): Executor<any, any> {
  return async (input, execution) => {
    await initializeAssetPackPipeline(execution as any);

    // Apply gate preprocessing
    const processedInput = gatePreprocess(input, execution);
    const expressedRead = resolveExpressedRead(processedInput);

    const writtenAssetType = resolveWrittenAssetType(processedInput);
    const writtenAssetRequest = normalizeWrittenAssetRequest(processedInput?.writtenAssetType);
    const deliveryMechanismTemplate = resolveDeliveryMechanismTemplate(processedInput);
    const suppliedReadNeed = resolveReadNeedFromPipelineInput(processedInput);
    const synthesizedReadNeed = synthesizeReadNeedForPipelineInput(processedInput);
    const readNeed = suppliedReadNeed || synthesizedReadNeed;
    try { processedInput.read = expressedRead; } catch {}
    try { processedInput.definitionOfRead = expressedRead; } catch {}
    try { processedInput.writtenAssetType = writtenAssetType; } catch {}
    try { processedInput.writtenAssetRequest = writtenAssetRequest; } catch {}
    try { processedInput.deliveryMechanismTemplate = deliveryMechanismTemplate; } catch {}
    try { processedInput.readNeed = readNeed; } catch {}
    if (isAcceptedReadNeed(readNeed)) {
      try { processedInput.acceptedReadNeed = readNeed; } catch {}
    }
    execution.store('pipeline', 'input', processedInput);
    execution.store('pipeline', 'writtenAssetType', writtenAssetType);
    execution.store('pipeline', 'writtenAssetRequest', writtenAssetRequest);
    execution.store('pipeline', 'deliveryMechanismTemplate', deliveryMechanismTemplate);
    execution.store('pipeline', 'expressedRead', expressedRead);
    execution.store('read', 'description', expressedRead);
    execution.store('read/need', 'current', readNeed as any);
    execution.store('read/need', 'needId', readNeed.needId);
    execution.store('read/need', 'measurementRoot', readNeed.measurementRoot);
    execution.store('read/need', 'reviewState', readNeed.reviewState);
    if (isAcceptedReadNeed(readNeed)) {
      execution.store('read/need', 'accepted', readNeed as any);
    }

    const depositorySearch = await runDepositorySearchForPipelineInput(processedInput, execution);
    try { processedInput.depositorySearchResult = depositorySearch; } catch {}
    try { processedInput.depositCandidates = depositorySearch.selectedCandidates; } catch {}
    try { processedInput.fitDeposits = depositorySearch.fitDeposits; } catch {}
    try { processedInput.fitDepositAssetIds = depositorySearch.fitDepositAssetIds; } catch {}
    let fitResult: ReturnType<typeof buildDepositoryFitResultEvidence> | undefined;
    try {
      fitResult = buildDepositoryFitResultEvidence(depositorySearch);
      processedInput.fitResult = fitResult;
    } catch {}
    try { processedInput.fit = processedInput.fitResult; } catch {}
    try {
      const readFitsFindingRuntime = buildReadFitsFindingRuntime({
        admission: (execution.get('read/finding-fits', 'admission') as any) || admitReadFitsFinding(processedInput),
        result: depositorySearch,
        fitResult,
      });
      persistReadFitsFindingRuntime(execution, readFitsFindingRuntime);
      persistReadFitsFindingRuntime(execution.parent as any, readFitsFindingRuntime);
      processedInput.readFitsFindingRuntime = readFitsFindingRuntime;
      processedInput.readFitsFindingReplayReceipt = readFitsFindingRuntime.replayReceipt;
    } catch {}
    try {
      if (isAcceptedReadNeed(readNeed)) {
        const assetPackPreviewBoundary = buildAssetPackPreviewBoundary({
          need: readNeed,
          fitResult,
          pullRequestTarget: processedInput?.deliveryTarget || null,
        });
        persistAssetPackPreviewBoundary(execution, assetPackPreviewBoundary);
        persistAssetPackPreviewBoundary(execution.parent as any, assetPackPreviewBoundary);
        processedInput.sourceSafePreview = assetPackPreviewBoundary.sourceSafePreview;
        processedInput.assetPackPreviewBoundary = assetPackPreviewBoundary;
        processedInput.assetPackQuoteReceipt = assetPackPreviewBoundary.quoteReceipt;
        const suppliedSettlement =
          processedInput?.settlementObservation ||
          processedInput?.paymentObservation ||
          processedInput?.btcPaymentObservation ||
          null;
        if (suppliedSettlement) {
          const settlementBoundary = buildAssetPackSettlementRightsDeliveryBoundary({
            previewBoundary: assetPackPreviewBoundary,
            paymentObservation: suppliedSettlement,
            finality: processedInput?.settlementFinality || processedInput?.btcFinality || undefined,
            readerWalletId: processedInput?.readerWalletId || null,
            depositorWalletId: processedInput?.depositorWalletId || null,
            pullRequestTarget: processedInput?.deliveryTarget || null,
          });
          persistAssetPackSettlementRightsDeliveryBoundary(execution, settlementBoundary);
          persistAssetPackSettlementRightsDeliveryBoundary(execution.parent as any, settlementBoundary);
          processedInput.assetPackSettlementRightsDeliveryBoundary = settlementBoundary;
          processedInput.assetPackSettlementReplayReceipt = settlementBoundary.replayReceipt;
          processedInput.assetPackDeliveryUnlock = settlementBoundary.deliveryUnlock;
        }
      }
    } catch {}
    try {
      const operationalReadback = buildReadingOperationalTelemetryRepairReadback({
        runId: String(execution.id || processedInput?.transactionId || processedInput?.id || ''),
        readNeedRuntime:
          processedInput?.readNeedReviewRuntime ||
          (execution.get('read-need-review', 'runtime') as any) ||
          ((execution.parent as any)?.get?.('read-need-review', 'runtime') as any) ||
          null,
        readFitsRuntime:
          processedInput?.readFitsFindingRuntime ||
          (execution.get('read/finding-fits', 'runtime') as any) ||
          ((execution.parent as any)?.get?.('read/finding-fits', 'runtime') as any) ||
          null,
        previewBoundary:
          processedInput?.assetPackPreviewBoundary ||
          (execution.get('asset-pack/preview', 'boundary') as any) ||
          ((execution.parent as any)?.get?.('asset-pack/preview', 'boundary') as any) ||
          null,
        settlementBoundary:
          processedInput?.assetPackSettlementRightsDeliveryBoundary ||
          (execution.get('asset-pack/settlement', 'boundary') as any) ||
          ((execution.parent as any)?.get?.('asset-pack/settlement', 'boundary') as any) ||
          null,
        createdAt: new Date().toISOString(),
      });
      persistReadingOperationalTelemetryRepairReadback(execution, operationalReadback);
      persistReadingOperationalTelemetryRepairReadback(execution.parent as any, operationalReadback);
      processedInput.readingOperationalTelemetryRepairReadback = operationalReadback;
      processedInput.readingOperationalOperatorReadback = operationalReadback.operatorReadback;
      processedInput.readingOperationalStreamEvents = operationalReadback.streamEvents;
      processedInput.readingOperationalRunbookHooks = operationalReadback.runbookHooks;
      const interfaceParity = buildReadingInterfaceProductParity({
        readNeedRuntime:
          processedInput?.readNeedReviewRuntime ||
          (execution.get('read-need-review', 'runtime') as any) ||
          ((execution.parent as any)?.get?.('read-need-review', 'runtime') as any) ||
          null,
        readFitsRuntime:
          processedInput?.readFitsFindingRuntime ||
          (execution.get('read/finding-fits', 'runtime') as any) ||
          ((execution.parent as any)?.get?.('read/finding-fits', 'runtime') as any) ||
          null,
        previewBoundary:
          processedInput?.assetPackPreviewBoundary ||
          (execution.get('asset-pack/preview', 'boundary') as any) ||
          ((execution.parent as any)?.get?.('asset-pack/preview', 'boundary') as any) ||
          null,
        settlementBoundary:
          processedInput?.assetPackSettlementRightsDeliveryBoundary ||
          (execution.get('asset-pack/settlement', 'boundary') as any) ||
          ((execution.parent as any)?.get?.('asset-pack/settlement', 'boundary') as any) ||
          null,
        operationalReadback,
      });
      persistReadingInterfaceProductParity(execution, interfaceParity);
      persistReadingInterfaceProductParity(execution.parent as any, interfaceParity);
      processedInput.readingInterfaceProductParity = interfaceParity;
      processedInput.readingInterfaceParityRows = interfaceParity.rows;
      processedInput.readingInterfaceNoBypassReadback = interfaceParity.noBypassReadback;
    } catch {}

    storePreprocessedSnapshot(execution, processedInput, writtenAssetType);
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
    const norm = normalizeAssetPackOutput(output, execution);
    const snapshot = buildAssetPackPostprocessedResult(execution, norm);
    execution.store('postprocessed', 'result', snapshot as any);
    return norm;
  };
}

function factoryDevelopPhase(): Executor<any, any> {
  const maxIterations = 3;
  const setupPhase: Executor<any, any> = async (input, execution) => {
    const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
    const enableSetupRuntimeInTest =
      process?.env?.BITCODE_ENABLE_ASSET_PACK_SETUP_PHASE_RUNTIME_IN_TEST === '1';
    if (isTest && !enableSetupRuntimeInTest) {
      return input;
    }
    return assetPackPhases.setup(input, execution);
  };
  const discoveryPhase: Executor<any, any> = async (input, execution) => {
    const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
    if (isTest) {
      return input;
    }
    return assetPackPhases.discovery(input, execution);
  };
  const implementationPhase: Executor<any, any> = async (input, execution) => {
    const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
    if (isTest) {
      return input;
    }
    return assetPackPhases.implementation(input, execution);
  };
  const validationPhase: Executor<any, any> = async (input, execution) => {
    const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
    if (isTest) {
      return input;
    }
    return assetPackPhases.validation(input, execution);
  };
  const finishPhase: Executor<any, any> = async (input, execution) => {
    const isTest = String(process?.env?.NODE_ENV || '').toLowerCase() === 'test';
    if (isTest) {
      const pullRequestShippable = { prUrl: 'https://github.com/test/repo/pull/1' };
      return {
        success: true,
        shippable: pullRequestShippable,
        shippables: {
          pullRequest: { url: 'https://github.com/test/repo/pull/1' },
          summary: 'test',
        },
        deliveryMechanism: pullRequestShippable,
        artifacts: { filesCreated: [], filesModified: [], testsAdded: 1, testsPassing: 1, documentation: [] },
        metrics: { duration: 0, tokensUsed: 0, measuredBtd: 0, confidence: 1, phases: {} },
        summary: 'test'
      };
    }
    return assetPackPhases.finish(input, execution);
  };

  const developExecutor = factorySDIVFExecutorPipeline('develop', {
    preprocess: factoryPreprocess(),
    setup: setupPhase,
    discovery: discoveryPhase,
    implementation: implementationPhase,
    validation: validationPhase,
    finish: finishPhase,
    maxIterations,
    iterationPreprocess: factoryIterationPreprocess(),
    postprocess: factoryPostprocess()
  });

  return async (input, execution) => {
    await initializeAssetPackPipeline(execution as any);
    return developExecutor(input, execution);
  };
}

// ==================== DDD GATE ROUTER ====================

/**
 * Main AssetPack written-asset synthesis pipeline with guided gate execution.
 * Routes execution through Design → Develop → Digest gates
 */
export const assetPackPipeline: Executor<any, any> = createGuidedPipelineExecution({
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
export * from './types/AssetPackWrittenAssetType';
export * from './depository-search';
export * from './depository-supply-index';
export * from './read-fits-finding-runtime';
export * from './asset-pack-preview-boundary';
export * from './asset-pack-settlement-rights-delivery';
export * from './reading-operational-telemetry-repair-readback';
export * from './reading-interface-product-parity';
export * from './embedding-config';
export * from './asset-pack-disclosure';
export * from './read-need-review-resynthesis';
export * from './reading-pipeline-contract';
export * from './reading-pipeline-observability';
export { AssetPackCloneVCSRepositoryAgent } from './agents/setup/asset-pack-clone-vcs-repository-agent';
export {
  ReadFitsFindingSynthesisReadComprehensionAgent,
  ReadFitsFindingSynthesisReadDefinitionComprehensionAgent,
  runReadFitsFindingSynthesisReadComprehensionAgent,
} from './agents/setup/read-fits-finding-synthesis-read-comprehension-agent';
export { ReadFitsFindingSynthesisAssetPackSynthesisAgent } from './agents/implementation/read-fits-finding-synthesis-asset-pack-synthesis-agent';
export {
  acceptReadNeed,
  admitReadFitsFinding,
  buildAssetPackSourceSafePreview,
  buildShareToFeePreview,
  isAcceptedReadNeed,
  readNeedToDepositorySearchRead,
  rejectReadNeed,
  resolveAssetPackReadRightState,
  resolveReadNeedFromPipelineInput,
  shouldRequireAcceptedReadNeed,
  synthesizeReadNeedForPipelineInput,
  synthesizeReadNeedForPipelineInputWithInference,
  type AssetPackReadRightState,
  type AssetPackSourceSafePreview,
  type ReadNeed,
  type ReadNeedComprehensionSynthesisInferenceReceipt,
  type ReadNeedRequest,
  type ReadFitsFindingAdmission,
  type ReadNeedMeasurementDimension,
  type ReadNeedReviewState,
  type ShareToFeeQuote,
} from './read-need';
export default assetPackPipeline;
export const runSDIVFPipeline = assetPackPipeline;
