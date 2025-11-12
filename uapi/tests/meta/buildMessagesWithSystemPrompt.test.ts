import { buildMessagesWithSystemPrompt } from '@engi/steps/meta';
import { getGlobalContext } from '@engi/context/context';

describe('buildMessagesWithSystemPrompt', () => {
  const realGetGlobal = getGlobalContext;
  afterEach(() => {
    // Restore original global context
    (getGlobalContext as any) = realGetGlobal;
  });

  it('uses user-provided systemPrompt override when present', async () => {
    // Mock global context to include modelPreferences.systemPrompt
    const mockContext = {
      userProvidedContext: { modelPreferences: { systemPrompt: 'UserPrompt' } },
      // Dummy stubs for context methods
      getPartialContextString: () => '',
    };
    (getGlobalContext as any) = () => mockContext;
    const msgs = await buildMessagesWithSystemPrompt(
      [],
      '',
      {},
      'BasePrompt',
      'Op'
    );
    // The system message content should include the user override and not the base prompt
    const content = msgs[0].content;
    expect(content).toContain('UserPrompt');
    expect(content).not.toContain('BasePrompt');
  });

  it('falls back to base system prompt when no override is set', async () => {
    const mockContext = {
      userProvidedContext: { modelPreferences: null },
      getPartialContextString: () => '',
    };
    (getGlobalContext as any) = () => mockContext;
    const msgs = await buildMessagesWithSystemPrompt(
      [],
      '',
      {},
      'BasePrompt',
      'Op'
    );
    const content = msgs[0].content;
    expect(content).toContain('BasePrompt');
  });
});