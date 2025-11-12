import { TSESLint } from '@typescript-eslint/utils';
import { noWriteToolsOutsideConquer } from '../src/noWriteToolsOutsideConquer';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const DELIVERABLE_CONQUER =
  'packages/pipelines/deliverable/src/agents/implementationDeliverablesAgentConquer/index.ts';

ruleTester.run('no-write-tools-outside-conquer', noWriteToolsOutsideConquer, {
  valid: [
    {
      filename: DELIVERABLE_CONQUER,
      code: "import { textEditorTool } from '@engi/generic-tools-files-maintaining';",
    },
    {
      filename: 'packages/pipelines/deliverable/src/agents/implementationDeliverablesAgentDivideByFile/foo.ts',
      code: "import { definitionTool } from '@engi/generic-tools-lsp-query';",
    },
  ],
  invalid: [
    {
      filename: 'packages/other-agent/foo.ts',
      code: "import { textEditorTool, renameSymbolTool } from '@engi/generic-tools-files-maintaining';",
      errors: [
        {
          messageId: 'forbidden',
          data: { names: 'textEditorTool, renameSymbolTool' },
        },
      ],
    },
  ],
});
