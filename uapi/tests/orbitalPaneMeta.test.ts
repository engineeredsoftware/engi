import {
  getOrbitalOpenActionLabel,
  getOrbitalRouteSegment,
  normalizeOrbitalPane,
} from '@/app/orbitals/components/orbital-pane-meta';

describe('orbital-pane-meta', () => {
  it('uses profile as the canonical profile route segment', () => {
    expect(getOrbitalRouteSegment('profile')).toBe('profile');
  });

  it('keeps legacy route aliases compatible', () => {
    expect(normalizeOrbitalPane('profile')).toBe('profile');
    expect(normalizeOrbitalPane('users')).toBe('profile');
    expect(normalizeOrbitalPane('models')).toBe('interfaces');
    expect(normalizeOrbitalPane('credits')).toBe('btd');
  });

  it('keeps orbital entry actions user-facing and specific when a target orbital is provided', () => {
    expect(getOrbitalOpenActionLabel()).toBe('Open Orbitals fullscreen');
    expect(getOrbitalOpenActionLabel('connects')).toBe('Open Connects fullscreen');
  });
});
