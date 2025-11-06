import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/button/index.ts",
    table: "src/table/index.ts",
    input: "src/input/index.ts",
    card: "src/card/index.ts",
    chart: "src/chart/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
});
