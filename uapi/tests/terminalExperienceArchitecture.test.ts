import {
  getTerminalMvpSurface,
  TERMINAL_MVP_SURFACE_MAP,
} from '@/app/terminal/terminal-experience-architecture';

describe('Terminal MVP surface map', () => {
  it('locks the Terminal map to activity, transactions, conversations, and auxillaries', () => {
    expect(TERMINAL_MVP_SURFACE_MAP.map((surface) => surface.id)).toEqual([
      'activity',
      'transactions',
      'conversations',
      'auxillaries',
    ]);

    expect(getTerminalMvpSurface('activity')).toMatchObject({
      role: 'terminal-operator-activity-surface',
      routeSurface: '/terminal',
      targetId: 'terminalTransactionWorkspace',
    });
    expect(getTerminalMvpSurface('transactions')).toMatchObject({
      role: 'bitcode-write-space',
      routeSurface: '/terminal',
      targetId: 'terminalCommandDeck',
    });
    expect(getTerminalMvpSurface('conversations')).toMatchObject({
      role: 'chatgpt-style-read-write-interface',
      routeSurface: '/conversations',
      targetId: 'conversations',
    });
    expect(getTerminalMvpSurface('auxillaries')).toMatchObject({
      role: 'network-adjacent-readiness-controls',
      routeSurface: '/auxillaries',
      targetId: 'auxillaries',
    });
  });

  it('keeps each MVP surface bound to implementation owners instead of copy-only planning', () => {
    for (const surface of TERMINAL_MVP_SURFACE_MAP) {
      expect(surface.requiredPosture.length).toBeGreaterThan(40);
      expect(surface.implementedBy.length).toBeGreaterThanOrEqual(5);
    }

    expect(getTerminalMvpSurface('conversations')?.requiredPosture).toContain(
      'popup-capable, fullscreen-capable',
    );
    expect(getTerminalMvpSurface('auxillaries')?.requiredPosture).toContain(
      'non-fungible $BTD read-right',
    );
  });
});
