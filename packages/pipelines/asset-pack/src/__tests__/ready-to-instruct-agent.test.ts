// @ts-nocheck
import readyToInstructWithStorage from '../agents/validation/asset-pack-ready-to-instruct-agent';
import { Execution } from '@bitcode/execution-generics';

describe('readyToInstructWithStorage', () => {
  const previousFlag = process.env.BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR;

  afterEach(() => {
    if (previousFlag === undefined) {
      delete process.env.BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR;
    } else {
      process.env.BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR = previousFlag;
    }
  });

  it('uses deterministic validation readiness by default', async () => {
    delete process.env.BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR;
    const execution = new Execution('ready-to-instruct:deterministic');
    execution.store('pipeline', 'currentIteration', 3);
    execution.store('config', 'maxIterations', 3);
    execution.store('validation/discovery', 'issues', []);
    execution.store('validation/implementation', 'issues', []);
    execution.store('validation/last', 'issues', []);

    const result = await readyToInstructWithStorage({}, execution);

    expect(result.readyToInstruct).toBe(false);
    expect(result.selfInstructConfidence).toBeGreaterThan(0.8);
    expect(result.shouldContinueIterating).toBe(false);
    expect(execution.get('validation', 'selfInstruction')?.confidence).toBe(result.selfInstructConfidence);
  });
});
