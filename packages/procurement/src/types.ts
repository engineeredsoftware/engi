/**
 * Procurement Package Type Definitions
 * 
 * Core types for the procurement system built around the base 'Procurement' concept
 * with integrated Marks of Measurement (MoM) for quality assessment and crypto compensation.
 */

/**
 * CORE TYPE: Base Procurement
 * 
 * A procurement represents a request for a specific capability, solution, or enhancement.
 * Created in an unfilled state with clear measurement criteria.
 */
export interface Procurement {
  id: string;
  organizationId: string;
  requestorId: string;
  status: ProcurementStatus;
  
  // Core Request Details
  title: string;
  description: string;
  requirements: string[];
  constraints: string[];
  priority: ProcurementPriority;
  
  // Context Information
  context: ProcurementContext;
  
  // Marks of Measurement (MoM) - Quality assessment criteria
  measurementCriteria: MarksOfMeasurement;
  
  // Budget and Compensation
  budget: ProcurementBudget;
  estimatedReward: TokenReward;
  
  // Fulfillment
  fulfillment?: ProcurementFulfillment;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  deadline?: string;
}

/**
 * Marks of Measurement (MoM)
 * 
 * Defines the quality assessment criteria for evaluating procurement fulfillment.
 * Used to calculate crypto compensation.
 */
export interface MarksOfMeasurement {
  // Core Quality Dimensions
  codeQuality: {
    weight: number;        // 0-1, importance in final score
    minThreshold: number;  // 0-100, minimum acceptable score
    description: string;
  };
  completeness: {
    weight: number;
    minThreshold: number;
    description: string;
  };
  innovation: {
    weight: number;
    minThreshold: number;
    description: string;
  };
  impact: {
    weight: number;
    minThreshold: number;
    description: string;
  };
  
  // Technical Measurements
  performance?: {
    weight: number;
    minThreshold: number;
    benchmarks: string[];
  };
  security?: {
    weight: number;
    minThreshold: number;
    requirements: string[];
  };
  maintainability?: {
    weight: number;
    minThreshold: number;
    standards: string[];
  };
  
  // Custom measurements for specific procurement types
  customMeasurements?: Record<string, {
    weight: number;
    minThreshold: number;
    description: string;
    evaluationCriteria: string[];
  }>;
  
  // Overall scoring
  passingScore: number;      // 0-100, minimum score to be considered successful
  bonusThresholds: number[]; // Scores that trigger bonus compensation
}

export interface ProcurementContext {
  // Repository context (if applicable)
  repository?: {
    owner: string;
    name: string;
    branch: string;
    commit: string;
    techStack: string[];
    framework?: string;
  };
  
  // Technical context
  technical: {
    requiredTech: string[];
    preferredTech: string[];
    compatibility: string[];
    integrationPoints: string[];
  };
  
  // Business context
  business: {
    useCase: string;
    stakeholders: string[];
    timeline: string;
    dependencies: string[];
  };
  
  // Attachments and references
  attachments: Array<{
    type: 'document' | 'code' | 'design' | 'specification';
    content: string;
    metadata: Record<string, any>;
  }>;
}

export interface ProcurementFulfillment {
  contributorId: string;
  contributorAddress: string; // Ethereum address for crypto compensation
  
  // FulfillmentArtifacts
  fulfillmentArtifacts: Array<{
    type: 'code' | 'documentation' | 'configuration' | 'integration';
    content: string;
    metadata: Record<string, any>;
  }>;
  
  // Quality Assessment
  measurements: {
    codeQuality: number;
    completeness: number;
    innovation: number;
    impact: number;
    overall: number;
    customScores?: Record<string, number>;
  };
  
  // Compensation
  reward: TokenReward;
  transaction?: {
    hash: string;
    blockNumber: number;
    status: 'pending' | 'confirmed' | 'failed';
  };
  
  // Review and feedback
  review?: {
    score: number;
    feedback: string;
    reviewer: string;
    reviewedAt: string;
  };
  
  fulfilledAt: string;
}

export interface TokenReward {
  baseAmount: string;        // BTD-denominated Bitcode share units
  qualityMultiplier: number; // Based on MoM scores
  bonusAmount: string;       // Additional rewards for exceptional work
  totalAmount: string;       // Final amount to be minted
  estimatedUsdValue?: number;
}

export interface ProcurementSearchParams {
  organizationId: string;
  queryText: string;
  maxResults?: number;
  similarityThreshold?: number;
  accessLevels?: AccessLevel[];
  categoryFilter?: SolutionCategory;
  maxBudget?: number;
  minRating?: number;
  techStack?: string[];
  measurementRequirements?: Partial<MarksOfMeasurement>;
}

// Repository Opt-in System
export interface RepositoryOptIn {
  repositoryId: string;
  organizationId: string;
  owner: string;
  name: string;
  optInStatus: 'opted-in' | 'opted-out' | 'pending';
  availabilityLevel: 'public' | 'premium' | 'private';
  contributorAddress: string; // For crypto compensation
  
