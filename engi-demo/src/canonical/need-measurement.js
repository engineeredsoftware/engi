// @ts-check

/**
 * @typedef {import('./type-contracts.js').BuiltPromptSurface} BuiltPromptSurface
 * @typedef {import('./type-contracts.js').PromptContractShape} PromptContractShape
 * @typedef {import('./type-contracts.js').ParsedCompletionEnvelope} ParsedCompletionEnvelope
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
 * @typedef {{ evidenceRefs?: string[] | undefined }} DerivationRecord
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
 *   needDescriptor: Record<string, unknown>,
 *   benchmarkTarget: Record<string, unknown>,
 *   canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs,
 *   benchmarkParserContract: Record<string, unknown>,
 *   parserValidation: ParserValidation,
 *   inferenceProofs: Array<Record<string, unknown>>,
 *   promptSurfaces: BuiltPromptSurface[],
 *   promptContracts: PromptContractShape[],
 *   promptCompletenessProof: Record<string, unknown>,
 *   parsedCompletionEnvelopes: ParsedCompletionEnvelope[],
 *   parsedCompletionEnvelopeArtifact: Record<string, unknown>,
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

import { buildProfileCompositions } from '../demo-shell-state.js';
import { buildRealizationProfile } from '../realization-profile.js';

/**
 * @param {BuiltPromptSurface[]} promptSurfaces
 * @param {string} promptId
 * @returns {BuiltPromptSurface}
 */
