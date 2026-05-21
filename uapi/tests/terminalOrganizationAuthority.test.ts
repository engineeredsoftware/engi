import { buildTerminalOrganizationAuthorityProjection } from '@/app/terminal/terminal-organization-authority';
import type { TerminalRunDetailSnapshot } from '@/app/terminal/terminal-transaction-detail-snapshot';

function detailWithAuthority(
  organizationAuthority: TerminalRunDetailSnapshot['organizationAuthority'],
): TerminalRunDetailSnapshot {
  return {
    summary: 'Authority test detail',
    shippables: null,
    assetPackSynthesisArtifacts: null,
    writtenAssets: null,
    deliveryMechanism: null,
    repoSnapshot: null,
    processingStats: {
      time: null,
      tokenTotal: null,
      measuredBtd: null,
      btcFeeUsdEquivalent: null,
      averageLatencyMs: null,
    },
    proofStatus: null,
    closureFocus: null,
    closureFollowThrough: null,
    closureState: null,
    ledgerSettlement: null,
    terminalJournal: null,
    organizationAuthority,
    bitcodeActivityState: null,
    historyItemCount: 0,
    eventCount: 0,
  };
}

describe('terminal organization authority projection', () => {
  it('projects allowed decisions and authority proof roots', () => {
    const projection = buildTerminalOrganizationAuthorityProjection(
      detailWithAuthority([
        {
          decision: 'allowed',
          interfaceSurface: 'mcp',
          action: 'deliver_asset_pack',
          reason: 'role_authorized',
          reasons: ['role_authorized', 'licensed_read_access_authorized'],
          sourceVisibility: 'protected_source_allowed',
          targetAnchor: 'github:engineeredsoftware/ENGI/pull/42',
          proofRoots: {
            authorityRoot: 'btd-proof-root:organization-interface-authority:abc123',
            roleRoot: 'btd-proof-root:organization-role:def456',
            permissionRoot: 'btd-proof-root:organization-permission:ghi789',
          },
        },
      ]),
    );

    expect(projection.state).toBe('allowed');
    expect(projection.metrics).toEqual(expect.arrayContaining([{ label: 'Allowed', value: '1' }]));
    expect(projection.decisions[0]).toMatchObject({
      title: 'mcp · deliver asset pack',
      summary: 'allowed · role_authorized · protected_source_allowed',
    });
    expect(projection.proofRoots.map((root) => root.summary)).toEqual(
      expect.arrayContaining(['btd-proof-root:organization-interface-authority:abc123']),
    );
  });

  it('keeps missing authority visible as a not-projected blocker', () => {
    const projection = buildTerminalOrganizationAuthorityProjection(detailWithAuthority(null));

    expect(projection.state).toBe('not_projected');
    expect(projection.blockers).toEqual([
      'No organization authority decision was readable from this activity payload.',
    ]);
  });
});
