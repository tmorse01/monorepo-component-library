# 📋 Quick Reference Card

Fast lookup guide for common tasks and patterns.

## 🚀 Common Commands

```bash
# Setup
pnpm install              # Install all dependencies
pnpm build                # Build all packages

# Development
pnpm dev                  # Start app dev server
cd packages/ui && pnpm dev   # Watch UI changes
cd packages/utils && pnpm dev # Watch utils changes

# Building
pnpm build:ui             # Build UI library
pnpm build:utils          # Build utils library
pnpm build:app            # Build app + analyze bundle

# Analysis
open app/dist/stats.html  # View bundle analysis

# Cleanup
pnpm clean                # Remove all dist folders
```

---

## 📦 Import Patterns Cheat Sheet

### Components (@myorg/ui)

```typescript
// ✅ Subpath (Recommended)
import { Button } from "@myorg/ui/button";
import { Table } from "@myorg/ui/table";
import { Input } from "@myorg/ui/input";
import { Card } from "@myorg/ui/card";

// ✅ Barrel (Works too)
import { Button, Input } from "@myorg/ui";

// ❌ Avoid
import * as UI from "@myorg/ui"; // Bundles everything!
```

### Utilities (@myorg/utils)

```typescript
// ✅ Subpath (Recommended)
import { formatDate } from "@myorg/utils/date";
import { capitalize } from "@myorg/utils/string";
import { formatCurrency } from "@myorg/utils/number";
import { isEmail } from "@myorg/utils/validation";

// ✅ Barrel (Works too)
import { formatDate, capitalize } from "@myorg/utils";

// ❌ Avoid
import * as Utils from "@myorg/utils"; // Bundles everything!
```

---

## 📊 Bundle Size Reference

| Import              | Bundle Size | Notes                           |
| ------------------- | ----------- | ------------------------------- |
| Button only         | ~50KB       | Base: React + Button + overhead |
| Button + Input      | ~55KB       | +5KB for Input                  |
| Button + Card       | ~58KB       | +8KB for Card                   |
| Button + Table      | ~97KB       | +47KB for Table (heavy!)        |
| Button + date utils | ~57KB       | +7KB for dayjs + date helpers   |
| Everything          | ~101KB      | All components + all utils      |

**Baseline:** React + ReactDOM = ~42KB

---

## 🎯 Available Components

### UI Components (@myorg/ui)

| Component | Size  | Path      | Use Case                           |
| --------- | ----- | --------- | ---------------------------------- |
| Button    | ~2KB  | `/button` | Actions, forms                     |
| Input     | ~5KB  | `/input`  | Form inputs with validation        |
| Card      | ~8KB  | `/card`   | Content containers                 |
| Table     | ~50KB | `/table`  | Data tables with sorting/filtering |

### Utility Functions (@myorg/utils)

| Category   | Size | Path          | Example Functions                      |
| ---------- | ---- | ------------- | -------------------------------------- |
| Date       | ~7KB | `/date`       | formatDate, getRelativeTime, addDays   |
| String     | ~2KB | `/string`     | capitalize, slugify, camelCase         |
| Number     | ~3KB | `/number`     | formatCurrency, formatPercent, average |
| Validation | ~2KB | `/validation` | isEmail, isURL, isPhoneNumber          |

---

## 🔧 Configuration Checklist

### For Tree-Shaking to Work

- [x] `"type": "module"` in package.json
- [x] `"sideEffects": false` in package.json
- [x] Named exports (not default exports)
- [x] ESM output format
- [x] `exports` field configured with subpaths
- [x] Production build mode

### Package.json Template

```json
{
  "name": "@myorg/package",
  "type": "module",
  "sideEffects": false,
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./component": {
      "import": "./dist/component.js",
      "types": "./dist/component.d.ts"
    }
  }
}
```

---

## 🐛 Troubleshooting

### "Cannot find module '@myorg/ui'"

