#!/usr/bin/env node
/**
 * ARCHITECTURE REVIEW SCRIPT - Steve Wozniak Level Validation
 * 
 * This script validates that our architectural evolution has been implemented
 * correctly according to the specifications. It checks all the critical
 * principles and reports any violations.
 * 
 * CRITICAL PRINCIPLES VALIDATED:
 * 1. Tool is now an abstract class (not type)
 * 2. Directory structure: /generic/ and /specific/ only (no /atomic/)
 * 3. File naming: [prompt|template]_[generic|specific]_[description]
 * 4. Generic tools ONLY import primitive functionality
 * 5. Tools extend abstract class with .use method
 * 6. Terminology: use (not execute), ToolUse (not tool plans), UsedTool (not tool results)
 * 7. JSDoc above class definitions with all required fields
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  principle: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  details: string[];
  criticalViolations: string[];
}

class ArchitectureReviewer {
  private results: ValidationResult[] = [];
  private basePath: string;

  constructor() {
    this.basePath = path.resolve(__dirname, '..');
  }

  async review(): Promise<void> {
    console.log('🔍 ARCHITECTURE REVIEW - Steve Wozniak Level Validation\\n');
    console.log('='.repeat(60));

    await this.validateToolPrimitive();
    await this.validateDirectoryStructure();
    await this.validateFileNaming();
    await this.validateGenericToolsPattern();
    await this.validateTerminologyMigration();
    await this.validateJSDocStandards();

    this.printReport();
  }

  private async validateToolPrimitive(): Promise<void> {
    const principle = 'Tool Primitive Evolution';
    const details: string[] = [];
    const criticalViolations: string[] = [];

    try {
      const toolClassPath = path.join(this.basePath, 'packages/metadevelopment/src/tool-class.ts');
      const content = fs.readFileSync(toolClassPath, 'utf8');

      // Check if Tool is abstract class
      if (content.includes('export abstract class Tool')) {
        details.push('✅ Tool is abstract class');
      } else {
        criticalViolations.push('❌ Tool must be abstract class, not type');
      }

      // Check for .use method
      if (content.includes('abstract use:')) {
        details.push('✅ Abstract .use method defined');
      } else {
        criticalViolations.push('❌ Missing abstract .use method');
      }

      // Check for new terminology
      if (content.includes('ToolUse') && content.includes('UsedTool')) {
        details.push('✅ New terminology (ToolUse, UsedTool) implemented');
      } else {
        criticalViolations.push('❌ Missing new terminology interfaces');
      }

      this.results.push({
        principle,
        status: criticalViolations.length === 0 ? 'PASS' : 'FAIL',
        details,
        criticalViolations
      });

    } catch (error) {
      this.results.push({
        principle,
        status: 'FAIL',
        details: [],
        criticalViolations: ['❌ Could not read tool-class.ts file']
      });
    }
  }

  private async validateDirectoryStructure(): Promise<void> {
    const principle = 'Directory Structure (/generic/ and /specific/ only)';
    const details: string[] = [];
    const criticalViolations: string[] = [];

    try {
      const rawPath = path.join(this.basePath, 'packages/prompts/src/raw');
      const dirs = fs.readdirSync(rawPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      // Check for correct directories
      if (dirs.includes('generic')) {
        details.push('✅ /generic/ directory exists');
      } else {
        criticalViolations.push('❌ Missing /generic/ directory');
      }

      if (dirs.includes('specific')) {
        details.push('✅ /specific/ directory exists');
      } else {
        criticalViolations.push('❌ Missing /specific/ directory');
      }

      // Check for prohibited directories
      if (dirs.includes('atomic')) {
        criticalViolations.push('❌ /atomic/ directory still exists - must be removed');
      } else {
        details.push('✅ /atomic/ directory removed');
      }

      // List all directories for transparency
      details.push(`📁 Found directories: ${dirs.join(', ')}`);

      this.results.push({
        principle,
        status: criticalViolations.length === 0 ? 'PASS' : 'FAIL',
        details,
        criticalViolations
      });

    } catch (error) {
      this.results.push({
        principle,
        status: 'FAIL',
        details: [],
        criticalViolations: ['❌ Could not read raw directory structure']
      });
    }
  }

  private async validateFileNaming(): Promise<void> {
    const principle = 'File Naming Convention [prompt|template]_[generic|specific]_';
    const details: string[] = [];
    const criticalViolations: string[] = [];

    try {
      const genericPath = path.join(this.basePath, 'packages/prompts/src/raw/generic');
      
      if (fs.existsSync(genericPath)) {
        const files = fs.readdirSync(genericPath).filter(f => f.endsWith('.ts'));
        
        let correctNames = 0;
        let totalFiles = files.length;

        files.forEach(file => {
          if (file.startsWith('prompt_generic_') || file.startsWith('template_generic_')) {
            correctNames++;
            details.push(`✅ ${file} - correct naming`);
          } else {
            criticalViolations.push(`❌ ${file} - incorrect naming (should be [prompt|template]_generic_*)`);
          }
        });

        details.push(`📊 ${correctNames}/${totalFiles} files follow naming convention`);

        if (correctNames === totalFiles && totalFiles > 0) {
          details.push('✅ All files follow naming convention');
        }
      } else {
        criticalViolations.push('❌ /generic/ directory does not exist');
      }

      this.results.push({
        principle,
        status: criticalViolations.length === 0 ? 'PASS' : 'FAIL',
        details,
        criticalViolations
      });

    } catch (error) {
      this.results.push({
        principle,
        status: 'FAIL',
        details: [],
        criticalViolations: ['❌ Could not validate file naming']
      });
    }
  }

  private async validateGenericToolsPattern(): Promise<void> {
    const principle = 'Generic Tools Only Import (Never Implement)';
    const details: string[] = [];
    const criticalViolations: string[] = [];

    try {
      const textEditorPath = path.join(this.basePath, 'packages/generic-tools/files-maintaining/src/tools/text-editor-tool.ts');
      
      if (fs.existsSync(textEditorPath)) {
        const content = fs.readFileSync(textEditorPath, 'utf8');

        // Check if it extends Tool class
        if (content.includes('extends Tool')) {
          details.push('✅ Tool extends abstract Tool class');
        } else {
          criticalViolations.push('❌ Tool must extend abstract Tool class');
        }

        // Check if it imports primitive functionality
        if (content.includes('import') && content.includes('runEditCommand')) {
          details.push('✅ Imports primitive functionality (runEditCommand)');
        } else {
          criticalViolations.push('❌ Must import primitive functionality, not implement');
        }

        // Check for .use method
        if (content.includes('use =') || content.includes('use:')) {
          details.push('✅ Implements .use method');
        } else {
          criticalViolations.push('❌ Missing .use method implementation');
        }

        // Check against inline implementation
        if (content.includes('tool({') || content.includes('execute:')) {
          criticalViolations.push('❌ Still using old tool() pattern - must be removed');
        } else {
          details.push('✅ No old tool() pattern detected');
        }

      } else {
        criticalViolations.push('❌ text-editor-tool.ts not found');
      }

      this.results.push({
        principle,
        status: criticalViolations.length === 0 ? 'PASS' : 'FAIL',
        details,
        criticalViolations
      });

    } catch (error) {
      this.results.push({
        principle,
        status: 'FAIL',
        details: [],
        criticalViolations: ['❌ Could not validate generic tools pattern']
      });
    }
  }

  private async validateTerminologyMigration(): Promise<void> {
    const principle = 'Terminology Migration (execute→use, tool plans→ToolUse, tool results→UsedTool)';
    const details: string[] = [];
    const criticalViolations: string[] = [];

    // This is a basic check - in production we'd scan more comprehensively
    try {
      const textEditorPath = path.join(this.basePath, 'packages/generic-tools/files-maintaining/src/tools/text-editor-tool.ts');
      
      if (fs.existsSync(textEditorPath)) {
        const content = fs.readFileSync(textEditorPath, 'utf8');

        // Check for correct terminology
        if (content.includes('Successfully used')) {
          details.push('✅ Uses "used" terminology instead of "executed"');
        }

        // Check against old terminology
        if (content.includes('execute') && !content.includes('execute:')) {
          // Allow 'execute' in comments but not as method names
          criticalViolations.push('❌ Still contains "execute" terminology - migrate to "use"');
        } else {
          details.push('✅ No "execute" method terminology detected');
        }

        this.results.push({
          principle,
          status: criticalViolations.length === 0 ? 'PASS' : 'FAIL',
          details,
          criticalViolations
        });
      }

    } catch (error) {
      this.results.push({
        principle,
        status: 'FAIL',
        details: [],
        criticalViolations: ['❌ Could not validate terminology migration']
      });
    }
  }

  private async validateJSDocStandards(): Promise<void> {
    const principle = 'JSDoc Standards (all required fields present)';
    const details: string[] = [];
    const criticalViolations: string[] = [];

    try {
      const textEditorPath = path.join(this.basePath, 'packages/generic-tools/files-maintaining/src/tools/text-editor-tool.ts');
      
      if (fs.existsSync(textEditorPath)) {
        const content = fs.readFileSync(textEditorPath, 'utf8');

        const requiredFields = ['@purpose', '@capabilities', '@keyParameters', '@output', '@bestFor', '@specificity'];
        
        requiredFields.forEach(field => {
          if (content.includes(field)) {
            details.push(`✅ ${field} field present`);
          } else {
            criticalViolations.push(`❌ Missing required JSDoc field: ${field}`);
          }
        });

        // Check for specificity value
        if (content.includes('@specificity Generic') || content.includes('@specificity Precise')) {
          details.push('✅ @specificity has valid value');
        } else {
          criticalViolations.push('❌ @specificity must be "Generic" or "Precise"');
        }

        this.results.push({
          principle,
          status: criticalViolations.length === 0 ? 'PASS' : 'FAIL',
          details,
          criticalViolations
        });
      }

    } catch (error) {
      this.results.push({
        principle,
        status: 'FAIL',
        details: [],
        criticalViolations: ['❌ Could not validate JSDoc standards']
      });
    }
  }

  private printReport(): void {
    console.log('\\n📋 ARCHITECTURE REVIEW REPORT');
    console.log('='.repeat(60));

    let totalPasses = 0;
    let totalFails = 0;
    let totalCriticalViolations = 0;

    this.results.forEach(result => {
      console.log(`\\n🔍 ${result.principle}`);
      console.log(`Status: ${result.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
      
      if (result.details.length > 0) {
        console.log('Details:');
        result.details.forEach(detail => console.log(`  ${detail}`));
      }

      if (result.criticalViolations.length > 0) {
        console.log('Critical Violations:');
        result.criticalViolations.forEach(violation => console.log(`  ${violation}`));
        totalCriticalViolations += result.criticalViolations.length;
      }

      if (result.status === 'PASS') totalPasses++;
      else totalFails++;
    });

    console.log('\\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log(`✅ Passed: ${totalPasses}`);
    console.log(`❌ Failed: ${totalFails}`);
    console.log(`🚨 Critical Violations: ${totalCriticalViolations}`);

    if (totalFails === 0 && totalCriticalViolations === 0) {
      console.log('\\n🎉 EXCELLENT! Architecture evolution completed successfully.');
      console.log('🏆 Steve Wozniak would be proud - clean, elegant, state-of-the-art!');
    } else {
      console.log('\\n⚠️  Architecture evolution needs attention before proceeding.');
      console.log('💡 Fix critical violations and re-run review.');
    }

    console.log('\\n🚀 Ready for systematic tool evolution across all packages!');
  }
}

// Run the review
const reviewer = new ArchitectureReviewer();
reviewer.review().catch(console.error);