export interface Account {
  login: string;
  type: string;
  id: number;
}

export interface Repository {
  id: string;
  name: string;
}

export interface IssueOrPR {
  id: string;
  title: string;
  isPR: boolean;
  url: string;
}

export interface RepoFile {
  path: string;
  type: string;
  sha: string;
}

export interface AgenticExecutionSummary {
  canonicalType: string;
  family: 'asset-pack' | 'need-measurement' | 'proof-refresh' | 'upgrade' | 'agentic-execution';
  label: string;
  lens: 'give' | 'need' | 'closure';
  proofStatus: string;
  closureFocus: string;
}

/** Response from GET /api/executions?action=installations */
export interface InstallationResponse {
  accounts: Account[];
}

export interface Shippable {
  url: string;
  number?: number;
  title?: string;
  type: 'pr';
}

export type AssetPackFileChanges = {
  edited: number;
  created: number;
  deleted: number;
  paths?: string[];
  charDiff?: {
    edited: number;
    created: number;
    deleted: number;
  };
};

export type AssetPackSurface = {
  pullRequest?: Shippable | null;
  fileChanges?: AssetPackFileChanges | null;
  summary?: string | null;
};

export type AssetPackSynthesisArtifactsSurface = AssetPackSurface & {
  proofEvidence?: string[] | null;
  reviewNotes?: string[] | null;
};

export interface CompletionData {
  /** Full markdown summary of work completed */
  summary: string;
  /** Primary display string or title */
  display: string;
  /**
   * Primary Finish-delivered shippables surface.
   * Bitcode-owned reread should prefer `assetPackSynthesisArtifacts`
   * and `asset_pack_completion.assetPackSynthesisArtifacts` for synthesized
   * source evidence, then `shippables` for connected-interface artifacts.
   */
  shippables: AssetPackSurface;
  /** Bitcode-owned implementation-phase AssetPack synthesis artifacts. */
  assetPackSynthesisArtifacts?: AssetPackSynthesisArtifactsSurface | null;
  /** Semantic reread of the AssetPack synthesis artifacts. */
  writtenAssets?: AssetPackSurface | null;
  /** Delivery mechanism projected onto connected interfaces. */
  deliveryMechanism?: AssetPackSurface | null;
  semanticKind?: 'asset-pack-written-asset';
  need?: string | null;
  writtenAssetType?: string | null;
  assetPack?: {
    need?: string | null;
    writtenAssetType?: string | null;
    definitionOfNeed?: string | null;
    deliveryTarget?: string | null;
  } | null;
  /** Total time in milliseconds */
  duration: number;
  /** Type of task executed */
  taskType: string;
  /** Processing statistics (runtime metrics) */
  processingStats?: {
    /** Human-readable duration, e.g. "4m 18s" */
    time: string;
    /** Token usage counts */
    tokens?: {
      input: number;
      output: number;
      total: number;
    };
    /** Canonical $BTD consumed */
    btdUsed?: number;
  };
  /** Snapshot of the repository at time of execution */
  repoSnapshot?: {
    org: string;
    repo: string;
    branch: string;
    commit: string;
  };
}

export interface UrlEntry {
  url: string;
  title: string;
  origin: string;
  status?: 'success' | 'error';
}
// Record type for a single Shippable history item.
export interface ShippableHistoryItem {
  id: string;
  title: string;
  output?: string | null;
  repository?: string | null;
  shippable_type: 'pr';
  shippable_id?: string | null;
  shippable_status?: string | null;
  attached_urls?: any;
  selected_files?: any;
  created_at: string;
  run_id: string;
}

// Wrapper object representing a single AssetPack pipeline execution.
export interface PipelineExecution {
  id: string;
  created_at: string;
  guide?: string | null;
  type?: string | null;
  agentic_execution?: AgenticExecutionSummary | null;
  status?: string;
  output?: Record<string, any> | null;
  metadata?: Record<string, any> | null;
  items: ShippableHistoryItem[];
  /**
   * Arbitrary JSON context blob attached to the run.  Modern pipelines attach
   * a rich object matching `GlobalContext` (see `lib/context`), while legacy
   * runs stored a raw JSON string that contained only ai_document suggestions or
   * a summary.  Keep this loosely typed so callers can narrow as needed.
   */
  context?: Record<string, any> | string | null;

  /** Optional markdown summary stored by backend */
  summary?: string | null;

  /** Execution metrics (time, tokens, $BTD, spend, latency) */
  processing_stats?: {
    time: string;
    tokens?: { input: number; output: number; total: number };
    btdUsed?: number;
    usdTotal?: number;
    averageLatencyMs?: number | null;
    modelUsage?: Array<{
      provider: string;
      model: string;
      callCount: number;
      totalTokens: number;
      inputTokens: number;
      outputTokens: number;
      totalCostUsd: number;
      averageLatencyMs: number | null;
    }>;
  } | null;

