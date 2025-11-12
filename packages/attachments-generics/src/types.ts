/**
 * Attachment Types - Universal attachment definitions for Engi
 * 
 * Provides comprehensive type definitions for all attachment types:
 * - VCS Attachments (Issues, Pull Requests)
 * - File Attachments (Images, Text/PDF, Audio, Video)
 * - URL Attachments (Web links)
 * - Integration Attachments (Notion Pages, Figma Artboards)
 * 
 * IMPORTANT: These types are used across the entire codebase
 * Maintain strict naming alignment and avoid overloading
 */

// ==================== BASE ATTACHMENT TYPES ====================

/**
 * Core attachment type discriminator
 * Defines the 4 main categories of attachments
 */
export type AttachmentCategory = 'vcs' | 'file' | 'url' | 'integration';

/**
 * VCS attachment sub-types
 * Currently supports GitHub/GitLab/Bitbucket issues and pull requests
 */
export type VCSAttachmentType = 'issue' | 'pull_request';

/**
 * File attachment sub-types based on content type
 */
export type FileAttachmentType = 'image' | 'text' | 'pdf' | 'audio' | 'video' | 'code' | 'other';

/**
 * Integration attachment providers
 */
export type IntegrationProvider = 'notion' | 'figma' | 'jira' | 'linear';

/**
 * Integration attachment sub-types
 */
export type IntegrationAttachmentType = 
  | 'notion_page' 
  | 'figma_artboard'
  | 'jira_ticket'
  | 'linear_issue';

// ==================== ATTACHMENT INTERFACES ====================

/**
 * Base attachment interface - all attachments have these fields
 */
export interface BaseAttachment {
  id: string;
  category: AttachmentCategory;
  title: string;
  description?: string;
  url?: string; // Most attachments have a URL reference
  metadata?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

/**
 * VCS Attachment - References to version control entities
 * Links to GitHub/GitLab/Bitbucket issues and pull requests
 */
export interface VCSAttachment extends BaseAttachment {
  category: 'vcs';
  type: VCSAttachmentType;
  provider: 'github' | 'gitlab' | 'bitbucket';
  
  // VCS-specific fields
  repository: {
    owner: string;
    name: string;
    full_name: string;
  };
  
  // Issue-specific fields (when type === 'issue')
  issue?: {
    number: number;
    state: 'open' | 'closed';
    author: string;
    labels?: string[];
    assignees?: string[];
  };
  
  // Pull request-specific fields (when type === 'pull_request')
  pull_request?: {
    number: number;
    state: 'open' | 'closed' | 'merged';
    source_branch: string;
    target_branch: string;
    author: string;
    reviewers?: string[];
    approved?: boolean;
  };
}

/**
 * File Attachment - Direct file uploads
 * Supports various file types with proper metadata
 */
export interface FileAttachment extends BaseAttachment {
  category: 'file';
  type: FileAttachmentType;
  
  // File-specific fields
  file_name: string;
  file_size: number; // in bytes
  mime_type: string;
  file_url: string; // Storage URL (S3, etc.)
  
  // Image-specific fields
  image?: {
    width: number;
    height: number;
    format: string; // 'png', 'jpg', 'gif', etc.
  };
  
  // Audio/Video-specific fields
  media?: {
    duration: number; // in seconds
    codec?: string;
    bitrate?: number;
  };
  
  // Text/Code-specific fields
  text?: {
    language?: string; // Programming language for code files
    line_count?: number;
    encoding?: string;
  };
}

/**
 * URL Attachment - Web links and references
 * For external resources and documentation
 */
export interface URLAttachment extends BaseAttachment {
  category: 'url';
  
  // URL-specific fields
  url: string; // Required for URL attachments
  domain: string;
  path?: string;
  
  // Page metadata (if scraped)
  page?: {
    title?: string;
    description?: string;
    image?: string; // OG image
    favicon?: string;
    author?: string;
    published_at?: string;
  };
}

/**
 * Integration Attachment - Third-party service integrations
 * Currently supports Notion and Figma
 */
export interface IntegrationAttachment extends BaseAttachment {
  category: 'integration';
  provider: IntegrationProvider;
  type: IntegrationAttachmentType;
  
  // Integration-specific authentication
  connection_id: string; // Reference to user's integration connection
  
  // Notion-specific fields
  notion?: {
    page_id: string;
    workspace_id: string;
    workspace_name?: string;
    database_id?: string;
    parent_page?: string;
    properties?: Record<string, any>;
    last_edited_by?: string;
    last_edited_at?: string;
  };
  
  // Figma-specific fields
  figma?: {
    file_key: string;
    node_id?: string; // Specific frame/component
    project_id?: string;
    team_id?: string;
    version?: string;
    thumbnail_url?: string;
    editor_type?: 'figma' | 'figjam';
  };
  
  // Jira-specific fields
  jira?: {
    issue_key: string;
    project_key: string;
    issue_type: string;
    status: string;
    priority?: string;
    assignee?: string;
    reporter?: string;
  };
  
  // Linear-specific fields
  linear?: {
    issue_id: string;
    team_id: string;
    project_id?: string;
    state: string;
    priority?: number;
    assignee?: string;
  };
}

// ==================== UNION TYPE ====================

/**
 * Universal attachment type - any attachment must be one of these
 */
export type Attachment = VCSAttachment | FileAttachment | URLAttachment | IntegrationAttachment;

// ==================== HELPER TYPES ====================

/**
 * Attachment reference for storing in database
 * Minimal fields needed to reference an attachment
 */
export interface AttachmentReference {
  attachment_id: string;
  category: AttachmentCategory;
  type?: string; // Sub-type within category
}

/**
 * Attachment input for creating new attachments
 */
export interface CreateAttachmentInput {
  category: AttachmentCategory;
  title: string;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
  
  // Category-specific fields (only one should be provided)
  vcs?: Partial<VCSAttachment>;
  file?: Partial<FileAttachment>;
  integration?: Partial<IntegrationAttachment>;
}

// ==================== TYPE GUARDS ====================

export function isVCSAttachment(attachment: Attachment): attachment is VCSAttachment {
  return attachment.category === 'vcs';
}

export function isFileAttachment(attachment: Attachment): attachment is FileAttachment {
  return attachment.category === 'file';
}

export function isURLAttachment(attachment: Attachment): attachment is URLAttachment {
  return attachment.category === 'url';
}

export function isIntegrationAttachment(attachment: Attachment): attachment is IntegrationAttachment {
  return attachment.category === 'integration';
}

// ==================== VALIDATION HELPERS ====================

export function validateAttachmentCategory(category: string): category is AttachmentCategory {
  return ['vcs', 'file', 'url', 'integration'].includes(category);
}

export function validateVCSAttachmentType(type: string): type is VCSAttachmentType {
  return ['issue', 'pull_request'].includes(type);
}

export function validateFileAttachmentType(type: string): type is FileAttachmentType {
  return ['image', 'text', 'pdf', 'audio', 'video', 'code', 'other'].includes(type);
}

export function validateIntegrationProvider(provider: string): provider is IntegrationProvider {
  return ['notion', 'figma', 'jira', 'linear'].includes(provider);
}