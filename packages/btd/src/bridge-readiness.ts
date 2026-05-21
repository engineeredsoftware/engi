import { createHash } from 'crypto';
import { assertNonEmptyString } from './constants';

export const BRIDGE_READINESS_RESEARCH_PATHS = [
  'bitcoin_taproot_anchor',
  'bitvm_execution_bridge',
  'bsc_opbnb_distribution',
  'binance_web3_wallet_distribution',
  'future_distribution_path',
] as const;

export type BridgeReadinessResearchPath = (typeof BRIDGE_READINESS_RESEARCH_PATHS)[number];

export type BridgeReadinessFeasibility =
  | 'research_feasible'
  | 'experimental'
  | 'unknown'
  | 'not_currently_feasible';

export type BridgeReadinessRiskKind =
  | 'chain_of_record_confusion'
  | 'custody_or_wallet_boundary'
  | 'contract_security'
  | 'settlement_finality'
  | 'provider_dependence'
  | 'proof_gap'
  | 'operational_repair_gap'
  | 'liquidity_or_distribution';

export interface BridgeReadinessResearchRisk {
  riskKind: BridgeReadinessRiskKind;
  summary: string;
  blockingAdmission: boolean;
}

export interface BridgeReadinessResearchRecordInput {
  path: BridgeReadinessResearchPath;
  label?: string;
  feasibility?: BridgeReadinessFeasibility;
  summary?: string;
  risks?: BridgeReadinessResearchRisk[];
  rereviewTriggers?: string[];
  requiredProofBeforeAdmission?: string[];
  requiredPolicyBeforeAdmission?: string[];
  currentNonAdmission?: boolean;
  chainOfRecordAdmitted?: boolean;
}

export interface BridgeReadinessResearchRecord {
  kind: 'btd.bridge_readiness_research_record';
  path: BridgeReadinessResearchPath;
  label: string;
  feasibility: BridgeReadinessFeasibility;
  summary: string;
  risks: BridgeReadinessResearchRisk[];
  rereviewTriggers: string[];
  requiredProofBeforeAdmission: string[];
  requiredPolicyBeforeAdmission: string[];
  currentNonAdmission: true;
  chainOfRecordAdmitted: false;
  currentAdmissionState: 'research_only';
  researchRoot: string;
}

export interface BridgeReadinessResearchPosture {
  kind: 'btd.bridge_readiness_research_posture';
  postureId: string;
  activeBtdChainOfRecord: 'bitcoin_btd_registry';
  bridgeChainOfRecordTruth: 'no_bridge_chain_of_record';
  records: BridgeReadinessResearchRecord[];
  allRequiredPathsCovered: boolean;
  allNonAdmitted: boolean;
  admissionBlockers: string[];
  policyRoot: string;
  proofRoot: string;
  issuedAt: string;
}

const DEFAULT_BRIDGE_RESEARCH_RECORDS: Record<
  BridgeReadinessResearchPath,
  Omit<
    BridgeReadinessResearchRecordInput,
    'path' | 'currentNonAdmission' | 'chainOfRecordAdmitted'
  >