  // Procurement settings
  settings: {
    allowedProcurementTypes: SolutionCategory[];
    maxComplexity: number;
    minimumReward: string; // BTD-denominated Bitcode share units
    autoAcceptThreshold?: number; // Auto-accept procurements below this complexity
    reviewRequired: boolean;
  };
  
  // Repository context for search optimization
  metadata: {
    techStack: string[];
    framework: string;
    language: string;
    size: 'small' | 'medium' | 'large' | 'enterprise';
    activityLevel: 'low' | 'medium' | 'high';
    specializations: string[];
  };
  
  // Performance metrics
  metrics: {
    successfulProcurements: number;
    averageRating: number;
    responseTime: number; // Average hours to respond
    completionRate: number; // Percentage of accepted procurements completed
  };
  
  optedInAt: string;
  lastUpdated: string;
}

// Global Dataset Search Architecture
export interface GlobalDatasetEntry {
  id: string;
  repositoryId: string;
  contributorId: string;
  type: 'code' | 'pattern' | 'solution' | 'integration' | 'framework';
  
  // Content and embedding
  content: string;
  embedding: number[]; // Vector embedding for similarity search
  
  // Classification
  category: SolutionCategory;
  tags: string[];
  techStack: string[];
  complexity: number; // 0-100
  
  // Quality metrics
  quality: {
    codeQuality: number;
    documentation: number;
    testCoverage: number;
    maintainability: number;
    performance: number;
  };
  
  // Usage and performance
  usageCount: number;
  successRate: number;
  averageRating: number;
  
  // Context
  context: {
    problemDomain: string;
    useCase: string;
    constraints: string[];
    requirements: string[];
  };
  
  // Procurement compatibility
  procurementCompatibility: {
    minBudget: string; // BTD-denominated Bitcode share units
    estimatedEffort: number; // Hours
    customizationRequired: boolean;
    supportLevel: 'basic' | 'enhanced' | 'full';
  };
  
  createdAt: string;
  lastUpdated: string;
}

export interface ProcurementResult {
  procurements: Procurement[];
  totalResults: number;
  searchMetadata: {
    query: string;
    filters: Record<string, any>;
    executionTime: number;
    source: 'global-dataset' | 'marketplace' | 'opted-repositories';
    algorithm: 'vector-similarity' | 'semantic-search' | 'hybrid';
  };
}

export interface ProcurementBudget {
  organizationId: string;
  totalBudget: number;
  allocatedBudget: number;
  remainingBudget: number;
  currency: string;
  period: 'monthly' | 'quarterly' | 'annual' | 'one-time';
  restrictions: {
    maxPerTransaction: number;
    approvalRequired: boolean;
    allowedCategories: SolutionCategory[];
    allowedProviders: string[];
  };
}

export interface ProcurementOrder {
  orderId: string;
  organizationId: string;
  solutionId: string;
  providerId: string;
  status: OrderStatus;
  pricing: {
    basePrice: number;
    fees: number;
    total: number;
    currency: string;
  };
  timeline: {
    orderedAt: string;
    approvedAt?: string;
    deliveredAt?: string;
    completedAt?: string;
  };
  requirements: string;
  fulfillmentArtifacts: string[];
  metadata: Record<string, any>;
}

// Core Enums and Types

export type ProcurementStatus = 
  | 'unfilled'      // Initial state - waiting for fulfillment
  | 'matched'       // System found potential matches
  | 'assigned'      // Assigned to a contributor
  | 'in-progress'   // Being worked on
  | 'completed'     // Work finished, pending review
  | 'approved'      // Quality approved, tokens minted
  | 'rejected'      // Did not meet MoM criteria
  | 'cancelled'     // Cancelled by requestor
  | 'expired';      // Deadline passed

export type ProcurementPriority = 'low' | 'medium' | 'high' | 'urgent';

export type SolutionCategory = 
  | 'ai-tools'
  | 'data-processing'
  | 'security'
  | 'infrastructure'
  | 'integration'
  | 'framework'
  | 'ui-components'
  | 'testing'
  | 'documentation'
  | 'performance'
  | 'other';

export type AccessLevel = 'public' | 'premium' | 'private';

export type PricingModel = 
  | 'free'
  | 'one-time'
  | 'subscription'
  | 'usage-based'
  | 'enterprise';

// Database Models (for reference)

export interface GlobalSolutionVector {
  solution_id: string;
  provider_id: string;
  title: string;
  solution_type: string;
  category: SolutionCategory;
  access_level: AccessLevel;
  pricing_model: PricingModel;
  content: string;
  embedding: string; // JSON stringified vector
  metadata: Record<string, any>;
  quality_score: number;
  usage_count: number;
  rating_avg: number;
  created_at: string;
  updated_at: string;
}

export interface ProcurementSearchContext {
  organizationId: string;
  repositoryContext?: {
    owner: string;
    name: string;
    branch: string;
    commit: string;
    techStack: string[];
  };
  taskContext?: {
    description: string;
    requirements: string[];
    constraints: string[];
  };
  budgetContext?: ProcurementBudget;
  preferences?: {
    preferredProviders: string[];
    excludedCategories: SolutionCategory[];
    qualityThreshold: number;
  };
}
