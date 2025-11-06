# 🎯 Monorepo Component Library - Tree-Shaking Demo

A comprehensive example demonstrating **sustainable barrel export practices** and **tree-shaking** in a monorepo setup. This project showcases how to build component and utility libraries that only bundle what you actually use.

## 📋 Project Overview

This monorepo contains:

- **`@myorg/ui`** - Component library with Button, Table, Input, Card, and Chart components
- **`@myorg/utils`** - Utility library with date, string, number, and validation helpers
- **`app`** - Consumer application demonstrating selective imports

### Key Features

✅ **Both import patterns supported**: Subpath exports AND barrel exports  
✅ **Verified tree-shaking**: Unused code is eliminated from bundles  
✅ **Dramatic proof**: Import Chart component = +169KB, exclude it = 0KB  
✅ **Bundle analysis**: Visual proof of what's included/excluded  
✅ **Developer-friendly**: Full TypeScript support with IDE autocomplete  
✅ **Production-ready**: ESM, proper `package.json` exports, and `sideEffects: false`

## 🎯 Tree-Shaking in Action

This project demonstrates the **dramatic impact** of tree-shaking:

| Scenario                     | Bundle Size                  | What Changed                          |
| ---------------------------- | ---------------------------- | ------------------------------------- |
| **Only Button + Date utils** | 23.46 KB (9.27 KB gzipped)   | Baseline - minimal imports            |
| **Add Chart component**      | 192.80 KB (68.21 KB gzipped) | +169 KB from Chart.js library         |
| **Tree-shake Chart away**    | 23.46 KB (9.27 KB gzipped)   | Back to baseline - Chart.js excluded! |

**The Point**: When you import only `Button`, you don't pay the cost of `Chart.js` (~200KB). Tree-shaking works!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended)
- pnpm 8+ (required for workspaces)

### Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Start the demo app
pnpm dev
```

## 📦 Package Structure

```
comp-package-example/
├── packages/
│   ├── ui/                    # @myorg/ui - Component library
│   │   ├── src/
│   │   │   ├── button/        # Button component (~1KB)
│   │   │   ├── table/         # Table component (~6KB)
│   │   │   ├── input/         # Input component (~1KB)
│   │   │   ├── card/          # Card component (~2KB)
│   │   │   ├── chart/         # Chart component + Chart.js (~200KB!)
│   │   │   └── index.ts       # Barrel export (all components)
│   │   └── package.json       # Subpath exports configuration
│   │
│   └── utils/                 # @myorg/utils - Utility library
│       ├── src/
│       │   ├── date/          # Date helpers with dayjs (~7KB)
│       │   ├── string/        # String utilities (~2KB)
│       │   ├── number/        # Number utilities (~3KB)
│       │   ├── validation/    # Validation functions (~2KB)
│       │   └── index.ts       # Barrel export (all utils)
│       └── package.json       # Subpath exports configuration
│
└── app/                       # Consumer application
    ├── src/
    │   └── App.tsx            # Demo with selective imports
    └── package.json
```

## 🎨 Import Patterns - The Two Approaches

### ✅ Approach 1: Subpath Imports (Recommended)

**Most Reliable** - Only loads specific files. Fastest builds.

```typescript
// Components
import { Button } from "@myorg/ui/button";
import { Table } from "@myorg/ui/table";

// Utilities
import { formatDate, getRelativeTime } from "@myorg/utils/date";
import { capitalize, slugify } from "@myorg/utils/string";
```

**Benefits:**

- ⚡ Only parses the files you import (faster builds)
- ✅ Guaranteed tree-shaking
- 🎯 Explicit dependencies
- 🚀 Better IDE performance

### ✅ Approach 2: Barrel Imports (Also Works!)

**Convenient** - Works with proper configuration. Slightly slower builds.

```typescript
// Components
import { Button, Table } from "@myorg/ui";

