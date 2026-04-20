import { TSESLint } from '@typescript-eslint/utils';
import { requirePromptHierarchy } from '../src/requirePromptHierarchy';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('require-prompt-hierarchy', requirePromptHierarchy, {
  valid: [
    {
      code: `
        factoryAgentWithPTRR({
          name: 'ok',
          outputSchema: someSchema,
          prompt: agentPrompt,
          stepPrompts: {
            plan: () => stepPrompts.plan,
            try: () => stepPrompts.try,
            refine: () => stepPrompts.refine,
            retry: () => stepPrompts.retry,
          }
        });
      `,
    },
  ],
  invalid: [
    {
      code: `
        factoryAgentWithPTRR({
          name: 'missing',
          outputSchema: someSchema
        });
      `,
      errors: [
        { messageId: 'missingPrompt' },
        { messageId: 'missingStepPrompts' },
      ],
    },
    {
      code: `
        async function x(execution:any){ execution.prompt = something }
      `,
      errors: [{ messageId: 'manualExecutionPrompt' }],
    },
  ],
});
