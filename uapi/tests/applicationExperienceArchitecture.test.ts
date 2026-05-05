import {
  getSixthGateMvpApplicationSurface,
  SIXTH_GATE_MVP_APPLICATION_MAP,
} from '@/app/application/application-experience-architecture';

describe('sixth-gate MVP application map', () => {
  it('locks the post-fifth-gate application map to activity, transactions, conversations, and auxillaries', () => {
    expect(SIXTH_GATE_MVP_APPLICATION_MAP.map((surface) => surface.id)).toEqual([
      'activity',
      'transactions',
      'conversations',
      'auxillaries',
    ]);

    expect(getSixthGateMvpApplicationSurface('activity')).toMatchObject({
      role: 'dominant-master-detail-read-surface',
      routeSurface: '/application',
      targetId: 'applicationTransactionWorkspace',
    });
    expect(getSixthGateMvpApplicationSurface('transactions')).toMatchObject({
      role: 'bitcode-write-space',
      routeSurface: '/application',
      targetId: 'applicationCommandDeck',
    });
    expect(getSixthGateMvpApplicationSurface('conversations')).toMatchObject({
      role: 'chatgpt-style-read-write-interface',
      routeSurface: '/conversations',
      targetId: 'conversations',
    });
    expect(getSixthGateMvpApplicationSurface('auxillaries')).toMatchObject({
      role: 'network-adjacent-readiness-controls',
      routeSurface: '/auxillaries',
      targetId: 'auxillaries',
    });
  });

  it('keeps each MVP surface bound to implementation owners instead of copy-only planning', () => {
    for (const surface of SIXTH_GATE_MVP_APPLICATION_MAP) {
      expect(surface.requiredPosture.length).toBeGreaterThan(40);
      expect(surface.implementedBy.length).toBeGreaterThanOrEqual(5);
    }

    expect(getSixthGateMvpApplicationSurface('conversations')?.requiredPosture).toContain(
      'popup-capable, fullscreen-capable',
    );
    expect(getSixthGateMvpApplicationSurface('auxillaries')?.requiredPosture).toContain(
      'non-fungible $BTD read-right',
    );
  });
});
