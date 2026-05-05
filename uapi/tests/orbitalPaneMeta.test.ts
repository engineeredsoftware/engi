import {
  getAuxillaryOpenActionLabel,
  getAuxillaryRouteSegment,
  normalizeAuxillaryPane,
} from '@/app/auxillaries/components/auxillary-pane-meta';

describe('auxillary-pane-meta canonical routing', () => {
  it('uses profile as the canonical profile route segment', () => {
    expect(getAuxillaryRouteSegment('profile')).toBe('profile');
  });

  it('accepts only canonical auxillary route segments', () => {
    expect(normalizeAuxillaryPane('profile')).toBe('profile');
    expect(normalizeAuxillaryPane('connects')).toBe('connects');
    expect(normalizeAuxillaryPane('interfaces')).toBe('interfaces');
    expect(normalizeAuxillaryPane('btd')).toBe('btd');
    expect(normalizeAuxillaryPane('users')).toBeNull();
    expect(normalizeAuxillaryPane('models')).toBeNull();
    expect(normalizeAuxillaryPane('credits')).toBeNull();
  });

  it('keeps orbital entry actions user-facing and specific when a target orbital is provided', () => {
    expect(getAuxillaryOpenActionLabel()).toBe('Open Auxillaries fullscreen');
    expect(getAuxillaryOpenActionLabel('connects')).toBe('Open Connects fullscreen');
  });
});
