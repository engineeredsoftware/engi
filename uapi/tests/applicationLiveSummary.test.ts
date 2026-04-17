import { normalizeApplicationLiveSummary } from '@/app/application/application-live-summary';

describe('normalizeApplicationLiveSummary', () => {
  it('normalizes summary items from the shell summary bridge', () => {
    const items = normalizeApplicationLiveSummary({
      summarySurface: [
        { label: 'Active scenario', value: 'monorepo-auth-rollback' },
        { label: 'Branch mode', value: 'patch' },
        { label: 'Projection', value: 'buyer' },
        { label: 'Visible proof families', value: '4' },
      ],
    });

    expect(items).toEqual([
      { label: 'Active scenario', value: 'monorepo-auth-rollback' },
      { label: 'Branch mode', value: 'patch' },
      { label: 'Projection', value: 'buyer' },
      { label: 'Visible proof families', value: '4' },
    ]);
  });

  it('ignores empty labels and fills empty values', () => {
    const items = normalizeApplicationLiveSummary({
      summarySurface: [
        { label: '', value: 'ignored' },
        { label: 'Blocking external interfaces', value: '' },
      ],
    });

    expect(items).toEqual([{ label: 'Blocking external interfaces', value: '—' }]);
  });
});
