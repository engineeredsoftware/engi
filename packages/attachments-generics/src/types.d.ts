/**
 * Attachment Types - Universal attachment definitions for Bitcode
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
export type IntegrationAttachmentType = 'notion_page' | 'figma_artboard' | 'jira_ticket' | 'linear_issue';
/**
 * Base attachment interface - all attachments have these fields
 */
export interface BaseAttachment {
    id: string;
    category: AttachmentCategory;
    title: string;
    description?: string;
    url?: string;
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
    repository: {
        owner: string;
        name: string;
        full_name: string;
    };
    issue?: {
        number: number;
        state: 'open' | 'closed';
        author: string;
        labels?: string[];
        assignees?: string[];
    };
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
    file_name: string;
    file_size: number;
    mime_type: string;
    file_url: string;
    image?: {
        width: number;
        height: number;
        format: string;
    };
    media?: {
        duration: number;
        codec?: string;
        bitrate?: number;
    };
    text?: {
        language?: string;
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
    url: string;
    domain: string;
    path?: string;
    page?: {
        title?: string;
        description?: string;
        image?: string;
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
    connection_id: string;
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
    figma?: {
        file_key: string;
        node_id?: string;
        project_id?: string;
        team_id?: string;
        version?: string;
        thumbnail_url?: string;
        editor_type?: 'figma' | 'figjam';
    };
    jira?: {
        issue_key: string;
        project_key: string;
        issue_type: string;
        status: string;
        priority?: string;
        assignee?: string;
        reporter?: string;
    };
    linear?: {
        issue_id: string;
        team_id: string;
        project_id?: string;
        state: string;
        priority?: number;
        assignee?: string;
    };
}
/**
 * Universal attachment type - any attachment must be one of these
 */
export type Attachment = VCSAttachment | FileAttachment | URLAttachment | IntegrationAttachment;
/**
 * Attachment reference for storing in database
 * Minimal fields needed to reference an attachment
 */
export interface AttachmentReference {
    attachment_id: string;
    category: AttachmentCategory;
    type?: string;
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
    vcs?: Partial<VCSAttachment>;
    file?: Partial<FileAttachment>;
    integration?: Partial<IntegrationAttachment>;
}
export declare function isVCSAttachment(attachment: Attachment): attachment is VCSAttachment;
export declare function isFileAttachment(attachment: Attachment): attachment is FileAttachment;
export declare function isURLAttachment(attachment: Attachment): attachment is URLAttachment;
export declare function isIntegrationAttachment(attachment: Attachment): attachment is IntegrationAttachment;
export declare function validateAttachmentCategory(category: string): category is AttachmentCategory;
export declare function validateVCSAttachmentType(type: string): type is VCSAttachmentType;
export declare function validateFileAttachmentType(type: string): type is FileAttachmentType;
export declare function validateIntegrationProvider(provider: string): provider is IntegrationProvider;
