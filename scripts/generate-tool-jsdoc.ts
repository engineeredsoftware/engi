#!/usr/bin/env node
/**
 * TOOL JSDOC GENERATOR - THE MOST ELEGANT SOLUTION
 * 
 * This script generates incredible JSDoc comments for tools by composing
 * atomic prompt parts. Developers run this script, copy the output,
 * and paste it above their tool classes. Steve Wozniak-level elegance!
 * 
 * USAGE:
 * ```bash
 * npx ts-node scripts/generate-tool-jsdoc.ts textEditor
 * ```
 * 
 * The script outputs perfectly formatted JSDoc that you copy-paste
 * above your tool class. Maximum elegance, zero complexity!
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Simulated prompt parts (in production these would be imported)
 * For now, we'll define them inline to demonstrate the concept
 */
const PROMPT_PARTS = {
  TEXT_EDITOR: {
    purpose: 'Comprehensive file editing with atomic operations, transaction support, and production-grade error recovery for reliable file management',
    capabilities: 'Complete file operation suite: view, create, replace, delete, str_replace, insert, patch with automatic backup creation, rollback support, and repository-aware editing',
    keyParameters: 'command (operation type), path (file path), file_text, old_str, new_str, insert_line, atomic (safety mode), backup (versioning options)',
    output: 'Structured results with success status, operation details, comprehensive error handling, and actionable feedback for reliable operation tracking',
    bestFor: 'Production-grade operations, complex multi-step workflows, mission-critical tasks requiring reliability guarantees, and enterprise-level automation',
    strategicUsage: 'Essential for all file manipulation operations, providing production-grade reliability and safety for complex editing workflows and multi-file operations',
    integrationPattern: 'Core tool for file operations, often used in coordination with repository tools for comprehensive file management and content updates',
    contextAwareness: 'Leverages repository context and project structure for intelligent file operations with safety validation and consistency maintenance'
  },
  
  RENAME_SYMBOL: {
    purpose: 'Repository-wide symbol renaming with LSP semantic analysis and atomic operations',
    capabilities: 'Symbol identification, dependency tracking, cross-file renaming, rollback support, and semantic validation',
    keyParameters: 'filePath (target file), position (symbol position), newName (replacement name), atomic (safety mode)',
    output: 'Detailed rename report with affected files, change counts, and success confirmation',
    bestFor: 'Large-scale refactoring, symbol standardization, and repository-wide consistency improvements',
    strategicUsage: 'Critical for maintaining code quality during refactoring operations',
    integrationPattern: 'Works with LSP servers and version control systems for safe renaming',
    contextAwareness: 'Uses semantic analysis to ensure rename safety and completeness'
  },
  
  GIT_OPERATIONS: {
    purpose: 'Git repository operations with branch management and remote synchronization',
    capabilities: 'Branch operations, commit management, remote operations, and repository state tracking',
    keyParameters: 'operation (git command), repository (target repo), branch (target branch), options (command options)',
    output: 'Git operation results with status, output, and any errors or warnings',
    bestFor: 'Automated git workflows, branch management, and repository synchronization',
    strategicUsage: 'Essential for pipeline automation and version control operations',
    integrationPattern: 'Integrates with GitHub/GitLab APIs and local git repositories',
    contextAwareness: 'Repository-aware with branch and commit state tracking'
  }
};

/**
 * Generate JSDoc for a specific tool
 */
function generateToolJSDoc(toolKey: string): string {
  const parts = PROMPT_PARTS[toolKey.toUpperCase() as keyof typeof PROMPT_PARTS];
  
  if (!parts) {
    throw new Error(`Unknown tool: ${toolKey}. Available: ${Object.keys(PROMPT_PARTS).join(', ')}`);
  }
  
  const toolName = toolKey.toUpperCase().replace('_', ' ') + ' TOOL';
  
  return `/**
 * ${toolName} - ${parts.purpose.split(',')[0]}
 * 
 * @purpose ${parts.purpose}
 * @capabilities ${parts.capabilities}
 * @keyParameters ${parts.keyParameters}
 * @output ${parts.output}
 * @bestFor ${parts.bestFor}
 * @strategicUsage ${parts.strategicUsage}
 * @integrationPattern ${parts.integrationPattern}
 * @contextAwareness ${parts.contextAwareness}
 * @specificity Generic
 */`;
}

/**
 * Generate complete tool file template
 */
function generateToolTemplate(toolKey: string, primitive: string): string {
  const jsdoc = generateToolJSDoc(toolKey);
  const className = toolKey.charAt(0).toUpperCase() + toolKey.slice(1) + 'Tool';
  const exportName = toolKey + 'Tool';
  
  return `import { Tool } from '@engi/tools-generics';
import { ${primitive} } from '@engi/your-primitive-package';

${jsdoc}
class ${className} extends Tool<typeof ${primitive}> {
  use = ${primitive};
}

export const ${exportName} = new ${className}();
export type ${className}Fn = Tool<typeof ${exportName}.use>;`;
}

/**
 * Main execution
 */
function main() {
  const toolKey = process.argv[2];
  
  if (!toolKey) {
    console.log('🔧 TOOL JSDOC GENERATOR');
    console.log('='.repeat(50));
    console.log('');
    console.log('Usage: npx ts-node scripts/generate-tool-jsdoc.ts <toolName>');
    console.log('');
    console.log('Available tools:');
    Object.keys(PROMPT_PARTS).forEach(key => {
      console.log(`  - ${key.toLowerCase()}`);
    });
    console.log('');
    console.log('Example: npx ts-node scripts/generate-tool-jsdoc.ts textEditor');
    console.log('');
    return;
  }
  
  try {
    const jsdoc = generateToolJSDoc(toolKey);
    
    console.log('🎯 GENERATED JSDOC FOR ' + toolKey.toUpperCase() + ' TOOL');
    console.log('='.repeat(80));
    console.log('');
    console.log('📋 COPY THIS JSDOC:');
    console.log('-'.repeat(40));
    console.log(jsdoc);
    console.log('-'.repeat(40));
    console.log('');
    console.log('🔧 USAGE:');
    console.log('1. Copy the JSDoc above');
    console.log('2. Paste it above your tool class');
    console.log('3. Add your class extending Tool<typeof primitive>');
    console.log('4. Set use = primitiveFunction');
    console.log('5. Enjoy incredible documentation! 🚀');
    console.log('');
    
    // Also generate complete template
    console.log('📝 COMPLETE TOOL TEMPLATE:');
    console.log('-'.repeat(80));
    console.log(generateToolTemplate(toolKey, 'yourPrimitiveFunction'));
    console.log('-'.repeat(80));
    
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { generateToolJSDoc, generateToolTemplate };