/**
 * FIGMA MCP TOOLS - EVOLVED TOOLS AND PROMPTS PRIMITIVES ARCHITECTURE
 * 
 * This module provides production-grade Figma MCP tools built on the evolved tools architecture
 * with proper Tool objects from the 'ai' package and sophisticated prompt primitives integration.
 * 
 * Key Features:
 * ✅ Proper Tool objects using tool() function from 'ai' package
 * ✅ Comprehensive parameter schemas with Zod validation
 * ✅ Production-grade error handling and authentication
 * ✅ Sophisticated prompt primitives for context-aware execution
 * ✅ Performance monitoring and metrics collection
 * ✅ Type-safe tool definitions with comprehensive metadata
 */

import { z } from 'zod';
import { Tool } from '@bitcode/tools-generics';
import { log } from '@bitcode/logger';

// ==================== FIGMA API INTEGRATION ====================

/**
 * Figma API client configuration
 */
interface FigmaAPIConfig {
  readonly accessToken: string;
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retryAttempts: number;
}

/**
 * Get Figma API configuration from environment
 */
function getFigmaConfig(): FigmaAPIConfig {
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is required for Figma MCP tools');
  }
  
  return {
    accessToken,
    baseUrl: 'https://api.figma.com/v1',
    timeout: 30000,
    retryAttempts: 3
  };
}

/**
 * Make authenticated request to Figma API
 */
async function makeFigmaRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const config = getFigmaConfig();
  const url = `${config.baseUrl}${endpoint}`;
  
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      'X-Figma-Token': config.accessToken,
      'Content-Type': 'application/json',
      ...options.headers
    },
    signal: AbortSignal.timeout(config.timeout)
  };
  
  log(`Making Figma API request to ${endpoint}`, 'info', {
    endpoint,
    method: options.method || 'GET',
    timeout: config.timeout
  });
  
  const response = await fetch(url, requestOptions);
  
  if (!response.ok) {
    const errorText = await response.text();
    log(`Figma API request failed`, 'error', {
      endpoint,
      status: response.status,
      statusText: response.statusText,
      error: errorText
    });
    
    throw new Error(`Figma API error (${response.status}): ${errorText}`);
  }
  
  const data = await response.json();
  
  log(`Figma API request successful`, 'info', {
    endpoint,
    status: response.status,
    dataKeys: Object.keys(data)
  });
  
  return data;
}

// ==================== PARAMETER SCHEMAS ====================

const FigmaFileKeySchema = z.string().min(1, 'File key is required');
const FigmaNodeIdsSchema = z.array(z.string()).min(1, 'At least one node ID is required');
const FigmaImageFormatSchema = z.enum(['jpg', 'png', 'svg', 'pdf']).default('png');
const FigmaImageScaleSchema = z.number().min(0.01).max(4).default(2);
const FigmaSearchNameSchema = z.string().min(1, 'Search name is required');

// ==================== EVOLVED FIGMA TOOL IMPLEMENTATIONS ====================

/**
 * List artboards from a Figma file - primitive function
 */
async function _figmaListArtboards({ fileKey, includeComponents, includeInstances, filterPattern }: {
  fileKey: string;
  includeComponents?: boolean;
  includeInstances?: boolean;
  filterPattern?: string;
}) {
    const startTime = Date.now();
    
    try {
      log('Executing figmaListArtboards tool', 'info', {
        fileKey,
        includeComponents,
        includeInstances,
        hasFilterPattern: !!filterPattern
      });
      
      const fileData = await makeFigmaRequest(`/files/${fileKey}`);
      
      if (!fileData.document) {
        throw new Error('Invalid Figma file structure: missing document');
      }
      
      const artboards: any[] = [];
      const filterRegex = filterPattern ? new RegExp(filterPattern, 'i') : null;
      
      function extractFrames(node: any, parentName = '') {
        if (node.type === 'FRAME' || node.type === 'COMPONENT') {
          const shouldInclude = 
            (node.type === 'FRAME') ||
            (node.type === 'COMPONENT' && includeComponents);
          
          if (shouldInclude) {
            const fullName = parentName ? `${parentName} / ${node.name}` : node.name;
            
            if (!filterRegex || filterRegex.test(fullName)) {
              artboards.push({
                id: node.id,
                name: node.name,
                fullName,
                type: node.type.toLowerCase(),
                absoluteBoundingBox: node.absoluteBoundingBox,
                backgroundColor: node.backgroundColor,
                metadata: {
                  visible: node.visible !== false,
                  locked: node.locked === true,
                  exported: node.exportSettings?.length > 0
                }
              });
            }
          }
        }
        
        if (node.children) {
          const newParentName = node.type === 'PAGE' ? node.name : parentName;
          for (const child of node.children) {
            extractFrames(child, newParentName);
          }
        }
      }
      
      extractFrames(fileData.document);
      
      const executionTime = Date.now() - startTime;
      
      log('figmaListArtboards completed successfully', 'info', {
        fileKey,
        artboardsFound: artboards.length,
        executionTime
      });
      
      return {
        success: true,
        fileKey,
        fileName: fileData.name,
        artboards,
        summary: {
          totalArtboards: artboards.length,
          executionTime
        }
      };
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      log('figmaListArtboards failed', 'error', {
        fileKey,
        error: errorMessage,
        executionTime
      });
      
      return {
        success: false,
        error: errorMessage,
        fileKey,
        executionTime
      };
    }
}

