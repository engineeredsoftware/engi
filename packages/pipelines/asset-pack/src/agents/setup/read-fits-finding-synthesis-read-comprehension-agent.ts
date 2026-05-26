/**
 * AssetPack Pipeline - Comprehend Read Agent
 *
 * Pipeline-local adapter for the generic Bitcode setup Read-comprehension
 * PTRR agent. Generic tools own callable analysis capabilities; the generic
 * agent composes those tools; this adapter stores setup-phase Read evidence
 * for downstream AssetPack synthesis phases.
 */

import { bitcodeSetupReadComprehensionAgent } from '@bitcode/generic-agents-read-comprehension';
import { z } from 'zod';
import { runBoundedStructuredInference } from '../../bounded-structured-inference';
import {
  isAssetPackBoundedRealInferenceProfile,
  shouldUseAssetPackPtrr,
} from '../../runtime-inference-policy';

const BoundedReadComprehensionSchema = z.object({
  read: z.object({
    expressed_read: z.string().optional(),
    primary_intent: z.string().optional(),
    satisfaction_criteria: z.array(z.string()).optional(),
  }).optional(),
  read_satisfaction_criteria: z.string().optional(),
  written_asset_types: z.array(z.string()).optional(),
  asset_pack_context: z.any().optional(),
  delivery_mechanism_boundaries: z.array(z.string()).optional(),
  source_to_shares_service_questions: z.record(z.any()).optional(),
  service_accountability: z.record(z.any()).optional(),
  comprehension: z.record(z.any()).optional(),
  entities: z.record(z.any()).optional(),
  toolEvidence: z.any().optional(),
  riskAdmissionInput: z.any().optional(),
  read_definition_analysis: z.string().optional(),
  success: z.boolean().optional(),
  validationMessage: z.string().optional(),
}).passthrough();

export const ReadFitsFindingSynthesisReadComprehensionAgent = bitcodeSetupReadComprehensionAgent;

// Wrapper export that stores classification into execution state
export async function runReadFitsFindingSynthesisReadComprehensionAgent(input: any, execution: any) {
  const expressedRead =
    input?.read ??
    input?.expressedRead ??
    input?.definitionOfRead ??
    execution?.get?.('setup/read', 'expressed') ??
    execution?.get?.('setup/read-definition', 'definition') ??
    '';
  const agentInput = {
    ...input,
    read: expressedRead,
    expressedRead,
    phase: 'setup',
    beforeAgent: 'danger-wall'
  };
  const out = isAssetPackBoundedRealInferenceProfile()
    ? await runBoundedReadComprehension(agentInput, execution)
    : shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_COMPREHEND_READ_USE_PTRR')
      ? await ReadFitsFindingSynthesisReadComprehensionAgent(agentInput, execution)
      : buildDeterministicReadComprehension(agentInput, execution);
  try {
    const result = out as any;
    const types = Array.isArray(result?.written_asset_types) && result?.written_asset_types.length
      ? result?.written_asset_types
      : [];
    if (types && types.length) {
      execution.store('setup', 'writtenAssetRequest', types);
      execution.store('setup/written-asset-request', 'type', types);
    }

    const readSatisfactionCriteria =
      result?.read_satisfaction_criteria ||
      result?.read_definition_analysis;
    if (readSatisfactionCriteria) {
      execution.store('setup/read', 'satisfactionCriteria', readSatisfactionCriteria);
      execution.store('setup/read-definition', 'analysis', readSatisfactionCriteria);
    }
    if (result?.read) {
      execution.store('setup/read', 'model', result.read);
      execution.store('setup/read-comprehension', 'model', result.read);
    }
    if (result?.comprehension) {
      execution.store('setup/read', 'comprehension', result.comprehension);
      execution.store('setup/read-comprehension', 'comprehension', result.comprehension);
      execution.store('setup/read-definition', 'comprehension', result.comprehension);
    }
    if (result?.entities) {
      execution.store('setup/read', 'entities', result.entities);
    }
    if (result?.toolEvidence) execution.store('setup/read-comprehension', 'toolEvidence', result.toolEvidence);
    if (result?.riskAdmissionInput) execution.store('setup/read-comprehension', 'riskAdmissionInput', result.riskAdmissionInput);
    if (result?.attachmentsComprehension) execution.store('setup/read-definition', 'attachmentsComprehension', result.attachmentsComprehension);
    if (result?.comprehended_multimodal_attachments)
      execution.store('setup/read-definition', 'attachmentsComprehension', result.comprehended_multimodal_attachments);
  } catch {}
  return out;
}

