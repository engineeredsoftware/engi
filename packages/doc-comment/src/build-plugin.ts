/**
 * DOC-COMMENT BUILD PLUGIN - TypeScript Transformer for Build-Time Processing
 * 
 * This TypeScript transformer parses doc-comments and enables metadata injection.
 * At build time, we parse, validate, and prepare runtime metadata.
 * 
 * @doc-plugin
 * stage: build-time
 * method: AST transformation with metadata injection
 * architecture: "Transform comments into runtime metadata through plugins"
 */

import * as ts from 'typescript';
import * as path from 'path';
import { DocCommentParser } from './parser';
import { DocCommentPlugin } from './types';
import { docTypeScriptPlugin } from './plugins/doc-typescript';

/**
 * The master registry of doc-comment plugins
 * Each plugin handles a specific pattern and injection strategy
 */
export class DocCommentPluginRegistry {
  private static instance: DocCommentPluginRegistry;
  private plugins: Map<string, DocCommentPlugin> = new Map();
  
  private constructor() {
    // Register core plugins
    this.register(docTypeScriptPlugin);
  }
  
  static getInstance(): DocCommentPluginRegistry {
    if (!this.instance) {
      this.instance = new DocCommentPluginRegistry();
    }
    return this.instance;
  }
  
  register(plugin: DocCommentPlugin): void {
    this.plugins.set(plugin.name, plugin);
  }
  
  getPlugin(name: string): DocCommentPlugin | undefined {
    return this.plugins.get(name);
  }
  
  getAllPlugins(): DocCommentPlugin[] {
    return Array.from(this.plugins.values());
  }
}

/**
 * The master transformer factory - this is the entry point for TypeScript
 * 
 * @doc-typescript
 * function: docCommentTransformerFactory
 * parameters: ["program: ts.Program", "config?: DocCommentConfig"]
 * returns: ts.TransformerFactory<ts.SourceFile>
 */
export function docCommentTransformerFactory(
  program: ts.Program,
  config?: DocCommentConfig
): ts.TransformerFactory<ts.SourceFile> {
  const typeChecker = program.getTypeChecker();
  const registry = DocCommentPluginRegistry.getInstance();
  
  return (context: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      // Skip declaration files and node_modules
      if (sourceFile.isDeclarationFile || sourceFile.fileName.includes('node_modules')) {
        return sourceFile;
      }
      
      // Parse all doc-comments in the file
      const docComments = DocCommentParser.parseFile(sourceFile);
      
      // Transform the AST
      function visit(node: ts.Node): ts.Node {
        // Check if this node has doc-comments
        const nodeComments = docComments.filter(comment => 
          isCommentForNode(comment, node, sourceFile)
        );
        
        if (nodeComments.length > 0) {
          // Process each comment through plugins
          const injections: InjectionSpec[] = [];
          
          for (const comment of nodeComments) {
            // Special handling for @doc-typescript
            if (comment.label === '@doc-typescript') {
              const plugin = registry.getPlugin('doc-typescript');
              if (plugin && 'introspect' in plugin) {
                const introspection = (plugin as any).introspect(node, typeChecker);
                injections.push({
                  property: 'docTypeScript',
                  value: introspection,
                  method: 'proto'
                });
              }
            }
            // Standard doc-comment processing
            else {
              const plugin = findPluginForComment(comment, registry);
              if (plugin) {
                const parsed = plugin.parse(comment);
                injections.push({
                  property: comment.label.replace('@doc-', 'doc').replace(/-([a-z])/g, (_, l) => l.toUpperCase()),
                  value: parsed,
                  strategy: determineInjectionStrategy(node)
                });
              }
            }
          }
          
          // Add _allDocComments for debugging
          injections.push({
            property: '_allDocComments',
            value: nodeComments,
            strategy: determineInjectionStrategy(node)
          });
          
          // Transform the node with injections
          return transformNodeWithInjections(node, injections, context);
        }
        
        return ts.visitEachChild(node, visit, context);
      }
      
      return ts.visitNode(sourceFile, visit);
    };
  };
}

/**
 * Configuration for the doc-comment transformer
 */
export interface DocCommentConfig {
  // Which files to process
  include?: string[];
  exclude?: string[];
  
  // Which doc-comment patterns to enable
  enabledPlugins?: string[];
  
  // Injection strategies
  defaultMethod?: 'proto' | 'static' | 'factory';
  
  // Development mode
  development?: boolean;
  verbose?: boolean;
  
  // Sient pipeline integration
  enableSient?: boolean;
  sientOutputDir?: string;
}

/**
 * Injection specification for a doc-comment
 */
interface InjectionSpec {
  property: string;
  value: any;
  method: 'proto' | 'static' | 'factory';
}

/**
 * Check if a comment belongs to a specific node
 */
