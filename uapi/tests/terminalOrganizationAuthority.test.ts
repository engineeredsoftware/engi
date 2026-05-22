import { buildTerminalOrganizationAuthorityProjection } from '@/app/terminal/terminal-organization-authority';
import type { TerminalRunDetailSnapshot } from '@/app/terminal/terminal-transaction-detail-snapshot';
import {
  buildBtdInterfaceAuthorizationPolicy,
  getBtdInterfaceAuthorizationPolicyFixture,
  renderBtdInterfaceAuthorizationDeniedState,
} from '@bitcode/btd/interface-authorization-policy';
import {
  buildBtdAssetPackRightsInterfaceContract,
  buildBtdReadLicenseInterfaceContract,
  getBtdReadLicenseAssetPackRightsInterfaceFixture,
} from '@bitcode/btd/read-license-assetpack-rights-contract';
import {
  buildBtdApiSchemaCompatibilityMatrix,
  getBtdApiSchemaCompatibilityRow,
} from '@bitcode/btd/api-schema-compatibility-matrix';
import {
  buildBtdInterfaceTelemetryProofHookRegistry,
  getBtdInterfaceTelemetryProofHook,
} from '@bitcode/btd/interface-telemetry-proof-hook';
import {
  buildBtdInterfaceConsumerUxRegressionProof,
  getBtdInterfaceConsumerUxRegressionRow,
} from '@bitcode/btd/interface-consumer-ux-regression-proof';

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
  it('shares the package-owned InterfaceAuthorizationPolicy fixture for Terminal BTC fee admission', () => {
    const fixture = getBtdInterfaceAuthorizationPolicyFixture('terminal-btc-fee-allowed');
    const policy = buildBtdInterfaceAuthorizationPolicy(fixture.input);

    expect(fixture.fixturePath).toBe('uapi/tests/terminalOrganizationAuthority.test.ts');
    expect(policy).toMatchObject({
      interfaceSurface: 'terminal',
      action: 'pay_btc_fee',
      decision: 'allowed',
      walletCapability: {
        state: 'verified',
        walletId: 'wallet-terminal-reader',
        canSignBtc: true,
      },
      actor: {
        organizationId: 'org-terminal-1',
        teamId: 'team-terminal-reading',
        organizationRole: 'admin',
      },
    });
  });

  it('shares the package-owned ReadLicense and AssetPackRights fixture for paid Terminal delivery', () => {
    const fixture = getBtdReadLicenseAssetPackRightsInterfaceFixture('terminal-paid-rights-delivery');
    const readLicense = buildBtdReadLicenseInterfaceContract(fixture.readLicenseInput);
    const rights = buildBtdAssetPackRightsInterfaceContract(fixture.assetPackRightsInput);

    expect(fixture.fixturePath).toBe('uapi/tests/terminalOrganizationAuthority.test.ts');
    expect(readLicense).toMatchObject({
      interfaceSurface: 'terminal',
      action: 'deliver_asset_pack',
      decision: 'paid_unlock_admitted',
      licensePosture: 'licensed_read',
      protectedSourceVisible: true,
    });
    expect(rights).toMatchObject({
      interfaceSurface: 'terminal',
      decision: 'rights_delivery_admitted',
      rightsPosture: 'rights_transferred',
      btcSettlementFinality: 'confirmed',
      protectedSourceVisible: true,
    });
  });

  it('shares the package-owned API schema compatibility matrix for Terminal handoff rows', () => {
    const matrix = buildBtdApiSchemaCompatibilityMatrix();
    const row = getBtdApiSchemaCompatibilityRow('terminal-handoff-preview-blocked');

    expect(matrix.observedConsumerSurfaces).toContain('terminal_handoff');
    expect(row).toMatchObject({
      consumerSurface: 'terminal_handoff',
      path: 'terminal://reading/asset-pack-preview',
      compatibilityStatus: 'blocked_until_rights',
      examplePosture: 'blocked',
      protectedSourceVisible: false,
    });
  });

  it('shares the package-owned InterfaceTelemetryProofHook for Terminal handoff replay', () => {
    const registry = buildBtdInterfaceTelemetryProofHookRegistry();
    const hook = getBtdInterfaceTelemetryProofHook('interface.telemetry.terminal-reading-handoff');

    expect(registry.observedInterfaceIds).toContain('terminal_handoff');
    expect(hook).toMatchObject({
      interfaceId: 'terminal_handoff',
      actionId: 'terminal.reading.assetPackPreview',
      posture: 'blocked',
      denialReason: 'assetpack-source-locked-until-settlement',
    });
    expect(hook.roots.ledgerRoot).toMatch(/^ledger-root:/);
    expect(hook.roots.databaseRoot).toMatch(/^database-root:/);
    expect(hook.roots.objectStorageRoot).toMatch(/^object-storage-root:/);
    expect(hook.replayCommand).toContain('terminalOrganizationAuthority.test.ts');
  });

  it('shares the package-owned InterfaceConsumerUxRegressionProof for Terminal handoff readability', () => {
    const proof = buildBtdInterfaceConsumerUxRegressionProof();
    const row = getBtdInterfaceConsumerUxRegressionRow('interface.consumer.terminal-preview-blocked');

    expect(proof.observedSurfaces).toContain('terminal_handoff');
    expect(row).toMatchObject({
      surface: 'terminal_handoff',
      consumerPath: 'terminal://reading/asset-pack-preview',
      posture: 'blocked_preview',
      visibilityBoundary: 'blocked_until_settlement',
      denialCode: 'ASSETPACK_SOURCE_LOCKED_UNTIL_SETTLEMENT',
      protectedSourceVisible: false,
      promptBodyVisible: false,
    });
    expect(row.sourceSafeSummary).toMatch(/measurements/i);
    expect(row.proofRoots).toEqual(
      expect.arrayContaining(['preview-root:terminal-reading', 'settlement-root:terminal-reading']),
    );
    expect(row.repairSteps).toEqual(
      expect.arrayContaining(['settle-btc-fee-to-unlock-rights']),
    );
    expect(row.feeRightsPreview).toMatchObject({
      previewState: 'blocked_until_rights',
      rightsPosture: 'settlement_pending',
    });
  });

  it('renders stale Terminal authority as a readable fail-closed denial', () => {
    const fixture = getBtdInterfaceAuthorizationPolicyFixture('terminal-stale-authority-denied');
    const policy = buildBtdInterfaceAuthorizationPolicy(fixture.input);
    const denied = renderBtdInterfaceAuthorizationDeniedState(policy);

    expect(policy.decision).toBe('denied');
    expect(denied).toMatchObject({
      status: 'denied',
      code: 'STALE_AUTHORITY',
      repairActions: ['refresh-interface-authentication'],
    });
    expect(denied.message).toMatch(/refresh the session/i);
  });

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

  it('projects package-owned policy authority with team, member, multi-sig, and denial reasons', () => {
    const projection = buildTerminalOrganizationAuthorityProjection(
      detailWithAuthority([
        {
          kind: 'btd_organization_policy_authority',
          actorId: 'user-1',
          organizationId: 'org-1',
          teamId: 'team-core',
          memberId: 'member-operator',
          role: 'admin',
          permissionGrants: ['settlement:pay_btc_fee'],
          explicitGrantSet: [],
          walletBindingRequired: true,
          walletBindingState: 'missing',
          multiSigPosture: {
            state: 'approval_required',
            required: true,
            requiredSignatures: 2,
            presentSignatures: 1,
            approverIds: ['member-operator'],
            requiredAction: 'collect_signatures',
          },
          policy: {
            policyId: 'policy-1',
            policyHash: 'policy-hash-1',
            action: 'pay_btc_fee',
            interfaceSurface: 'terminal',
          },
          actionDecision: {
            decision: 'denied',
            interfaceSurface: 'terminal',
            action: 'pay_btc_fee',
            reason: 'wallet_binding_missing',
            reasons: ['wallet_binding_missing', 'explicit_confirmation_required'],
            sourceVisibility: 'source_safe_preview',
            targetAnchor: 'organization:org-1',
            proofRoots: {
              authorityRoot: 'btd-proof-root:organization-interface-authority:abc123',
            },
          },
          policyDecision: 'denied',
          denialReason: 'wallet_binding_missing',
          denialReasons: ['wallet_binding_missing', 'multisig_approval_required'],
          recoveryRoute: '/terminal?auxillary-open-to=wallet',
          sourceVisibility: 'blocked',
          authorityRoot: 'btd-proof-root:organization-policy-authority:def456',
        },
      ]),
    );

    expect(projection.state).toBe('denied');
    expect(projection.metrics).toEqual(
      expect.arrayContaining([
        { label: 'Policy objects', value: '1' },
        { label: 'Multi-sig', value: 'approval_required' },
      ]),
    );
    expect(projection.blockers).toEqual(
      expect.arrayContaining(['wallet_binding_missing', 'multisig_approval_required']),
    );
    expect(projection.decisions.map((decision) => decision.title)).toEqual(
      expect.arrayContaining(['terminal · pay btc fee policy', 'terminal · pay btc fee']),
    );
    expect(projection.proofRoots.map((root) => root.summary)).toEqual(
      expect.arrayContaining(['btd-proof-root:organization-policy-authority:def456']),
    );
  });
});
