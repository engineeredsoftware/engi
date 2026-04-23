#!/usr/bin/env node
/**
 * Bitcode tool prompt documentation generator.
 *
 * This support script generates doc-code tool comments from stable prompt
 * description parts. It exists to keep tool prompt descriptions complete for
 * agentic Bitcode runs without making the generated comment the protocol
 * object. The protocol object remains the prompt/tool/agent/execution record
 * and the asset-pack effect that the tool helps produce.
 */

import * as process from 'node:process';

interface ToolPromptDescription {
  purpose: string;
  capabilities: string;
  keyParameters: string;
  output: string;
  bestFor: string;
  strategicUsage: string;
  integrationPattern: string;
  contextAwareness: string;
  bitcodeRole: string;
}

const TOOL_PROMPT_DESCRIPTIONS: Record<string, ToolPromptDescription> = {
  TEXT_EDITOR: {
    purpose:
      'Repository file editing with bounded operations, transaction support, and recovery semantics for reliable asset-pack synthesis',
    capabilities:
      'View, create, replace, delete, string replace, insert, and patch operations with backup, rollback, and repository-aware validation',
    keyParameters:
      'command (operation type), path (file path), file_text, old_str, new_str, insert_line, atomic (safety mode), backup (versioning options)',
    output:
      'Structured operation result with success status, changed paths, error details, and follow-up guidance for execution records',
    bestFor:
      'Bitcode runs that need precise written-asset changes, repair patches, or repository-contained file updates',
    strategicUsage:
      'Use as a write primitive behind agentic execution phases after need, repository scope, and asset-pack intent are understood',
    integrationPattern:
      'Pairs with repository, diff, prompt, and execution carriers so file changes stay auditable as written assets',
    contextAwareness:
      'Reads repository structure and target path state before changing files, then returns enough detail for proof and reread surfaces',
    bitcodeRole:
      'support-tool-prompt'
  },

  RENAME_SYMBOL: {
    purpose:
      'Repository-wide symbol renaming with semantic analysis and bounded write reporting',
    capabilities:
      'Symbol identification, dependency tracking, cross-file renaming, rollback support, semantic validation, and conflict detection',
    keyParameters:
      'filePath (target file), position (symbol position), newName (replacement name), atomic (safety mode)',
    output:
      'Rename report with affected files, change counts, dependency notes, and validation result',
    bestFor:
      'Large refactors that must preserve source behavior while improving Bitcode package or interface boundaries',
    strategicUsage:
      'Use when a need requires symbol-level reform rather than text-only replacement',
    integrationPattern:
      'Combines LSP/refactoring primitives with execution records and repository proof artifacts',
    contextAwareness:
      'Uses semantic reference analysis so renames can be audited against affected source paths',
    bitcodeRole:
      'support-tool-prompt'
  },

  GIT_OPERATIONS: {
    purpose:
      'Repository state operations for branch, commit, and synchronization support inside Bitcode runs',
    capabilities:
      'Branch inspection, commit staging support, remote state reading, and repository status reporting',
    keyParameters:
      'operation (git command), repository (target repo), branch (target branch), options (command options)',
    output:
      'Repository operation result with status, stdout/stderr details, and errors or warnings',
    bestFor:
      'Agentic execution phases that need source-state proof, branch context, or connected-interface delivery preparation',
    strategicUsage:
      'Use as support infrastructure around stable asset-pack outputs, not as the definition of the output itself',
    integrationPattern:
      'Feeds VCS, proof, and delivery-mechanism wrappers such as pull request creation',
    contextAwareness:
      'Reports branch and commit state so downstream proof and shipping phases can stay deterministic',
    bitcodeRole:
      'support-tool-prompt'
  }
};

function generateToolJSDoc(toolKey: string): string {
  const parts = TOOL_PROMPT_DESCRIPTIONS[toolKey.toUpperCase()];

  if (!parts) {
    throw new Error(`Unknown tool: ${toolKey}. Available: ${Object.keys(TOOL_PROMPT_DESCRIPTIONS).join(', ')}`);
  }

  const toolName = `${toolKey.toUpperCase().replace(/_/gu, ' ')} TOOL`;

  return `/**
 * ${toolName} - ${parts.purpose}
 *
 * @doc-code-tool
 * @purpose ${parts.purpose}
 * @capabilities ${parts.capabilities}
 * @keyParameters ${parts.keyParameters}
 * @output ${parts.output}
 * @bestFor ${parts.bestFor}
 * @strategicUsage ${parts.strategicUsage}
 * @integrationPattern ${parts.integrationPattern}
 * @contextAwareness ${parts.contextAwareness}
 * @bitcodeRole ${parts.bitcodeRole}
 * @specificity Generic
 */`;
}

function generateToolTemplate(toolKey: string, primitive: string): string {
  const jsdoc = generateToolJSDoc(toolKey);
  const className = `${toolKey.charAt(0).toUpperCase()}${toolKey.slice(1)}Tool`;
  const exportName = `${toolKey}Tool`;

  return `import { Tool } from '@bitcode/tools-generics';
import { ${primitive} } from '@bitcode/your-primitive-package';

${jsdoc}
class ${className} extends Tool<typeof ${primitive}> {
  use = ${primitive};
}

export const ${exportName} = new ${className}();
export type ${className}Fn = Tool<typeof ${exportName}.use>;`;
}

function main(): void {
  const toolKey = process.argv[2];

  if (!toolKey) {
    console.log('Bitcode tool prompt documentation generator');
    console.log('='.repeat(56));
    console.log('Usage: npx ts-node scripts/generate-tool-jsdoc.ts <toolName>');
    console.log('');
    console.log('Available tools:');
    for (const key of Object.keys(TOOL_PROMPT_DESCRIPTIONS)) {
      console.log(`  - ${key.toLowerCase()}`);
    }
    return;
  }

  try {
    const jsdoc = generateToolJSDoc(toolKey);

    console.log(`Generated doc-code tool comment for ${toolKey.toUpperCase()}`);
    console.log('-'.repeat(80));
    console.log(jsdoc);
    console.log('-'.repeat(80));
    console.log('');
    console.log('Complete tool template:');
    console.log('-'.repeat(80));
    console.log(generateToolTemplate(toolKey, 'yourPrimitiveFunction'));
    console.log('-'.repeat(80));
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('generate-tool-jsdoc.ts')) {
  main();
}

export { generateToolJSDoc, generateToolTemplate };