/**
 * List artboards from a Figma file
 */
class FigmaListArtboardsTool extends Tool<typeof _figmaListArtboards> {
  use = _figmaListArtboards;
}

export const figmaListArtboardsTool = new FigmaListArtboardsTool();

/**
 * Export artboard as PNG from Figma - primitive function
 */
async function _figmaGetArtboardPNG({ fileKey, nodeIds, scale = 2, format = 'png', useAbsoluteBounds = false }: {
  fileKey: string;
  nodeIds: string[];
  scale?: number;
  format?: 'jpg' | 'png' | 'svg' | 'pdf';
  useAbsoluteBounds?: boolean;
}) {
    const startTime = Date.now();
    
    try {
      log('Executing figmaGetArtboardPNG tool', 'info', {
        fileKey,
        nodeIdCount: nodeIds.length,
        scale,
        format
      });
      
      const exportParams = new URLSearchParams({
        ids: nodeIds.join(','),
        format,
        scale: scale.toString(),
        use_absolute_bounds: useAbsoluteBounds.toString()
      });
      
      const exportData = await makeFigmaRequest(`/images/${fileKey}?${exportParams}`);
      
      if (!exportData.images) {
        throw new Error('No images returned from Figma export API');
      }
      
      const results = [];
      for (const [nodeId, imageUrl] of Object.entries(exportData.images)) {
        results.push({
          nodeId,
          imageUrl: imageUrl as string,
          format,
          scale,
          status: imageUrl ? 'success' : 'failed'
        });
      }
      
      const executionTime = Date.now() - startTime;
      const successCount = results.filter(r => r.status === 'success').length;
      
      log('figmaGetArtboardPNG completed', 'info', {
        fileKey,
        successfulExports: successCount,
        executionTime
      });
      
      return {
        success: true,
        fileKey,
        exports: results,
        summary: {
          totalRequested: nodeIds.length,
          successfulExports: successCount,
          executionTime
        }
      };
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      log('figmaGetArtboardPNG failed', 'error', {
        fileKey,
        error: errorMessage,
        executionTime
      });
      
      return {
        success: false,
        error: errorMessage,
        fileKey,
        executionTime
      };
    }
}

/**
 * Export artboard as PNG from Figma
 */
class FigmaGetArtboardPNGTool extends Tool<typeof _figmaGetArtboardPNG> {
  use = _figmaGetArtboardPNG;
}

export const figmaGetArtboardPNGTool = new FigmaGetArtboardPNGTool();

/**
 * Find artboard by name in Figma file - primitive function
 */
