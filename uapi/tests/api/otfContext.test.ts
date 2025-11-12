import { initializeContext, getGlobalContext } from '@engi/context/context';
import { prepareContextForPrompt } from '@engi/context/context';

describe('OTF instructions integration with context preparation', () => {
  beforeEach(async () => {
    // Initialise a minimal global context for each test
    await initializeContext({
      installationId: 42,
      repoName: 'demo',
      repoOwner: 'acme',
      repoBranch: 'main',
      repoCommit: 'deadbeef',
      task: 'Demo task for unit-test',
    } as any); // casting to avoid exhaustive param list for this unit test
  });

  it('includes otfInstructions in the prepared context when present', async () => {
    const dummyInstructions = [
      {
        id: '123',
        content: 'Please refactor the utils module',
        attachments: null,
        state: 'accepted',
        created_at: new Date().toISOString(),
      },
    ];

    // Inject instructions onto the global context as the validation wrapper would
    (getGlobalContext() as any).otfInstructions = dummyInstructions;

    const partial = await prepareContextForPrompt({
      targetPrompt: 'Generate implementation',
      includeFileContents: false,
    });

    // Assertions differ based on whether prepareContextForPrompt returns
    // an array (chunked) or single object.  Handle both.
    const ctxArray = Array.isArray(partial) ? partial : [partial];

    ctxArray.forEach((ctx) => {
      expect((ctx as any).otfInstructions).toEqual(dummyInstructions);
    });
  });
});
