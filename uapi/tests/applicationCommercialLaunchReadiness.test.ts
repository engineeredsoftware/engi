import {
  getSeventhGateCommercialTestnetLaunchSurface,
  SEVENTH_GATE_COMMERCIAL_TESTNET_LAUNCH_MAP,
} from '@/app/application/application-commercial-launch-readiness';

describe('seventh-gate commercial testnet launch map', () => {
  it('locks the launch-readiness rows required after MVP closure', () => {
    expect(SEVENTH_GATE_COMMERCIAL_TESTNET_LAUNCH_MAP.map((surface) => surface.id)).toEqual([
      'testnet-first-launch-boundary',
      'commercial-product-story',
      'wallet-btc-btd-readiness',
      'repository-scope-and-github-integration',
      'proof-state-reread-and-operator-flow',
      'exchange-terminal-protocol-interface-alignment',
      'mcp-and-chatgpt-app-connected-interfaces',
      'old-world-compatibility-explanations-retired',
    ]);

    expect(getSeventhGateCommercialTestnetLaunchSurface('testnet-first-launch-boundary')).toMatchObject({
      launchAxis: 'testnet-boundary',
    });
    expect(getSeventhGateCommercialTestnetLaunchSurface('wallet-btc-btd-readiness')).toMatchObject({
      launchAxis: 'wallet-settlement',
    });
    expect(getSeventhGateCommercialTestnetLaunchSurface('mcp-and-chatgpt-app-connected-interfaces')).toMatchObject({
      launchAxis: 'connected-interfaces',
    });
  });

  it('keeps each launch row implementation-backed and commercially specific', () => {
    for (const surface of SEVENTH_GATE_COMMERCIAL_TESTNET_LAUNCH_MAP) {
      expect(surface.requiredPosture.length).toBeGreaterThan(80);
      expect(surface.sourceBasis.length).toBeGreaterThanOrEqual(4);
    }

    expect(getSeventhGateCommercialTestnetLaunchSurface('testnet-first-launch-boundary')?.requiredPosture).toContain(
      'testnet-first',
    );
    expect(getSeventhGateCommercialTestnetLaunchSurface('wallet-btc-btd-readiness')?.requiredPosture).toContain(
      'BTC fee liquidity',
    );
    expect(getSeventhGateCommercialTestnetLaunchSurface('wallet-btc-btd-readiness')?.requiredPosture).toContain(
      'non-fungible $BTD share/read-right holdings',
    );
    expect(
      getSeventhGateCommercialTestnetLaunchSurface('repository-scope-and-github-integration')?.requiredPosture,
    ).toContain('GitHub reconnect truth');
    expect(
      getSeventhGateCommercialTestnetLaunchSurface('proof-state-reread-and-operator-flow')?.requiredPosture,
    ).toContain('route reread');
    expect(
      getSeventhGateCommercialTestnetLaunchSurface('mcp-and-chatgpt-app-connected-interfaces')?.requiredPosture,
    ).toContain('not as parallel Exchange owners');
    expect(
      getSeventhGateCommercialTestnetLaunchSurface('old-world-compatibility-explanations-retired')?.requiredPosture,
    ).toContain('without old-world compatibility fallback');
  });
});
