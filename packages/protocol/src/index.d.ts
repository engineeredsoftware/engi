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
export const EXCHANGE_ACTIVITY_BOOK_ARTIFACT_PATH: string;
export const EXCHANGE_ACTIVITY_BOOK_CURRENT_TARGET: string;
export const EXCHANGE_ACTIVITY_BOOK_SCHEMA_ID: string;
export const EXCHANGE_ACTIVITY_BOOK_VERSION: string;
export const EXCHANGE_ACTIVITY_BOOK_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_ACTIVITY_KINDS: readonly string[];
export const EXCHANGE_ACTIVITY_FILTER_IDS: readonly string[];
export const EXCHANGE_ACTIVITY_DETAIL_SECTION_IDS: readonly string[];
export const EXCHANGE_ACTIVITY_ROWS: readonly Record<string, unknown>[];
export function buildExchangeActivityBook(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_INTENT_ORDER_CONTRACTS_ARTIFACT_PATH: string;
export const EXCHANGE_INTENT_ORDER_CONTRACTS_CURRENT_TARGET: string;
export const EXCHANGE_INTENT_ORDER_CONTRACTS_SCHEMA_ID: string;
export const EXCHANGE_INTENT_ORDER_CONTRACTS_VERSION: string;
export const EXCHANGE_INTENT_ORDER_CONTRACTS_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_INTENT_ACTION_KINDS: readonly string[];
export const EXCHANGE_ORDER_TRANSITION_IDS: readonly string[];
export const EXCHANGE_INTENT_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_ORDER_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_INTENT_ORDER_ROWS: readonly Record<string, unknown>[];
export function buildExchangeIntentOrderContracts(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_RIGHTS_TRANSFER_REVIEW_ARTIFACT_PATH: string;
export const EXCHANGE_RIGHTS_TRANSFER_REVIEW_CURRENT_TARGET: string;
export const EXCHANGE_RIGHTS_TRANSFER_REVIEW_SCHEMA_ID: string;
export const EXCHANGE_RIGHTS_TRANSFER_REVIEW_VERSION: string;
export const EXCHANGE_RIGHTS_TRANSFER_REVIEW_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_RIGHTS_TRANSFER_PREVIEW_STATES: readonly string[];
export const EXCHANGE_RIGHTS_TRANSFER_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_RIGHTS_TRANSFER_PREVIEW_ROWS: readonly Record<string, unknown>[];
export function buildExchangeRightsTransferReview(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_PRICING_QUOTE_ARTIFACT_PATH: string;
export const EXCHANGE_PRICING_QUOTE_CURRENT_TARGET: string;
export const EXCHANGE_PRICING_QUOTE_SCHEMA_ID: string;
export const EXCHANGE_PRICING_QUOTE_VERSION: string;
export const EXCHANGE_PRICING_QUOTE_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_PRICING_QUOTE_STATES: readonly string[];
export const EXCHANGE_PRICING_LIQUIDITY_BANDS: readonly string[];
export const EXCHANGE_PRICING_QUOTE_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_PRICING_QUOTE_ROWS: readonly Record<string, unknown>[];
export function buildExchangePricingQuote(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_SETTLEMENT_RECONCILIATION_ARTIFACT_PATH: string;
export const EXCHANGE_SETTLEMENT_RECONCILIATION_CURRENT_TARGET: string;
export const EXCHANGE_SETTLEMENT_RECONCILIATION_SCHEMA_ID: string;
export const EXCHANGE_SETTLEMENT_RECONCILIATION_VERSION: string;
export const EXCHANGE_SETTLEMENT_RECONCILIATION_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_SETTLEMENT_RECEIPT_STATES: readonly string[];
export const EXCHANGE_SETTLEMENT_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_SETTLEMENT_RECEIPT_ROWS: readonly Record<string, unknown>[];
export function buildExchangeSettlementReconciliation(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_DISPUTE_REPAIR_REVENUE_ROUTE_ARTIFACT_PATH: string;
export const EXCHANGE_DISPUTE_REPAIR_REVENUE_ROUTE_CURRENT_TARGET: string;
export const EXCHANGE_DISPUTE_REPAIR_REVENUE_ROUTE_SCHEMA_ID: string;
export const EXCHANGE_DISPUTE_REPAIR_REVENUE_ROUTE_VERSION: string;
export const EXCHANGE_DISPUTE_REPAIR_REVENUE_ROUTE_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_DISPUTE_INCIDENT_CLASSES: readonly string[];
export const EXCHANGE_REVENUE_ROUTE_STATES: readonly string[];
export const EXCHANGE_DISPUTE_REPAIR_CASE_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_REVENUE_ROUTE_REQUIRED_FIELD_IDS: readonly string[];
export const EXCHANGE_DISPUTE_REPAIR_CASE_ROWS: readonly Record<string, unknown>[];
export const EXCHANGE_REVENUE_ROUTE_ROWS: readonly Record<string, unknown>[];
export function buildExchangeDisputeRepairRevenueRoute(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_UX_PROOF_ARTIFACT_PATH: string;
export const EXCHANGE_UX_PROOF_CURRENT_TARGET: string;
export const EXCHANGE_UX_PROOF_SCHEMA_ID: string;
export const EXCHANGE_UX_PROOF_VERSION: string;
export const EXCHANGE_UX_PROOF_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_UX_CAPABILITY_IDS: readonly string[];
export const EXCHANGE_UX_ROUTE_IDS: readonly string[];
export const EXCHANGE_UX_SOURCE_SAFE_DETAIL_IDS: readonly string[];
export const EXCHANGE_UX_PROOF_ROWS: readonly Record<string, unknown>[];
export function buildExchangeUxProof(input?: Record<string, unknown>): BitcodeProtocolReport;
export const EXCHANGE_REHEARSAL_ARTIFACT_PATH: string;
export const EXCHANGE_REHEARSAL_CURRENT_TARGET: string;
export const EXCHANGE_REHEARSAL_SCHEMA_ID: string;
export const EXCHANGE_REHEARSAL_VERSION: string;
export const EXCHANGE_REHEARSAL_SOURCE_SAFETY_VERDICT: string;
export const EXCHANGE_REHEARSAL_IDS: readonly string[];
export const EXCHANGE_REHEARSAL_FLOW_IDS: readonly string[];
export const EXCHANGE_REHEARSAL_ROWS: readonly Record<string, unknown>[];
export function buildExchangeRehearsal(input?: Record<string, unknown>): BitcodeProtocolReport;
export const DOCUMENTATION_SURFACE_CATALOG_ARTIFACT_PATH: string;
export const DOCUMENTATION_SURFACE_CATALOG_CURRENT_TARGET: string;
export const DOCUMENTATION_SURFACE_CATALOG_SCHEMA_ID: string;
export const DOCUMENTATION_SURFACE_CATALOG_VERSION: string;
export const DOCUMENTATION_SURFACE_SOURCE_SAFETY_VERDICT: string;
export const DOCUMENTATION_SURFACE_IDS: readonly string[];
export const DOCUMENTATION_SURFACE_ROWS: readonly Record<string, unknown>[];
export function buildDocumentationSurfaceCatalog(input?: Record<string, unknown>): BitcodeProtocolReport;
export const TELEMETRY_TAXONOMY_CATALOG_ARTIFACT_PATH: string;
export const TELEMETRY_TAXONOMY_CATALOG_CURRENT_TARGET: string;
export const TELEMETRY_TAXONOMY_CATALOG_SCHEMA_ID: string;
export const TELEMETRY_TAXONOMY_CATALOG_VERSION: string;
export const TELEMETRY_TAXONOMY_SOURCE_SAFETY_VERDICT: string;
export const TELEMETRY_EVENT_FAMILIES: readonly string[];
export const TELEMETRY_TAXONOMY_ROWS: readonly Record<string, unknown>[];
export function buildTelemetryTaxonomyCatalog(input?: Record<string, unknown>): BitcodeProtocolReport;
export const PUBLIC_DOCS_USAGE_GUIDE_CATALOG_ARTIFACT_PATH: string;
export const PUBLIC_DOCS_USAGE_GUIDE_CATALOG_CURRENT_TARGET: string;
export const PUBLIC_DOCS_USAGE_GUIDE_CATALOG_SCHEMA_ID: string;
export const PUBLIC_DOCS_USAGE_GUIDE_CATALOG_VERSION: string;
export const PUBLIC_DOCS_USAGE_GUIDE_SOURCE_SAFETY_VERDICT: string;
export const PUBLIC_DOCS_USAGE_GUIDE_IDS: readonly string[];
export const PUBLIC_DOCS_USAGE_GUIDE_ROWS: readonly Record<string, unknown>[];
export function buildPublicDocsUsageGuideCatalog(input?: Record<string, unknown>): BitcodeProtocolReport;
export const OPERATOR_RUNBOOK_CATALOG_ARTIFACT_PATH: string;
export const OPERATOR_RUNBOOK_CATALOG_CURRENT_TARGET: string;
export const OPERATOR_RUNBOOK_CATALOG_SCHEMA_ID: string;
export const OPERATOR_RUNBOOK_CATALOG_VERSION: string;
export const OPERATOR_RUNBOOK_SOURCE_SAFETY_VERDICT: string;
export const OPERATOR_RUNBOOK_IDS: readonly string[];
export const OPERATOR_RUNBOOK_ROWS: readonly Record<string, unknown>[];
export function buildOperatorRunbookCatalog(input?: Record<string, unknown>): BitcodeProtocolReport;
export const DOCS_QA_ALIGNMENT_REPORT_ARTIFACT_PATH: string;
export const DOCS_QA_ALIGNMENT_REPORT_CURRENT_TARGET: string;
export const DOCS_QA_ALIGNMENT_REPORT_SCHEMA_ID: string;
export const DOCS_QA_ALIGNMENT_REPORT_VERSION: string;
export const DOCS_QA_ALIGNMENT_SOURCE_SAFETY_VERDICT: string;
export const DOCS_QA_ALIGNMENT_IDS: readonly string[];
export const DOCS_QA_ALIGNMENT_ROWS: readonly Record<string, unknown>[];
export function buildDocsQaAlignmentReport(input?: Record<string, unknown>): BitcodeProtocolReport;
export const TESTNET_ROLLOUT_READINESS_GUIDE_ARTIFACT_PATH: string;
export const TESTNET_ROLLOUT_READINESS_GUIDE_CURRENT_TARGET: string;
export const TESTNET_ROLLOUT_READINESS_GUIDE_SCHEMA_ID: string;
export const TESTNET_ROLLOUT_READINESS_GUIDE_VERSION: string;
export const TESTNET_ROLLOUT_READINESS_SOURCE_SAFETY_VERDICT: string;
export const TESTNET_ROLLOUT_GUIDE_IDS: readonly string[];
export const TESTNET_ROLLOUT_LANE_IDS: readonly string[];
export const TESTNET_ROLLOUT_READINESS_ROWS: readonly Record<string, unknown>[];
export function buildTestnetRolloutReadinessGuide(input?: Record<string, unknown>): BitcodeProtocolReport;
export const TELEMETRY_DOCUMENTATION_INTERFACE_INTEGRATION_ARTIFACT_PATH: string;
export const TELEMETRY_DOCUMENTATION_INTERFACE_INTEGRATION_CURRENT_TARGET: string;
export const TELEMETRY_DOCUMENTATION_INTERFACE_INTEGRATION_SCHEMA_ID: string;
export const TELEMETRY_DOCUMENTATION_INTERFACE_INTEGRATION_VERSION: string;
export const TELEMETRY_DOCUMENTATION_INTERFACE_INTEGRATION_SOURCE_SAFETY_VERDICT: string;
export const TELEMETRY_DOCUMENTATION_INTERFACE_IDS: readonly string[];
export const TELEMETRY_DOCUMENTATION_INTERFACE_ROWS: readonly Record<string, unknown>[];
export function buildTelemetryDocumentationInterfaceIntegration(input?: Record<string, unknown>): BitcodeProtocolReport;
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_ARTIFACT_PATH: string;
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_CURRENT_TARGET: string;
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_SCHEMA_ID: string;
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_VERSION: string;
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_SOURCE_SAFETY_VERDICT: string;
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_IDS: readonly string[];
export const LOCAL_STAGING_TELEMETRY_DOCUMENTATION_REHEARSAL_ROWS: readonly Record<string, unknown>[];
export function buildLocalStagingTelemetryDocumentationRehearsal(input?: Record<string, unknown>): BitcodeProtocolReport;
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_REPORT_ARTIFACT_PATH: string;
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_REPORT_CURRENT_TARGET: string;
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_REPORT_SCHEMA_ID: string;
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_REPORT_VERSION: string;
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_SOURCE_SAFETY_VERDICT: string;
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_GATE_ARTIFACT_PATHS: readonly string[];
export const DOCUMENTATION_TELEMETRY_PROMOTION_READINESS_GENERATED_OUTPUTS: readonly string[];
export function buildDocumentationTelemetryPromotionReadinessReport(input?: Record<string, unknown>): BitcodeProtocolReport;
export function defaultProvenOutputPath(version: string): string;
export function generateCanonicalProvenMarkdown(input?: Record<string, unknown>): BitcodeProvenMarkdownPackage;
