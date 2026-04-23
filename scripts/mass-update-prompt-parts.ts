#!/usr/bin/env node
/**
 * Bitcode PromptPart mass-update utility.
 * 
 * This script performs a massive update of all prompt files to:
 * 1. Remove 'type Prompt = string'
 * 2. Import PromptPart type
 * 3. Update JSDoc to use @doc-comment-promptpartdoc
 * 4. Export as PROMPTPART_ with proper casting
 * 5. Move LSP-specific files from generic to specific
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as glob from 'glob';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const globAsync = promisify(glob);

interface UpdateStats {
  updated: number;
  moved: number;
  errors: number;
  skipped: number;
}

const stats: UpdateStats = {
  updated: 0,
  moved: 0,
  errors: 0,
  skipped: 0
};

// LSP-specific files to move
const LSP_FILES_TO_MOVE = [
  'prompt_generic_tool_context_awareness_lsp_footer.ts',
  'prompt_generic_tool_context_awareness_lsp_header.ts',
  'prompt_generic_tool_capabilities_lsp_footer.ts',
  'prompt_generic_tool_capabilities_lsp_header.ts',
  'prompt_generic_tool_context_awareness_lsp.ts',
  'prompt_generic_tool_capabilities_lsp_navigation.ts',
  'prompt_generic_tool_integration_pattern_lsp.ts',
  'prompt_generic_tool_best_for_lsp_analysis.ts',
  'prompt_generic_tool_output_lsp_locations.ts',
  'prompt_generic_lsp_protocol_integration.ts',
  'prompt_generic_lsp_semantic_patterns.ts',
  'prompt_generic_lsp_import_relationships.ts',
  'prompt_generic_lsp_type_systems.ts',
  'prompt_generic_lsp_project_structure.ts',
  'prompt_generic_code_intelligence.ts',
  'prompt_generic_tool_purpose_lsp_intelligence.ts'
];

async function updatePromptFile(filePath: string): Promise<boolean> {
  try {
    let content = await readFile(filePath, 'utf-8');
    const originalContent = content;
    
    // Skip if already updated
    if (content.includes('PromptPart') && content.includes('PROMPTPART_')) {
      console.log(`Already updated: ${path.basename(filePath)}`);
      stats.skipped++;
      return false;
    }
    
    // Extract the export name
    const exportMatch = content.match(/export\s+const\s+(\w+):\s*Prompt\s*=/);
    if (!exportMatch) {
      console.log(`No export found in: ${path.basename(filePath)}`);
      stats.errors++;
      return false;
    }
    
    const oldExportName = exportMatch[1];
    const newExportName = oldExportName.replace('PROMPT_', 'PROMPTPART_');
    
    // Remove 'type Prompt = string;'
    content = content.replace(/^type\s+Prompt\s*=\s*string;\s*$/m, '');
    
    // Add PromptPart import if not present
    if (!content.includes("import { PromptPart }")) {
      // Find the position after the JSDoc comment
      const importPosition = content.indexOf('*/') + 2;
      const importStatement = "\n\nimport { PromptPart } from '../../parts/PromptPart';";
      content = content.slice(0, importPosition) + importStatement + content.slice(importPosition);
    }
    
    // Update JSDoc to use @doc-comment-promptpartdoc
    content = content.replace(/^(\s*\/\*\*)/m, '$1\n * @doc-comment-promptpartdoc');
    
    // Update export to use PromptPart casting
    content = content.replace(
      new RegExp(`export\\s+const\\s+${oldExportName}:\\s*Prompt\\s*=\\s*(.+);`, 's'),
      (match, value) => {
        // Clean up the value - remove backticks if it's a template literal
        let cleanValue = value.trim();
        if (cleanValue.startsWith('`') && cleanValue.endsWith('`')) {
          cleanValue = cleanValue;
        } else if (cleanValue.startsWith("'") && cleanValue.endsWith("'")) {
          cleanValue = cleanValue;
        }
        return `export const ${newExportName} = ${cleanValue} as PromptPart;`;
      }
    );
    
    // Update any references in the same file
    content = content.replace(new RegExp(oldExportName, 'g'), newExportName);
    
    if (content !== originalContent) {
      await writeFile(filePath, content);
      console.log(`Updated: ${path.basename(filePath)}`);
      stats.updated++;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    stats.errors++;
    return false;
  }
}

