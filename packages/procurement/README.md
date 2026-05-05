# @bitcode/procurement

Global solution procurement engine for Bitcode. Provides vector-based solution matching, advanced analytics, fraud detection, and automated quality assessment.

## Core Engines

- **ProcurementEngine**: Core solution matching and search
- **AdvancedMatchingEngine**: ML-powered solution recommendations  
- **ProcurementAnalyticsEngine**: Usage and performance analytics
- **AutomatedQualityAssessment**: Solution quality scoring
- **FraudDetectionEngine**: Procurement fraud prevention
- **ProcurementNotificationSystem**: Event-driven notifications

## Key Features

- Vector-based semantic solution search
- Global dataset management with opt-in controls
- BTD share settlement engine for solution providers
- Real-time fraud detection and monitoring
- Automated quality assessment and scoring
- Pipeline integration for seamless procurement

## Solution Search

```typescript
import { searchRelevantSolutions } from '@bitcode/procurement';

const solutions = await searchRelevantSolutions({
  organizationId: 'org-123',
  repoOwner: 'company',
  repoName: 'project',
  repoBranch: 'main',
  repoCommit: 'abc123',
  stage: 'pre-context',
  accessLevel: 'public',
  maxBudget: 1000,
  categoryFilter: 'authentication',
  taskContext: {
    description: 'Find a secure authentication provider for the new React app'
  }
});
```

## Advanced Matching

```typescript
import { AdvancedMatchingEngine } from '@bitcode/procurement';

const engine = new AdvancedMatchingEngine();
const recommendations = await engine.getRecommendations({
  context: taskContext,
  preferences: userPreferences,
  budget: maxBudget
});
```

## Dataset Management

```typescript
import { GlobalDatasetManager, RepositoryOptInManager } from '@bitcode/procurement';

// Manage global dataset
const dataset = new GlobalDatasetManager();
await dataset.addSolution(solutionData);

// Handle repository opt-ins
const optIn = new RepositoryOptInManager();
await optIn.enableGlobalSharing(repoId);
```

## Architecture

Vector search engine uses OpenAI embeddings for semantic matching. Global dataset enables cross-organization solution sharing with privacy controls. Pipeline integration provides seamless procurement workflows.
