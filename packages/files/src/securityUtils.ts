/**
 * @file securityUtils.ts
 * @description Security utilities for file system operations
 * 
 * This file contains functions to validate and secure file paths and operations
 * to prevent security vulnerabilities like path traversal attacks.
 */

import * as path from 'path';
import { log } from '@engi/logger';

function resolveRepoRoot(): string {
  return process.env.ENGI_REPO_ROOT || process.cwd();
}

/**
 * Validates a file path to prevent path traversal attacks and ensure it's within the repository
 * 
 * @param filePath - The file path to validate
 * @returns The normalized path if valid, throws an error if invalid
 */
export function validateFilePath(filePath: string): string {
  if (!filePath) {
    throw new Error('File path is required');
  }

  // Get the repository root path from global context
  const repoPath = resolveRepoRoot();

  // Normalize the path to resolve '..' and '.' segments
  const normalizedPath = path.normalize(filePath);

  // Check for path traversal attempts
  if (normalizedPath.includes('..')) {
    log('Path traversal attempt detected', 'error', {
      originalPath: filePath,
      normalizedPath
    });
    throw new Error('Path traversal attempt detected');
  }

  // Check for absolute paths
  if (path.isAbsolute(normalizedPath)) {
    log('Absolute path not allowed', 'error', {
      originalPath: filePath,
      normalizedPath
    });
    throw new Error('Absolute paths are not allowed');
  }

  // Ensure the path is within the repository
  const fullPath = path.join(repoPath, normalizedPath);
  const relativePath = path.relative(repoPath, fullPath);
  
  // If the relative path starts with '..' or is absolute, it's outside the repo
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    log('Path outside repository not allowed', 'error', {
      originalPath: filePath,
      normalizedPath,
      fullPath,
      relativePath
    });
    throw new Error('Paths outside the repository are not allowed');
  }

  return normalizedPath;
}

/**
 * Validates a file operation command
 * 
 * @param command - The command to validate
 * @returns True if valid, throws an error if invalid
 */
export function validateFileCommand(command: string): boolean {
  const allowedCommands = ['view', 'create', 'str_replace', 'insert', 'delete', 'replace'];
  
  if (!allowedCommands.includes(command)) {
    log('Invalid file command', 'error', {
      command,
      allowedCommands
    });
    throw new Error(`Invalid file command: ${command}. Allowed commands: ${allowedCommands.join(', ')}`);
  }
  
  return true;
}

/**
 * Validates file content size
 * 
 * @param content - The content to validate
 * @param maxSize - The maximum allowed size in bytes
 * @returns True if valid, throws an error if invalid
 */
export function validateFileContent(content: string, maxSize: number = 500000): boolean {
  if (!content && content !== '') {
    throw new Error('File content is required');
  }
  
  const contentSize = Buffer.byteLength(content, 'utf8');
  
  if (contentSize > maxSize) {
    log('File content exceeds maximum size', 'error', {
      contentSize,
      maxSize
    });
    throw new Error(`File content exceeds maximum size of ${maxSize} bytes`);
  }
  
  return true;
}

/**
 * Creates a backup of a file before modifying it
 * 
 * @param filePath - The path of the file to backup
 * @returns The path of the backup file
 */
export async function createFileBackup(filePath: string): Promise<string> {
  const fs = await import('fs/promises');
  
  try {
    // Validate the file path
    const normalizedPath = validateFilePath(filePath);
    
    // Get the repository root path
    const repoPath = resolveRepoRoot();
    const fullPath = path.join(repoPath!, normalizedPath);
    
    // Create backup path
    const backupPath = `${fullPath}.backup-${Date.now()}`;
    
    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch (err) {
      // File doesn't exist, no need for backup
      return '';
    }
    
    // Create backup
    await fs.copyFile(fullPath, backupPath);
    
    log('File backup created', 'info', {
      originalPath: filePath,
      backupPath
    });
    
    return backupPath;
  } catch (error) {
    log('Failed to create file backup', 'error', {
      originalPath: filePath,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * Restores a file from backup
 * 
 * @param backupPath - The path of the backup file
 * @param originalPath - The original file path
 * @returns True if successful
 */
export async function restoreFileFromBackup(backupPath: string, originalPath: string): Promise<boolean> {
  if (!backupPath) {
    return false;
  }
  
  const fs = await import('fs/promises');
  
  try {
    // Validate the original path
    const normalizedPath = validateFilePath(originalPath);
    
    // Get the repository root path
    const repoPath = resolveRepoRoot();
    const fullPath = path.join(repoPath!, normalizedPath);
    
    // Restore from backup
    await fs.copyFile(backupPath, fullPath);
    
    // Remove backup
    await fs.unlink(backupPath);
    
    log('File restored from backup', 'info', {
      originalPath,
      backupPath
    });
    
    return true;
  } catch (error) {
    log('Failed to restore file from backup', 'error', {
      originalPath,
      backupPath,
      error: error instanceof Error ? error.message : String(error)
    });
    return false;
  }
}
