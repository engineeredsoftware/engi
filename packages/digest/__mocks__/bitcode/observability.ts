type GenerateTextArgs = {
  messages?: Array<{ content?: string }>;
};

export async function generateTextTraced(args: GenerateTextArgs = {}): Promise<{ text: string }> {
  const prompt = (args.messages ?? [])
    .map(message => message.content ?? '')
    .join('\n\n');

  try {
    const { callLLMAPI } = await import('../../llm');
    const response = await callLLMAPI(prompt, 2048, false);
    return { text: typeof response === 'string' ? response : JSON.stringify(response) };
  } catch {
    return { text: 'Default response' };
  }
}

export async function trace<T>(_name: string, fn: () => Promise<T>): Promise<T> {
  return fn();
}

export async function traceStep<T>(_name: string, fn: () => Promise<T>): Promise<T> {
  return fn();
}
