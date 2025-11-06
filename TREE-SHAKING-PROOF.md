# 🌲 Tree-Shaking Proof - Real Bundle Sizes

This document demonstrates the **dramatic impact** of tree-shaking with real bundle measurements.

## 📊 The Experiment

We created a Chart component that depends on Chart.js (~200KB library). Then we measured the app bundle in three scenarios:

### Scenario 1: Baseline (Button + Date utils only)

**Imports:**

```typescript
import { Button } from "@myorg/ui/button";
import { formatDate, getRelativeTime } from "@myorg/utils/date";
```

**Build Result:**

```
dist/assets/index-CdTDuJbV.js          23.46 KB │ gzip:  9.27 kB
dist/assets/react-vendor-DJ1oPbzn.js  141.05 KB │ gzip: 45.35 kB
```

**Total: 164.51 KB (54.62 KB gzipped)**

---

### Scenario 2: Adding Chart Component

**Imports:**

```typescript
import { Button } from "@myorg/ui/button";
import { Chart } from "@myorg/ui/chart"; // ← Added this
import { formatDate, getRelativeTime } from "@myorg/utils/date";
```

**Build Result:**

```
dist/assets/index-Cs9mIe_M.js         192.80 KB │ gzip: 68.21 kB  ← +169 KB!
dist/assets/react-vendor-DJ1oPbzn.js  141.05 KB │ gzip: 45.35 kB
```

**Total: 333.85 KB (113.56 KB gzipped)**

**Impact: +169 KB from Chart.js library**

---

### Scenario 3: Remove Chart Import

**Imports:**

```typescript
import { Button } from "@myorg/ui/button";
// Chart removed - let's verify tree-shaking works
import { formatDate, getRelativeTime } from "@myorg/utils/date";
```

**Build Result:**

```
dist/assets/index-CdTDuJbV.js          23.46 KB │ gzip:  9.27 kB  ← Back to baseline!
dist/assets/react-vendor-DJ1oPbzn.js  141.05 KB │ gzip: 45.35 kB
```

**Total: 164.51 KB (54.62 KB gzipped)**

**Savings: -169 KB (Chart.js completely eliminated!)**

---

## 🎯 What This Proves

1. **Tree-shaking works**: Chart.js (~200KB) is only included when Chart component is imported
2. **Zero cost for unused code**: Available components don't affect bundle if not imported
3. **Both patterns work**: Same results whether you use:
   - Subpath imports: `import { Chart } from "@myorg/ui/chart"`
   - Barrel imports: `import { Chart } from "@myorg/ui"`

## 🔍 Verification Steps

You can verify this yourself:

```bash
# 1. Build without Chart (current state)
pnpm build:app

# Check the bundle size - should be ~23 KB
# dist/assets/index-*.js shows the size

# 2. Add Chart to App.tsx
# Uncomment the Chart import and usage

# 3. Rebuild
pnpm build:app

# Check the bundle size - should be ~192 KB

# 4. Remove Chart and rebuild
# Bundle drops back to ~23 KB
```

## 📈 Bundle Analysis

Open `app/dist/stats.html` after building to see a visual breakdown of what's in your bundle:

- **Without Chart**: Only Button component code is included
- **With Chart**: Chart.js library and all its dependencies appear

Use `Ctrl+F` to search for "chart" in the bundle analysis - you won't find it in the default build!

## 💡 Key Takeaways

1. **Heavy dependencies**: Chart.js is ~200KB, Button is ~1KB - 200x difference!
2. **Tree-shaking effectiveness**: Import only what you need, pay only for what you use
3. **Library design matters**: Proper `exports` + `sideEffects: false` enables this
4. **Both patterns work**: Use subpath or barrel imports - modern bundlers handle both

## 🎨 Component Size Reference

From smallest to largest:

| Component | Size (uncompressed) | Notes                                |
| --------- | ------------------- | ------------------------------------ |
| Button    | ~1 KB               | Simple component, no deps            |
| Input     | ~1 KB               | Simple component, no deps            |
| Card      | ~2 KB               | Simple component, no deps            |
| Table     | ~6 KB               | More complex with sorting            |
| **Chart** | **~200 KB**         | **Heavy! Includes Chart.js library** |

Date utilities: ~7 KB (includes dayjs)
String utilities: ~2 KB
Number utilities: ~3 KB
Validation utilities: ~2 KB

## 🚀 Best Practices Demonstrated

1. ✅ Use ESM (`"type": "module"`)
2. ✅ Set `"sideEffects": false` in package.json
3. ✅ Configure `exports` with subpath patterns
4. ✅ Build with modern bundlers (tsup, Vite, etc.)
5. ✅ Keep heavy dependencies isolated in separate components
6. ✅ Measure bundle sizes regularly
7. ✅ Use bundle analysis tools to verify tree-shaking

---

**Bottom Line**: This monorepo demonstrates that tree-shaking isn't just theory - it saves **169 KB** by excluding Chart.js when you don't import the Chart component. That's a **2x bundle size reduction**!
