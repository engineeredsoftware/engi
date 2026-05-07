import type { VCSRepository } from '@bitcode/vcs-core';

import {
  deriveSelectedRepository,
  normalizeRepositoryProvider,
} from '@/app/terminal/terminal-repository-context';

const repositories = [
  {
    id: 'repo-1',
    name: 'bitcode',
    fullName: 'bitcode/bitcode',
  },
  {
    id: 'repo-2',
    name: 'bitcode-core',
    fullName: 'bitcode/bitcode-core',
  },
] as VCSRepository[];

describe('Terminal repository context helpers', () => {
  it('normalizes invalid providers back to github', () => {
    expect(normalizeRepositoryProvider(null)).toBe('github');
    expect(normalizeRepositoryProvider(undefined)).toBe('github');
    expect(normalizeRepositoryProvider('not-real')).toBe('github');
    expect(normalizeRepositoryProvider('gitlab')).toBe('gitlab');
  });

  it('prefers a requested repository from the current route', () => {
    expect(deriveSelectedRepository(repositories, 'bitcode/bitcode-core', null)?.id).toBe('repo-2');
    expect(deriveSelectedRepository(repositories, 'repo-1', null)?.fullName).toBe('bitcode/bitcode');
  });

  it('falls back to the preferred repository from current Terminal context', () => {
    expect(deriveSelectedRepository(repositories, null, 'bitcode/bitcode-core')?.id).toBe('repo-2');
  });

  it('falls back to the first surfaced repository when no explicit choice exists', () => {
    expect(deriveSelectedRepository(repositories, null, null)?.id).toBe('repo-1');
    expect(deriveSelectedRepository([], null, null)).toBeNull();
  });
});
