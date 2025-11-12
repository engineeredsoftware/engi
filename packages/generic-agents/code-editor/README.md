# Code Editor Agent

Production-grade code editing agent implementing the **Divide|Conquer|Correct** pattern for reliable file modifications.

## Overview

The Code Editor Agent provides systematic, transactional code editing with automatic validation and rollback capabilities. It transforms high-level change specifications into precise file edits while maintaining code quality and consistency.

## Core Pattern: Divide|Conquer|Correct

### 1. **DIVIDE** (Plan Phase)
- Analyzes required changes across the codebase
- Creates atomic patch plans per file
- Identifies dependencies and execution order
- Estimates complexity and risk

### 2. **CONQUER** (Try Phase)  
- Executes file edits using `TransactionalFileEditor`
- Maintains transaction boundaries for rollback
- Creates automatic backups before changes
- Tracks success/failure per edit

### 3. **CORRECT** (Refine Phase)
- Validates syntax of modified files
- Identifies and fixes issues
- Applies corrective patches as needed
- Assesses overall code quality

## Usage

```typescript
import { codeEditorAgent } from '@engi/generic-agent-code-editor';

// Multi-file editing with Divide|Conquer|Correct
const result = await codeEditorAgent({
  changes: [
    {
      filePath: 'src/auth/index.ts',
      patches: [
        {
          description: 'Add JWT validation',
          oldContent: 'function validateToken(token: string)',
          newContent: 'async function validateToken(token: string): Promise<boolean>'
        }
      ]
    }
  ],
  taskDescription: 'Implement JWT validation',  // Note: In deliverables pipeline, this comes from definitionOfDone
  transactional: true,
  validateSyntax: true
}, execution);

// Simple single-file edit
const result = await codeEditorAgent({
  singleEdit: {
    command: 'str_replace',
    path: 'README.md',
    oldStr: 'old text',
    newStr: 'new text'
  },
  taskDescription: 'Update documentation'  // Note: In deliverables pipeline, this comes from definitionOfDone
}, execution);
```

## Variations

### `divide-conquer-correct`
Full PTRR cycle for complex multi-file edits with validation and correction.

### `simple-edit`
Direct single-file editing for simple changes without the full pattern.

## Integration

The agent uses `TransactionalFileEditor` from `@engi/editing` for:
- **Transactional Operations**: All edits can be rolled back as a unit
- **File Locking**: Prevents concurrent modifications
- **Automatic Backups**: Creates backups before changes
- **Precise Text Manipulation**: Line/character position-based editing

## Testing

The agent provides comprehensive test support through `@engi/testing`:
- Mock file system operations
- Dry-run mode for validation without changes
- Scenario-based testing with expected outcomes
- Transaction rollback testing

## Dependencies

- `@engi/agent-generics`: Agent factory and PTRR pattern
- `@engi/execution-generics`: Execution context and tool management
- `@engi/editing`: Transactional file editing primitives
- `@engi/prompts`: Prompt management

## Error Handling

All operations are wrapped in transactions with automatic rollback on failure:
- Syntax errors trigger correction attempts
- Failed edits preserve original files
- Transaction IDs enable manual recovery
- Detailed error reporting with file paths and line numbers