> = {
  bitcoin_taproot_anchor: {
    label: 'Taproot BTD anchor research',
    feasibility: 'research_feasible',
    summary:
      'Research path for Bitcoin-native commitments that may later deepen BTD anchoring without changing current chain-of-record truth.',
    risks: [
      {
        riskKind: 'chain_of_record_confusion',
        summary:
          'Operators or readers could mistake an auxiliary Taproot commitment path for current BTD chain-of-record truth.',
        blockingAdmission: true,
      },
      {
        riskKind: 'proof_gap',
        summary:
          'Admission requires replayable proof that the anchor binds the same BTD receipt root and does not create a second ownership source.',
        blockingAdmission: true,
      },
    ],
    rereviewTriggers: [
      'A Taproot anchor proof can be replayed from BTD receipt roots without exposing protected source.',
      'Wallet signer recovery can prepare, sign, broadcast, and observe finality with no server custody.',
    ],
    requiredProofBeforeAdmission: [
      'Receipt-root-to-Taproot-commitment replay proof',
      'PSBT/signer/no-custody proof',
      'Reorg and replacement repair proof',
    ],
    requiredPolicyBeforeAdmission: [
      'Operator approval policy for value-bearing networks',
      'Reader/depositor disclosure boundary policy',
    ],
  },
  bitvm_execution_bridge: {
    label: 'BitVM execution bridge research',
    feasibility: 'experimental',
    summary:
      'Research path for future proof-carrying execution commitments; it is not a current BTD ownership, fee, or delivery rail.',
    risks: [
      {
        riskKind: 'proof_gap',
        summary:
          'Execution claims need executable dispute and replay evidence before they can affect BTD settlement.',
        blockingAdmission: true,
      },
      {
        riskKind: 'operational_repair_gap',
        summary:
          'Repair, timeout, challenge, and operator-escalation paths are not admitted in the current protocol rail.',
        blockingAdmission: true,
      },
    ],
    rereviewTriggers: [
      'Executable BitVM proof transcript can be generated from source-safe BTD receipt inputs.',
      'Timeout and challenge states can be represented in ledger/database reconciliation without unlock ambiguity.',
    ],
    requiredProofBeforeAdmission: [
      'Execution transcript replay proof',
      'Challenge/timeout repair proof',
      'Source-safe telemetry proof',
    ],
    requiredPolicyBeforeAdmission: [
      'Bridge operator responsibility policy',
      'Dispute and repair authority policy',
    ],
  },
  bsc_opbnb_distribution: {
    label: 'BSC/opBNB distribution research',
    feasibility: 'unknown',
    summary:
      'Research path for future distribution or market reach; it cannot mint, wrap, transfer, or settle current BTD rights.',
    risks: [
      {
        riskKind: 'contract_security',
        summary:
          'Contract, wrapper, and bridge contracts would need audited fail-closed behavior before any rights projection.',
        blockingAdmission: true,
      },
      {
        riskKind: 'chain_of_record_confusion',
        summary:
          'A distribution projection could be mistaken for BTD ownership unless the Bitcoin/BTD registry remains authoritative.',
        blockingAdmission: true,
      },
      {
        riskKind: 'liquidity_or_distribution',
        summary:
          'Distribution utility cannot outrun deterministic source-to-shares and paid unlock accounting.',
        blockingAdmission: true,
      },
    ],
    rereviewTriggers: [
      'A wrapped/distribution receipt can prove it is a projection and not BTD chain-of-record ownership.',
      'Ledger reconciliation can quarantine drift between a distribution projection and the BTD registry.',
    ],
    requiredProofBeforeAdmission: [
      'Wrapper/projection non-authority proof',
      'Contract audit receipt',
      'Cross-ledger reconciliation and quarantine proof',
    ],
    requiredPolicyBeforeAdmission: [
      'Distribution projection disclosure policy',
      'Mainnet operational approval policy',
    ],
  },
  binance_web3_wallet_distribution: {
    label: 'Binance Web3 Wallet distribution research',
    feasibility: 'unknown',
    summary:
      'Research path for wallet distribution and user experience; it is not current custody, signing, settlement, or ownership authority.',
    risks: [
      {
        riskKind: 'custody_or_wallet_boundary',
        summary:
          'Wallet integration must preserve no-server-custody, signer recovery, and reader/depositor authority boundaries.',
        blockingAdmission: true,
      },
      {
        riskKind: 'provider_dependence',
        summary:
          'Provider-specific availability and policy changes cannot become protocol truth without independent fallback evidence.',
        blockingAdmission: true,
      },
    ],
    rereviewTriggers: [
      'Wallet capability discovery can prove signer, network, address, and session state without secrets.',
      'Provider-specific failures can be represented as blocked-readiness receipts instead of silent unlock failure.',
    ],
    requiredProofBeforeAdmission: [
      'Wallet capability and signer recovery proof',
      'Provider outage and fallback proof',
      'No-secret telemetry proof',
    ],
    requiredPolicyBeforeAdmission: [
      'Provider boundary disclosure policy',
      'Wallet capability admission policy',
    ],
  },
  future_distribution_path: {
    label: 'Future distribution path research',
    feasibility: 'unknown',
    summary:
      'Reserved posture for later distribution or bridge candidates; it exists so future research is reviewed before implementation.',
    risks: [
      {
        riskKind: 'proof_gap',
        summary:
          'Unknown future paths have no admitted proof, policy, repair, or disclosure semantics in current Bitcode.',
        blockingAdmission: true,
      },
      {
        riskKind: 'chain_of_record_confusion',
        summary:
          'Any future path must start as a projection or research record and cannot become current BTD truth by naming alone.',
        blockingAdmission: true,
      },
    ],
    rereviewTriggers: [
      'A concrete candidate path has source-safe proof, ledger reconciliation, and operational policy drafts.',
      'A future version explicitly scopes bridge or distribution admission as a promoted protocol change.',
    ],
    requiredProofBeforeAdmission: [
      'Candidate-specific proof-family definition',
      'Ledger reconciliation proof',
      'Disclosure and no-secret telemetry proof',
    ],
    requiredPolicyBeforeAdmission: [
      'Future bridge admission policy',
      'Operator approval and rollback policy',
    ],
  },
};

