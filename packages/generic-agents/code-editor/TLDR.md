# TLDR - Code Editor Agent

## What It Is

A **production code editing agent** that implements **Divide|Apply|Correct** pattern for reliable file modifications with transactional support.

## Architecture

```
CodeEditorAgent (Divide|Apply|Correct)
├── DIVIDE (analyze changes → create patches)
├── APPLY (execute edits → track results)
└── CORRECT (validate syntax → fix issues)
```

## Usage

```typescript
// Complex multi-file editing
await codeEditorAgent({
  changes: [{
    filePath: 'src/file.ts',
    patches: [{ oldContent: '...', newContent: '...' }]
  }],
  taskDescription: 'Implement feature'
}, execution);

// Simple single edit
await codeEditorAgent({
  singleEdit: { command: 'str_replace', path: 'file.ts', oldStr: 'a', newStr: 'b' },
  taskDescription: 'Fix typo'
}, execution);
```

## Key Features

- **Transactional Edits**: All changes can be rolled back as a unit
- **Automatic Validation**: Syntax checking and correction
- **File Backups**: Automatic backup before modifications  
- **Precise Patches**: Exact content matching and replacement
- **Two Variations**: `divide-apply-correct` for complex, `simple-edit` for basic

## Why It Matters

This agent ensures **reliable code modifications** in production pipelines by treating file editing as a systematic, reversible operation with built-in quality checks.
