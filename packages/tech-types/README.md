# @engi/tech-types

Technology and stack type definitions for ENGI platform. Provides comprehensive technology identification, framework classification, and version management.

## Core Exports

- **Technology Types**: Brands, frameworks, languages, databases
- **Unique Tech Identifiers**: Curated tech identifiers with explicit versions
- **Stack Definitions**: Complete technology stack classifications

## Technology Categories

```typescript
import { TechType, Framework, Language, Database } from '@engi/tech-types';

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
import { UniqueTech, getTechVersion } from '@engi/tech-types';

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

- Technology stack analysis and reporting
- Project dependency identification
- Framework compatibility checking
- Version tracking and AI Document planning
- Technology recommendation systems

## Architecture

Provides standardized technology taxonomy for consistent identification across ENGI platform. Curated identifiers ensure accurate technology detection and classification in code analysis workflows.
