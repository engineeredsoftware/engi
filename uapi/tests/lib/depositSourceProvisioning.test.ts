/**
 * @jest-environment node
 */
import { provisionDepositSourceInventory } from '@/lib/deposit-source-provisioning';
import type { BitcodeHostWorkspace, BitcodePipelineHost } from '@bitcode/pipeline-hosts';

const FILES: Record<string, string> = {
  'README.md': '# Demo project',
  'src/app.ts': 'export function main() {}\nexport interface Config { port: number }',
  'src/util.ts': 'export const helper = () => 42',
  'deep/nested/thing/buried.ts': 'export const buried = true',
};

function fakeHost(): { host: BitcodePipelineHost; isDisposed: () => boolean; source: any } {
  let disposed = false;
  let source: any = null;
  const workspace: BitcodeHostWorkspace = {
    workspacePath: '/tmp/ws',
    listFiles: async () => Object.keys(FILES),
    readFile: async (p) => (p in FILES ? FILES[p] : null),
    runCommand: async () => ({ exitCode: 0, stdout: '', stderr: '' }),
    dispose: async () => {
      disposed = true;
    },
  };
  const host: BitcodePipelineHost = {
    capabilities: {
      hostKind: 'inline',
      clone: true,
      filesystem: true,
      exec: true,
      ephemeralFilesystem: true,
      defaultWorkingDirectory: '/tmp',
    },
    provisionRepository: async (s) => {
      source = s;
      return workspace;
    },
  };
  return { host, isDisposed: () => disposed, source: () => source };
}

describe('provisionDepositSourceInventory', () => {
  it('provisions, reads the FULL source, derives bounded samples, and disposes', async () => {
    const { host, isDisposed, source } = fakeHost();
    const inventory = await provisionDepositSourceInventory({
      host,
      repositoryFullName: 'o/r',
      url: 'https://github.com/o/r.git',
      revision: 'abc123',
      token: 'ghs_tok',
    });

    // The host was asked to provision the revision with credentials.
    expect((source as any)()).toMatchObject({
      repositoryFullName: 'o/r',
      url: 'https://github.com/o/r.git',
      revision: 'abc123',
      password: 'ghs_tok',
    });

    // sources = every tracked file, verbatim.
    expect(inventory.sources).toHaveLength(4);
    expect(inventory.sources.find((f) => f.path === 'src/app.ts')?.content).toBe(FILES['src/app.ts']);
    expect(inventory.paths.sort()).toEqual(Object.keys(FILES).sort());

    // samples = bounded prompt excerpts: README + shallow source; the deeply-nested
    // file is excluded from samples (but present in full sources).
    const samplePaths = inventory.samples.map((s) => s.path);
    expect(samplePaths).toContain('README.md');
    expect(samplePaths).toContain('src/app.ts');
    expect(samplePaths).not.toContain('deep/nested/thing/buried.ts');

    // The workspace is disposed after reading.
    expect(isDisposed()).toBe(true);
  });
});
