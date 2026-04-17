# @bitcode/doc-comment

Pure infrastructure package for doc-comment plugins. This package contains ONLY:
- Plugin interfaces and base classes
- Plugin registry system
- Core types for doc-comment parsing

## NO PLUGIN IMPLEMENTATIONS

This package contains NO plugin implementations. Plugins are located in:
- Their respective packages (co-located)
- Standalone plugin packages

## Core Exports

```typescript
// Base infrastructure
import { 
  BaseDocCommentPlugin,
  DocCommentPlugin,
  DocComment,
  ValidationResult 
} from '@bitcode/doc-comment';

// Plugin registry
import { 
  registerPlugin,
  getPlugin,
  getAllPlugins 
} from '@bitcode/doc-comment';
```

## Creating a Plugin

```typescript
import { BaseDocCommentPlugin, ValidationResult } from '@bitcode/doc-comment';

export class MyPlugin extends BaseDocCommentPlugin<MyMetadata> {
  name = 'doc-myplugin';
  pattern = /@doc-myplugin/;
  
  protected parseMetadata(comment: DocComment): MyMetadata {
    // Parse comment into metadata
  }
  
  protected validateMetadata(metadata: MyMetadata): ValidationResult {
    // Validate the metadata
  }
  
  protected getDefaultMetadata(comment: DocComment): MyMetadata {
    // Return default when parsing fails
  }
}
```

## Plugin Locations

### Doc-Comment Plugins (Metadata only)
- `@bitcode/generic-doc-comment-plugins/doc-developing` - Development metadata (@doc-comment-developing-promptpartdevelopment, @doc-comment-developing-promptdevelopment)
- `@bitcode/prompts/src/doc-plugins` - Prompt dry-run (@doc-comment-promptdryrun)

### Doc-Code Plugins (Runtime injection)
- `@bitcode/tools-generics/src/plugins` - Tool documentation (@doc-code-tool)
- `@bitcode/generic-doc-code-plugins/doc-promptpart` - PromptPart injection (@doc-code-promptpart)

## Philosophy

Infrastructure without implementation. The doc-comment package is the foundation upon which all doc-comment plugins are built, but it contains no opinions about what those plugins do.

## Key Distinction: Doc-Comment vs Doc-Code

- **@doc-comment-*** plugins: Build-time metadata extraction only
- **@doc-code-*** plugins: Runtime code injection and transformation

This naming convention makes it immediately clear whether a plugin affects runtime behavior.