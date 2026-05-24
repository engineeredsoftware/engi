export interface BitcodeAppContext {
  handle(req: unknown, res: unknown): Promise<void>;
  getState(principal?: string): unknown;
  resetState(): unknown;
  getBitcoinDemonstrationService(): unknown;
  getExternalRealization(input?: Record<string, unknown>): unknown;
  getReadReview(input?: Record<string, unknown>): unknown;
  reviewRead(input?: Record<string, unknown>): unknown;
  createDeposit(input?: Record<string, unknown>): unknown;
  makeBitcodeBranch(input?: Record<string, unknown>): Promise<unknown>;
  executeLocalExecutorById(interfaceId: string, input?: Record<string, unknown>): Promise<unknown>;
}

export interface BitcodeServerOptions {
  dataPath?: string;
  publicDir?: string;
}

export const DEFAULT_BITCODE_DATA_PATH: string;
export const DEFAULT_BITCODE_PUBLIC_DIR: string;

export function createAppContext(options?: BitcodeServerOptions): BitcodeAppContext;

export function createServer(
  options?: BitcodeServerOptions,
): Promise<{ app: BitcodeAppContext; server: unknown }>;

export function startServer(
  options?: BitcodeServerOptions & { port?: number; host?: string },
): Promise<{ app: BitcodeAppContext; server: unknown; port: number; host: string }>;

export const ACTIVE_CANON_VERSION: string;
export const DRAFT_TARGET_VERSION: string;

export interface BitcodeProtocolReport {
  passed: boolean;
  [key: string]: unknown;
}

export interface BitcodeProvenMarkdownPackage {
  data: unknown;
  markdown: string;
  artifacts?: Record<string, unknown>;
  [key: string]: unknown;
}

export const PROVEN_GENERATOR_ID: string;

export function buildV21SpecFamilyReport(input?: Record<string, unknown>): BitcodeProtocolReport;
export function buildV21CanonicalInputReport(input?: Record<string, unknown>): BitcodeProtocolReport;
export function buildV21GeneratedArtifactContents(input?: Record<string, unknown>): unknown;
export function buildCanonPostureDriftReport(input?: Record<string, unknown>): BitcodeProtocolReport;
export const DOCUMENTATION_SURFACE_CATALOG_ARTIFACT_PATH: string;
export const DOCUMENTATION_SURFACE_CATALOG_CURRENT_TARGET: string;
export const DOCUMENTATION_SURFACE_CATALOG_SCHEMA_ID: string;
export const DOCUMENTATION_SURFACE_CATALOG_VERSION: string;
export const DOCUMENTATION_SURFACE_SOURCE_SAFETY_VERDICT: string;
export const DOCUMENTATION_SURFACE_IDS: readonly string[];
export const DOCUMENTATION_SURFACE_ROWS: readonly Record<string, unknown>[];
export function buildDocumentationSurfaceCatalog(input?: Record<string, unknown>): BitcodeProtocolReport;
export function defaultProvenOutputPath(version: string): string;
export function generateCanonicalProvenMarkdown(input?: Record<string, unknown>): BitcodeProvenMarkdownPackage;
