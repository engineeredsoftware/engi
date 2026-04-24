import { executeValidationPhase } from '@bitcode/engine/pipeline/pipelineValidationPhaseWrapper';
import { createContext, getGlobalContext, endContext } from '@bitcode/context';
import { supabaseAdmin } from '@bitcode/supabase';
import { writeStreamMessage } from '@bitcode/streams';

jest.mock('@bitcode/supabase');
jest.mock('@bitcode/streams');
jest.mock('@bitcode/pipeline-asset-pack/src/phases/validation', () => ({
  runValidation: jest.fn(async () => ({
    success: true,
    metrics: { tokensUsed: 0, score: 0.9, taskCompletion: 0.9, codeQuality: 0.9, securityScore: 0.9, contentQuality: 0.9 },
    confidence: 0.9,
    readyToShip: true,
    needsIteration: false,
    errors: []
  }))
}));

describe('pipelineValidationPhaseWrapper OTF integration', () => {
  const fakeInstructions = [
    { id: 'i1', content: 'Check security', attachments: null, state: 'accepted', created_at: '2025-01-01T00:00:00Z' }
  ];
  let stateStream: any;
  let dataStream: any;
  let dummyState: any;
  let dummyMetrics: any;
  beforeEach(() => {
    // Mock context
    stateStream = {};
    dataStream = {};
    dummyState = { phases: {} };
    dummyMetrics = { totalTokensUsed: 0, lastValidationScore: 0, iterationMetrics: [], startTime: Date.now() };
    createContext(dummyState, stateStream, dataStream);
    getGlobalContext().setRunData({ runId: 'run1', correlationId: 'corr1' });
    // Mock supabase fetch of OTF instructions
    const mockFrom: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      then: undefined,
    };
    (supabaseAdmin.from as jest.Mock).mockReturnValue(mockFrom);
    mockFrom.select.mockReturnValue({ data: fakeInstructions, error: null });
  });
  afterEach(() => {
    endContext();
    jest.clearAllMocks();
  });

  it('streams OTF instructions and adherence', async () => {
    const result = await executeValidationPhase(dummyMetrics, dummyState, 'corr1', {}, 0.5);
    expect(result.success).toBe(true);
    // writeStreamMessage should be called for instructions (adherence is now handled by a deliverable-specific agent)
    expect(writeStreamMessage as jest.Mock).toHaveBeenCalled();
    const calls = (writeStreamMessage as jest.Mock).mock.calls.map(call => call[1].type);
    expect(calls).toContain('status');
    expect(calls).toContain('otf_instructions');
  });
});
