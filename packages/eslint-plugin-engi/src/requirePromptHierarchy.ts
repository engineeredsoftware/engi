import { TSESTree as T, ESLintUtils } from '@typescript-eslint/utils';

/*
 * -------------------------------------------------------------------------------------------------
 * require-prompt-hierarchy
 * -------------------------------------------------------------------------------------------------
 * Enforces GA-1 prompt wiring for agents:
 * - factoryAgentWithPTRR configs must include `prompt` and `stepPrompts` (plan/try/refine/retry)
 * - Forbid manual assignment to `execution.prompt = ...`
 */

export const requirePromptHierarchy = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    messages: {
      missingPrompt: 'factoryAgentWithPTRR config must include `prompt: AgentPrompt`.',
      missingStepPrompts: 'factoryAgentWithPTRR config must include `stepPrompts` with plan/try/refine/retry.',
      manualExecutionPrompt: 'Do not assign to execution.prompt directly; pass prompts via factoryAgentWithPTRR.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(ctx) {
    return {
      // Disallow manual execution.prompt = ...
      AssignmentExpression(node: T.AssignmentExpression) {
        if (
          node.left.type === 'MemberExpression' &&
          !node.left.computed &&
          node.left.object.type === 'Identifier' &&
          node.left.object.name === 'execution' &&
          node.left.property.type === 'Identifier' &&
          node.left.property.name === 'prompt'
        ) {
          ctx.report({ node, messageId: 'manualExecutionPrompt' });
        }
      },

      // Enforce prompt + stepPrompts in factoryAgentWithPTRR
      CallExpression(node: T.CallExpression) {
        const callee = node.callee;
        if (callee.type !== 'Identifier' || callee.name !== 'factoryAgentWithPTRR') return;
        if (!node.arguments.length) return;
        const arg = node.arguments[0];
        if (arg.type !== 'ObjectExpression') return;

        let hasPrompt = false;
        let hasStepPrompts = false;
        let hasPlan = false;
        let hasTry = false;
        let hasRefine = false;
        let hasRetry = false;

        for (const prop of arg.properties) {
          if (prop.type !== 'Property' || prop.key.type !== 'Identifier') continue;
          const key = prop.key.name;
          if (key === 'prompt') hasPrompt = true;
          if (key === 'prompts' && prop.value.type === 'ObjectExpression') {
            // Accept legacy shape: prompts.system + prompts.{plan,try,refine,retry}
            for (const lp of prop.value.properties) {
              if (lp.type !== 'Property' || lp.key.type !== 'Identifier') continue;
              const lk = lp.key.name;
              if (lk === 'system') hasPrompt = true;
              if (lk === 'plan') hasPlan = true;
              if (lk === 'try') hasTry = true;
              if (lk === 'refine') hasRefine = true;
              if (lk === 'retry') hasRetry = true;
            }
            hasStepPrompts = true;
          }
          if (key === 'stepPrompts') {
            hasStepPrompts = true;
            if (prop.value.type === 'ObjectExpression') {
              for (const sp of prop.value.properties) {
                if (sp.type !== 'Property' || sp.key.type !== 'Identifier') continue;
                const sk = sp.key.name;
                if (sk === 'plan') hasPlan = true;
                if (sk === 'try') hasTry = true;
                if (sk === 'refine') hasRefine = true;
                if (sk === 'retry') hasRetry = true;
              }
            }
          }
        }

        if (!hasPrompt) {
          ctx.report({ node: arg, messageId: 'missingPrompt' });
        }
        if (!hasStepPrompts) {
          ctx.report({ node: arg, messageId: 'missingStepPrompts' });
        }
      },
    };
  },
});