function requirePromptSurface(promptSurfaces, promptId) {
  const promptSurface = promptSurfaces.find((surface) => surface.promptId === promptId);
  if (!promptSurface) {
    throw new Error(`Spec V15 prompt surface missing for ${promptId}.`);
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
 *   buildNeedDescriptor: (scenario: NeedMeasurementScenario) => Record<string, unknown>
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
      throw new Error(`Spec V15 parser validation failed: ${parserValidation.reasons.join('; ')}`);
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
    const inferenceProofs = [
      inferenceProof('task', evidenceRefs, 'need-measurement.task.v2'),
      inferenceProof('failureModes', [...evidenceRefs, ...canonicalBenchmarkOutputs.failingCases], 'need-measurement.failure-modes.v2'),
      inferenceProof('constraints', [...evidenceRefs, ...canonicalBenchmarkOutputs.weakDimensions], 'need-measurement.constraints.v2'),
      inferenceProof('targetArtifactKinds', [...evidenceRefs, ...repoCodeAnalysis.touchedPaths], 'need-measurement.target-artifact-kinds.v2')
    ];
    const promptSurfaces = [
      buildPromptSurface({
        promptId: 'need-measurement.task.v2',
        purpose: 'Synthesize the canonical engineering need statement from benchmark evidence.',
        template: 'You are measuring an ENGI remediation need for repo {{repo}} on branch {{baseRef}} after GitHub run {{benchmarkRunId}}. Failing cases: {{failingCases}}. Weak dimensions: {{weakDimensions}}. Touched paths: {{touchedPaths}}. Constraints: {{constraints}}. Produce a concise task statement that preserves rollback safety and session validity.',
        values: { repo: scenario.repo, baseRef: scenario.baseRef, benchmarkRunId: scenario.benchmarkRunId, failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, touchedPaths: repoCodeAnalysis.touchedPaths, constraints },
        contextInputs: [
          { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
          { field: 'baseRef', value: scenario.baseRef, source: 'scenario.baseRef', evidenceRefs: [scenario.baseRef], artifactBindings: ['.engi/need.json'] },
          { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: summarizeStrings([scenario.canonicalRunEvidence?.runId]), artifactBindings: ['.engi/benchmark-target.json'] },
          { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'touchedPaths', value: repoCodeAnalysis.touchedPaths, source: 'buildRepoStaticCodeAnalysis.touchedPaths', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json', '.engi/match-report.json'] },
          { field: 'constraints', value: constraints, source: 'inferConstraints()', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need.json'] }
        ],
        outputFields: ['task'],
        downstreamArtifacts: ['.engi/need.json', '.engi/match-report.json', '.engi/system-proof-bundle.json']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.failure-modes.v2',
        purpose: 'Normalize failure modes from canonical benchmark evidence into remediation language.',
        template: 'Given failing cases {{failingCases}} and weak dimensions {{weakDimensions}} for repo {{repo}}, derive the concrete failure modes that must be addressed in the private ENGI remediation branch.',
        values: { failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, repo: scenario.repo },
        contextInputs: [
          { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
          { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] }
        ],
        outputFields: ['failureModes'],
        downstreamArtifacts: ['.engi/need.json', '.engi/match-report.json', '.engi/prompt-surfaces.json']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.constraints.v2',
        purpose: 'Derive safety and governance constraints that the branch flow must honor.',
        template: 'Use weak dimensions {{weakDimensions}}, benchmark run {{benchmarkRunId}}, and repo privacy expectations to derive the non-negotiable constraints for this ENGI branch. Include rollback safety, privacy, and auditability where supported.',
        values: { weakDimensions: canonicalBenchmarkOutputs.weakDimensions, benchmarkRunId: scenario.benchmarkRunId },
        contextInputs: [
          { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
          { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: summarizeStrings([scenario.canonicalRunEvidence?.runId]), artifactBindings: ['.engi/benchmark-target.json'] },
          { field: 'repoPrivacy', value: 'private remediation branch until bounded public proof', source: 'spec policy', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/policy-release.json'] }
        ],
        nonRenderedContextFields: ['repoPrivacy'],
        outputFields: ['constraints'],
        downstreamArtifacts: ['.engi/need.json', '.engi/policy-release.json', '.engi/system-proof-bundle.json']
      }),
      buildPromptSurface({
        promptId: 'need-measurement.target-artifact-kinds.v2',
        purpose: 'Infer the required artifact shapes for the measured need.',
        template: 'From touched paths {{touchedPaths}}, symbols {{symbols}}, and repo context {{stackHints}}, determine which artifact kinds are needed to remediate the benchmark failures without widening scope.',
        values: { touchedPaths: repoCodeAnalysis.touchedPaths, symbols: repoCodeAnalysis.extractedSymbols, stackHints: repoCodeAnalysis.stackHints },
        contextInputs: [
          { field: 'touchedPaths', value: repoCodeAnalysis.touchedPaths, source: 'buildRepoStaticCodeAnalysis.touchedPaths', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json'] },
          { field: 'symbols', value: repoCodeAnalysis.extractedSymbols, source: 'buildRepoStaticCodeAnalysis.extractedSymbols', evidenceRefs: repoCodeAnalysis.extractedSymbols, artifactBindings: ['.engi/unit-catalog.json'] },
          { field: 'stackHints', value: repoCodeAnalysis.stackHints, source: 'inferStackHints()', evidenceRefs: repoCodeAnalysis.stackHints, artifactBindings: ['.engi/eval-manifest.json'] }
        ],
        outputFields: ['targetArtifactKinds'],
        downstreamArtifacts: ['.engi/need.json', '.engi/artifact-upload-manifest.json']
      })
    ];
    const promptContracts = promptSurfaces.map((surface) => surface.promptContract);
    const promptCompletenessProof = buildPromptCompletenessProof(promptContracts);
    const parsedCompletionEnvelopes = [
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.task.v2'),
        parsedPayload: { task },
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.failure-modes.v2'),
        parsedPayload: { failureModes },
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.constraints.v2'),
        parsedPayload: { constraints },
        evidenceRefs
      }),
      buildParsedCompletionEnvelope({
        promptSurface: requirePromptSurface(promptSurfaces, 'need-measurement.target-artifact-kinds.v2'),
        parsedPayload: { targetArtifactKinds },
        evidenceRefs
      })
    ];
    const parsedCompletionEnvelopeArtifact = buildParsedCompletionEnvelopeArtifact(parsedCompletionEnvelopes);
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
      promptCompletenessProof,
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
      promptCompletenessProof,
      parsedCompletionEnvelopes,
      parsedCompletionEnvelopeArtifact,
      measurementProvenance,
      staticExecutionReceipts: [parserReceipt, ...collectStaticExecutionReceipts(repoCodeAnalysis)]
    };
  }

  /**
   * @param {NeedMeasurementScenario} scenario
   * @returns {Record<string, unknown>}
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
