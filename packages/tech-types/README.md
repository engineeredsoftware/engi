# @bitcode/tech-types

Technology and stack type definitions for the Bitcode platform. This package provides the canonical technology vocabulary used to measure technical needs, normalize product/runtime reality, and keep dependent Bitcode packages and interfaces aligned on the same stack semantics.

## Core Exports

- **Technology Types**: Brands, frameworks, languages, databases
- **Unique Tech Identifiers**: Curated tech identifiers with explicit versions
- **Stack Definitions**: Complete technology stack classifications

## Technology Categories

```typescript
import { TechType, Framework, Language, Database } from '@bitcode/tech-types';

// Technology identification
const techStack: TechType[] = [
  'react',
  'typescript', 
  'postgresql',
  'docker',
  'kubernetes'
];

// Framework-specific types
const frontendFramework: Framework = 'nextjs';
const backendLanguage: Language = 'typescript';
const database: Database = 'postgresql';
```

## Unique Technology Identifiers

```typescript
import { UniqueTech, getTechVersion } from '@bitcode/tech-types';

// Versioned technology identification
const tech: UniqueTech = {
  name: 'react',
  version: '18.2.0',
  category: 'frontend-framework'
};

// Version management
const version = getTechVersion('nextjs'); // '13.4.0'
```

## Use Cases

- Need-measurement normalization for technical requests and market-facing demand
- Technology stack analysis and reporting
- Project dependency identification
- Framework compatibility checking
- Version tracking and AI Document planning
- Technology recommendation systems
- Shared classification for dependent Bitcode packages, APIs, and application surfaces

## Architecture

Provides standardized technology taxonomy for consistent identification across the Bitcode platform. In V26, this package is part of the Bitcode need-measurement spine: the preserved protocol defines the measurement realities, while productized dependents use these types to classify stacks, requests, assets, and execution contexts without semantic drift.