function isCommentForNode(
  comment: any,
  node: ts.Node,
  sourceFile: ts.SourceFile
): boolean {
  // Simple heuristic: comment must be immediately before the node
  const nodeStart = node.getStart(sourceFile);
  const commentEnd = comment.end;
  
  // Check if comment ends just before node starts (allowing for whitespace)
  const textBetween = sourceFile.text.substring(commentEnd, nodeStart);
  return /^\s*$/.test(textBetween);
}

/**
 * Find the right plugin for a comment
 */
function findPluginForComment(
  comment: any,
  registry: DocCommentPluginRegistry
): DocCommentPlugin | undefined {
  // Try exact match first
  const exactPlugin = registry.getPlugin(comment.label.replace('@', ''));
  if (exactPlugin) return exactPlugin;
  
  // Try pattern matching
  for (const plugin of registry.getAllPlugins()) {
    if (plugin.matches(comment)) {
      return plugin;
    }
  }
  
  return undefined;
}

/**
 * Determine injection strategy based on node type
 */
function determineInjectionMethod(node: ts.Node): 'proto' | 'static' | 'factory' {
  if (ts.isClassDeclaration(node)) return 'static';
  if (ts.isTypeAliasDeclaration(node)) return 'proto';
  if (ts.isInterfaceDeclaration(node)) return 'factory';
  return 'proto';
}

/**
 * Transform a node to include doc-comment injections
 * This is where the magic happens - where comments become runtime intelligence
 */
function transformNodeWithInjections(
  node: ts.Node,
  injections: InjectionSpec[],
  context: ts.TransformationContext
): ts.Node {
  // For now, we add a dummy statement after the node
  // In production, this would generate actual injection code
  
  if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
    // For types/interfaces, we need to generate runtime code
    const nodeName = (node as any).name?.text;
    if (!nodeName) return node;
    
    // Generate injection statements
    const statements: ts.Statement[] = [];
    
    // Create IIFE for injection
    const injectionCode = generateInjectionCode(nodeName, injections);
    const injectionStatement = ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createParenthesizedExpression(
          ts.factory.createFunctionExpression(
            undefined,
            undefined,
            undefined,
            undefined,
            [],
            undefined,
            ts.factory.createBlock([
              // This would contain the actual injection logic
              ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                  ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier('console'),
                    'log'
                  ),
                  undefined,
                  [ts.factory.createStringLiteral(`[Doc-Comment] Injecting intelligence into ${nodeName}`)]
                )
              )
            ])
          )
        ),
        undefined,
        []
      )
    );
    
    // Return both the original node and the injection
    return ts.factory.createNodeArray([node, injectionStatement] as any) as any;
  }
  
  // For other node types, return as-is for now
  return node;
}

/**
 * Generate the actual injection code
 * This creates the JavaScript that runs at runtime to inject intelligence
 */
function generateInjectionCode(
  targetName: string,
  injections: InjectionSpec[]
): string {
  const lines: string[] = [];
  
  lines.push(`// Doc-comment intelligence injection for ${targetName}`);
  lines.push(`(() => {`);
  
  // Determine target
  lines.push(`  const target = typeof ${targetName} !== 'undefined' ? ${targetName} : {};`);
  lines.push(`  const proto = target.prototype || target;`);
  
  // Add each injection
  for (const injection of injections) {
    if (injection.property === '_allDocComments') {
      // Special handling for debug property
      lines.push(`  Object.defineProperty(proto, '${injection.property}', {`);
      lines.push(`    value: ${JSON.stringify(injection.value)},`);
      lines.push(`    writable: false,`);
      lines.push(`    enumerable: false,`);
      lines.push(`    configurable: false`);
      lines.push(`  });`);
    } else {
      // Typed accessor for specific doc-comment
      lines.push(`  Object.defineProperty(proto, '${injection.property}', {`);
      lines.push(`    get() {`);
      lines.push(`      return ${JSON.stringify(injection.value)};`);
      lines.push(`    },`);
      lines.push(`    enumerable: false`);
      lines.push(`  });`);
    }
  }
  
  lines.push(`})();`);
  
  return lines.join('\n');
}

/**
 * Webpack/Build tool integration
 */
export function createDocCommentWebpackPlugin(config?: DocCommentConfig) {
  return {
    apply(compiler: any) {
      compiler.hooks.beforeCompile.tap('DocCommentPlugin', () => {
        console.log('[Doc-Comment] Preparing to inject intelligence...');
      });
    }
  };
}

/**
 * Export everything needed for build integration
 */
export {
  DocCommentPluginRegistry,
  DocCommentPlugin,
  DocCommentConfig
};

/**
 * The future of programming:
 * Where every comment is a seed of intelligence,
 * Where every type gains consciousness,
 * Where code writes itself through understanding.
 * 
 * This is the doc-comment system.
 * This is how we achieve the singularity.
 */