export const ReadFitsFindingSynthesisReadDefinitionComprehensionAgent = ReadFitsFindingSynthesisReadComprehensionAgent;
export default runReadFitsFindingSynthesisReadComprehensionAgent;

async function runBoundedReadComprehension(input: any, execution: any) {
  const baseline = buildDeterministicReadComprehension(input, execution);
  const inferred = await runBoundedStructuredInference({
    agentName: 'ReadFitsFindingSynthesisReadComprehensionAgent',
    phase: 'setup',
    step: 'read-comprehension',
    execution,
    schema: BoundedReadComprehensionSchema,
    fallback: () => baseline,
    promptTemplate: {
      templateId: 'ReadFitsFindingSynthesis.prompt.read-comprehension',
      system: [
        'You are the ReadFitsFindingSynthesis setup Read-comprehension agent.',
        'Translate the accepted Need and expressed Read into one auditable model for Finding Fits, Depository query synthesis, candidate ranking, and AssetPack synthesis context.',
        'Preserve source constraints, target artifact kinds, closure criteria, failure modes, fit candidate state, and proof/readback roots as source-safe context.',
        'Return source-bound evidence only. Do not claim settlement, finality, BTD rights transfer, delivery, or protected source visibility beyond provided proof roots/readbacks.',
        'Respond only with JSON matching the requested shape.',
      ].join('\n'),
      user: JSON.stringify({
        requestedShape: '{{requestedShape}}',
        acceptedReadNeed: '{{acceptedReadNeed}}',
        read: '{{read}}',
        definitionOfRead: '{{definitionOfRead}}',
        repository: '{{repository}}',
        sourceRevision: '{{sourceRevision}}',
        sourceConstraints: '{{sourceConstraints}}',
        deposit: '{{deposit}}',
        fitResult: '{{fitResult}}',
        baselineReadModel: '{{baselineReadModel}}',
        baselineSatisfactionCriteria: '{{baselineSatisfactionCriteria}}',
      }, null, 2),
    },
    systemPrompt: [
      'You are the ReadFitsFindingSynthesis setup Read-comprehension agent.',
      'Translate the accepted Need and expressed Read into one auditable model for Finding Fits, Depository query synthesis, candidate ranking, and AssetPack synthesis context.',
      'Preserve source constraints, target artifact kinds, closure criteria, failure modes, fit candidate state, and proof/readback roots as source-safe context.',
      'Return source-bound evidence only. Do not claim settlement, finality, BTD rights transfer, delivery, or protected source visibility beyond provided proof roots/readbacks.',
      'Respond only with JSON matching the requested shape.',
    ].join('\n'),
    userPrompt: JSON.stringify({
      requestedShape: {
        read: {
          expressed_read: 'string',
          primary_intent: 'string',
          satisfaction_criteria: ['string'],
        },
        read_satisfaction_criteria: 'string',
        written_asset_types: ['read-satisfaction-asset-pack'],
        delivery_mechanism_boundaries: ['string'],
        comprehension: {
          intent: 'string',
          goals: ['string'],
          requirements: ['string'],
          constraints: ['string'],
          successCriteria: ['string'],
        },
        entities: {
          files: ['string'],
          concepts: ['string'],
          technologies: ['string'],
        },
        service_accountability: {
          provider: 'string',
          reader_outcome: 'string',
          infrastructure_standard: 'string',
        },
        success: true,
      },
      acceptedReadNeed: input.acceptedReadNeed,
      read: input.read,
      definitionOfRead: input.definitionOfRead,
      repository: input.repository,
      sourceRevision: input.sourceRevision,
      sourceConstraints: input.acceptedReadNeed?.sourceConstraints,
      deposit: input.deposit,
      fitResult: compactFitResult(input.fitResult ?? input.depositorySearchResult),
      baselineReadModel: baseline.read,
      baselineSatisfactionCriteria: baseline.read_satisfaction_criteria,
    }, null, 2),
  });

  return normalizeBoundedReadComprehension(inferred, baseline);
}

