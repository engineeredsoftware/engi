export interface BitcodeAppContext {
  handle(req: unknown, res: unknown): Promise<void>;
  getState(principal?: string): unknown;
  resetState(): unknown;
  getBitcoinDemonstrationService(): unknown;
  getExternalRealization(input?: Record<string, unknown>): unknown;
  getNeedReview(input?: Record<string, unknown>): unknown;
  reviewNeed(input?: Record<string, unknown>): unknown;
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