export function buildBridgeReadinessResearchPosture(input: {
  postureId: string;
  records?: BridgeReadinessResearchRecordInput[];
  policyRoot?: string;
  issuedAt?: string;
}): BridgeReadinessResearchPosture {
  const postureId = assertNonEmptyString(input.postureId, 'postureId');
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const policyRoot = assertSourceSafeBridgeText(
    input.policyRoot ?? stableBridgeReadinessRoot('bridge-readiness-policy', [postureId]),
    'policyRoot',
  );
  const overrides = new Map<BridgeReadinessResearchPath, BridgeReadinessResearchRecordInput>();

  for (const record of input.records ?? []) {
    assertBridgeReadinessPath(record.path);
    if (overrides.has(record.path)) {
      throw new Error(`Duplicate bridge-readiness research path: ${record.path}.`);
    }
    overrides.set(record.path, record);
  }

  const records = BRIDGE_READINESS_RESEARCH_PATHS.map((path) =>
    buildBridgeReadinessResearchRecord({
      path,
      ...DEFAULT_BRIDGE_RESEARCH_RECORDS[path],
      ...(overrides.get(path) ?? {}),
    }),
  );
  const allRequiredPathsCovered = requiredBridgePathsCovered(records);
  const admissionBlockers = records.flatMap((record) =>
    record.risks
      .filter((risk) => risk.blockingAdmission)
      .map((risk) => `${record.path}:${risk.riskKind}`),
  );
  const allNonAdmitted = records.every(
    (record) => record.currentNonAdmission === true && record.chainOfRecordAdmitted === false,
  );
  const proofRoot = stableBridgeReadinessRoot('bridge-readiness-posture', [
    postureId,
    policyRoot,
    issuedAt,
    ...records.map((record) => record.researchRoot),
    ...admissionBlockers,
  ]);

  const posture: BridgeReadinessResearchPosture = {
    kind: 'btd.bridge_readiness_research_posture',
    postureId,
    activeBtdChainOfRecord: 'bitcoin_btd_registry',
    bridgeChainOfRecordTruth: 'no_bridge_chain_of_record',
    records,
    allRequiredPathsCovered,
    allNonAdmitted,
    admissionBlockers,
    policyRoot,
    proofRoot,
    issuedAt,
  };

  return assertNoBridgeChainOfRecordAdmission(posture);
}

export function assertNoBridgeChainOfRecordAdmission(
  posture: BridgeReadinessResearchPosture,
): BridgeReadinessResearchPosture {
  if (posture.kind !== 'btd.bridge_readiness_research_posture') {
    throw new Error('Invalid bridge-readiness research posture kind.');
  }
  if (posture.activeBtdChainOfRecord !== 'bitcoin_btd_registry') {
    throw new Error('Bridge-readiness posture must keep the Bitcoin BTD registry as chain-of-record.');
  }
  if (posture.bridgeChainOfRecordTruth !== 'no_bridge_chain_of_record') {
    throw new Error('Bridge-readiness posture must not admit a bridge chain of record.');
  }
  if (!posture.allRequiredPathsCovered) {
    throw new Error('Bridge-readiness posture must cover every required research path.');
  }
  if (!posture.allNonAdmitted) {
    throw new Error('Bridge-readiness posture contains an admitted bridge path.');
  }
  for (const record of posture.records) {
    if (record.currentNonAdmission !== true || record.chainOfRecordAdmitted !== false) {
      throw new Error(`Bridge-readiness record ${record.path} is not research-only.`);
    }
  }

  return posture;
}

export function bridgeReadinessPostureToPolicySummary(
  posture: BridgeReadinessResearchPosture,
) {
  const checked = assertNoBridgeChainOfRecordAdmission(posture);

  return {
    postureId: checked.postureId,
    activeBtdChainOfRecord: checked.activeBtdChainOfRecord,
    bridgeChainOfRecordTruth: checked.bridgeChainOfRecordTruth,
    pathCount: checked.records.length,
    allNonAdmitted: checked.allNonAdmitted,
    admissionBlockerCount: checked.admissionBlockers.length,
    proofRoot: checked.proofRoot,
  };
}

