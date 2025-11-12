import { TSESTree as T, ESLintUtils } from '@typescript-eslint/utils';

/*
 * -------------------------------------------------------------------------------------------------
 * no-write-tools-outside-conquer
 * -------------------------------------------------------------------------------------------------
 * Prevents any file other than the Conquer agent implementation from importing AI tools that have
 * side-effects on the codebase or external systems ("write" tools).
 *
 * Rationale: Our multi-agent pipeline purposely restricts mutating capabilities to the Conquer
 * phase.  Discovery, Divide, etc. must stay read-only to guarantee safety and determinism.
 *
 * The rule reports an ESLint error whenever one of the WRITE_TOOLS identifiers is imported from a
 * file whose absolute path does NOT match the ALLOWED_FILES regex.
 */

// -------------------------------------------------------------------------------------------------
// 1. Catalogue of write-capable tools --------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const WRITE_TOOLS = new Set<string>([
  // generic-tools/files-maintaining
  'textEditorTool',
  'deleteFileTool',
  'renameFileTool',
  'directoryTool',

  // generic-tools/code-refactor
  'renameSymbolTool',

  // generic-tools/git-interactor
  'cloneRepositoryTool',
  'createFileContentTool',
  'updateFileContentTool',
  'deleteFileContentTool',
  'createPullRequestTool',
  'createIssueTool',
  'leaveCommentOnIssueTool',
  'createReferenceTool',

  // mcps-tools/aws – remote state mutation
  'awsS3PutObjectTool',
  'awsDynamoPutItemTool',
  'awsLambdaInvokeTool',
]);

// -------------------------------------------------------------------------------------------------
// 2. Allowed file paths ---------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

// Any file that lives inside an `agents` folder **and** whose path contains the substring
// `implementation` (case-insensitive) is considered part of an implementation-phase agent and is
// therefore *allowed* to import write tools.
//
// This captures all current pipelines:
//   • deliverable  – implementationDeliverablesAgentConquer / Correct / etc.
//   • measure      – implementationMeasureAgents*
//   • ad-hoc       – ImplementationAgent (in ad-hoc pipeline)
//
// If new pipelines adopt the same naming convention they will automatically be covered.  To remain
// safe we insist on the `agents` directory segment so that generic helpers named “implementation*”
// elsewhere in the repo cannot accidentally gain write privileges.
const ALLOWED_PATH = /[\\/]agents[\\/].*implementation.*agent/i;

// -------------------------------------------------------------------------------------------------
// 3. Rule implementation --------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

export const noWriteToolsOutsideConquer = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    messages: {
      forbidden:
        'Importing write tool(s) {{names}} outside implementation-phase agents is prohibited.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(ctx) {
    const filename = ctx.getFilename();

    // Skip checks for node_modules or generated files quickly
    if (/node_modules/.test(filename)) return {};

    // Allow-list: if the file lives under the Conquer agent folder, skip rule.
    if (ALLOWED_PATH.test(filename)) {
      return {};
    }

    return {
      ImportDeclaration(node: T.ImportDeclaration) {
        const badImports: string[] = [];

        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') continue;

          const importedName = (specifier.imported as T.Identifier).name;
          if (WRITE_TOOLS.has(importedName)) {
            badImports.push(importedName);
          }
        }

        if (badImports.length) {
          ctx.report({
            node,
            messageId: 'forbidden',
            data: { names: badImports.join(', ') },
          });
        }
      },
    };
  },
});
