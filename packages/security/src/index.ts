/**
 * Production-grade security utilities package
 * 
 * Comprehensive security solution for credential management, authentication,
 * rate limiting, audit logging, monitoring, and protection against common
 * web application security vulnerabilities.
 */

// Encryption and credential security
export {
  encryptCredential,
  decryptCredential,
  secureCompareCredentials,
  generateSecureCredential,
  validateEncryptedCredential,
  validateEncryptionConfig,
  migrateCredentialToEncrypted,
  rotateCredentialEncryption,
  type EncryptedCredential,
  type EncryptionOptions
} from './encryption';

// Rate limiting and abuse prevention
export {
  rateLimitMiddleware,
  createRateLimiter,
  withRateLimit,
  RateLimitPresets,
  type RateLimitConfig,
  type RateLimitResult,
  type RateLimitStore
} from './rate-limiting';

// Audit logging and compliance
export {
  auditLog,
  auditCredentialOperation,
  auditAuthAttempt,
  auditMCPConfig,
  auditRateLimitExceeded,
  createAuditContext,
  AuditEventType,
  ResourceType,
  type AuditLogEntry,
  type AuditContext
} from './audit-logging';

// Input validation and sanitization
export {
  FigmaConnectionSchema,
  GitHubConnectionSchema,
  ApiKeyGenerationSchema,
  SupabaseMCPConfigSchema,
  AWSMCPConfigSchema,
  VercelMCPConfigSchema,
  GitHubMCPConfigSchema,
  OAuthCallbackSchema,
  RateLimitRequestSchema,
  CredentialUpdateSchema,
  AuditLogEntrySchema,
  ValidationHelpers,
  type FigmaConnectionData,
  type GitHubConnectionData,
  type ApiKeyGenerationData,
  type SupabaseMCPConfigData,
  type AWSMCPConfigData,
  type VercelMCPConfigData,
  type GitHubMCPConfigData,
  type OAuthCallbackData,
  type RateLimitRequestData,
  type CredentialUpdateData,
  type AuditLogEntryData
} from './validation';

// Note: Client-only hooks are exported from '@bitcode/security/client' to avoid
// importing React client modules in server contexts.

// Twilio webhook and phone utilities
export {
  validateTwilioWebhook,
  maskPhoneNumber,
  isValidE164,
  sanitizeSmsContent
} from './twilio';

// Credential lifecycle management
export {
  CredentialExpirationChecker,
  CredentialRotationManager,
  CredentialMonitoringService,
  CredentialUtils,
  DefaultRotationPolicies,
  type CredentialRotationPolicy,
  type CredentialExpirationStatus,
  type CredentialRotationResult
} from './credential-management';

// Security monitoring and threat detection
export {
  SecurityMonitoringService,
  AlertSeverity,
  AlertType,
  type SecurityThresholds,
  type SecurityAlert,
  type ActivityPattern
} from './monitoring';

// Secure error handling
export {
  SecureErrorHandler,
  secureErrorHandler,
  ErrorCategory,
  ErrorSeverity,
  ErrorUtils,
  type SecureErrorResponse,
  type ErrorContext
} from './error-handling';

// Security headers and CSRF protection
export {
  SecurityHeadersMiddleware,
  CSRFProtection,
  SecurityMiddleware,
  SecurityUtils,
  securityHeaders,
  csrfProtection,
  securityMiddleware,
  type SecurityHeadersConfig,
  type CSPDirectives,
  type CSRFConfig
} from './headers';
