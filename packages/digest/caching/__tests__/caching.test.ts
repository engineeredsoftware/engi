import { describe, it, expect } from '@jest/globals';
import crypto from 'crypto';
import { getCacheDir, getCachePath } from '../index';

describe('getCacheDir', () => {
  it('returns GitHub mode cache dir', () => {
    const dir = getCacheDir(true, '/root/dir', { repoOrgUser: 'org/repo' });
    expect(dir).toBe('/tmp/bitcode/digest-cache/github/org/repo/files');
  });

  it('returns Local mode cache dir using remoteUrl when provided', () => {
    const remoteUrl = 'https://example.com/repo.git';
    const dir = getCacheDir(false, '/unused', { remoteUrl });
    const expectedHash = crypto.createHash('sha256').update(remoteUrl).digest('hex').slice(0, 12);
    expect(dir).toBe(`/tmp/bitcode/digest-cache/local/${expectedHash}/files`);
  });
});

describe('getCachePath', () => {
  it('appends .json extension to file hash', () => {
    expect(getCachePath('/tmp/cache', 'abcdef')).toBe('/tmp/cache/abcdef.json');
  });
});
