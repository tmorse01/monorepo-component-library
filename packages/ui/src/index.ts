/**
 * BARREL EXPORT FILE
 *
 * This file exports all components from a single entry point.
 * With proper configuration (ESM, sideEffects: false), modern bundlers
 * SHOULD tree-shake unused exports from this barrel file.
 *
 * However, subpath imports (@myorg/ui/button) are more reliable and faster.
 */

// Export all components
export { Button, BUTTON_VERSION, BUTTON_METADATA } from "./button";
export type { ButtonProps } from "./button";

export { Table, TABLE_VERSION, TABLE_FEATURES, TABLE_METADATA } from "./table";
export type { TableProps, Column } from "./table";

export { Input, INPUT_VERSION, INPUT_METADATA } from "./input";
export type { InputProps } from "./input";

export { Card, CARD_VERSION, CARD_METADATA } from "./card";
export type { CardProps } from "./card";

export { Chart, CHART_VERSION, CHART_METADATA } from "./chart";
export type { ChartProps } from "./chart";
