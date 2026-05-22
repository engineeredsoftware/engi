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

function isPolicyAuthority(value: unknown): value is TerminalJsonRecord {
  return isRecord(value) && value.kind === 'btd_organization_policy_authority';
}

function policyAuthorityDecision(value: TerminalJsonRecord): TerminalJsonRecord | null {
  return isRecord(value.actionDecision) ? value.actionDecision as TerminalJsonRecord : null;
}

function formatDecisionTitle(decision: TerminalJsonRecord) {
  const action = stringValue(decision.action, 'unknown action').replaceAll('_', ' ');
  const surface = stringValue(decision.interfaceSurface, 'interface');
  return `${surface} · ${action}`;
}

function formatPolicyAuthorityTitle(authority: TerminalJsonRecord) {
  const policy = nestedRecord(authority, 'policy');
  const action = stringValue(policy?.action, 'unknown action').replaceAll('_', ' ');
  const surface = stringValue(policy?.interfaceSurface, 'interface');
  return `${surface} · ${action} policy`;
}

function decisionSummary(decision: TerminalJsonRecord) {
  const state = stringValue(decision.decision, 'not_projected');
  const reason = stringValue(decision.reason, 'authority evidence missing');
  const visibility = stringValue(decision.sourceVisibility, 'source_safe_preview');
  return `${state} · ${reason} · ${visibility}`;
}

function policyAuthoritySummary(authority: TerminalJsonRecord) {
  const state = stringValue(authority.policyDecision, 'denied');
  const reason = stringValue(authority.denialReason, 'authority evidence missing');
  const visibility = stringValue(authority.sourceVisibility, 'source_safe_preview');
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

function buildPolicyAuthorityProofRootItems(
  authorities: TerminalJsonRecord[],
): TerminalOrganizationAuthorityDecision[] {
  return authorities
    .map((authority) => {
      const title = formatPolicyAuthorityTitle(authority);
      const root = stringValue(authority.authorityRoot, '');
      return {
        id: `${title}:authorityRoot:${root}`,
        title: `${title} authorityRoot`,
        summary: root || 'n/a',
      };
    })
    .filter((root) => root.summary !== 'n/a');
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

  const policyAuthorities = authorityRecords.filter(isPolicyAuthority);
  const decisionRecords = authorityRecords
    .map((record) => (isPolicyAuthority(record) ? policyAuthorityDecision(record) : record))
    .filter((record): record is TerminalJsonRecord => Boolean(record));
  const deniedDecisions = decisionRecords.filter((decision) => stringValue(decision.decision, '') === 'denied');
  const allowedDecisions = decisionRecords.filter((decision) => stringValue(decision.decision, '') === 'allowed');
  const deniedPolicies = policyAuthorities.filter((authority) => stringValue(authority.policyDecision, '') === 'denied');
  const allowedPolicies = policyAuthorities.filter((authority) => stringValue(authority.policyDecision, '') === 'allowed');
  const denied = [...deniedDecisions, ...deniedPolicies];
  const allowed = [...allowedDecisions, ...allowedPolicies];
  const proofRoots = [
    ...buildProofRootItems(decisionRecords),
    ...buildPolicyAuthorityProofRootItems(policyAuthorities),
  ];
  const policyBlockers = deniedPolicies.flatMap((authority) => {
    const reasons = arrayValue(authority.denialReasons)
      .map((reason) => stringValue(reason, ''))
      .filter(Boolean);
    return reasons.length ? reasons : [stringValue(authority.denialReason, 'authority denied')];
  });
  const decisionBlockers = deniedDecisions.flatMap((decision) => {
    const reasons = arrayValue(decision.reasons)
      .map((reason) => stringValue(reason, ''))
      .filter(Boolean);
    return reasons.length ? reasons : [stringValue(decision.reason, 'authority denied')];
  });
  const blockers = [...policyBlockers, ...decisionBlockers];
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
      { label: 'Policy objects', value: String(policyAuthorities.length) },
      { label: 'Multi-sig', value: stringValue(policyAuthorities[0]?.multiSigPosture && (policyAuthorities[0].multiSigPosture as TerminalJsonRecord).state, policyAuthorities.length ? 'n/a' : 'none') },
      { label: 'Proof roots', value: String(proofRoots.length) },
    ],
    decisions: [
      ...policyAuthorities.map((authority) => {
        const policy = nestedRecord(authority, 'policy');
        return {
          id: `${formatPolicyAuthorityTitle(authority)}:${stringValue(authority.authorityRoot, 'authority')}`,
          title: formatPolicyAuthorityTitle(authority),
          summary: policyAuthoritySummary(authority),
          supportingText: [
            stringValue(authority.organizationId, ''),
            stringValue(authority.teamId, ''),
            stringValue(authority.memberId, ''),
            stringValue(policy?.policyId, ''),
          ].filter(Boolean).join(' · '),
        };
      }),
      ...decisionRecords.map((decision) => ({
        id: `${formatDecisionTitle(decision)}:${stringValue(decision.targetAnchor, 'target')}`,
        title: formatDecisionTitle(decision),
        summary: decisionSummary(decision),
        supportingText: stringValue(decision.targetAnchor, ''),
      })),
    ],
    blockers,
    proofRoots,
    payload: {
      organizationAuthority: authorityRecords,
      ledgerSettlement: detail?.ledgerSettlement ?? null,
      bitcodeActivityState: detail?.bitcodeActivityState ?? null,
    },
  };
}
