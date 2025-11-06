# Monorepo Component Library - Requirements & Specifications

## Project Overview
Create a monorepo demonstrating best practices for component library development with optimal tree-shaking and barrel export strategies.

## Core Requirements

### 1. Monorepo Structure
- Use a monorepo structure with workspace management
- Separate packages for:
  - Component library (`@myorg/ui`)
  - Consumer application (`app`)
  - Shared utilities (`@myorg/utils`)

### 2. Component Library (@myorg/ui)
- **Components to Include:**
  - Button component (lightweight)
  - Table component (heavy/complex)
  - Input component
  - Card component

- **Export Strategy:**
  - Individual component exports (e.g., `@myorg/ui/button`)
  - Avoid single barrel file exporting everything
  - Each component in its own directory with isolated exports
  - Demonstrate that importing only Button doesn't bundle Table

### 3. Utilities Library (@myorg/utils)
- **Utility Categories:**
  - Date helpers using dayjs
  - String/text helpers
  - Number/formatting helpers
  - Validation helpers

- **Export Strategy:**
  - Category-based subpath exports (e.g., `@myorg/utils/date`, `@myorg/utils/string`)
  - Tree-shakeable exports
  - Only import what you use

### 4. Consumer Application
- Demonstrate selective imports from both libraries
- Build output analysis to prove tree-shaking
- Import only Button and specific utils
- Bundle should NOT include Table or unused utilities

### 5. Build & Bundling
- Modern build tooling (Vite or similar)
- TypeScript support throughout
- Bundle analysis tools
- Proper package.json exports configuration

### 6. Tree-Shaking Validation
- Bundle size comparison
- Documentation showing before/after of different import patterns
- Visual proof that unused code is eliminated

## Sustainable Practices to Highlight

### ✅ BEST: Subpath Exports (Most Reliable)
```typescript
// Most reliable - only loads button file
import { Button } from '@myorg/ui/button';
import { formatDate } from '@myorg/utils/date';
```

### ✅ GOOD: Barrel Exports (Works with proper config)
```typescript
// Works IF library is ESM, sideEffects: false, and production build
import { Button } from '@myorg/ui';
import { formatDate } from '@myorg/utils';
```
**Requirements for barrel exports to tree-shake:**
- Library built as ESM (`"type": "module"` or `.mjs`)
- `"sideEffects": false` in package.json
- Named exports (not default)
- Production mode build in consumer
- Modern bundler (Vite, Webpack 5+, Rollup)

### ❌ AVOID: Default Exports
```typescript
// Bad - prevents tree-shaking
import Button from '@myorg/ui/button';
```

### 📊 Performance Comparison
| Import Style | Files Parsed | Tree-shakeable | Build Speed |
|--------------|--------------|----------------|-------------|
| Subpath      | 1 file       | ✅ Always      | Fast        |
| Barrel (ESM) | All files    | ✅ Usually     | Slower      |
| Barrel (CJS) | All files    | ❌ No          | Slower      |

### Package.json Exports Configuration
- Use `exports` field with subpath patterns
- Provide both ESM and types
- Enable direct imports to specific components/utils

## Technical Stack
- **Package Manager:** pnpm (workspace support)
- **Build Tool:** Vite (for app), tsup or Vite library mode (for packages)
- **Language:** TypeScript
- **Styling:** CSS Modules or basic CSS
- **Runtime Dependencies:** React, dayjs (utils only)

## Success Criteria
1. Importing only Button results in significantly smaller bundle than importing Table
2. Bundle analysis clearly shows unused code is eliminated
3. Each component/utility is independently importable
4. Type definitions work correctly with subpath imports
5. Developer experience is smooth with proper IDE autocomplete

## Documentation Deliverables
1. This requirements document
2. README with architecture explanation
3. Examples of correct vs incorrect import patterns
4. Bundle analysis comparison
5. Setup and development instructions