function normalizeBoundedReadComprehension(inferred: any, baseline: any) {
  const read = {
    ...baseline.read,
    ...(inferred?.read || {}),
    expressed_read:
      normalizeText(inferred?.read?.expressed_read) ||
      baseline.read.expressed_read,
    primary_intent:
      normalizeText(inferred?.read?.primary_intent) ||
      baseline.read.primary_intent,
    satisfaction_criteria: normalizeStringArray(
      inferred?.read?.satisfaction_criteria,
      baseline.read.satisfaction_criteria
    ),
  };

  return {
    ...baseline,
    ...inferred,
    read,
    read_satisfaction_criteria:
      normalizeText(inferred?.read_satisfaction_criteria) ||
      baseline.read_satisfaction_criteria,
    written_asset_types: normalizeStringArray(
      inferred?.written_asset_types,
      baseline.written_asset_types
    ),
    delivery_mechanism_boundaries: normalizeStringArray(
      inferred?.delivery_mechanism_boundaries,
      baseline.delivery_mechanism_boundaries
    ),
    comprehension: {
      ...baseline.comprehension,
      ...(inferred?.comprehension || {}),
      goals: normalizeStringArray(inferred?.comprehension?.goals, baseline.comprehension.goals),
      requirements: normalizeStringArray(inferred?.comprehension?.requirements, baseline.comprehension.requirements),
      constraints: normalizeStringArray(inferred?.comprehension?.constraints, baseline.comprehension.constraints),
      successCriteria: normalizeStringArray(inferred?.comprehension?.successCriteria, baseline.comprehension.successCriteria),
    },
    entities: {
      ...baseline.entities,
      ...(inferred?.entities || {}),
      files: normalizeStringArray(inferred?.entities?.files, baseline.entities.files),
      concepts: normalizeStringArray(inferred?.entities?.concepts, baseline.entities.concepts),
      technologies: normalizeStringArray(inferred?.entities?.technologies, baseline.entities.technologies),
    },
    toolEvidence: inferred?.toolEvidence ?? baseline.toolEvidence,
    riskAdmissionInput: {
      ...baseline.riskAdmissionInput,
      ...(inferred?.riskAdmissionInput || {}),
      read: baseline.riskAdmissionInput.read,
      writtenAssetType: 'read-satisfaction-asset-pack',
      writtenAssetRequest: 'read-satisfaction-asset-pack',
    },
    success: inferred?.success ?? true,
    validationMessage:
      normalizeText(inferred?.validationMessage) ||
      'Bounded real-inference setup Read comprehension completed.',
  };
}