  /** Repository snapshot meta */
  repo_snapshot?: { org: string; repo: string; branch: string; commit: string } | null;
  /** Bitcode-owned implementation-phase AssetPack synthesis artifacts. */
  asset_pack_synthesis_artifacts?: AssetPackSynthesisArtifactsSurface | null;
  /** Semantic reread of the AssetPack synthesis artifacts. */
  written_assets?: AssetPackSurface | null;
  /** V26 Finish-delivered pull-request Shippable. */
  shippables?: AssetPackSurface | null;
  /** Delivery mechanism projected onto the connected pull-request interface. */
  delivery_mechanism?: AssetPackSurface | null;
  need?: string | null;
  written_asset_type?: string | null;
  asset_pack?: {
    need?: string | null;
    writtenAssetType?: string | null;
    definitionOfNeed?: string | null;
    deliveryTarget?: string | null;
  } | null;

  /** Canonical AssetPack completion payload. */
  asset_pack_completion?: {
    summary?: string | null;
    /** Primary Finish-delivered Shippables. */
    shippables?: AssetPackSurface;
    /** Bitcode-owned implementation-phase AssetPack synthesis artifacts. */
    assetPackSynthesisArtifacts?: AssetPackSynthesisArtifactsSurface;
    /** Semantic reread of the AssetPack synthesis artifacts. */
    writtenAssets?: AssetPackSurface;
    /** Delivery mechanism projected onto connected interfaces. */
    deliveryMechanism?: AssetPackSurface;
    need?: string | null;
    writtenAssetType?: string | null;
    assetPack?: {
      need?: string | null;
      writtenAssetType?: string | null;
      definitionOfNeed?: string | null;
      deliveryTarget?: string | null;
    };
    processingStats?: {
      time: string;
      tokens?: { input: number; output: number; total: number };
      btdUsed?: number;
      usdTotal?: number;
      averageLatencyMs?: number | null;
      modelUsage?: Array<{
        provider: string;
        model: string;
        callCount: number;
        totalTokens: number;
        inputTokens: number;
        outputTokens: number;
        totalCostUsd: number;
        averageLatencyMs: number | null;
      }>;
    };
    repoSnapshot?: { org: string; repo: string; branch: string; commit: string };
  } | null;
}
// Record type for a single ai_document history item
export interface AIDocumentHistoryItem {
  id: string;
  title: string;
  output?: string | null;
  repository?: string | null;
  ai_document_type: string;
  metrics?: any;
  created_at: string;
  run_id: string;
}
// Wrapper object representing a single user 'run' that may contain multiple ai_documents
export interface AIDocumentRun {
  id: string;
  created_at: string;
  items: AIDocumentHistoryItem[];
  summary?: string | null;
  processing_stats?: {
    time: string;
    tokens?: { input: number; output: number; total: number };
    btdUsed?: number;
    usdTotal?: number;
    averageLatencyMs?: number | null;
    modelUsage?: Array<{
      provider: string;
      model: string;
      callCount: number;
      totalTokens: number;
      inputTokens: number;
      outputTokens: number;
      totalCostUsd: number;
      averageLatencyMs: number | null;
    }>;
  } | null;
  repo_snapshot?: { org: string; repo: string; branch: string; commit: string } | null;
  asset_pack_synthesis_artifacts?: { summary?: string | null } | null;
  written_assets?: { summary?: string | null } | null;
  shippables?: { summary?: string | null } | null;
  need?: string | null;
  written_asset_type?: string | null;
  asset_pack?: {
    need?: string | null;
    writtenAssetType?: string | null;
    definitionOfNeed?: string | null;
    deliveryTarget?: string | null;
  } | null;
  asset_pack_completion?: {
    summary?: string | null;
    shippables?: { summary?: string | null };
    assetPackSynthesisArtifacts?: { summary?: string | null };
    writtenAssets?: { summary?: string | null };
    need?: string | null;
    writtenAssetType?: string | null;
    assetPack?: {
      need?: string | null;
      writtenAssetType?: string | null;
      definitionOfNeed?: string | null;
      deliveryTarget?: string | null;
    };
    processingStats?: {
      time: string;
      tokens?: { input: number; output: number; total: number };
      btdUsed?: number;
      usdTotal?: number;
      averageLatencyMs?: number | null;
      modelUsage?: Array<{
        provider: string;
        model: string;
        callCount: number;
        totalTokens: number;
        inputTokens: number;
        outputTokens: number;
        totalCostUsd: number;
        averageLatencyMs: number | null;
      }>;
    };
    repoSnapshot?: { org: string; repo: string; branch: string; commit: string };
  } | null;
}

// Unified postprocessed result type
export type ShippableArtifacts = {
  filesCreated: string[];
  filesModified: string[];
  testsAdded: number;
  testsPassing?: number;
  documentation: string[];
};

export type ValidationReadySnapshot = {
  approved: boolean;
  assessment?: unknown | null;
  confidence?: number | null;
};

export type PostprocessedResult = {
  executionId: string;
  kind: 'shippable' | 'multi-shippable' | 'ai_document';
  title: string;
  repository?: string;
  summary?: string;
  artifacts?: ShippableArtifacts | null;
  validationReady?: ValidationReadySnapshot;
  entries?: PostprocessedResult[];
  series?: PostprocessedResult[];
  ai_documentType?: string;
  output?: string;
};

// Route Pipeline Execution – Preprocessed (top-level)
export type RoutePreprocessed = {
  assetPackWrittenAsset?: {
    preprocessing: { multi: boolean; compute: boolean };
    selectedPipeline: 'multi' | 'standard';
    provisioning: 'requested' | 'skipped' | 'ready' | 'failed';
  };
};
