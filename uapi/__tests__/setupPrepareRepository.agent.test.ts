import { jest } from '@jest/globals';

import { initializeContext } from '@engi/context/context';
import { getGlobalContext } from '@engi/context';
import { executeAgentSteps } from '@engi/steps/runner';
import { resolveTool } from '@engi/generic-tools-registry';
import { SETUP_DELIVERABLES_AGENT_PREPARE_REPOSITORY as AGENT } from '@engi/pipeline-deliverable';


// ---------------------------------------------------------------------------
// Helper: create minimal valid response from Zod schema
// ---------------------------------------------------------------------------
import { z } from 'zod';

function createDefault(schema: z.ZodType<any>): any {
  try {
    return schema.parse({ success: true });
  } catch {
    // Try empty object merge success
    const parsed: any = schema.parse({});
    parsed.success = true;
    return parsed;
  }
}

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('@engi/steps/sub', () => {
  const actual = jest.requireActual('@engi/steps/sub');
  return {
    ...actual,
    structuredLLMCall: jest.fn(async (_msgs: any, cfg: { schema: z.ZodType<any> }) => {
      return createDefault(cfg.schema);
    }),
  };
});

jest.mock('@engi/generic-tools-registry', () => {
  const actual = jest.requireActual('@engi/generic-tools-registry');
  return {
    ...actual,
    resolveTool: jest.fn((name: string) => {
      if (name === 'cloneRepository' || name === 'cloneRepositoryTool') {
        return jest.fn().mockResolvedValue({ path: '/tmp/repo', files: ['index.ts'] });
      }
      return jest.fn().mockResolvedValue({ ok: true });
    }),
  };
});


describe('Setup Prepare Repository Agent', () => {
  beforeAll(async () => {
    await initializeContext({
      installationId: 1,
      repoName: 'testrepo',
      repoOwner: 'owner',
      repoBranch: 'main',
      repoCommit: 'HEAD',
      task: 'Clone repo',
    });
  });

  it('executes cloneRepository via runner', async () => {
    await executeAgentSteps(AGENT, { phase: 'setup' });

    const mockResolve = resolveTool as jest.Mock;
    expect(mockResolve).toHaveBeenCalledWith('cloneRepository');
  });
});
