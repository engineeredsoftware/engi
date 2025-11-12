export const MODEL_CONFIGS = {
  'mock-model': {
    maxContextTokens: 32000,
    maxOutputTokens: 4096,
    apiKey: 'mock-api-key',
  },
};

export function getModelInstance(): { name: string } {
  return { name: 'mock-model' };
}
