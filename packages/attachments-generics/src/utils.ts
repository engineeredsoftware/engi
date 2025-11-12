/**
 * Attachment Utilities - Helper functions for working with attachments
 * 
 * Provides utility functions for:
 * - MIME type detection and validation
 * - File type categorization
 * - URL parsing and validation
 * - Attachment display formatting
 */

import {
  Attachment,
  FileAttachmentType,
  VCSAttachment,
  FileAttachment,
  URLAttachment,
  IntegrationAttachment
} from './types';

// ==================== MIME TYPE UTILITIES ====================

/**
 * Common MIME types mapped to file attachment types
 */
const MIME_TYPE_MAP: Record<string, FileAttachmentType> = {
  // Images
  'image/png': 'image',
  'image/jpeg': 'image',
  'image/jpg': 'image',
  'image/gif': 'image',
  'image/svg+xml': 'image',
  'image/webp': 'image',
  
  // Text and documents
  'text/plain': 'text',
  'text/html': 'text',
  'text/markdown': 'text',
  'application/pdf': 'pdf',
  
  // Code
  'text/javascript': 'code',
  'application/javascript': 'code',
  'text/typescript': 'code',
  'text/x-python': 'code',
  'text/x-java': 'code',
  'text/x-c': 'code',
  'text/x-cpp': 'code',
  'text/x-go': 'code',
  'text/x-rust': 'code',
  
  // Audio
  'audio/mpeg': 'audio',
  'audio/mp3': 'audio',
  'audio/wav': 'audio',
  'audio/ogg': 'audio',
  'audio/webm': 'audio',
  
  // Video
  'video/mp4': 'video',
  'video/webm': 'video',
  'video/ogg': 'video',
  'video/quicktime': 'video',
};

/**
 * File extension to attachment type mapping
 */
const FILE_EXTENSION_MAP: Record<string, FileAttachmentType> = {
  // Images
  '.png': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.svg': 'image',
  '.webp': 'image',
  
  // Text
  '.txt': 'text',
  '.md': 'text',
  '.rst': 'text',
  '.pdf': 'pdf',
  
  // Code
  '.js': 'code',
  '.ts': 'code',
  '.tsx': 'code',
  '.jsx': 'code',
  '.py': 'code',
  '.java': 'code',
  '.c': 'code',
  '.cpp': 'code',
  '.go': 'code',
  '.rs': 'code',
  '.rb': 'code',
  '.php': 'code',
  '.swift': 'code',
  '.kt': 'code',
  '.scala': 'code',
  '.r': 'code',
  '.m': 'code',
  '.h': 'code',
  '.hpp': 'code',
  '.cs': 'code',
  '.sh': 'code',
  '.bash': 'code',
  '.zsh': 'code',
  '.fish': 'code',
  '.ps1': 'code',
  '.yaml': 'code',
  '.yml': 'code',
  '.json': 'code',
  '.xml': 'code',
  '.toml': 'code',
  '.ini': 'code',
  '.env': 'code',
  
  // Audio
  '.mp3': 'audio',
  '.wav': 'audio',
  '.ogg': 'audio',
  '.m4a': 'audio',
  '.flac': 'audio',
  
  // Video
  '.mp4': 'video',
  '.webm': 'video',
  '.mov': 'video',
  '.avi': 'video',
  '.mkv': 'video',
};

/**
 * Determine file attachment type from MIME type or filename
 */
export function getFileAttachmentType(mimeType?: string, fileName?: string): FileAttachmentType {
  // Try MIME type first
  if (mimeType && MIME_TYPE_MAP[mimeType]) {
    return MIME_TYPE_MAP[mimeType];
  }
  
  // Fall back to file extension
  if (fileName) {
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    if (FILE_EXTENSION_MAP[ext]) {
      return FILE_EXTENSION_MAP[ext];
    }
  }
  
  return 'other';
}

// ==================== URL UTILITIES ====================

/**
 * Parse a URL and extract domain and path
 */
export function parseURL(url: string): { domain: string; path?: string } | null {
  try {
    const parsed = new URL(url);
    return {
      domain: parsed.hostname,
      path: parsed.pathname !== '/' ? parsed.pathname : undefined
    };
  } catch {
    return null;
  }
}

/**
 * Check if a URL is valid
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract domain from email or URL
 */
export function extractDomain(input: string): string | null {
  if (input.includes('@')) {
    // Email address
    return input.split('@')[1];
  }
  
  const parsed = parseURL(input);
  return parsed?.domain || null;
}

