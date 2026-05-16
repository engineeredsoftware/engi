import { buildAssetPackSandboxHarness } from '../asset-pack-harness';

const baseOptions = {
  read: {
    id: 'read-1',
    prompt: 'Read the deposited repository revision.',
  },
  deposit: {
    id: 'deposit-1',
  },
  sourceRevision: {
    repositoryFullName: 'engineeredsoftware/ENGI',
    branch: 'main',
    commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
  },
};

describe('asset-pack sandbox harness plan', () => {
  it('builds a host smoke plan that exports manifest and artifact paths', () => {
    const plan = buildAssetPackSandboxHarness(baseOptions);

    expect(plan.createOptions.runtime).toBe('node24');
    expect(plan.createOptions.timeout).toBe(45 * 60 * 1000);
    expect(plan.createOptions.networkPolicy).toBe('allow-all');
    expect(plan.commands.map((command) => command.label)).toEqual([
      'runtime-readiness',
      'host-smoke-harness-run',
    ]);
    expect(plan.files.map((file) => file.path)).toEqual([
      '.bitcode/pipeline-harness/manifest.json',
      '.bitcode/pipeline-harness/run-host-smoke.mjs',
      '.bitcode/pipeline-harness/run-live-asset-pack-pipeline.ts',
    ]);
    expect(plan.artifactPaths).toEqual({
      evidence: '.bitcode/pipeline-harness/evidence.json',
      telemetry: '.bitcode/pipeline-harness/telemetry.jsonl',
    });
  });

  it('requires a repository source before planning the real pipeline mode', () => {
    expect(() =>
      buildAssetPackSandboxHarness({
        ...baseOptions,
        mode: 'asset_pack_pipeline',
      })
    ).toThrow(/requires a sandbox source/);
  });

  it('plans dependency install and live runner commands for real pipeline mode', () => {
    const plan = buildAssetPackSandboxHarness({
      ...baseOptions,
      mode: 'asset_pack_pipeline',
      source: {
        type: 'git',
        url: 'https://github.com/engineeredsoftware/ENGI.git',
        revision: baseOptions.sourceRevision.commit,
        depth: 1,
      },
    });

    expect(plan.createOptions.source).toEqual({
      type: 'git',
      url: 'https://github.com/engineeredsoftware/ENGI.git',
      revision: baseOptions.sourceRevision.commit,
      depth: 1,
    });
    expect(plan.commands.map((command) => command.label)).toEqual([
      'runtime-readiness',
      'package-manager-readiness',
      'workspace-install',
      'asset-pack-pipeline-run',
    ]);
  });
});
