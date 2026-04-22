// @ts-nocheck
jest.mock('../steps/failsafe-sequence', () => ({
  createFailsafeGenerationSequence: () => async (input: any) => input,
}));

import { factoryPlanStep } from '../steps/factories';
import { Execution } from '@bitcode/execution-generics';

describe('Tools execute as Step postprocess once', () => {
  it('runs tools after core generation when requested', async () => {
    // Spy on dynamic require factoryToolsExecution used in postprocess
    const substeps = require('../substeps/factories');
    const spy = jest.spyOn(substeps, 'factoryToolsExecution').mockImplementation(() => {
      return async (input: any) => ({ ...input, usedTools: ['ok'] });
    });

    const step = factoryPlanStep<any, any>({ parse: (x:any) => x } as any);
    const exec = new Execution('agent-root');

    const out = await step({ output: { useTools: [{ name: 't', input: {} }] } }, exec as any);
    expect(spy).toHaveBeenCalled();
    expect(out.usedTools).toBeDefined();

    spy.mockRestore();
  });
});