function buildBridgeReadinessResearchRecord(
  input: BridgeReadinessResearchRecordInput,
): BridgeReadinessResearchRecord {
  assertBridgeReadinessPath(input.path);
  if (input.currentNonAdmission === false) {
    throw new Error(`Bridge-readiness path ${input.path} must remain non-admitted in V30.`);
  }
  if (input.chainOfRecordAdmitted === true) {
    throw new Error(`Bridge-readiness path ${input.path} cannot be current BTD chain-of-record truth.`);
  }

  const label = assertSourceSafeBridgeText(input.label, `${input.path}.label`);
  const summary = assertSourceSafeBridgeText(input.summary, `${input.path}.summary`);
  const feasibility = assertBridgeReadinessFeasibility(input.feasibility ?? 'unknown');
  const risks = assertBridgeReadinessRisks(input.path, input.risks ?? []);
  const rereviewTriggers = assertSourceSafeList(
    input.rereviewTriggers ?? [],
    `${input.path}.rereviewTriggers`,
  );
  const requiredProofBeforeAdmission = assertSourceSafeList(
    input.requiredProofBeforeAdmission ?? [],
    `${input.path}.requiredProofBeforeAdmission`,
  );
  const requiredPolicyBeforeAdmission = assertSourceSafeList(
    input.requiredPolicyBeforeAdmission ?? [],
    `${input.path}.requiredPolicyBeforeAdmission`,
  );
  if (!risks.some((risk) => risk.blockingAdmission)) {
    throw new Error(`Bridge-readiness path ${input.path} requires at least one blocking admission risk.`);
  }
  if (!rereviewTriggers.length || !requiredProofBeforeAdmission.length) {
    throw new Error(`Bridge-readiness path ${input.path} requires rereview triggers and proof requirements.`);
  }

  const researchRoot = stableBridgeReadinessRoot('bridge-readiness-record', [
    input.path,
    label,
    feasibility,
    summary,
    ...risks.map((risk) => `${risk.riskKind}:${risk.blockingAdmission}:${risk.summary}`),
    ...rereviewTriggers,
    ...requiredProofBeforeAdmission,
    ...requiredPolicyBeforeAdmission,
  ]);

  return {
    kind: 'btd.bridge_readiness_research_record',
    path: input.path,
    label,
    feasibility,
    summary,
    risks,
    rereviewTriggers,
    requiredProofBeforeAdmission,
    requiredPolicyBeforeAdmission,
    currentNonAdmission: true,
    chainOfRecordAdmitted: false,
    currentAdmissionState: 'research_only',
    researchRoot,
  };
}

function requiredBridgePathsCovered(records: BridgeReadinessResearchRecord[]): boolean {
  const observed = new Set(records.map((record) => record.path));

  return BRIDGE_READINESS_RESEARCH_PATHS.every((path) => observed.has(path));
}

function assertBridgeReadinessPath(path: unknown): BridgeReadinessResearchPath {
  if (!BRIDGE_READINESS_RESEARCH_PATHS.includes(path as BridgeReadinessResearchPath)) {
    throw new Error(`Unsupported bridge-readiness research path: ${String(path)}.`);
  }

  return path as BridgeReadinessResearchPath;
}

function assertBridgeReadinessFeasibility(value: unknown): BridgeReadinessFeasibility {
  if (
    ![
      'research_feasible',
      'experimental',
      'unknown',
      'not_currently_feasible',
    ].includes(value as BridgeReadinessFeasibility)
  ) {
    throw new Error(`Unsupported bridge-readiness feasibility: ${String(value)}.`);
  }

  return value as BridgeReadinessFeasibility;
}

function assertBridgeReadinessRiskKind(value: unknown): BridgeReadinessRiskKind {
  if (
    ![
      'chain_of_record_confusion',
      'custody_or_wallet_boundary',
      'contract_security',
      'settlement_finality',
      'provider_dependence',
      'proof_gap',
      'operational_repair_gap',
      'liquidity_or_distribution',
    ].includes(value as BridgeReadinessRiskKind)
  ) {
    throw new Error(`Unsupported bridge-readiness risk kind: ${String(value)}.`);
  }

  return value as BridgeReadinessRiskKind;
}

function assertBridgeReadinessRisks(
  path: BridgeReadinessResearchPath,
  risks: BridgeReadinessResearchRisk[],
): BridgeReadinessResearchRisk[] {
  if (!Array.isArray(risks) || risks.length === 0) {
    throw new Error(`Bridge-readiness path ${path} requires at least one risk.`);
  }

  return risks.map((risk, index) => ({
    riskKind: assertBridgeReadinessRiskKind(risk.riskKind),
    summary: assertSourceSafeBridgeText(risk.summary, `${path}.risks.${index}.summary`),
    blockingAdmission: Boolean(risk.blockingAdmission),
  }));
}

function assertSourceSafeList(values: string[], label: string): string[] {
  if (!Array.isArray(values)) {
    throw new Error(`${label} must be an array.`);
  }

  return values.map((value, index) => assertSourceSafeBridgeText(value, `${label}.${index}`));
}

function assertSourceSafeBridgeText(value: unknown, label: string): string {
  const text = assertNonEmptyString(value, label);
  if (/(sk-(?:proj-)?[A-Za-z0-9_-]{16,}|sb_secret__|eyJ[a-zA-Z0-9_-]{20,})/u.test(text)) {
    throw new Error(`${label} must not contain secret material.`);
  }

  return text;
}

function stableBridgeReadinessRoot(scope: string, parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('\u001f')).digest('hex');

  return `btd-proof-root:${scope}:${hash}`;
}
