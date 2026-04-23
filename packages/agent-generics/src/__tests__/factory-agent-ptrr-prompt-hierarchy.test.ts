// @ts-nocheck
import { z } from 'zod';
import { factoryAgentWithPTRR } from '../agents/factories';

const OutputSchema = z.object({
  ok: z.boolean()
});

function promptRegistry(name: string) {
  return {
    getAllPaths: () => [`${name}/identity`],
    get: (path: string) => ({ path, text: `${name} prompt` })
  };
}

function stepPromptRegistry() {
  return {
    plan: () => promptRegistry('plan'),
    try: () => promptRegistry('try'),
    refine: () => promptRegistry('refine'),
    retry: () => promptRegistry('retry')
  };
}

describe('factoryAgentWithPTRR Bitcode prompt hierarchy', () => {
  it('requires a Registry-backed agent prompt carrier and all PTRR step Prompt registries', () => {
    expect(() =>
      factoryAgentWithPTRR({
        name: 'missing-prompt-carrier',
        outputSchema: OutputSchema
      } as any)
    ).toThrow(/requires a Bitcode Registry-backed prompt carrier/u);

    expect(() =>
      factoryAgentWithPTRR({
        name: 'partial-step-prompts',
        outputSchema: OutputSchema,
        prompt: promptRegistry('system'),
        stepPrompts: {
          plan: () => promptRegistry('plan')
        }
      } as any)
    ).toThrow(/missing try, refine, retry step Prompt registries/u);
  });

  it('accepts the explicit prompt plus stepPrompts carrier', () => {
    const agent = factoryAgentWithPTRR({
      name: 'complete-explicit-prompt-carrier',
      outputSchema: OutputSchema,
      prompt: promptRegistry('system'),
      stepPrompts: stepPromptRegistry(),
      enforceLLM: false
    });

    expect(agent.steps).toHaveLength(4);
  });

  it('accepts the compact prompts carrier with system plus complete PTRR steps', () => {
    const agent = factoryAgentWithPTRR({
      name: 'complete-compact-prompt-carrier',
      outputSchema: OutputSchema,
      prompts: {
        system: promptRegistry('system'),
        ...stepPromptRegistry()
      },
      enforceLLM: false
    });

    expect(agent.steps).toHaveLength(4);
  });
});
