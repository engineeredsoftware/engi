import { BaseDocCommentPlugin, DocComment, ValidationResult } from '@bitcode/doc-comment';

/**
 * Metadata structure for @doc-code-tool
 */
export interface DocCodeToolMetadata {
  name: string;
  category: string;
  version: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  stability: 'experimental' | 'beta' | 'stable' | 'deprecated';
  purpose?: string;
  capabilities?: string[];
  parameters?: Record<string, any>;
  output?: any;
}

/**
 * Plugin for @doc-code-tool comments that enable runtime tool documentation
 */
export class DocCodeToolPlugin extends BaseDocCommentPlugin {
  name = 'doc-code-tool';
  pattern = /@doc-code-tool/;
  
  protected parseMetadata(comment: DocComment): any {
    const lines = comment.content.split('\n');
    const metadata: DocCodeToolMetadata = {
      name: '',
      category: '',
      version: '1.0.0',
      priority: 'medium',
      stability: 'stable'
    };
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Parse basic metadata
      if (trimmed.startsWith('name:')) {
        metadata.name = trimmed.substring(5).trim();
      } else if (trimmed.startsWith('category:')) {
        metadata.category = trimmed.substring(9).trim();
      } else if (trimmed.startsWith('version:')) {
        metadata.version = trimmed.substring(8).trim();
      } else if (trimmed.startsWith('priority:')) {
        metadata.priority = trimmed.substring(9).trim() as any;
      } else if (trimmed.startsWith('stability:')) {
        metadata.stability = trimmed.substring(10).trim() as any;
      }
    }
    
    // Parse section metadata from other doc-code-tool-* comments
    this.parseSectionMetadata(comment, metadata);
    
    return metadata;
  }
  
  private parseSectionMetadata(comment: DocComment, metadata: DocCodeToolMetadata) {
    // This would be enhanced to parse @doc-code-tool-purpose, etc.
    // For now, we rely on the decorator to inject these
  }
  
  protected validateMetadata(metadata: DocCodeToolMetadata): ValidationResult {
    const errors: string[] = [];
    
    if (!metadata.name) {
      errors.push('Tool name is required');
    }
    
    if (!metadata.category) {
      errors.push('Tool category is required');
    }
    
    if (!['low', 'medium', 'high', 'critical'].includes(metadata.priority)) {
      errors.push('Invalid priority value');
    }
    
    if (!['experimental', 'beta', 'stable', 'deprecated'].includes(metadata.stability)) {
      errors.push('Invalid stability value');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  protected getDefaultMetadata(): DocCodeToolMetadata {
    return {
      name: 'unnamed-tool',
      category: 'uncategorized',
      version: '1.0.0',
      priority: 'medium',
      stability: 'experimental'
    };
  }
}