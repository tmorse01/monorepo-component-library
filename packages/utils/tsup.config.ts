import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    date: "src/date/index.ts",
    string: "src/string/index.ts",
    number: "src/number/index.ts",
    validation: "src/validation/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
});
