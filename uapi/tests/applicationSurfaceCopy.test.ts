import { APPLICATION_SURFACE_COPY } from '@/app/application/application-workspace-copy';
import { APPLICATION_SURFACE_EXPLAINERS } from '@/app/application/application-workspace-explainers';

describe('APPLICATION_SURFACE_COPY', () => {
  it('keeps transactions-first detail copy without workspace-era naming', () => {
    expect(APPLICATION_SURFACE_COPY.detail.emptySelection).toContain('Bitcode transaction');
    expect(APPLICATION_SURFACE_COPY.detail.transactionSummaryFallback).toContain('transaction detail');
  });
});

describe('APPLICATION_SURFACE_EXPLAINERS', () => {
  it('uses an activity map instead of workspace-map naming', () => {
    expect(APPLICATION_SURFACE_EXPLAINERS.activityMap.title).toBe('Transactions activity map');
    expect(APPLICATION_SURFACE_EXPLAINERS.activityMap.summary).toContain('give, need, fit, verification');
  });

  it('keeps experience framing centered on transactions and auxillaries', () => {
    expect(APPLICATION_SURFACE_EXPLAINERS.experienceMap.summary).toContain('transactions surface');
    expect(APPLICATION_SURFACE_EXPLAINERS.experienceMap.detail).toContain('Auxillaries');
  });
});
