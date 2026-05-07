import {
  getTerminalCommercialTestnetLaunchSurface,
  TERMINAL_COMMERCIAL_TESTNET_LAUNCH_MAP,
} from '@/app/terminal/terminal-commercial-launch-readiness';

describe('Terminal commercial testnet launch map', () => {
  it('locks the launch-readiness rows required after MVP closure', () => {
    expect(TERMINAL_COMMERCIAL_TESTNET_LAUNCH_MAP.map((surface) => surface.id)).toEqual([
      'testnet-first-launch-boundary',
      'commercial-product-story',
      'wallet-btc-btd-readiness',
      'repository-scope-and-github-integration',
      'proof-state-reread-and-operator-flow',
      'exchange-terminal-protocol-interface-alignment',
      'mcp-and-chatgpt-app-connected-interfaces',
      'non-bitcode-fallback-explanations-retired',
    ]);

    expect(getTerminalCommercialTestnetLaunchSurface('testnet-first-launch-boundary')).toMatchObject({
      launchAxis: 'testnet-boundary',
    });
    expect(getTerminalCommercialTestnetLaunchSurface('wallet-btc-btd-readiness')).toMatchObject({
      launchAxis: 'wallet-settlement',
    });
    expect(getTerminalCommercialTestnetLaunchSurface('mcp-and-chatgpt-app-connected-interfaces')).toMatchObject({
      launchAxis: 'connected-interfaces',
    });
  });

  it('keeps each launch row implementation-backed and commercially specific', () => {
    for (const surface of TERMINAL_COMMERCIAL_TESTNET_LAUNCH_MAP) {
      expect(surface.requiredPosture.length).toBeGreaterThan(80);
      expect(surface.sourceBasis.length).toBeGreaterThanOrEqual(4);
    }

    expect(getTerminalCommercialTestnetLaunchSurface('testnet-first-launch-boundary')?.requiredPosture).toContain(
      'testnet-first',
    );
    expect(getTerminalCommercialTestnetLaunchSurface('wallet-btc-btd-readiness')?.requiredPosture).toContain(
      'BTC fee liquidity',
    );
    expect(getTerminalCommercialTestnetLaunchSurface('wallet-btc-btd-readiness')?.requiredPosture).toContain(
      'non-fungible $BTD share/read-right holdings',
    );
    expect(
      getTerminalCommercialTestnetLaunchSurface('repository-scope-and-github-integration')?.requiredPosture,
    ).toContain('GitHub reconnect truth');
    expect(
      getTerminalCommercialTestnetLaunchSurface('proof-state-reread-and-operator-flow')?.requiredPosture,
    ).toContain('route reread');
    expect(
      getTerminalCommercialTestnetLaunchSurface('mcp-and-chatgpt-app-connected-interfaces')?.requiredPosture,
    ).toContain('not as parallel Exchange owners');
    expect(
      getTerminalCommercialTestnetLaunchSurface('non-bitcode-fallback-explanations-retired')?.requiredPosture,
    ).toContain('without non-Bitcode compatibility fallback semantics');
  });
});
