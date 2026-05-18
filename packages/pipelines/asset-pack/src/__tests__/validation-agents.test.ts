import { AssetPackValidationReadyToFinishAgent } from '../agents/validation-agents';

describe('AssetPackValidationReadyToFinishAgent deterministic fallback', () => {
  const originalOverlayFlag = process.env.BITCODE_PIPELINE_SOURCE_OVERLAY_APPLIED;

  afterEach(() => {
    if (originalOverlayFlag === undefined) {
      delete process.env.BITCODE_PIPELINE_SOURCE_OVERLAY_APPLIED;
    } else {
      process.env.BITCODE_PIPELINE_SOURCE_OVERLAY_APPLIED = originalOverlayFlag;
    }
  });

  it('does not warn about source overlays for source-bound runs', async () => {
    delete process.env.BITCODE_PIPELINE_SOURCE_OVERLAY_APPLIED;

    const result = await AssetPackValidationReadyToFinishAgent({}, {
      get: jest.fn(),
      store: jest.fn(),
    });

    expect(result.finalApproval).toBe(true);
    expect(result.finalWarnings).not.toContain(
      'Source overlay runs are QA-only until the same revision is deployed cleanly.'
    );
    expect(result.finalWarnings).toContain(
      'BTC fee and BTD ledger rows must be read back before settlement trust.'
    );
  });

  it('warns about source overlays only when overlay evidence is present', async () => {
    const result = await AssetPackValidationReadyToFinishAgent({}, {
      get: jest.fn((namespace: string, key: string) => (
        namespace === 'harness' && key === 'sourceOverlay'
          ? { admissibility: 'qa-only-not-source-revision-evidence' }
          : undefined
      )),
      store: jest.fn(),
    });

    expect(result.finalWarnings).toContain(
      'Source overlay runs are QA-only until the same revision is deployed cleanly.'
    );
  });
});
