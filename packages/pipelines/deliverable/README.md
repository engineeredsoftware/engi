# Deliverable Pipeline

Retained compatibility path for the Bitcode agentic pipeline-run corridor.
In V26, the live meaning is:
- a pipeline run satisfies a Bitcode need
- the run synthesizes stable written assets / asset-packs
- the shipping phase emits `deliverables` only as connected-interface delivery mechanisms such as a GitHub pull request or Jira comment

Production software delivery pipeline implementing **SDIVS** pattern with **DIV iteration** for reliable code generation and deployment.

## Overview

The Deliverable Pipeline transforms Bitcode need / definition-of-done input into a need-satisfying pipeline run whose stable output is a written asset or asset-pack, with shipping handling delivery mechanisms through connected interfaces.

### SDIVS Pattern

1. **Setup** - Repository analysis, context preparation, and safety checks
2. **Discovery** - Research, solution exploration, and approach planning  
3. **Implementation** - Code editing using Divide|Conquer|Correct pattern
4. **Validation** - Quality checks and completion verification
5. **Shipping** - Delivery mechanism creation and final handling

### DIV Iteration

The pipeline automatically iterates Discovery→Implementation→Validation up to 3 times:
- Each iteration refines the solution based on validation feedback
- Iteration stops when validation passes or max iterations reached
- No complex decision agents - uses simple pass/fail checks

## Architecture

### Pipeline Structure

```
DeliverablePipeline (SDIVS with DIV iteration)
├── Setup Phase (runs once)
│   ├── VCS Agent - Clone and analyze repository
│   ├── Digester Agent - Generate codebase digest
│   ├── Tech Types Agent - Identify technology stack
│   └── Danger Wall Agent - Safety checks before iteration
├── [DIV Loop - up to 3 iterations]
│   ├── Discovery Phase
│   │   ├── Web Researcher - Research solutions
│   │   ├── Code Searcher - Find patterns
│   │   └── File Pick - Select files
│   ├── Implementation Phase
│   │   └── Implementation Agent (Divide|Conquer|Correct)
│   │       ├── DIVIDE - Create patch plans
│   │       ├── CONQUER - Execute with code-editor
│   │       └── CORRECT - Validate and fix
│   └── Validation Phase
│       └── Ready to Short Circuit - Check completion
└── Shipping Phase (runs once)
    └── VCS Agent - Create PR / other delivery mechanism
```

### Input/Output Schemas

```typescript
// Input Schema
interface DeliverableInput {
  definitionOfDone: string;
  repository: {
    url: string;
    branch?: string;
    path?: string;
  };
  requirements?: {
    testCoverage?: number;
    documentationRequired?: boolean;
    securityScanRequired?: boolean;
  };
  deliveryTarget?: 'pr' | 'branch' | 'deployment';
}

// Output Schema
interface DeliverableOutput {
  success: boolean;
  deliverable: {
    prUrl?: string;
    branch?: string;
    deploymentUrl?: string;
    mechanism?: string;
    payload?: Record<string, unknown>;
  };
  deliveryMechanism?: {
    mechanism?: string; // github-pull-request, jira-comment, etc.
    payload?: Record<string, unknown>;
  };
  writtenAsset?: {
    prUrl?: string;
    branch?: string;
    deploymentUrl?: string;
  };
  artifacts: {
    filesCreated: string[];
    filesModified: string[];
    testsAdded: number;
    documentation: string[];
  };
  metrics: {
    duration: number;
    tokensUsed: number;
    creditsUsed: number;
    confidence: number;
  };
}
```

## Phase Implementations

### Setup Phase
- **VCS Agent**: Clones repository and analyzes structure
- **Digester Agent**: Generates comprehensive codebase digest using `@bitcode/digest`
- **Tech Types Agent**: Identifies technology stack and conventions
- **Danger Wall Agent**: Performs safety and security checks before iteration

### Discovery Phase
- Extracts detailed requirements from definition of done
- Researches solutions and best practices
- Plans implementation approach
- Uses: `web-researcher`, `code-searcher`, `file-pick` agents

### Implementation Phase
- **Implementation Agent**: Uses Divide|Conquer|Correct pattern
  - **DIVIDE**: Analyzes changes and creates file-by-file patch plans
  - **CONQUER**: Executes edits using `code-editor` agent with transactional support
  - **CORRECT**: Validates syntax and applies corrections
- Actual file editing, not just code searching
- Full transaction support with rollback capability

### Validation Phase
- **Ready to Short Circuit Agent**: Verifies completion against requirements
- Determines if another DIV iteration is needed
- Simple pass/fail check without complex decision logic

### Shipping Phase
- Creates a connected-interface delivery mechanism with full description
- Handles deployment or other delivery targets if requested
- Generates delivery report for the written asset / asset-pack
- Uses: Custom `pr-creator`, `deployment` agents

## Usage

```typescript
import { deliverablePipeline } from '@bitcode/pipeline-deliverable';

const result = await deliverablePipeline({
  definitionOfDone: 'Add user authentication with JWT',
  repository: {
    url: 'https://github.com/acme/app',
    branch: 'main'
  },
  requirements: {
    testCoverage: 80,
    documentationRequired: true,
    securityScanRequired: true
  },
  deliveryTarget: 'pr'
}, execution);
```

## Key Improvements

### 1. **Actual Code Editing**
Implementation phase now performs real file modifications using the code-editor agent, not just code searching.

### 2. **Simplified Decision Logic**
Removed complex decision agents in favor of simple validation checks. The SDIVS factory handles iteration logic.

### 3. **Early Safety Checks**
Danger-wall moved to Setup phase to ensure safety before entering DIV iteration loop.

### 4. **Proper Tool Usage**
Digester agent now actually uses the digest package functionality through proper tool wrapping.

### 5. **Transactional Editing**
All file modifications use transactional operations with automatic rollback on failure.

## Performance Characteristics

- Average completion time: 2-5 minutes for medium complexity requirements
- Token usage: 50k-200k tokens depending on complexity
- Success rate: 95%+ for well-defined requirements
- Parallel execution where possible for optimal performance

## Extension Points

The pipeline is designed for extensibility:

- Custom agents can be added to any phase
- Validation rules can be customized
- Output formats can be adapted
- Tool selection can be configured

## Production Excellence

- Comprehensive error handling
- Detailed audit trails
- Performance monitoring
- Cost tracking
- Security validation
- Compliance checks