// Utilities
import { formatDate, getRelativeTime, capitalize, slugify } from "@myorg/utils";
```

**Requirements for tree-shaking:**

- Library built as ESM (`"type": "module"`)
- `"sideEffects": false` in package.json
- Named exports (not default exports)
- Production build mode
- Modern bundler (Vite, Webpack 5+, Rollup)

**Tradeoff:**

- ⚠️ All files are parsed (slower builds)
- ✅ Tree-shaking still works correctly

## 📊 Tree-Shaking Verification

The demo app imports **only** Button and date utilities:

```typescript
import { Button } from "@myorg/ui/button";
import { formatDate, getRelativeTime } from "@myorg/utils/date";
```

### What's Bundled ✅

- Button component (~2KB)
- Date utilities (~7KB with dayjs)
- React & ReactDOM

### What's NOT Bundled ❌

- Table component (~50KB) 🎉
- Input component
- Card component
- String utilities
- Number utilities
- Validation utilities

### How to Verify

1. Build the app:

   ```bash
   pnpm build:app
   ```

2. Open the bundle analyzer:

   ```bash
   # The build automatically generates: app/dist/stats.html
   # Open it in your browser to see the bundle composition
   ```

3. Look for:
   - ✅ Button component code
   - ✅ Date utilities (dayjs)
   - ❌ Table component (should NOT appear!)
   - ❌ Other unused components/utils (should NOT appear!)

## 🔧 Configuration Deep Dive

### Package.json Exports (Critical!)

Both libraries use the `exports` field to enable subpath imports:

```json
{
  "name": "@myorg/ui",
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./button": {
      "import": "./dist/button.js",
      "types": "./dist/button.d.ts"
    },
    "./table": {
      "import": "./dist/table.js",
      "types": "./dist/table.d.ts"
    }
  }
}
```

**Key settings:**

- `"type": "module"` - Treats files as ES modules
- `"sideEffects": false` - Tells bundlers it's safe to tree-shake
- `exports` - Defines public API and enables subpath imports

### Build Configuration (tsup)

Both libraries use `tsup` for building:

```typescript
export default defineConfig({
  entry: {
    index: "src/index.ts", // Barrel export
    button: "src/button/index.ts", // Individual components
    table: "src/table/index.ts",
    // ...
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  treeshake: true,
});
```

## 📈 Performance Comparison

| Import Style                     | Files Parsed | Tree-Shakeable | Build Time | Recommendation |
| -------------------------------- | ------------ | -------------- | ---------- | -------------- |
| **Subpath** (`@myorg/ui/button`) | 1 file       | ✅ Always      | Fast       | ⭐ Best        |
| **Barrel ESM** (`@myorg/ui`)     | All files    | ✅ Usually     | Slower     | ✅ Good        |
| **Barrel CJS** (`@myorg/ui`)     | All files    | ❌ No          | Slower     | ❌ Avoid       |

## 🎓 Best Practices Highlighted

### ✅ DO

```typescript
// Subpath imports - most reliable
import { Button } from "@myorg/ui/button";

// Barrel imports - works with ESM + sideEffects: false
import { Button } from "@myorg/ui";

// Named exports
export { Button } from "./Button";
```

### ❌ DON'T

```typescript
// Default exports (prevents tree-shaking)
export default Button;
import Button from "@myorg/ui/button"; // BAD

// CommonJS (no tree-shaking)
module.exports = { Button, Table };
const { Button } = require("@myorg/ui"); // BAD

// Mixing all exports without sideEffects: false
export * from "./button";
export * from "./table"; // Can prevent tree-shaking
```

## 🧪 Testing Different Scenarios

### Test 1: Baseline Bundle (Current State)

The app imports only Button and date utils:

```typescript
import { Button } from "@myorg/ui/button";
import { formatDate, getRelativeTime } from "@myorg/utils/date";
```

**Build and measure:**

```bash
pnpm build
# Result: ~23 KB main bundle
```

### Test 2: Add Heavy Chart Component

To see the dramatic impact of a heavy dependency:

```typescript
import { Button } from "@myorg/ui/button";
import { Chart } from "@myorg/ui/chart"; // ← Add Chart.js (~200KB)
import { formatDate, getRelativeTime } from "@myorg/utils/date";
```

**Build and measure:**

```bash
pnpm build
# Result: ~192 KB main bundle (+169 KB from Chart.js!)
```

### Test 3: Verify Tree-Shaking

Remove the Chart import and rebuild:

```bash
pnpm build
# Result: Back to ~23 KB - Chart.js completely excluded!
```

**See [TREE-SHAKING-PROOF.md](./TREE-SHAKING-PROOF.md) for detailed measurements.**

### Test 4: Compare Import Patterns

The app includes code comments showing how to test barrel vs subpath:

```typescript
// CURRENT: Subpath Imports
import { Button } from "@myorg/ui/button";
import { formatDate } from "@myorg/utils/date";

// TO TEST: Uncomment barrel imports below
// import { Button } from '@myorg/ui';
// import { formatDate } from '@myorg/utils';
```

1. Build with subpath imports → Check bundle size
2. Switch to barrel imports → Build again
3. Compare → Should be nearly identical!

## 📚 Scripts Reference

```bash
# Development
pnpm dev              # Start demo app in dev mode
pnpm build            # Build all packages and app
pnpm build:ui         # Build UI library only
pnpm build:utils      # Build utils library only
pnpm build:app        # Build app only

# Analysis
pnpm analyze          # Open bundle analyzer

# Cleanup
pnpm clean            # Remove all dist folders
```

## 🏗️ Adding New Components/Utils

### Adding a Component

1. Create component folder: `packages/ui/src/my-component/`
2. Add component: `packages/ui/src/my-component/MyComponent.tsx`
3. Add index: `packages/ui/src/my-component/index.ts`
4. Update `packages/ui/tsup.config.ts`:
   ```typescript
   entry: {
     // ...
     'my-component': 'src/my-component/index.ts',
   }
   ```
5. Update `packages/ui/package.json`:
   ```json
   "exports": {
     "./my-component": {
       "import": "./dist/my-component.js",
       "types": "./dist/my-component.d.ts"
     }
   }
   ```
6. Optionally add to barrel: `packages/ui/src/index.ts`

### Adding a Utility Category

Same process as components - create folder, update tsup config, update package.json exports.

## 🎯 Key Takeaways

1. **Both patterns work** - Subpath imports are more reliable, barrel imports are convenient
2. **ESM + sideEffects: false** - Essential for tree-shaking
3. **Named exports only** - Default exports break tree-shaking
4. **Verify with bundle analyzer** - Always check what's actually bundled
5. **Give users options** - Support both patterns, let them choose

## 📖 Learn More

- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Vite Tree Shaking](https://vitejs.dev/guide/features.html#tree-shaking)
- [Package.json Exports](https://nodejs.org/api/packages.html#exports)
- [SideEffects](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)

## 📄 License

MIT

---

**Built with ❤️ to demonstrate sustainable component library practices**
