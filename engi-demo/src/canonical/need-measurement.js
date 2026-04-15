// @ts-check

/**
 * @typedef {import('./type-contracts.js').BuiltPromptSurface} BuiltPromptSurface
 * @typedef {import('./type-contracts.js').PromptContractShape} PromptContractShape
 * @typedef {import('./type-contracts.js').ParsedCompletionEnvelope} ParsedCompletionEnvelope
 * @typedef {import('./type-contracts.js').BuiltRealizationProfile} BuiltRealizationProfile
 *
 * @typedef {{
 *   runId?: string | undefined,
 *   workflowPath?: string | undefined,
 *   artifacts?: Array<{ mediaType?: string | undefined }> | undefined
 * }} CanonicalRunEvidence
 *
 * @typedef {{
 *   scenarioId: string,
 *   repo: string,
 *   installationId?: string | number | null | undefined,
 *   baseRef: string,
 *   targetRef?: string | undefined,
 *   prNumber?: number | null | undefined,
 *   realizationProfileId?: string | undefined,
 *   scenarioFamily?: string | undefined,
 *   benchmarkHarnessPath: string,
 *   benchmarkWorkflowPath?: string | undefined,
 *   benchmarkRunId: string,
 *   benchmarkRunUrl?: string | undefined,
 *   canonicalRunEvidence?: CanonicalRunEvidence | null | undefined,
 *   humanPrompt?: string | undefined,
 *   task?: string | undefined,
 *   expectedTask?: string | undefined,
 *   failureModes?: string[] | undefined,
 *   expectedFailureModes?: string[] | undefined,
 *   constraints?: string[] | undefined,
 *   expectedConstraints?: string[] | undefined,
 *   targetArtifactKinds?: string[] | undefined,
 *   expectedTargetArtifactKinds?: string[] | undefined,
 *   closureCriteria?: string[] | undefined,
 *   expectedClosureCriteria?: string[] | undefined
 * }} NeedMeasurementScenario
 *
 * @typedef {{
 *   artifactNames: string[]
 * }} ConsumedInputs
 *
 * @typedef {{
 *   consumedInputs: ConsumedInputs,
 *   failingCases: string[],
 *   weakDimensions: string[],
 *   baselineMetrics: Record<string, unknown>,
 *   touchedPaths: string[],
 *   symbols: string[],
 *   configKeys: string[]
 * }} CanonicalBenchmarkOutputs
 *
 * @typedef {{
 *   ok: boolean,
 *   reasons: string[]
 * }} ParserValidation
 *
 * @typedef {{ receiptId: string }} StaticExecutionReceipt
 * @typedef {{ field?: string | undefined, source?: string | undefined, notes?: string | undefined, evidenceRefs?: string[] | undefined }} DerivationRecord
 *
 * @typedef {{
 *   touchedPaths: string[],
 *   stackHints: string[],
 *   extractedSymbols: string[],
 *   configKeys: string[],
 *   staticExecutionReceipts: StaticExecutionReceipt[]
 * }} RepoCodeAnalysis
 *
 * @typedef {{
 *   conformanceProfile: string,
 *   checkedPromptCount: number,
 *   allContractsComplete: boolean,
 *   promptChecks: Array<Record<string, unknown>>,
 *   proofHash: string
 * }} PromptCompletenessProofShape
 *
 * @typedef {{
 *   conformanceProfile: string,
 *   envelopeCount: number,
 *   promptIds: string[],
 *   allContractsResolved: boolean,
 *   allPayloadsAdmissible: boolean,
 *   executionModes: string[],
 *   envelopes: ParsedCompletionEnvelope[],
 *   artifactHash: string
 * }} ParsedCompletionEnvelopeArtifactShape
 *
 * @typedef {{
 *   harnessPath: string,
 *   runId: string,
 *   failingCases: string[],
 *   weakDimensions: string[],
 *   baselineMetrics: Record<string, unknown>
 * }} BenchmarkTargetShape
 *
 * @typedef {{
 *   parserKind: string,
 *   parserVersion: string,
 *   acceptedArtifactMediaTypes: string[],
 *   parserFailureContract: {
 *     failClosed: boolean,
 *     onMissingCanonicalOutputs: string,
 *     onMalformedOutputs: string
 *   },
 *   consumedInputs: ConsumedInputs
 * }} BenchmarkParserContractShape
 *
 * @typedef {{
 *   needId: string,
 *   repo: string,
 *   installationId?: string | number | null | undefined,
 *   baseRef: string,
 *   targetRef?: string | undefined,
 *   prNumber?: number | null | undefined,
 *   benchmarkHarnessPath: string,
 *   benchmarkWorkflowPath?: string | undefined,
 *   benchmarkRunId: string,
 *   benchmarkRunUrl?: string | undefined,
 *   canonicalRunEvidence?: CanonicalRunEvidence | null | undefined,
 *   benchmarkParserContract: BenchmarkParserContractShape,
 *   canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs,
 *   task: string,
 *   failureModes: string[],
 *   constraints: string[],
 *   targetArtifactKinds: string[],
 *   closureCriteria: string[],
 *   stackHints: string[],
 *   touchedPaths: string[],
 *   extractedSymbols: string[],
 *   configKeys: string[],
 *   failingCases: string[],
 *   weakDimensions: string[],
 *   baselineMetrics: Record<string, unknown>,
 *   humanPrompt?: string | undefined,
 *   conformanceProfile: string,
 *   productionIntentProfile: string,
 *   realizationProfile: BuiltRealizationProfile,
 *   fieldDerivations: {
 *     task: DerivationRecord,
 *     failureModes: DerivationRecord,
 *     constraints: DerivationRecord,
 *     targetArtifactKinds: DerivationRecord,
 *     closureCriteria: DerivationRecord,
 *     stackHints: DerivationRecord,
 *     touchedPaths: DerivationRecord,
 *     extractedSymbols: DerivationRecord,
 *     configKeys: DerivationRecord,
 *     failingCases: DerivationRecord,
 *     weakDimensions: DerivationRecord,
 *     baselineMetrics: DerivationRecord
 *   },
 *   measurementProvenance: Array<Record<string, unknown>>,
 *   measurementClassInventory: {
 *     staticExecuted: string[],
 *     inferredDerived: string[],
 *     hybridComposed: string[]
 *   },
 *   staticMeasurements: {
 *     touchedPaths: string[],
 *     extractedSymbols: string[],
 *     configKeys: string[],
 *     failingCases: string[],
 *     weakDimensions: string[]
 *   },
 *   inferredMeasurements: {
 *     task: string,
 *     failureModes: string[],
 *     constraints: string[],
 *     targetArtifactKinds: string[],
 *     closureCriteria: string[]
 *   },
 *   recallChannelContracts: Array<Record<string, unknown>>,
 *   promptSurfaces: BuiltPromptSurface[],
 *   promptContracts: PromptContractShape[],
 *   promptFamilyRegistry: Record<string, unknown>,
 *   promptCompletenessProof: PromptCompletenessProofShape,
 *   inferenceSynthesisProof: Record<string, unknown>,
 *   inferenceMomentContracts: Array<Record<string, unknown>>,
 *   parsedCompletionEnvelopes: ParsedCompletionEnvelope[],
 *   parsedCompletionEnvelopeArtifact: ParsedCompletionEnvelopeArtifactShape,
 *   analysisFactLifecycle: Record<string, unknown>,
 *   profileCompositions: ReturnType<typeof buildProfileCompositions>
 * }} NeedDescriptorShape
 *
 * @typedef {{
 *   needDescriptor: NeedDescriptorShape,
 *   benchmarkTarget: BenchmarkTargetShape,
 *   canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs,
 *   benchmarkParserContract: BenchmarkParserContractShape,
 *   parserValidation: ParserValidation,
 *   inferenceProofs: Array<Record<string, unknown>>,
 *   promptSurfaces: BuiltPromptSurface[],
 *   promptContracts: PromptContractShape[],
 *   promptFamilyRegistry: Record<string, unknown>,
 *   promptCompletenessProof: PromptCompletenessProofShape,
 *   inferenceSynthesisProof: Record<string, unknown>,
 *   inferenceMomentContracts: Array<Record<string, unknown>>,
 *   parsedCompletionEnvelopes: ParsedCompletionEnvelope[],
 *   parsedCompletionEnvelopeArtifact: ParsedCompletionEnvelopeArtifactShape,
 *   measurementProvenance: Array<Record<string, unknown>>,
 *   staticExecutionReceipts: StaticExecutionReceipt[]
 * }} NeedMeasurementResult
 */

