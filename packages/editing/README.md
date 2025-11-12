# Editing - Production-Grade File Editing System

## Overview

Atomic file manipulation system providing comprehensive editing operations with transaction support, precise text manipulation, and enterprise-grade error handling. Designed for flawless code editing in production environments with rollback capabilities and operation auditing.

## Core Functionality

### Atomic Operations
- **Transaction Support**: Multi-file operations with atomic commit/rollback
- **File Locking**: Prevents concurrent modifications during operations
- **Backup Creation**: Automatic backup generation before modifications
- **Operation Auditing**: Comprehensive history tracking and logging

### Text Manipulation
- **Precise Editing**: Offset-based text calculations with boundary checking
- **String Operations**: Replace, insert, delete with pattern matching
- **Line Operations**: Line-based insertions and deletions with validation
- **Patch Application**: JSON-based text edit application with batch processing

### File Operations
- **CRUD Operations**: Create, read, update, delete files with validation
- **Content Encoding**: UTF-8 and base64 encoding support
- **Path Normalization**: Secure path handling and validation
- **Directory Management**: Recursive directory creation and cleanup

### Advanced Capabilities
- **Streaming Support**: Large file handling with memory optimization
- **Error Recovery**: Comprehensive error handling with rollback
- **Performance Monitoring**: Operation timing and resource tracking
- **Security Validation**: Input sanitization and path traversal protection

## API Reference

### Transactional File Editor
```typescript
import { TransactionalFileEditor, EditCommandParams } from '@engi/editing';

// Initialize editor with transaction support
const editor = new TransactionalFileEditor();

// Begin transaction for atomic operations
const transactionId = await editor.beginTransaction({
  description: 'Refactor module structure',
  author: 'developer@example.com'
});

// Execute multiple operations atomically
const result1 = await editor.executeCommand({
  command: 'create',
  path: '/project/src/utils/helper.ts',
  file_text: 'export const helper = () => "Hello World";',
  atomic: true,
  create_backup: true
});

const result2 = await editor.executeCommand({
  command: 'str_replace',
  path: '/project/src/index.ts',
  old_str: 'import { old } from "./old";',
  new_str: 'import { helper } from "./utils/helper";',
  atomic: true
});

// Commit all operations atomically
await editor.commitTransaction();

// Or rollback on error
// await editor.rollbackTransaction();
```

### Command Operations
```typescript
// View file content
const content = await editor.executeCommand({
  command: 'view',
  path: '/project/src/index.ts',
  view_range: [1, 50] // Optional line range
});

// Create new file
const created = await editor.executeCommand({
  command: 'create',
  path: '/project/src/new-module.ts',
  file_text: 'export const newModule = "content";',
  atomic: true,
  create_backup: true
});

// Replace entire file content
const replaced = await editor.executeCommand({
  command: 'replace',
  path: '/project/src/index.ts',
  file_text: 'export * from "./new-module";',
  atomic: true,
  create_backup: true
});

// String replacement with validation
const stringReplaced = await editor.executeCommand({
  command: 'str_replace',
  path: '/project/src/config.ts',
  old_str: 'const API_URL = "http://localhost"',
  new_str: 'const API_URL = "https://api.production.com"',
  atomic: true
});

// Line insertion with bounds checking
const inserted = await editor.executeCommand({
  command: 'insert',
  path: '/project/src/index.ts',
  insert_line: 3,
  new_str: 'import { config } from "./config";',
  atomic: true
});

// Delete file with backup
const deleted = await editor.executeCommand({
  command: 'delete',
  path: '/project/src/deprecated.ts',
  atomic: true,
  create_backup: true
});
```

### Text Edit Operations
```typescript
import { applyTextEdit, applyTextEdits, TextEdit, Position } from '@engi/editing';

// Single text edit
const edit: TextEdit = {
  range: {
    start: { line: 5, character: 0 },
    end: { line: 5, character: 10 }
  },
  newText: 'const updated = '
};

const updatedContent = applyTextEdit(originalContent, edit);

// Multiple text edits (applied in reverse order)
const edits: TextEdit[] = [
  {
    range: { start: { line: 1, character: 0 }, end: { line: 1, character: 6 } },
    newText: 'export'
  },
  {
    range: { start: { line: 5, character: 10 }, end: { line: 5, character: 15 } },
    newText: 'value'
  }
];

const result = applyTextEdits(originalContent, edits);
```

