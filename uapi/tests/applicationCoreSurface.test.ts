import { normalizeApplicationCorePanels } from '@/app/application/application-core-surface';

describe('normalizeApplicationCorePanels', () => {
  it('builds core panels from the semantic shell bridge', () => {
    const panels = normalizeApplicationCorePanels({
      coreSurface: {
        operatingPicture: {
          label: 'Operating picture',
          badge: 'V25 active canon / V26 draft',
          cards: [
            {
              title: 'Repo supply',
              eyebrow: 'Canonical shell surface',
              subtitle: 'Authenticated repo sessions and artifact-kind-native supply',
              help: 'The canonical shell starts from repo supply.',
              badge: '7 repos',
              metrics: [
                { label: 'Authenticated repos', value: '7' },
                { label: 'Repo supply entries', value: '25' },
              ],
              rows: [
                { label: 'Active scenario', value: 'monorepo-auth-rollback' },
                { label: 'Projection', value: 'buyer' },
              ],
            },
          ],
        },
        depositing: {
          label: 'Depositing',
          badge: 'Targeted deposit',
          cards: [
            {
              title: 'Depositing surface',
              subtitle: 'The active repo-authenticated deposit.',
              metrics: [{ label: 'Selected refs', value: '2' }],
              rows: [{ label: 'Repository supply', value: 'bitcode/bitcode · session-1' }],
            },
          ],
        },
        needing: {
          label: 'Needing + measured demand',
          cards: [
            {
              title: 'Needing surface',
              badge: 'benchmark-parser',
              rows: [{ label: 'Need ID', value: 'need-auth-rollback' }],
            },
          ],
        },
        fit: {
          label: 'Depositing-to-needing fit',
          cards: [
            {
              title: 'Depositing-to-needing surface',
              metrics: [{ label: 'Pressure', value: 'low' }],
              rows: [{ label: 'Decisive kinds', value: 'runbook, patch' }],
            },
          ],
        },
      },
    });

    expect(panels).toHaveLength(4);
    expect(panels[0]?.label).toBe('Operating picture');
    expect(panels[0]?.cards[0]?.metrics[0]).toEqual({ label: 'Authenticated repos', value: '7' });
    expect(panels[1]?.badge).toBe('Targeted deposit');
    expect(panels[2]?.cards[0]?.badge).toBe('benchmark-parser');
    expect(panels[3]?.cards[0]?.rows[0]?.value).toBe('runbook, patch');
  });

  it('falls back safely when the core surface is absent', () => {
    expect(normalizeApplicationCorePanels(null)).toEqual([]);
    expect(normalizeApplicationCorePanels({})).toEqual([]);
  });
});
