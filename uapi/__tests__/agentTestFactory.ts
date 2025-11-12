import { initializeContext } from '@engi/context/context';
import { executeAgentSteps } from '@engi/steps/runner';
import * as sub from '@engi/steps/sub';
import { resolveTool } from '@engi/generic-tools-registry';
import { jest } from '@jest/globals';
import { z } from 'zod';

// Generic helper ------------------------------------------------------

export function registerGenericMocks() {
  // Mock LLM structured call to always return minimal schema object
  jest.spyOn(sub, 'structuredLLMCall').mockImplementation(
    async (_msgs: any, { schema }: { schema: z.ZodType }) => schema.parse({ success: true })
  );

  // Spy on tool resolution – return dummy fn that resolves instantly
  const dummy = jest.fn().mockResolvedValue({ ok: true });
  jest.spyOn(require('@engi/generic-tools-registry'), 'resolveTool').mockImplementation((_name: string) => dummy);

  return { dummy };
}

export async function initContextOnce() {
  await initializeContext({
    connectionId: 1,
    repoOwner: 'owner',
    repoName: 'repo',
    repoBranch: 'main',
    repoCommit: 'HEAD',
    task: 'dummy task',
  });
}

/**
 * Generates a Jest test case for a single agent.
 */
export function testAgent(agent: any, phase: string, tools: string[]) {
  describe(agent.name || 'agent', () => {
    const { dummy } = registerGenericMocks();

    beforeAll(initContextOnce);

    it('runner resolves expected tools', async () => {
      await executeAgentSteps(agent, { phase });

      const resolveMock = resolveTool as jest.Mock;
      tools.forEach((t) => expect(resolveMock).toHaveBeenCalledWith(t));
      // Runner should have called the dummy implementation for each tool
      expect(dummy).toHaveBeenCalled();
    });
  });
}
