import { factoryLLMRegistry, LLMRegistry } from '../index';

describe('LLMRegistry', () => {
  const buildRegistry = (): { registry: LLMRegistry; createLLM: jest.Mock } => {
    const registry = factoryLLMRegistry();
    const createLLM = jest.fn((config) => jest.fn(async () => ({ content: 'ok', metadata: { config } })));

    registry.registerProvider({
      name: 'openai',
      createLLM,
      getDefaultConfig: () => ({ model: 'gpt-test' }),
    });

    return { registry, createLLM };
  };

  it('cascades configuration across hierarchy when retrieving sequence LLMs', async () => {
    const { registry, createLLM } = buildRegistry();

    registry.configure('*', { temperature: 0.1 }, 0);
    registry.configure('pipeline:demo', { maxTokens: 1000 }, 5);
    registry.configure('pipeline:demo:phase:implementation', { temperature: 0.5 }, 10);

    const llm = registry.getSequenceLLM('demo', 'implementation', 'architect', 'plan');
    const result = await llm({ messages: [{ role: 'user', content: 'hi' }] });

    expect(createLLM).toHaveBeenCalledTimes(1);
    const mergedConfig = createLLM.mock.calls[0][0];
    expect(mergedConfig).toMatchObject({ temperature: 0.5, maxTokens: 1000 });
    expect(result.metadata?.config).toEqual(mergedConfig);
  });

  it('allows overriding the default provider', () => {
    const registry = factoryLLMRegistry();
    const otherProviderFactory = jest.fn(() => jest.fn(async () => ({ content: 'ok' })));

    registry.registerProvider({
      name: 'anthropic',
      createLLM: otherProviderFactory,
    });

    registry.setDefaultProvider('anthropic');
    const llm = registry.getLLM(['*']);

    expect(typeof llm).toBe('function');
    expect(otherProviderFactory).toHaveBeenCalledWith({});
  });

  it('throws when requested provider is not registered', () => {
    const registry = factoryLLMRegistry();
    expect(() => registry.getLLM(['*'], 'unknown')).toThrow("LLM provider 'unknown' not found");
  });
});
