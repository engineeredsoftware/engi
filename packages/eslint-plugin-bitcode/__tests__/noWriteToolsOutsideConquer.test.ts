import { TSESLint } from '@typescript-eslint/utils';
import { noWriteToolsOutsideConquer } from '../src/noWriteToolsOutsideConquer';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const DELIVERABLE_CONQUER =
  'packages/pipelines/asset-pack/src/agents/implementationDeliverablesAgentConquer/index.ts';

ruleTester.run('no-write-tools-outside-conquer', noWriteToolsOutsideConquer, {
  valid: [
    {
      filename: DELIVERABLE_CONQUER,
      code: "import { textEditorTool } from '@bitcode/generic-tools-files-maintaining';",
    },
    {
      filename: 'packages/pipelines/asset-pack/src/agents/implementationDeliverablesAgentDivideByFile/foo.ts',
      code: "import { definitionTool } from '@bitcode/generic-tools-lsp-query';",
    },
  ],
  invalid: [
    {
      filename: 'packages/other-agent/foo.ts',
      code: "import { textEditorTool, renameSymbolTool } from '@bitcode/generic-tools-files-maintaining';",
      errors: [
        {
          messageId: 'forbidden',
          data: { names: 'textEditorTool, renameSymbolTool' },
        },
      ],
    },
  ],
});