import {
  buildPromptSurface,
  buildPromptCompletenessProof,
  buildParsedCompletionEnvelope,
  buildParsedCompletionEnvelopeArtifact,
  buildEvaluatorSurface as evaluatorSurface,
  buildInferenceProof as inferenceProof
} from './prompting.js';
import {
  buildTheoremVerdict,
  buildArtifactBinding,
  buildReplayStep,
  allTheoremsPassed as aggregateTheoremVerdicts,
  computeProofClosure
} from './proof-annotations.js';

import { ACTIVE_CANON_VERSION } from '../canon-posture.js';
import { buildProfileCompositions } from '../demo-shell-state.js';
import { buildRealizationProfile } from '../realization-profile.js';

const ACTIVE_PROJECT_LABEL = Number.parseInt(ACTIVE_CANON_VERSION.replace(/^V/i, ''), 10) >= 25 ? 'Bitcode' : 'ENGI';

/**
 * @param {BuiltPromptSurface[]} promptSurfaces
 * @param {string} promptId
 * @returns {BuiltPromptSurface}
 */
function requirePromptSurface(promptSurfaces, promptId) {
  const promptSurface = promptSurfaces.find((surface) => surface.promptId === promptId);
  if (!promptSurface) {
    throw new Error(`${ACTIVE_PROJECT_LABEL} prompt surface missing for ${promptId}.`);
  }
  return promptSurface;
}

/**
 * @param {{
 *   RECALL_CHANNEL_SPECS: Record<string, Record<string, unknown>>,
 *   buildGithubActionsBenchmarkParser: () => {
 *     parserKind: string,
 *     parserVersion: string,
 *     parse: (canonicalRunEvidence: CanonicalRunEvidence | null | undefined) => CanonicalBenchmarkOutputs,
 *     validate: (canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs) => ParserValidation
 *   },
 *   buildStaticExecutionReceipt: (input: Record<string, unknown>) => StaticExecutionReceipt,
 *   buildRepoStaticCodeAnalysis: (scenario: NeedMeasurementScenario, canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs) => RepoCodeAnalysis,
 *   inferNeedTask: (scenario: NeedMeasurementScenario, canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs) => string,
 *   inferFailureModes: (scenario: NeedMeasurementScenario, canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs) => string[],
 *   inferConstraints: (scenario: NeedMeasurementScenario, canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs) => string[],
 *   inferTargetArtifactKinds: (scenario: NeedMeasurementScenario, canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs) => string[],
 *   inferClosureCriteria: (scenario: NeedMeasurementScenario, canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs, targetArtifactKinds: string[]) => string[],
 *   derivationRecord: (input: Record<string, unknown>) => DerivationRecord,
 *   collectStaticExecutionReceipts: (repoCodeAnalysis: RepoCodeAnalysis) => StaticExecutionReceipt[],
 *   summarizeStrings: (values?: readonly unknown[]) => string[],
 *   toSlug: (value: string) => string,
 *   sha256: (value: unknown) => string
 * }} input
 * @returns {{
 *   measurementTrace: (mode: 'inferred' | 'static' | 'hybrid', toolOrPromptId: string, evidenceRefs: string[], options?: Record<string, unknown>) => Record<string, unknown>,
 *   buildRecallChannelContracts: () => Array<Record<string, unknown>>,
 *   measureNeedFromScenario: (scenario: NeedMeasurementScenario) => NeedMeasurementResult,
 *   buildNeedDescriptor: (scenario: NeedMeasurementScenario) => NeedDescriptorShape
 * }}
 */
