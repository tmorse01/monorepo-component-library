import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: ["**/*.test.ts", "**/*.test.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        button: resolve(__dirname, "src/button/index.ts"),
        table: resolve(__dirname, "src/table/index.ts"),
        input: resolve(__dirname, "src/input/index.ts"),
        card: resolve(__dirname, "src/card/index.ts"),
        chart: resolve(__dirname, "src/chart/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "chart.js"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
