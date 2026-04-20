import {
  getAuxillaryOpenActionLabel,
  getAuxillaryRouteSegment,
  normalizeAuxillaryPane,
} from '@/app/auxillaries/components/auxillary-pane-meta';

describe('auxillary-pane-meta orbital compatibility', () => {
  it('uses profile as the canonical profile route segment', () => {
    expect(getAuxillaryRouteSegment('profile')).toBe('profile');
  });

  it('keeps legacy route aliases compatible', () => {
    expect(normalizeAuxillaryPane('profile')).toBe('profile');
    expect(normalizeAuxillaryPane('users')).toBe('profile');
    expect(normalizeAuxillaryPane('models')).toBe('interfaces');
    expect(normalizeAuxillaryPane('credits')).toBe('btd');
  });

  it('keeps orbital entry actions user-facing and specific when a target orbital is provided', () => {
    expect(getAuxillaryOpenActionLabel()).toBe('Open Auxillaries fullscreen');
    expect(getAuxillaryOpenActionLabel('connects')).toBe('Open Connects fullscreen');
  });
});