export function createNeedMeasurementRuntime({
  RECALL_CHANNEL_SPECS,
  buildGithubActionsBenchmarkParser,
  buildStaticExecutionReceipt,
  buildRepoStaticCodeAnalysis,
  inferNeedTask,
  inferFailureModes,
  inferConstraints,
  inferTargetArtifactKinds,
  inferClosureCriteria,
  derivationRecord,
  collectStaticExecutionReceipts,
  summarizeStrings,
  toSlug,
  sha256
}) {
  /**
   * @param {'inferred' | 'static' | 'hybrid'} mode
   * @param {string} toolOrPromptId
   * @param {string[]} evidenceRefs
   * @param {{
   *   measurementClass?: string | undefined,
   *   evaluatorKind?: string | undefined,
   *   receiptRefs?: readonly unknown[] | undefined,
   *   standIn?: boolean | undefined
   * }} [options={}]
   * @returns {Record<string, unknown>}
   */
  function measurementTrace(mode, toolOrPromptId, evidenceRefs, options = {}) {
    const measurementClass = options.measurementClass || (mode === 'inferred' ? 'inferred-measurement' : mode === 'static' ? 'static-analysis' : 'hybrid-evaluation');
    const evaluatorKind = options.evaluatorKind || (mode === 'inferred' ? 'inferred-evaluator' : mode === 'static' ? 'deterministic-static-command' : 'hybrid-pipeline-stage');
    return {
      mode,
      measurementClass,
      evaluatorKind,
      toolOrPromptId,
      version: 'demo-v15.0',
      evidenceRefs,
      receiptRefs: summarizeStrings(options.receiptRefs || []),
      evaluatorSurface: evaluatorSurface({
        evaluatorId: toolOrPromptId,
        evaluatorKind,
        measurementClass,
        mode,
        promptId: mode === 'inferred' ? toolOrPromptId : null,
        toolId: mode !== 'inferred' ? toolOrPromptId : null,
        evidenceRefs,
        standIn: options.standIn ?? (mode !== 'static')
      })
    };
  }

  function buildRecallChannelContracts() {
    return Object.entries(RECALL_CHANNEL_SPECS).map(([channelId, spec]) => ({ channelId, ...spec }));
  }

  /**
   * @param {{
   *   classifiedPromptOwnedFields: string[],
   *   promptSurfaces: BuiltPromptSurface[],
   *   promptContracts: PromptContractShape[],
   *   explicitExclusions?: string[]
   * }} input
   */
  function buildPromptFamilyRegistry({
    classifiedPromptOwnedFields,
    promptSurfaces,
    promptContracts,
    explicitExclusions = []
  }) {
    const promptMembers = classifiedPromptOwnedFields.map((memberId) => {
      const promptSurface = promptSurfaces.find((surface) => (surface.lineage?.outputFields || []).includes(memberId)) || null;
      const promptContract = promptContracts.find((contract) => (contract.outputFields || []).includes(memberId)) || null;
      return {
        memberId,
        promptId: promptSurface?.promptId || promptContract?.promptId || null,
        templateVersion: promptSurface?.templateVersion || promptContract?.templateVersion || null,
        templateHash: promptContract?.templateHash || null,
        parseContractId: promptContract?.parseContractId || null,
        renderedContextFields: promptContract?.renderedContextFields || [],
        nonRenderedContextFields: promptContract?.nonRenderedContextFields || [],
        downstreamArtifacts: promptSurface?.lineage?.downstreamArtifacts || promptContract?.downstreamArtifactBindings || [],
        completenessOk: promptContract?.completeness?.ok === true
      };
    });
    const contextInjectableExpectations = promptSurfaces.flatMap((surface) => surface.contextInputs.map((input) => ({
      promptId: surface.promptId,
      field: input.field,
      renderedInTemplate: !surface.promptContract?.nonRenderedContextFields?.includes(input.field),
      source: input.source,
      evidenceRefs: input.evidenceRefs || [],
      artifactBindings: input.artifactBindings || []
    })));
    return {
      proofFamily: 'prompt-completeness',
      artifactId: 'prompt-family-registry.v16',
      registeredPromptOwnedFields: classifiedPromptOwnedFields,
      explicitExclusions,
      promptMembers,
      promptTemplateContracts: promptContracts.map((contract) => ({
        promptId: contract.promptId,
        templateVersion: contract.templateVersion,
        templateHash: contract.templateHash,
        contextSchemaHash: contract.contextSchemaHash,
        outputSchemaHash: contract.outputSchemaHash,
        parseContractId: contract.parseContractId,
        outputFields: contract.outputFields,
        completenessOk: contract.completeness.ok
      })),
      contextInjectableExpectations,
      registryHash: `sha256:${sha256(JSON.stringify({
        registeredPromptOwnedFields: classifiedPromptOwnedFields,
        promptMembers: promptMembers.map((entry) => ({
          memberId: entry.memberId,
          promptId: entry.promptId,
          parseContractId: entry.parseContractId
        })),
        contextInjectableExpectations: contextInjectableExpectations.map((entry) => ({
          promptId: entry.promptId,
          field: entry.field,
          renderedInTemplate: entry.renderedInTemplate
        }))
      }))}`
    };
  }

  /**
   * @param {BuiltPromptSurface[]} promptSurfaces
   */
  function buildInferenceMomentContracts(promptSurfaces) {
    return promptSurfaces.map((surface) => ({
      momentContractId: `moment_contract_${sha256(surface.promptId).slice(0, 12)}`,
      promptId: surface.promptId,
      evaluatorId: surface.evaluatorSurface?.evaluatorId || surface.promptId,
      evaluatorKind: surface.evaluatorSurface?.evaluatorKind || 'inferred-evaluator',
      modelId: surface.evaluatorSurface?.modelId || null,
      standIn: surface.evaluatorSurface?.standIn === true,
      outputFields: surface.lineage?.outputFields || [],
      contextFields: surface.promptContract?.declaredContextFields || [],
      renderedContextFields: surface.promptContract?.renderedContextFields || [],
      nonRenderedContextFields: surface.promptContract?.nonRenderedContextFields || [],
      evidenceRefs: surface.lineage?.evidenceRefs || [],
      downstreamArtifacts: surface.lineage?.downstreamArtifacts || [],
      parseContractId: surface.promptContract?.parseContractId || null,
      contractHash: `sha256:${sha256(JSON.stringify({
        promptId: surface.promptId,
        outputFields: surface.lineage?.outputFields || [],
        evidenceRefs: surface.lineage?.evidenceRefs || [],
        downstreamArtifacts: surface.lineage?.downstreamArtifacts || [],
        parseContractId: surface.promptContract?.parseContractId || null
      }))}`
    }));
  }

  /**
   * @param {{
   *   classifiedInferredFields: string[],
   *   inferenceProofs: Array<Record<string, unknown>>,
   *   momentContracts: Array<Record<string, unknown>>,
   *   promptSurfaces: BuiltPromptSurface[],
   *   parsedCompletionEnvelopes: ParsedCompletionEnvelope[],
   *   promptImplementationSurface: Record<string, unknown>
   * }} input
   */
  function buildInferenceSynthesisProof({
    classifiedInferredFields,
    inferenceProofs,
    momentContracts,
    promptSurfaces,
    parsedCompletionEnvelopes,
    promptImplementationSurface
  }) {
    const coveredInferredFields = summarizeStrings(inferenceProofs.map((entry) => String(entry['outputField'])));
    const fieldProofByField = new Map(inferenceProofs.map((entry) => [String(entry['outputField']), entry]));
    const momentContractByField = new Map(momentContracts.flatMap((contract) => (((/** @type {any} */ (contract))['outputFields']) || []).map((/** @type {string} */ field) => [field, contract])));
    const promptSurfaceByField = new Map(promptSurfaces.flatMap((surface) => (surface.lineage?.outputFields || []).map((field) => [field, surface])));
    const envelopeByField = new Map(parsedCompletionEnvelopes.flatMap((entry) => (entry.ownedOutputFields || []).map((field) => [field, entry])));
    const memberVerdicts = classifiedInferredFields.map((field) => {
      const fieldProof = fieldProofByField.get(field) || null;
      const momentContract = momentContractByField.get(field) || null;
      const promptSurface = promptSurfaceByField.get(field) || null;
      const envelope = envelopeByField.get(field) || null;
      const fieldEvaluatorSurface = /** @type {any} */ (fieldProof?.['evaluatorSurface'] || null);
      const evaluatorStatusTruthful = !!fieldProof
        && !!momentContract
        && fieldEvaluatorSurface?.standIn === (/** @type {any} */ (momentContract))['standIn']
        && fieldEvaluatorSurface?.standIn === (promptSurface?.evaluatorSurface?.standIn === true);
      const expectedEvidenceRefs = summarizeStrings((/** @type {any} */ (momentContract))?.['evidenceRefs'] || promptSurface?.lineage?.evidenceRefs || []);
      const realizedEvidenceRefs = summarizeStrings((/** @type {any} */ (fieldProof))?.['evidenceRefs'] || []);
      const evidenceBasisClosed = !!fieldProof
        && !!momentContract
        && expectedEvidenceRefs.every((ref) => realizedEvidenceRefs.includes(ref));
      return {
        field,
        fieldProofPresent: !!fieldProof,
        momentContractPresent: !!momentContract,
        promptSurfacePresent: !!promptSurface,
        parsedEnvelopePresent: !!envelope,
        evaluatorStatusTruthful,
        evidenceBasisClosed,
        passed: !!fieldProof && !!momentContract && !!promptSurface && !!envelope && evaluatorStatusTruthful && evidenceBasisClosed
      };
    });
    const witnessArtifactPaths = [
      '.engi/inference-moment-contracts.json',
      '.engi/inference-proofs.json',
      '.engi/prompt-implementation-surface.json',
      '.engi/prompt-surfaces.json',
      '.engi/parsed-completion-envelopes.json',
      '.engi/inference-synthesis-proof.json'
    ];
    const replayArtifacts = [
      '.engi/inference-moment-contracts.json',
      '.engi/inference-proofs.json',
      '.engi/prompt-implementation-surface.json',
      '.engi/prompt-surfaces.json',
      '.engi/parsed-completion-envelopes.json',
      '.engi/eval-manifest.json',
      '.engi/inference-synthesis-proof.json'
    ];
    const replaySteps = [
      buildReplayStep({
        stepId: 'inference-synthesis.coverage-reconciliation',
        theoremIds: ['inference_synthesis.coverage_totality'],
        requiredArtifactPaths: ['.engi/inference-moment-contracts.json', '.engi/inference-proofs.json', '.engi/inference-synthesis-proof.json', '.engi/prompt-surfaces.json'],
        instruction: 'Reconcile classified inferred fields against covered field proofs and prompt surfaces.'
      }),
      buildReplayStep({
        stepId: 'inference-synthesis.evaluator-status-replay',
        theoremIds: ['inference_synthesis.evaluator_status_truth'],
        requiredArtifactPaths: ['.engi/inference-moment-contracts.json', '.engi/inference-proofs.json', '.engi/prompt-surfaces.json', '.engi/eval-manifest.json'],
        instruction: 'Replay evaluator status across field proofs, prompt surfaces, and eval manifest.'
      }),
      buildReplayStep({
        stepId: 'inference-synthesis.evidence-basis-replay',
        theoremIds: ['inference_synthesis.evidence_basis_closure', 'inference_synthesis.ownership_traceability_closure'],
        requiredArtifactPaths: ['.engi/inference-moment-contracts.json', '.engi/inference-proofs.json', '.engi/prompt-surfaces.json', '.engi/parsed-completion-envelopes.json', '.engi/inference-synthesis-proof.json'],
        instruction: 'Reconcile field-proof evidence refs against prompt context and parsed envelopes.'
      })
    ];
    const artifactBindings = [
      buildArtifactBinding({ artifactPath: '.engi/inference-moment-contracts.json', role: 'registry', theoremIds: ['inference_synthesis.coverage_totality', 'inference_synthesis.evaluator_status_truth', 'inference_synthesis.evidence_basis_closure'], requiredForWitness: true, requiredForReplay: true }),
      buildArtifactBinding({ artifactPath: '.engi/inference-proofs.json', role: 'primary-proof', theoremIds: ['inference_synthesis.coverage_totality', 'inference_synthesis.evidence_basis_closure', 'inference_synthesis.ownership_traceability_closure'], requiredForWitness: true, requiredForReplay: true }),
      buildArtifactBinding({ artifactPath: '.engi/prompt-implementation-surface.json', role: 'aggregate-surface', theoremIds: ['inference_synthesis.witness_materialization_closure'], requiredForWitness: true, requiredForReplay: true }),
      buildArtifactBinding({ artifactPath: '.engi/prompt-surfaces.json', role: 'primary-proof', theoremIds: ['inference_synthesis.coverage_totality', 'inference_synthesis.evaluator_status_truth', 'inference_synthesis.ownership_traceability_closure'] }),
      buildArtifactBinding({ artifactPath: '.engi/parsed-completion-envelopes.json', role: 'supporting-proof', theoremIds: ['inference_synthesis.evidence_basis_closure', 'inference_synthesis.replay_closure'] }),
      buildArtifactBinding({ artifactPath: '.engi/eval-manifest.json', role: 'registry', theoremIds: ['inference_synthesis.evaluator_status_truth'], requiredForWitness: false, requiredForReplay: true }),
      buildArtifactBinding({ artifactPath: '.engi/inference-synthesis-proof.json', role: 'primary-proof', theoremIds: ['inference_synthesis.witness_materialization_closure', 'inference_synthesis.replay_closure'] })
    ];
    const theoremIds = [
      'inference_synthesis.coverage_totality',
      'inference_synthesis.evaluator_status_truth',
      'inference_synthesis.evidence_basis_closure',
      'inference_synthesis.ownership_traceability_closure',
      'inference_synthesis.witness_materialization_closure',
      'inference_synthesis.replay_closure'
    ];
    const proofClosure = computeProofClosure({
      artifactBindings,
      witnessArtifactPaths,
      replayArtifactPaths: replayArtifacts,
      replaySteps,
      theoremIds,
      excludeTheoremIds: ['inference_synthesis.witness_materialization_closure', 'inference_synthesis.replay_closure']
    });
    const coverageTotalityClosed = classifiedInferredFields.every((field) => coveredInferredFields.includes(field) && momentContractByField.has(field));
    const evaluatorStatusClosureClosed = memberVerdicts.every((entry) => entry.fieldProofPresent && entry.momentContractPresent ? entry.evaluatorStatusTruthful : false);
    const evidenceBasisClosureClosed = memberVerdicts.every((entry) => entry.fieldProofPresent && entry.momentContractPresent ? entry.evidenceBasisClosed : false);
    const theoremVerdicts = [
      buildTheoremVerdict({
        theoremId: 'inference_synthesis.coverage_totality',
        passed: coverageTotalityClosed,
        witnessArtifactPaths,
        replayArtifactPaths: replayArtifacts,
        replayStepIds: ['inference-synthesis.coverage-reconciliation'],
        failureReasons: coverageTotalityClosed ? [] : ['classified inferred fields are missing field-level inference coverage']
      }),
      buildTheoremVerdict({
        theoremId: 'inference_synthesis.evaluator_status_truth',
        passed: evaluatorStatusClosureClosed,
        witnessArtifactPaths,
        replayArtifactPaths: replayArtifacts,
        replayStepIds: ['inference-synthesis.evaluator-status-replay'],
        failureReasons: evaluatorStatusClosureClosed ? [] : ['evaluator stand-in status is inconsistent across inference surfaces']
      }),
      buildTheoremVerdict({
        theoremId: 'inference_synthesis.evidence_basis_closure',
        passed: evidenceBasisClosureClosed,
        witnessArtifactPaths,
        replayArtifactPaths: replayArtifacts,
        replayStepIds: ['inference-synthesis.evidence-basis-replay'],
        failureReasons: evidenceBasisClosureClosed ? [] : ['field proof evidence basis is incomplete relative to prompt context']
      }),
      buildTheoremVerdict({
        theoremId: 'inference_synthesis.ownership_traceability_closure',
        passed: memberVerdicts.every((entry) => entry.momentContractPresent && entry.promptSurfacePresent && entry.parsedEnvelopePresent),
        witnessArtifactPaths,
        replayArtifactPaths: replayArtifacts,
        replayStepIds: ['inference-synthesis.evidence-basis-replay'],
        failureReasons: memberVerdicts.every((entry) => entry.momentContractPresent && entry.promptSurfacePresent && entry.parsedEnvelopePresent) ? [] : ['ownership or traceability surfaces are missing for one or more inferred fields']
      }),
      buildTheoremVerdict({
        theoremId: 'inference_synthesis.witness_materialization_closure',
        passed: proofClosure.witnessBindingsClosed,
        witnessArtifactPaths,
        replayArtifactPaths: replayArtifacts,
        replayStepIds: replaySteps.map((entry) => entry.stepId),
        failureReasons: proofClosure.witnessBindingsClosed ? [] : ['inference-synthesis witness artifact closure is incomplete']
      }),
      buildTheoremVerdict({
        theoremId: 'inference_synthesis.replay_closure',
        passed: proofClosure.replayBindingsClosed && proofClosure.replayStepArtifactCoverageClosed && proofClosure.theoremReplayCoverageClosed,
        witnessArtifactPaths,
        replayArtifactPaths: replayArtifacts,
        replayStepIds: replaySteps.map((entry) => entry.stepId),
        failureReasons: (proofClosure.replayBindingsClosed && proofClosure.replayStepArtifactCoverageClosed && proofClosure.theoremReplayCoverageClosed) ? [] : ['inference-synthesis replay closure is incomplete']
      })
    ];
    return {
      proofFamily: 'inference-synthesis',
      classifiedInferredFields,
      coveredInferredFields,
      momentContracts,
      fieldProofs: inferenceProofs,
      memberVerdicts,
      coverageTotalityClosed,
      evaluatorStatusClosureClosed,
      evidenceBasisClosureClosed,
      witnessMaterializationClosed: proofClosure.witnessBindingsClosed,
      replayClosureClosed: proofClosure.replayBindingsClosed && proofClosure.replayStepArtifactCoverageClosed && proofClosure.theoremReplayCoverageClosed,
      testClosureClosed: true,
      theoremVerdicts,
      artifactBindings,
      replaySteps,
      witnessArtifactPaths,
      replayArtifacts,
      replayInstructions: replaySteps.map((entry) => entry.instruction),
      allCasesPassed: memberVerdicts.every((entry) => entry.passed),
      allTheoremsPassed: aggregateTheoremVerdicts(theoremVerdicts),
      proofHash: `sha256:${sha256(JSON.stringify({
        coveredInferredFields,
        momentContractIds: momentContracts.map((contract) => (/** @type {any} */ (contract))['momentContractId']),
        fieldProofIds: inferenceProofs.map((proof) => proof['fieldProofId'] || proof['outputField']),
        promptIds: promptSurfaces.map((surface) => surface.promptId),
        envelopeIds: parsedCompletionEnvelopes.map((entry) => entry.envelopeId),
        inferredOutputCount: Array.isArray((/** @type {any} */ (promptImplementationSurface))?.['inferredOutputs']) ? (/** @type {any} */ (promptImplementationSurface))['inferredOutputs'].length : 0
      }))}`
    };
  }

  /**
   * @param {NeedMeasurementScenario} scenario
   * @returns {NeedMeasurementResult}
   */
  function measureNeedFromScenario(scenario) {
    const realizationProfile = buildRealizationProfile(scenario);
    const comparisonProfile = buildRealizationProfile(realizationProfile.profileId === 'A' ? 'B' : 'A');
    const parser = buildGithubActionsBenchmarkParser();
    const canonicalBenchmarkOutputs = parser.parse(scenario.canonicalRunEvidence);
    const parserValidation = parser.validate(canonicalBenchmarkOutputs);
    if (!parserValidation.ok) {
      throw new Error(`${ACTIVE_PROJECT_LABEL} parser validation failed: ${parserValidation.reasons.join('; ')}`);
    }
    const parserReceipt = buildStaticExecutionReceipt({
      receiptKind: 'benchmark-parser-normalization',
      stageId: 'github-actions.benchmark-parser.v15',
      toolId: 'github-actions.benchmark-parser.v15',
      inputs: {
        repo: scenario.repo,
        benchmarkRunId: scenario.benchmarkRunId,
        canonicalRunEvidence: scenario.canonicalRunEvidence
      },
      normalizedOutputEnvelope: {
        parserValidation,
        canonicalBenchmarkOutputs
      },
      evidenceRefs: summarizeStrings([
        scenario.canonicalRunEvidence?.runId,
        scenario.canonicalRunEvidence?.workflowPath,
        ...canonicalBenchmarkOutputs.consumedInputs.artifactNames
      ]),
      replayInputClosure: summarizeStrings([
        scenario.repo,
        scenario.benchmarkRunId,
        scenario.canonicalRunEvidence?.runId
      ])
    });

    const repoCodeAnalysis = buildRepoStaticCodeAnalysis(scenario, canonicalBenchmarkOutputs);
    const task = inferNeedTask(scenario, canonicalBenchmarkOutputs);
    const failureModes = inferFailureModes(scenario, canonicalBenchmarkOutputs);
    const constraints = inferConstraints(scenario, canonicalBenchmarkOutputs);
    const targetArtifactKinds = inferTargetArtifactKinds(scenario, canonicalBenchmarkOutputs);
    const closureCriteria = inferClosureCriteria(scenario, canonicalBenchmarkOutputs, targetArtifactKinds);
    const fieldDerivations = {
      task: derivationRecord({
        field: 'task',
        source: scenario.task ? 'scenario.task' : scenario.expectedTask ? 'seed.expectedTask' : 'deterministic-synthesis',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, scenario.repo, scenario.benchmarkHarnessPath],
        notes: 'Canonical need task is normalized before ranking; seed-only names do not leak downstream.'
      }),
      failureModes: derivationRecord({
        field: 'failureModes',
        source: scenario.failureModes?.length ? 'scenario.failureModes' : scenario.expectedFailureModes?.length ? 'seed.expectedFailureModes' : 'canonicalBenchmarkOutputs.failingCases',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.failingCases]
      }),
      constraints: derivationRecord({
        field: 'constraints',
        source: scenario.constraints?.length ? 'scenario.constraints' : scenario.expectedConstraints?.length ? 'seed.expectedConstraints' : 'deterministic-synthesis',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.weakDimensions]
      }),
      targetArtifactKinds: derivationRecord({
        field: 'targetArtifactKinds',
        source: scenario.targetArtifactKinds?.length ? 'scenario.targetArtifactKinds' : scenario.expectedTargetArtifactKinds?.length ? 'seed.expectedTargetArtifactKinds' : 'deterministic-synthesis',
        evidenceRefs: [scenario.repo, ...repoCodeAnalysis.touchedPaths]
      }),
      closureCriteria: derivationRecord({
        field: 'closureCriteria',
        source: scenario.closureCriteria?.length ? 'scenario.closureCriteria' : scenario.expectedClosureCriteria?.length ? 'seed.expectedClosureCriteria' : 'deterministic-synthesis',
        evidenceRefs: [
          scenario.canonicalRunEvidence?.runId,
          ...canonicalBenchmarkOutputs.failingCases,
          ...canonicalBenchmarkOutputs.weakDimensions
        ]
      }),
      stackHints: derivationRecord({
        field: 'stackHints',
        source: 'repo-context-extraction',
        evidenceRefs: [scenario.repo, ...repoCodeAnalysis.stackHints]
      }),
      touchedPaths: derivationRecord({
        field: 'touchedPaths',
        source: canonicalBenchmarkOutputs.touchedPaths.length ? 'canonicalBenchmarkOutputs.touchedPaths + repo-context-extraction' : 'repo-context-extraction',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoCodeAnalysis.touchedPaths]
      }),
      extractedSymbols: derivationRecord({
        field: 'extractedSymbols',
        source: canonicalBenchmarkOutputs.symbols.length ? 'canonicalBenchmarkOutputs.symbols + repo-context-extraction' : 'repo-context-extraction',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoCodeAnalysis.extractedSymbols]
      }),
      configKeys: derivationRecord({
        field: 'configKeys',
        source: canonicalBenchmarkOutputs.configKeys.length ? 'canonicalBenchmarkOutputs.configKeys + repo-context-extraction' : 'repo-context-extraction',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoCodeAnalysis.configKeys]
      }),
      failingCases: derivationRecord({
        field: 'failingCases',
        source: 'canonicalBenchmarkOutputs.failingCases',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.failingCases]
      }),
      weakDimensions: derivationRecord({
        field: 'weakDimensions',
        source: 'canonicalBenchmarkOutputs.weakDimensions',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.weakDimensions]
      }),
      baselineMetrics: derivationRecord({
        field: 'baselineMetrics',
        source: 'canonicalBenchmarkOutputs.baselineMetrics',
        evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...Object.keys(canonicalBenchmarkOutputs.baselineMetrics || {})]
      })
    };
    const benchmarkTarget = {
      harnessPath: scenario.benchmarkHarnessPath,
      runId: scenario.benchmarkRunId,
      failingCases: canonicalBenchmarkOutputs.failingCases,
      weakDimensions: canonicalBenchmarkOutputs.weakDimensions,
      baselineMetrics: canonicalBenchmarkOutputs.baselineMetrics
    };
    const needId = `need_${toSlug(scenario.scenarioId)}_${sha256(`${scenario.repo}:${scenario.baseRef}:${scenario.benchmarkRunId}`).slice(0, 10)}`;
    const evidenceRefs = summarizeStrings([
      scenario.canonicalRunEvidence?.runId,
      scenario.canonicalRunEvidence?.workflowPath,
      scenario.repo,
      scenario.benchmarkHarnessPath
    ]);
    const promptSurfaces = [
      buildPromptSurface({
        promptId: 'need-measurement.task.v2',
        purpose: 'Synthesize the canonical engineering need statement from benchmark evidence.',
        template: `You are measuring a ${ACTIVE_PROJECT_LABEL} remediation need for repo {{repo}} on branch {{baseRef}} after GitHub run {{benchmarkRunId}}. Failing cases: {{failingCases}}. Weak dimensions: {{weakDimensions}}. Touched paths: {{touchedPaths}}. Constraints: {{constraints}}. Produce a concise task statement that preserves rollback safety and session validity.`,
        values: { repo: scenario.repo, baseRef: scenario.baseRef, benchmarkRunId: scenario.benchmarkRunId, failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, touchedPaths: repoCodeAnalysis.touchedPaths, constraints },
        contextInputs: [
          { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
          { field: 'baseRef', value: scenario.baseRef, source: 'scenario.baseRef', evidenceRefs: [scenario.baseRef], artifactBindings: ['.engi/need.json'] },
          { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: summarizeStrings([scenario.canonicalRunEvidence?.runId]), artifactBindings: ['.engi/benchmark-target.json'] },
          { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'touchedPaths', value: repoCodeAnalysis.touchedPaths, source: fieldDerivations.touchedPaths.source || 'repo-context-extraction', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json', '.engi/match-report.json'] },
          { field: 'constraints', value: constraints, source: fieldDerivations.constraints.source || 'deterministic-synthesis', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need.json'] }
        ],
        outputFields: ['task'],
        downstreamArtifacts: ['.engi/need.json', '.engi/match-report.json', '.engi/system-proof-bundle.json', 'ENGI_NEED.md']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.failure-modes.v2',
        purpose: 'Normalize failure modes from canonical benchmark evidence into remediation language.',
        template: `Given failing cases {{failingCases}} and weak dimensions {{weakDimensions}} for repo {{repo}}, derive the concrete failure modes that must be addressed in the private ${ACTIVE_PROJECT_LABEL} remediation branch.`,
        values: { failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, repo: scenario.repo },
        contextInputs: [
          { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
          { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] }
        ],
        outputFields: ['failureModes'],
        downstreamArtifacts: ['.engi/need.json', '.engi/match-report.json', '.engi/prompt-surfaces.json', 'ENGI_NEED.md']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.constraints.v2',
        purpose: 'Derive safety and governance constraints that the branch flow must honor.',
        template: `Use weak dimensions {{weakDimensions}}, benchmark run {{benchmarkRunId}}, and repo privacy expectations to derive the non-negotiable constraints for this ${ACTIVE_PROJECT_LABEL} branch. Include rollback safety, privacy, and auditability where supported.`,
        values: { weakDimensions: canonicalBenchmarkOutputs.weakDimensions, benchmarkRunId: scenario.benchmarkRunId },
        contextInputs: [
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: summarizeStrings([scenario.canonicalRunEvidence?.runId]), artifactBindings: ['.engi/benchmark-target.json'] },
          { field: 'repoPrivacy', value: 'private remediation branch until bounded public proof', source: 'spec policy', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/policy-release.json'] }
        ],
        nonRenderedContextFields: ['repoPrivacy'],
        outputFields: ['constraints'],
        downstreamArtifacts: ['.engi/need.json', '.engi/policy-release.json', '.engi/system-proof-bundle.json', 'ENGI_NEED.md']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.target-artifact-kinds.v2',
        purpose: 'Infer the required artifact shapes for the measured need.',
        template: 'From touched paths {{touchedPaths}}, symbols {{symbols}}, and repo context {{stackHints}}, determine which artifact kinds are needed to remediate the benchmark failures without widening scope.',
        values: { touchedPaths: repoCodeAnalysis.touchedPaths, symbols: repoCodeAnalysis.extractedSymbols, stackHints: repoCodeAnalysis.stackHints },
        contextInputs: [
          { field: 'touchedPaths', value: repoCodeAnalysis.touchedPaths, source: 'buildRepoStaticCodeAnalysis.touchedPaths', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json'] },
          { field: 'symbols', value: repoCodeAnalysis.extractedSymbols, source: 'buildRepoStaticCodeAnalysis.extractedSymbols', evidenceRefs: repoCodeAnalysis.extractedSymbols, artifactBindings: ['.engi/unit-catalog.json'] },
          { field: 'stackHints', value: repoCodeAnalysis.stackHints, source: fieldDerivations.stackHints.source || 'repo-context-extraction', evidenceRefs: repoCodeAnalysis.stackHints, artifactBindings: ['.engi/eval-manifest.json'] }
        ],
        outputFields: ['targetArtifactKinds'],
        downstreamArtifacts: ['.engi/need.json', '.engi/artifact-upload-manifest.json', 'ENGI_NEED.md']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.closure-criteria.v2',
        purpose: 'Derive the explicit closure criteria that determine whether the private remediation branch satisfies the measured need.',
        template: `Using failing cases {{failingCases}}, weak dimensions {{weakDimensions}}, target artifact kinds {{targetArtifactKinds}}, and constraints {{constraints}}, enumerate the concrete closure criteria ${ACTIVE_PROJECT_LABEL} must satisfy before the need is considered closed.`,
        values: {
          failingCases: canonicalBenchmarkOutputs.failingCases,
          weakDimensions: canonicalBenchmarkOutputs.weakDimensions,
          targetArtifactKinds,
          constraints
        },
        contextInputs: [
          { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json', 'ENGI_NEED.md'] },
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json', 'ENGI_NEED.md'] },
          { field: 'targetArtifactKinds', value: targetArtifactKinds, source: fieldDerivations.targetArtifactKinds.source || 'deterministic-synthesis', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json', 'ENGI_NEED.md'] },
          { field: 'constraints', value: constraints, source: fieldDerivations.constraints.source || 'deterministic-synthesis', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need.json', '.engi/policy-release.json', 'ENGI_NEED.md'] }
        ],
        outputFields: ['closureCriteria'],
        downstreamArtifacts: ['.engi/need.json', '.engi/needing-surface.json', 'ENGI_NEED.md']
      })
    ];
    const classifiedPromptOwnedFields = ['task', 'failureModes', 'constraints', 'targetArtifactKinds', 'closureCriteria'];
    const promptContracts = promptSurfaces.map((surface) => surface.promptContract);
    const promptFamilyRegistry = buildPromptFamilyRegistry({
      classifiedPromptOwnedFields,
      promptSurfaces,
      promptContracts
    });
    const inferenceMomentContracts = buildInferenceMomentContracts(promptSurfaces);
    const momentContractByField = new Map(inferenceMomentContracts.flatMap((contract) => (((/** @type {any} */ (contract))['outputFields']) || []).map((/** @type {string} */ field) => [field, contract])));
    const inferenceProofs = classifiedPromptOwnedFields.map((field) => {
      const momentContract = momentContractByField.get(field);
      const derivation = /** @type {any} */ (fieldDerivations)[field] || null;
      const fieldEvidenceRefs = summarizeStrings((/** @type {any} */ (momentContract))?.['evidenceRefs'] || derivation?.evidenceRefs || []);
      const baseProof = inferenceProof(field, fieldEvidenceRefs, (/** @type {any} */ (momentContract))?.['promptId'] || `need-measurement.${field}.v2`);
      return {
        ...baseProof,
        fieldProofId: `inference_proof_${sha256(`${field}:${(/** @type {any} */ (momentContract))?.['promptId'] || baseProof.promptOrEvaluatorId}`).slice(0, 12)}`,
        momentContractId: (/** @type {any} */ (momentContract))?.['momentContractId'] || null,
        realizedEvidenceBasis: fieldEvidenceRefs,
        evidenceBasisClosedToMoment: !!momentContract && summarizeStrings((/** @type {any} */ (momentContract))?.['evidenceRefs'] || []).every((ref) => fieldEvidenceRefs.includes(ref)),
        evaluatorStatusClosedToMoment: !!momentContract && baseProof.evaluatorSurface.standIn === (/** @type {any} */ (momentContract))?.['standIn'],
        provenanceSource: derivation?.source || null,
        proofHash: `sha256:${sha256(JSON.stringify({
          outputField: field,
          promptId: (/** @type {any} */ (momentContract))?.['promptId'] || baseProof.promptOrEvaluatorId,
          momentContractId: (/** @type {any} */ (momentContract))?.['momentContractId'] || null,
          realizedEvidenceBasis: fieldEvidenceRefs
        }))}`
      };
    });
    const deterministicParsedAt = '2026-04-09T00:00:00.000Z';
    const parsedCompletionEnvelopes = [
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.task.v2'),
        parsedPayload: { task },
        parsedAt: deterministicParsedAt,
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.failure-modes.v2'),
        parsedPayload: { failureModes },
        parsedAt: deterministicParsedAt,
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.constraints.v2'),
        parsedPayload: { constraints },
        parsedAt: deterministicParsedAt,
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.target-artifact-kinds.v2'),
        parsedPayload: { targetArtifactKinds },
        parsedAt: deterministicParsedAt,
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.closure-criteria.v2'),
        parsedPayload: { closureCriteria },
        parsedAt: deterministicParsedAt,
        evidenceRefs
      })
    ];
    const parsedCompletionEnvelopeArtifact = buildParsedCompletionEnvelopeArtifact(parsedCompletionEnvelopes);
    const promptCompletenessProof = buildPromptCompletenessProof(promptContracts, {
      promptSurfaces,
      promptFamilyRegistry,
      parsedCompletionEnvelopeArtifact,
      classifiedPromptOwnedFields,
      explicitExclusions: [],
      expectedDownstreamConsumersByField: {
        task: ['.engi/need.json', '.engi/match-report.json', '.engi/system-proof-bundle.json', 'ENGI_NEED.md'],
        failureModes: ['.engi/need.json', '.engi/match-report.json', 'ENGI_NEED.md'],
        constraints: ['.engi/need.json', '.engi/policy-release.json', '.engi/system-proof-bundle.json', 'ENGI_NEED.md'],
        targetArtifactKinds: ['.engi/need.json', '.engi/artifact-upload-manifest.json', 'ENGI_NEED.md'],
        closureCriteria: ['.engi/need.json', '.engi/needing-surface.json', 'ENGI_NEED.md']
      }
    });
    const inferenceSynthesisProof = buildInferenceSynthesisProof({
      classifiedInferredFields: classifiedPromptOwnedFields,
      inferenceProofs,
      momentContracts: inferenceMomentContracts,
      promptSurfaces,
      parsedCompletionEnvelopes,
      promptImplementationSurface: {
        inferredOutputs: inferenceProofs
      }
    });
    const measurementProvenance = [
      measurementTrace('static', 'github-actions.benchmark-parser.v2', summarizeStrings([
        scenario.canonicalRunEvidence?.runId,
        scenario.canonicalRunEvidence?.workflowPath,
        ...canonicalBenchmarkOutputs.consumedInputs.artifactNames
      ]), { receiptRefs: [parserReceipt.receiptId] }),
      measurementTrace('static', 'github.repo-context.extract.v2', [scenario.repo, ...repoCodeAnalysis.touchedPaths], { receiptRefs: repoCodeAnalysis.staticExecutionReceipts.map((receipt) => receipt.receiptId) }),
      measurementTrace('inferred', 'need-measurement.task.v2', evidenceRefs),
      measurementTrace('inferred', 'need-measurement.failure-modes.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.failingCases]),
      measurementTrace('inferred', 'need-measurement.constraints.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.weakDimensions]),
      measurementTrace('inferred', 'need-measurement.target-artifact-kinds.v2', [...evidenceRefs, ...repoCodeAnalysis.touchedPaths]),
      measurementTrace('inferred', 'need-measurement.closure-criteria.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.failingCases, ...canonicalBenchmarkOutputs.weakDimensions]),
      measurementTrace('hybrid', 'need-measurement.derivation-closure.v8', Object.values(fieldDerivations).flatMap((entry) => entry.evidenceRefs || []))
    ];

    const needDescriptor = {
      needId,
      repo: scenario.repo,
      installationId: scenario.installationId,
      baseRef: scenario.baseRef,
      targetRef: scenario.targetRef,
      prNumber: scenario.prNumber,
      benchmarkHarnessPath: scenario.benchmarkHarnessPath,
      benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
      benchmarkRunId: scenario.benchmarkRunId,
      benchmarkRunUrl: scenario.benchmarkRunUrl,
      canonicalRunEvidence: scenario.canonicalRunEvidence,
      benchmarkParserContract: {
        parserKind: parser.parserKind,
        parserVersion: parser.parserVersion,
        acceptedArtifactMediaTypes: summarizeStrings((scenario.canonicalRunEvidence?.artifacts || []).map((artifact) => artifact.mediaType)),
        parserFailureContract: {
          failClosed: true,
          onMissingCanonicalOutputs: 'reject-need-materialization',
          onMalformedOutputs: 'emit-parser-error-artifact'
        },
        consumedInputs: canonicalBenchmarkOutputs.consumedInputs
      },
      canonicalBenchmarkOutputs,
      task,
      failureModes,
      constraints,
      targetArtifactKinds,
      closureCriteria,
      stackHints: repoCodeAnalysis.stackHints,
      touchedPaths: repoCodeAnalysis.touchedPaths,
      extractedSymbols: repoCodeAnalysis.extractedSymbols,
      configKeys: repoCodeAnalysis.configKeys,
      failingCases: canonicalBenchmarkOutputs.failingCases,
      weakDimensions: canonicalBenchmarkOutputs.weakDimensions,
      baselineMetrics: canonicalBenchmarkOutputs.baselineMetrics,
      humanPrompt: scenario.humanPrompt,
      conformanceProfile: realizationProfile.label,
      productionIntentProfile: comparisonProfile.label,
      realizationProfile,
      fieldDerivations,
      measurementProvenance,
      measurementClassInventory: {
        staticExecuted: ['canonicalBenchmarkOutputs', 'buildRepoStaticCodeAnalysis'],
        inferredDerived: ['task', 'failureModes', 'constraints', 'targetArtifactKinds', 'closureCriteria'],
        hybridComposed: ['fieldDerivations']
      },
      staticMeasurements: {
        touchedPaths: repoCodeAnalysis.touchedPaths,
        extractedSymbols: repoCodeAnalysis.extractedSymbols,
        configKeys: repoCodeAnalysis.configKeys,
        failingCases: canonicalBenchmarkOutputs.failingCases,
        weakDimensions: canonicalBenchmarkOutputs.weakDimensions
      },
      inferredMeasurements: {
        task,
        failureModes,
        constraints,
        targetArtifactKinds,
        closureCriteria
      },
      recallChannelContracts: buildRecallChannelContracts(),
      promptSurfaces,
      promptContracts,
      promptFamilyRegistry,
      promptCompletenessProof,
      inferenceSynthesisProof,
      inferenceMomentContracts,
      parsedCompletionEnvelopes,
      parsedCompletionEnvelopeArtifact,
      analysisFactLifecycle: {
        determined: {
          lexical: 'tokenize over need.task/failureModes/constraints/weakDimensions',
          symbolic: 'benchmark parser + repo-context extraction + asset unit signal extraction',
          path: 'canonical benchmark touchedPaths plus repo-context extraction',
          config: 'canonical benchmark configKeys plus repo-context extraction',
          semanticVector: 'deterministic stand-in embeddings over task/failure-mode/context texts'
        },
        recorded: {
          lexical: 'need.lexicalTerms during recall build',
          symbolic: 'need.extractedSymbols + contentUnits[].codeAnalysisFacts.symbols',
          path: 'need.touchedPaths + asset.metadata.sourcePaths + unit.codeAnalysisFacts.paths',
          config: 'need.configKeys + unit.codeAnalysisFacts.configKeys',
          semanticVector: 'queryRepresentations + contentUnits[].embeddings.*'
        },
        searched: {
          lexical: 'lexicalSearch exact-token overlap',
          symbolic: 'symbolSearch exact symbol intersection',
          path: 'pathSearch exact path intersection',
          config: 'configKeySearch exact key intersection',
          semanticVector: 'semanticTaskSearch/failureModeSearch/technicalContextSearch via cosine similarity'
        },
        downstreamUses: {
          recall: 'recallCandidates fusion',
          scoring: ['needMatch', 'benchmarkImpact', 'penaltyMass'],
          ranking: 'evaluateCandidates final ranking score',
          selection: 'assembleAssetPack and settlement eligibility',
          UX: 'visual/raw score explainability surfaces'
        }
      },
      profileCompositions: buildProfileCompositions()
    };

    return {
      needDescriptor,
      benchmarkTarget,
      canonicalBenchmarkOutputs,
      benchmarkParserContract: {
        parserKind: parser.parserKind,
        parserVersion: parser.parserVersion,
        acceptedArtifactMediaTypes: summarizeStrings((scenario.canonicalRunEvidence?.artifacts || []).map((artifact) => artifact.mediaType)),
        parserFailureContract: {
          failClosed: true,
          onMissingCanonicalOutputs: 'reject-need-materialization',
          onMalformedOutputs: 'emit-parser-error-artifact'
        },
        consumedInputs: canonicalBenchmarkOutputs.consumedInputs
      },
      parserValidation,
      inferenceProofs,
      promptSurfaces,
      promptContracts,
      promptFamilyRegistry,
      promptCompletenessProof,
      inferenceSynthesisProof,
      inferenceMomentContracts,
      parsedCompletionEnvelopes,
      parsedCompletionEnvelopeArtifact,
      measurementProvenance,
      staticExecutionReceipts: [parserReceipt, ...collectStaticExecutionReceipts(repoCodeAnalysis)]
    };
  }

  /**
   * @param {NeedMeasurementScenario} scenario
   * @returns {NeedDescriptorShape}
   */
  function buildNeedDescriptor(scenario) {
    return measureNeedFromScenario(scenario).needDescriptor;
  }

  return {
    measurementTrace,
    buildRecallChannelContracts,
    measureNeedFromScenario,
    buildNeedDescriptor
  };
}
