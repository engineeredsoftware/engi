# @bitcode/attachments-generics

Universal attachment types and utilities for the Engi platform.

## Architecture

All attachments in Engi fall into exactly 4 categories:

### 1. VCS Attachments
References to version control system entities:
- **Issues** - GitHub/GitLab/Bitbucket issues
- **Pull Requests** - PRs/MRs across VCS providers

### 2. File Attachments
Direct file uploads with proper categorization:
- **Images** - PNG, JPG, GIF, SVG, WebP
- **Text** - Plain text, Markdown, reStructuredText
- **PDF** - Portable Document Format files
- **Audio** - MP3, WAV, OGG, M4A, FLAC
- **Video** - MP4, WebM, MOV, AVI, MKV
- **Code** - Source code files with language detection
- **Other** - Any other file type

### 3. URL Attachments
Web links and external resources:
- External documentation
- Blog posts and articles
- API references
- Any web URL

### 4. Integration Attachments
Third-party service integrations:
- **Notion Pages** - Reference to Notion documents
- **Figma Artboards** - Figma designs and FigJam boards
- **Jira Tickets** - Jira issue references
- **Linear Issues** - Linear project management items

## Usage

```typescript
import {
  Attachment,
  VCSAttachment,
  FileAttachment,
  URLAttachment,
  IntegrationAttachment,
  isVCSAttachment,
  getFileAttachmentType,
  formatFileSize
} from '@bitcode/attachments-generics';

// Type guards for narrowing attachment types
if (isVCSAttachment(attachment)) {
  // Now TypeScript knows this is a VCSAttachment
  console.log(attachment.provider); // 'github' | 'gitlab' | 'bitbucket'
}

// Utility functions
const fileType = getFileAttachmentType('image/png', 'screenshot.png'); // 'image'
const size = formatFileSize(1024576); // '1.0 MB'
```

## Naming Alignment

This package ensures consistent naming across the entire codebase:

- **Attachment** - The universal term for any attached entity
- **Category** - The 4 main types (vcs, file, url, integration)
- **Type** - Sub-types within each category
- **Reference** - A lightweight pointer to an attachment

## Database Schema

Attachments are stored separately from their usage:

1. **attachments** table - Stores the actual attachment data
2. **message_attachments** table - Links messages to attachments
3. **deliverable_attachments** table - Links deliverables to attachments
4. **ai_document_attachments** table - Links AI Document updates to attachments

Each attachment is stored once and referenced many times.

## Integration with Conversations

In the conversation system:
- User messages can have source attachments (any category)
- Assistant messages can have pipeline run references
- Attachments belong to messages, not conversations

## Type Safety

All attachment types are strictly typed with TypeScript:
- Discriminated unions for attachment categories
- Type guards for runtime type narrowing
- Validation functions for input sanitization
- Comprehensive type exports for consumption

## Best Practices

1. **Always use type guards** when working with union types
2. **Validate user input** with provided validation functions
3. **Store attachments once** and reference them multiple times
4. **Use utility functions** for common operations
5. **Maintain category boundaries** - don't mix attachment types