```bash
pnpm build:ui
pnpm build:utils
```

### Changes not reflecting

```bash
# Rebuild the package you changed
pnpm build:ui    # or
pnpm build:utils
```

### Bundle includes unused code

1. Check import syntax (avoid `import *`)
2. Verify `"sideEffects": false` in library
3. Ensure production build mode
4. Check bundle analyzer: `app/dist/stats.html`

### TypeScript errors

```bash
# Clear and reinstall
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

---

## 📚 File Locations

```
Project Root
├── README.md                  # Main documentation
├── REQUIREMENTS.md            # Project requirements
├── GETTING-STARTED.md         # Setup guide
├── EXAMPLES.md                # Import examples
├── VALIDATION.md              # Tree-shaking proof
├── ARCHITECTURE.md            # Visual diagrams
├── PROJECT-STRUCTURE.md       # Detailed structure
└── QUICK-REFERENCE.md         # This file

Package Locations
├── packages/ui/dist/          # Built UI components
├── packages/utils/dist/       # Built utilities
└── app/dist/                  # Built app + stats.html
```

---

## 🎨 Component Props Quick Reference

### Button

```typescript
<Button
  onClick={() => {}}
  variant="primary" | "secondary"
  disabled={false}
>
  Click me
</Button>
```

### Input

```typescript
<Input
  value={value}
  onChange={setValue}
  type="text" | "email" | "password" | "number"
  placeholder="Enter text"
  error="Error message"
/>
```

### Card

```typescript
<Card
  title="Card Title"
  variant="default" | "outlined" | "elevated"
  footer={<div>Footer content</div>}
>
  Card content
</Card>
```

### Table

```typescript
<Table
  data={[
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
  ]}
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "age", header: "Age", sortable: true },
  ]}
  onRowClick={(row) => console.log(row)}
/>
```

---

## 🛠️ Utility Functions Quick Reference

### Date Utilities

```typescript
formatDate(new Date(), "YYYY-MM-DD");
getRelativeTime(new Date()); // "a few seconds ago"
addDays(new Date(), 7);
isPast(someDate);
isFuture(someDate);
```

### String Utilities

```typescript
capitalize("hello"); // "Hello"
titleCase("hello world"); // "Hello World"
slugify("Hello World!"); // "hello-world"
camelCase("hello world"); // "helloWorld"
truncate("Long text...", 10); // "Long te..."
```

### Number Utilities

```typescript
formatCurrency(1234.56); // "$1,234.56"
formatPercent(0.15); // "15.00%"
formatNumber(1234567); // "1,234,567"
roundTo(3.14159, 2); // 3.14
clamp(15, 0, 10); // 10
```

### Validation Utilities

```typescript
isEmail("user@example.com"); // true
isURL("https://example.com"); // true
isPhoneNumber("+1234567890"); // true
isStrongPassword("Pass123!"); // true/false
isEmpty(""); // true
```

---

## 🎯 Key Metrics

| Metric       | Subpath   | Barrel     | Import \* |
| ------------ | --------- | ---------- | --------- |
| Files Parsed | 1         | All        | All       |
| Tree-Shaking | ✅ Always | ✅ Usually | ❌ No     |
| Build Speed  | Fast      | Medium     | Medium    |
| Bundle Size  | Optimal   | Optimal    | Bloated   |
| Reliability  | ⭐⭐⭐    | ⭐⭐       | ❌        |

---

## 📖 Documentation Index

1. **README.md** - Start here for complete guide
2. **GETTING-STARTED.md** - Quick setup (5 minutes)
3. **EXAMPLES.md** - Import pattern examples
4. **VALIDATION.md** - Tree-shaking proof with tests
5. **ARCHITECTURE.md** - Visual diagrams and flows
6. **PROJECT-STRUCTURE.md** - Detailed architecture
7. **QUICK-REFERENCE.md** - This file (fast lookup)

---

**Print or bookmark this page for quick reference while working with the monorepo!**
