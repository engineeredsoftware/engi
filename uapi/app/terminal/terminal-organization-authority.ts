import type { TerminalRunDetailSnapshot, TerminalJsonRecord } from './terminal-transaction-detail-snapshot';

export type TerminalOrganizationAuthorityDecision = {
  id: string;
  title: string;
  summary: string;
  supportingText?: string;
};

export type TerminalOrganizationAuthorityProjection = {
  state: 'allowed' | 'denied' | 'not_projected';
  stateLabel: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  decisions: TerminalOrganizationAuthorityDecision[];
  blockers: string[];
  proofRoots: TerminalOrganizationAuthorityDecision[];
  payload: unknown;
};

function isRecord(value: unknown): value is TerminalJsonRecord {
  return typeof value === 'object' && value !== null;
}

function stringValue(value: unknown, fallback = 'n/a') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function arrayValue(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function nestedRecord(value: unknown, key: string): TerminalJsonRecord | null {
  return isRecord(value) && isRecord(value[key]) ? value[key] as TerminalJsonRecord : null;
}

function formatDecisionTitle(decision: TerminalJsonRecord) {
  const action = stringValue(decision.action, 'unknown action').replaceAll('_', ' ');
  const surface = stringValue(decision.interfaceSurface, 'interface');
  return `${surface} · ${action}`;
}

function decisionSummary(decision: TerminalJsonRecord) {
  const state = stringValue(decision.decision, 'not_projected');
  const reason = stringValue(decision.reason, 'authority evidence missing');
  const visibility = stringValue(decision.sourceVisibility, 'source_safe_preview');
  return `${state} · ${reason} · ${visibility}`;
}

function readProofRoot(decision: TerminalJsonRecord, key: string) {
  const proofRoots = nestedRecord(decision, 'proofRoots');
  return proofRoots ? stringValue(proofRoots[key], '') : '';
}

function buildProofRootItems(decisions: TerminalJsonRecord[]): TerminalOrganizationAuthorityDecision[] {
  const roots = decisions.flatMap((decision) => {
    const title = formatDecisionTitle(decision);
    return [
      ['authorityRoot', readProofRoot(decision, 'authorityRoot')],
      ['roleRoot', readProofRoot(decision, 'roleRoot')],
      ['permissionRoot', readProofRoot(decision, 'permissionRoot')],
      ['readAccessRoot', readProofRoot(decision, 'readAccessRoot')],
      ['interfaceRoot', readProofRoot(decision, 'interfaceRoot')],
    ].map(([kind, root]) => ({
      id: `${title}:${kind}:${root}`,
      title: `${title} ${kind}`,
      summary: root || 'n/a',
    }));
  });

  return roots.filter((root) => root.summary !== 'n/a');
}

export function buildTerminalOrganizationAuthorityProjection(
  detail: TerminalRunDetailSnapshot | null,
): TerminalOrganizationAuthorityProjection {
  const authorityRecords = detail?.organizationAuthority ?? [];

  if (!authorityRecords.length) {
    return {
      state: 'not_projected',
      stateLabel: 'Not projected',
      summary:
        'Organization permission authority is not attached to this activity yet. Terminal keeps action controls source-safe until role, license, and interface evidence are projected.',
      metrics: [
        { label: 'State', value: 'Not projected' },
        { label: 'Decisions', value: '0' },
        { label: 'Proof roots', value: '0' },
      ],
      decisions: [],
      blockers: ['No organization authority decision was readable from this activity payload.'],
      proofRoots: [],
      payload: {
        organizationAuthority: null,
        ledgerSettlement: detail?.ledgerSettlement ?? null,
      },
    };
  }

  const denied = authorityRecords.filter((decision) => stringValue(decision.decision, '') === 'denied');
  const allowed = authorityRecords.filter((decision) => stringValue(decision.decision, '') === 'allowed');
  const proofRoots = buildProofRootItems(authorityRecords);
  const blockers = denied.flatMap((decision) => {
    const reasons = arrayValue(decision.reasons)
      .map((reason) => stringValue(reason, ''))
      .filter(Boolean);
    return reasons.length ? reasons : [stringValue(decision.reason, 'authority denied')];
  });
  const state = denied.length ? 'denied' : allowed.length ? 'allowed' : 'not_projected';

  return {
    state,
    stateLabel: state === 'allowed' ? 'Allowed' : state === 'denied' ? 'Denied' : 'Not projected',
    summary:
      state === 'allowed'
        ? 'Registry-derived organization role, read-license, settlement, and interface authority admit the projected action.'
        : 'One or more organization authority decisions block protected-source action until role, license, settlement, confirmation, or interface evidence is repaired.',
    metrics: [
      { label: 'State', value: state === 'allowed' ? 'Allowed' : state === 'denied' ? 'Denied' : 'Not projected' },
      { label: 'Allowed', value: String(allowed.length) },
      { label: 'Denied', value: String(denied.length) },
      { label: 'Proof roots', value: String(proofRoots.length) },
    ],
    decisions: authorityRecords.map((decision) => ({
      id: `${formatDecisionTitle(decision)}:${stringValue(decision.targetAnchor, 'target')}`,
      title: formatDecisionTitle(decision),
      summary: decisionSummary(decision),
      supportingText: stringValue(decision.targetAnchor, ''),
    })),
    blockers,
    proofRoots,
    payload: {
      organizationAuthority: authorityRecords,
      ledgerSettlement: detail?.ledgerSettlement ?? null,
      bitcodeActivityState: detail?.bitcodeActivityState ?? null,
    },
  };
}
