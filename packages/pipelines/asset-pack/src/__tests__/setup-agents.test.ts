// @ts-nocheck
import cloneRepositoryAgent from '../agents/setup/asset-pack-clone-vcs-repository-agent';
import setupPlanAgent from '../agents/setup/asset-pack-setup-plan-agent';
import runComprehendReadAgent from '../agents/setup/asset-pack-comprehend-read-agent';
import dangerWallAgent, {
  normalizeRiskAdmissionResult,
} from '../agents/setup/asset-pack-danger-wall-agent';

function executionStub() {
  const stores: Array<{ namespace: string; key: string; value: unknown }> = [];
  const values = new Map<string, unknown>();
  return {
    stores,
    children: new Map(),
    getPath: () => ['pipeline:test'],
    store: (namespace: string, key: string, value: unknown) => {
      stores.push({ namespace, key, value });
      values.set(`${namespace}:${key}`, value);
    },
    get: (namespace: string, key: string) => values.get(`${namespace}:${key}`),
  };
}

describe('AssetPack setup agents', () => {
  it('normalizes a Vercel Sandbox source checkout without invoking clone PTRR', async () => {
    const execution = executionStub();
    const result = await cloneRepositoryAgent(
      {
        repository: {
          fullName: 'engineeredsoftware/ENGI',
          branch: 'main',
          commit: '07de275b3d97679321f1f596c16e48105d81d51b',
        },
        sourceRevision: {
          repositoryFullName: 'engineeredsoftware/ENGI',
          branch: 'main',
          commit: '07de275b3d97679321f1f596c16e48105d81d51b',
        },
        harness: { harnessMode: 'asset_pack_pipeline' },
      },
      execution
    );

    expect(result).toMatchObject({
      success: true,
      repository: { owner: 'engineeredsoftware', name: 'ENGI', ref: 'main' },
      status: 'source-revision-present',
    });
    expect(execution.stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ namespace: 'repository', key: 'owner', value: 'engineeredsoftware' }),
        expect.objectContaining({ namespace: 'repository', key: 'name', value: 'ENGI' }),
        expect.objectContaining({ namespace: 'repository', key: 'commit', value: '07de275b3d97679321f1f596c16e48105d81d51b' }),
      ])
    );
  });

  it('builds a deterministic setup plan from read and Finding Fits state', async () => {
    const execution = executionStub();
    const result = await setupPlanAgent(
      {
        read: 'Determine whether the deposited repository satisfies Terminal Read/Fit QA.',
        repository: {
          fullName: 'engineeredsoftware/ENGI',
          branch: 'main',
          commit: '07de275b3d97679321f1f596c16e48105d81d51b',
        },
        fitResult: {
          resultState: 'worthy_fit',
          selectedCandidateAssetIds: ['manual-deposit-qa'],
        },
      },
      execution
    );

    expect(result.plan).toContain('worthy_fit');
    expect(result.plan).toContain('manual-deposit-qa');
    expect(result.plan).toContain('engineeredsoftware/ENGI@main:07de275b3d97679321f1f596c16e48105d81d51b');
    expect(execution.stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ namespace: 'setup', key: 'plan' }),
        expect.objectContaining({ namespace: 'setup/plan', key: 'result' }),
      ])
    );
  });

  it('builds deterministic Read comprehension evidence for danger-wall and discovery', async () => {
    const execution = executionStub();
    const result = await runComprehendReadAgent(
      {
        read: 'Determine whether the deposited repository satisfies Terminal Read/Fit QA.',
        repository: {
          fullName: 'engineeredsoftware/ENGI',
          branch: 'main',
          commit: '07de275b3d97679321f1f596c16e48105d81d51b',
        },
        fitResult: {
          resultState: 'worthy_fit',
          selectedCandidateAssetIds: ['manual-deposit-qa'],
        },
      },
      execution
    );

    expect(result.read.expressed_read).toContain('Terminal Read/Fit QA');
    expect(result.asset_pack_context).toMatchObject({
      repository: { fullName: 'engineeredsoftware/ENGI' },
      fitState: 'worthy_fit',
      selectedCandidateAssetIds: ['manual-deposit-qa'],
    });
    expect(result.riskAdmissionInput).toMatchObject({
      writtenAssetType: 'read-satisfaction-asset-pack',
    });
    expect(execution.stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ namespace: 'setup/read', key: 'model' }),
        expect.objectContaining({ namespace: 'setup/read-comprehension', key: 'riskAdmissionInput' }),
      ])
    );
  });

  it('uses quick risk admission by default for bounded setup evidence', async () => {
    const execution = executionStub();
    execution.store('setup/read-comprehension', 'riskAdmissionInput', {
      read: 'Fit the deposited repository.',
      assetPackIntent: 'Read-satisfaction AssetPack synthesis',
      writtenAssetType: 'read-satisfaction-asset-pack',
      writtenAssetRequest: 'read-satisfaction-asset-pack',
    });

    const result = await dangerWallAgent({}, execution);

    expect(result.finalAssessment.safe).toBe(true);
    expect(result.finalAssessment.maxSeverity).toBe('none');
    expect(execution.stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ namespace: 'setup/danger-wall', key: 'result' }),
        expect.objectContaining({ namespace: 'setup/risk-admission', key: 'result' }),
      ])
    );
  });

  it('normalizes the full PTRR risk admission envelope before checking setup safety', () => {
    const result = normalizeRiskAdmissionResult({
      context: {},
      output: {
        finalAssessment: {
          safe: true,
          maxSeverity: 'none',
          confidence: 0.91,
          verdict: {
            approved: true,
            reason: 'Full risk admission passed.',
            flags: [],
            recommendations: [],
          },
          auditTrail: [
            {
              check: 'read boundary',
              result: true,
              details: ['source-bound read'],
              severity: 'none',
            },
          ],
        },
        riskInsights: {
          riskProfile: 'bounded',
          threatLevel: 'minimal',
          riskRecommendations: [],
          proofObligations: [],
          admissionBoundary: 'setup',
        },
        readAlignment: {
          alignmentScore: 0.94,
          readSafeToMeasure: true,
          assetPackSafeToSynthesize: true,
          deliveryMechanismSafeToAttempt: true,
        },
        recommendations: ['continue'],
        success: true,
        validationMessage: 'passed',
      },
      finalOutput: {},
    });

    expect(result.finalAssessment.safe).toBe(true);
    expect(result.finalAssessment.maxSeverity).toBe('none');
    expect(result.readAlignment.assetPackSafeToSynthesize).toBe(true);
  });

  it('fails closed when risk admission returns an untyped output shape', () => {
    const result = normalizeRiskAdmissionResult({
      step: 'Retry',
      agent: 'bitcode-read-risk-admission',
      phase: 'setup',
    });

    expect(result.finalAssessment.safe).toBe(false);
    expect(result.finalAssessment.maxSeverity).toBe('high');
    expect(result.finalAssessment.verdict.flags).toContain(
      'risk-admission-output-missing-final-assessment',
    );
  });
});