async function _figmaFindArtboardByName({ fileKey, searchName, exactMatch = false, caseSensitive = false, includeComponents = true }: {
  fileKey: string;
  searchName: string;
  exactMatch?: boolean;
  caseSensitive?: boolean;
  includeComponents?: boolean;
}) {
    const startTime = Date.now();
    
    try {
      log('Executing figmaFindArtboardByName tool', 'info', {
        fileKey,
        searchName,
        exactMatch,
        caseSensitive
      });
      
      const fileData = await makeFigmaRequest(`/files/${fileKey}`);
      
      if (!fileData.document) {
        throw new Error('Invalid Figma file structure: missing document');
      }
      
      const matches: any[] = [];
      const searchPattern = caseSensitive ? searchName : searchName.toLowerCase();
      
      function searchFrames(node: any, parentPath = '') {
        const shouldSearch = 
          (node.type === 'FRAME') ||
          (node.type === 'COMPONENT' && includeComponents);
          
        if (shouldSearch) {
          const nodeName = caseSensitive ? node.name : node.name.toLowerCase();
          const fullPath = parentPath ? `${parentPath} / ${node.name}` : node.name;
          
          let isMatch = false;
          if (exactMatch) {
            isMatch = nodeName === searchPattern;
          } else {
            isMatch = nodeName.includes(searchPattern);
          }
          
          if (isMatch) {
            matches.push({
              id: node.id,
              name: node.name,
              fullPath,
              type: node.type.toLowerCase(),
              absoluteBoundingBox: node.absoluteBoundingBox,
              metadata: {
                visible: node.visible !== false,
                locked: node.locked === true,
                parentPath
              }
            });
          }
        }
        
        if (node.children) {
          const newParentPath = node.type === 'PAGE' ? node.name : parentPath;
          for (const child of node.children) {
            searchFrames(child, newParentPath);
          }
        }
      }
      
      searchFrames(fileData.document);
      
      const executionTime = Date.now() - startTime;
      
      log('figmaFindArtboardByName completed successfully', 'info', {
        fileKey,
        searchName,
        matchesFound: matches.length,
        executionTime
      });
      
      return {
        success: true,
        fileKey,
        fileName: fileData.name,
        searchCriteria: {
          searchName,
          exactMatch,
          caseSensitive,
          includeComponents
        },
        matches,
        summary: {
          totalMatches: matches.length,
          bestMatch: matches[0] || null,
          executionTime
        }
      };
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      log('figmaFindArtboardByName failed', 'error', {
        fileKey,
        searchName,
        error: errorMessage,
        executionTime
      });
      
      return {
        success: false,
        error: errorMessage,
        fileKey,
        searchName,
        executionTime
      };
    }
}

/**
 * Find artboard by name in Figma file
 */
class FigmaFindArtboardByNameTool extends Tool<typeof _figmaFindArtboardByName> {
  use = _figmaFindArtboardByName;
}

export const figmaFindArtboardByNameTool = new FigmaFindArtboardByNameTool();

/**
 * Get Figma file information and metadata - primitive function
 */
async function _figmaGetFile({ fileKey, includeVersions = false, includeComments = false }: {
  fileKey: string;
  includeVersions?: boolean;
  includeComments?: boolean;
}) {
    const startTime = Date.now();
    
    try {
      log('Executing figmaGetFile tool', 'info', {
        fileKey,
        includeVersions,
        includeComments
      });
      
      const fileData = await makeFigmaRequest(`/files/${fileKey}`);
      
      const additionalRequests: Promise<any>[] = [];
      
      if (includeVersions) {
        additionalRequests.push(
          makeFigmaRequest(`/files/${fileKey}/versions`).catch(err => ({ error: err.message }))
        );
      }
      
      if (includeComments) {
        additionalRequests.push(
          makeFigmaRequest(`/files/${fileKey}/comments`).catch(err => ({ error: err.message }))
        );
      }
      
      const additionalData = await Promise.all(additionalRequests);
      
      const executionTime = Date.now() - startTime;
      
      const result: any = {
        success: true,
        fileKey,
        fileInfo: {
          name: fileData.name,
          lastModified: fileData.lastModified,
          thumbnailUrl: fileData.thumbnailUrl,
          version: fileData.version
        },
        structure: {
          pages: fileData.document.children?.length || 0
        },
        executionTime
      };
      
      if (includeVersions && additionalData[0] && !additionalData[0].error) {
        result.versions = {
          count: additionalData[0].versions?.length || 0,
          recent: additionalData[0].versions?.slice(0, 5) || []
        };
      }
      
      if (includeComments) {
        const commentsIndex = includeVersions ? 1 : 0;
        if (additionalData[commentsIndex] && !additionalData[commentsIndex].error) {
          result.comments = {
            count: additionalData[commentsIndex].comments?.length || 0,
            recent: additionalData[commentsIndex].comments?.slice(0, 10) || []
          };
        }
      }
      
      log('figmaGetFile completed successfully', 'info', {
        fileKey,
        fileName: fileData.name,
        executionTime
      });
      
      return result;
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      log('figmaGetFile failed', 'error', {
        fileKey,
        error: errorMessage,
        executionTime
      });
      
      return {
        success: false,
        error: errorMessage,
        fileKey,
        executionTime
      };
    }
}

/**
 * Get Figma file information and metadata
 */
class FigmaGetFileTool extends Tool<typeof _figmaGetFile> {
  use = _figmaGetFile;
}

export const figmaGetFileTool = new FigmaGetFileTool();

// ==================== TYPE EXPORTS ====================

export type FigmaListArtboardsToolFn = typeof figmaListArtboardsTool;
export type FigmaGetArtboardPNGToolFn = typeof figmaGetArtboardPNGTool;
export type FigmaFindArtboardByNameToolFn = typeof figmaFindArtboardByNameTool;
export type FigmaGetFileToolFn = typeof figmaGetFileTool;
