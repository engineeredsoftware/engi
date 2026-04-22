/**
 * Attachment Utilities - Helper functions for working with attachments
 *
 * Provides utility functions for:
 * - MIME type detection and validation
 * - File type categorization
 * - URL parsing and validation
 * - Attachment display formatting
 */
import { Attachment, FileAttachmentType } from './types';
/**
 * Determine file attachment type from MIME type or filename
 */
export declare function getFileAttachmentType(mimeType?: string, fileName?: string): FileAttachmentType;
/**
 * Parse a URL and extract domain and path
 */
export declare function parseURL(url: string): {
    domain: string;
    path?: string;
} | null;
/**
 * Check if a URL is valid
 */
export declare function isValidURL(url: string): boolean;
/**
 * Extract domain from email or URL
 */
export declare function extractDomain(input: string): string | null;
/**
 * Format file size for display
 */
export declare function formatFileSize(bytes: number): string;
/**
 * Get display icon/emoji for attachment type
 */
export declare function getAttachmentIcon(attachment: Attachment): string;
/**
 * Get human-readable attachment type label
 */
export declare function getAttachmentLabel(attachment: Attachment): string;
/**
 * Generate attachment preview text
 */
export declare function getAttachmentPreview(attachment: Attachment, maxLength?: number): string;
/**
 * Check if file size is within acceptable limits
 */
export declare function isFileSizeValid(bytes: number, maxSizeMB?: number): boolean;
/**
 * Check if file type is supported
 */
export declare function isSupportedFileType(mimeType?: string, fileName?: string): boolean;
/**
 * Validate attachment has required fields
 */
export declare function validateAttachment(attachment: Partial<Attachment>): string[];
/**
 * Sort attachments by creation date (newest first)
 */
export declare function sortByDate(attachments: Attachment[]): Attachment[];
/**
 * Sort attachments by category
 */
export declare function sortByCategory(attachments: Attachment[]): Attachment[];
/**
 * Group attachments by category
 */
export declare function groupByCategory(attachments: Attachment[]): Record<string, Attachment[]>;