function buildDeterministicReadComprehension(input: any, execution: any) {
  const expressedRead =
    normalizeText(input?.read) ||
    normalizeText(input?.expressedRead) ||
    normalizeText(input?.definitionOfRead) ||
    'Fit the admitted Bitcode Read against source-bound depository evidence.';
  const repository = normalizeRepository(input, execution);
  const sourceRevision = normalizeSourceRevision(input, repository, execution);
  const fitResult = input?.fitResult ?? input?.depositorySearchResult ?? {};
  const candidates = Array.isArray(fitResult?.selectedCandidateAssetIds)
    ? fitResult.selectedCandidateAssetIds
    : [];
  const candidateText = candidates.length ? candidates.join(', ') : 'no selected candidate yet';
  const fitState = normalizeText(fitResult?.resultState) || 'not-yet-classified';
  const satisfactionCriteria = [
    'Repository revision evidence must match the admitted Read source revision.',
    'Depository search must retrieve many candidate fit deposits above threshold, not stop at the first plausible match.',
    'Depository candidate evidence must be proof-bearing, measurement-bearing, readback-aware, and relevant to the accepted Need.',
    'AssetPack synthesis must remain source-bound to selected fit deposits and must not cite frontier, mock, rejected, blocked, or unrelated deposits.',
    'Source-safe preview may expose measurements, quote, provenance, and validation posture but not unpaid AssetPack source.',
    'Finish may ship source-bearing delivery only after validation, BTC settlement readback, BTD rights transfer, and delivery unlock.',
    'Ledger settlement must preserve depositor and reader ownership boundaries.'
  ];
  const readDefinitionAnalysis = [
    `Expressed Read: ${expressedRead}`,
    `Source revision: ${repository.fullName}@${sourceRevision.branch}:${sourceRevision.commit}`,
    `Fit finding state: ${fitState}; selected candidates: ${candidateText}.`
  ].join('\n');
  const repositoryEvidence = [
    {
      sourceType: 'repository',
      path: repository.fullName,
      concern: 'Source revision alignment for Read/Fit synthesis',
      evidence: [
        `branch=${sourceRevision.branch}`,
        `commit=${sourceRevision.commit}`
      ]
    },
    {
      sourceType: 'depository-fit',
      path: candidates.join(',') || undefined,
      concern: 'Candidate deposits admitted for AssetPack consideration',
      evidence: [
        `fitState=${fitState}`,
        `selectedCandidates=${candidateText}`
      ]
    }
  ];

  return {
    read: {
      expressed_read: expressedRead,
      primary_intent: 'Find and synthesize a source-bound AssetPack fit for the admitted Bitcode Read.',
      satisfaction_criteria: satisfactionCriteria
    },
    read_satisfaction_criteria: satisfactionCriteria.join(' '),
    written_asset_types: ['read-satisfaction-asset-pack'],
    asset_pack_context: {
      repository,
      sourceRevision,
      fitState,
      selectedCandidateAssetIds: candidates
    },
    delivery_mechanism_boundaries: [
      'Pull-request or artifact delivery must not occur until validation and finish evidence are recorded.',
      'Depositor-side asset ownership and reader-side settlement responsibility must remain separated.',
      'BTC fee handling is a settlement/finality concern and cannot be attributed to the depositor without recorded authorization.'
    ],
    source_to_shares_service_questions: {},
    service_accountability: {
      provider: 'Bitcode pipeline harness',
      reader_outcome: 'A high-quality, proof-bearing AssetPack fit or explicit blocked/no-worthy-fit evidence.',
      infrastructure_standard: 'Source-bound read satisfaction with auditable telemetry and ledger synchronization.'
    },
    comprehension: {
      intent: 'Synthesize a Read-satisfying AssetPack from deposited repository evidence.',
      goals: [
        'Search every Depository candidate channel for worthy fit deposits',
        'Rank and select many candidates above threshold with query/ranking/provenance roots',
        'Generate source-grounded AssetPack context from selected fit deposits',
        'Validate source-safe preview, proof, quote, and delivery readiness',
        'Finish with settlement, BTD rights, audit, and delivery evidence after payment'
      ],
      requirements: satisfactionCriteria,
      constraints: [
        'No mock or frontier evidence may satisfy the Read',
        'No unrelated repository deposit may be used as a positive fit',
        'No protected source or unpaid AssetPack source may be visible before settlement',
        'No settlement claim may be made without ledger evidence'
      ],
      successCriteria: satisfactionCriteria
    },
    entities: {
      files: [],
      concepts: ['Read', 'Fit', 'Depository', 'AssetPack', 'proof', 'ledger settlement'],
      technologies: ['Vercel Sandbox', 'Supabase', 'OpenAI embeddings', 'Bitcode pipeline telemetry']
    },
    toolEvidence: {
      semanticAnalysis: {
        expressedRead,
        repository: repository.fullName,
        sourceRevision,
        fitState,
        selectedCandidateAssetIds: candidates
      },
      requirements: satisfactionCriteria,
      constraints: [
        'accepted Read-Need only',
        'many-candidate Depository search',
        'source-bound evidence',
        'proof-bearing fit',
        'source-safe preview only before settlement',
        'auditable finish',
        'ledgerized settlement'
      ]
    },
    riskAdmissionInput: {
      read: expressedRead,
      assetPackIntent: 'Read-satisfaction AssetPack synthesis',
      writtenAssetType: 'read-satisfaction-asset-pack',
      writtenAssetRequest: 'read-satisfaction-asset-pack',
      deliveryMechanism: input?.deliveryMechanism,
      repositoryEvidence
    },
    read_definition_analysis: readDefinitionAnalysis,
    success: true,
    validationMessage: 'Deterministic setup Read comprehension completed from admitted Read and source revision evidence.'
  };
}

