/**
 * ENGI API - Kitchen sink of all API business logic
 * 
 * This package contains all business logic for the engi platform.
 * Routes in the Next.js app import from this package.
 * 
 * Key principles:
 * - Business logic lives here, routes orchestrate
 * - All database operations use @engi/orm
 * - All auth uses @engi/auth
 * - All VCS operations use @engi/vcs
 * 
 * Architecture:
 * - Each module exports business logic functions
 * - Functions are designed to be framework-agnostic
 * - All functions have comprehensive error handling
 * - User scoping is enforced at this layer
 */

// Conversations - Message-centric with attachments
export * from './conversations';
export * from './pipelines/branch';

// VCS - Version control system operations
export * from './vcs';
export * from './routes/auth';

// Additional business logic modules will be added here as they're migrated
// from routes to this package
