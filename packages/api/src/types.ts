/**
 * API Types - Type definitions for the engi API layer
 * 
 * Provides comprehensive type definitions for business logic
 */

/**
 * Standard API response shape
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  statusCode?: number;
}

/**
 * Response metadata
 */
export interface ResponseMetadata {
  requestId: string;
  duration?: number;
  pagination?: PaginationMetadata;
}

/**
 * Pagination metadata
 */
export interface PaginationMetadata {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  limit?: number;
  cursor?: string;
  offset?: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  nextCursor?: string;
  total?: number;
}