/**
 * DocTestPlugin - Webpack plugin for build-time test intelligence processing
 * 
 * Following the same pattern as doc-comment and doc-prompt, this plugin
 * parses @doc-test comments and injects test metadata at build time.
 */

import type { Compiler, Module } from 'webpack';

const { parse } = require('@babel/parser') as { parse: (...args: any[]) => any };
const traverse = require('@babel/traverse').default as (...args: any[]) => any;
const generate = require('@babel/generator').default as (...args: any[]) => { code: string };
const t = require('@babel/types') as any;

/**
 * Doc-test comment types
 */
export type DocTestType = 
  | 'doc-test-fixture'
  | 'doc-test-scenario'
  | 'doc-test-behavior'
  | 'doc-test-composition'
  | 'doc-test-performance';

/**
 * Parsed doc-test comment
 */
export interface ParsedDocTest {
  type: DocTestType;
  metadata: Record<string, any>;
  raw: string;
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
}

/**
 * Doc-test plugin configuration
 */
export interface DocTestPluginConfig {
  /**
   * File patterns to include
   */
  include?: RegExp[];
  
  /**
   * File patterns to exclude
   */
  exclude?: RegExp[];
  
  /**
   * Whether to inject metadata at runtime
   */
  injectRuntime?: boolean;
  
  /**
   * Custom parsers for doc-test types
   */
  parsers?: Partial<Record<DocTestType, (comment: string) => any>>;
  
  /**
   * Output file for extracted test metadata
   */
  outputFile?: string;
}

/**
 * Webpack plugin for processing doc-test comments
 */
export class DocTestPlugin {
  private extractedMetadata: Map<string, ParsedDocTest[]> = new Map();
  
