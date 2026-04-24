/**
 * @bitcode/attachments-generics - Universal attachment types and utilities
 * 
 * This package provides the single source of truth for attachment types
 * across the entire Bitcode codebase. All attachments fall into 4 categories:
 * 
 * 1. VCS Attachments - GitHub/GitLab/Bitbucket issues and PRs
 * 2. File Attachments - Direct file uploads (images, text, audio, video)
 * 3. URL Attachments - Web links and external resources
 * 4. Integration Attachments - Notion pages, Figma artboards, etc.
 * 
 * V26 version: 1.0.0
 * Pattern: universal-types
 * Philosophy: "One attachment system to rule them all"
 */

// Export all types
export * from './types';

// Export utilities
export * from './utils';

// Re-export commonly used types at top level for convenience
export type {
  Attachment,
  VCSAttachment,
  FileAttachment,
  URLAttachment,
  IntegrationAttachment,
  AttachmentCategory,
  AttachmentReference,
  CreateAttachmentInput
} from './types';

export {
  isVCSAttachment,
  isFileAttachment,
  isURLAttachment,
  isIntegrationAttachment,
  validateAttachmentCategory
} from './types';

export {
  getFileAttachmentType,
  formatFileSize,
  getAttachmentIcon,
  getAttachmentLabel
} from './utils';