### Position and Range Utilities
```typescript
import { positionToOffset, offsetToPosition } from '@engi/editing';

// Convert line/character position to string offset
const offset = positionToOffset(content, { line: 10, character: 5 });

// Convert string offset to line/character position
const position = offsetToPosition(content, 450);

// Safe boundary checking included
try {
  const offset = positionToOffset(content, { line: 1000, character: 0 });
} catch (error) {
  // EditError with detailed position information
  console.error('Position out of bounds:', error.message);
}
```

### Legacy Compatibility
```typescript
import { runEditCommand, EditCommandParams } from '@engi/editing';

// Simple command execution with automatic transaction handling
const result = await runEditCommand({
  command: 'str_replace',
  path: '/project/src/index.ts',
  old_str: 'old string',
  new_str: 'new string',
  atomic: true // Default: true
});

// Batch operations with shared transaction
const editor = new AtomicFileEditor();
await editor.beginTransaction();

try {
  await editor.executeCommand(command1);
  await editor.executeCommand(command2);
  await editor.executeCommand(command3);
  await editor.commitTransaction();
} catch (error) {
  await editor.rollbackTransaction();
  throw error;
}
```

## Performance Characteristics

### Atomic Operations
- **File Locking**: Prevents race conditions during concurrent access
- **Backup Strategy**: Efficient backup creation with minimal storage overhead
- **Transaction Isolation**: Operations isolated until commit or rollback
- **Memory Management**: Streaming support for large files

### Error Handling
- **Comprehensive Validation**: Input validation with detailed error messages
- **Rollback Capability**: Complete transaction rollback on any failure
- **Path Security**: Protection against path traversal attacks
- **Resource Cleanup**: Automatic cleanup of temporary files and locks

### Optimization Features
- **Offset Calculations**: Efficient string position calculations
- **Batch Processing**: Multiple edits applied in optimal order
- **Caching**: Operation result caching for repeated operations
- **Parallel Processing**: Safe concurrent operations across different files

### Monitoring and Logging
- **Operation Tracking**: Detailed logging of all edit operations
- **Performance Metrics**: Timing and resource usage tracking
- **History Maintenance**: Complete operation history with metadata
- **Error Reporting**: Structured error reporting with context

## Security Features

### Input Validation
- **Path Normalization**: Secure file path handling and validation
- **Content Sanitization**: Input content validation and filtering
- **Boundary Checking**: Prevent buffer overflows and out-of-bounds access
- **Type Validation**: Runtime type checking with Zod schemas

### Access Control
- **File Permissions**: Respect system file permissions
- **Directory Traversal**: Prevention of path traversal attacks
- **Atomic Security**: Secure temporary file handling during operations
- **Lock Management**: Secure file locking with timeout handling

### Data Integrity
- **Checksum Validation**: File integrity verification after operations
- **Backup Verification**: Backup content validation before operations
- **Transaction Consistency**: Atomic commit/rollback ensures consistency
- **Audit Trail**: Complete audit trail of all modifications

## Integration Features

### FileTracker Integration
- **Optional Integration**: Automatic integration with global FileTracker
- **Operation Tracking**: Track all file modifications and creations
- **Context Awareness**: Integration with repository context when available
- **Event Emission**: File change events for downstream systems

### Error Recovery
- **Automatic Rollback**: Failed operations trigger automatic cleanup
- **Manual Recovery**: Manual rollback capability for complex scenarios
- **State Restoration**: Complete state restoration from backups
- **Progress Tracking**: Operation progress monitoring and reporting

### Enterprise Compliance
- **Audit Logging**: Comprehensive audit trail for compliance requirements
- **Operation History**: Persistent operation history with metadata
- **User Attribution**: Operation attribution and responsibility tracking
- **Data Retention**: Configurable backup and history retention policies