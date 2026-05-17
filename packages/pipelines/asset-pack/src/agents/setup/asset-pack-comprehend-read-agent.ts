/**
 * AssetPack Pipeline - Comprehend Read Agent
 *
 * Pipeline-local adapter for the generic Bitcode setup Read-comprehension
 * PTRR agent. Generic tools own callable analysis capabilities; the generic
 * agent composes those tools; this adapter stores setup-phase Read evidence
 * for downstream AssetPack synthesis phases.
 */

import { bitcodeSetupReadComprehensionAgent } from '@bitcode/generic-agents-read-comprehension';
import { shouldUseAssetPackPtrr } from '../../runtime-inference-policy';

export const AssetPackComprehendReadAgent = bitcodeSetupReadComprehensionAgent;

// Wrapper export that stores classification into execution state
export async function runComprehendReadAgent(input: any, execution: any) {
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
  const out = shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_COMPREHEND_READ_USE_PTRR')
    ? await AssetPackComprehendReadAgent(agentInput, execution)
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

export const AssetPackComprehendReadDefinitionAgent = AssetPackComprehendReadAgent;
export default runComprehendReadAgent;

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
    'Depository candidate evidence must be proof-bearing and relevant to the expressed Read.',
    'AssetPack synthesis must remain source-bound and must not cite frontier, mock, or unrelated deposits.',
    'Finish may ship only after validation records proof, telemetry, and delivery readiness.',
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
    commercial_accountability: {
      provider: 'Bitcode pipeline harness',
      customer_outcome: 'A high-quality, proof-bearing AssetPack fit or explicit blocked/no-worthy-fit evidence.',
      market_infrastructure_standard: 'Source-bound read satisfaction with auditable telemetry and ledger synchronization.'
    },
    comprehension: {
      intent: 'Synthesize a Read-satisfying AssetPack from deposited repository evidence.',
      goals: [
        'Select worthy depository candidates',
        'Generate source-grounded AssetPack content',
        'Validate proof and delivery readiness',
        'Finish with audit and settlement evidence'
      ],
      requirements: satisfactionCriteria,
      constraints: [
        'No mock or frontier evidence may satisfy the Read',
        'No unrelated repository deposit may be used as a positive fit',
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
      constraints: ['source-bound evidence', 'proof-bearing fit', 'auditable finish', 'ledgerized settlement']
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
