/**
 * BARREL EXPORT FILE for @myorg/utils
 *
 * This file exports all utilities from a single entry point.
 * With proper configuration (ESM, sideEffects: false), modern bundlers
 * SHOULD tree-shake unused exports.
 *
 * However, subpath imports (@myorg/utils/date) are more reliable because:
 * - They only load the specific category file
 * - Faster build times (fewer files to parse)
 * - More explicit dependencies
 */

// Date utilities (includes dayjs - ~7KB gzipped)
export * from "./date";

// String utilities (~2KB)
export * from "./string";

// Number utilities (~3KB)
export * from "./number";

// Validation utilities (~2KB)
export * from "./validation";
