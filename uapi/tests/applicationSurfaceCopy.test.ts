import { APPLICATION_SURFACE_COPY } from '@/app/application/application-workspace-copy';
import { APPLICATION_SURFACE_EXPLAINERS } from '@/app/application/application-workspace-explainers';

describe('APPLICATION_SURFACE_COPY', () => {
  it('keeps Bitcode Terminal detail copy centered on activity, asset packs, and proof reading', () => {
    expect(APPLICATION_SURFACE_COPY.supply.title).toContain('asset-pack posture');
    expect(APPLICATION_SURFACE_COPY.detail.emptySelection).toContain('asset pack');
    expect(APPLICATION_SURFACE_COPY.detail.transactionSummaryFallback).toContain('Bitcode Terminal detail');
  });
});

describe('APPLICATION_SURFACE_EXPLAINERS', () => {
  it('uses Bitcode Terminal activity framing instead of workspace-map naming', () => {
    expect(APPLICATION_SURFACE_EXPLAINERS.activityMap.title).toBe('Bitcode Terminal activity map');
    expect(APPLICATION_SURFACE_EXPLAINERS.activityMap.summary).toContain('give, need, fit, verification');
  });

  it('keeps experience framing centered on the Bitcode Terminal and auxillaries', () => {
    expect(APPLICATION_SURFACE_EXPLAINERS.experienceMap.summary).toContain('Bitcode Terminal');
    expect(APPLICATION_SURFACE_EXPLAINERS.experienceMap.detail).toContain('Auxillaries');
  });
});