// ==================== DISPLAY UTILITIES ====================

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Get display icon/emoji for attachment type
 */
export function getAttachmentIcon(attachment: Attachment): string {
  switch (attachment.category) {
    case 'vcs':
      return attachment.type === 'issue' ? '🐛' : '🔀';
    
    case 'file':
      switch (attachment.type) {
        case 'image': return '🖼️';
        case 'text': return '📄';
        case 'pdf': return '📑';
        case 'audio': return '🎵';
        case 'video': return '🎬';
        case 'code': return '💻';
        default: return '📎';
      }
    
    case 'url':
      return '🔗';
    
    case 'integration':
      switch (attachment.provider) {
        case 'notion': return '📝';
        case 'figma': return '🎨';
        case 'jira': return '📋';
        case 'linear': return '📊';
        default: return '🔌';
      }
    
    default:
      return '📎';
  }
}

/**
 * Get human-readable attachment type label
 */
export function getAttachmentLabel(attachment: Attachment): string {
  switch (attachment.category) {
    case 'vcs':
      const vcs = attachment as VCSAttachment;
      return `${vcs.provider} ${vcs.type.replace('_', ' ')}`;
    
    case 'file':
      const file = attachment as FileAttachment;
      return `${file.type} file`;
    
    case 'url':
      return 'Web link';
    
    case 'integration':
      const integration = attachment as IntegrationAttachment;
      return `${integration.provider} ${integration.type.replace(`${integration.provider}_`, '')}`;
    
    default:
      return 'Attachment';
  }
}

/**
 * Generate attachment preview text
 */
export function getAttachmentPreview(attachment: Attachment, maxLength = 100): string {
  let preview = attachment.description || attachment.title;
  
  if (preview.length > maxLength) {
    preview = preview.substring(0, maxLength - 3) + '...';
  }
  
  return preview;
}

// ==================== VALIDATION UTILITIES ====================

/**
 * Check if file size is within acceptable limits
 */
export function isFileSizeValid(bytes: number, maxSizeMB = 100): boolean {
  return bytes <= maxSizeMB * 1024 * 1024;
}

/**
 * Check if file type is supported
 */
export function isSupportedFileType(mimeType?: string, fileName?: string): boolean {
  const type = getFileAttachmentType(mimeType, fileName);
  return type !== 'other';
}

/**
 * Validate attachment has required fields
 */
export function validateAttachment(attachment: Partial<Attachment>): string[] {
  const errors: string[] = [];
  
  if (!attachment.id) errors.push('Missing attachment ID');
  if (!attachment.category) errors.push('Missing attachment category');
  if (!attachment.title) errors.push('Missing attachment title');
  
  // Category-specific validation
  if (attachment.category === 'file') {
    const file = attachment as Partial<FileAttachment>;
    if (!file.file_name) errors.push('Missing file name');
    if (!file.file_url) errors.push('Missing file URL');
    if (!file.file_size) errors.push('Missing file size');
  }
  
  if (attachment.category === 'url') {
    const url = attachment as Partial<URLAttachment>;
    if (!url.url) errors.push('Missing URL');
    if (!isValidURL(url.url || '')) errors.push('Invalid URL format');
  }
  
  if (attachment.category === 'vcs') {
    const vcs = attachment as Partial<VCSAttachment>;
    if (!vcs.provider) errors.push('Missing VCS provider');
    if (!vcs.type) errors.push('Missing VCS type');
    if (!vcs.repository) errors.push('Missing repository information');
  }
  
  if (attachment.category === 'integration') {
    const integration = attachment as Partial<IntegrationAttachment>;
    if (!integration.provider) errors.push('Missing integration provider');
    if (!integration.connection_id) errors.push('Missing connection ID');
  }
  
  return errors;
}

// ==================== SORTING UTILITIES ====================

/**
 * Sort attachments by creation date (newest first)
 */
export function sortByDate(attachments: Attachment[]): Attachment[] {
  return [...attachments].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Sort attachments by category
 */
export function sortByCategory(attachments: Attachment[]): Attachment[] {
  const categoryOrder = ['vcs', 'file', 'url', 'integration'];
  
  return [...attachments].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category);
    const orderB = categoryOrder.indexOf(b.category);
    return orderA - orderB;
  });
}

/**
 * Group attachments by category
 */
export function groupByCategory(attachments: Attachment[]): Record<string, Attachment[]> {
  return attachments.reduce((groups, attachment) => {
    const category = attachment.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(attachment);
    return groups;
  }, {} as Record<string, Attachment[]>);
}