  constructor(private config: DocTestPluginConfig = {}) {}
  
  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap('DocTestPlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'DocTestPlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
        },
        async (assets, callback) => {
          try {
            await this.processAssets(compilation, assets);
            callback();
          } catch (error) {
            callback(error as Error);
          }
        }
      );
    });
    
    // Generate metadata file if configured
    if (this.config.outputFile) {
      compiler.hooks.emit.tapAsync('DocTestPlugin', (compilation, callback) => {
        const metadata = this.generateMetadataFile();
        compilation.assets[this.config.outputFile] = {
          source: () => metadata,
          size: () => metadata.length
        } as any;
        callback();
      });
    }
  }
  
  private async processAssets(compilation: any, assets: any): Promise<void> {
    for (const filename in assets) {
      if (!this.shouldProcessFile(filename)) continue;
      
      const asset = assets[filename];
      const source = asset.source();
      
      if (typeof source !== 'string') continue;
      
      try {
        const processed = await this.processSource(source, filename);
        if (processed !== source) {
          assets[filename] = {
            source: () => processed,
            size: () => processed.length
          };
        }
      } catch (error) {
        compilation.errors.push(new Error(`DocTestPlugin: Error processing ${filename}: ${error}`));
      }
    }
  }
  
  private async processSource(source: string, filename: string): Promise<string> {
    // Parse the source
    const ast = parse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'decorators-legacy'],
      attachComment: true
    });
    
    const docTests: ParsedDocTest[] = [];
    let modified = false;
    
    // Traverse AST to find doc-test comments
    traverse(ast, {
      enter(path) {
        const { node } = path;
        
        // Check leading comments
        if (node.leadingComments) {
          for (const comment of node.leadingComments) {
            const parsed = this.parseDocTestComment(comment.value);
            if (parsed) {
              docTests.push({
                ...parsed,
                loc: comment.loc!
              });
              
              // Inject metadata if configured
              if (this.config.injectRuntime) {
                modified = true;
                this.injectMetadata(path, parsed);
              }
            }
          }
        }
      }
    });
    
    // Store extracted metadata
    if (docTests.length > 0) {
      this.extractedMetadata.set(filename, docTests);
    }
    
    // Generate code if modified
    if (modified) {
      const { code } = generate(ast, {
        retainLines: true,
        comments: true
      });
      return code;
    }
    
    return source;
  }
  
  private parseDocTestComment(comment: string): Omit<ParsedDocTest, 'loc'> | null {
    // Match @doc-test-* pattern
    const match = comment.match(/@(doc-test-\w+)\s*([\s\S]*)/);
    if (!match) return null;
    
    const type = match[1] as DocTestType;
    const content = match[2].trim();
    
    // Use custom parser if provided
    const customParser = this.config.parsers?.[type];
    if (customParser) {
      return {
        type,
        metadata: customParser(content),
        raw: comment
      };
    }
    
    // Default parsing
    const metadata = this.defaultParser(type, content);
    
    return {
      type,
      metadata,
      raw: comment
    };
  }
  
  private defaultParser(type: DocTestType, content: string): Record<string, any> {
    const metadata: Record<string, any> = {};
    
    // Parse key-value pairs from content
    const lines = content.split('\n');
    for (const line of lines) {
      const kvMatch = line.match(/@(\w+)\s+(.*)/);
      if (kvMatch) {
        const [, key, value] = kvMatch;
        
        // Try to parse JSON values
        try {
          metadata[key] = JSON.parse(value);
        } catch {
          // Fall back to string value
          metadata[key] = value.trim();
        }
      }
    }
    
    // Type-specific parsing
    switch (type) {
      case 'doc-test-fixture':
        this.parseFixtureMetadata(metadata, content);
        break;
      
      case 'doc-test-scenario':
        this.parseScenarioMetadata(metadata, content);
        break;
      
      case 'doc-test-behavior':
        this.parseBehaviorMetadata(metadata, content);
        break;
      
      case 'doc-test-composition':
        this.parseCompositionMetadata(metadata, content);
        break;
      
      case 'doc-test-performance':
        this.parsePerformanceMetadata(metadata, content);
        break;
    }
    
    return metadata;
  }
  
  private parseFixtureMetadata(metadata: Record<string, any>, content: string): void {
    // Parse fixture-specific metadata
    if (!metadata.id) {
      metadata.id = 'unnamed-fixture';
    }
    
    // Parse arrays
    if (metadata.tags && typeof metadata.tags === 'string') {
      metadata.tags = metadata.tags.split(',').map(s => s.trim());
    }
    
    if (metadata.features && typeof metadata.features === 'string') {
      metadata.features = metadata.features.split(',').map(s => s.trim());
    }
  }
  
  private parseScenarioMetadata(metadata: Record<string, any>, content: string): void {
    // Parse scenario-specific metadata
    if (!metadata.id) {
      metadata.id = 'unnamed-scenario';
    }
    
    // Parse phases
    if (metadata.phases && typeof metadata.phases === 'string') {
      metadata.phases = metadata.phases.split(',').map(s => s.trim());
    }
  }
  
  private parseBehaviorMetadata(metadata: Record<string, any>, content: string): void {
    // Parse behavior conditions
    const conditions = ['when', 'then', 'and', 'expect'];
    for (const condition of conditions) {
      const match = content.match(new RegExp(`@${condition}\\s+(.+)`));
      if (match) {
        metadata[condition] = match[1].trim();
      }
    }
  }
  
  private parseCompositionMetadata(metadata: Record<string, any>, content: string): void {
    // Parse composition parts
    if (metadata.parts && typeof metadata.parts === 'string') {
      metadata.parts = metadata.parts.split(',').map(s => s.trim());
    }
  }
  
  private parsePerformanceMetadata(metadata: Record<string, any>, content: string): void {
    // Parse performance constraints
    const constraints = ['timeout', 'memoryLimit', 'cpuLimit'];
    for (const constraint of constraints) {
      if (metadata[constraint] && typeof metadata[constraint] === 'string') {
        metadata[constraint] = parseInt(metadata[constraint], 10);
      }
    }
  }
  
  private injectMetadata(path: any, docTest: Omit<ParsedDocTest, 'loc'>): void {
    const { node } = path;
    
    // Only inject for specific node types
    if (!t.isVariableDeclaration(node) && 
        !t.isFunctionDeclaration(node) && 
        !t.isClassDeclaration(node) &&
        !t.isExportNamedDeclaration(node)) {
      return;
    }
    
    // Create metadata object
    const metadataObj = t.objectExpression(
      Object.entries(docTest.metadata).map(([key, value]) => {
        return t.objectProperty(
          t.identifier(key),
          this.valueToAST(value)
        );
      })
    );
    
    // Inject based on node type
    if (t.isVariableDeclaration(node) && node.declarations.length > 0) {
      const declaration = node.declarations[0];
      if (t.isIdentifier(declaration.id)) {
        // Add __testMetadata property
        const assignment = t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(
              declaration.id,
              t.identifier('__testMetadata')
            ),
            metadataObj
          )
        );
        
        path.insertAfter(assignment);
      }
    } else if (t.isFunctionDeclaration(node) || t.isClassDeclaration(node)) {
      if (node.id) {
        // Add static property
        const assignment = t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(
              node.id,
              t.identifier('__testMetadata')
            ),
            metadataObj
          )
        );
        
        path.insertAfter(assignment);
      }
    }
  }
  
  private valueToAST(value: any): any {
    if (typeof value === 'string') {
      return t.stringLiteral(value);
    } else if (typeof value === 'number') {
      return t.numericLiteral(value);
    } else if (typeof value === 'boolean') {
      return t.booleanLiteral(value);
    } else if (Array.isArray(value)) {
      return t.arrayExpression(value.map(v => this.valueToAST(v)));
    } else if (value === null) {
      return t.nullLiteral();
    } else if (typeof value === 'object') {
      return t.objectExpression(
        Object.entries(value).map(([k, v]) => 
          t.objectProperty(t.identifier(k), this.valueToAST(v))
        )
      );
    }
    
    return t.identifier('undefined');
  }
  
  private shouldProcessFile(filename: string): boolean {
    // Check if file should be processed
    if (!filename.match(/\.(js|jsx|ts|tsx)$/)) {
      return false;
    }
    
    // Check exclude patterns
    if (this.config.exclude) {
      for (const pattern of this.config.exclude) {
        if (pattern.test(filename)) {
          return false;
        }
      }
    }
    
    // Check include patterns
    if (this.config.include) {
      for (const pattern of this.config.include) {
        if (pattern.test(filename)) {
          return true;
        }
      }
      return false;
    }
    
    return true;
  }
  
  private generateMetadataFile(): string {
    const metadata: Record<string, any> = {};
    
    for (const [filename, docTests] of this.extractedMetadata) {
      metadata[filename] = docTests.map(dt => ({
        type: dt.type,
        metadata: dt.metadata,
        location: dt.loc
      }));
    }
    
    return JSON.stringify(metadata, null, 2);
  }
}