async function moveToSpecific(fileName: string): Promise<void> {
  const genericPath = path.join(__dirname, '../packages/prompts/src/raw_promptparts/generic', fileName);
  const specificPath = path.join(__dirname, '../packages/prompts/src/raw_promptparts/specific', fileName.replace('_generic_', '_specific_'));
  
  try {
    if (fs.existsSync(genericPath)) {
      let content = await readFile(genericPath, 'utf-8');
      
      // Update the content for specific directory
      content = content.replace(/_generic_/g, '_specific_');
      content = content.replace(/PROMPT_GENERIC_/g, 'PROMPTPART_SPECIFIC_');
      content = content.replace(/generic_/g, 'specific_');
      
      // Ensure it has the proper structure
      await updatePromptFile(genericPath);
      content = await readFile(genericPath, 'utf-8');
      
      // Write to specific directory
      await writeFile(specificPath, content);
      
      // Delete from generic directory
      await unlink(genericPath);
      
      console.log(`Moved to specific: ${fileName} -> ${path.basename(specificPath)}`);
      stats.moved++;
    }
  } catch (error) {
    console.error(`Error moving ${fileName}:`, error);
    stats.errors++;
  }
}

async function updateImports(): Promise<void> {
  console.log('\nUpdating imports across codebase...\n');
  
  const files = await globAsync('packages/**/*.ts', {
    ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', '**/*.spec.ts']
  });
  
  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      let updated = false;
      
      // Update imports from PROMPT_ to PROMPTPART_
      const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"]/g;
      content = content.replace(importRegex, (match, imports, importPath) => {
        if (importPath.includes('prompt_')) {
          const updatedImports = imports.replace(/PROMPT_/g, 'PROMPTPART_');
          if (updatedImports !== imports) {
            updated = true;
            return `import { ${updatedImports} } from '${importPath}'`;
          }
        }
        return match;
      });
      
      // Update usage in code
      content = content.replace(/\bPROMPT_GENERIC_/g, 'PROMPTPART_GENERIC_');
      content = content.replace(/\bPROMPT_SPECIFIC_/g, 'PROMPTPART_SPECIFIC_');
      
      // Update moved LSP files
      for (const lspFile of LSP_FILES_TO_MOVE) {
        const genericImport = `@bitcode/prompts/raw_promptparts/generic/${lspFile.replace('.ts', '')}`;
        const specificImport = `@bitcode/prompts/raw_promptparts/specific/${lspFile.replace('.ts', '').replace('_generic_', '_specific_')}`;
        
        if (content.includes(genericImport)) {
          content = content.replace(genericImport, specificImport);
          updated = true;
        }
      }
      
      if (updated) {
        await writeFile(file, content);
        console.log(`Updated imports in: ${path.relative(process.cwd(), file)}`);
      }
    } catch (error) {
      console.error(`Error updating imports in ${file}:`, error);
    }
  }
}

async function main() {
  console.log('Bitcode PromptPart mass update\n');
  
  // Step 1: Move LSP-specific files
  console.log('Moving LSP-specific files to specific directory...\n');
  for (const file of LSP_FILES_TO_MOVE) {
    await moveToSpecific(file);
  }
  
  // Step 2: Update all prompt files
  console.log('\nUpdating prompt files...\n');
  
  const genericFiles = await globAsync('packages/prompts/src/raw_promptparts/generic/promptpart_*.ts');
  const specificFiles = await globAsync('packages/prompts/src/raw_promptparts/specific/promptpart_*.ts');
  
  for (const file of [...genericFiles, ...specificFiles]) {
    await updatePromptFile(file);
  }
  
  // Step 3: Update all imports across the codebase
  await updateImports();
  
  // Print statistics
  console.log('\nUpdate statistics:');
  console.log(`Updated: ${stats.updated} files`);
  console.log(`Moved: ${stats.moved} files`);
  console.log(`Skipped: ${stats.skipped} files`);
  console.log(`Errors: ${stats.errors} files`);
  console.log('\nBitcode PromptPart mass update complete.');
}

// Run the script
main().catch(console.error);
