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

export interface Deliverable {
  url: string;
  number?: number;
  title?: string;
  type: 'pr' | 'comment' | 'issue';
}

export interface CompletionData {
  /** Full markdown summary of work completed */
  summary: string;
  /** Primary display string or title */
  display: string;
  /**
   * Compatibility shipping surface.
   * Bitcode-owned reread should prefer `assetPackSynthesisArtifacts`
   * and `final_work_summary.assetPackSynthesisArtifacts`; writtenAssets
   * remains a compatibility mirror and these categories remain delivery mechanisms.
   */
  deliverables: {
    pullRequest: Deliverable | null;
    /** Reviews of pull requests */
    pullRequestReviews: Deliverable[] | null;
    comments: Deliverable[] | null;
    issues: Deliverable[] | null;
    fileChanges: {
      edited: number;
      created: number;
      deleted: number;
      paths: string[];
      /** Optional character-level diff metrics */
      charDiff?: {
        edited: number;
        created: number;
        deleted: number;
      };
    } | null;
  };
  /** Bitcode-owned implementation-phase AssetPack synthesis artifacts. */
  assetPackSynthesisArtifacts?: {
    pullRequest?: Deliverable | null;
    pullRequestReviews?: Deliverable[] | null;
    comments?: Deliverable[] | null;
    issues?: Deliverable[] | null;
    fileChanges?: {
      edited: number;
      created: number;
      deleted: number;
      paths?: string[];
      charDiff?: {
        edited: number;
        created: number;
        deleted: number;
      };
    } | null;
    proofEvidence?: string[] | null;
    reviewNotes?: string[] | null;
    summary?: string | null;
  } | null;
  /** Compatibility written-assets mirror of the AssetPack synthesis artifacts. */
  writtenAssets?: {
    pullRequest?: Deliverable | null;
    pullRequestReviews?: Deliverable[] | null;
    comments?: Deliverable[] | null;
    issues?: Deliverable[] | null;
    fileChanges?: {
      edited: number;
      created: number;
      deleted: number;
      paths?: string[];
      charDiff?: {
        edited: number;
        created: number;
        deleted: number;
      };
    } | null;
    summary?: string | null;
  } | null;
  /** Delivery mechanism projected onto connected interfaces. */
  deliveryMechanism?: {
    pullRequest?: Deliverable | null;
    pullRequestReviews?: Deliverable[] | null;
    comments?: Deliverable[] | null;
    issues?: Deliverable[] | null;
    fileChanges?: {
      edited: number;
      created: number;
      deleted: number;
      paths?: string[];
      charDiff?: {
        edited: number;
        created: number;
        deleted: number;
      };
    } | null;
    summary?: string | null;
  } | null;
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
// Record type for a single deliverable history item
export interface DeliverableHistoryItem {
  id: string;
  title: string;
  output?: string | null;
  repository?: string | null;
  deliverable_type: string;
  deliverable_id?: string | null;
  deliverable_status?: string | null;
  attached_urls?: any;
  selected_files?: any;
  created_at: string;
  run_id: string;
}
// Wrapper object representing a single pipeline execution that may contain deliverable items
export interface PipelineExecution {
  id: string;
  created_at: string;
  guide?: string | null;
  type?: string | null;
  agentic_execution?: AgenticExecutionSummary | null;
  status?: string;
  output?: Record<string, any> | null;
  metadata?: Record<string, any> | null;
  items: DeliverableHistoryItem[];
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
  asset_pack_synthesis_artifacts?: {
    pullRequest?: any;
    pullRequestReviews?: any[] | null;
    comments?: any[] | null;
    issues?: any[] | null;
    fileChanges?: any;
    proofEvidence?: string[] | null;
    reviewNotes?: string[] | null;
    summary?: string | null;
  } | null;
  /** Compatibility written-assets mirror of the AssetPack synthesis artifacts. */
  written_assets?: {
    pullRequest?: any;
    pullRequestReviews?: any[] | null;
    comments?: any[] | null;
    issues?: any[] | null;
    fileChanges?: any;
    summary?: string | null;
  } | null;
  /** Delivery mechanism projected onto connected interfaces like PRs, comments, and issues. */
  delivery_mechanism?: {
    pullRequest?: any;
    pullRequestReviews?: any[] | null;
    comments?: any[] | null;
    issues?: any[] | null;
    fileChanges?: any;
    summary?: string | null;
  } | null;
  need?: string | null;
  written_asset_type?: string | null;
  asset_pack?: {
    need?: string | null;
    writtenAssetType?: string | null;
    definitionOfNeed?: string | null;
    deliveryTarget?: string | null;
  } | null;

  /** Canonical Final Work Summary payload */
  final_work_summary?: {
    summary?: string | null;
    /** Compatibility delivery mechanism kept for retained consumers. */
    deliverables?: {
      pullRequest?: any;
      pullRequestReviews?: any[] | null;
      comments?: any[] | null;
      issues?: any[] | null;
      fileChanges?: any;
      summary?: string | null;
    };
    /** Bitcode-owned implementation-phase AssetPack synthesis artifacts. */
    assetPackSynthesisArtifacts?: {
      pullRequest?: any;
      pullRequestReviews?: any[] | null;
      comments?: any[] | null;
      issues?: any[] | null;
      fileChanges?: any;
      proofEvidence?: string[] | null;
      reviewNotes?: string[] | null;
      summary?: string | null;
    };
    /** Compatibility written-assets mirror of the AssetPack synthesis artifacts. */
    writtenAssets?: {
      pullRequest?: any;
      pullRequestReviews?: any[] | null;
      comments?: any[] | null;
      issues?: any[] | null;
      fileChanges?: any;
      summary?: string | null;
    };
    /** Delivery mechanism projected onto connected interfaces. */
    deliveryMechanism?: {
      pullRequest?: any;
      pullRequestReviews?: any[] | null;
      comments?: any[] | null;
      issues?: any[] | null;
      fileChanges?: any;
      summary?: string | null;
    };
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
  need?: string | null;
  written_asset_type?: string | null;
  asset_pack?: {
    need?: string | null;
    writtenAssetType?: string | null;
    definitionOfNeed?: string | null;
    deliveryTarget?: string | null;
  } | null;
  final_work_summary?: {
    summary?: string | null;
    deliverables?: { summary?: string | null };
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
export type DeliverableArtifacts = {
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
  kind: 'deliverable' | 'multi-deliverable' | 'ai_document';
  title: string;
  repository?: string;
  summary?: string;
  deliverableType?: 'code-change' | 'code-change-review' | 'design-document' | 'design-document-review';
  artifacts?: DeliverableArtifacts | null;
  validationReady?: ValidationReadySnapshot;
  entries?: PostprocessedResult[];
  series?: PostprocessedResult[];
  ai_documentType?: string;
  output?: string;
};

// Route Pipeline Execution – Preprocessed (top-level)
export type RoutePreprocessed = {
  deliverables?: {
    preprocessing: { multi: boolean; compute: boolean };
    selectedPipeline: 'multi' | 'standard';
    provisioning: 'requested' | 'skipped' | 'ready' | 'failed';
  };
};