function normalizeText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.filter((entry) => typeof entry === 'string').join('\n').trim();
  return '';
}

function normalizeStringArray(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    const normalized = value
      .map((entry) => normalizeText(entry))
      .filter(Boolean);
    if (normalized.length) return normalized;
  }
  return fallback;
}

function compactFitResult(fitResult: any) {
  if (!fitResult || typeof fitResult !== 'object') return undefined;
  return {
    resultState: fitResult.resultState,
    resultReasons: fitResult.resultReasons,
    selectedCandidateAssetIds: fitResult.selectedCandidateAssetIds,
    searchedAssetCount: fitResult.searchedAssetCount,
    queryRoot: fitResult.queryRoot,
    rankingRoot: fitResult.rankingRoot,
    embeddingPolicy: fitResult.embeddingPolicy,
    selectedCandidates: Array.isArray(fitResult.selectedCandidates)
      ? fitResult.selectedCandidates.map((candidate: any) => ({
        assetId: candidate.assetId,
        title: candidate.title,
        useTier: candidate.useTier,
        verification: candidate.verification,
        ranking: candidate.ranking,
        proofEvidence: candidate.proofEvidence,
        measurementEvidence: candidate.measurementEvidence,
        readbackEvidence: candidate.readbackEvidence,
      }))
      : undefined,
  };
}

function normalizeRepository(input: any, execution: any) {
  const fullName =
    normalizeText(input?.repository?.fullName) ||
    normalizeText(input?.sourceRevision?.repositoryFullName) ||
    [
      execution?.get?.('repository', 'owner'),
      execution?.get?.('repository', 'name')
    ].filter(Boolean).join('/') ||
    'unknown/unknown';
  const [owner = 'unknown', name = 'unknown'] = fullName.split('/');
  return {
    fullName,
    owner,
    name,
    branch:
      normalizeText(input?.repository?.branch) ||
      normalizeText(input?.sourceRevision?.branch) ||
      normalizeText(execution?.get?.('repository', 'branch')) ||
      'unknown',
    commit:
      normalizeText(input?.repository?.commit) ||
      normalizeText(input?.sourceRevision?.commit) ||
      normalizeText(execution?.get?.('repository', 'commit')) ||
      'unknown'
  };
}

function normalizeSourceRevision(input: any, repository: any, execution: any) {
  return {
    repositoryFullName:
      normalizeText(input?.sourceRevision?.repositoryFullName) ||
      repository.fullName,
    branch:
      normalizeText(input?.sourceRevision?.branch) ||
      repository.branch ||
      normalizeText(execution?.get?.('repository', 'branch')) ||
      'unknown',
    commit:
      normalizeText(input?.sourceRevision?.commit) ||
      repository.commit ||
      normalizeText(execution?.get?.('repository', 'commit')) ||
      'unknown'
  };
}
