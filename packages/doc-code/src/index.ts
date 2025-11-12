/**
 * DOC-CODE - RUNTIME PROMPT INJECTION SYSTEM
 * 
 * Injects prompt instances into prototypes based on @doc-code-* comments.
 * Pattern: @doc-code-* comments with @prompt field reference a Prompt instance
 * that gets attached to the prototype at build time.
 * 
 * @doc-package
 * version: 3.0.0
 * pattern: prompt-injection
 * architecture: "Build-time prompt injection via prototype attachment"
 */


// ==================== CORE PROMPT INJECTION ====================

/**
 * The ONLY thing doc-code does:
 * Attach prompt instances to prototypes via __docCodePrompt property
 */



// ==================== SIMPLE PROMPT INJECTION ====================

/**
 * The ONE pattern doc-code supports:
 * 
 * @doc-code-IMPL comments with @prompt PROMPTNAME
 * get PROMPTNAME attached to the prototype at build time
 */

// ==================== BUILD INTEGRATION ====================

/**
 * Transform function for build tools
 */
export interface DocCodeTransform {
  /**
   * Transform source code to inject prompt references
   */
  transform(source: string, filePath: string): Promise<string>;
}

/**
 * Create a transform for doc-code prompt injection
 */
export function createTransform(): DocCodeTransform {
  return {
    async transform(source: string, filePath: string): Promise<string> {
      // Transform @doc-code-tool comments
      if (filePath.includes('generic-tools') || filePath.includes('tools-generics')) {
        return transformDocCodeTools(source, filePath);
      }
      
      // Could add other @doc-code-* patterns here in future
      // For now, only doc-code-tool is implemented
      return source;
    }
  };
}

// ==================== TRANSFORM IMPLEMENTATION ====================

/**
 * Transform source code to inject doc-code-tool attachments
 */
function transformDocCodeTools(source: string, filePath: string): string {
  // Simple regex-based transform for @doc-code-tool comments
  const toolClassRegex = /\/\*\*[\s\S]*?@doc-code-tool[\s\S]*?@prompt\s+(\w+)[\s\S]*?\*\/\s*class\s+(\w+)\s+extends\s+Tool/g;
  const toolInstantiationRegex = /export\s+const\s+(\w+)\s*=\s*new\s+(\w+)\(\)/g;
  
  // Find all tool classes with @doc-code-tool comments
  const toolPromptMap = new Map<string, string>();
  let match;
  
  while ((match = toolClassRegex.exec(source)) !== null) {
    const promptName = match[1];
    const className = match[2];
    toolPromptMap.set(className, promptName);
  }
  
  // Transform tool instantiations to add prompt attachment
  let transformedSource = source;
  
  // Reset regex
  toolInstantiationRegex.lastIndex = 0;
  
  while ((match = toolInstantiationRegex.exec(source)) !== null) {
    const varName = match[1];
    const className = match[2];
    const promptName = toolPromptMap.get(className);
    
    if (promptName) {
      const assignmentAlreadyPresent = new RegExp(`\\(${varName}\\s+as\\s+any\\)\\.__docCodePrompt`).test(transformedSource);
      if (assignmentAlreadyPresent) {
        continue;
      }

      const originalMatch = match[0];
      const replacement = `${originalMatch}

// Attach DocCodeToolPrompt for runtime injection (auto-generated)
(${varName} as any).__docCodePrompt = ${promptName};`;
      
      transformedSource = transformedSource.replace(originalMatch, replacement);
    }
  }
  
  return transformedSource;
}

// ==================== EXPORTS ====================

// Export loader for webpack integration
export { default as docCodeToolLoader } from './loaders/doc-code-tool-loader';
