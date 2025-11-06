# Getting Started Guide

Quick guide to get up and running with this monorepo.

## Prerequisites Check

Before starting, make sure you have:

- [ ] Node.js 18 or higher installed
- [ ] pnpm installed (if not, run `npm install -g pnpm`)
- [ ] Git (optional, for version control)

Check your versions:

```bash
node --version   # should be v18.x or higher
pnpm --version   # should be v8.x or higher
```

## Step 1: Installation

From the root directory:

```bash
# Install all dependencies across all packages
pnpm install
```

This will:

- Install dependencies for `@myorg/ui`
- Install dependencies for `@myorg/utils`
- Install dependencies for `app`
- Link workspace packages together

## Step 2: Build Libraries

Build the component and utility libraries:

```bash
# Build both libraries
pnpm build

# Or build individually
pnpm build:ui
pnpm build:utils
```

You should see output in:

- `packages/ui/dist/`
- `packages/utils/dist/`

## Step 3: Start Development

Start the demo application:

```bash
pnpm dev
```

This will:

- Start Vite dev server
- Open http://localhost:5173 in your browser
- Enable hot module replacement (HMR)

## Step 4: Explore the Demo

The demo app shows:

- ✅ Button component in action
- ✅ Date utilities formatting dates
- 📊 Bundle analysis explanation
- 📝 Code examples for both import patterns

## Step 5: Verify Tree-Shaking

Build the production bundle:

```bash
pnpm build:app
```

Open the bundle analyzer:

```bash
# On Windows
start app/dist/stats.html

# On Mac
open app/dist/stats.html

# On Linux
xdg-open app/dist/stats.html
```

In the visualizer, verify:

- ✅ Button component is included
- ✅ dayjs is included
- ❌ Table component is NOT included
- ❌ Unused utilities are NOT included

## Step 6: Experiment!

Try different import patterns:

### Test Barrel Imports

Edit `app/src/App.tsx`:

```typescript
// Change from:
import { Button } from "@myorg/ui/button";

// To:
import { Button } from "@myorg/ui";
```

Build again and compare bundle size - should be identical!

### Test Adding More Components

```typescript
import { Button } from "@myorg/ui/button";
import { Table } from "@myorg/ui/table"; // Add this
```

Build and see the bundle size increase by ~45-50 KB.

### Test More Utilities

```typescript
import { formatDate } from "@myorg/utils/date";
import { capitalize } from "@myorg/utils/string"; // Add this
import { formatCurrency } from "@myorg/utils/number"; // And this
```

Build and see modest increases (only the specific functions).

## Common Commands Reference

```bash
# Development
pnpm dev              # Start demo app
pnpm build            # Build everything
pnpm clean            # Clean all build outputs

# Individual packages
pnpm build:ui         # Build UI library
pnpm build:utils      # Build utils library
pnpm build:app        # Build demo app

# Analysis
pnpm analyze          # Same as build:app (includes visualizer)
```

## Project Structure Overview

```
comp-package-example/
├── packages/
│   ├── ui/           # Component library
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── table/
│   │   │   ├── input/
│   │   │   ├── card/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsup.config.ts
│   │
│   └── utils/        # Utility library
│       ├── src/
│       │   ├── date/
│       │   ├── string/
│       │   ├── number/
│       │   ├── validation/
│       │   └── index.ts
│       ├── package.json
│       └── tsup.config.ts
│
├── app/              # Demo application
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── README.md         # Main documentation
├── REQUIREMENTS.md   # Project requirements
├── EXAMPLES.md       # Import pattern examples
├── VALIDATION.md     # Tree-shaking validation
└── package.json      # Root package (scripts)
```

## Troubleshooting

### "Cannot find module '@myorg/ui'"

**Solution:** Build the libraries first:

```bash
pnpm build:ui
pnpm build:utils
```

### Changes to UI/Utils not reflecting in app

**Solution:** Rebuild the library you changed:

```bash
pnpm build:ui    # if you changed a component
pnpm build:utils # if you changed a utility
```

Or use watch mode:

```bash
cd packages/ui
pnpm dev  # watches for changes and rebuilds
```

### Bundle analyzer not opening

**Solution:** Manually open the file:

```bash
# The file is at: app/dist/stats.html
# Just open it in your browser
```

### pnpm install fails

**Solution:** Clear cache and try again:

```bash
pnpm store prune
pnpm install
```

## Next Steps

1. ✅ Read through `README.md` for detailed explanations
2. ✅ Check `EXAMPLES.md` for different import patterns
3. ✅ Review `VALIDATION.md` for tree-shaking proof
4. ✅ Modify components and see the impact
5. ✅ Build your own components following the same pattern

## Need Help?

- Check the main `README.md` for detailed explanations
- Review the requirements in `REQUIREMENTS.md`
- Look at examples in `EXAMPLES.md`
- Verify setup in `VALIDATION.md`

Happy coding! 🚀
